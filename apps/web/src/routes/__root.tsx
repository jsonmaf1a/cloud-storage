import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <div className="w-svw h-svh">
                <Outlet />
                <ToastContainer />
            </div>

            <ReactQueryDevtools initialIsOpen={false} />
            <TanStackRouterDevtools />
        </React.Fragment>
    );
}
