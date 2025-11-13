'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import FormField from '@/components/form/form-field';
import type { FormStepProps } from '@/types/patient';

export default function InsuranceStep({
  formData,
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
        <Shield className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Convênio Médico</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="possui_convenio"
            checked={formData.possui_convenio_medico}
            onChange={(e) => onInputChange('possui_convenio_medico', e.target.checked)}
            className="h-5 w-5 rounded border-gray-300 bg-white text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            htmlFor="possui_convenio"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Possui convênio médico
          </label>
        </div>

        {formData.possui_convenio_medico && (
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FormField
              label="Nome do Convênio"
              required
              error={getFieldError('convenio_nome')}
              success={isFieldValid('convenio_nome')}
            >
              <input
                type="text"
                value={formData.convenio_nome}
                onChange={(e) => onInputChange('convenio_nome', e.target.value)}
                className={`w-full rounded-lg border px-4 py-3 transition-colors ${
                  getFieldError('convenio_nome')
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : isFieldValid('convenio_nome')
                      ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                } bg-white focus:ring-2 dark:bg-gray-800`}
                placeholder="Ex: Unimed, Bradesco Saúde"
              />
            </FormField>

            <FormField
              label="Número da Carteirinha"
              required
              error={getFieldError('numero_carteirinha')}
              success={isFieldValid('numero_carteirinha')}
            >
              <input
                type="text"
                value={formData.numero_carteirinha}
                onChange={(e) => onInputChange('numero_carteirinha', e.target.value)}
                className={`w-full rounded-lg border px-4 py-3 transition-colors ${
                  getFieldError('numero_carteirinha')
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : isFieldValid('numero_carteirinha')
                      ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                } bg-white focus:ring-2 dark:bg-gray-800`}
                placeholder="Digite o número da carteirinha"
              />
            </FormField>

            <FormField
              label="Validade da Carteirinha"
              required
              error={getFieldError('validade_carteirinha')}
              success={isFieldValid('validade_carteirinha')}
            >
              <input
                type="text"
                value={formData.validade_carteirinha}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, '')
                    .replace(/(\d{2})(\d)/, '$1/$2')
                    .replace(/(\/\d{4})\d+?$/, '$1');
                  onInputChange('validade_carteirinha', value);
                }}
                className={`w-full rounded-lg border px-4 py-3 transition-colors ${
                  getFieldError('validade_carteirinha')
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : isFieldValid('validade_carteirinha')
                      ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500'
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                } bg-white focus:ring-2 dark:bg-gray-800`}
                placeholder="MM/AAAA"
                maxLength={7}
              />
            </FormField>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
