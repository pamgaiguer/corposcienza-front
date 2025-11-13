'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService } from '@/services/api/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verifica se usuário está autenticado ao carregar
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    await authService.login({ username, password });
    setIsAuthenticated(true);
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
