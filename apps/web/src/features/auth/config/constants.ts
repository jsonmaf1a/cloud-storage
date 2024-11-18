export const AUTH_QUERY_KEYS = {
    LOGIN_QUERY_KEY: "emailLogin",
    REGISTER_QUERY_KEY: "emailRegister",
} as const;

export const AUTH_STORAGE_KEYS = {
    TOKEN: "auth_token",
    TOKEN_EXPIRES: "auth_token_expires",
} as const;
