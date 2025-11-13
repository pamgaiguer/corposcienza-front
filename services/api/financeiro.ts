/**
 * Service para operações com Dados Financeiros na API
 */

import { apiClient } from '@/lib/api/client';
import type {
  APIFinanceiro,
  APIFinanceiroCreate,
  APIFinanceiroUpdate,
  APIPaginatedResponse,
} from '@/types/api';

export const financeiroService = {
  /**
   * Lista todos os registros financeiros (paginado)
   */
  async list(page = 1): Promise<APIPaginatedResponse<APIFinanceiro>> {
    const { data } = await apiClient.get<APIPaginatedResponse<APIFinanceiro>>(
      `/financeiro/?page=${page}`,
    );
    return data;
  },

  /**
   * Busca um registro financeiro por ID
   */
  async getById(id: number): Promise<APIFinanceiro> {
    const { data } = await apiClient.get<APIFinanceiro>(`/financeiro/${id}/`);
    return data;
  },

  /**
   * Busca dados financeiros por ID do paciente
   */
  async getByPacienteId(pacienteId: number): Promise<APIFinanceiro | null> {
    try {
      const { data } = await apiClient.get<APIPaginatedResponse<APIFinanceiro>>(
        `/financeiro/?paciente=${pacienteId}`,
      );

      // Retorna o primeiro resultado ou null se não encontrar
      return data.results.length > 0 ? data.results[0] : null;
    } catch (error) {
      console.error('Erro ao buscar dados financeiros do paciente:', error);
      return null;
    }
  },

  /**
   * Cria um novo registro financeiro
   */
  async create(financeiro: APIFinanceiroCreate): Promise<APIFinanceiro> {
    const { data } = await apiClient.post<APIFinanceiro>('/financeiro/', financeiro);
    return data;
  },

  /**
   * Atualiza um registro financeiro (completo)
   */
  async update(id: number, financeiro: APIFinanceiroCreate): Promise<APIFinanceiro> {
    const { data } = await apiClient.put<APIFinanceiro>(`/financeiro/${id}/`, financeiro);
    return data;
  },

  /**
   * Atualiza parcialmente um registro financeiro
   */
  async partialUpdate(id: number, financeiro: APIFinanceiroUpdate): Promise<APIFinanceiro> {
    const { data } = await apiClient.patch<APIFinanceiro>(`/financeiro/${id}/`, financeiro);
    return data;
  },

  /**
   * Remove um registro financeiro
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/financeiro/${id}/`);
  },
};
