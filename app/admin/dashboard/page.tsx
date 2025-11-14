'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  Calendar,
  Activity,
  AlertCircle,
  CheckCircle,
  UserPlus,
  FileText,
  Heart,
  Brain,
  Stethoscope,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { analyticsService } from '@/services/api/analytics';
import type { DashboardStats } from '@/services/api/analytics';
import type { LucideIcon } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: string;
  badge?: string;
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await analyticsService.getDashboardStats();
        setDashboardData(data);
      } catch {
        setError('Erro ao carregar dados do dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats: StatCard[] = dashboardData
    ? [
        {
          title: 'Total de Pacientes',
          value: dashboardData.totalPatients.toLocaleString('pt-BR'),
          change: dashboardData.totalPatientsChange,
          trend: 'up' as const,
          icon: Users,
          color: 'blue',
        },
        {
          title: 'Novos Pacientes (30d)',
          value: dashboardData.newPatientsLast30Days.toString(),
          change: dashboardData.newPatientsChange,
          trend: 'up' as const,
          icon: UserPlus,
          color: 'green',
        },
        {
          title: 'Consultas Hoje',
          value: dashboardData.appointmentsToday.toString(),
          change: 'Em desenvolvimento',
          trend: 'up' as const,
          icon: Calendar,
          color: 'emerald',
          badge: 'Em breve',
        },
        {
          title: 'Casos Ativos',
          value: dashboardData.activeCases.toString(),
          change: 'Em desenvolvimento',
          trend: 'up' as const,
          icon: Activity,
          color: 'orange',
          badge: 'Em breve',
        },
      ]
    : [];

  const recentAppointments = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      time: '09:00 AM',
      type: 'Consultation',
      status: 'confirmed',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    {
      id: 2,
      patient: 'Michael Chen',
      time: '10:30 AM',
      type: 'Follow-up',
      status: 'in-progress',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    {
      id: 3,
      patient: 'Emily Davis',
      time: '02:00 PM',
      type: 'Check-up',
      status: 'pending',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    {
      id: 4,
      patient: 'Robert Wilson',
      time: '03:30 PM',
      type: 'Consultation',
      status: 'confirmed',
      avatar: '/placeholder.svg?height=32&width=32',
    },
  ];

  const quickActions = [
    {
      title: 'Add New Patient',
      description: 'Register a new patient in the system',
      icon: UserPlus,
      href: '/admin/patients/new',
      color: 'blue',
    },
    {
      title: 'Schedule Appointment',
      description: 'Book a new appointment',
      icon: Calendar,
      href: '/admin/appointments/new',
      color: 'green',
    },
    {
      title: 'View Reports',
      description: 'Access medical reports and analytics',
      icon: FileText,
      href: '/admin/reports',
      color: 'purple',
    },
    {
      title: 'Emergency Alerts',
      description: 'Check urgent notifications',
      icon: AlertCircle,
      href: '/admin/alerts',
      color: 'red',
    },
  ];

  const departmentStats = [
    { name: 'Cardiology', patients: 145, progress: 78, icon: Heart, color: 'red' },
    { name: 'Neurology', patients: 98, progress: 65, icon: Brain, color: 'purple' },
    {
      name: 'General Medicine',
      patients: 234,
      progress: 89,
      icon: Stethoscope,
      color: 'blue',
    },
    { name: 'Pediatrics', patients: 87, progress: 56, icon: Users, color: 'green' },
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-full max-w-md border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-red-800 dark:text-red-400">Erro</CardTitle>
            <CardDescription className="text-red-600 dark:text-red-300">{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-8 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Bem-vindo! Aqui está o que está acontecendo no seu centro médico hoje.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 text-${stat.color}-600 dark:text-${stat.color}-400`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                {stat.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {stat.badge}
                  </Badge>
                )}
              </div>
              <p
                className={`text-xs ${
                  stat.trend === 'up'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Appointments */}
        <Card className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Today's Appointments</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Upcoming appointments for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center space-x-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
                >
                  <Avatar>
                    <AvatarImage src={appointment.avatar || '/placeholder.svg'} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                      {appointment.patient
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {appointment.patient}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {appointment.time} • {appointment.type}
                    </p>
                  </div>
                  <Badge
                    variant={
                      appointment.status === 'confirmed'
                        ? 'default'
                        : appointment.status === 'in-progress'
                          ? 'secondary'
                          : 'outline'
                    }
                    className={
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : appointment.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }
                  >
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button
                asChild
                variant="outline"
                className="w-full border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
              >
                <Link href="/admin/appointments">View All Appointments</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Frequently used actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  asChild
                  variant="ghost"
                  className="h-auto w-full justify-start p-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  <Link href={action.href}>
                    <action.icon
                      className={`mr-3 h-4 w-4 text-${action.color}-600 dark:text-${action.color}-400`}
                    />
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {action.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {action.description}
                      </div>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Statistics */}
      <Card className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Department Overview</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Patient distribution across departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <dept.icon
                    className={`h-5 w-5 text-${dept.color}-600 dark:text-${dept.color}-400`}
                  />
                  <span className="font-medium text-gray-900 dark:text-white">{dept.name}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Patients</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {dept.patients}
                    </span>
                  </div>
                  <Progress value={dept.progress} className="h-2" />
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {dept.progress}% capacity
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Latest updates and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                icon: CheckCircle,
                message: 'Patient Sarah Johnson completed her check-up',
                time: '2 minutes ago',
                type: 'success',
              },
              {
                icon: UserPlus,
                message: 'New patient Michael Chen registered',
                time: '15 minutes ago',
                type: 'info',
              },
              {
                icon: AlertCircle,
                message: 'Lab results ready for Emily Davis',
                time: '1 hour ago',
                type: 'warning',
              },
              {
                icon: Calendar,
                message: 'Appointment scheduled for Robert Wilson',
                time: '2 hours ago',
                type: 'info',
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <activity.icon
                  className={`mt-0.5 h-5 w-5 ${
                    activity.type === 'success'
                      ? 'text-green-600 dark:text-green-400'
                      : activity.type === 'warning'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-blue-600 dark:text-blue-400'
                  }`}
                />
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
