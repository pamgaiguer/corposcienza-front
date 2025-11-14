import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas públicas que não precisam de autenticação
  const publicPaths = ['/admin/login', '/admin/forgot-password'];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Se for rota pública, permite acesso
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Verifica se é rota administrativa
  if (pathname.startsWith('/admin')) {
    // Verifica se tem token de acesso
    const accessToken = request.cookies.get('access_token')?.value;

    // Se não tiver token, redireciona para login
    if (!accessToken) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configuração do matcher para especificar quais rotas o middleware deve processar
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.gif$).*)',
  ],
};
