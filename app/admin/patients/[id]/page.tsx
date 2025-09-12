/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable no-console */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  User,
  CreditCard,
  Shield,
  Clock,
  FileText,
  Activity,
} from 'lucide-react';
import DeleteConfirmationModal from '@/components/admin/delete-confirmation-modal';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function PatientViewPage() {
  const params = useParams();
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch patient data
    const fetchPatient = async () => {
      try {
        setLoading(true);
        // Mock API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock patient data - in real app, this would come from API
        const mockPatient = {
          id: Number.parseInt(params.id as string),
          nome: 'Maria Silva Santos',
          cpf: '123.456.789-00',
          rg: '12.345.678-9',
          email: 'maria.silva@email.com',
          telefone: '(11) 99999-9999',
          data_nascimento: '1985-03-15',
          sexo_biologico: 'F',
          status: 'Ativo',
          plano: 'Premium',
          ultima_consulta: '2024-01-15',
          data_cadastro: '2023-12-01',
          endereco: {
            cep: '01234-567',
            logradouro: 'Rua das Flores, 123',
            bairro: 'Centro',
            cidade: 'São Paulo',
            estado: 'SP',
            complemento: 'Apto 45',
          },
          contato_emergencia: {
            nome: 'João Silva Santos',
            parentesco: 'Cônjuge',
            telefone: '(11) 88888-8888',
          },
          convenio_medico: {
            possui: true,
            empresa: 'Unimed',
            numero_carteira: '123456789012345',
            validade: '2024-12-31',
          },
          observacoes:
            'Paciente com histórico de hipertensão. Acompanhamento regular necessário.',
        };

        setPatient(mockPatient);
      } catch (error) {
        console.error('Error fetching patient:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [params.id]);

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

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!patient) return;

    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert('Paciente excluído com sucesso!');
      router.push('/admin/patients');
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Erro ao excluir paciente. Tente novamente.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Paciente não encontrado
            </h1>
            <p className="text-gray-600 mb-8">
              O paciente solicitado não foi encontrado no sistema.
            </p>
            <Link href="/admin/patients">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Voltar para Lista de Pacientes
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div className="mb-8" {...fadeInUp}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/patients">
                <motion.button
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <ArrowLeft className="h-5 w-5" />
                </motion.button>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-semibold text-lg">
                    {patient.nome
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{patient.nome}</h1>
                  <p className="text-gray-600 mt-1">
                    {calculateAge(patient.data_nascimento)} anos •{' '}
                    {patient.sexo_biologico === 'M' ? 'Masculino' : 'Feminino'} •{' '}
                    {patient.status}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/admin/patients/${patient.id}/edit`}>
                <motion.button
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </motion.button>
              </Link>
              <motion.button
                onClick={handleDeleteClick}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              {...fadeInUp}
            >
              <div className="flex items-center gap-2 mb-6">
                <User className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Informações Pessoais
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <p className="text-gray-900">{patient.nome}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CPF
                  </label>
                  <p className="text-gray-900">{patient.cpf}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    RG
                  </label>
                  <p className="text-gray-900">{patient.rg}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Nascimento
                  </label>
                  <p className="text-gray-900">
                    {new Date(patient.data_nascimento).toLocaleDateString('pt-BR')} (
                    {calculateAge(patient.data_nascimento)} anos)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sexo
                  </label>
                  <p className="text-gray-900">
                    {patient.sexo_biologico === 'M' ? 'Masculino' : 'Feminino'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      patient.status === 'Ativo'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {patient.status}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Address Information */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              {...fadeInUp}
            >
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Endereço</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CEP
                  </label>
                  <p className="text-gray-900">{patient.endereco.cep}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logradouro
                  </label>
                  <p className="text-gray-900">{patient.endereco.logradouro}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bairro
                  </label>
                  <p className="text-gray-900">{patient.endereco.bairro}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade/Estado
                  </label>
                  <p className="text-gray-900">
                    {patient.endereco.cidade}, {patient.endereco.estado}
                  </p>
                </div>
                {patient.endereco.complemento && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Complemento
                    </label>
                    <p className="text-gray-900">{patient.endereco.complemento}</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              {...fadeInUp}
            >
              <div className="flex items-center gap-2 mb-6">
                <Shield className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Contato de Emergência
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <p className="text-gray-900">{patient.contato_emergencia.nome}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parentesco
                  </label>
                  <p className="text-gray-900">{patient.contato_emergencia.parentesco}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <p className="text-gray-900">{patient.contato_emergencia.telefone}</p>
                </div>
              </div>
            </motion.div>

            {/* Observations */}
            {patient.observacoes && (
              <motion.div
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                {...fadeInUp}
              >
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Observações</h2>
                </div>
                <p className="text-gray-900 leading-relaxed">{patient.observacoes}</p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              {...fadeInUp}
            >
              <div className="flex items-center gap-2 mb-6">
                <Phone className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Contato</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{patient.telefone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{patient.email}</span>
                </div>
              </div>
            </motion.div>

            {/* Plan Information */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              {...fadeInUp}
            >
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Plano</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      patient.plano === 'Premium'
                        ? 'bg-purple-100 text-purple-800'
                        : patient.plano === 'Executivo'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {patient.plano}
                  </span>
                </div>
                {patient.convenio_medico.possui && (
                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Convênio Médico
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-900">
                        <strong>Empresa:</strong> {patient.convenio_medico.empresa}
                      </p>
                      <p className="text-gray-900">
                        <strong>Carteira:</strong>{' '}
                        {patient.convenio_medico.numero_carteira}
                      </p>
                      <p className="text-gray-900">
                        <strong>Validade:</strong>{' '}
                        {new Date(patient.convenio_medico.validade).toLocaleDateString(
                          'pt-BR',
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* System Information */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              {...fadeInUp}
            >
              <div className="flex items-center gap-2 mb-6">
                <Clock className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Sistema</h2>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Data de Cadastro
                  </label>
                  <p className="text-gray-900">
                    {new Date(patient.data_cadastro).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Última Consulta
                  </label>
                  <p className="text-gray-900">
                    {new Date(patient.ultima_consulta).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    ID do Sistema
                  </label>
                  <p className="text-gray-900">#{patient.id}</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              {...fadeInUp}
            >
              <div className="flex items-center gap-2 mb-6">
                <Activity className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Ações Rápidas</h2>
              </div>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Agendar Consulta
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Ver Histórico Médico
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Enviar Mensagem
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Gerar Relatório
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
          title="Confirmar Exclusão"
          description="Esta ação não pode ser desfeita"
          itemName={patient?.nome || ''}
          warningMessage={`Você está prestes a excluir permanentemente o paciente ${patient?.nome}. Todos os dados associados serão perdidos.`}
        />
      </div>
    </div>
  );
}
