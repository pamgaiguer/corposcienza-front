'use client';

import PatientForm from '@/components/admin/patient-form/patient-form';
import type { PatientFormData } from '@/types/patient';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Loader } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function EditPatientPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalData, setOriginalData] = useState<PatientFormData | null>(null);
  const [currentData, setCurrentData] = useState<PatientFormData | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const loadPatientData = async () => {
      try {
        setIsLoading(true);

        // Importar services e transformers
        const pacientesService = await import('@/services/api');
        const { transformAPIPacienteToFormData } = await import('@/lib/transformers/patient');

        // Buscar dados do paciente da API
        const id = Number.parseInt(patientId);
        const apiPatient = await pacientesService.getById(id);

        // Transformar dados da API para formato do formulário
        const formData = transformAPIPacienteToFormData(apiPatient);

        setOriginalData(formData);
        setCurrentData(formData);
      } catch (error) {
        const { getErrorMessage } = await import('@/lib/api/client');
        const errorMsg = getErrorMessage(error);

        alert(`Erro ao carregar dados do paciente: ${errorMsg}`);
        router.push('/admin/patients');
      } finally {
        setIsLoading(false);
      }
    };

    if (patientId) {
      loadPatientData();
    }
  }, [patientId, router]);

  // Check for changes
  useEffect(() => {
    if (originalData && currentData) {
      const hasDataChanged = JSON.stringify(currentData) !== JSON.stringify(originalData);
      setHasChanges(hasDataChanged);
    }
  }, [originalData, currentData]);

  const handleSubmit = async (formData: PatientFormData) => {
    if (!hasChanges) {
      alert('Nenhuma alteração foi feita.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Importar services e transformers
      const pacientesService = await import('@/services/api');
      const { transformFormDataToAPI } = await import('@/lib/transformers/patient');

      const id = Number.parseInt(patientId);

      // Transformar dados do formulário para formato da API
      const { endereco, contatoEmergencia, paciente } = transformFormDataToAPI(formData);

      // Atualizar paciente completo (endereço, contato e paciente)
      // NOTA: Precisamos dos IDs do endereço e contato existentes
      // Eles estão armazenados na API, vamos buscar do paciente atual
      const apiPatient = await pacientesService.getById(id);

      await pacientesService.updateComplete(
        id,
        paciente,
        apiPatient.endereco.id,
        endereco,
        apiPatient.contato_emergencia.id,
        contatoEmergencia,
      );

      alert('Paciente atualizado com sucesso!');
      router.push('/admin/patients');
    } catch (error) {
      const { getErrorMessage } = await import('@/lib/api/client');
      const errorMsg = getErrorMessage(error);

      alert(`Erro ao atualizar paciente: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (originalData && window.confirm('Descartar todas as alterações?')) {
      setCurrentData(originalData);
      setHasChanges(false);
    }
  };

  if (isLoading) {
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

  if (!currentData) {
    return (
      <div className="min-h-screen flex-1 bg-gray-50 p-8 dark:bg-gray-900">
        <div className="py-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">Erro ao carregar dados do paciente</p>
          <Link
            href="/admin/patients"
            className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex-1 bg-gray-50 p-8 dark:bg-gray-900">
      {/* Header */}
      <motion.div className="mb-8" {...fadeInUp}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/patients"
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/20">
                <Edit className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Editar Paciente
                </h1>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  Atualize os dados do paciente:{' '}
                  <span className="font-medium">{currentData.nome}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Changes indicator */}
          {hasChanges && (
            <motion.div
              className="flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              Alterações não salvas
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Form */}
      <motion.div {...fadeInUp}>
        <PatientForm
          initialData={currentData}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitButtonText={hasChanges ? 'Salvar Alterações' : 'Nenhuma Alteração'}
          title="Editar Paciente"
          hasChanges={hasChanges}
          onReset={handleReset}
        />
      </motion.div>
    </div>
  );
}
