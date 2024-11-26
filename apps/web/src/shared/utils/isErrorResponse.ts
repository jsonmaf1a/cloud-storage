import { AppRoute, ClientInferResponses } from "@ts-rest/core";

export function isErrorResponse<T extends AppRoute>(
    error: unknown,
): error is ClientInferResponses<T> {
    return typeof error === "object" && error !== null && "status" in error;
}
