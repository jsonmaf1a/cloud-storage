import { ApiContract } from "@cloud/shared";
import { ApiFetcherArgs } from "@ts-rest/core";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { AxiosResponse, isAxiosError, Method } from "axios";
import { axiosInstance } from "../config/axios";
import { AUTH_STORAGE_KEYS } from "@/shared/constants";

interface RequestArgs {
    url: string;
    headers?: Record<string, string>;
    // biome-ignore lint/suspicious/noExplicitAny: ...
    body?: any;
}

class ApiService {
    constructor(
        private readonly baseUrl = "",
        private readonly contract = ApiContract,
    ) {}

    private request(method: Method, args: RequestArgs) {
        return this.protectedRequest({
            path: args.url,
            body: method === "GET" || method === "DELETE" ? undefined : args.body,
            headers: args.headers,
            method,
        });
    }

    public get(args: RequestArgs) {
        return this.request("GET", args);
    }

    public post(args: RequestArgs) {
        return this.request("POST", args);
    }

    public put(args: RequestArgs) {
        return this.request("PUT", args);
    }

    public patch(args: RequestArgs) {
        return this.request("PATCH", args);
    }

    public delete(args: RequestArgs) {
        return this.request("DELETE", args);
    }

    private async protectedRequest(args: ApiFetcherArgs | Partial<ApiFetcherArgs>) {
        const { headers, method, body, path } = args;

        const accessToken = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);

        const updatedHeaders = {
            ...headers,
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        };

        try {
            const result = await axiosInstance.request({
                method: method as Method,
                url: path,
                headers: {
                    ...updatedHeaders,
                },
                data: body,
            });

            return {
                status: result.status,
                body: result.data,
                headers: new Headers(JSON.parse(JSON.stringify(result.headers))),
            };
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                const response = error.response as AxiosResponse;
                return {
                    status: response.status,
                    body: response.data,
                    headers: new Headers(JSON.parse(JSON.stringify(response.headers))),
                };
            }

            throw error;
        }
    }

    public getTsrInstance() {
        return initTsrReactQuery(this.contract, {
            baseUrl: this.baseUrl,
            api: this.protectedRequest.bind(this),
        });
    }
}

export const apiService = new ApiService();
export const tsr = apiService.getTsrInstance();
