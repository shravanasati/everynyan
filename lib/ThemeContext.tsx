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

function twoWeeksFromNow() {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  return date;
}

function setThemeExpiry() {
  localStorage.setItem("themeExpiry", twoWeeksFromNow().toISOString());
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const themeExpiry = localStorage.getItem("themeExpiry");
      if (themeExpiry) {
        const expiryDate = new Date(themeExpiry);
        if (new Date() > expiryDate) {
          localStorage.removeItem("theme");
          localStorage.removeItem("themeExpiry");
        } else {
          setThemeExpiry()
        }
      } else {
        setThemeExpiry()
      }
      return (localStorage.getItem("theme") as Theme) || "theme-solar";
    }
    return "theme-solar";
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
      setThemeExpiry()
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
