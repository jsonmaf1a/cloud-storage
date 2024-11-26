import { getMe } from "@/entities/user";
import { apiService } from "@/shared/api/services/ApiService";
import { tokenService } from "@/shared/lib/token/TokenService";
import { StateCreator } from "zustand";
import {
    AuthActionsSlice,
    AuthSessionSlice,
    AuthState,
    AuthStatusSlice,
    Session,
} from "../model/types";

export const createAuthSessionSlice: StateCreator<
    AuthState,
    [["zustand/devtools", never]],
    [],
    AuthSessionSlice
> = (set) => ({
    session: null,
    setSession: (session) => set({ session }),
});

export const createAuthStatusSlice: StateCreator<
    AuthState,
    [["zustand/devtools", never]],
    [],
    AuthStatusSlice
> = (set) => ({
    isLoading: false,
    isAuthenticated: false,
    isInitialized: false,
    setStatus: (status) =>
        set((state) => ({
            ...state,
            ...status,
        })),

    setInitialized: (isInitialized) =>
        set(() => ({
            isInitialized,
        })),
});

export const createAuthActionsSlice: StateCreator<
    AuthState,
    [["zustand/devtools", never]],
    [],
    AuthActionsSlice
> = (_set, get) => ({
    actions: {
        initialize: async () => {
            const { isInitialized, setSession, setStatus, setInitialized } = get();

            if (isInitialized) {
                return;
            }

            try {
                setStatus({ isLoading: true });

                const token = tokenService.getStoredToken();
                const tokenExpiration = tokenService.getStoredTokenExpiration();

                // TODO: check token expiration
                if (!token || !tokenExpiration) {
                    setStatus({
                        isAuthenticated: false,
                    });
                    setSession(null);
                    setInitialized(true);
                    return;
                }

                const user = await getMe();

                if (!user) {
                    setStatus({
                        isAuthenticated: false,
                        error: "Failed to fetch user data",
                    });
                    setSession(null);
                    setInitialized(true);
                    return;
                }

                const session: Session = {
                    user,
                    token,
                    tokenExpiration,
                };

                setSession(session);
                setStatus({
                    isAuthenticated: true,
                });
            } catch (error) {
                setStatus({
                    isAuthenticated: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Auth store initialization error",
                });
                setSession(null);
            } finally {
                setStatus({ isLoading: false });
                setInitialized(true);
            }
        },

        login: async (session: Session) => {
            const { setSession, setStatus } = get();

            try {
                setStatus({ isLoading: true });

                tokenService.store(session.token, session.tokenExpiration);

                setSession(session);
                setStatus({
                    isAuthenticated: true,
                });
            } catch (error) {
                console.error(error);
                setStatus({
                    isAuthenticated: false,
                    error: "Login failed",
                });
                setSession(null);
            } finally {
                setStatus({ isLoading: false });
            }
        },

        logout: async () => {
            const { setSession, setStatus } = get();

            try {
                setStatus({ isLoading: true });

                apiService.post({ url: "/api/auth/logout" });

                tokenService.clear();

                setSession(null);
                setStatus({
                    isAuthenticated: false,
                });
            } catch (error) {
                console.error(error);
                setStatus({ error: "Logout failed" });
            } finally {
                setStatus({ isLoading: false });
            }
        },
    },
});
