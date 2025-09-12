export interface Patient {
  id: number;
  nome: string;
  cpf: string;
  rg?: string;
  email: string;
  telefone: string;
  data_nascimento: string;
  sexo_biologico: 'M' | 'F';
  status: 'Ativo' | 'Inativo' | 'Suspenso';
  plano: string;
  ultima_consulta: string;
  data_cadastro: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  contato_emergencia: {
    nome: string;
    parentesco: string;
    telefone: string;
    email?: string;
  };
  convenio_medico: {
    possui: boolean;
    empresa?: string;
    numero_carteira?: string;
    validade?: string;
  };
  observacoes?: string;
}

export interface PatientFormData {
  // Personal Data
  nome: string;
  cpf: string;
  rg: string;
  email: string;
  telefone: string;
  data_nascimento: string;
  sexo_biologico: 'M' | 'F';

  // Address
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;

  // Emergency Contact
  contato_emergencia_nome: string;
  contato_emergencia_parentesco: string;
  contato_emergencia_telefone: string;
  contato_emergencia_email: string;

  // Insurance
  possui_convenio_medico: boolean;
  convenio_empresa: string;
  convenio_numero_carteira: string;
  convenio_validade: string;

  // Additional
  observacoes: string;
}

export interface FormStepProps {
  formData: PatientFormData;
  errors: Array<{ field: string; message: string }>;
  touchedFields: Set<string>;
  validFields: Set<string>;
  onInputChange: (field: string, value: string | boolean, section?: string) => void;
  getFieldError: (field: string) => string | undefined;
  isFieldValid: (field: string) => boolean;
}
