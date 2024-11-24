import { routeTree } from "@/routeTree.gen";
import { ThemeProvider } from "@/shared/lib/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./providers/auth/provider";
import { queryClient, tsr } from "@/shared/api";

const router = createRouter({ routeTree });

export function App() {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <tsr.ReactQueryProvider>
                    <AuthProvider>
                        <RouterProvider router={router} />
                    </AuthProvider>
                </tsr.ReactQueryProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
