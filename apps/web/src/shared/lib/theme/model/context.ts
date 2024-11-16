import { createContext } from "react";
import { Theme } from "@/shared/types/theme";

export interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const initialState: ThemeState = {
    theme: "system",
    setTheme: () => null,
};

export const ThemeContext = createContext<ThemeState>(initialState);
