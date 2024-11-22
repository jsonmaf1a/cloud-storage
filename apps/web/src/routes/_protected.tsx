import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/widgets/sidebar";
import { useProtectRoute } from "@/shared/lib/hooks/useProtectRoute";
import { Loader } from "@/shared/components/Loader.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components/ErrorFallback.tsx";
import { Suspense } from "react";

export const Route = createFileRoute("/_protected")({
    component: RouteComponent,
});

function RouteComponent() {
    const { isAuthenticated, isLoading } = useProtectRoute();

    if (isLoading) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        return <Loader />;
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loader />}>
                <div className="flex flex-row divide-x divide-ltgray">
                    <Sidebar />
                    <div className="p-5">
                        <Outlet />
                    </div>
                </div>
            </Suspense>
        </ErrorBoundary>
    );
}
