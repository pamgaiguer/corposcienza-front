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
  Loader,
  AlertCircle,
} from 'lucide-react';
import DeleteConfirmationModal from '@/components/admin/delete-confirmation-modal';
import { Patient } from '@/types/patient';
import { pacientesService } from '@/services/api';
import { transformAPIPacienteToUI } from '@/lib/transformers/patient';
import { getErrorMessage } from '@/lib/api/client';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function PatientViewPage() {
  const params = useParams();
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        setError(null);

        const id = Number.parseInt(params.id as string);
        const apiPatient = await pacientesService.getById(id);
        const transformedPatient = transformAPIPacienteToUI(apiPatient);

        setPatient(transformedPatient);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPatient();
    }
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
      await pacientesService.delete(patient.id);
      alert('Paciente excluído com sucesso!');
      router.push('/admin/patients');
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      alert(`Erro ao excluir paciente: ${errorMsg}`);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Helper para cores de status/pills
  const getStatusColorScheme = (status: string) => {
    if (status === 'Ativo') {
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100';
    }
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
  };

  const getPlanColorScheme = (plan: string) => {
    switch (plan) {
      case 'Premium':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'Executivo':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex-1 bg-gray-50 p-8 dark:bg-gray-900">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <Loader className="mx-auto mb-4 h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
            <p className="text-gray-600 dark:text-gray-400">Carregando dados do paciente...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex-1 bg-gray-50 p-8 dark:bg-gray-900">
        <div className="flex h-64 items-center justify-center">
          <div className="max-w-md text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-600 dark:text-red-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Erro ao carregar paciente
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">{error}</p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Tentar Novamente
              </button>
              <Link
                href="/admin/patients"
                className="rounded-lg bg-gray-200 px-4 py-2 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen flex-1 bg-gray-50 p-8 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl">
          <div className="py-12 text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Paciente não encontrado
            </h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              O paciente solicitado não foi encontrado no sistema.
            </p>
            <Link href="/admin/patients">
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                Voltar para Lista de Pacientes
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    // Fundo principal
    <div className="min-h-screen flex-1 bg-gray-50 p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div className="mb-8" {...fadeInUp}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/patients">
                {/* Botão de Voltar */}
                <motion.button
                  className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400"
                  whileHover={{ scale: 1.05 }}
                >
                  <ArrowLeft className="h-5 w-5" />
                </motion.button>
              </Link>
              <div className="flex items-center gap-4">
                {/* Avatar do Paciente */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <span className="text-lg font-semibold text-blue-700 dark:text-blue-100">
                    {patient.nome
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {patient.nome}
                  </h1>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    {calculateAge(patient.data_nascimento)} anos •{' '}
                    {patient.sexo_biologico === 'M' ? 'Masculino' : 'Feminino'} • {patient.status}
                  </p>
                </div>
              </div>
            </div>
            {/* Ações: Editar e Excluir */}
            <div className="flex items-center gap-2">
              <Link href={`/admin/patients/${patient.id}/edit`}>
                <motion.button
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </motion.button>
              </Link>
              <motion.button
                onClick={handleDeleteClick}
                className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Informações Pessoais */}
            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              {...fadeInUp}
            >
              <div className="mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Informações Pessoais
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Nome Completo */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Nome Completo
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{patient.nome}</p>
                </div>
                {/* CPF */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    CPF
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{patient.cpf}</p>
                </div>
                {/* RG */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    RG
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{patient.rg}</p>
                </div>
                {/* Data de Nascimento */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Data de Nascimento
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {new Date(patient.data_nascimento).toLocaleDateString('pt-BR')} (
                    {calculateAge(patient.data_nascimento)} anos)
                  </p>
                </div>
                {/* Sexo */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Sexo
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {patient.sexo_biologico === 'M' ? 'Masculino' : 'Feminino'}
                  </p>
                </div>
                {/* Status */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Status
                  </label>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColorScheme(
                      patient.status,
                    )}`}
                  >
                    {patient.status}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Informações de Endereço */}
            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              {...fadeInUp}
            >
              <div className="mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Endereço</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* CEP */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    CEP
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{patient.endereco.cep}</p>
                </div>
                {/* Logradouro */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Logradouro
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{patient.endereco.logradouro}</p>
                </div>
                {/* Bairro */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Bairro
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{patient.endereco.bairro}</p>
                </div>
                {/* Cidade/Estado */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Cidade/Estado
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {patient.endereco.cidade}, {patient.endereco.estado}
                  </p>
                </div>
                {/* Complemento */}
                {patient.endereco.complemento && (
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Complemento
                    </label>
                    <p className="text-gray-900 dark:text-gray-100">
                      {patient.endereco.complemento}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Contato de Emergência */}
            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              {...fadeInUp}
            >
              <div className="mb-6 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Contato de Emergência
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Nome */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Nome
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {patient.contato_emergencia.nome}
                  </p>
                </div>
                {/* Parentesco */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Parentesco
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {patient.contato_emergencia.parentesco}
                  </p>
                </div>
                {/* Telefone */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Telefone
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {patient.contato_emergencia.telefone}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Observações */}
            {patient.observacoes && (
              <motion.div
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                {...fadeInUp}
              >
                <div className="mb-6 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Observações
                  </h2>
                </div>
                <p className="leading-relaxed text-gray-900 dark:text-gray-100">
                  {patient.observacoes}
                </p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informações de Contato */}
            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              {...fadeInUp}
            >
              <div className="mb-6 flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Contato</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-gray-900 dark:text-gray-100">{patient.telefone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-gray-900 dark:text-gray-100">{patient.email}</span>
                </div>
              </div>
            </motion.div>

            {/* Informações do Plano */}
            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              {...fadeInUp}
            >
              <div className="mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Plano</h2>
              </div>
              <div className="space-y-4">
                <div>
                  {/* Status do Plano */}
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getPlanColorScheme(patient.plano)}`}
                  >
                    {patient.plano}
                  </span>
                </div>
                {/* Convênio Médico */}
                {patient.convenio_medico.possui && (
                  <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
                    <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-400">
                      Convênio Médico
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-900 dark:text-gray-100">
                        <strong>Empresa:</strong> {patient.convenio_medico.empresa}
                      </p>
                      <p className="text-gray-900 dark:text-gray-100">
                        <strong>Carteira:</strong> {patient.convenio_medico.numero_carteira}
                      </p>
                      <p className="text-gray-900 dark:text-gray-100">
                        <strong>Validade:</strong>{' '}
                        {new Date(patient.convenio_medico.validade).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Informações do Sistema */}
            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              {...fadeInUp}
            >
              <div className="mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sistema</h2>
              </div>
              <div className="space-y-4 text-sm">
                {/* Data de Cadastro */}
                <div>
                  <label className="mb-1 block font-medium text-gray-700 dark:text-gray-400">
                    Data de Cadastro
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {new Date(patient.data_cadastro).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                {/* Última Consulta */}
                <div>
                  <label className="mb-1 block font-medium text-gray-700 dark:text-gray-400">
                    Última Consulta
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">
                    {new Date(patient.ultima_consulta).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                {/* ID do Sistema */}
                <div>
                  <label className="mb-1 block font-medium text-gray-700 dark:text-gray-400">
                    ID do Sistema
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">#{patient.id}</p>
                </div>
              </div>
            </motion.div>

            {/* Ações Rápidas */}
            <motion.div
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              {...fadeInUp}
            >
              <div className="mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Ações Rápidas
                </h2>
              </div>
              <div className="space-y-3">
                {/* Botões de Ação */}
                <button className="w-full rounded-lg px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700">
                  Agendar Consulta
                </button>
                <button className="w-full rounded-lg px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700">
                  Ver Histórico Médico
                </button>
                <button className="w-full rounded-lg px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700">
                  Enviar Mensagem
                </button>
                <button className="w-full rounded-lg px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700">
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
