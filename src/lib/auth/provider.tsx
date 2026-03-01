'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthResponse, MenuCode, Role, User } from '@/types';
import { authApi, userApi } from '../api';
import { refreshSession } from './refresh';
import { clearSession, getSession, setSession } from './session';
import { getAccessToken, getRefreshToken, getSessionIndicator } from './storage';

export type AuthContextValue = {
  user: User | null;
  role: Role | null;
  menus: Set<MenuCode>;
  isLoading: boolean;
  login: (payload: AuthResponse) => Promise<void>;
  logout: () => Promise<void>;
  hasMenu: (code: MenuCode) => boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(getSession().user);
  const [role, setRole] = useState<Role | null>(getSession().role);
  const [menus, setMenus] = useState<Set<MenuCode>>(getSession().menus);
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

    const hydrateView = async (userRes: any, menuRes: any) => {
      const userPayload = userRes.data;
      const menuCodes = menuRes.data.map((m: any) => m.code);
      setSession({ user: userPayload, menus: menuCodes });
      if (isMounted) {
        setUser(userPayload);
        setRole(userPayload.role);
        setMenus(new Set(menuCodes));
      }
    };

    const hydrate = async () => {
      try {
        const [userRes, menuRes] = await Promise.all([
          userApi.me(),
          authApi.getMenus()
        ]);
        if (!isMounted) return;
        await hydrateView(userRes, menuRes);
      } catch (error) {
        const refreshed = await refreshSession();
        if (refreshed) {
          try {
            const [userRes, menuRes] = await Promise.all([
              userApi.me(),
              authApi.getMenus()
            ]);
            if (!isMounted) return;
            await hydrateView(userRes, menuRes);
            return;
          } catch (refreshError) {
            // fall through
          }
        }

        clearSession();
        if (isMounted) {
          setUser(null);
          setRole(null);
          setMenus(new Set());
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

  const login = async (payload: AuthResponse) => {
    setSession({ user: payload.user, tokens: payload.tokens });
    setUser(payload.user);
    setRole(payload.user.role);

    try {
      const menuRes = await authApi.getMenus();
      const menuCodes = menuRes.data.map((m) => m.code);
      setSession({ menus: menuCodes });
      setMenus(new Set(menuCodes));
    } catch (error) {
      console.error('Failed to fetch menus after login', error);
      setMenus(new Set());
    }

    setIsLoading(false);
  };

  const logout = async () => {
    const currentRole = role;
    try {
      await authApi.logout();
    } catch (error) {
      // ignore
    } finally {
      clearSession();
      setUser(null);
      setRole(null);
      setMenus(new Set());
      setIsLoading(false);

      if (currentRole === 'ADMIN') {
        router.replace('/admin/auth/login');
      } else {
        router.replace('/auth/login');
      }
    }
  };

  const hasMenu = (code: MenuCode) => menus.has(code);

  const value = useMemo(
    () => ({
      user,
      role,
      menus,
      isLoading,
      login,
      logout,
      hasMenu
    }),
    [user, role, menus, isLoading]
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
