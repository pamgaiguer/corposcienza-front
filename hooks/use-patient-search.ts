'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import type { PatientFilters } from '@/components/admin/patients/search-filters';

interface Patient {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  data_nascimento: string;
  sexo_biologico: 'M' | 'F';
  status: string;
  plano: string;
  ultima_consulta: string;
  endereco?: {
    cidade: string;
    estado: string;
  };
  possui_convenio_medico?: boolean;
  data_cadastro?: string;
}

const initialFilters: PatientFilters = {
  status: [],
  plano: [],
  sexo: [],
  ageRange: {
    min: null,
    max: null,
  },
  dateRange: {
    start: '',
    end: '',
  },
  city: [],
  hasInsurance: '',
};

export function usePatientSearch(patients: Patient[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<PatientFilters>(initialFilters);
  const [isFiltering, setIsFiltering] = useState(false);

  const calculateAge = useCallback((birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }, []);

  // Set loading state when search term or filters change
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, filters]);

  const filteredPatients = useMemo(() => {
    let filtered = patients;

    // Text search
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((patient) => {
        return (
          patient.nome.toLowerCase().includes(searchLower) ||
          patient.cpf.replace(/\D/g, '').includes(searchLower.replace(/\D/g, '')) ||
          patient.email.toLowerCase().includes(searchLower) ||
          patient.telefone.replace(/\D/g, '').includes(searchLower.replace(/\D/g, ''))
        );
      });
    }

    // Status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter((patient) => filters.status.includes(patient.status));
    }

    // Plan filter
    if (filters.plano.length > 0) {
      filtered = filtered.filter((patient) => filters.plano.includes(patient.plano));
    }

    // Gender filter
    if (filters.sexo.length > 0) {
      filtered = filtered.filter((patient) => filters.sexo.includes(patient.sexo_biologico));
    }

    // Age range filter
    if (filters.ageRange.min !== null || filters.ageRange.max !== null) {
      filtered = filtered.filter((patient) => {
        const age = calculateAge(patient.data_nascimento);
        const minAge = filters.ageRange.min ?? 0;
        const maxAge = filters.ageRange.max ?? 150;
        return age >= minAge && age <= maxAge;
      });
    }

    // Date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      filtered = filtered.filter((patient) => {
        const patientDate = new Date(patient.data_cadastro || patient.ultima_consulta);
        const startDate = filters.dateRange.start
          ? new Date(filters.dateRange.start)
          : new Date('1900-01-01');
        const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : new Date();

        return patientDate >= startDate && patientDate <= endDate;
      });
    }

    // Insurance filter
    if (filters.hasInsurance !== '') {
      const hasInsurance = filters.hasInsurance === 'true';
      filtered = filtered.filter((patient) => {
        return patient.possui_convenio_medico === hasInsurance;
      });
    }

    return filtered;
  }, [patients, searchTerm, filters, calculateAge]);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleFiltersChange = useCallback((newFilters: PatientFilters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    filters,
    filteredPatients,
    isFiltering,
    totalResults: filteredPatients.length,
    handleSearchChange,
    handleFiltersChange,
    handleClearFilters,
  };
}
