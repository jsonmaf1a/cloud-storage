import { useConfirmEmailMutation } from "@/features/confirm-email/";
import { Loader } from "@/shared/components/loader";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

export const Route = createFileRoute("/auth/confirm-email")({
    validateSearch: z.object({
        hash: z.string().optional(),
    }),
    component: RouteComponent,
});

function RouteComponent() {
    const { hash } = Route.useSearch();
    const navigate = useNavigate({ from: "/auth/confirm-email" });
    const { confirmEmail, isSuccess, isPending, error } = useConfirmEmailMutation();

    useEffect(() => {
        if (hash) {
            confirmEmail(hash);
        }
    }, [hash]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Email successfully confirmed");
            navigate({ to: "/", replace: true });
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (error) {
            toast.error("Error confirming your email");
        }
    }, [error]);

    if (isPending) return <Loader />;

    return (
        <div className="text-center p-4">
            {!hash ? "Please check your email and click the confirmation link." : "Confirming your email..."}
        </div>
    );
}
