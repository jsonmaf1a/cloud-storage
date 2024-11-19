import { StateCreator } from "zustand";
import { AuthActionsSlice, AuthSessionSlice, AuthState, AuthStatusSlice, Session } from "../model/types";
import { LocalStorageService } from "@/shared/lib/storage";
import { AuthService } from "./service";
import { JwtUtils } from "@/shared/lib/utils";

const authService = new AuthService(new LocalStorageService());

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
    error: null,
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
> = (set, get) => ({
    actions: {
        initialize: async () => {
            const { isInitialized, setSession, setStatus, setInitialized } = get();

            if (isInitialized) {
                return;
            }

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
                    setInitialized(true);
                    return;
                }

                const userId = JwtUtils.decodeJwtToken(token)?.id;

                // TODO:(refactor): replace with axios
                const user = await fetch(`/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                }).then((res) => res.json());

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
                    error: typeof error === "string" ? error : "Auth store initialization error",
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
