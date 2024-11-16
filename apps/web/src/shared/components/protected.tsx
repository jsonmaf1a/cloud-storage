import { Loader } from "./loader";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./error-fallback";
import { useNavigate } from "@tanstack/react-router";

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function Protected({ children, fallback = <Loader /> }: Props) {
    const navigate = useNavigate({ from: location.pathname });

    // TODO:...
    const isAuthenticated = true;
    const isLoading = false;

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate({
                to: "/auth/login",
                replace: true,
            });
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) return fallback;

    return isAuthenticated ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={fallback}>{children}</Suspense>
        </ErrorBoundary>
    ) : (
        fallback
    );
}
