import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_protected/_layout/trash")({
    component: Trash,
});

function Trash() {
    return (
        <div className="flex flex-col">
            Hello /trash!
            <Link to={"/dashboard"}>To dashboard</Link>
            <Link to={"/files"}>To files</Link>
        </div>
    );
}
