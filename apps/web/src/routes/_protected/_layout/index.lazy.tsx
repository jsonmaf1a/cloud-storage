import { useAuthActions } from "@/features/auth";
import { Button } from "@/shared/components/ui/button";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_protected/_layout/")({
    component: Dashboard,
});

function Dashboard() {
    const { logout } = useAuthActions();

    return (
        <div className="flex flex-col">
            Dashboard page
            <Button onClick={() => logout()}>Logout</Button>
        </div>
    );
}
