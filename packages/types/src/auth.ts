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
  token: string;
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
