import { routeTree } from "@/routeTree.gen";
import { ThemeProvider } from "@/shared/lib/theme";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

export function App() {
    return (
        <div className="w-svw h-svh">
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </div>
    );
}
