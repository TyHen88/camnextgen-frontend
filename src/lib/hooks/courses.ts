'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import type { CourseListParams, EnrollRequest } from '@/types';
import { coursesApi, enrollmentsApi } from '../api';
import { queryKeys } from '../query/keys';
import type { ApiError } from '../api/errors';

export const useCoursesQuery = (params?: CourseListParams) =>
  useQuery({
    queryKey: queryKeys.courses.list(params),
    queryFn: async () => {
      const response = await coursesApi.list(params);
      return response.data;
    }
  });

export const useCourseQuery = (id: string) =>
  useQuery({
    queryKey: queryKeys.courses.detail(id),
    queryFn: async () => {
      const response = await coursesApi.detail(id);
      return response.data;
    }
  });

export const useEnrollMutation = (options?: { onSuccess?: () => void }) =>
  useMutation<void, ApiError, EnrollRequest>({
    mutationFn: async (payload) => {
      await enrollmentsApi.create(payload);
    },
    onSuccess: () => {
      options?.onSuccess?.();
    }
  });
