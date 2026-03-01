'use client';

import { useQuery } from '@tanstack/react-query';
import type { AuditLog } from '@/types';
import type { ApiError } from '../api/errors';
import { adminApi } from '../api';
import { queryKeys } from '../query/keys';

export type AdminAuditLogsResponse = AuditLog[];

export const useAdminAuditLogsQuery = () =>
  useQuery<AdminAuditLogsResponse, ApiError>({
    queryKey: queryKeys.admin.auditLogs(),
    queryFn: async () => {
      const response = await adminApi.auditLogs();
      return response.data;
    },
    retry: false,
  });
