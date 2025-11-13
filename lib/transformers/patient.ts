/**
 * Transformers para converter dados entre API (Django) e UI (Front-end)
 *
 * Responsabilidade:
 * - transformAPIToUI: Converte dados vindos da API para o formato esperado pela UI
 * - transformUIToAPI: Converte dados do formulário para o formato esperado pela API
 */

import type {
  APIPaciente,
  APIPacienteCompleto,
  APIEndereco,
  APIContatoEmergencia,
  APIEnderecoCreate,
  APIContatoEmergenciaCreate,
  APIPacienteCreate,
} from '@/types/api';
import type { Patient, PatientFormData } from '@/types/patient';

// ============================================================================
// API → UI (Para Exibição)
// ============================================================================

/**
 * Transforma um paciente completo da API para o formato de UI
 * Usado em: Detalhes do paciente, Edição
 */
export function transformAPIPacienteToUI(apiPaciente: APIPacienteCompleto): Patient {
  return {
    id: apiPaciente.id,
    nome: apiPaciente.nome,
    cpf: apiPaciente.cpf,
    rg: apiPaciente.rg,
    email: apiPaciente.email,
    telefone: apiPaciente.telefone,
    data_nascimento: apiPaciente.data_nascimento,
    sexo_biologico: apiPaciente.sexo_biologico,

    // ⚠️ Campos que não existem na API - valores padrão temporários
    // TODO: Adicionar esses campos na API ou remover da UI
    status: 'Ativo',
    plano: 'Essencial',
    ultima_consulta: new Date().toISOString().split('T')[0],
    data_cadastro: new Date().toISOString().split('T')[0],

    // Endereço - mapeamento de nomenclatura
    endereco: {
      cep: apiPaciente.endereco.cep,
      logradouro: apiPaciente.endereco.rua, // API usa 'rua', UI usa 'logradouro'
      numero: apiPaciente.endereco.numero,
      complemento: apiPaciente.endereco.complemento,
      bairro: apiPaciente.endereco.bairro,
      cidade: apiPaciente.endereco.cidade,
      estado: apiPaciente.endereco.estado,
    },

    // Contato de emergência
    contato_emergencia: {
      nome: apiPaciente.contato_emergencia.nome,
      parentesco: 'Não informado', // ⚠️ Campo não existe na API
      telefone: apiPaciente.contato_emergencia.telefone,
      email: apiPaciente.contato_emergencia.email,
    },

    // Convênio médico
    convenio_medico: {
      possui: apiPaciente.possui_convenio_medico,
      empresa: apiPaciente.convenio_nome,
      numero_carteira: apiPaciente.numero_carteirinha,
      validade: apiPaciente.validade_carteirinha,
    },

    observacoes: '', // ⚠️ Campo não existe na API atualmente
  };
}

/**
 * Transforma um paciente básico da API (sem dados expandidos) para UI
 * Usado em: Listagem de pacientes
 *
 * NOTA: Não inclui dados completos de endereço/contato pois a lista retorna apenas IDs
 */
export function transformAPIPacienteBasicoToUI(
  apiPaciente: APIPaciente,
  endereco?: APIEndereco,
  contatoEmergencia?: APIContatoEmergencia,
): Patient {
  // Dados básicos do paciente
  const patient: Patient = {
    id: apiPaciente.id,
    nome: apiPaciente.nome,
    cpf: apiPaciente.cpf,
    rg: apiPaciente.rg,
    email: apiPaciente.email,
    telefone: apiPaciente.telefone,
    data_nascimento: apiPaciente.data_nascimento,
    sexo_biologico: apiPaciente.sexo_biologico,

    // Campos mockados
    status: 'Ativo',
    plano: 'Essencial',
    ultima_consulta: new Date().toISOString().split('T')[0],
    data_cadastro: new Date().toISOString().split('T')[0],

    // Endereço - dados completos se disponível, caso contrário valores padrão
    endereco: endereco
      ? {
          cep: endereco.cep,
          logradouro: endereco.rua,
          numero: endereco.numero,
          complemento: endereco.complemento,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          estado: endereco.estado,
        }
      : {
          cep: '',
          logradouro: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: '',
        },

    // Contato de emergência
    contato_emergencia: contatoEmergencia
      ? {
          nome: contatoEmergencia.nome,
          parentesco: 'Não informado',
          telefone: contatoEmergencia.telefone,
          email: contatoEmergencia.email,
        }
      : {
          nome: '',
          parentesco: '',
          telefone: '',
        },

    // Convênio
    convenio_medico: {
      possui: apiPaciente.possui_convenio_medico,
      empresa: apiPaciente.convenio_nome,
      numero_carteira: apiPaciente.numero_carteirinha,
      validade: apiPaciente.validade_carteirinha,
    },
  };

  return patient;
}

/**
 * Transforma dados completos da API para o formato de formulário
 * Usado em: Edição de paciente
 */
export function transformAPIPacienteToFormData(apiPaciente: APIPacienteCompleto): PatientFormData {
  return {
    // Dados pessoais
    nome: apiPaciente.nome,
    cpf: apiPaciente.cpf,
    rg: apiPaciente.rg,
    email: apiPaciente.email,
    telefone: apiPaciente.telefone,
    data_nascimento: apiPaciente.data_nascimento,
    sexo_biologico: apiPaciente.sexo_biologico,
    estado_civil: apiPaciente.estado_civil,
    nacionalidade: apiPaciente.nacionalidade,
    profissao: apiPaciente.profissao,

    // Endereço
    cep: apiPaciente.endereco.cep,
    logradouro: apiPaciente.endereco.rua,
    numero: apiPaciente.endereco.numero,
    complemento: apiPaciente.endereco.complemento || '',
    bairro: apiPaciente.endereco.bairro,
    cidade: apiPaciente.endereco.cidade,
    estado: apiPaciente.endereco.estado,

    // Estrutura de endereço aninhada (para compatibilidade)
    endereco: {
      cep: apiPaciente.endereco.cep,
      rua: apiPaciente.endereco.rua,
      numero: apiPaciente.endereco.numero,
      complemento: apiPaciente.endereco.complemento || '',
      bairro: apiPaciente.endereco.bairro,
      cidade: apiPaciente.endereco.cidade,
      estado: apiPaciente.endereco.estado,
    },

    // Contato de emergência
    contato_emergencia_nome: apiPaciente.contato_emergencia.nome,
    contato_emergencia_parentesco: 'Não informado',
    contato_emergencia_telefone: apiPaciente.contato_emergencia.telefone,
    contato_emergencia_email: apiPaciente.contato_emergencia.email || '',

    // Estrutura de contato aninhada (para compatibilidade)
    contato_emergencia: {
      cpf: apiPaciente.contato_emergencia.cpf,
      nome: apiPaciente.contato_emergencia.nome,
      telefone: apiPaciente.contato_emergencia.telefone,
      rg: apiPaciente.contato_emergencia.rg,
      email: apiPaciente.contato_emergencia.email || '',
      estado_civil: apiPaciente.contato_emergencia.estado_civil,
      nacionalidade: apiPaciente.contato_emergencia.nacionalidade,
      profissao: apiPaciente.contato_emergencia.profissao,
    },

    // Convênio médico
    possui_convenio_medico: apiPaciente.possui_convenio_medico,
    convenio_empresa: apiPaciente.convenio_nome || '',
    convenio_numero_carteira: apiPaciente.numero_carteirinha || '',
    convenio_validade: apiPaciente.validade_carteirinha || '',
    convenio_nome: apiPaciente.convenio_nome || '',
    numero_carteirinha: apiPaciente.numero_carteirinha || '',
    validade_carteirinha: apiPaciente.validade_carteirinha || '',

    // Observações
    observacoes: '',
  };
}

// ============================================================================
// UI → API (Para Criar/Atualizar)
// ============================================================================

/**
 * Transforma dados do formulário para o formato esperado pela API
 * Retorna objetos separados para criar endereço, contato e paciente
 *
 * Usado em: Criação de paciente
 */
export function transformFormDataToAPI(formData: PatientFormData): {
  endereco: APIEnderecoCreate;
  contatoEmergencia: APIContatoEmergenciaCreate;
  paciente: Omit<APIPacienteCreate, 'endereco' | 'contato_emergencia'>;
} {
  return {
    // Endereço
    endereco: {
      cep: formData.endereco?.cep || formData.cep,
      rua: formData.endereco?.rua || formData.logradouro,
      numero: formData.endereco?.numero || formData.numero,
      complemento: formData.endereco?.complemento || formData.complemento || undefined,
      bairro: formData.endereco?.bairro || formData.bairro,
      cidade: formData.endereco?.cidade || formData.cidade,
      estado: formData.endereco?.estado || formData.estado,
    },

    // Contato de emergência
    contatoEmergencia: {
      cpf: formData.contato_emergencia?.cpf || '',
      nome: formData.contato_emergencia?.nome || formData.contato_emergencia_nome,
      telefone: formData.contato_emergencia?.telefone || formData.contato_emergencia_telefone,
      rg: formData.contato_emergencia?.rg || '',
      email: formData.contato_emergencia?.email || formData.contato_emergencia_email || '',
      estado_civil: formData.contato_emergencia?.estado_civil || 'Não informado',
      nacionalidade: formData.contato_emergencia?.nacionalidade || 'Brasileira',
      profissao: formData.contato_emergencia?.profissao || 'Não informado',
    },

    // Paciente (sem IDs de FK)
    paciente: {
      cpf: formData.cpf,
      rg: formData.rg,
      nome: formData.nome,
      sexo_biologico: formData.sexo_biologico,
      data_nascimento: formData.data_nascimento,
      telefone: formData.telefone,
      email: formData.email,
      estado_civil: formData.estado_civil as string,
      nacionalidade: formData.nacionalidade as string,
      profissao: formData.profissao as string,
      possui_convenio_medico: formData.possui_convenio_medico,
      convenio_nome: formData.possui_convenio_medico
        ? (formData.convenio_nome || formData.convenio_empresa) as string
        : undefined,
      numero_carteirinha: formData.possui_convenio_medico
        ? (formData.numero_carteirinha || formData.convenio_numero_carteira) as string
        : undefined,
      validade_carteirinha: formData.possui_convenio_medico
        ? (formData.validade_carteirinha || formData.convenio_validade) as string
        : undefined,
    },
  };
}

/**
 * Transforma dados do formulário para atualização parcial do paciente
 * Usado em: Edição de paciente (PATCH)
 */
export function transformFormDataToPacienteUpdate(
  formData: Partial<PatientFormData>,
): Partial<APIPacienteCreate> {
  const update: Partial<APIPacienteCreate> = {};

  if (formData.cpf !== undefined) update.cpf = formData.cpf;
  if (formData.rg !== undefined) update.rg = formData.rg;
  if (formData.nome !== undefined) update.nome = formData.nome;
  if (formData.sexo_biologico !== undefined) update.sexo_biologico = formData.sexo_biologico;
  if (formData.data_nascimento !== undefined) update.data_nascimento = formData.data_nascimento;
  if (formData.telefone !== undefined) update.telefone = formData.telefone;
  if (formData.email !== undefined) update.email = formData.email;
  if (formData.estado_civil !== undefined) update.estado_civil = formData.estado_civil as string;
  if (formData.nacionalidade !== undefined) update.nacionalidade = formData.nacionalidade as string;
  if (formData.profissao !== undefined) update.profissao = formData.profissao as string;
  if (formData.possui_convenio_medico !== undefined)
    update.possui_convenio_medico = formData.possui_convenio_medico;

  if (formData.convenio_nome !== undefined || formData.convenio_empresa !== undefined) {
    update.convenio_nome = (formData.convenio_nome || formData.convenio_empresa) as string;
  }

  if (
    formData.numero_carteirinha !== undefined ||
    formData.convenio_numero_carteira !== undefined
  ) {
    update.numero_carteirinha = (formData.numero_carteirinha ||
      formData.convenio_numero_carteira) as string;
  }

  if (formData.validade_carteirinha !== undefined || formData.convenio_validade !== undefined) {
    update.validade_carteirinha = (formData.validade_carteirinha ||
      formData.convenio_validade) as string;
  }

  return update;
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Calcula a idade a partir da data de nascimento
 */
export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

/**
 * Formata CPF para exibição (123.456.789-00)
 */
export function formatCPF(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return cpf;

  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
}

/**
 * Formata telefone para exibição
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }

  return phone;
}

/**
 * Formata CEP para exibição (01234-567)
 */
export function formatCEP(cep: string): string {
  const cleaned = cep.replace(/\D/g, '');
  if (cleaned.length !== 8) return cep;

  return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
}
