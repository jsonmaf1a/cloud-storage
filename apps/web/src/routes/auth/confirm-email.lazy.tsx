import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/auth/confirm-email")({
    component: RouteComponent,
});

function RouteComponent() {
    return "Hello /auth/confirm-email!";
}
