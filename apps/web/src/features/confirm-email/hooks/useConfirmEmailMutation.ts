import { tsr } from "@/shared/api";
import { useCallback } from "react";
import { QUERY_KEY } from "../config/constants";

export const useConfirmEmailMutation = () => {
    const { contractEndpoint, mutateAsync, isSuccess, isPending, error } =
        tsr.auth.confirmEmail.useMutation();
    const tsrQueryClient = tsr.useQueryClient();

    const confirmEmail = useCallback(
        async (hash: string) => {
            await mutateAsync(
                { body: { hash } },
                {
                    onSuccess: (data) => {
                        tsrQueryClient.setQueryData([QUERY_KEY], {
                            body: data,
                        });
                    },
                },
            );
        },
        [mutateAsync, tsrQueryClient],
    );

    return { confirmEmail, isSuccess, isPending, error, contractEndpoint };
};
