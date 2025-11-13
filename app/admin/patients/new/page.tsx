'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PatientForm from '@/components/admin/patient-form/patient-form';
import type { PatientFormData } from '@/types/patient';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function NewPatientPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: PatientFormData) => {
    setIsSubmitting(true);

    try {
      // Importar services e transformers
      const { pacientesService } = await import('@/services/api');
      const { transformFormDataToAPI } = await import('@/lib/transformers/patient');

      // Transformar dados do formulário para formato da API
      const { endereco, contatoEmergencia, paciente } = transformFormDataToAPI(formData);

      // Criar paciente (o service já faz o fluxo completo: endereço → contato → paciente)
      await pacientesService.create(paciente, endereco, contatoEmergencia);

      alert('Paciente cadastrado com sucesso!');
      router.push('/admin/patients');
    } catch (error) {
      console.error('Error creating patient:', error);

      // Importar getErrorMessage para exibir mensagem de erro apropriada
      const { getErrorMessage } = await import('@/lib/api/client');
      const errorMsg = getErrorMessage(error);

      alert(`Erro ao cadastrar paciente: ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div className="rounded-lg bg-blue-100 p-3">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Novo Paciente</h1>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  Cadastre um novo paciente no sistema
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div {...fadeInUp}>
        <PatientForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitButtonText="Cadastrar Paciente"
          title="Novo Paciente"
        />
      </motion.div>
    </div>
  );
}
