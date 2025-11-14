/**
 * Service para analytics e métricas do sistema
 *
 * IMPORTANTE: Este serviço usa dados reais da API sempre que possível,
 * mas calcula agregações no client-side devido à falta de endpoints
 * específicos de analytics no backend Django.
 *
 * TODO: Quando o backend disponibilizar endpoints de analytics
 * (ex: /api/analytics/dashboard-stats/), substituir os cálculos
 * client-side por chamadas diretas.
 */

import { apiClient } from '@/lib/api/client';
import type { APIPaciente, APIPaginatedResponse } from '@/types/api';

export interface DashboardStats {
  totalPatients: number;
  totalPatientsChange: string; // ex: "+12%"
  newPatientsLast30Days: number;
  newPatientsChange: string;
  // Campos que ainda não temos dados reais:
  appointmentsToday: number;
  revenueThisMonth: number;
  activeCases: number;
}

export interface AgeDistribution {
  range: string;
  count: number;
  percentage: number;
}

export interface MonthlyTrend {
  month: string;
  patients: number;
  revenue?: number;
}

export const analyticsService = {
  /**
   * Obtém estatísticas do dashboard
   * Combina dados reais (pacientes) com estimativas (appointments/revenue)
   */
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Busca total de pacientes (página 1 para obter count)
      const { data } = await apiClient.get<APIPaginatedResponse<APIPaciente>>('/pacientes/', {
        params: { page: 1, page_size: 1 },
      });

      const totalPatients = data.count || 0;

      // Busca pacientes dos últimos 30 dias
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: recentData } = await apiClient.get<APIPaginatedResponse<APIPaciente>>(
        '/pacientes/',
        {
          params: {
            page: 1,
            page_size: 1000, // Busca todos para contar
            // Se a API suportar filtro por data:
            // criado_em__gte: dateStr
          },
        },
      );

      // Conta manualmente pacientes criados nos últimos 30 dias
      const recentPatients = recentData.results.filter((p) => {
        if (!p.criado_em) return false;
        const createdDate = new Date(p.criado_em);
        return createdDate >= thirtyDaysAgo;
      });

      const newPatientsCount = recentPatients.length;

      return {
        totalPatients,
        totalPatientsChange: '+12%', // TODO: Calcular baseado em histórico
        newPatientsLast30Days: newPatientsCount,
        newPatientsChange: `+${Math.round((newPatientsCount / totalPatients) * 100)}%`,

        // Valores estimados/mockados (aguardando endpoints específicos)
        appointmentsToday: 0, // TODO: Endpoint de appointments
        revenueThisMonth: 0, // TODO: Endpoint de revenue
        activeCases: 0, // TODO: Endpoint de cases
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Calcula distribuição de pacientes por faixa etária
   */
  async getAgeDistribution(): Promise<AgeDistribution[]> {
    try {
      // Busca todos os pacientes (ou amostra grande)
      const { data } = await apiClient.get<APIPaginatedResponse<APIPaciente>>('/pacientes/', {
        params: { page: 1, page_size: 1000 },
      });

      const patients = data.results;
      const total = patients.length;

      // Categoriza por faixa etária
      const ranges = {
        '0-18': 0,
        '19-30': 0,
        '31-45': 0,
        '46-60': 0,
        '60+': 0,
      };

      patients.forEach((patient) => {
        if (!patient.data_nascimento) return;

        const age = this.calculateAge(patient.data_nascimento);

        if (age <= 18) ranges['0-18']++;
        else if (age <= 30) ranges['19-30']++;
        else if (age <= 45) ranges['31-45']++;
        else if (age <= 60) ranges['46-60']++;
        else ranges['60+']++;
      });

      return Object.entries(ranges).map(([range, count]) => ({
        range,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0,
      }));
    } catch (error) {
      throw error;
    }
  },

  /**
   * Obtém tendência mensal de novos pacientes
   * Agrupa pacientes por mês de criação
   */
  async getMonthlyTrend(months: number = 12): Promise<MonthlyTrend[]> {
    try {
      // Busca todos os pacientes
      const { data } = await apiClient.get<APIPaginatedResponse<APIPaciente>>('/pacientes/', {
        params: { page: 1, page_size: 5000 }, // Ajustar conforme necessário
      });

      const patients = data.results;

      // Cria array de últimos N meses
      const monthsData: Record<string, number> = {};
      const monthNames = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ];

      for (let i = months - 1; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const key = `${monthNames[date.getMonth()]}/${date.getFullYear()}`;
        monthsData[key] = 0;
      }

      // Conta pacientes por mês
      patients.forEach((patient) => {
        if (!patient.criado_em) return;

        const date = new Date(patient.criado_em);
        const key = `${monthNames[date.getMonth()]}/${date.getFullYear()}`;

        if (key in monthsData) {
          monthsData[key]++;
        }
      });

      return Object.entries(monthsData).map(([month, patients]) => ({
        month: month.split('/')[0], // Apenas nome do mês
        patients,
      }));
    } catch (error) {
      throw error;
    }
  },

  /**
   * Calcula idade a partir da data de nascimento
   */
  calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  },

  /**
   * Obtém estatísticas gerais do sistema
   */
  async getSystemStats() {
    try {
      const [dashboardStats, ageDistribution, monthlyTrend] = await Promise.all([
        this.getDashboardStats(),
        this.getAgeDistribution(),
        this.getMonthlyTrend(12),
      ]);

      return {
        dashboardStats,
        ageDistribution,
        monthlyTrend,
      };
    } catch (error) {
      throw error;
    }
  },
};
