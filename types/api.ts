/**
 * Types correspondentes aos modelos da API Django REST
 * Baseado na documentação da API em:
 * http://localhost:8000/api/
 */

// ============================================================================
// TIPOS PRINCIPAIS DA API
// ============================================================================

/**
 * Endereço - Modelo da API
 */
export interface APIEndereco {
  id: number;
  cep: string; // 9 chars (formato: 01234-567)
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string; // UF (2 chars, ex: SP)
}

/**
 * Contato de Emergência - Modelo da API
 */
export interface APIContatoEmergencia {
  id: number;
  cpf: string;
  nome: string;
  telefone: string;
  rg: string;
  email: string;
  estado_civil: string;
  nacionalidade: string;
  profissao: string;
}

/**
 * Paciente - Modelo da API
 */
export interface APIPaciente {
  id: number;
  cpf: string; // Único (max 14 chars)
  rg: string; // max 20 chars
  nome: string;
  sexo_biologico: 'M' | 'F';
  data_nascimento: string; // Formato: YYYY-MM-DD
  telefone: string;
  email: string;
  estado_civil: string;
  nacionalidade: string;
  profissao: string;
  possui_convenio_medico: boolean;
  convenio_nome?: string;
  numero_carteirinha?: string;
  validade_carteirinha?: string; // Formato: mm/aaaa
  endereco: number; // FK - ID do endereço
  contato_emergencia: number; // FK - ID do contato de emergência
  criado_em?: string; // Data de criação (ISO 8601)
  atualizado_em?: string; // Data de última atualização (ISO 8601)
}

/**
 * Paciente Completo - Retornado pelo GET /api/pacientes/{id}/
 * Com dados expandidos (nested serializers)
 */
export interface APIPacienteCompleto extends Omit<APIPaciente, 'endereco' | 'contato_emergencia'> {
  endereco: APIEndereco;
  contato_emergencia: APIContatoEmergencia;
  financeiro?: APIFinanceiro;
}

/**
 * Financeiro - Modelo da API
 */
export interface APIFinanceiro {
  id: number;
  paciente: number; // FK - ID do paciente
  responsavel_eh_paciente: boolean;
  nome_responsavel: string;
  cpf_responsavel: string;
  telefone_responsavel: string;
  email_responsavel: string;
  cep?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  forma_pagamento: 'cartao' | 'boleto' | 'pix' | 'dinheiro' | 'outro';
  observacoes?: string;
}

/**
 * Profissional de Saúde - Modelo da API
 */
export interface APIProfissionalSaude {
  id: number;
  cpf: string;
  nome: string;
  sexo_biologico: 'M' | 'F';
  data_nascimento: string; // YYYY-MM-DD
  telefone: string;
  email: string;
  especialidade: string;
  numero_registro: string; // CRM, CRO, etc.
  endereco: number; // FK
  contato_emergencia: number; // FK
  criado_em: string; // datetime ISO 8601
  atualizado_em: string; // datetime ISO 8601
}

// ============================================================================
// TIPOS DE RESPOSTA DA API
// ============================================================================

/**
 * Resposta paginada padrão da API Django REST
 */
export interface APIPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/**
 * Resposta de erro padrão da API
 */
export interface APIError {
  detail?: string;
  [field: string]: string[] | string | undefined;
}

// ============================================================================
// TIPOS PARA CRIAÇÃO (Omit<Type, 'id'>)
// ============================================================================

export type APIEnderecoCreate = Omit<APIEndereco, 'id'>;
export type APIContatoEmergenciaCreate = Omit<APIContatoEmergencia, 'id'>;
export type APIPacienteCreate = Omit<APIPaciente, 'id'>;
export type APIFinanceiroCreate = Omit<APIFinanceiro, 'id'>;

// ============================================================================
// TIPOS PARA ATUALIZAÇÃO (Partial)
// ============================================================================

export type APIEnderecoUpdate = Partial<APIEnderecoCreate>;
export type APIContatoEmergenciaUpdate = Partial<APIContatoEmergenciaCreate>;
export type APIPacienteUpdate = Partial<APIPacienteCreate>;
export type APIFinanceiroUpdate = Partial<APIFinanceiroCreate>;

// ============================================================================
// TIPOS DE AUTENTICAÇÃO JWT
// ============================================================================

/**
 * Usuário customizado do sistema (CustomUser model)
 * Retornado pelo endpoint GET /api/accounts/me/
 */
export interface APICustomUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string; // Propriedade calculada (first_name + last_name)
  phone?: string;
  is_active: boolean;
  is_staff: boolean;
  date_joined: string; // datetime ISO 8601
  last_login?: string; // datetime ISO 8601
}

/**
 * Resposta do endpoint de login (POST /api/accounts/login/)
 */
export interface APITokenResponse {
  access: string;
  refresh: string;
}

/**
 * Resposta do endpoint de refresh (POST /api/token/refresh/)
 */
export interface APITokenRefreshResponse {
  access: string;
}

/**
 * Credenciais de login
 */
export interface APILoginCredentials {
  username: string;
  password: string;
}

/**
 * Payload para logout (POST /api/accounts/logout/)
 */
export interface APILogoutPayload {
  refresh: string;
}

// ============================================================================
// TIPOS AUXILIARES
// ============================================================================

/**
 * Parâmetros de query para listagem de pacientes
 */
export interface APIPacienteQueryParams {
  page?: number;
  cpf?: string;
  nome?: string;
  sexo_biologico?: 'M' | 'F';
  search?: string;
  ordering?: string;
}

/**
 * Status HTTP comuns da API
 */
export enum APIStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
