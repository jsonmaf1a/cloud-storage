import { Loader } from "@/shared/components/Loader.tsx";
import { useAuthActions, useAuthSession, useAuthStatus } from "@/shared/lib/auth-store";
import { PropsWithChildren, useEffect } from "react";

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const { initialize } = useAuthActions();
    const { isLoading, error } = useAuthStatus();
    const session = useAuthSession();

    useEffect(() => {
        if (session === null) {
            initialize();
        }
    }, [initialize, session]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <>{children}</>;
};
