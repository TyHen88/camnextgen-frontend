export const ROUTES = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    verify: '/auth/verify',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset'
  },
  admin: {
    dashboard: '/admin/dashboard',
    courses: '/admin/courses',
    users: '/admin/users',
    auditLogs: '/admin/audit-logs',
    auth: {
      login: '/admin/auth/login',
    }
  },
  student: {
    home: '/home',
    catalog: '/catalog',
    learningPaths: '/learning-paths',
    assessments: '/assessments'
  }
};
