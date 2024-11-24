import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuthStatus } from "../auth-store";

export function useProtectRoute() {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuthStatus();

    console.log(isAuthenticated);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate({ to: "/auth/login", replace: true });
        }
    }, [isAuthenticated, isLoading, navigate]);

    return { isAuthenticated, isLoading };
}
