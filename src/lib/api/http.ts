import { ApiError } from './errors';
import { env } from '../config/env';
import { getAccessToken } from '../auth/storage';
import { refreshSession } from '../auth/refresh';

export type ApiFetchOptions = RequestInit & {
  auth?: boolean;
  retry?: boolean;
};

const parseJson = async (response: Response) => {
  const text = await response.text();
  if (!text) {
    return null;
  }

  return JSON.parse(text);
};

export const apiFetch = async <T>(path: string, options: ApiFetchOptions = {}): Promise<T> => {
  const url = `${env.NEXT_PUBLIC_API_URL}${path}`;
  const headers = new Headers(options.headers ?? {});

  if (options.auth !== false) {
    const token = getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include'
  });

  if (response.status === 401 && options.retry !== false) {
    const refreshed = await refreshSession();
    if (refreshed?.tokens?.accessToken) {
      return apiFetch<T>(path, { ...options, retry: false });
    }
  }

  const data = await parseJson(response);

  if (!response.ok) {
    const message = data?.message ?? response.statusText ?? 'Request failed';
    throw new ApiError(response.status, message, data);
  }

  return data as T;
};
