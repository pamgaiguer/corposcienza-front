/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  MapPin,
  Phone,
  Shield,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { validatePatientForm, type ValidationError } from '@/utils/validation';
import type { PatientFormData } from '@/types/patient';
import PersonalDataStep from './personal-data-step';
import AddressStep from './address-step';
import EmergencyContactStep from './emergency-contact-step';
import InsuranceStep from './insurance-step';

interface PatientFormProps {
  initialData?: PatientFormData;
  onSubmit: (data: PatientFormData) => Promise<void>;
  isSubmitting: boolean;
  submitButtonText: string;
  title: string;
  hasChanges?: boolean;
  onReset?: () => void;
}

const defaultFormData: PatientFormData = {
  cpf: '',
  rg: '',
  nome: '',
  sexo_biologico: '',
  data_nascimento: '',
  telefone: '',
  email: '',
  estado_civil: '',
  nacionalidade: 'Brasileira',
  profissao: '',
  endereco: {
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  },
  contato_emergencia: {
    cpf: '',
    nome: '',
    telefone: '',
    rg: '',
    email: '',
    estado_civil: '',
    nacionalidade: 'Brasileira',
    profissao: '',
  },
  possui_convenio_medico: false,
  convenio_nome: '',
  numero_carteirinha: '',
  validade_carteirinha: '',
};

export default function PatientForm({
  initialData,
  onSubmit,
  isSubmitting,
  submitButtonText,
  title,
  hasChanges,
  onReset,
}: PatientFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [validFields, setValidFields] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState<PatientFormData>(initialData || defaultFormData);

  const steps = [
    { id: 1, title: 'Dados Pessoais', icon: User },
    { id: 2, title: 'Endereço', icon: MapPin },
    { id: 3, title: 'Contato de Emergência', icon: Phone },
    { id: 4, title: 'Convênio Médico', icon: Shield },
  ];

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);

      // Mark all fields as initially valid and touched for edit mode
      const allFields = [
        'nome',
        'cpf',
        'rg',
        'sexo_biologico',
        'data_nascimento',
        'telefone',
        'email',
        'estado_civil',
        'nacionalidade',
        'profissao',
        'endereco.cep',
        'endereco.rua',
        'endereco.numero',
        'endereco.bairro',
        'endereco.cidade',
        'endereco.estado',
        'contato_emergencia.nome',
        'contato_emergencia.cpf',
        'contato_emergencia.rg',
        'contato_emergencia.telefone',
        'contato_emergencia.email',
        'contato_emergencia.estado_civil',
        'contato_emergencia.nacionalidade',
        'contato_emergencia.profissao',
      ];

      if (initialData.possui_convenio_medico) {
        allFields.push('convenio_nome', 'numero_carteirinha', 'validade_carteirinha');
      }

      setValidFields(new Set(allFields));
      setTouchedFields(new Set(allFields));
    }
  }, [initialData]);

  // Real-time validation
  useEffect(() => {
    const validation = validatePatientForm(formData, currentStep);
    setErrors(validation.errors);

    // Update valid fields
    const currentErrors = validation.errors.map((e) => e.field);
    const fieldsToCheck = getFieldsForStep(currentStep);

    setValidFields((prev) => {
      const updated = new Set(prev);
      fieldsToCheck.forEach((field) => {
        if (!currentErrors.includes(field) && isFieldFilled(field)) {
          updated.add(field);
        } else {
          updated.delete(field);
        }
      });
      return updated;
    });
  }, [formData, currentStep]);

  const getFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 1:
        return [
          'nome',
          'cpf',
          'rg',
          'sexo_biologico',
          'data_nascimento',
          'telefone',
          'email',
          'estado_civil',
          'nacionalidade',
          'profissao',
        ];
      case 2:
        return [
          'endereco.cep',
          'endereco.rua',
          'endereco.numero',
          'endereco.bairro',
          'endereco.cidade',
          'endereco.estado',
        ];
      case 3:
        return [
          'contato_emergencia.nome',
          'contato_emergencia.cpf',
          'contato_emergencia.rg',
          'contato_emergencia.telefone',
          'contato_emergencia.email',
          'contato_emergencia.estado_civil',
          'contato_emergencia.nacionalidade',
          'contato_emergencia.profissao',
        ];
      case 4:
        return formData.possui_convenio_medico
          ? ['convenio_nome', 'numero_carteirinha', 'validade_carteirinha']
          : [];
      default:
        return [];
    }
  };

  const isFieldFilled = (field: string): boolean => {
    const keys = field.split('.');
    let value = formData as any;
    for (const key of keys) {
      value = value?.[key];
    }
    return value !== '' && value !== null && value !== undefined;
  };

  const getFieldError = (field: string): string | undefined => {
    return errors.find((error) => error.field === field)?.message;
  };

  const isFieldValid = (field: string): boolean => {
    return validFields.has(field) && touchedFields.has(field);
  };

  const handleInputChange = (field: string, value: string | boolean, section?: string) => {
    const fieldKey = section ? `${section}.${field}` : field;
    setTouchedFields((prev) => new Set(prev).add(fieldKey));

    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof PatientFormData],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all steps
    const allErrors: ValidationError[] = [];
    for (let step = 1; step <= 4; step++) {
      const validation = validatePatientForm(formData, step);
      allErrors.push(...validation.errors);
    }

    if (allErrors.length > 0) {
      setErrors(allErrors);
      // Go to first step with errors
      const firstErrorStep = Math.min(
        ...allErrors.map((error) => {
          if (error.field.startsWith('endereco.')) return 2;
          if (error.field.startsWith('contato_emergencia.')) return 3;
          if (['convenio_nome', 'numero_carteirinha', 'validade_carteirinha'].includes(error.field))
            return 4;
          return 1;
        }),
      );
      setCurrentStep(firstErrorStep);
      return;
    }

    await onSubmit(formData);
  };

  const nextStep = () => {
    const validation = validatePatientForm(formData, currentStep);
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Mark all fields in current step as touched
      const fieldsToTouch = getFieldsForStep(currentStep);
      setTouchedFields((prev) => {
        const newSet = new Set(prev);
        fieldsToTouch.forEach((field) => newSet.add(field));
        return newSet;
      });
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      setErrors([]);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors([]);
    }
  };

  const getStepValidationStatus = (stepNumber: number) => {
    const validation = validatePatientForm(formData, stepNumber);
    return validation.isValid;
  };

  const stepProps = {
    formData,
    errors,
    touchedFields,
    validFields,
    onInputChange: handleInputChange,
    getFieldError,
    isFieldValid,
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isValid = getStepValidationStatus(step.id);

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors ${
                    isCompleted
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : isCurrent
                        ? isValid
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-red-300 bg-red-100 text-red-600 dark:border-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : isCurrent && !isValid && errors.length > 0 ? (
                    <AlertTriangle className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm font-medium ${
                      isCompleted
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : isCurrent
                          ? isValid
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-red-600 dark:text-red-400'
                          : 'text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-6 h-0.5 w-24 ${isCompleted ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Summary */}
      {errors.length > 0 && (
        <motion.div
          className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-2 flex items-center gap-2 font-medium text-red-800 dark:text-red-300">
            <AlertTriangle className="h-5 w-5" />
            Corrija os seguintes erros:
          </div>
          <ul className="space-y-1 text-sm text-red-700 dark:text-red-400">
            {errors.map((error, index) => (
              <li key={index}>• {error.message}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="p-8">
          {currentStep === 1 && <PersonalDataStep {...stepProps} />}
          {currentStep === 2 && <AddressStep {...stepProps} />}
          {currentStep === 3 && <EmergencyContactStep {...stepProps} />}
          {currentStep === 4 && <InsuranceStep {...stepProps} />}
        </div>

        {/* Form Navigation */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-8 py-6 dark:border-gray-700 dark:bg-gray-800">
          <div>
            {currentStep > 1 && (
              <motion.button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </motion.button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {hasChanges !== undefined && onReset && (
              <motion.button
                type="button"
                onClick={onReset}
                className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Descartar Alterações
              </motion.button>
            )}

            {currentStep < steps.length ? (
              <motion.button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Próximo
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={isSubmitting || (hasChanges !== undefined && !hasChanges)}
                className={`inline-flex items-center rounded-lg px-6 py-2 font-medium transition-colors ${
                  hasChanges !== undefined && !hasChanges
                    ? 'cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                } disabled:bg-gray-400 dark:disabled:bg-gray-600`}
                whileHover={{
                  scale: isSubmitting || (hasChanges !== undefined && !hasChanges) ? 1 : 1.02,
                }}
                whileTap={{
                  scale: isSubmitting || (hasChanges !== undefined && !hasChanges) ? 1 : 0.98,
                }}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {submitButtonText}
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
