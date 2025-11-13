/**
 * Service para operações com Contatos de Emergência na API
 */

import { apiClient } from '@/lib/api/client';
import type {
  APIContatoEmergencia,
  APIContatoEmergenciaCreate,
  APIContatoEmergenciaUpdate,
  APIPaginatedResponse,
} from '@/types/api';

export const contatosEmergenciaService = {
  /**
   * Lista todos os contatos de emergência (paginado)
   */
  async list(page = 1): Promise<APIPaginatedResponse<APIContatoEmergencia>> {
    const { data } = await apiClient.get<APIPaginatedResponse<APIContatoEmergencia>>(
      `/contatos-emergencia/?page=${page}`,
    );
    return data;
  },

  /**
   * Busca um contato de emergência por ID
   */
  async getById(id: number): Promise<APIContatoEmergencia> {
    const { data } = await apiClient.get<APIContatoEmergencia>(`/contatos-emergencia/${id}/`);
    return data;
  },

  /**
   * Cria um novo contato de emergência
   */
  async create(contato: APIContatoEmergenciaCreate): Promise<APIContatoEmergencia> {
    const { data } = await apiClient.post<APIContatoEmergencia>('/contatos-emergencia/', contato);
    return data;
  },

  /**
   * Atualiza um contato de emergência (completo)
   */
  async update(id: number, contato: APIContatoEmergenciaCreate): Promise<APIContatoEmergencia> {
    const { data } = await apiClient.put<APIContatoEmergencia>(
      `/contatos-emergencia/${id}/`,
      contato,
    );
    return data;
  },

  /**
   * Atualiza parcialmente um contato de emergência
   */
  async partialUpdate(
    id: number,
    contato: APIContatoEmergenciaUpdate,
  ): Promise<APIContatoEmergencia> {
    const { data } = await apiClient.patch<APIContatoEmergencia>(
      `/contatos-emergencia/${id}/`,
      contato,
    );
    return data;
  },

  /**
   * Remove um contato de emergência
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/contatos-emergencia/${id}/`);
  },
};
