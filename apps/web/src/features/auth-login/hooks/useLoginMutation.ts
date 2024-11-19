import { tsr } from "@/shared/api";
import { AuthLoginDto } from "@cloud/shared";
import { LOGIN_QUERY_KEY } from "../config/constants";

export const useLoginMutation = () => {
    const { mutateAsync, isPending } = tsr.auth.emailLogin.useMutation();
    const tsrQueryClient = tsr.useQueryClient();

    const handleLogin = async (credentials: AuthLoginDto) => {
        try {
            const result = await mutateAsync(
                { body: credentials },
                {
                    onSuccess: (data) => {
                        tsrQueryClient.setQueryData([LOGIN_QUERY_KEY], {
                            body: data,
                        });
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
