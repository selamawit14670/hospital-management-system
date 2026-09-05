import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AuthUser, UserRole, AppRoute } from '../types';
import { AuthService, LoginParams, AuthResult } from '../services/authService';
import { ROLE_DEFAULT_ROUTES } from '../data/demoAccounts';

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (params: LoginParams) => Promise<AuthResult>;
  logout: () => void;
  canAccess: (path: string) => boolean;
  getDefaultRoute: () => AppRoute;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize session from storage
  useEffect(() => {
    try {
      const activeUser = AuthService.getCurrentUser();
      if (activeUser) {
        setUser(activeUser);
      }
    } catch (err) {
      console.error('Failed to load session:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (params: LoginParams): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const result = await AuthService.login(params);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
  }, []);

  const canAccess = useCallback(
    (path: string) => {
      return AuthService.isAuthorized(user?.role, path);
    },
    [user?.role]
  );

  const getDefaultRoute = useCallback((): AppRoute => {
    if (user?.role && ROLE_DEFAULT_ROUTES[user.role]) {
      return ROLE_DEFAULT_ROUTES[user.role];
    }
    return '/login';
  }, [user?.role]);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        canAccess,
        getDefaultRoute,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
