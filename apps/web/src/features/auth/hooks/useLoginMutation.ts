import { tsr } from "@/shared/api";
import { AuthLoginDto } from "@cloud/shared";
import { AUTH_QUERY_KEYS } from "../config/constants";

export const useLoginMutation = () => {
    const { mutateAsync, isPending } = tsr.auth.emailLogin.useMutation();
    const tsrQueryClient = tsr.useQueryClient();

    const handleLogin = async (credentials: AuthLoginDto) => {
        try {
            const result = await mutateAsync(
                { body: credentials },
                {
                    onSuccess: (data) => {
                        tsrQueryClient.setQueryData(
                            [AUTH_QUERY_KEYS.LOGIN_QUERY_KEY],
                            {
                                body: data,
                            },
                        );
                    },
                },
            );
            return { success: true, data: result };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: error };
        }
    };

    return { handleLogin, isPending };
};
