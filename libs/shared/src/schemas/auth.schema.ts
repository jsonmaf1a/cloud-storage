import { z } from "zod";
import { UserSchema } from "./user.schema";

export const AuthLoginDtoSchema = z
    .object({
        /** @example example@mail.com */
        email: z.string(),
        password: z.string(),
    })
    .passthrough();

export type AuthLoginDto = z.infer<typeof AuthLoginDtoSchema>;

export const AuthRegisterDtoSchema = z
    .object({
        /** @example example@mail.com */
        email: z.string(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    })
    .passthrough();

export type AuthRegisterDto = z.infer<typeof AuthRegisterDtoSchema>;

export const AuthResetPasswordDtoSchema = z
    .object({
        password: z.string(),
        hash: z.string(),
    })
    .passthrough();

export type AuthResetPasswordDto = z.infer<typeof AuthResetPasswordDtoSchema>;

export const AuthUpdateDtoSchema = z
    .object({
        /** @example example@mail.com */
        email: z.string().nullable(),
        /** @example John */
        firstName: z.string().nullable(),
        /** @example Doe */
        lastName: z.string().nullable(),
        avatarUrl: z.string(),
        password: z.string(),
        oldPassword: z.string(),
    })
    .passthrough()
    .optional();

export type AuthUpdateDto = z.infer<typeof AuthUpdateDtoSchema>;

export const AuthLoginResponseDtoSchema = z
    .object({
        token: z.string(),
        refreshToken: z.string(),
        tokenExpires: z.number(),
        user: UserSchema,
    })
    .passthrough();

export type AuthLoginResponseDto = z.infer<typeof AuthLoginResponseDtoSchema>;

export const AuthRefreshResponseDtoSchema = z
    .object({
        token: z.string(),
        refreshToken: z.string(),
        tokenExpires: z.number(),
    })
    .passthrough();

export type AuthRefreshResponseDto = z.infer<
    typeof AuthRefreshResponseDtoSchema
>;

export const AuthConfirmEmailDtoSchema = z.object({
    hash: z.string(),
});

export type AuthConfirmEmailDto = z.infer<typeof AuthConfirmEmailDtoSchema>;

export const AuthForgotPasswordDtoSchema = z.object({
    /** @example example@mail.com */
    email: z.string(),
});

export type AuthForgotPasswordDto = z.infer<typeof AuthForgotPasswordDtoSchema>;
