"use client"

import ClientLayout from "./clientLayout"
import { motion } from "framer-motion"
import {
  Calendar,
  CheckCircle,
  Star,
  Users,
  Award,
  Clock,
  ArrowRight,
  Quote,
  Shield,
  Heart,
  Stethoscope,
  Activity,
  Brain,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
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

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

export default function HomePage() {
  return (
    <ClientLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-emerald-600/10 dark:from-blue-600/5 dark:to-emerald-600/5" />
          <div className="container mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    Medicina Personalizada
                  </Badge>
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    Cuidado médico{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                      científico
                    </span>{" "}
                    e personalizado
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    Abordagem multidisciplinar com tecnologia avançada e medicina baseada em evidências para transformar
                    sua saúde e bem-estar.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Calendar className="mr-2 h-5 w-5" />
                    Agendar Consulta
                  </Button>
                  <Button variant="outline" size="lg" className="border-gray-300 dark:border-gray-600 bg-transparent">
                    <Phone className="mr-2 h-5 w-5" />
                    (11) 9999-9999
                  </Button>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">1000+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Pacientes Atendidos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Satisfação</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">15+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Anos de Experiência</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative z-10">
                  <img
                    src="/modern-medical-consultation-room-with-doctor-and-p.png"
                    alt="Consulta médica personalizada"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full blur-3xl opacity-20" />
                <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full blur-3xl opacity-20" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Por que escolher a Corpo Scienza?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Nossa abordagem inovadora combina ciência, tecnologia e cuidado humano para oferecer o melhor em
                medicina personalizada.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Stethoscope,
                  title: "Medicina Baseada em Evidências",
                  description:
                    "Tratamentos fundamentados em pesquisas científicas mais recentes e protocolos internacionais.",
                  color: "blue",
                },
                {
                  icon: Users,
                  title: "Equipe Multidisciplinar",
                  description: "Profissionais especializados trabalhando em conjunto para seu cuidado integral.",
                  color: "emerald",
                },
                {
                  icon: Brain,
                  title: "Abordagem Personalizada",
                  description: "Planos de tratamento únicos, desenvolvidos especificamente para suas necessidades.",
                  color: "purple",
                },
                {
                  icon: Activity,
                  title: "Tecnologia Avançada",
                  description: "Equipamentos de última geração e sistemas digitais para diagnósticos precisos.",
                  color: "orange",
                },
                {
                  icon: Heart,
                  title: "Cuidado Humanizado",
                  description: "Atendimento acolhedor que valoriza a relação médico-paciente e o bem-estar emocional.",
                  color: "red",
                },
                {
                  icon: Shield,
                  title: "Segurança e Qualidade",
                  description: "Protocolos rigorosos de segurança e certificações internacionais de qualidade.",
                  color: "green",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800"
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 bg-${feature.color}-100 dark:bg-${feature.color}-900/20 rounded-lg flex items-center justify-center mb-4`}
                    >
                      <feature.icon className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Plans Highlights */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <span className="inline-flex items-center px-3 py-1 border border-blue-200 text-blue-700 rounded-full text-sm font-medium mb-4">
                Planos Personalizados
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Escolha o plano ideal para suas necessidades
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Oferecemos diferentes níveis de cuidado médico para atender suas necessidades específicas
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  name: "Essencial",
                  price: "R$ 299",
                  period: "/mês",
                  description: "Ideal para acompanhamento básico de saúde",
                  features: [
                    "Consultas mensais",
                    "Exames básicos inclusos",
                    "Suporte online 24/7",
                    "Acesso ao app móvel",
                    "Relatórios de saúde",
                  ],
                  popular: false,
                  color: "blue",
                },
                {
                  name: "Premium",
                  price: "R$ 599",
                  period: "/mês",
                  description: "Nosso plano mais completo e popular",
                  features: [
                    "Consultas ilimitadas",
                    "Todos os exames inclusos",
                    "Acompanhamento 24/7",
                    "Equipe multidisciplinar",
                    "Telemedicina premium",
                    "Medicina preventiva",
                  ],
                  popular: true,
                  color: "emerald",
                },
                {
                  name: "Executivo",
                  price: "R$ 899",
                  period: "/mês",
                  description: "Para quem busca excelência absoluta",
                  features: [
                    "Atendimento VIP exclusivo",
                    "Check-ups executivos",
                    "Medicina preventiva avançada",
                    "Concierge médico pessoal",
                    "Acesso prioritário",
                    "Relatórios personalizados",
                  ],
                  popular: false,
                  color: "purple",
                },
              ].map((plan, index) => (
                <motion.div
                  key={plan.name}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className={`relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                      plan.popular
                        ? "border-2 border-emerald-500 dark:border-emerald-400 shadow-emerald-100 dark:shadow-emerald-900"
                        : "border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                  >
                    {plan.popular && (
                      <motion.div
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        <span className="inline-flex items-center px-4 py-1 bg-emerald-500 text-white rounded-full text-sm font-medium">
                          ⭐ Mais Popular
                        </span>
                      </motion.div>
                    )}
                    <div className="text-center p-8 pb-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">{plan.description}</p>
                      <div className="mt-6">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                        <span className="text-gray-600 dark:text-gray-300 ml-1">{plan.period}</span>
                      </div>
                    </div>
                    <div className="px-8 pb-8 space-y-4">
                      {plan.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </motion.div>
                      ))}
                      <motion.button
                        className={`w-full mt-6 px-6 py-3 font-medium rounded-lg transition-all duration-300 ${
                          plan.popular
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Escolher {plan.name}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 dark:text-gray-300 mb-4">Precisa de um plano personalizado?</p>
              <motion.button
                className="inline-flex items-center px-6 py-3 border border-blue-200 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-600 bg-white dark:bg-gray-800 rounded-lg font-medium transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Falar com Especialista
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Patient Testimonials */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <span className="inline-flex items-center px-3 py-1 border border-emerald-200 text-emerald-700 rounded-full text-sm font-medium mb-4">
                Depoimentos
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                O que nossos pacientes dizem
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Histórias reais de transformação e cuidado médico de excelência
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  name: "Maria Silva",
                  role: "Paciente há 2 anos",
                  content:
                    "O atendimento da Corpo Scienza transformou minha qualidade de vida. A abordagem científica e personalizada fez toda a diferença no meu tratamento.",
                  rating: 5,
                  avatar: "/placeholder.svg?height=60&width=60",
                  condition: "Diabetes Tipo 2",
                },
                {
                  name: "João Santos",
                  role: "Executivo",
                  content:
                    "Como executivo, preciso de um atendimento ágil e eficiente. A equipe multidisciplinar atende todas as minhas necessidades de saúde de forma integrada.",
                  rating: 5,
                  avatar: "/placeholder.svg?height=60&width=60",
                  condition: "Check-up Executivo",
                },
                {
                  name: "Ana Costa",
                  role: "Atleta profissional",
                  content:
                    "A tecnologia integrada ao cuidado médico me permite manter meu desempenho no mais alto nível. O acompanhamento é excepcional!",
                  rating: 5,
                  avatar: "/placeholder.svg?height=60&width=60",
                  condition: "Medicina Esportiva",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 rounded-xl p-6">
                    <Quote className="h-8 w-8 text-blue-500 dark:text-blue-300 mb-4" />
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <span className="text-blue-700 dark:text-blue-300 font-semibold">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</div>
                        <div className="text-xs text-blue-600 dark:text-blue-300 font-medium">
                          {testimonial.condition}
                        </div>
                        <div className="flex gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400 dark:fill-yellow-300 dark:text-yellow-300"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <span className="inline-flex items-center px-3 py-1 border border-blue-200 text-blue-700 rounded-full text-sm font-medium mb-4">
                Processo
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Como Funciona</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Processo simples e eficiente para seu cuidado médico personalizado
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  step: "01",
                  title: "Agendamento Online",
                  description: "Agende sua consulta através da nossa plataforma segura em poucos cliques",
                  icon: Calendar,
                  color: "blue",
                },
                {
                  step: "02",
                  title: "Avaliação Completa",
                  description: "Avaliação detalhada com nossa equipe multidisciplinar especializada",
                  icon: Users,
                  color: "emerald",
                },
                {
                  step: "03",
                  title: "Plano Personalizado",
                  description: "Criamos um plano de tratamento específico baseado em evidências científicas",
                  icon: Award,
                  color: "purple",
                },
                {
                  step: "04",
                  title: "Acompanhamento Contínuo",
                  description: "Monitoramento 24/7 com ajustes em tempo real conforme sua evolução",
                  icon: Clock,
                  color: "orange",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="text-center relative"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative mb-6">
                    <motion.div
                      className={`w-16 h-16 bg-${item.color}-100 dark:bg-${item.color}-900/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className={`h-8 w-8 text-${item.color}-600 dark:text-${item.color}-400`} />
                    </motion.div>
                    <motion.div
                      className={`absolute -top-2 -right-2 w-8 h-8 bg-${item.color}-600 dark:bg-${item.color}-400 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.2, type: "spring" }}
                      viewport={{ once: true }}
                    >
                      {item.step}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                  {index < 3 && (
                    <motion.div
                      className="hidden md:block absolute top-8 -right-4 text-gray-300 dark:text-gray-600"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <ArrowRight className="h-6 w-6" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-800 dark:to-emerald-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
          <motion.div
            className="absolute top-10 left-10 text-white/20 dark:text-white/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Stethoscope className="h-16 w-16" />
          </motion.div>
          <motion.div
            className="absolute bottom-10 right-10 text-white/20 dark:text-white/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Heart className="h-12 w-12" />
          </motion.div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-3xl lg:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Pronto para transformar sua saúde?
              </motion.h2>
              <motion.p
                className="text-xl text-blue-100 dark:text-blue-300 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Agende sua consulta hoje e descubra como nossa abordagem científica e personalizada pode melhorar sua
                qualidade de vida de forma significativa.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.button
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 dark:bg-gray-800 dark:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-500 font-medium rounded-lg shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Consulta Gratuita
                </motion.button>
                <motion.button
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white dark:border-gray-800 text-white dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-300 font-medium rounded-lg shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Conhecer Todos os Planos
                </motion.button>
              </motion.div>

              <motion.div
                className="mt-8 text-blue-100 dark:text-blue-300 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                ✓ Consulta inicial gratuita • ✓ Sem compromisso • ✓ Atendimento em 24h
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </ClientLayout>
  )
}
