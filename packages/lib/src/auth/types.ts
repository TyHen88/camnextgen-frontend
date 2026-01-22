import type { AuthTokens, Role, User } from '@camnextgen/types';

export type Session = {
  user: User | null;
  role: Role | null;
  accessToken: string | null;
  tokens?: AuthTokens;
};

export type AuthContextState = {
  user: User | null;
  role: Role | null;
  isLoading: boolean;
};
