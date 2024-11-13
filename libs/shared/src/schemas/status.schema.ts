import { z } from "zod";

export const StatusModel = z
    .object({
        id: z.number(),

        /** @example active */
        name: z.string().optional(),
    })
    .passthrough();

export const StatusDto = z.object({ id: z.number() }).passthrough();
