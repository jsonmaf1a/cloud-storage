import { tsr } from "@/shared/api";
import { AuthRegisterDto } from "@cloud/shared";
import { AUTH_QUERY_KEYS } from "../config/constants";

export const useRegisterMutation = () => {
    const { mutateAsync, isPending } = tsr.auth.emailRegister.useMutation();
    const tsrQueryClient = tsr.useQueryClient();

    const handleRegister = async (credentials: AuthRegisterDto) => {
        try {
            const result = await mutateAsync(
                { body: credentials },
                {
                    onSuccess: (data) => {
                        tsrQueryClient.setQueryData(
                            [AUTH_QUERY_KEYS.REGISTER_QUERY_KEY],
                            {
                                body: data,
                            },
                        );
                    },
                },
            );
            return { success: true, data: result };
        } catch (error) {
            console.error("Register error:", error);
            return { success: false, error };
        }
    };

    return { handleRegister, isPending };
};
