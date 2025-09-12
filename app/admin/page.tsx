'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  Calendar,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle,
  UserPlus,
  FileText,
  Heart,
  Brain,
  Stethoscope,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Patients',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Appointments Today',
      value: '24',
      change: '+3',
      trend: 'up',
      icon: Calendar,
      color: 'green',
    },
    {
      title: 'Revenue This Month',
      value: '$45,231',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'emerald',
    },
    {
      title: 'Active Cases',
      value: '156',
      change: '-2%',
      trend: 'down',
      icon: Activity,
      color: 'orange',
    },
  ];

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

  return (
    <div className="space-y-8 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening at your medical center today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <stat.icon
                className={`h-4 w-4 text-${stat.color}-600 dark:text-${stat.color}-400`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <p
                className={`text-xs ${
                  stat.trend === 'up'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Appointments */}
        <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Today's Appointments
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Upcoming appointments for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <Avatar>
                    <AvatarImage src={appointment.avatar || '/placeholder.svg'} />
                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
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
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : appointment.status === 'in-progress'
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
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
                className="w-full border-gray-300 dark:border-gray-600 bg-transparent"
              >
                <Link href="/admin/appointments">View All Appointments</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
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
                  className="w-full justify-start h-auto p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
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
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">
            Department Overview
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Patient distribution across departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departmentStats.map((dept, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <dept.icon
                    className={`h-5 w-5 text-${dept.color}-600 dark:text-${dept.color}-400`}
                  />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {dept.name}
                  </span>
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
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
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
                  className={`h-5 w-5 mt-0.5 ${
                    activity.type === 'success'
                      ? 'text-green-600 dark:text-green-400'
                      : activity.type === 'warning'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-blue-600 dark:text-blue-400'
                  }`}
                />
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
