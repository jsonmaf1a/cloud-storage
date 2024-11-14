import { routeTree } from "@/shared/lib/routeTree.gen";
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
            <RouterProvider router={router} />
        </div>
    );
}
