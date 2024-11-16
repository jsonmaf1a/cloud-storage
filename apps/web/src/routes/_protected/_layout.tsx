import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/widgets/sidebar";
import { Protected } from "@/shared/components/protected";

export const Route = createFileRoute("/_protected/_layout")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <Protected>
            <div className="flex flex-row divide-x divide-ltgray">
                <Sidebar />
                <div className="p-5">
                    <Outlet />
                </div>
            </div>
        </Protected>
    );
}
