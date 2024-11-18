import { useAuthStore } from "@/features/auth/model/store";
import { PropsWithChildren, useEffect } from "react";

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const { actions } = useAuthStore();

    useEffect(() => {
        actions.initialize();
    }, []);

    return children;
};
