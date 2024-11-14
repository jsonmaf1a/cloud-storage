import { useNavigate } from "react-router-dom";
import { Loader } from "./loader";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./error-fallback";

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function Protected({ children, fallback = <Loader /> }: Props) {
    const navigate = useNavigate();

    // TODO:...
    const isAuthenticated = false;
    const isLoading = false;

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/auth", {
                replace: true,
                state: { from: location.pathname },
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
