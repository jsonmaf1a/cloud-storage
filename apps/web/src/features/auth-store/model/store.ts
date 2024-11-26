import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AuthState } from "../model/types";
import {
    createAuthActionsSlice,
    createAuthSessionSlice,
    createAuthStatusSlice,
} from "./slices";

export const useAuthStore = create<AuthState>()(
    devtools(
        (...args) => ({
            ...createAuthSessionSlice(...args),
            ...createAuthStatusSlice(...args),
            ...createAuthActionsSlice(...args),
        }),
        { name: "auth" },
    ),
);
