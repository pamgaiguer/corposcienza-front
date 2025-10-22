"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, Activity, UserPlus, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Line,
  AreaChart,
  Area,
} from "recharts"

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

export default function AnalyticsPage() {
  // Mock data for analytics
  const stats = [
    {
      title: "Total de Pacientes",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "blue",
      description: "vs mês anterior",
    },
    {
      title: "Novos Pacientes (30d)",
      value: "89",
      change: "+23%",
      changeType: "positive",
      icon: UserPlus,
      color: "emerald",
      description: "vs período anterior",
    },
    {
      title: "Taxa de Retenção",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: Activity,
      color: "purple",
      description: "últimos 6 meses",
    },
    {
      title: "Receita Média/Paciente",
      value: "R$ 342",
      change: "+8%",
      changeType: "positive",
      icon: TrendingUp,
      color: "orange",
      description: "vs mês anterior",
    },
  ]

  // Patient registration trend data
  const registrationTrend = [
    { month: "Jan", patients: 65, revenue: 22000 },
    { month: "Fev", patients: 78, revenue: 26500 },
    { month: "Mar", patients: 92, revenue: 31200 },
    { month: "Abr", patients: 85, revenue: 28900 },
    { month: "Mai", patients: 103, revenue: 35100 },
    { month: "Jun", patients: 89, revenue: 30400 },
    { month: "Jul", patients: 95, revenue: 32300 },
    { month: "Ago", patients: 112, revenue: 38200 },
    { month: "Set", patients: 98, revenue: 33400 },
    { month: "Out", patients: 107, revenue: 36500 },
    { month: "Nov", patients: 89, revenue: 30300 },
    { month: "Dez", patients: 94, revenue: 32000 },
  ]

  // Age distribution data
  const ageDistribution = [
    { range: "0-18", count: 156, percentage: 12.5 },
    { range: "19-30", count: 298, percentage: 23.9 },
    { range: "31-45", count: 387, percentage: 31.0 },
    { range: "46-60", count: 267, percentage: 21.4 },
    { range: "60+", count: 139, percentage: 11.2 },
  ]

  // Plan distribution data
  const planDistribution = [
    { name: "Essencial", value: 487, color: "#3B82F6" },
    { name: "Premium", value: 423, color: "#8B5CF6" },
    { name: "Executivo", value: 337, color: "#F59E0B" },
  ]

  // Gender distribution data
  const genderDistribution = [
    { name: "Feminino", value: 678, color: "#EC4899" },
    { name: "Masculino", value: 569, color: "#06B6D4" },
  ]

  // City distribution data
  const cityDistribution = [
    { city: "São Paulo", count: 423, percentage: 33.9 },
    { city: "Rio de Janeiro", count: 298, percentage: 23.9 },
    { city: "Belo Horizonte", count: 187, percentage: 15.0 },
    { city: "Brasília", count: 156, percentage: 12.5 },
    { city: "Salvador", count: 98, percentage: 7.9 },
    { city: "Outros", count: 85, percentage: 6.8 },
  ]

  // Appointment trends
  const appointmentTrends = [
    { day: "Seg", appointments: 45, completed: 42, cancelled: 3 },
    { day: "Ter", appointments: 52, completed: 48, cancelled: 4 },
    { day: "Qua", appointments: 48, completed: 45, cancelled: 3 },
    { day: "Qui", appointments: 56, completed: 51, cancelled: 5 },
    { day: "Sex", appointments: 49, completed: 46, cancelled: 3 },
    { day: "Sáb", appointments: 23, completed: 21, cancelled: 2 },
    { day: "Dom", appointments: 12, completed: 11, cancelled: 1 },
  ]

  return (
    <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <motion.div className="mb-8" {...fadeInUp}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Insights e métricas dos seus pacientes</p>
          </div>
          <div className="flex items-center gap-4">
            <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Últimos 30 dias</option>
              <option>Últimos 90 dias</option>
              <option>Últimos 6 meses</option>
              <option>Último ano</option>
            </select>
            <motion.button
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Exportar Relatório
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={fadeInUp} whileHover={{ y: -2 }}>
            <Card className="hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <span
                        className={`text-sm font-medium ${
                          stat.changeType === "positive"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{stat.description}</span>
                    </div>
                  </div>
                  <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Patient Registration Trend */}
        <motion.div {...fadeInUp}>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Tendência de Cadastros</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Novos pacientes e receita por mês
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  patients: {
                    label: "Pacientes",
                    color: "hsl(var(--chart-1))",
                  },
                  revenue: {
                    label: "Receita",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={registrationTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
                    <YAxis yAxisId="left" className="text-gray-600 dark:text-gray-400" />
                    <YAxis yAxisId="right" orientation="right" className="text-gray-600 dark:text-gray-400" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="patients"
                      stroke="var(--color-patients)"
                      fill="var(--color-patients)"
                      fillOpacity={0.3}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Age Distribution */}
        <motion.div {...fadeInUp}>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Distribuição por Idade</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Faixas etárias dos pacientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Pacientes",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis dataKey="range" className="text-gray-600 dark:text-gray-400" />
                    <YAxis className="text-gray-600 dark:text-gray-400" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Plan Distribution */}
        <motion.div {...fadeInUp}>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Distribuição por Plano</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Tipos de planos contratados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  essencial: {
                    label: "Essencial",
                    color: "#3B82F6",
                  },
                  premium: {
                    label: "Premium",
                    color: "#8B5CF6",
                  },
                  executivo: {
                    label: "Executivo",
                    color: "#F59E0B",
                  },
                }}
                className="h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={planDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {planDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 space-y-2">
                {planDistribution.map((plan) => (
                  <div key={plan.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }}></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{plan.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{plan.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Gender Distribution */}
        <motion.div {...fadeInUp}>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Distribuição por Gênero</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Divisão entre pacientes</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  feminino: {
                    label: "Feminino",
                    color: "#EC4899",
                  },
                  masculino: {
                    label: "Masculino",
                    color: "#06B6D4",
                  },
                }}
                className="h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {genderDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 space-y-2">
                {genderDistribution.map((gender) => (
                  <div key={gender.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: gender.color }}></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{gender.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {gender.value} ({((gender.value / 1247) * 100).toFixed(1)}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Cities */}
        <motion.div {...fadeInUp}>
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Principais Cidades</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Distribuição geográfica</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cityDistribution.map((city, index) => (
                  <div key={city.city} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{city.city}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{city.percentage}% do total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{city.count}</p>
                      <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                        <div
                          className="h-2 bg-blue-500 dark:bg-blue-400 rounded-full"
                          style={{ width: `${city.percentage * 3}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Appointment Trends */}
      <motion.div {...fadeInUp}>
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Tendência de Consultas</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Consultas agendadas, realizadas e canceladas por dia da semana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                appointments: {
                  label: "Agendadas",
                  color: "hsl(var(--chart-1))",
                },
                completed: {
                  label: "Realizadas",
                  color: "hsl(var(--chart-2))",
                },
                cancelled: {
                  label: "Canceladas",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                  <XAxis dataKey="day" className="text-gray-600 dark:text-gray-400" />
                  <YAxis className="text-gray-600 dark:text-gray-400" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="appointments" fill="var(--color-appointments)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cancelled" fill="var(--color-cancelled)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Insights Cards */}
      <motion.div className="mt-8" {...fadeInUp}>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Insights Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-emerald-500 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Crescimento Acelerado</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">+23% novos pacientes</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Melhor performance em 6 meses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Faixa Etária Dominante</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">31-45 anos (31%)</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Maior segmento de pacientes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Alta Retenção</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">94.2% mantidos</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Excelente satisfação</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
