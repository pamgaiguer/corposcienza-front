'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import FormField from '@/components/form/form-field';
import type { FormStepProps } from '@/types/patient';

const estadosBrasil = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

const formatCEP = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
};

export default function AddressStep({
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
        <MapPin className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Endereço</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          label="CEP"
          required
          error={getFieldError('endereco.cep')}
          success={isFieldValid('endereco.cep')}
        >
          <input
            type="text"
            value={formData.endereco.cep}
            onChange={(e) => onInputChange('cep', formatCEP(e.target.value), 'endereco')}
            className={`w-full rounded-lg border px-4 py-3 transition-colors ${
              getFieldError('endereco.cep')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-600 dark:focus:ring-red-600'
                : isFieldValid('endereco.cep')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-500 dark:focus:border-emerald-600 dark:focus:ring-emerald-600'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:focus:border-blue-600 dark:focus:ring-blue-600'
            } focus:ring-2`}
            placeholder="00000-000"
            maxLength={9}
          />
        </FormField>

        <FormField
          label="Estado (UF)"
          required
          error={getFieldError('endereco.estado')}
          success={isFieldValid('endereco.estado')}
        >
          <select
            value={formData.endereco.estado}
            onChange={(e) => onInputChange('estado', e.target.value, 'endereco')}
            className={`w-full rounded-lg border px-4 py-3 transition-colors ${
              getFieldError('endereco.estado')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-600 dark:focus:ring-red-600'
                : isFieldValid('endereco.estado')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-500 dark:focus:border-emerald-600 dark:focus:ring-emerald-600'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:focus:border-blue-600 dark:focus:ring-blue-600'
            } focus:ring-2`}
          >
            <option value="">Selecione</option>
            {estadosBrasil.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
        </FormField>

        <div className="md:col-span-2">
          <FormField
            label="Rua"
            required
            error={getFieldError('endereco.rua')}
            success={isFieldValid('endereco.rua')}
          >
            <input
              type="text"
              value={formData.endereco.rua}
              onChange={(e) => onInputChange('rua', e.target.value, 'endereco')}
              className={`w-full rounded-lg border px-4 py-3 transition-colors ${
                getFieldError('endereco.rua')
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-600 dark:focus:ring-red-600'
                  : isFieldValid('endereco.rua')
                    ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-500 dark:focus:border-emerald-600 dark:focus:ring-emerald-600'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:focus:border-blue-600 dark:focus:ring-blue-600'
              } focus:ring-2`}
              placeholder="Digite o nome da rua"
            />
          </FormField>
        </div>

        <FormField
          label="Número"
          required
          error={getFieldError('endereco.numero')}
          success={isFieldValid('endereco.numero')}
        >
          <input
            type="text"
            value={formData.endereco.numero}
            onChange={(e) => onInputChange('numero', e.target.value, 'endereco')}
            className={`w-full rounded-lg border px-4 py-3 transition-colors ${
              getFieldError('endereco.numero')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-600 dark:focus:ring-red-600'
                : isFieldValid('endereco.numero')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-500 dark:focus:border-emerald-600 dark:focus:ring-emerald-600'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:focus:border-blue-600 dark:focus:ring-blue-600'
            } focus:ring-2`}
            placeholder="123"
          />
        </FormField>

        <FormField label="Complemento">
          <input
            type="text"
            value={formData.endereco.complemento}
            onChange={(e) => onInputChange('complemento', e.target.value, 'endereco')}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:focus:border-blue-600 dark:focus:ring-blue-600"
            placeholder="Apto, Bloco, etc."
          />
        </FormField>

        <FormField
          label="Bairro"
          required
          error={getFieldError('endereco.bairro')}
          success={isFieldValid('endereco.bairro')}
        >
          <input
            type="text"
            value={formData.endereco.bairro}
            onChange={(e) => onInputChange('bairro', e.target.value, 'endereco')}
            className={`w-full rounded-lg border px-4 py-3 transition-colors ${
              getFieldError('endereco.bairro')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-600 dark:focus:ring-red-600'
                : isFieldValid('endereco.bairro')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-500 dark:focus:border-emerald-600 dark:focus:ring-emerald-600'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:focus:border-blue-600 dark:focus:ring-blue-600'
            } focus:ring-2`}
            placeholder="Digite o bairro"
          />
        </FormField>

        <FormField
          label="Cidade"
          required
          error={getFieldError('endereco.cidade')}
          success={isFieldValid('endereco.cidade')}
        >
          <input
            type="text"
            value={formData.endereco.cidade}
            onChange={(e) => onInputChange('cidade', e.target.value, 'endereco')}
            className={`w-full rounded-lg border px-4 py-3 transition-colors ${
              getFieldError('endereco.cidade')
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-600 dark:focus:ring-red-600'
                : isFieldValid('endereco.cidade')
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-500 dark:focus:border-emerald-600 dark:focus:ring-emerald-600'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:focus:border-blue-600 dark:focus:ring-blue-600'
            } focus:ring-2`}
            placeholder="Digite a cidade"
          />
        </FormField>
      </div>
    </motion.div>
  );
}
