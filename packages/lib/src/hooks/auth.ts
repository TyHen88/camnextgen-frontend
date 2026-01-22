'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  VerifyEmailRequest,
} from '@camnextgen/types';
import { authApi, userApi } from '../api';
import { queryKeys } from '../query/keys';
import { useAuth } from '../auth/provider';
import type { ApiError } from '../api/errors';
import { toast } from 'sonner';

export const useLoginMutation = (options?: { onSuccess?: (payload: AuthResponse) => void }) => {
  const { login } = useAuth();

  return useMutation<AuthResponse, ApiError, LoginRequest>({
    mutationFn: async (payload) => {
      const response = await authApi.login(payload);
      return response.data;
    },
    onSuccess: (payload) => {
      login(payload);
      if (options?.onSuccess) {
        toast.success('Login successful');
        window.setTimeout(() => {
          options.onSuccess?.(payload);
        }, 1000);
      }
    },
  });
};

export const useRegisterMutation = (options?: { onSuccess?: () => void }) => {
  return useMutation<void, ApiError, RegisterRequest>({
    mutationFn: async (payload) => {
      await authApi.register(payload);
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
  });
};

export const useVerifyEmailMutation = (options?: {
  onSuccess?: (payload: AuthResponse | null) => void;
}) => {
  const { login } = useAuth();

  return useMutation<AuthResponse | null, ApiError, VerifyEmailRequest>({
    mutationFn: async (payload) => {
      const response = await authApi.verifyEmail(payload);
      return response.data ?? null;
    },
    onSuccess: (payload) => {
      if (payload) {
        login(payload);
      }
      options?.onSuccess?.(payload);
    },
  });
};

export const useMeQuery = () =>
  useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      const response = await userApi.me();
      return response.data;
    },
  });
