import { Button } from "@/shared/components/ui/Button.tsx";
import { useAuthActions, useAuthSession } from "@/shared/lib/auth-store";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_protected/")({
    component: Dashboard,
});

function Dashboard() {
    const { logout } = useAuthActions();
    const session = useAuthSession();

    const user = session?.user;

    return (
        <div className="flex flex-col">
            {user && <p>Hello, {user.firstName}</p>}
            Dashboard page
            <Button onClick={() => logout()}>Logout</Button>
        </div>
    );
}
