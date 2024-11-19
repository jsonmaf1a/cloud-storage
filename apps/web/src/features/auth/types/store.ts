import { Nullable, User } from "@cloud/shared";

export interface Session {
    user: User;
    token: string;
    tokenExpires: number;
}

export interface AuthSessionSlice {
    session: Nullable<Session>;
    setSession: (session: Nullable<Session>) => void;
}

export interface AuthStatusSlice {
    isLoading: boolean;
    isAuthenticated: boolean;
    isInitialized: boolean;
    error: Nullable<string>;
    setStatus: (status: Partial<AuthStatus>) => void;
    setInitialized: (state: boolean) => void;
}

export interface AuthActionsSlice {
    actions: {
        initialize: () => Promise<void>;
        login: (session: Session) => Promise<void>;
        logout: () => Promise<void>;
    };
}

export type AuthStatus = Pick<
    AuthStatusSlice,
    "isLoading" | "isAuthenticated" | "error"
>;

export type AuthState = AuthSessionSlice & AuthStatusSlice & AuthActionsSlice;
