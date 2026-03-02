export type Role = 'ADMIN' | 'STUDENT' | 'INSTRUCTOR';

export type MenuCode = 
  | 'MENU_HOME'
  | 'MENU_CATALOG'
  | 'MENU_ENROLLMENTS'
  | 'MENU_PROGRESS'
  | 'MENU_LEARNING_PATHS'
  | 'MENU_ASSESSMENTS'
  | 'MENU_ASSIGNMENTS'
  | 'MENU_COMMUNITY'
  | 'MENU_EVENTS'
  | 'MENU_CAREER'
  | 'MENU_NOTIFICATIONS'
  | 'MENU_PROFILE'
  | 'MENU_SETTINGS';

export type MenuPermission = {
  code: MenuCode;
  name: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  bio?: string;
  telegramEnabled?: boolean;
  emailNotificationsEnabled?: boolean;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

export type OtpPurpose = 'EMAIL_VERIFICATION' | 'PASSWORD_RESET' | 'LOGIN_2FA';

export type SendOtpRequest = {
  email: string;
  purpose: OtpPurpose;
};

export type VerifyOtpRequest = {
  email: string;
  otp: string;
  purpose: OtpPurpose;
};

export type RegisterRequest = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type VerifyEmailRequest = {
  token: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  email: string;
  otp: string;
  newPassword: string;
};

export type UpdateProfileRequest = {
  name?: string;
  avatarUrl?: string;
  bio?: string;
  telegramEnabled?: boolean;
  emailNotificationsEnabled?: boolean;
};

export type AuthResponse = {
  user: User;
  tokens?: AuthTokens;
};
