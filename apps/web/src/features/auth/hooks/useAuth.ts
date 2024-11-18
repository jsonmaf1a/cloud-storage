import { useMemo } from "react";
import { useAuthStore } from "../model/store";
import { authSelectors } from "../model/selectors";

export const useAuthStatus = () => {
    const isLoading = useAuthStore(authSelectors.isLoading);
    const isAuthenticated = useAuthStore(authSelectors.isAuthenticated);
    const error = useAuthStore(authSelectors.error);

    return useMemo(
        () => ({
            isLoading,
            isAuthenticated,
            error,
        }),
        [isLoading, isAuthenticated, error],
    );
};

export const useAuthSession = () => {
    return useAuthStore(authSelectors.session);
};

export const useAuthActions = () => {
    const actions = useAuthStore(authSelectors.actions);

    return useMemo(
        () => ({
            login: actions.login,
            logout: actions.logout,
            initialize: actions.initialize,
        }),
        [actions],
    );
};

export const useAuth = () => {
    const status = useAuthStatus();
    const session = useAuthSession();
    const actions = useAuthActions();

    return useMemo(
        () => ({
            ...status,
            session,
            ...actions,
        }),
        [status, session, actions],
    );
};
