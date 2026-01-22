export const endpoints = {
  auth: {
    register: '/api/v1/auth/register',
    verifyEmail: '/api/v1/auth/verify',
    login: '/api/v1/auth/login',
    refresh: '/api/v1/auth/refresh',
    logout: '/api/v1/auth/logout',
    forgotPassword: '/api/v1/auth/forgot-password',
    resetPassword: '/api/v1/auth/reset-password'
  },
  users: {
    me: '/api/v1/users/me'
  },
  courses: {
    list: '/api/v1/courses',
    detail: (id: string) => `/api/v1/courses/${id}`
  },
  enrollments: {
    list: '/api/v1/enrollments',
    create: '/api/v1/enrollments'
  },
  admin: {
    courses: '/api/v1/admin/courses',
    courseDetail: (id: string) => `/api/v1/admin/courses/${id}`,
    auditLogs: '/api/v1/admin/audit-logs',
    reportsOverview: '/api/v1/admin/reports/overview',
    scholarships: '/api/v1/admin/scholarships',
    scholarshipApprove: (id: string) => `/api/v1/admin/scholarships/${id}/approve`,
    scholarshipReject: (id: string) => `/api/v1/admin/scholarships/${id}/reject`
  },
  scholarships: {
    apply: '/api/v1/scholarships/apply'
  }
};
