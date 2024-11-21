import { AppRoute, ClientInferResponses } from "@ts-rest/core";

export type ErrorResponse<T extends AppRoute> = ClientInferResponses<T> | Error | unknown;

export type ErrorConfig = {
    status: number;
    message?: string;
};

export type EndpointErrors = ErrorConfig[];

export interface ErrorHandlerOptions {
    fetchError: string;
    unknownError: string;
}
