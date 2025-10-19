"use client"

import { motion } from "framer-motion"
import { Phone } from "lucide-react"
import FormField from "@/components/form/form-field"
import type { FormStepProps } from "@/types/patient"

const estadosCivis = ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)", "União Estável", "Separado(a)"]

const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1")
}

export default function EmergencyContactStep({
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
        <Phone className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">Contato de Emergência</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Nome Completo"
          required
          error={getFieldError("contato_emergencia.nome")}
          success={isFieldValid("contato_emergencia.nome")}
        >
          <input
            type="text"
            value={formData.contato_emergencia.nome}
            onChange={(e) => onInputChange("nome", e.target.value, "contato_emergencia")}
            className={`w-full px-4 py-3 border rounded-lg transition-colors ${
              getFieldError("contato_emergencia.nome")
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : isFieldValid("contato_emergencia.nome")
                  ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:ring-2`}
            placeholder="Digite o nome completo"
          />
        </FormField>

        <FormField
          label="CPF"
          required
          error={getFieldError("contato_emergencia.cpf")}
          success={isFieldValid("contato_emergencia.cpf")}
        >
          <input
            type="text"
            value={formData.contato_emergencia.cpf}
            onChange={(e) => onInputChange("cpf", formatCPF(e.target.value), "contato_emergencia")}
            className={`w-full px-4 py-3 border rounded-lg transition-colors ${
              getFieldError("contato_emergencia.cpf")
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : isFieldValid("contato_emergencia.cpf")
                  ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:ring-2`}
            placeholder="000.000.000-00"
            maxLength={14}
          />
        </FormField>

        <FormField
          label="RG"
          required
          error={getFieldError("contato_emergencia.rg")}
          success={isFieldValid("contato_emergencia.rg")}
        >
          <input
            type="text"
            value={formData.contato_emergencia.rg}
            onChange={(e) => onInputChange("rg", e.target.value, "contato_emergencia")}
            className={`w-full px-4 py-3 border rounded-lg transition-colors ${
              getFieldError("contato_emergencia.rg")
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : isFieldValid("contato_emergencia.rg")
                  ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:ring-2`}
            placeholder="Digite o RG"
          />
        </FormField>

        <FormField
          label="Telefone"
          required
          error={getFieldError("contato_emergencia.telefone")}
          success={isFieldValid("contato_emergencia.telefone")}
        >
          <input
            type="text"
            value={formData.contato_emergencia.telefone}
            onChange={(e) => onInputChange("telefone", formatPhone(e.target.value), "contato_emergencia")}
            className={`w-full px-4 py-3 border rounded-lg transition-colors ${
              getFieldError("contato_emergencia.telefone")
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : isFieldValid("contato_emergencia.telefone")
                  ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:ring-2`}
            placeholder="(11) 99999-9999"
            maxLength={15}
          />
        </FormField>

        <FormField
          label="E-mail"
          required
          error={getFieldError("contato_emergencia.email")}
          success={isFieldValid("contato_emergencia.email")}
        >
          <input
            type="email"
            value={formData.contato_emergencia.email}
            onChange={(e) => onInputChange("email", e.target.value, "contato_emergencia")}
            className={`w-full px-4 py-3 border rounded-lg transition-colors ${
              getFieldError("contato_emergencia.email")
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : isFieldValid("contato_emergencia.email")
                  ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:ring-2`}
            placeholder="email@exemplo.com"
          />
        </FormField>

        <FormField
          label="Estado Civil"
          required
          error={getFieldError("contato_emergencia.estado_civil")}
          success={isFieldValid("contato_emergencia.estado_civil")}
        >
          <select
            value={formData.contato_emergencia.estado_civil}
            onChange={(e) => onInputChange("estado_civil", e.target.value, "contato_emergencia")}
            className={`w-full px-4 py-3 border rounded-lg transition-colors ${
              getFieldError("contato_emergencia.estado_civil")
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : isFieldValid("contato_emergencia.estado_civil")
                  ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
          error={getFieldError("contato_emergencia.nacionalidade")}
          success={isFieldValid("contato_emergencia.nacionalidade")}
        >
          <input
            type="text"
            value={formData.contato_emergencia.nacionalidade}
            onChange={(e) => onInputChange("nacionalidade", e.target.value, "contato_emergencia")}
            className={`w-full px-4 py-3 border rounded-lg transition-colors ${
              getFieldError("contato_emergencia.nacionalidade")
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : isFieldValid("contato_emergencia.nacionalidade")
                  ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:ring-2`}
            placeholder="Brasileira"
          />
        </FormField>

        <FormField
          label="Profissão"
          required
          error={getFieldError("contato_emergencia.profissao")}
          success={isFieldValid("contato_emergencia.profissao")}
        >
          <input
            type="text"
            value={formData.contato_emergencia.profissao}
            onChange={(e) => onInputChange("profissao", e.target.value, "contato_emergencia")}
            className={`w-full px-4 py-3 border rounded-lg transition-colors ${
              getFieldError("contato_emergencia.profissao")
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : isFieldValid("contato_emergencia.profissao")
                  ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            } focus:ring-2`}
            placeholder="Digite a profissão"
          />
        </FormField>
      </div>
    </motion.div>
  )
}
