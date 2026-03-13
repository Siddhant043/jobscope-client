import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "#/types/user";

const AUTH_STORAGE_KEY = "jobscope-auth-session";

export interface AuthSessionState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticating: boolean;
  authError: string | null;
}

interface AuthStoreState extends AuthSessionState {
  setSession: (session: AuthSessionState) => void;
  setAccessToken: (token: string | null) => void;
  startAuthenticating: () => void;
  finishAuthenticating: () => void;
  setAuthError: (message: string | null) => void;
  clearSession: () => void;
}

const initialSessionState: AuthSessionState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticating: false,
  authError: null,
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      ...initialSessionState,
      setSession: (session) => set({ ...session }),
      setAccessToken: (token) =>
        set((currentState) => ({ ...currentState, accessToken: token })),
      startAuthenticating: () =>
        set((currentState) => ({ ...currentState, isAuthenticating: true, authError: null })),
      finishAuthenticating: () =>
        set((currentState) => ({ ...currentState, isAuthenticating: false })),
      setAuthError: (message) =>
        set((currentState) => ({ ...currentState, authError: message })),
      clearSession: () => set(initialSessionState),
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);

