"use client"

import { motion } from "framer-motion"
import {
  Users,
  Calendar,
  FileText,
  Activity,
  TrendingUp,
  UserPlus,
  CalendarPlus,
  Bell,
  Search,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total de Pacientes",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "blue",
    },
    {
      title: "Consultas Hoje",
      value: "23",
      change: "+5%",
      changeType: "positive",
      icon: Calendar,
      color: "emerald",
    },
    {
      title: "Receita Mensal",
      value: "R$ 89.4K",
      change: "+18%",
      changeType: "positive",
      icon: TrendingUp,
      color: "purple",
    },
    {
      title: "Taxa de Satisfação",
      value: "98.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: Activity,
      color: "orange",
    },
  ]

  const recentPatients = [
    {
      id: 1,
      name: "Maria Silva Santos",
      email: "maria.silva@email.com",
      phone: "(11) 99999-9999",
      lastVisit: "2024-01-15",
      status: "Ativo",
      plan: "Premium",
    },
    {
      id: 2,
      name: "João Carlos Oliveira",
      email: "joao.carlos@email.com",
      phone: "(11) 88888-8888",
      lastVisit: "2024-01-14",
      status: "Ativo",
      plan: "Essencial",
    },
    {
      id: 3,
      name: "Ana Paula Costa",
      email: "ana.paula@email.com",
      phone: "(11) 77777-7777",
      lastVisit: "2024-01-13",
      status: "Inativo",
      plan: "Executivo",
    },
    {
      id: 4,
      name: "Carlos Eduardo Lima",
      email: "carlos.eduardo@email.com",
      phone: "(11) 66666-6666",
      lastVisit: "2024-01-12",
      status: "Ativo",
      plan: "Premium",
    },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Maria Silva Santos",
      doctor: "Dr. Henrique",
      time: "09:00",
      type: "Consulta",
      status: "Confirmado",
    },
    {
      id: 2,
      patient: "João Carlos Oliveira",
      doctor: "Dra. Ana",
      time: "10:30",
      type: "Retorno",
      status: "Pendente",
    },
    {
      id: 3,
      patient: "Ana Paula Costa",
      doctor: "Dr. Roberto",
      time: "14:00",
      type: "Exame",
      status: "Confirmado",
    },
    {
      id: 4,
      patient: "Carlos Eduardo Lima",
      doctor: "Dr. Henrique",
      time: "15:30",
      type: "Consulta",
      status: "Confirmado",
    },
  ]

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div className="mb-8" {...fadeInUp}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
            <p className="text-gray-600 mt-1">Bem-vindo de volta! Aqui está o resumo de hoje.</p>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </motion.button>
            <motion.button
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Paciente
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            variants={fadeInUp}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "positive" ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs mês anterior</span>
                </div>
              </div>
              <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Patients */}
        <motion.div className="lg:col-span-2" {...fadeInUp}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Pacientes Recentes</h2>
                <div className="flex items-center gap-2">
                  <motion.button
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Search className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Filter className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Download className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Paciente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Última Visita
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plano
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentPatients.map((patient) => (
                    <motion.tr
                      key={patient.id}
                      className="hover:bg-gray-50 transition-colors"
                      whileHover={{ backgroundColor: "#f9fafb" }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-700 font-semibold text-sm">
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                            <div className="text-sm text-gray-500">ID: #{patient.id.toString().padStart(4, "0")}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{patient.email}</div>
                        <div className="text-sm text-gray-500">{patient.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(patient.lastVisit).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            patient.status === "Ativo" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            patient.plan === "Premium"
                              ? "bg-purple-100 text-purple-800"
                              : patient.plan === "Executivo"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {patient.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <motion.button
                            className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Eye className="h-4 w-4" />
                          </motion.button>
                          <motion.button
                            className="text-emerald-600 hover:text-emerald-900 p-1 hover:bg-emerald-50 rounded transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit className="h-4 w-4" />
                          </motion.button>
                          <motion.button
                            className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Mostrando 4 de 1,247 pacientes</p>
                <motion.button
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  Ver todos os pacientes →
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div {...fadeInUp}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Próximas Consultas</h2>
                <motion.button
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <CalendarPlus className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {upcomingAppointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                      <p className="text-xs text-gray-500">
                        {appointment.time} - {appointment.doctor}
                      </p>
                      <p className="text-xs text-gray-500">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        appointment.status === "Confirmado"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                    <motion.button
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <motion.button
                className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium text-center"
                whileHover={{ scale: 1.02 }}
              >
                Ver todas as consultas
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div className="mt-8" {...fadeInUp}>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Novo Paciente", icon: UserPlus, color: "blue" },
            { title: "Agendar Consulta", icon: CalendarPlus, color: "emerald" },
            { title: "Relatórios", icon: FileText, color: "purple" },
            { title: "Configurações", icon: Activity, color: "orange" },
          ].map((action, index) => (
            <motion.button
              key={action.title}
              className={`p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all text-center group`}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-${action.color}-200 transition-colors`}
              >
                <action.icon className={`h-6 w-6 text-${action.color}-600`} />
              </div>
              <p className="text-sm font-medium text-gray-900">{action.title}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
