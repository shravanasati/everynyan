"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

export type Theme =
  | "theme-solar"
  | "theme-azure"
  | "theme-cosmo"
  | "theme-flare"
  | "theme-scarlet"
  | "theme-aqua"
  | "theme-blush";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "theme-solar";
    }
    return "theme-solar";
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
      document.documentElement.className = theme;
    } catch (error) {
      console.error("Failed to set theme:", error);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
