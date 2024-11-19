import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/widgets/sidebar";
import { Protected } from "@/shared/components/protected";
import { useProtectRoute } from "@/shared/lib/hooks/use-protect-route";
import { Loader } from "@/shared/components/loader";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components/error-fallback";
import { Suspense } from "react";

export const Route = createFileRoute("/_protected/_layout")({
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
