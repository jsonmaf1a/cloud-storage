import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { AuthRegisterDto } from "@cloud/shared";
import { toast } from "react-toastify";
import { useRegisterMutation } from "./useRegisterMutation";
import { useAuthActions } from "@/shared/lib/auth-store";

export const useRegister = () => {
    const { login } = useAuthActions();

    const navigate = useNavigate({ from: location.pathname });
    const { handleRegister, isPending } = useRegisterMutation();

    const handleRegisterSubmit = useCallback(
        async (credentials: AuthRegisterDto) => {
            try {
                const result = await handleRegister(credentials);

                if (!result.success || !result.data) {
                    toast.error("Register failed");
                    console.error("Register error:", result.error);
                    return;
                }

                const { user, token, tokenExpires } = result.data.body;

                await login({ user, token, tokenExpires });

                navigate({ to: "/auth/confirm-email" });
                toast("Register success");
            } catch (error) {
                toast.error("Unexpected error occurred");
                console.error("Register error:", error);
            }
        },
        [handleRegister, login, navigate],
    );

    return {
        handleRegisterSubmit,
        isPending,
    };
};
