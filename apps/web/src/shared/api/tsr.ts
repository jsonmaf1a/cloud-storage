import { ApiContract } from "@cloud/shared";
import { QueryClient } from "@tanstack/react-query";

import { initTsrReactQuery } from "@ts-rest/react-query/v5";

export const queryClient = new QueryClient();

export const tsr = initTsrReactQuery(ApiContract, {
    baseUrl: "",
    baseHeaders: {},
});
