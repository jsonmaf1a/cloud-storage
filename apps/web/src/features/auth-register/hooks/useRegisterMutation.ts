import { tsr } from "@/shared/api";
import { AuthRegisterDto } from "@cloud/shared";
import { QUERY_KEY } from "../config/constants";

export const useRegisterMutation = () => {
    const { mutateAsync, isPending } = tsr.auth.emailRegister.useMutation();
    const tsrQueryClient = tsr.useQueryClient();

    const handleRegister = async (credentials: AuthRegisterDto) => {
        try {
            const result = await mutateAsync(
                { body: credentials },
                {
                    onSuccess: (data) => {
                        tsrQueryClient.setQueryData([QUERY_KEY], {
                            body: data,
                        });
                    },
                },
            );
            return { success: true, data: result };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error };
        }
    };

    return { handleRegister, isPending };
};
