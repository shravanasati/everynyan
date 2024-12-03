"use client";

import React from "react";
import { useTheme, Theme } from "@/lib/ThemeContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette } from "lucide-react";

const themes: Theme[] = [
  "theme-solar",
  "theme-azure",
  "theme-cosmo",
  "theme-flare",
  "theme-scarlet",
  "theme-aqua",
  "theme-blush",
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const formatThemeName = (themeName: string) =>
    themeName.replace("theme-", "").charAt(0).toUpperCase() +
    themeName.replace("theme-", "").slice(1);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary/15 hover:border-primary transition-colors duration-200 hover:text-primary text-primary/80"
          aria-label="Open theme switcher"
        >
          <Palette className="size-5 hover:text-primary" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a Theme</DialogTitle>
        </DialogHeader>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger className="w-48">
            <SelectValue>{formatThemeName(theme)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {themes.map((themeOption) => (
              <SelectItem key={themeOption} value={themeOption}>
                {formatThemeName(themeOption)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </DialogContent>
    </Dialog>
  );
}
