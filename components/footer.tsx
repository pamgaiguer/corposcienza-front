"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Clock,
  Shield,
  Award,
  Heart,
} from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Corpo Scienza",
      links: [
        { name: "Sobre Nós", href: "/sobre" },
        { name: "Nossa Equipe", href: "/sobre/equipe" },
        { name: "Filosofia", href: "/sobre/filosofia" },
        { name: "Diferenciais", href: "/sobre/diferenciais" },
      ],
    },
    {
      title: "Serviços",
      links: [
        { name: "Consultas", href: "/servicos/consultas" },
        { name: "Exames", href: "/servicos/exames" },
        { name: "Telemedicina", href: "/servicos/telemedicina" },
        { name: "Check-up Executivo", href: "/servicos/checkup" },
      ],
    },
    {
      title: "Planos",
      links: [
        { name: "Plano Essential", href: "/planos#essential" },
        { name: "Plano Premium", href: "/planos#premium" },
        { name: "Plano Executive", href: "/planos#executive" },
        { name: "Comparar Planos", href: "/planos" },
      ],
    },
    {
      title: "Suporte",
      links: [
        { name: "Central de Ajuda", href: "/suporte" },
        { name: "Agendamento", href: "/agendamento" },
        { name: "Resultados de Exames", href: "/resultados" },
        { name: "Fale Conosco", href: "/contato" },
      ],
    },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-600" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-700" },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Stethoscope className="h-5 w-5 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold group-hover:text-blue-400 transition-colors">Corpo Scienza</span>
                <span className="text-sm text-gray-400 -mt-1">Medicina Personalizada</span>
              </div>
            </Link>

            <p className="text-gray-300 leading-relaxed">
              Transformando vidas através da medicina personalizada, com abordagem científica, tecnologia avançada e
              cuidado humano excepcional.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>contato@corposcienza.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>São Paulo, SP - Brasil</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>Seg-Sex: 8h-18h | Sáb: 8h-12h</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-colors`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section, index) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-700">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <div className="text-sm font-medium">Certificação ISO</div>
              <div className="text-xs text-gray-400">Qualidade Internacional</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Award className="h-8 w-8 text-emerald-400" />
              <div className="text-sm font-medium">CRM Ativo</div>
              <div className="text-xs text-gray-400">Profissionais Licenciados</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Heart className="h-8 w-8 text-red-400" />
              <div className="text-sm font-medium">98% Satisfação</div>
              <div className="text-xs text-gray-400">Pacientes Satisfeitos</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Stethoscope className="h-8 w-8 text-purple-400" />
              <div className="text-sm font-medium">15+ Anos</div>
              <div className="text-xs text-gray-400">Experiência Médica</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 dark:border-gray-700 bg-gray-950 dark:bg-black">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">© {currentYear} Corpo Scienza. Todos os direitos reservados.</div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacidade" className="text-gray-400 hover:text-blue-400 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="text-gray-400 hover:text-blue-400 transition-colors">
                Termos de Uso
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookies
              </Link>
              <Link href="/lgpd" className="text-gray-400 hover:text-blue-400 transition-colors">
                LGPD
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
