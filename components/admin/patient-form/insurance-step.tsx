"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import FormField from "@/components/form/form-field"
import type { FormStepProps } from "@/types/patient"

export default function InsuranceStep({
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
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Convênio Médico</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="possui_convenio"
            checked={formData.possui_convenio_medico}
            onChange={(e) => onInputChange("possui_convenio_medico", e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="possui_convenio" className="text-sm font-medium text-gray-700">
            Possui convênio médico
          </label>
        </div>

        {formData.possui_convenio_medico && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FormField
              label="Nome do Convênio"
              required
              error={getFieldError("convenio_nome")}
              success={isFieldValid("convenio_nome")}
            >
              <input
                type="text"
                value={formData.convenio_nome}
                onChange={(e) => onInputChange("convenio_nome", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                  getFieldError("convenio_nome")
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : isFieldValid("convenio_nome")
                      ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:ring-2`}
                placeholder="Ex: Unimed, Bradesco Saúde"
              />
            </FormField>

            <FormField
              label="Número da Carteirinha"
              required
              error={getFieldError("numero_carteirinha")}
              success={isFieldValid("numero_carteirinha")}
            >
              <input
                type="text"
                value={formData.numero_carteirinha}
                onChange={(e) => onInputChange("numero_carteirinha", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                  getFieldError("numero_carteirinha")
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : isFieldValid("numero_carteirinha")
                      ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:ring-2`}
                placeholder="Digite o número da carteirinha"
              />
            </FormField>

            <FormField
              label="Validade da Carteirinha"
              required
              error={getFieldError("validade_carteirinha")}
              success={isFieldValid("validade_carteirinha")}
            >
              <input
                type="text"
                value={formData.validade_carteirinha}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .replace(/(\d{2})(\d)/, "$1/$2")
                    .replace(/(\/\d{4})\d+?$/, "$1")
                  onInputChange("validade_carteirinha", value)
                }}
                className={`w-full px-4 py-3 border rounded-lg transition-colors ${
                  getFieldError("validade_carteirinha")
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : isFieldValid("validade_carteirinha")
                      ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:ring-2`}
                placeholder="MM/AAAA"
                maxLength={7}
              />
            </FormField>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
