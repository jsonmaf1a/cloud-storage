import { useAuthActions, useAuthSession, useAuthStatus } from "@/features/auth-store";
import { Loader } from "@/shared/components/Loader.tsx";
import { PropsWithChildren, Suspense, useEffect } from "react";

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const { initialize } = useAuthActions();
    const { isLoading, error } = useAuthStatus();
    const session = useAuthSession();

    useEffect(() => {
        if (!session && !isLoading) {
            initialize();
        }
    }, [initialize, session, isLoading]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        throw new Error(error);
    }

    return <Suspense fallback={<Loader />}>{children}</Suspense>;
};
