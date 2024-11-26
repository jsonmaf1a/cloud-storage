import { User } from "@/entities/user";
import { useAuthActions } from "@/features/auth-store";
import { AuthRegisterDto } from "@cloud/shared";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useRegisterMutation } from "./useRegisterMutation";

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

                const { user, token, tokenExpiration } = result.data.body;

                const localUser = User.fromApiResponse(user);

                await login({ user: localUser, token, tokenExpiration });

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
