import { createLazyFileRoute, rootRouteId } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/auth/login")({
    component: RouteComponent,
});

function RouteComponent() {
    return "Hello /auth/login!";
}
