'use client';

import { useEffect, useState } from 'react';

interface AnalyticsData {
  totalPatients: number;
  newPatients: number;
  retentionRate: number;
  averageRevenue: number;
  registrationTrend: Array<{
    month: string;
    patients: number;
    revenue: number;
  }>;
  ageDistribution: Array<{
    range: string;
    count: number;
    percentage: number;
  }>;
  planDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  genderDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  cityDistribution: Array<{
    city: string;
    count: number;
    percentage: number;
  }>;
  appointmentTrends: Array<{
    day: string;
    appointments: number;
    completed: number;
    cancelled: number;
  }>;
}

export function useAnalyticsData() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - in real app, this would come from your API
        const mockData: AnalyticsData = {
          totalPatients: 1247,
          newPatients: 89,
          retentionRate: 94.2,
          averageRevenue: 342,
          registrationTrend: [
            { month: 'Jan', patients: 65, revenue: 22000 },
            { month: 'Fev', patients: 78, revenue: 26500 },
            { month: 'Mar', patients: 92, revenue: 31200 },
            { month: 'Abr', patients: 85, revenue: 28900 },
            { month: 'Mai', patients: 103, revenue: 35100 },
            { month: 'Jun', patients: 89, revenue: 30400 },
            { month: 'Jul', patients: 95, revenue: 32300 },
            { month: 'Ago', patients: 112, revenue: 38200 },
            { month: 'Set', patients: 98, revenue: 33400 },
            { month: 'Out', patients: 107, revenue: 36500 },
            { month: 'Nov', patients: 89, revenue: 30300 },
            { month: 'Dez', patients: 94, revenue: 32000 },
          ],
          ageDistribution: [
            { range: '0-18', count: 156, percentage: 12.5 },
            { range: '19-30', count: 298, percentage: 23.9 },
            { range: '31-45', count: 387, percentage: 31.0 },
            { range: '46-60', count: 267, percentage: 21.4 },
            { range: '60+', count: 139, percentage: 11.2 },
          ],
          planDistribution: [
            { name: 'Essencial', value: 487, color: '#3B82F6' },
            { name: 'Premium', value: 423, color: '#8B5CF6' },
            { name: 'Executivo', value: 337, color: '#F59E0B' },
          ],
          genderDistribution: [
            { name: 'Feminino', value: 678, color: '#EC4899' },
            { name: 'Masculino', value: 569, color: '#06B6D4' },
          ],
          cityDistribution: [
            { city: 'São Paulo', count: 423, percentage: 33.9 },
            { city: 'Rio de Janeiro', count: 298, percentage: 23.9 },
            { city: 'Belo Horizonte', count: 187, percentage: 15.0 },
            { city: 'Brasília', count: 156, percentage: 12.5 },
            { city: 'Salvador', count: 98, percentage: 7.9 },
            { city: 'Outros', count: 85, percentage: 6.8 },
          ],
          appointmentTrends: [
            { day: 'Seg', appointments: 45, completed: 42, cancelled: 3 },
            { day: 'Ter', appointments: 52, completed: 48, cancelled: 4 },
            { day: 'Qua', appointments: 48, completed: 45, cancelled: 3 },
            { day: 'Qui', appointments: 56, completed: 51, cancelled: 5 },
            { day: 'Sex', appointments: 49, completed: 46, cancelled: 3 },
            { day: 'Sáb', appointments: 23, completed: 21, cancelled: 2 },
            { day: 'Dom', appointments: 12, completed: 11, cancelled: 1 },
          ],
        };

        setData(mockData);
      } catch {
        setError('Erro ao carregar dados de analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  return { data, loading, error };
}
