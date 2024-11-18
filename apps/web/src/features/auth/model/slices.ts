import { StateCreator } from "zustand";
import {
    AuthActionsSlice,
    AuthSessionSlice,
    AuthState,
    AuthStatusSlice,
    Session,
} from "../types/store";
import { LocalStorageService } from "@/shared/lib/storage";
import { AuthService } from "./service";

const authService = new AuthService(new LocalStorageService());

export const createAuthSessionSlice: StateCreator<
    AuthState,
    [],
    [],
    AuthSessionSlice
> = (set) => ({
    session: null,
    setSession: (session) => set({ session }),
});

export const createAuthStatusSlice: StateCreator<
    AuthState,
    [],
    [],
    AuthStatusSlice
> = (set) => ({
    isLoading: false,
    isAuthenticated: false,
    error: null,
    setStatus: (status) =>
        set((state) => ({
            ...state,
            ...status,
        })),
});

export const createAuthActionsSlice: StateCreator<
    AuthState,
    [],
    [],
    AuthActionsSlice
> = (set, get) => ({
    actions: {
        initialize: async () => {
            const { setSession, setStatus } = get();

            try {
                setStatus({ isLoading: true });

                const token = authService.getStoredToken();
                const tokenExpires = authService.getStoredTokenExpires();

                if (!token || !tokenExpires) {
                    setStatus({
                        isAuthenticated: false,
                        error: null,
                    });
                    setSession(null);
                    return;
                }

                const user = await authService.getUserFromToken(token);

                if (!user) {
                    setStatus({
                        isAuthenticated: false,
                        error: "Failed to fetch user data",
                    });
                    setSession(null);
                    return;
                }

                const session: Session = {
                    user,
                    token,
                    tokenExpires,
                };

                setSession(session);
                setStatus({
                    isAuthenticated: true,
                    error: null,
                });
            } catch (error) {
                setStatus({
                    isAuthenticated: false,
                    error: "Authentication initialization failed",
                });
                setSession(null);
            } finally {
                setStatus({ isLoading: false });
            }
        },

        login: async (session: Session) => {
            const { setSession, setStatus } = get();

            try {
                setStatus({ isLoading: true });

                authService.storeSession(session.token, session.tokenExpires);

                setSession(session);
                setStatus({
                    isAuthenticated: true,
                    error: null,
                });
            } catch (error) {
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

                authService.clearSession();

                setSession(null);
                setStatus({
                    isAuthenticated: false,
                    error: null,
                });
            } catch (error) {
                setStatus({ error: "Logout failed" });
            } finally {
                setStatus({ isLoading: false });
            }
        },
    },
});
