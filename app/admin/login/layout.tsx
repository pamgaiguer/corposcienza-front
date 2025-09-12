import type { Metadata, Viewport } from 'next';
import type React from 'react';

// Metadados para SEO e informações da página
export const metadata: Metadata = {
  title: 'Acesso Administrativo | Sistema de Gestão',
  description: 'Entre com suas credenciais para acessar o sistema.',
};

// Configurações da viewport para resolver os avisos
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
