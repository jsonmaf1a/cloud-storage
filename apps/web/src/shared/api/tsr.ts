import { ApiContract } from "@cloud/shared";

import { initTsrReactQuery } from "@ts-rest/react-query/v5";

export const tsr = initTsrReactQuery(ApiContract, {
    baseUrl: "",
    baseHeaders: {},
});
