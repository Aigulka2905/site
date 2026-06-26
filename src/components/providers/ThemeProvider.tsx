"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
  toggle: () => {},
});

/**
 * Runtime dark/light theme. The actual class is applied pre-paint by the inline
 * script in the root layout (no flash); this provider mirrors that state into
 * React and persists changes. Tailwind tokens re-skin via `html.light` in
 * globals.css, so toggling a single class restyles the whole UI.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  // Sync with whatever the no-flash script already decided.
  useEffect(() => {
    setThemeState(
      document.documentElement.classList.contains("light") ? "light" : "dark",
    );
  }, []);

  const setTheme = useCallback((t: Theme) => {
    const html = document.documentElement;
    html.classList.toggle("light", t === "light");
    html.style.colorScheme = t;
    try {
      localStorage.setItem("theme", t);
    } catch {
      /* private mode — ignore */
    }
    setThemeState(t);
  }, []);

  const toggle = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme],
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

/** Inline, render-blocking script that applies the saved theme before paint. */
export const themeNoFlashScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){var e=document.documentElement;e.classList.add('light');e.style.colorScheme='light';}}catch(e){}})();`;
