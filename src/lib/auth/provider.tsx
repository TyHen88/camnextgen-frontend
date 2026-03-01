'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthResponse, Role, User } from '@/types';
import { authApi, userApi } from '../api';
import { refreshSession } from './refresh';
import { clearSession, getSession, setSession } from './session';
import { getAccessToken, getRefreshToken, getSessionIndicator } from './storage';

export type AuthContextValue = {
  user: User | null;
  role: Role | null;
  isLoading: boolean;
  login: (payload: AuthResponse) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(getSession().user);
  const [role, setRole] = useState<Role | null>(getSession().role);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const indicator = getSessionIndicator();
    const storedAccessToken = getAccessToken();
    const storedRefreshToken = getRefreshToken();
    if (!indicator.hasSession && !storedAccessToken && !storedRefreshToken) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const hydrate = async () => {
      try {
        const response = await userApi.me();
        if (!isMounted) {
          return;
        }
        setSession({ user: response.data });
        setUser(response.data);
        setRole(response.data.role);
      } catch (error) {
        const refreshed = await refreshSession();
        if (refreshed) {
          try {
            const response = await userApi.me();
            if (!isMounted) {
              return;
            }
            setSession({ user: response.data });
            setUser(response.data);
            setRole(response.data.role);
            return;
          } catch (refreshError) {
            // fall through to clear session + redirect
          }
        }

        clearSession();
        if (isMounted) {
          setUser(null);
          setRole(null);
          // Check URL to decide where to redirect
          if (window.location.pathname.startsWith('/admin')) {
            router.replace('/admin/auth/login');
          } else {
            router.replace('/auth/login');
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    hydrate();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const login = (payload: AuthResponse) => {
    setSession({ user: payload.user, tokens: payload.tokens });
    setUser(payload.user);
    setRole(payload.user.role);
    setIsLoading(false);
  };

  const logout = async () => {
    const currentRole = role;

    try {
      await authApi.logout();
    } catch (error) {
      // ignore logout errors
    } finally {
      clearSession();
      setUser(null);
      setRole(null);
      setIsLoading(false);

      if (currentRole === 'ADMIN') {
        router.replace('/admin/auth/login');
      } else {
        router.replace('/auth/login');
      }
    }
  };

  const value = useMemo(
    () => ({
      user,
      role,
      isLoading,
      login,
      logout
    }),
    [user, role, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
