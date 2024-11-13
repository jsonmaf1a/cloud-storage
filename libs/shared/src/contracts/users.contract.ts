import { HttpStatus } from "../constants/http";
import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { CreateUserDto, User } from "../schemas/user.schema";
import { UpdateUserDto } from "../schemas/user.schema";

const c = initContract();

export const UsersContract = c.router(
    {
        create: {
            method: "POST",
            path: "/",
            body: CreateUserDto,
            responses: {
                [HttpStatus.OK]: User,
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
                [HttpStatus.OK]: User,
            },
        },
        get: {
            method: "GET",
            path: "/:id",
            pathParams: z.object({
                id: z.coerce.number(),
            }),
            responses: {
                [HttpStatus.OK]: User,
            },
        },
        patch: {
            method: "PATCH",
            path: "/:id",
            pathParams: z.object({
                id: z.coerce.number(),
            }),
            body: UpdateUserDto,
            responses: {
                [HttpStatus.OK]: User,
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

export type UsersContract = typeof UsersContract;
