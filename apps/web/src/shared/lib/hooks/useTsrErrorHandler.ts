import {
    EndpointErrors,
    ErrorHandlerOptions,
    ErrorResponse,
} from "@/shared/types/errors";
import { AppRoute, exhaustiveGuard } from "@ts-rest/core";
import { isFetchError, isUnknownErrorResponse } from "@ts-rest/react-query/v5";
import { isErrorResponse } from "../utils/isErrorResponse";
import { useCallback } from "react";

const defaultOptions: ErrorHandlerOptions = {
    fetchError: "Connection error. Please check your internet connection.",
    unknownError: "Unexpected error occurred",
};

export function useTsrErrorHandler<T extends AppRoute>(
    contractEndpoint: T,
    errorConfig: EndpointErrors,
    options = defaultOptions,
) {
    const handleError = useCallback(
        (error: ErrorResponse<T>): string => {
            if (isFetchError(error)) return options.fetchError;

            if (isUnknownErrorResponse(error, contractEndpoint))
                return options.unknownError;

            if (isErrorResponse(error)) {
                const errorHandler = errorConfig.find(
                    (handler) => handler.status === error.status,
                );

                if (errorHandler) {
                    return errorHandler.message || error.body;
                }

                return error.body || "An error occurred";
            }

            return exhaustiveGuard(error as never);
        },
        [contractEndpoint, errorConfig, options],
    );

    return { handleError };
}
