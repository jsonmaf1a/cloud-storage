import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./context";
import { THEME_CONSTANTS } from "./constants";
import { Theme } from "@/shared/types/theme";
import { useMediaQuery } from "../../hooks/use-media-query";

export type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

export function isValidTheme(theme: string): theme is Theme {
    return ["light", "dark", "system"].includes(theme);
}

export function ThemeProvider({
    children,
    defaultTheme = THEME_CONSTANTS.DEFAULT_THEME,
    storageKey = THEME_CONSTANTS.STORAGE_KEY,
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

        for (const className of THEME_CONSTANTS.THEME_CLASSES) {
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
