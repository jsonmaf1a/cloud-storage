import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_protected/_layout/settings")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello /_protected/_layout/settings!</div>;
}
