import { EndpointErrors, ErrorResponse } from "@/shared/types/errors";
import { AppRoute, exhaustiveGuard } from "@ts-rest/core";
import { isFetchError, isUnknownErrorResponse } from "@ts-rest/react-query/v5";
import { isErrorResponse } from "../utils/isErrorResponse";

export function useTsrErrorHandler<T extends AppRoute>(
    contractEndpoint: T,
    errorConfig: EndpointErrors,
) {
    const handleError = (error: ErrorResponse<T>): string => {
        if (isFetchError(error)) {
            return "Connection error. Please check your internet connection.";
        }

        if (isUnknownErrorResponse(error, contractEndpoint)) {
            return "Unexpected error occurred";
        }

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
    };

    return { handleError };
}
