import { Loader } from "@/shared/components/Loader.tsx";
import { useAuthActions, useAuthStatus } from "@/shared/lib/auth-store";
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
