import { tsr } from "@/shared/api";
import { QUERY_KEY } from "../config/constants";

export const userApi = {
    getById: (params: { id: number; token: string }) =>
        tsr.users.get.useQuery({
            queryKey: [QUERY_KEY],
            queryData: {
                params: { id: params.id },
                headers: { authorization: params.token },
            },
        }),
};
