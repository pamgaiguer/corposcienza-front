"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X, Calendar, User, CreditCard, ChevronDown } from "lucide-react"

interface SearchFiltersProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  filters: PatientFilters
  onFiltersChange: (filters: PatientFilters) => void
  onClearFilters: () => void
  totalResults: number
  isFiltering: boolean
}

export interface PatientFilters {
  status: string[]
  plano: string[]
  sexo: string[]
  ageRange: {
    min: number | null
    max: number | null
  }
  dateRange: {
    start: string
    end: string
  }
  city: string[]
  hasInsurance: string
}

export default function SearchFilters({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  onClearFilters,
  totalResults,
  isFiltering,
}: SearchFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  // Calculate active filters count
  const calculateActiveFilters = () => {
    let count = 0
    if (filters.status.length > 0) count++
    if (filters.plano.length > 0) count++
    if (filters.sexo.length > 0) count++
    if (filters.ageRange.min !== null || filters.ageRange.max !== null) count++
    if (filters.dateRange.start || filters.dateRange.end) count++
    if (filters.city.length > 0) count++
    if (filters.hasInsurance !== "") count++
    return count
  }

  const activeCount = calculateActiveFilters()

  const handleFilterChange = (key: keyof PatientFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const handleArrayFilterToggle = (key: keyof PatientFilters, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]

    handleFilterChange(key, newArray)
  }

  const handleQuickFilter = (quickFilters: Partial<PatientFilters>) => {
    onFiltersChange({
      ...filters,
      ...quickFilters,
    })
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, CPF, email ou telefone..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className={`relative flex items-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
            showFilters || activeCount > 0
              ? "bg-blue-50 border-blue-200 text-blue-700"
              : "border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Filter className="h-4 w-4" />
          <span>Filtros</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          {activeCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </motion.button>

        {activeCount > 0 && (
          <motion.button
            onClick={onClearFilters}
            className="px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Limpar Filtros
          </motion.button>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {isFiltering ? "Buscando..." : `${totalResults} pacientes encontrados`}
          {(searchTerm || activeCount > 0) && (
            <span className="ml-2 text-blue-600">
              • {searchTerm && `"${searchTerm}"`}
              {activeCount > 0 &&
                ` • ${activeCount} filtro${activeCount > 1 ? "s" : ""} ativo${activeCount > 1 ? "s" : ""}`}
            </span>
          )}
        </span>
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Status
                </label>
                <div className="space-y-2">
                  {["Ativo", "Inativo", "Suspenso"].map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status)}
                        onChange={() => handleArrayFilterToggle("status", status)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Plan Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="inline h-4 w-4 mr-1" />
                  Plano
                </label>
                <div className="space-y-2">
                  {["Essencial", "Premium", "Executivo"].map((plano) => (
                    <label key={plano} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.plano.includes(plano)}
                        onChange={() => handleArrayFilterToggle("plano", plano)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{plano}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
                <div className="space-y-2">
                  {[
                    { value: "M", label: "Masculino" },
                    { value: "F", label: "Feminino" },
                  ].map((sexo) => (
                    <label key={sexo.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.sexo.includes(sexo.value)}
                        onChange={() => handleArrayFilterToggle("sexo", sexo.value)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{sexo.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Age Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Faixa Etária
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.ageRange.min || ""}
                    onChange={(e) =>
                      handleFilterChange("ageRange", {
                        ...filters.ageRange,
                        min: e.target.value ? Number.parseInt(e.target.value) : null,
                      })
                    }
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.ageRange.max || ""}
                    onChange={(e) =>
                      handleFilterChange("ageRange", {
                        ...filters.ageRange,
                        max: e.target.value ? Number.parseInt(e.target.value) : null,
                      })
                    }
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-sm text-gray-500">anos</span>
                </div>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Período de Cadastro
                </label>
                <div className="space-y-2">
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) =>
                      handleFilterChange("dateRange", {
                        ...filters.dateRange,
                        start: e.target.value,
                      })
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) =>
                      handleFilterChange("dateRange", {
                        ...filters.dateRange,
                        end: e.target.value,
                      })
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Insurance Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="inline h-4 w-4 mr-1" />
                  Convênio Médico
                </label>
                <select
                  value={filters.hasInsurance}
                  onChange={(e) => handleFilterChange("hasInsurance", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="true">Com convênio</option>
                  <option value="false">Sem convênio</option>
                </select>
              </div>
            </div>

            {/* Quick Filter Buttons */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">Filtros Rápidos</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Ativos Premium", filters: { status: ["Ativo"], plano: ["Premium"] } },
                  {
                    label: "Novos (30 dias)",
                    filters: {
                      dateRange: {
                        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                        end: new Date().toISOString().split("T")[0],
                      },
                    },
                  },
                  { label: "Sem convênio", filters: { hasInsurance: "false" } },
                  { label: "Inativos", filters: { status: ["Inativo"] } },
                ].map((quickFilter) => (
                  <motion.button
                    key={quickFilter.label}
                    onClick={() => handleQuickFilter(quickFilter.filters)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {quickFilter.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
