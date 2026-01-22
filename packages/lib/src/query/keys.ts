export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const
  },
  courses: {
    list: (params?: Record<string, unknown>) => ['courses', params ?? {}] as const,
    detail: (id: string) => ['courses', id] as const
  },
  enrollments: {
    list: ['enrollments'] as const
  },
  admin: {
    auditLogs: (filters?: Record<string, unknown>) => ['admin', 'audit-logs', filters ?? {}] as const,
    reportsOverview: ['admin', 'reports', 'overview'] as const,
    scholarships: ['admin', 'scholarships'] as const
  }
};
