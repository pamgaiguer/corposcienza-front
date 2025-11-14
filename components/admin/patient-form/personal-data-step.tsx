/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import FormField from '@/components/form/form-field';
import type { FormStepProps } from '@/types/patient';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const estadosCivis = [
  'Solteiro(a)',
  'Casado(a)',
  'Divorciado(a)',
  'Viúvo(a)',
  'União Estável',
  'Separado(a)',
];

const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

export default function PersonalDataStep({
  formData,
  errors,
  touchedFields,
  validFields,
  onInputChange,
  getFieldError,
  isFieldValid,
}: FormStepProps) {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6 flex items-center gap-3">
        <User className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Dados Pessoais</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          label="Nome Completo"
          required
          error={getFieldError('nome')}
          success={isFieldValid('nome')}
        >
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => onInputChange('nome', e.target.value)}
            className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 ${
              getFieldError('nome')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:focus:border-red-500'
                : isFieldValid('nome')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-700 dark:focus:border-emerald-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400'
            } focus:ring-2`}
            placeholder="Digite o nome completo"
          />
        </FormField>

        <FormField label="CPF" required error={getFieldError('cpf')} success={isFieldValid('cpf')}>
          <input
            type="text"
            value={formData.cpf}
            onChange={(e) => onInputChange('cpf', formatCPF(e.target.value))}
            className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 ${
              getFieldError('cpf')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:focus:border-red-500'
                : isFieldValid('cpf')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-700 dark:focus:border-emerald-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400'
            } focus:ring-2`}
            placeholder="000.000.000-00"
            maxLength={14}
          />
        </FormField>

        <FormField label="RG" required error={getFieldError('rg')} success={isFieldValid('rg')}>
          <input
            type="text"
            value={formData.rg}
            onChange={(e) => onInputChange('rg', e.target.value)}
            className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 ${
              getFieldError('rg')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:focus:border-red-500'
                : isFieldValid('rg')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-700 dark:focus:border-emerald-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400'
            } focus:ring-2`}
            placeholder="Digite o RG"
          />
        </FormField>

        <FormField
          label="Sexo Biológico"
          required
          error={getFieldError('sexo_biologico')}
          success={isFieldValid('sexo_biologico')}
        >
          <select
            value={formData.sexo_biologico}
            onChange={(e) => onInputChange('sexo_biologico', e.target.value)}
            className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 ${
              getFieldError('sexo_biologico')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:focus:border-red-500'
                : isFieldValid('sexo_biologico')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-700 dark:focus:border-emerald-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400'
            } focus:ring-2`}
          >
            <option value="">Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </FormField>

        <FormField
          label="Data de Nascimento"
          required
          error={getFieldError('data_nascimento')}
          success={isFieldValid('data_nascimento')}
        >
          <input
            type="date"
            value={formData.data_nascimento}
            onChange={(e) => onInputChange('data_nascimento', e.target.value)}
            className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 ${
              getFieldError('data_nascimento')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:focus:border-red-500'
                : isFieldValid('data_nascimento')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-700 dark:focus:border-emerald-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400'
            } focus:ring-2`}
          />
        </FormField>

        <FormField
          label="Telefone"
          required
          error={getFieldError('telefone')}
          success={isFieldValid('telefone')}
        >
          <input
            type="text"
            value={formData.telefone}
            onChange={(e) => onInputChange('telefone', formatPhone(e.target.value))}
            className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 ${
              getFieldError('telefone')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:focus:border-red-500'
                : isFieldValid('telefone')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-700 dark:focus:border-emerald-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400'
            } focus:ring-2`}
            placeholder="(11) 99999-9999"
            maxLength={15}
          />
        </FormField>

        <FormField
          label="E-mail"
          required
          error={getFieldError('email')}
          success={isFieldValid('email')}
        >
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 ${
              getFieldError('email')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:focus:border-red-500'
                : isFieldValid('email')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-700 dark:focus:border-emerald-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400'
            } focus:ring-2`}
            placeholder="email@exemplo.com"
          />
        </FormField>

        <FormField
          label="Estado Civil"
          required
          error={getFieldError('estado_civil')}
          success={isFieldValid('estado_civil')}
        >
          <select
            value={formData.estado_civil}
            onChange={(e) => onInputChange('estado_civil', e.target.value)}
            className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 ${
              getFieldError('estado_civil')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:focus:border-red-500'
                : isFieldValid('estado_civil')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-700 dark:focus:border-emerald-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400'
            } focus:ring-2`}
          >
            <option value="">Selecione</option>
            {estadosCivis.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Nacionalidade"
          required
          error={getFieldError('nacionalidade')}
          success={isFieldValid('nacionalidade')}
        >
          <input
            type="text"
            value={formData.nacionalidade}
            onChange={(e) => onInputChange('nacionalidade', e.target.value)}
            className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 ${
              getFieldError('nacionalidade')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:focus:border-red-500'
                : isFieldValid('nacionalidade')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-700 dark:focus:border-emerald-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400'
            } focus:ring-2`}
            placeholder="Brasileira"
          />
        </FormField>

        <FormField
          label="Profissão"
          required
          error={getFieldError('profissao')}
          success={isFieldValid('profissao')}
        >
          <input
            type="text"
            value={formData.profissao}
            onChange={(e) => onInputChange('profissao', e.target.value)}
            className={`w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 ${
              getFieldError('profissao')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700 dark:focus:border-red-500'
                : isFieldValid('profissao')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-700 dark:focus:border-emerald-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-400 dark:focus:ring-blue-400'
            } focus:ring-2`}
            placeholder="Digite a profissão"
          />
        </FormField>
      </div>
    </motion.div>
  );
}
