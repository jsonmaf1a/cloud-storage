import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { CONFIRM_EMAIL_ERRORS, CONFIRMATION_TIMEOUT } from "../config/constants";
import { useConfirmEmailMutation } from "./useConfirmEmailMutation";
import { useTsrErrorHandler } from "@/shared/hooks";

export function useConfirmEmail(hash: string | undefined) {
    const navigate = useNavigate({ from: "/auth/confirm-email" });
    const { confirmEmail, isPending, isSuccess, error, contractEndpoint } =
        useConfirmEmailMutation();
    const { handleError } = useTsrErrorHandler(contractEndpoint, CONFIRM_EMAIL_ERRORS);

    // biome-ignore lint/correctness/useExhaustiveDependencies: adding isPending to deps causes re-renders
    useEffect(() => {
        if (!hash) return;

        const timeoutId = setTimeout(() => {
            if (isPending) {
                toast.warning(
                    "Confirmation is taking longer than expected. Please try again.",
                );
            }
        }, CONFIRMATION_TIMEOUT);

        confirmEmail(hash);
        return () => clearTimeout(timeoutId);
    }, [hash, confirmEmail]);

    useEffect(() => {
        if (error) {
            toast.error(handleError(error));
        }
    }, [error, handleError]);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Email successfully confirmed");
            navigate({ to: "/", replace: true });
        }
    }, [isSuccess, navigate]);

    return { isPending };
}
