/**
 * Service para operações com Pacientes na API
 *
 * IMPORTANTE: Este service gerencia o fluxo completo de criação/atualização de pacientes,
 * incluindo a criação/atualização de endereços e contatos de emergência relacionados.
 */

import { apiClient } from '@/lib/api/client';
import type {
  APIPaciente,
  APIPacienteCompleto,
  APIPacienteCreate,
  APIPacienteUpdate,
  APIPaginatedResponse,
  APIPacienteQueryParams,
  APIEnderecoCreate,
  APIContatoEmergenciaCreate,
} from '@/types/api';
import { enderecosService } from './enderecos';
import { contatosEmergenciaService } from './contatos-emergencia';

export const pacientesService = {
  /**
   * Lista todos os pacientes (paginado)
   * Suporta parâmetros de busca e filtros
   */
  async list(params: APIPacienteQueryParams = {}): Promise<APIPaginatedResponse<APIPaciente>> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.cpf) queryParams.append('cpf', params.cpf);
    if (params.nome) queryParams.append('nome', params.nome);
    if (params.sexo_biologico) queryParams.append('sexo_biologico', params.sexo_biologico);
    if (params.search) queryParams.append('search', params.search);
    if (params.ordering) queryParams.append('ordering', params.ordering);

    const queryString = queryParams.toString();
    const url = queryString ? `/pacientes/?${queryString}` : '/pacientes/';

    const { data } = await apiClient.get<APIPaginatedResponse<APIPaciente>>(url);
    return data;
  },

  /**
   * Busca um paciente por ID
   * Retorna dados completos incluindo endereço e contato de emergência expandidos
   */
  async getById(id: number): Promise<APIPacienteCompleto> {
    const { data } = await apiClient.get<APIPaciente>(`/pacientes/${id}/`);

    // Busca dados relacionados
    const [endereco, contatoEmergencia] = await Promise.all([
      enderecosService.getById(data.endereco),
      contatosEmergenciaService.getById(data.contato_emergencia),
    ]);

    // Retorna paciente completo com dados expandidos
    return {
      ...data,
      endereco,
      contato_emergencia: contatoEmergencia,
    };
  },

  /**
   * Cria um novo paciente
   *
   * Fluxo:
   * 1. Cria endereço
   * 2. Cria contato de emergência
   * 3. Cria paciente com IDs dos anteriores
   *
   * Se qualquer etapa falhar, faz rollback das anteriores
   */
  async create(
    pacienteData: Omit<APIPacienteCreate, 'endereco' | 'contato_emergencia'>,
    enderecoData: APIEnderecoCreate,
    contatoEmergenciaData: APIContatoEmergenciaCreate,
  ): Promise<APIPacienteCompleto> {
    let enderecoId: number | null = null;
    let contatoEmergenciaId: number | null = null;

    try {
      // 1. Criar endereço
      const endereco = await enderecosService.create(enderecoData);
      enderecoId = endereco.id;

      // 2. Criar contato de emergência
      const contatoEmergencia = await contatosEmergenciaService.create(contatoEmergenciaData);
      contatoEmergenciaId = contatoEmergencia.id;

      // 3. Criar paciente com os IDs
      const pacientePayload: APIPacienteCreate = {
        ...pacienteData,
        endereco: enderecoId,
        contato_emergencia: contatoEmergenciaId,
      };

      const { data: paciente } = await apiClient.post<APIPaciente>('/pacientes/', pacientePayload);

      // Retornar paciente completo
      return {
        ...paciente,
        endereco,
        contato_emergencia: contatoEmergencia,
      };
    } catch (error) {
      // Rollback: deletar recursos criados em caso de erro
      if (contatoEmergenciaId) {
        try {
          await contatosEmergenciaService.delete(contatoEmergenciaId);
        } catch {
          // Ignora erro de rollback
        }
      }

      if (enderecoId) {
        try {
          await enderecosService.delete(enderecoId);
        } catch {
          // Ignora erro de rollback
        }
      }

      throw error;
    }
  },

  /**
   * Atualiza um paciente existente (PUT - completo)
   */
  async update(id: number, pacienteData: APIPacienteCreate): Promise<APIPaciente> {
    const { data } = await apiClient.put<APIPaciente>(`/pacientes/${id}/`, pacienteData);
    return data;
  },

  /**
   * Atualiza parcialmente um paciente (PATCH)
   *
   * Para atualizar endereço ou contato de emergência, use os services específicos
   */
  async partialUpdate(id: number, pacienteData: APIPacienteUpdate): Promise<APIPaciente> {
    const { data } = await apiClient.patch<APIPaciente>(`/pacientes/${id}/`, pacienteData);
    return data;
  },

  /**
   * Atualiza paciente completo incluindo endereço e contato
   *
   * Atualiza os três recursos separadamente
   */
  async updateComplete(
    id: number,
    pacienteData: Omit<APIPacienteCreate, 'endereco' | 'contato_emergencia'>,
    enderecoId: number,
    enderecoData: APIEnderecoCreate,
    contatoEmergenciaId: number,
    contatoEmergenciaData: APIContatoEmergenciaCreate,
  ): Promise<APIPacienteCompleto> {
    // Atualizar em paralelo quando possível
    const [endereco, contatoEmergencia] = await Promise.all([
      enderecosService.update(enderecoId, enderecoData),
      contatosEmergenciaService.update(contatoEmergenciaId, contatoEmergenciaData),
    ]);

    // Atualizar paciente
    const pacientePayload: APIPacienteCreate = {
      ...pacienteData,
      endereco: enderecoId,
      contato_emergencia: contatoEmergenciaId,
    };

    const { data: paciente } = await apiClient.patch<APIPaciente>(
      `/pacientes/${id}/`,
      pacientePayload,
    );

    return {
      ...paciente,
      endereco,
      contato_emergencia: contatoEmergencia,
    };
  },

  /**
   * Remove um paciente
   *
   * NOTA: Considere se deve deletar endereço e contato de emergência também
   * Atualmente apenas deleta o paciente
   */
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/pacientes/${id}/`);
  },

  /**
   * Busca pacientes por termo de busca
   */
  async search(term: string, page = 1): Promise<APIPaginatedResponse<APIPaciente>> {
    return this.list({ search: term, page });
  },
};
