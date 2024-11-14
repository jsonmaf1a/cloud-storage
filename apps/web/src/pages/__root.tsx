import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Sidebar } from "@/widgets/sidebar";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <div className="flex flex-row">
                <Sidebar />
                <Outlet />
            </div>
        </React.Fragment>
    );
}
