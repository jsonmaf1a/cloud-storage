import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_protected/_layout/")({
    component: Dashboard,
});

function Dashboard() {
    return (
        <div className="flex flex-col">
            Dashboard page
            <Link to={"/files"}>To files</Link>
            <Link to={"/trash"}>To dashboard</Link>
        </div>
    );
}
