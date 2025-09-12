/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable no-console */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users,
  UserPlus,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  Phone,
  Mail,
} from 'lucide-react';
import DeleteConfirmationModal from '@/components/admin/delete-confirmation-modal';
import SearchFilters from '@/components/admin/patients/search-filters';
import { usePatientSearch } from '@/hooks/use-patient-search';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function PatientsPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mock data with additional fields for filtering
  const allPatients = [
    {
      id: 1,
      nome: 'Maria Silva Santos',
      cpf: '123.456.789-00',
      email: 'maria.silva@email.com',
      telefone: '(11) 99999-9999',
      data_nascimento: '1985-03-15',
      sexo_biologico: 'F' as const,
      status: 'Ativo',
      plano: 'Premium',
      ultima_consulta: '2024-01-15',
      endereco: {
        cidade: 'São Paulo',
        estado: 'SP',
      },
      possui_convenio_medico: true,
      data_cadastro: '2023-12-01',
    },
    {
      id: 2,
      nome: 'João Carlos Oliveira',
      cpf: '987.654.321-00',
      email: 'joao.carlos@email.com',
      telefone: '(11) 88888-8888',
      data_nascimento: '1978-07-22',
      sexo_biologico: 'M' as const,
      status: 'Ativo',
      plano: 'Essencial',
      ultima_consulta: '2024-01-14',
      endereco: {
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
      },
      possui_convenio_medico: false,
      data_cadastro: '2023-11-15',
    },
    {
      id: 3,
      nome: 'Ana Paula Costa',
      cpf: '456.789.123-00',
      email: 'ana.paula@email.com',
      telefone: '(11) 77777-7777',
      data_nascimento: '1992-11-08',
      sexo_biologico: 'F' as const,
      status: 'Inativo',
      plano: 'Executivo',
      ultima_consulta: '2024-01-13',
      endereco: {
        cidade: 'Belo Horizonte',
        estado: 'MG',
      },
      possui_convenio_medico: true,
      data_cadastro: '2024-01-01',
    },
    {
      id: 4,
      nome: 'Carlos Eduardo Lima',
      cpf: '789.123.456-00',
      email: 'carlos.eduardo@email.com',
      telefone: '(11) 66666-6666',
      data_nascimento: '1980-05-30',
      sexo_biologico: 'M' as const,
      status: 'Ativo',
      plano: 'Premium',
      ultima_consulta: '2024-01-12',
      endereco: {
        cidade: 'São Paulo',
        estado: 'SP',
      },
      possui_convenio_medico: true,
      data_cadastro: '2023-10-20',
    },
    {
      id: 5,
      nome: 'Fernanda Rodrigues',
      cpf: '321.654.987-00',
      email: 'fernanda.rodrigues@email.com',
      telefone: '(11) 55555-5555',
      data_nascimento: '1995-09-12',
      sexo_biologico: 'F' as const,
      status: 'Ativo',
      plano: 'Essencial',
      ultima_consulta: '2024-01-11',
      endereco: {
        cidade: 'Curitiba',
        estado: 'PR',
      },
      possui_convenio_medico: false,
      data_cadastro: '2024-01-10',
    },
    {
      id: 6,
      nome: 'Roberto Santos Silva',
      cpf: '654.321.789-00',
      email: 'roberto.santos@email.com',
      telefone: '(11) 44444-4444',
      data_nascimento: '1970-12-25',
      sexo_biologico: 'M' as const,
      status: 'Suspenso',
      plano: 'Premium',
      ultima_consulta: '2024-01-10',
      endereco: {
        cidade: 'Salvador',
        estado: 'BA',
      },
      possui_convenio_medico: true,
      data_cadastro: '2023-09-05',
    },
  ];

  const {
    searchTerm,
    filters,
    filteredPatients,
    isFiltering,
    totalResults,
    handleSearchChange,
    handleFiltersChange,
    handleClearFilters,
  } = usePatientSearch(allPatients);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleDeleteClick = (patient: any) => {
    setPatientToDelete(patient);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!patientToDelete) return;

    setIsDeleting(true);
    try {
      // Simulate API call - replace with actual API integration
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert('Paciente excluído com sucesso!');
      // Here you would refresh the patients list
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Erro ao excluir paciente. Tente novamente.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setPatientToDelete(null);
    }
  };

  // Calculate stats based on filtered results
  const stats = {
    total: allPatients.length,
    active: allPatients.filter((p) => p.status === 'Ativo').length,
    newThisMonth: allPatients.filter((p) => {
      const cadastro = new Date(p.data_cadastro);
      const now = new Date();
      return (
        cadastro.getMonth() === now.getMonth() &&
        cadastro.getFullYear() === now.getFullYear()
      );
    }).length,
    appointments: 234, // Mock data
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div className="mb-8" {...fadeInUp}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
              <p className="text-gray-600 mt-1">
                Gerencie todos os pacientes cadastrados no sistema
              </p>
            </div>
          </div>
          <Link href="/admin/patients/new">
            <motion.button
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Paciente
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" {...fadeInUp}>
        {[
          {
            title: 'Total de Pacientes',
            value: stats.total.toString(),
            color: 'blue',
            icon: Users,
          },
          {
            title: 'Pacientes Ativos',
            value: stats.active.toString(),
            color: 'emerald',
            icon: Users,
          },
          {
            title: 'Novos este Mês',
            value: stats.newThisMonth.toString(),
            color: 'purple',
            icon: UserPlus,
          },
          {
            title: 'Consultas Agendadas',
            value: stats.appointments.toString(),
            color: 'orange',
            icon: Calendar,
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
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

      {/* Patients Table */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-200"
        {...fadeInUp}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Lista de Pacientes</h2>
            <div className="flex items-center gap-2">
              <motion.button
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                title="Exportar dados"
              >
                <Download className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Idade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plano
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Consulta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Users className="h-12 w-12 mb-4 opacity-50" />
                      <p className="text-lg font-medium">Nenhum paciente encontrado</p>
                      <p className="text-sm">
                        {searchTerm ||
                        Object.values(filters).some((f) =>
                          Array.isArray(f) ? f.length > 0 : f !== '' && f !== null,
                        )
                          ? 'Tente ajustar os filtros de busca'
                          : 'Cadastre o primeiro paciente para começar'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <motion.tr
                    key={patient.id}
                    className="hover:bg-gray-50 transition-colors"
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-700 font-semibold text-sm">
                            {patient.nome
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.nome}
                          </div>
                          <div className="text-sm text-gray-500">
                            {patient.sexo_biologico === 'M' ? 'Masculino' : 'Feminino'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.cpf}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {patient.telefone}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {patient.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {calculateAge(patient.data_nascimento)} anos
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          patient.status === 'Ativo'
                            ? 'bg-emerald-100 text-emerald-800'
                            : patient.status === 'Inativo'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          patient.plano === 'Premium'
                            ? 'bg-purple-100 text-purple-800'
                            : patient.plano === 'Executivo'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {patient.plano}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(patient.ultima_consulta).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/patients/${patient.id}`}>
                          <motion.button
                            className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Visualizar"
                          >
                            <Eye className="h-4 w-4" />
                          </motion.button>
                        </Link>
                        <Link href={`/admin/patients/${patient.id}/edit`}>
                          <motion.button
                            className="text-emerald-600 hover:text-emerald-900 p-1 hover:bg-emerald-50 rounded transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </motion.button>
                        </Link>
                        <motion.button
                          onClick={() => handleDeleteClick(patient)}
                          className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          className="text-gray-600 hover:text-gray-900 p-1 hover:bg-gray-50 rounded transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Mais opções"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Mostrando {filteredPatients.length} de {allPatients.length} pacientes
            </p>
            <div className="flex items-center gap-2">
              <motion.button
                className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                Anterior
              </motion.button>
              <span className="px-3 py-1 bg-blue-600 text-white rounded">1</span>
              <motion.button
                className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                Próximo
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPatientToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        title="Confirmar Exclusão"
        description="Esta ação não pode ser desfeita"
        itemName={patientToDelete?.nome || ''}
        warningMessage={`Você está prestes a excluir permanentemente o paciente ${patientToDelete?.nome}. Todos os dados associados serão perdidos.`}
      />
    </div>
  );
}
