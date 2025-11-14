/* eslint-disable no-console */

'use client';

import PatientForm from '@/components/admin/patient-form/patient-form';
import type { PatientFormData } from '@/types/patient';
import { motion } from 'framer-motion';
import { ArrowLeft, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
      // Here you would integrate with your Django API
      console.log('New patient data:', formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert('Paciente cadastrado com sucesso!');
      router.push('/admin/patients');
    } catch (error) {
      console.error('Error creating patient:', error);
      alert('Erro ao cadastrar paciente. Tente novamente.');
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
