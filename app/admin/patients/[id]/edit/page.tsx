'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Loader } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import PatientForm from '@/components/admin/patient-form/patient-form';
import type { PatientFormData } from '@/types/patient';

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

        // Simulate API call - replace with actual API integration
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock patient data - replace with actual API response
        const mockPatientData: PatientFormData = {
          cpf: '123.456.789-00',
          rg: '12.345.678-9',
          nome: 'Maria Silva Santos',
          sexo_biologico: 'F',
          data_nascimento: '1985-03-15',
          telefone: '(11) 99999-9999',
          email: 'maria.silva@email.com',
          estado_civil: 'Casado(a)',
          nacionalidade: 'Brasileira',
          profissao: 'Engenheira',
          endereco: {
            cep: '01234-567',
            rua: 'Rua das Flores',
            numero: '123',
            complemento: 'Apto 45',
            bairro: 'Centro',
            cidade: 'São Paulo',
            estado: 'SP',
          },
          contato_emergencia: {
            cpf: '987.654.321-00',
            nome: 'João Silva Santos',
            telefone: '(11) 88888-8888',
            rg: '98.765.432-1',
            email: 'joao.silva@email.com',
            estado_civil: 'Casado(a)',
            nacionalidade: 'Brasileira',
            profissao: 'Médico',
          },
          possui_convenio_medico: true,
          convenio_nome: 'Unimed',
          numero_carteirinha: '123456789',
          validade_carteirinha: '12/2025',
        };

        setOriginalData(mockPatientData);
        setCurrentData(mockPatientData);
      } catch (error) {
        console.error('Error loading patient data:', error);
        alert('Erro ao carregar dados do paciente');
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
      // Here you would integrate with your Django API
      console.log('Updated patient data:', formData);
      console.log('Patient ID:', patientId);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert('Paciente atualizado com sucesso!');
      router.push('/admin/patients');
    } catch (error) {
      console.error('Error updating patient:', error);
      alert('Erro ao atualizar paciente. Tente novamente.');
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
      <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Carregando dados do paciente...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentData) {
    return (
      <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            Erro ao carregar dados do paciente
          </p>
          <Link
            href="/admin/patients"
            className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <motion.div className="mb-8" {...fadeInUp}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/patients"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Edit className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Editar Paciente
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Atualize os dados do paciente:{' '}
                  <span className="font-medium">{currentData.nome}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Changes indicator */}
          {hasChanges && (
            <motion.div
              className="flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
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
