"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, Calendar, Phone, Shield, Users, Award, BookOpen, Mail, Stethoscope, X, ChevronDown } from "lucide-react"
import ThemeToggle from "./theme-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    {
      title: "Home",
      href: "/",
      icon: null,
    },
    {
      title: "Sobre Nós",
      href: "/sobre",
      icon: Users,
      submenu: [
        {
          title: "História da Corpo Scienza",
          href: "/sobre/historia",
          description: "Nossa jornada na medicina personalizada",
        },
        {
          title: "Dr. Henrique - Coordenador",
          href: "/sobre/dr-henrique",
          description: "Conheça nosso coordenador principal",
        },
        {
          title: "Filosofia da Clínica",
          href: "/sobre/filosofia",
          description: "Nossos valores e princípios",
        },
        {
          title: "Equipe Multidisciplinar",
          href: "/sobre/equipe",
          description: "Profissionais especializados",
        },
        {
          title: "Diferenciais Científicos",
          href: "/sobre/diferenciais",
          description: "O que nos torna únicos",
        },
      ],
    },
    {
      title: "Nosso Método",
      href: "/metodo",
      icon: Award,
      submenu: [
        {
          title: "Abordagem Multidisciplinar",
          href: "/metodo/abordagem",
          description: "Cuidado integrado e personalizado",
        },
        {
          title: "Tecnologia e Inovação",
          href: "/metodo/tecnologia",
          description: "Soluções tecnológicas avançadas",
        },
        {
          title: "Base Científica",
          href: "/metodo/ciencia",
          description: "Medicina baseada em evidências",
        },
        {
          title: "Processo de Avaliação",
          href: "/metodo/avaliacao",
          description: "Como avaliamos cada paciente",
        },
        {
          title: "Casos de Sucesso",
          href: "/metodo/casos",
          description: "Histórias de transformação",
        },
      ],
    },
    {
      title: "Planos",
      href: "/planos",
      icon: Shield,
      badge: "Popular",
    },
    {
      title: "Blog",
      href: "/blog",
      icon: BookOpen,
    },
    {
      title: "Contato",
      href: "/contato",
      icon: Mail,
    },
  ]

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700"
          : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Stethoscope className="h-5 w-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Corpo Scienza
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Medicina Personalizada</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.submenu ? (
                  <>
                    <button className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium py-2">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.title}
                      {item.badge && (
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.title && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="block px-6 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            >
                              <div className="font-medium text-sm text-gray-900 dark:text-white">{subItem.title}</div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{subItem.description}</p>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium py-2"
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.title}
                    {item.badge && (
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA Buttons + Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle />
            <motion.button
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="mr-2 h-4 w-4" />
              (11) 9999-9999
            </motion.button>
            <motion.button
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Agendar
            </motion.button>
          </div>

          {/* Mobile Menu Button + Theme Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              <div className="flex items-center space-x-3 pb-4 border-b dark:border-gray-700">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Stethoscope className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">Corpo Scienza</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Medicina Personalizada</div>
                </div>
              </div>

              {menuItems.map((item) => (
                <div key={item.title} className="space-y-2">
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    {item.title}
                    {item.badge && (
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                  {item.submenu && (
                    <div className="ml-8 space-y-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-6 space-y-3 border-t dark:border-gray-700">
                <button className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-300">
                  <Phone className="mr-2 h-4 w-4" />
                  (11) 9999-9999
                </button>
                <button className="w-full inline-flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300">
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar Consulta
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
