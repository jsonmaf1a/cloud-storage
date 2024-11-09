export const AuthProviders = {
    Email: "email",
    Google: "google",
    Github: "github",
} as const;

export type AuthProviders = keyof typeof AuthProviders;
