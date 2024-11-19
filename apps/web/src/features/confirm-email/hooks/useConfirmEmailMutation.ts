import { tsr } from "@/shared/api";
import { QUERY_KEY } from "../config/constants";

export const useConfirmEmailMutation = () => {
    const { mutateAsync, isSuccess, isPending, error } = tsr.auth.confirmEmail.useMutation();
    const tsrQueryClient = tsr.useQueryClient();

    async function confirmEmail(hash: string) {
        mutateAsync(
            { body: { hash } },
            {
                onSuccess: (data) => {
                    tsrQueryClient.setQueryData([QUERY_KEY], {
                        body: data,
                    });
                },
            },
        );
    }

    return { confirmEmail, isSuccess, isPending, error };
};
