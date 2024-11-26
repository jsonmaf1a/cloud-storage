import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./context";
import { ReactNode } from "@tanstack/react-router";
import { Theme } from "../theme";
import { THEME_CONFIG } from "../config/constants";
import { useMediaQuery } from "@/shared/hooks";

export type ThemeProviderProps = {
    children: ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

export function isValidTheme(theme: string): theme is Theme {
    return ["light", "dark", "system"].includes(theme);
}

export function ThemeProvider({
    children,
    defaultTheme = THEME_CONFIG.DEFAULT_THEME,
    storageKey = THEME_CONFIG.STORAGE_KEY,
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(() => {
        try {
            const stored = localStorage.getItem(storageKey);
            return stored && isValidTheme(stored) ? stored : defaultTheme;
        } catch {
            return defaultTheme;
        }
    });

    const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
    const systemTheme = prefersDark ? "dark" : "light";

    const setTheme = useCallback(
        (newTheme: Theme) => {
            try {
                localStorage.setItem(storageKey, newTheme);
                setThemeState(newTheme);
            } catch (error) {
                console.error("Failed to set theme: ", error);
            }
        },
        [storageKey],
    );

    useEffect(() => {
        const root = window.document.documentElement;
        const activeTheme = theme === "system" ? systemTheme : theme;

        for (const className of THEME_CONFIG.THEME_CLASSES) {
            root.classList.remove(className);
        }

        root.classList.add(activeTheme);
    }, [theme, systemTheme]);

    const value = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme, setTheme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
