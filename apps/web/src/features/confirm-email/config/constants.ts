import { EndpointErrors } from "@/shared/types/errors";

export const QUERY_KEY = "confirmEmail";

export const CONFIRM_EMAIL_ERRORS: EndpointErrors = [
    {
        status: 404,
        message: "Confirmation link expired or already used",
    },
    {
        status: 422,
        message: "Invalid confirmation link",
    },
    {
        status: 500,
        message: "Server error during email confirmation",
    },
];

export const CONFIRMATION_TIMEOUT = 10_000;
