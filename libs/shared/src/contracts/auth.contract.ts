import { initContract } from "@ts-rest/core";
import { z } from "zod";
import {
    AuthConfirmEmailDtoSchema,
    AuthForgotPasswordDtoSchema,
    AuthLoginDtoSchema,
    AuthRegisterDtoSchema,
    AuthResetPasswordDtoSchema,
    AuthUpdateDtoSchema,
    AuthLoginResponseDtoSchema,
    AuthRefreshResponseDtoSchema,
} from "../schemas";
import { UserSchema } from "../schemas";
import { HttpStatus } from "../constants";

const c = initContract();

export const AuthContract = c.router(
    {
        confirmNewEmail: {
            method: "POST",
            path: "/email/confirm/new",
            responses: {
                [HttpStatus.NO_CONTENT]: z.void(),
                [HttpStatus.UNPROCESSABLE_ENTITY]: z.string(),
                [HttpStatus.NOT_FOUND]: z.string(),
                [HttpStatus.INTERNAL_SERVER_ERROR]: z.string(),
            },
            body: AuthConfirmEmailDtoSchema,
            summary: "Confirm new email",
        },
        confirmEmail: {
            method: "POST",
            path: "/email/confirm",
            responses: {
                [HttpStatus.NO_CONTENT]: z.void(),
                [HttpStatus.UNPROCESSABLE_ENTITY]: z.string(),
                [HttpStatus.NOT_FOUND]: z.string(),
                [HttpStatus.INTERNAL_SERVER_ERROR]: z.string(),
            },
            body: AuthConfirmEmailDtoSchema,
            summary: "Confirm email",
        },
        emailLogin: {
            method: "POST",
            path: "/email/login",
            responses: {
                [HttpStatus.OK]: AuthLoginResponseDtoSchema,
            },
            body: AuthLoginDtoSchema,
            summary: "Login with email",
        },
        emailRegister: {
            method: "POST",
            path: "/email/register",
            responses: {
                [HttpStatus.CREATED]: AuthLoginResponseDtoSchema,
            },
            body: AuthRegisterDtoSchema,
            summary: "Register with email",
        },
        resetPassword: {
            method: "POST",
            path: "/reset/password",
            responses: {
                [HttpStatus.NO_CONTENT]: z.void(),
            },
            body: AuthResetPasswordDtoSchema,
            summary: "Reset password",
        },
        forgotPassword: {
            method: "POST",
            path: "/forgot/password",
            responses: {
                [HttpStatus.NO_CONTENT]: z.void(),
            },
            body: AuthForgotPasswordDtoSchema,
            summary: "Forgot password",
        },
        logout: {
            method: "POST",
            path: "/logout",
            responses: {
                [HttpStatus.NO_CONTENT]: z.void(),
            },
            body: z.void(),
            summary: "Forgot password",
        },
        me: {
            method: "GET",
            path: "/me",
            responses: {
                [HttpStatus.OK]: UserSchema,
                // [HttpStatus.NOT_FOUND]: z.object({
                //     code: z.string(),
                //     message: z.string(),
                // }),
            },
        },
        updateMe: {
            method: "PATCH",
            path: "/me",
            body: AuthUpdateDtoSchema,
            responses: {
                [HttpStatus.OK]: UserSchema,
                // [HttpStatus.NOT_FOUND]: z.object({
                //     code: z.string(),
                //     message: z.string(),
                // }),
            },
        },
        deleteMe: {
            method: "DELETE",
            path: "/me",
            responses: {
                [HttpStatus.NO_CONTENT]: z.void(),
            },
        },
        refresh: {
            method: "POST",
            path: "/refresh",
            body: z.void(),
            responses: {
                [HttpStatus.OK]: AuthRefreshResponseDtoSchema,
            },
        },
    },
    {
        pathPrefix: "/auth",
    },
);

export type AuthContractType = typeof AuthContract;
