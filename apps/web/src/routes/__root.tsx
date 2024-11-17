import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <div className="w-svw h-svh">
                <Outlet />
            </div>
            <TanStackRouterDevtools />
        </React.Fragment>
    );
}
