import { routeTree } from "@/routeTree.gen";
import { ThemeProvider } from "@/shared/lib/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { tsr } from "@/shared/api/tsr";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const queryClient = new QueryClient();

export function App() {
    return (
        <div className="w-svw h-svh">
            <QueryClientProvider client={queryClient}>
                <tsr.ReactQueryProvider>
                    <ThemeProvider>
                        <RouterProvider router={router} />
                    </ThemeProvider>
                </tsr.ReactQueryProvider>
            </QueryClientProvider>
        </div>
    );
}
