'use client';

import type React from 'react';

import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to admin dashboard
    router.push('/admin');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="relative hidden lg:flex lg:w-1/2">
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-blue-600/20 to-emerald-600/20" />
        <Image
          width={600}
          height={800}
          priority
          src="/modern-medical-consultation-room-with-doctor-and-p.png"
          alt="Medical consultation room"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 text-white">
          <div className="rounded-lg bg-black/30 p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-3xl font-bold">Sistema de Gestão Médica</h2>
            <p className="text-lg opacity-90">
              Acesse o painel administrativo para gerenciar pacientes, consultas e relatórios de
              forma segura e eficiente.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4" />
              <span>Protegido por criptografia de ponta a ponta</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-8 dark:bg-gray-900">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Acesso Administrativo
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Entre com suas credenciais para acessar o sistema
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-center text-xl">Login</CardTitle>
              <CardDescription className="text-center">
                Faça login em sua conta administrativa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" checked={rememberMe} onCheckedChange={setRememberMe} />
                    <Label htmlFor="remember" className="text-sm">
                      Lembrar-me
                    </Label>
                  </div>
                  <Link
                    href="/admin/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Entrando...
                    </div>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>

              {/* Security Notice */}
              <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  <div className="text-sm">
                    <p className="mb-1 font-medium text-blue-900 dark:text-blue-100">
                      Acesso Seguro
                    </p>
                    <p className="text-blue-700 dark:text-blue-300">
                      Este sistema está em conformidade com as normas HIPAA e LGPD. Todas as
                      atividades são monitoradas e registradas.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2024 Sistema Médico. Todos os direitos reservados.</p>
            <div className="mt-2 flex items-center justify-center gap-4">
              <Link href="/privacy" className="hover:text-blue-600">
                Política de Privacidade
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-blue-600">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
