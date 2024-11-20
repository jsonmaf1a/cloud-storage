import { useConfirmEmail } from "@/features/confirm-email";
import { Loader } from "@/shared/components/Loader.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/auth/confirm-email")({
    validateSearch: z.object({
        hash: z.string().optional(),
    }),
    component: RouteComponent,
});

function RouteComponent() {
    const { hash } = Route.useSearch();
    const { isPending } = useConfirmEmail(hash);

    if (isPending) return <Loader />;

    return <div className="text-center p-4">Confirming your email...</div>;
}
