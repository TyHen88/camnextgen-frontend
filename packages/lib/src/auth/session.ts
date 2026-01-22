import type { AuthTokens, Role, User } from '@camnextgen/types';
import { clearSessionIndicator, setAccessToken, setRefreshToken, setSessionIndicator } from './storage';

export type SessionState = {
  user: User | null;
  role: Role | null;
  accessToken: string | null;
};

let sessionState: SessionState = {
  user: null,
  role: null,
  accessToken: null
};

export const getSession = () => sessionState;

export const setSession = (payload: { user?: User; tokens?: AuthTokens }) => {
  if (payload.user) {
    sessionState.user = payload.user;
    sessionState.role = payload.user.role;
  }

  if (payload.tokens?.accessToken) {
    sessionState.accessToken = payload.tokens.accessToken;
    setAccessToken(payload.tokens.accessToken);
  }

  if (payload.tokens?.refreshToken) {
    setRefreshToken(payload.tokens.refreshToken);
  }

  if (sessionState.role) {
    setSessionIndicator(sessionState.role);
  }
};

export const clearSession = () => {
  sessionState = { user: null, role: null, accessToken: null };
  setAccessToken(null);
  setRefreshToken(null);
  clearSessionIndicator();
};
