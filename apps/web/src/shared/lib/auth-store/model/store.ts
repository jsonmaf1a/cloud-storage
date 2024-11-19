import { create } from "zustand";
import { AuthState } from "../model/types";
import { devtools } from "zustand/middleware";
import { createAuthActionsSlice, createAuthSessionSlice, createAuthStatusSlice } from "./slices";

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
