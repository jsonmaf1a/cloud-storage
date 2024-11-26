import { Theme } from "../theme";

export const THEME_CONFIG = {
    STORAGE_KEY: "colorscheme",
    DEFAULT_THEME: "system" as Theme,
    THEME_CLASSES: ["light", "dark"] as const,
} as const;
