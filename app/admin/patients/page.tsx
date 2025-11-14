'use client';

import SearchFilters from '@/components/admin/patients/search-filters';
import { Badge, Button, Card, CardContent } from '@/components/ui';
import { usePatientSearch } from '@/hooks/use-patient-search';
import { getErrorMessage } from '@/lib/api/client';
import { transformAPIPacienteBasicoToUI } from '@/lib/transformers/patient';
import pacientesService from '@/services/api';
import type { Patient } from '@/types/patient';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Download,
  Edit,
  Eye,
  Loader,
  Plus,
  Search,
  Trash2,
  Upload,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function PatientsPage() {
  // Estado para dados da API
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Buscar pacientes da API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await pacientesService.list({ page: currentPage });

        // Transformar dados da API para o formato da UI
        const transformedPatients = response.results.map((apiPatient) =>
          transformAPIPacienteBasicoToUI(apiPatient),
        );

        setPatients(transformedPatients);
        setTotalCount(response.count);
        setTotalPages(Math.ceil(response.count / 10)); // Assumindo 10 por página
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [currentPage]);

  // Hook de busca e filtros (agora com dados da API)
  const {
    searchTerm,
    filters,
    filteredPatients,
    isFiltering,
    totalResults,
    handleSearchChange,
    handleFiltersChange,
    handleClearFilters,
  } = usePatientSearch(patients);

  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);

  const handleSelectAll = () => {
    if (selectedPatients.length === filteredPatients.length) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(filteredPatients.map((p) => p.id));
    }
  };

  const handleSelectPatient = (id: number) => {
    setSelectedPatients((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300';
      case 'Inativo':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'Suspenso':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getPlanColor = (plano: string) => {
    switch (plano) {
      case 'Essencial':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'Premium':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'Executivo':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex-1 bg-gray-50 p-8 dark:bg-gray-900">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <Loader className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
            <p className="text-gray-600 dark:text-gray-400">Carregando pacientes...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex-1 bg-gray-50 p-8 dark:bg-gray-900">
        <div className="flex h-64 items-center justify-center">
          <div className="max-w-md text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-600 dark:text-red-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Erro ao carregar pacientes
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Tentar Novamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex-1 bg-gray-50 p-8 dark:bg-gray-900">
      {/* Header */}
      <motion.div className="mb-8" {...fadeInUp}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pacientes</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Gerencie e visualize todos os pacientes cadastrados
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
            >
              <Upload className="mr-2 h-4 w-4" />
              Importar
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
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
          className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20"
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
                className="border-blue-300 bg-transparent text-blue-900 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-100 dark:hover:bg-blue-900/30"
              >
                <Download className="mr-2 h-3 w-3" />
                Exportar Selecionados
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-red-300 bg-transparent text-red-900 hover:bg-red-100 dark:border-red-700 dark:text-red-100 dark:hover:bg-red-900/30"
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
        <Card className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedPatients.length === filteredPatients.length &&
                          filteredPatients.length > 0
                        }
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Paciente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Contato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Plano
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Última Consulta
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedPatients.includes(patient.id)}
                          onChange={() => handleSelectPatient(patient.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                              {patient.nome
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .slice(0, 2)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {patient.nome}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {patient.cpf}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">{patient.email}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {patient.telefone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={getPlanColor(patient.plano)}>{patient.plano}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(patient.ultima_consulta).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                            className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                          >
                            <Link href={`/admin/patients/${patient.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                            className="text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-400 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
                          >
                            <Link href={`/admin/patients/${patient.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
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
              <div className="py-12 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                  <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  Nenhum paciente encontrado
                </h3>
                <p className="mb-4 text-gray-500 dark:text-gray-400">
                  Tente ajustar seus filtros ou adicione um novo paciente
                </p>
                <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
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
            Mostrando <span className="font-medium">{filteredPatients.length}</span> de{' '}
            <span className="font-medium">{totalCount}</span> pacientes
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
            >
              Anterior
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
            >
              Próximo
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
