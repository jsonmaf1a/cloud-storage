import { Theme } from "@/shared/types/theme";

export const THEME_CONSTANTS = {
    STORAGE_KEY: "colorscheme",
    DEFAULT_THEME: "system" as Theme,
    THEME_CLASSES: ["light", "dark"] as const,
} as const;
