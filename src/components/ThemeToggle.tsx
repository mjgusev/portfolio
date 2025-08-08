"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to light" : "Switch to dark"}
      className="h-8 w-8 rounded-full border border-white/20 bg-white/10 transition-colors hover:bg-white/20 [data-theme=light]:bg-black/5 [data-theme=light]:hover:bg-black/10 flex items-center justify-center"
    >
      {theme === "dark" ? (
        // Moon (outline)
        <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 stroke-white/90" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun (rays)
        <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 stroke-black/80" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4 12H2m20 0h-2M5.64 5.64 4.22 4.22m15.56 15.56-1.42-1.42M18.36 5.64l1.42-1.42M4.22 19.78l1.42-1.42" />
        </svg>
      )}
    </button>
  );
}


