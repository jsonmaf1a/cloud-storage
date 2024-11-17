import { z } from "zod";

export const StatusModelSchema = z
    .object({
        id: z.number(),

        /** @example active */
        name: z.string().optional(),
    })
    .passthrough();

export type StatusModel = z.infer<typeof StatusModelSchema>;

export const StatusDtoSchema = z.object({ id: z.number() }).passthrough();

export type StatusDto = z.infer<typeof StatusDtoSchema>;
