import { PageProps } from "@/shared/types/page-props";
import { createLazyFileRoute } from "@tanstack/react-router";

export interface DashboardProps extends PageProps {}

export const Route = createLazyFileRoute("/")({
    component: Dashboard,
});

export function Dashboard() {
    return <div>Dashboard Page</div>;
}
