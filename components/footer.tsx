'use client';

import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Clock,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CS</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Corpo Scienza</h3>
                <p className="text-sm text-gray-400">Advanced Medical Care</p>
              </div>
            </div>
            <p className="text-gray-400">
              Medicina personalizada e científica com abordagem multidisciplinar e
              tecnologia avançada.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/planos"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Planos
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Especialidades</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/servicos/cardiologia"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cardiologia
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/neurologia"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Neurologia
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/ortopedia"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Ortopedia
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/dermatologia"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Dermatologia
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/pediatria"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pediatria
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">contato@corposcienza.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">São Paulo, SP</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">Seg-Sex: 8h-18h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Corpo Scienza. Todos os direitos reservados. | Política de Privacidade
            | Termos de Uso
          </p>
        </div>
      </div>
    </footer>
  );
}
