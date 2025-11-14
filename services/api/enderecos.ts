/**
 * Service para operações com Endereços na API
 */

import { apiClient } from '@/lib/api/client';
import type {
  APIEndereco,
  APIEnderecoCreate,
  APIEnderecoUpdate,
  APIPaginatedResponse,
} from '@/types/api';

export const enderecosService = {
  /**
   * Lista todos os endereços (paginado)
   */
  async list(page = 1): Promise<APIPaginatedResponse<APIEndereco>> {
    const { data } = await apiClient.get<APIPaginatedResponse<APIEndereco>>(
      `/enderecos/?page=${page}`,
    );
    return data;
  },

  /**
   * Busca um endereço por ID
   */
  async getById(id: number): Promise<APIEndereco> {
    const { data } = await apiClient.get<APIEndereco>(`/enderecos/${id}/`);
    return data;
  },

  /**
   * Cria um novo endereço
   */
  async create(endereco: APIEnderecoCreate): Promise<APIEndereco> {
    const { data } = await apiClient.post<APIEndereco>('/enderecos/', endereco);
    return data;
  },

  /**
   * Atualiza um endereço (completo)
   */
  async update(id: number, endereco: APIEnderecoCreate): Promise<APIEndereco> {
    const { data } = await apiClient.put<APIEndereco>(`/enderecos/${id}/`, endereco);
    return data;
  },

  /**
   * Atualiza parcialmente um endereço
   */
  async partialUpdate(id: number, endereco: APIEnderecoUpdate): Promise<APIEndereco> {
    const { data } = await apiClient.patch<APIEndereco>(`/enderecos/${id}/`, endereco);
    return data;
  },

  /**
   * Remove um endereço
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/enderecos/${id}/`);
  },
};
