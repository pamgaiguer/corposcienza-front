'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  Shield,
  Users,
  Award,
  Star,
  Calendar,
  Phone,
  Brain,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Paciente',
      content:
        'Atendimento excepcional! A equipe é muito atenciosa e os médicos são extremamente competentes.',
      rating: 5,
    },
    {
      name: 'João Santos',
      role: 'Paciente',
      content: 'Tecnologia de ponta e cuidado humanizado. Recomendo a todos!',
      rating: 5,
    },
    {
      name: 'Ana Costa',
      role: 'Paciente',
      content: 'Mudou minha vida! Finalmente encontrei profissionais que realmente se importam.',
      rating: 5,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16 pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-emerald-600/10 dark:from-blue-900/20 dark:to-emerald-900/20" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-6xl">
                  Medicina
                  <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    {' '}
                    Personalizada
                  </span>
                  <br />
                  para Você
                </h1>
                <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                  Cuidado médico de excelência com abordagem científica e humanizada. Tecnologia
                  avançada a serviço da sua saúde e bem-estar.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="bg-blue-600 px-8 py-4 text-lg text-white hover:bg-blue-700"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Consulta
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent px-8 py-4 text-lg">
                  Conhecer Planos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">15+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Anos de Experiência
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    10k+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Pacientes Atendidos
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">98%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Satisfação</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <Image
                  width={600}
                  height={400}
                  priority
                  src="/modern-medical-consultation-room-with-doctor-and-p.png"
                  alt="Consulta médica moderna"
                  className="h-auto w-full rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -right-4 -top-4 h-72 w-72 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 opacity-20 blur-3xl" />
              <div className="absolute -bottom-4 -left-4 h-72 w-72 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Por que Escolher a Corpo Scienza?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              Combinamos expertise médica, tecnologia avançada e cuidado humanizado para oferecer a
              melhor experiência em saúde.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Heart,
                title: 'Cuidado Humanizado',
                description:
                  'Atendimento personalizado com foco no bem-estar integral do paciente.',
              },
              {
                icon: Shield,
                title: 'Segurança Total',
                description: 'Protocolos rigorosos de segurança e privacidade dos dados médicos.',
              },
              {
                icon: Users,
                title: 'Equipe Especializada',
                description: 'Profissionais altamente qualificados e em constante atualização.',
              },
              {
                icon: Award,
                title: 'Excelência Reconhecida',
                description: 'Certificações e reconhecimentos nacionais e internacionais.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 text-center shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-gray-700">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-emerald-600">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Nossas Especialidades
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              Oferecemos uma ampla gama de especialidades médicas com os mais altos padrões de
              qualidade.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: 'Cardiologia',
                description: 'Cuidados especializados para o coração e sistema cardiovascular.',
                image: '/cardiology-illustration.png',
              },
              {
                icon: Brain,
                title: 'Neurologia',
                description: 'Diagnóstico e tratamento de distúrbios do sistema nervoso.',
                image: '/neurology-diagram.png',
              },
              {
                icon: Activity,
                title: 'Ortopedia',
                description: 'Tratamento de lesões e doenças do sistema musculoesquelético.',
                image: '/orthopedics.jpg',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
                  <div className="flex h-48 items-center justify-center bg-gradient-to-r from-blue-600 to-emerald-600">
                    <service.icon className="h-16 w-16 text-white" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-gray-600 dark:text-gray-300">
                      {service.description}
                    </CardDescription>
                    <Button variant="outline" className="w-full bg-transparent">
                      Saiba Mais
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              O que Nossos Pacientes Dizem
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              Depoimentos reais de pessoas que confiaram na Corpo Scienza para cuidar da sua saúde.
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <Card className="border-0 shadow-lg dark:bg-gray-700">
              <CardContent className="p-8 text-center">
                <div className="mb-4 flex justify-center">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-current text-yellow-400" />
                  ))}
                </div>
                <blockquote className="mb-6 text-xl italic text-gray-700 dark:text-gray-300">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-emerald-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Pronto para Cuidar da Sua Saúde com Excelência?
            </h2>
            <p className="mb-8 text-xl text-blue-100">
              Agende sua consulta hoje mesmo e experimente o que há de mais avançado em medicina
              personalizada.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-white px-8 py-4 text-lg text-blue-600 hover:bg-gray-100"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Agendar Consulta
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent px-8 py-4 text-lg text-white hover:bg-white hover:text-blue-600"
              >
                <Phone className="mr-2 h-5 w-5" />
                Falar Conosco
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
