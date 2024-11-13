import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { AuthContract } from "./auth.contract";
import { UsersContract } from "./users.contract";
import { HttpStatus } from "../constants/http";

const c = initContract();

export const ApiContract = c.router(
    {
        auth: AuthContract,
        users: UsersContract,
    },
    {
        pathPrefix: "/api",
        commonResponses: {
            [HttpStatus.NOT_FOUND]: c.type<{
                message: "Not Found";
                reason: string;
            }>(),
            [HttpStatus.INTERNAL_SERVER_ERROR]: c.otherResponse({
                contentType: "text/plain",
                body: z.literal("Server Error"),
            }),
        },
    },
);

export type ApiContract = typeof ApiContract;
