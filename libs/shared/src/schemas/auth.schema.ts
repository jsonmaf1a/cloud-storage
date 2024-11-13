import { z } from "zod";
import { User } from "./user.schema";

export const AuthLoginDto = z
    .object({
        /** @example example@mail.com */
        email: z.string(),
        password: z.string(),
    })
    .passthrough();

export const AuthRegisterDto = z
    .object({
        /** @example example@mail.com */
        email: z.string(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    })
    .passthrough();

export const AuthResetPasswordDto = z
    .object({
        password: z.string(),
        hash: z.string(),
    })
    .passthrough();

export const AuthUpdateDto = z
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

export const AuthLoginResponseDto = z
    .object({
        token: z.string(),
        refreshToken: z.string(),
        tokenExpires: z.number(),
        user: User,
    })
    .passthrough();

export const AuthRefreshResponseDto = z
    .object({
        token: z.string(),
        refreshToken: z.string(),
        tokenExpires: z.number(),
    })
    .passthrough();

export const AuthConfirmEmailDto = z.object({
    hash: z.string(),
});

export const AuthForgotPasswordDto = z.object({
    /** @example example@mail.com */
    email: z.string(),
});
