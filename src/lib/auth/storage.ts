import type { Role } from '@/types';

const ACCESS_TOKEN_KEY = 'cnx_access';
const REFRESH_TOKEN_KEY = 'cnx_refresh';
const SESSION_COOKIE = 'cnx_session';
const ROLE_COOKIE = 'cnx_role';

export type TokenMode = 'cookie' | 'json';

let accessToken: string | null = null;
let refreshToken: string | null = null;

export const tokenMode =
  (process.env.NEXT_PUBLIC_AUTH_TOKEN_MODE as TokenMode | undefined) ?? 'cookie';

const isBrowser = typeof window !== 'undefined';

export const getAccessToken = () => {
  if (accessToken) {
    return accessToken;
  }

  if (isBrowser) {
    const stored = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    if (stored) {
      accessToken = stored;
      return stored;
    }
  }

  return null;
};

export const setAccessToken = (token: string | null) => {
  accessToken = token;

  if (!isBrowser) {
    return;
  }

  if (token) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};

export const getRefreshToken = () => {
  if (refreshToken) {
    return refreshToken;
  }

  if (isBrowser) {
    const stored = sessionStorage.getItem(REFRESH_TOKEN_KEY);
    if (stored) {
      refreshToken = stored;
      return stored;
    }
  }

  return null;
};

export const setRefreshToken = (token: string | null) => {
  refreshToken = token;

  if (!isBrowser) {
    return;
  }

  if (token) {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  } else {
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

const setCookie = (name: string, value: string, maxAgeDays = 30) => {
  if (!isBrowser) {
    return;
  }

  const maxAge = maxAgeDays * 24 * 60 * 60;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
};

const clearCookie = (name: string) => {
  if (!isBrowser) {
    return;
  }

  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
};

export const setSessionIndicator = (role: Role) => {
  setCookie(SESSION_COOKIE, '1');
  setCookie(ROLE_COOKIE, role);
};

export const clearSessionIndicator = () => {
  clearCookie(SESSION_COOKIE);
  clearCookie(ROLE_COOKIE);
};

export const getSessionIndicator = () => {
  if (!isBrowser) {
    return { hasSession: false, role: null as Role | null };
  }

  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  const session = cookies.find((cookie) => cookie.startsWith(`${SESSION_COOKIE}=`));
  const roleCookie = cookies.find((cookie) => cookie.startsWith(`${ROLE_COOKIE}=`));
  const role = roleCookie ? (roleCookie.split('=')[1] as Role) : null;

  return {
    hasSession: Boolean(session),
    role
  };
};
