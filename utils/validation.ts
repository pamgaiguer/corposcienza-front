/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// CPF validation
export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');

  if (cleanCPF.length !== 11) return false;

  // Check for known invalid CPFs
  const invalidCPFs = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];

  if (invalidCPFs.includes(cleanCPF)) return false;

  // Validate CPF algorithm
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(cleanCPF.charAt(i)) * (10 - i);
  }

  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== Number.parseInt(cleanCPF.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(cleanCPF.charAt(i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== Number.parseInt(cleanCPF.charAt(10))) return false;

  return true;
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation (Brazilian format)
export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length === 10 || cleanPhone.length === 11;
};

// CEP validation
export const validateCEP = (cep: string): boolean => {
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8;
};

// Date validation
export const validateDate = (date: string): boolean => {
  if (!date) return false;
  const dateObj = new Date(date);
  const today = new Date();
  return dateObj <= today && dateObj.getFullYear() > 1900;
};

// Age validation (must be at least 18 years old)
export const validateAge = (birthDate: string): boolean => {
  if (!birthDate) return false;
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= 0; // Allow any age for medical records
  }
  return age >= 0;
};

// Name validation
export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s]+$/.test(name);
};

// RG validation (basic format check)
export const validateRG = (rg: string): boolean => {
  const cleanRG = rg.replace(/\D/g, '');
  return cleanRG.length >= 7 && cleanRG.length <= 12;
};

// Carteirinha validity validation (MM/YYYY format and future date)
export const validateCarteirinhaValidity = (validity: string): boolean => {
  if (!validity || validity.length !== 7) return false;

  const [month, year] = validity.split('/');
  const monthNum = Number.parseInt(month);
  const yearNum = Number.parseInt(year);

  if (monthNum < 1 || monthNum > 12) return false;
  if (yearNum < new Date().getFullYear()) return false;

  return true;
};

// Comprehensive form validation
export const validatePatientForm = (
  formData: any,
  currentStep: number,
): ValidationResult => {
  const errors: ValidationError[] = [];

  if (currentStep === 1) {
    // Personal data validation
    if (!formData.nome || !validateName(formData.nome)) {
      errors.push({
        field: 'nome',
        message: 'Nome deve ter pelo menos 2 caracteres e conter apenas letras',
      });
    }

    if (!formData.cpf || !validateCPF(formData.cpf)) {
      errors.push({ field: 'cpf', message: 'CPF inválido' });
    }

    if (!formData.rg || !validateRG(formData.rg)) {
      errors.push({ field: 'rg', message: 'RG deve ter entre 7 e 12 dígitos' });
    }

    if (!formData.sexo_biologico) {
      errors.push({ field: 'sexo_biologico', message: 'Selecione o sexo biológico' });
    }

    if (
      !formData.data_nascimento ||
      !validateDate(formData.data_nascimento) ||
      !validateAge(formData.data_nascimento)
    ) {
      errors.push({ field: 'data_nascimento', message: 'Data de nascimento inválida' });
    }

    if (!formData.telefone || !validatePhone(formData.telefone)) {
      errors.push({ field: 'telefone', message: 'Telefone deve ter 10 ou 11 dígitos' });
    }

    if (!formData.email || !validateEmail(formData.email)) {
      errors.push({ field: 'email', message: 'E-mail inválido' });
    }

    if (!formData.estado_civil) {
      errors.push({ field: 'estado_civil', message: 'Selecione o estado civil' });
    }

    if (!formData.nacionalidade || formData.nacionalidade.trim().length < 2) {
      errors.push({
        field: 'nacionalidade',
        message: 'Nacionalidade deve ter pelo menos 2 caracteres',
      });
    }

    if (!formData.profissao || formData.profissao.trim().length < 2) {
      errors.push({
        field: 'profissao',
        message: 'Profissão deve ter pelo menos 2 caracteres',
      });
    }
  }

  if (currentStep === 2) {
    // Address validation
    if (!formData.endereco.cep || !validateCEP(formData.endereco.cep)) {
      errors.push({ field: 'endereco.cep', message: 'CEP deve ter 8 dígitos' });
    }

    if (!formData.endereco.rua || formData.endereco.rua.trim().length < 3) {
      errors.push({
        field: 'endereco.rua',
        message: 'Rua deve ter pelo menos 3 caracteres',
      });
    }

    if (!formData.endereco.numero || formData.endereco.numero.trim().length < 1) {
      errors.push({ field: 'endereco.numero', message: 'Número é obrigatório' });
    }

    if (!formData.endereco.bairro || formData.endereco.bairro.trim().length < 2) {
      errors.push({
        field: 'endereco.bairro',
        message: 'Bairro deve ter pelo menos 2 caracteres',
      });
    }

    if (!formData.endereco.cidade || formData.endereco.cidade.trim().length < 2) {
      errors.push({
        field: 'endereco.cidade',
        message: 'Cidade deve ter pelo menos 2 caracteres',
      });
    }

    if (!formData.endereco.estado) {
      errors.push({ field: 'endereco.estado', message: 'Selecione o estado' });
    }
  }

  if (currentStep === 3) {
    // Emergency contact validation
    if (
      !formData.contato_emergencia.nome ||
      !validateName(formData.contato_emergencia.nome)
    ) {
      errors.push({
        field: 'contato_emergencia.nome',
        message: 'Nome deve ter pelo menos 2 caracteres e conter apenas letras',
      });
    }

    if (
      !formData.contato_emergencia.cpf ||
      !validateCPF(formData.contato_emergencia.cpf)
    ) {
      errors.push({ field: 'contato_emergencia.cpf', message: 'CPF inválido' });
    }

    if (!formData.contato_emergencia.rg || !validateRG(formData.contato_emergencia.rg)) {
      errors.push({
        field: 'contato_emergencia.rg',
        message: 'RG deve ter entre 7 e 12 dígitos',
      });
    }

    if (
      !formData.contato_emergencia.telefone ||
      !validatePhone(formData.contato_emergencia.telefone)
    ) {
      errors.push({
        field: 'contato_emergencia.telefone',
        message: 'Telefone deve ter 10 ou 11 dígitos',
      });
    }

    if (
      !formData.contato_emergencia.email ||
      !validateEmail(formData.contato_emergencia.email)
    ) {
      errors.push({ field: 'contato_emergencia.email', message: 'E-mail inválido' });
    }

    if (!formData.contato_emergencia.estado_civil) {
      errors.push({
        field: 'contato_emergencia.estado_civil',
        message: 'Selecione o estado civil',
      });
    }

    if (
      !formData.contato_emergencia.nacionalidade ||
      formData.contato_emergencia.nacionalidade.trim().length < 2
    ) {
      errors.push({
        field: 'contato_emergencia.nacionalidade',
        message: 'Nacionalidade deve ter pelo menos 2 caracteres',
      });
    }

    if (
      !formData.contato_emergencia.profissao ||
      formData.contato_emergencia.profissao.trim().length < 2
    ) {
      errors.push({
        field: 'contato_emergencia.profissao',
        message: 'Profissão deve ter pelo menos 2 caracteres',
      });
    }

    // Check if emergency contact is different from patient
    if (formData.contato_emergencia.cpf === formData.cpf) {
      errors.push({
        field: 'contato_emergencia.cpf',
        message: 'Contato de emergência deve ser diferente do paciente',
      });
    }
  }

  if (currentStep === 4) {
    // Insurance validation
    if (formData.possui_convenio_medico) {
      if (!formData.convenio_nome || formData.convenio_nome.trim().length < 2) {
        errors.push({
          field: 'convenio_nome',
          message: 'Nome do convênio é obrigatório',
        });
      }

      if (!formData.numero_carteirinha || formData.numero_carteirinha.trim().length < 3) {
        errors.push({
          field: 'numero_carteirinha',
          message: 'Número da carteirinha deve ter pelo menos 3 caracteres',
        });
      }

      if (
        !formData.validade_carteirinha ||
        !validateCarteirinhaValidity(formData.validade_carteirinha)
      ) {
        errors.push({
          field: 'validade_carteirinha',
          message: 'Validade deve estar no formato MM/AAAA e ser uma data futura',
        });
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
