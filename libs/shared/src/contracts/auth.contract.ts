import { initContract } from "@ts-rest/core";
import { z } from "zod";
import {
    AuthConfirmEmailDto,
    AuthForgotPasswordDto,
    AuthLoginDto,
    AuthRegisterDto,
    AuthResetPasswordDto,
    AuthUpdateDto,
    AuthLoginResponseDto,
    AuthRefreshResponseDto,
} from "../schemas/auth.schema";
import { User } from "../schemas/user.schema";
import { HttpStatus } from "../constants/http";

const c = initContract();

export const AuthContract = c.router(
    {
        confirmNewEmail: {
            method: "POST",
            path: "/email/confirm/new",
            responses: {
                [HttpStatus.NO_CONTENT]: z.void(),
                // [HttpStatus.UNPROCESSABLE_ENTITY]: z.string(),
                // [HttpStatus.NOT_FOUND]: z.string(),
            },
            body: AuthConfirmEmailDto,
            summary: "Confirm new email",
        },
        confirmEmail: {
            method: "POST",
            path: "/email/confirm",
            responses: {
                [HttpStatus.NO_CONTENT]: z.void(),
                // [HttpStatus.UNPROCESSABLE_ENTITY]: z.string(),
                // [HttpStatus.NOT_FOUND]: z.string(),
            },
            body: AuthConfirmEmailDto,
            summary: "Confirm email",
        },
        emailLogin: {
            method: "POST",
            path: "/email/login",
            responses: {
                [HttpStatus.OK]: AuthLoginResponseDto,
            },
            body: AuthLoginDto,
            summary: "Login with email",
        },
        emailRegister: {
            method: "POST",
            path: "/email/register",
            responses: {
                [HttpStatus.CREATED]: z.void(),
            },
            body: AuthRegisterDto,
            summary: "Register with email",
        },
        resetPassword: {
            method: "POST",
            path: "/reset/password",
            responses: {
                [HttpStatus.NO_CONTENT]: z.void(),
            },
            body: AuthResetPasswordDto,
            summary: "Reset password",
        },
        forgotPassword: {
            method: "POST",
            path: "/forgot/password",
            responses: {
                [HttpStatus.NO_CONTENT]: z.void(),
            },
            body: AuthForgotPasswordDto,
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
                [HttpStatus.OK]: User,
                // [HttpStatus.NOT_FOUND]: z.object({
                //     code: z.string(),
                //     message: z.string(),
                // }),
            },
        },
        updateMe: {
            method: "PATCH",
            path: "/me",
            body: AuthUpdateDto,
            responses: {
                [HttpStatus.OK]: User,
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
                [HttpStatus.OK]: AuthRefreshResponseDto,
            },
        },
    },
    {
        pathPrefix: "/auth",
    },
);

export type AuthContractType = typeof AuthContract;
