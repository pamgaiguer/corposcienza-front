/**
 * Service para autenticação JWT com a API Django
 */

import { apiClient, setTokens, clearTokens } from '@/lib/api/client';
import type { APITokenResponse, APILoginCredentials } from '@/types/api';

export const authService = {
  /**
   * Realiza login e obtém tokens JWT
   */
  async login(credentials: APILoginCredentials): Promise<APITokenResponse> {
    const { data } = await apiClient.post<APITokenResponse>('/token/', credentials);

    // Salva os tokens no localStorage
    setTokens(data.access, data.refresh);

    return data;
  },

  /**
   * Realiza logout e limpa tokens
   */
  logout(): void {
    clearTokens();
  },

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('access_token');
  },
};
