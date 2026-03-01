import type {
  ApiResponse,
  AuditLog,
  AuthTokens,
  AuthResponse,
  Course,
  CourseListParams,
  EnrollRequest,
  Enrollment,
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ReportsOverview,
  ResetPasswordRequest,
  Role,
  ScholarshipApplyRequest,
  ScholarshipApplication,
  SendOtpRequest,
  UpdateProfileRequest,
  User,
  UserListParams,
  VerifyEmailRequest,
  VerifyOtpRequest
} from '@/types';
import { endpoints } from './endpoints';
import { apiFetch } from './http';

const toQuery = (params?: Record<string, string | number | undefined>) => {
  if (!params) {
    return '';
  }

  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }
    search.set(key, String(value));
  });

  const query = search.toString();
  return query ? `?${query}` : '';
};

const unwrap = <T>(payload: unknown): T => {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as { data: T }).data;
  }

  return payload as T;
};

const normalizeRole = (input: unknown): Role => {
  if (Array.isArray(input)) {
    if (input.includes('ADMIN')) {
      return 'ADMIN';
    }
    if (input.includes('STUDENT')) {
      return 'STUDENT';
    }
  }

  if (typeof input === 'string') {
    if (input === 'ADMIN') {
      return 'ADMIN';
    }
    if (input === 'STUDENT') {
      return 'STUDENT';
    }
  }

  return 'STUDENT';
};

const normalizeUser = (input: Record<string, unknown> | null | undefined): User => ({
  id: input?.id !== undefined && input?.id !== null ? String(input.id) : '',
  email: String(input?.email ?? ''),
  name: String(input?.fullName ?? input?.name ?? ''),
  role: normalizeRole(input?.roles ?? input?.role),
  avatarUrl: input?.avatarUrl ? String(input.avatarUrl) : undefined
});

const normalizeAuthResponse = (payload: unknown): AuthResponse => {
  const raw = unwrap<Record<string, unknown>>(payload);
  const userRaw = (raw?.user as Record<string, unknown>) ?? raw;
  const tokensRaw = raw?.tokens as AuthTokens | undefined;
  const tokens =
    raw?.accessToken || raw?.refreshToken
      ? {
          accessToken: String(raw?.accessToken ?? ''),
          refreshToken: raw?.refreshToken ? String(raw.refreshToken) : undefined
        }
      : tokensRaw;

  return { user: normalizeUser(userRaw), tokens };
};

const buildResponse = <T>(payload: unknown, data: T): ApiResponse<T> => {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return { ...(payload as ApiResponse<T>), data };
  }

  return { success: true, data };
};

export const authApi = {
  register: (payload: RegisterRequest) =>
    apiFetch<ApiResponse<null>>(endpoints.auth.register, {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false
    }),
  verifyEmail: async (payload: VerifyEmailRequest) => {
    const response = await apiFetch<unknown>(endpoints.auth.verifyEmail, {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false
    });
    return buildResponse(response, normalizeAuthResponse(response));
  },
  login: async (payload: LoginRequest) => {
    const response = await apiFetch<unknown>(endpoints.auth.login, {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false
    });
    return buildResponse(response, normalizeAuthResponse(response));
  },
  refresh: async (refreshToken?: string) => {
    const response = await apiFetch<unknown>(endpoints.auth.refresh, {
      method: 'POST',
      body: refreshToken ? JSON.stringify({ refreshToken }) : undefined,
      auth: false
    });
    return buildResponse(response, normalizeAuthResponse(response));
  },
  logout: () =>
    apiFetch<ApiResponse<null>>(endpoints.auth.logout, {
      method: 'POST'
    }),
  sendOtp: (payload: SendOtpRequest) =>
    apiFetch<ApiResponse<null>>(endpoints.auth.sendOtp, {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false
    }),
  verifyOtp: (payload: VerifyOtpRequest) =>
    apiFetch<ApiResponse<null>>(endpoints.auth.verifyOtp, {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false
    }),
  forgotPassword: (payload: ForgotPasswordRequest) =>
    apiFetch<ApiResponse<null>>(endpoints.auth.forgotPassword, {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false
    }),
  resetPassword: (payload: ResetPasswordRequest) =>
    apiFetch<ApiResponse<null>>(endpoints.auth.resetPassword, {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: false
    })
};

export const userApi = {
  me: async () => {
    const response = await apiFetch<unknown>(endpoints.users.me, { method: 'GET' });
    return buildResponse(response, normalizeUser(unwrap(response)));
  },
  updateMe: async (payload: UpdateProfileRequest) => {
    const response = await apiFetch<unknown>(endpoints.users.me, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    return buildResponse(response, normalizeUser(unwrap(response)));
  }
};

export const coursesApi = {
  list: (params?: CourseListParams) =>
    apiFetch<ApiResponse<{ items: Course[] }>>(
      `${endpoints.courses.list}${toQuery({
        query: params?.query,
        page: params?.page,
        size: params?.size,
        level: params?.level
      })}`,
      {
        method: 'GET'
      }
    ),
  detail: (id: string) =>
    apiFetch<ApiResponse<Course>>(endpoints.courses.detail(id), {
      method: 'GET'
    })
};

export const enrollmentsApi = {
  list: () => apiFetch<ApiResponse<Enrollment[]>>(endpoints.enrollments.list, { method: 'GET' }),
  create: (payload: EnrollRequest) =>
    apiFetch<ApiResponse<Enrollment>>(endpoints.enrollments.create, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
};

export const adminApi = {
  createCourse: (payload: Partial<Course>) =>
    apiFetch<ApiResponse<Course>>(endpoints.admin.courses, {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  updateCourse: (id: string, payload: Partial<Course>) =>
    apiFetch<ApiResponse<Course>>(endpoints.admin.courseDetail(id), {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),
  deleteCourse: (id: string) =>
    apiFetch<ApiResponse<null>>(endpoints.admin.courseDetail(id), {
      method: 'DELETE'
    }),
  auditLogs: async () => {
    const response = await apiFetch<unknown>(endpoints.admin.auditLogs, { method: 'GET' });
    const payload = unwrap<unknown>(response);
    const auditLogs = Array.isArray(payload)
      ? payload
      : typeof payload === 'object' && payload !== null
        ? 'items' in payload
          ? ((payload as { items?: AuditLog[] }).items ?? [])
          : 'auditLogs' in payload
            ? ((payload as { auditLogs?: AuditLog[] }).auditLogs ?? [])
            : []
        : [];
    return buildResponse(response, auditLogs);
  },
  usersList: (params?: UserListParams) =>
    apiFetch<ApiResponse<{ items: User[] }>>(
      `${endpoints.admin.usersList}${toQuery({
        query: params?.query,
        page: params?.page,
        size: params?.size
      })}`,
      {
        method: 'GET'
      }
    ),
  userDetail: (id: string) =>
    apiFetch<ApiResponse<User>>(endpoints.admin.userDetail(id), {
      method: 'GET'
    }),
  userUpdate: (id: string, payload: Partial<User>) =>
    apiFetch<ApiResponse<User>>(endpoints.admin.userDetail(id), {
      method: 'PUT',
      body: JSON.stringify(payload)
    }),
  userDelete: (id: string) =>
    apiFetch<ApiResponse<null>>(endpoints.admin.userDetail(id), {
      method: 'DELETE'
    }),
  reportsOverview: () =>
    apiFetch<ApiResponse<ReportsOverview>>(endpoints.admin.reportsOverview, {
      method: 'GET'
    }),
  scholarships: () =>
    apiFetch<ApiResponse<ScholarshipApplication[]>>(endpoints.admin.scholarships, {
      method: 'GET'
    }),
  approveScholarship: (id: string) =>
    apiFetch<ApiResponse<ScholarshipApplication>>(endpoints.admin.scholarshipApprove(id), {
      method: 'POST'
    }),
  rejectScholarship: (id: string) =>
    apiFetch<ApiResponse<ScholarshipApplication>>(endpoints.admin.scholarshipReject(id), {
      method: 'POST'
    })
};

export const scholarshipsApi = {
  apply: (payload: ScholarshipApplyRequest) =>
    apiFetch<ApiResponse<ScholarshipApplication>>(endpoints.scholarships.apply, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
};
