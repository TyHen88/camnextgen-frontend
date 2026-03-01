import type { AuthTokens, MenuCode, Role, User } from '@/types';
import { clearSessionIndicator, setAccessToken, setRefreshToken, setSessionIndicator } from './storage';

export type SessionState = {
  user: User | null;
  role: Role | null;
  accessToken: string | null;
  menus: Set<MenuCode>;
};

let sessionState: SessionState = {
  user: null,
  role: null,
  accessToken: null,
  menus: new Set()
};

export const getSession = () => sessionState;

export const setSession = (payload: { user?: User; tokens?: AuthTokens; menus?: MenuCode[] }) => {
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

  if (payload.menus) {
    sessionState.menus = new Set(payload.menus);
  }

  if (sessionState.role) {
    setSessionIndicator(sessionState.role);
  }
};

export const clearSession = () => {
  sessionState = { user: null, role: null, accessToken: null, menus: new Set() };
  setAccessToken(null);
  setRefreshToken(null);
  clearSessionIndicator();
};
