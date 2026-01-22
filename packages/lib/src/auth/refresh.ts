import type { ApiResponse, AuthResponse } from '@camnextgen/types';
import { endpoints } from '../api/endpoints';
import { env } from '../config/env';
import { setSession } from './session';
import { getRefreshToken, getSessionIndicator, tokenMode } from './storage';

let refreshPromise: Promise<AuthResponse | null> | null = null;

export const refreshSession = async () => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const indicator = getSessionIndicator();
    const refreshToken = getRefreshToken();

    if (tokenMode === 'json' && !refreshToken) {
      return null;
    }

    if (!indicator.hasSession && !refreshToken) {
      return null;
    }

    const body = refreshToken ? JSON.stringify({ refreshToken }) : undefined;

    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${endpoints.auth.refresh}`, {
      method: 'POST',
      credentials: 'include',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as ApiResponse<AuthResponse>;

    if (data?.data) {
      setSession({ user: data.data.user, tokens: data.data.tokens });
      return data.data;
    }

    return null;
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
};
