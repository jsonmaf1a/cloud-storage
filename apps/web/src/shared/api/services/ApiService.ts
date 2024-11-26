import { ApiContract } from "@cloud/shared";
import { ApiFetcherArgs } from "@ts-rest/core";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { AxiosResponse, isAxiosError, Method } from "axios";
import { axiosInstance } from "../config/axios";
import { tokenService } from "@/shared/lib/token/TokenService";

interface RequestArgs<T> {
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

    private request<T>(method: Method, args: RequestArgs) {
        return this.protectedRequest<T>({
            path: args.url,
            body: method === "GET" || method === "DELETE" ? undefined : args.body,
            headers: args.headers,
            method,
        });
    }

    public get<T>(args: RequestArgs) {
        return this.request<T>("GET", args);
    }

    public post<T>(args: RequestArgs) {
        return this.request<T>("POST", args);
    }

    public put<T>(args: RequestArgs) {
        return this.request<T>("PUT", args);
    }

    public patch<T>(args: RequestArgs) {
        return this.request<T>("PATCH", args);
    }

    public delete<T>(args: RequestArgs) {
        return this.request<T>("DELETE", args);
    }

    private async protectedRequest<T>(args: ApiFetcherArgs | Partial<ApiFetcherArgs>) {
        const { headers, method, body, path } = args;

        const accessToken = tokenService.getStoredToken();

        const updatedHeaders = {
            ...headers,
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        };

        try {
            const result = await axiosInstance.request<T>({
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
