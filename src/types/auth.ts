export type Role = 'ADMIN' | 'STUDENT';

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
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
};

export type AuthResponse = {
  user: User;
  tokens?: AuthTokens;
};
