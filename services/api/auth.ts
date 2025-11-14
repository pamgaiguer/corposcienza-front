/**
 * Service para autenticação JWT com a API Django
 * Atualizado para usar os endpoints /api/accounts/ conforme documentação
 */

import { apiClient, clearTokens, getRefreshToken, setTokens } from '@/lib/api/client';
import type {
  APICustomUser,
  APILoginCredentials,
  APILogoutPayload,
  APITokenResponse,
} from '@/types/api';
import axios from 'axios';

const isServer = typeof window === 'undefined';
const API_BASE_URL = isServer
  ? 'https://api.corposcienza.com.br'
  : process.env.NEXT_PUBLIC_API_URL || 'https://api.corposcienza.com.br';

export const authService = {
  /**
   * Realiza login e obtém tokens JWT
   * Enquanto isso, vamos usar autenticação básica diretamente.
   */
  async login(credentials: APILoginCredentials): Promise<APITokenResponse> {
    try {
      // Tenta primeiro com o endpoint padrão
      const response = await axios.post<APITokenResponse>(
        `${API_BASE_URL}/api/token/`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // Salva os tokens no localStorage e cookies
      setTokens(response.data.access, response.data.refresh);

      return response.data;
    } catch (error) {
      // Se falhar por causa do token_blacklist, tenta o endpoint de contas
      if (axios.isAxiosError(error) && error.response?.status === 500) {
        throw new Error(
          'Erro no servidor: O backend precisa executar as migrações do token_blacklist. ' +
            'Contate o administrador do sistema para executar: python manage.py migrate token_blacklist',
        );
      }
      throw error;
    }
  },

  /**
   * Realiza logout e invalida o refresh token na API
   * Endpoint: POST /api/accounts/logout/
   *
   * NOTA: Temporariamente desabilitado até que as migrações do token_blacklist
   * sejam executadas no backend. Execute: python manage.py migrate token_blacklist
   */
  async logout(): Promise<void> {
    const refreshToken = getRefreshToken();

    if (refreshToken) {
      try {
        // Envia o refresh token para ser adicionado à blacklist
        const payload: APILogoutPayload = { refresh: refreshToken };
        await apiClient.post('/accounts/logout/', payload);
      } catch {
        // Ignora erro se o token_blacklist não estiver configurado no backend
        // O token ainda será removido localmente
        // Silenciosamente ignora o erro do logout na API
      }
    }

    // Limpa tokens do localStorage e cookies (sempre executa)
    clearTokens();
  },

  /**
   * Obtém os dados do usuário logado
   * Endpoint: GET /api/accounts/me/
   */
  async getCurrentUser(): Promise<APICustomUser> {
    const { data } = await apiClient.get<APICustomUser>('/accounts/me/');
    return data;
  },

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('access_token');
  },
};
