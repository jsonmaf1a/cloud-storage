import { useNavigate } from "@tanstack/react-router";
import { useLoginMutation } from "./useLoginMutation";
import { useCallback } from "react";
import { AuthLoginDto } from "@cloud/shared";
import { toast } from "react-toastify";
import { useAuthActions } from "@/shared/lib/auth-store";

export const useLogin = () => {
    const { login } = useAuthActions();

    const navigate = useNavigate({ from: location.pathname });
    const { handleLogin, isPending } = useLoginMutation();

    const handleLoginSubmit = useCallback(
        async (credentials: AuthLoginDto) => {
            try {
                const result = await handleLogin(credentials);

                if (!result.success || !result.data) {
                    toast.error("Login failed");
                    console.error("Login error:", result.error);
                    return;
                }

                const { user, token, tokenExpires } = result.data.body;

                await login({ user, token, tokenExpires });
                toast("Login success");
                navigate({ to: "/" });
            } catch (error) {
                toast.error("Unexpected error occurred");
                console.error("Login error:", error);
            }
        },
        [handleLogin, login, navigate],
    );

    return {
        handleLoginSubmit,
        isPending,
    };
};
