import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/theme-context';
import ClientLayout from './clientLayout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Corpo Scienza - Plataforma Médica Inovadora | Medicina Personalizada',
  description:
    'Cuidado médico personalizado e científico com abordagem multidisciplinar, tecnologia avançada e medicina baseada em evidências. Agende sua consulta.',
  keywords:
    'medicina personalizada, telemedicina, consulta médica, planos de saúde, medicina preventiva, corpo scienza',
  authors: [{ name: 'Corpo Scienza' }],
  creator: 'Corpo Scienza',
  publisher: 'Corpo Scienza',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://corposcienza.com',
    title: 'Corpo Scienza - Medicina Personalizada',
    description: 'Plataforma médica inovadora com abordagem científica e personalizada',
    siteName: 'Corpo Scienza',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corpo Scienza - Medicina Personalizada',
    description: 'Cuidado médico personalizado e científico',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2563eb',
  generator: 'v0.app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
