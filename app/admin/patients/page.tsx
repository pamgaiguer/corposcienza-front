"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Download, Upload, UserPlus, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SearchFilters from "@/components/admin/patients/search-filters"
import { usePatientSearch } from "@/hooks/use-patient-search"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

// Mock patient data
const mockPatients = [
  {
    id: 1,
    nome: "Maria Silva Santos",
    cpf: "123.456.789-00",
    email: "maria.silva@email.com",
    telefone: "(11) 99999-9999",
    data_nascimento: "1985-03-15",
    sexo_biologico: "F" as const,
    status: "Ativo",
    plano: "Premium",
    ultima_consulta: "2024-01-15",
    endereco: {
      cidade: "São Paulo",
      estado: "SP",
    },
    possui_convenio_medico: true,
    data_cadastro: "2023-01-10",
  },
  {
    id: 2,
    nome: "João Pedro Costa",
    cpf: "987.654.321-00",
    email: "joao.costa@email.com",
    telefone: "(11) 98888-8888",
    data_nascimento: "1990-07-22",
    sexo_biologico: "M" as const,
    status: "Ativo",
    plano: "Essencial",
    ultima_consulta: "2024-01-20",
    endereco: {
      cidade: "Rio de Janeiro",
      estado: "RJ",
    },
    possui_convenio_medico: false,
    data_cadastro: "2023-03-15",
  },
  {
    id: 3,
    nome: "Ana Carolina Lima",
    cpf: "456.789.123-00",
    email: "ana.lima@email.com",
    telefone: "(11) 97777-7777",
    data_nascimento: "1978-11-30",
    sexo_biologico: "F" as const,
    status: "Ativo",
    plano: "Executivo",
    ultima_consulta: "2024-01-18",
    endereco: {
      cidade: "Belo Horizonte",
      estado: "MG",
    },
    possui_convenio_medico: true,
    data_cadastro: "2023-02-20",
  },
  {
    id: 4,
    nome: "Carlos Eduardo Souza",
    cpf: "321.654.987-00",
    email: "carlos.souza@email.com",
    telefone: "(11) 96666-6666",
    data_nascimento: "1995-05-10",
    sexo_biologico: "M" as const,
    status: "Inativo",
    plano: "Premium",
    ultima_consulta: "2023-12-01",
    endereco: {
      cidade: "Brasília",
      estado: "DF",
    },
    possui_convenio_medico: true,
    data_cadastro: "2023-05-10",
  },
  {
    id: 5,
    nome: "Juliana Ferreira",
    cpf: "159.753.486-00",
    email: "juliana.ferreira@email.com",
    telefone: "(11) 95555-5555",
    data_nascimento: "1988-09-25",
    sexo_biologico: "F" as const,
    status: "Ativo",
    plano: "Essencial",
    ultima_consulta: "2024-01-22",
    endereco: {
      cidade: "Salvador",
      estado: "BA",
    },
    possui_convenio_medico: false,
    data_cadastro: "2023-04-05",
  },
]

export default function PatientsPage() {
  const {
    searchTerm,
    filters,
    filteredPatients,
    isFiltering,
    totalResults,
    handleSearchChange,
    handleFiltersChange,
    handleClearFilters,
  } = usePatientSearch(mockPatients)

  const [selectedPatients, setSelectedPatients] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "table">("table")

  const handleSelectAll = () => {
    if (selectedPatients.length === filteredPatients.length) {
      setSelectedPatients([])
    } else {
      setSelectedPatients(filteredPatients.map((p) => p.id))
    }
  }

  const handleSelectPatient = (id: number) => {
    setSelectedPatients((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300"
      case "Inativo":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
      case "Suspenso":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
    }
  }

  const getPlanColor = (plano: string) => {
    switch (plano) {
      case "Essencial":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
      case "Premium":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
      case "Executivo":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <motion.div className="mb-8" {...fadeInUp}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pacientes</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Gerencie e visualize todos os pacientes cadastrados</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent"
            >
              <Upload className="mr-2 h-4 w-4" />
              Importar
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent"
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/admin/patients/new">
                <UserPlus className="mr-2 h-4 w-4" />
                Novo Paciente
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div className="mb-6" {...fadeInUp}>
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
          totalResults={totalResults}
          isFiltering={isFiltering}
        />
      </motion.div>

      {/* Bulk Actions */}
      {selectedPatients.length > 0 && (
        <motion.div
          className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {selectedPatients.length} paciente(s) selecionado(s)
            </span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-blue-900/30 bg-transparent"
              >
                <Download className="mr-2 h-3 w-3" />
                Exportar Selecionados
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-red-300 dark:border-red-700 text-red-900 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-900/30 bg-transparent"
              >
                <Trash2 className="mr-2 h-3 w-3" />
                Excluir Selecionados
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Patients Table */}
      <motion.div {...fadeInUp}>
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Paciente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Contato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Plano
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Última Consulta
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedPatients.includes(patient.id)}
                          onChange={() => handleSelectPatient(patient.id)}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                              {patient.nome
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{patient.nome}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{patient.cpf}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">{patient.email}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{patient.telefone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={getPlanColor(patient.plano)}>{patient.plano}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(patient.ultima_consulta).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          >
                            <Link href={`/admin/patients/${patient.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                            className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                          >
                            <Link href={`/admin/patients/${patient.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredPatients.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                  <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Nenhum paciente encontrado</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Tente ajustar seus filtros ou adicione um novo paciente
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href="/admin/patients/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Paciente
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Pagination */}
      {filteredPatients.length > 0 && (
        <motion.div className="mt-6 flex items-center justify-between" {...fadeInUp}>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Mostrando <span className="font-medium">{filteredPatients.length}</span> de{" "}
            <span className="font-medium">{mockPatients.length}</span> pacientes
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent"
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent"
            >
              Próximo
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
