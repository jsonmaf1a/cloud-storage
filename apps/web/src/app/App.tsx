import { routeTree } from "@/routeTree.gen";
import { queryClient, tsr } from "@/shared/api/tsr";
import { ThemeProvider } from "@/shared/lib/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./providers/auth/provider";

const router = createRouter({ routeTree });

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <tsr.ReactQueryProvider>
                <AuthProvider>
                    <ThemeProvider>
                        <RouterProvider router={router} />
                    </ThemeProvider>
                </AuthProvider>
            </tsr.ReactQueryProvider>
        </QueryClientProvider>
    );
}

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
