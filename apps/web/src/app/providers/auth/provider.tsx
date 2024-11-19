import { useAuthActions, useAuthStatus } from "@/features/auth-store";
import { Loader } from "@/shared/components/loader";
import { PropsWithChildren, useEffect } from "react";

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const { initialize } = useAuthActions();
    const { isLoading, error } = useAuthStatus();

    useEffect(() => {
        initialize();
    }, [initialize]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <>{children}</>;
};
