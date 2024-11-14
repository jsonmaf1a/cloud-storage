import { ErrorBoundary } from "react-error-boundary";
import { RouteConfig, routes } from "./routes";
import { Suspense } from "react";
import { Loader } from "@/shared/components/loader";
import { Protected } from "@/shared/components/protected";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorFallback } from "@/shared/components/error-fallback";

export function Router() {
    // const { isAuthenticated, isLoading, userRoles } = useAuthStore();

    const createRouteElement = (route: RouteConfig) => {
        const Component = route.element;

        return (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Loader />}>
                    {route.protected ? (
                        <Protected>
                            <Component />
                        </Protected>
                    ) : (
                        <Component />
                    )}
                </Suspense>
            </ErrorBoundary>
        );
    };

    const router = createBrowserRouter(
        Object.values(routes).map((route) => ({
            path: route.path,
            element: createRouteElement(route),
        })),
    );

    // if (isLoading) return <Loader />;

    return <RouterProvider router={router} />;
}
