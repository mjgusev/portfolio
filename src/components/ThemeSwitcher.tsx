"use client";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

const PRESETS = [
  { name: "Violet", value: "#8b5cf6" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Magenta", value: "#ec4899" },
];

export default function ThemeSwitcher(): ReactElement {
  const [accent, setAccent] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const stored = localStorage.getItem("accent");
    if (stored) document.documentElement.style.setProperty("--accent", stored);
    setAccent(stored);
    const storedTheme = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    document.documentElement.setAttribute("data-theme", storedTheme);
    setTheme(storedTheme);
  }, []);

  const apply = (value: string) => {
    document.documentElement.style.setProperty("--accent", value);
    localStorage.setItem("accent", value);
    setAccent(value);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <div className="flex items-center gap-2" title="Theme & accent">
      <button
        onClick={toggleTheme}
        className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/80 hover:bg-white/20"
      >
        {theme === "dark" ? "Dark" : "Light"}
      </button>
      {PRESETS.map((p) => (
        <button
          key={p.value}
          aria-label={`Set accent ${p.name}`}
          onClick={() => apply(p.value)}
          className="h-6 w-6 rounded-full border border-white/20"
          style={{ background: p.value, outline: accent === p.value ? "2px solid white" : undefined }}
        />
      ))}
    </div>
  );
}


