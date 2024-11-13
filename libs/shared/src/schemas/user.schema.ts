import { z } from "zod";
import { StatusDto, StatusModel } from "./status.schema";

export const CreateUserDto = z
    .object({
        /** @example example@mail.com */
        email: z.string().nullable(),
        password: z.string().optional(),
        provider: z.string().optional(),
        socialId: z.string().nullable().optional(),
        /** @example John */
        firstName: z.string().nullable(),
        /** @example Doe */
        lastName: z.string().nullable(),
        avatarUrl: z.string().optional(),
        status: StatusModel.optional(),
    })
    .passthrough();

export const User = z
    .object({
        id: z.number(),
        /** @example example@mail.com */
        email: z.string().nullable(),
        /** @example email */
        provider: z.string(),
        /** @example 1234567890 */
        socialId: z.string().nullable().optional(),
        /** @example John */
        firstName: z.string().nullable(),
        /** @example Doe */
        lastName: z.string().nullable(),
        avatarUrl: z.string().optional(),
        status: z
            .object({
                id: z.number(),
                name: z.string().optional(),
            })
            .optional(),
        /** Format: date-time */
        createdAt: z.date(),
        /** Format: date-time */
        updatedAt: z.date(),
        /** Format: date-time */
        deletedAt: z.date().nullable(),
    })
    .passthrough();

export const UpdateUserDto = z
    .object({
        /** @example test1@example.com */
        email: z.string().nullable(),
        password: z.string(),
        provider: z.string(),
        socialId: z.string().nullable(),
        /** @example John */
        firstName: z.string().nullable(),
        /** @example Doe */
        lastName: z.string().nullable(),
        avatarUrl: z.string(),
        status: StatusDto,
    })
    .partial()
    .passthrough();
