import { routeTree } from "@/routeTree.gen";
import { ThemeProvider } from "@/shared/lib/theme";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./providers/auth/provider";
import { queryClient, tsr } from "@/shared/api";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/shared/components/ErrorFallback";
import { QueryClientProvider } from "@tanstack/react-query";

const router = createRouter({ routeTree });

export function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AuthProvider>
                <ThemeProvider>
                    <QueryClientProvider client={queryClient}>
                        <tsr.ReactQueryProvider>
                            <RouterProvider router={router} />
                        </tsr.ReactQueryProvider>
                    </QueryClientProvider>
                </ThemeProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
