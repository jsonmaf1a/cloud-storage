import { LoginForm } from "@/features/auth-login";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/auth/login")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex flex-row h-full">
            <div className="w-3/5 flex flex-col items-center justify-center">
                <LoginForm />
            </div>
            <div className="w-2/5 bg-yellow-400 bg-auth-pattern" />
        </div>
    );
}
