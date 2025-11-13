/**
 * Cliente HTTP configurado com Axios para comunicação com a API Django
 *
 * Features:
 * - Base URL configurável via env
 * - Interceptors para autenticação JWT
 * - Refresh token automático
 * - Tratamento de erros centralizado
 */

import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import type { APIError, APITokenRefreshResponse } from '@/types/api';

// ============================================================================
// CONFIGURAÇÃO DO CLIENTE AXIOS
// ============================================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

/**
 * Instância principal do axios configurada com a base URL da API
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================================================
// GERENCIAMENTO DE TOKENS
// ============================================================================

const TOKEN_STORAGE_KEY = 'access_token';
const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';

/**
 * Obtém o access token do localStorage
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

/**
 * Obtém o refresh token do localStorage
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
}

/**
 * Salva os tokens no localStorage e cookies
 */
export function setTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;

  // Salva no localStorage
  localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);

  // Salva em cookies para o middleware
  document.cookie = `access_token=${accessToken}; path=/; max-age=14400`; // 4 horas
  document.cookie = `refresh_token=${refreshToken}; path=/; max-age=86400`; // 1 dia
}

/**
 * Remove os tokens do localStorage e cookies
 */
export function clearTokens(): void {
  if (typeof window === 'undefined') return;

  // Remove do localStorage
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);

  // Remove dos cookies
  document.cookie = 'access_token=; path=/; max-age=0';
  document.cookie = 'refresh_token=; path=/; max-age=0';
}

// ============================================================================
// REQUEST INTERCEPTOR - Adiciona token de autenticação
// ============================================================================

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ============================================================================
// RESPONSE INTERCEPTOR - Refresh token automático
// ============================================================================

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<APIError>) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Se o erro não for 401 ou já tentamos refresh, rejeita
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Se já está refreshing, adiciona à fila
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      // Não tem refresh token, redireciona para login
      clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
      return Promise.reject(error);
    }

    try {
      // Tenta refresh do token
      const { data } = await axios.post<APITokenRefreshResponse>(
        `${API_BASE_URL}/api/token/refresh/`,
        {
          refresh: refreshToken,
        },
      );

      const newAccessToken = data.access;

      // Salva o novo access token
      if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_STORAGE_KEY, newAccessToken);
      }

      // Atualiza o header da requisição original
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }

      // Processa a fila de requisições pendentes
      processQueue(null, newAccessToken);

      // Retry da requisição original
      return apiClient(originalRequest);
    } catch (refreshError) {
      // Refresh falhou, limpa tokens e redireciona para login
      processQueue(refreshError as Error, null);
      clearTokens();

      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

// ============================================================================
// HELPERS PARA TRATAMENTO DE ERROS
// ============================================================================

/**
 * Extrai mensagem de erro da resposta da API
 */
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as APIError;

    // Mensagem de erro genérica
    if (apiError?.detail) {
      return apiError.detail;
    }

    // Erros de validação de campos
    if (apiError && typeof apiError === 'object') {
      const fieldErrors = Object.entries(apiError)
        .filter(([key]) => key !== 'detail')
        .map(([field, messages]) => {
          const messageStr = Array.isArray(messages) ? messages.join(', ') : messages;
          return `${field}: ${messageStr}`;
        });

      if (fieldErrors.length > 0) {
        return fieldErrors.join('\n');
      }
    }

    // Mensagem padrão baseada no status
    if (error.response?.status) {
      switch (error.response.status) {
        case 400:
          return 'Dados inválidos. Verifique os campos e tente novamente.';
        case 401:
          return 'Não autorizado. Faça login novamente.';
        case 403:
          return 'Acesso negado.';
        case 404:
          return 'Recurso não encontrado.';
        case 500:
          return 'Erro interno do servidor. Tente novamente mais tarde.';
        default:
          return `Erro: ${error.response.status}`;
      }
    }

    // Erro de rede
    if (error.code === 'ECONNABORTED') {
      return 'Tempo de espera excedido. Verifique sua conexão.';
    }

    if (error.code === 'ERR_NETWORK') {
      return 'Erro de rede. Verifique sua conexão com a internet.';
    }
  }

  return 'Erro desconhecido. Tente novamente.';
}

/**
 * Verifica se o erro é de validação de campos
 */
export function isValidationError(error: unknown): boolean {
  if (axios.isAxiosError(error)) {
    return error.response?.status === 400;
  }
  return false;
}

/**
 * Verifica se o erro é de autenticação
 */
export function isAuthError(error: unknown): boolean {
  if (axios.isAxiosError(error)) {
    return error.response?.status === 401;
  }
  return false;
}

/**
 * Verifica se o erro é de recurso não encontrado
 */
export function isNotFoundError(error: unknown): boolean {
  if (axios.isAxiosError(error)) {
    return error.response?.status === 404;
  }
  return false;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default apiClient;
