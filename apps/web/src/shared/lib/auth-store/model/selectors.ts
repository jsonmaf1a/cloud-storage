import { AuthState } from "../model/types";

export const authSelectors = {
    session: (state: AuthState) => state.session,
    user: (state: AuthState) => state.session?.user,
    isAuthenticated: (state: AuthState) => state.isAuthenticated,
    isLoading: (state: AuthState) => state.isLoading,
    error: (state: AuthState) => state.error,
    actions: (state: AuthState) => state.actions,
    status: (state: AuthState) => ({
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
    }),
};
