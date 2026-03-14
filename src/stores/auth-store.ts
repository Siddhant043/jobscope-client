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
  /** True after persist has rehydrated from storage; prevents treating initial empty state as logged out. */
  _hasHydrated: boolean;
  setSession: (session: AuthSessionState) => void;
  setAccessToken: (token: string | null) => void;
  setHasHydrated: () => void;
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
      _hasHydrated: false,
      setSession: (session) => set({ ...session, _hasHydrated: true }),
      setAccessToken: (token) =>
        set((currentState) => ({ ...currentState, accessToken: token })),
      setHasHydrated: () => set({ _hasHydrated: true }),
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
      onRehydrateStorage: () => () => {
        requestAnimationFrame(() => {
          useAuthStore.getState().setHasHydrated();
        });
      },
    }
  )
);

