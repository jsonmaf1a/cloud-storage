import { HttpStatus } from "../constants/http";
import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { CreateUserDtoSchema, UserSchema, UpdateUserDtoSchema } from "../schemas";

const c = initContract();

export const UsersContract = c.router(
    {
        create: {
            method: "POST",
            path: "/",
            body: CreateUserDtoSchema,
            responses: {
                [HttpStatus.OK]: UserSchema,
            },
        },
        findAll: {
            method: "GET",
            path: "/",
            query: z.object({
                page: z.number().optional(),
                limit: z.number().optional(),
                sort: z.string().optional(),
            }),
            responses: {
                [HttpStatus.OK]: UserSchema,
            },
        },
        get: {
            method: "GET",
            path: "/:id",
            pathParams: z.object({
                id: z.coerce.number(),
            }),
            responses: {
                [HttpStatus.OK]: UserSchema,
            },
        },
        patch: {
            method: "PATCH",
            path: "/:id",
            pathParams: z.object({
                id: z.coerce.number(),
            }),
            body: UpdateUserDtoSchema,
            responses: {
                [HttpStatus.OK]: UserSchema,
            },
        },
        delete: {
            method: "DELETE",
            path: "/:id",
            pathParams: z.object({
                id: z.coerce.number(),
            }),
            body: z.void(),
            responses: {
                [HttpStatus.NO_CONTENT]: z.void(),
            },
        },
    },
    {
        pathPrefix: "/users",
        baseHeaders: z.object({
            authorization: z.string(),
        }),
    },
);

export type UsersContractType = typeof UsersContract;
