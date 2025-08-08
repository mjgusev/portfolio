"use client";
import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";

const PRESETS = [
  { name: "Violet", value: "#8b5cf6" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Magenta", value: "#ec4899" },
  { name: "Blue", value: "#3b82f6" },
];

export default function ThemeMenu(): ReactElement {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState<string>("#8b5cf6");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const ref = useRef<HTMLDivElement | null>(null);
  const [accentMode, setAccentMode] = useState<string>("solid");

  useEffect(() => {
    const a = localStorage.getItem("accent") || accent;
    const t = (localStorage.getItem("theme") as "dark" | "light") || theme;
    const am = localStorage.getItem("accentMode") || "solid";
    document.documentElement.style.setProperty("--accent", a);
    document.documentElement.setAttribute("data-theme", t);
    document.documentElement.setAttribute("data-accent", am);
    setAccent(a);
    setTheme(t);
    setAccentMode(am);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const setAccentValue = (value: string) => {
    setAccent(value);
    document.documentElement.style.setProperty("--accent", value);
    localStorage.setItem("accent", value);
    document.documentElement.setAttribute("data-accent", "solid");
    localStorage.setItem("accentMode", "solid");
    setAccentMode("solid");
  };
  const setThemeValue = (value: "dark" | "light") => {
    setTheme(value);
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("theme", value);
  };

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Theme menu"
        onClick={() => setOpen((v) => !v)}
        className="h-8 w-8 rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur hover:bg-white/20 [data-theme=light]:bg-white [data-theme=light]:hover:bg-white/90 [data-theme=light]:text-black [data-theme=light]:border-black/20 flex items-center justify-center"
      >
        {/* Palette icon: droplet (inherits button text color) */}
        <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M12 2s6 6.2 6 10a6 6 0 1 1-12 0c0-3.8 6-10 6-10z" />
        </svg>
      </button>
      <div
        className={`absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-white/10 bg-black/70 p-3 text-sm text-white/80 backdrop-blur transition-all [data-theme=light]:bg-white [data-theme=light]:text-black ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
        role="menu"
      >
        {/* Mode toggles moved to navbar ThemeToggle */}
        <div>
          <div className="text-xs text-white/60">Accent</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => setAccentValue(p.value)}
                aria-label={p.name}
                className={`theme-swatch h-6 w-6 rounded-full border border-white/20 ${accentMode === 'solid' && accent === p.value ? "selected" : ""}`}
                style={{ background: p.value }}
              />
            ))}
            <button
              onClick={() => {
                document.documentElement.setAttribute("data-accent", "rainbow");
                localStorage.setItem("accentMode", "rainbow");
                setAccentMode("rainbow");
              }}
              aria-label="Rainbow"
              title="Rainbow"
              className={`theme-swatch h-6 w-6 rounded-full border border-white/20 ${accentMode === 'rainbow' ? 'selected' : ''}`}
              style={{ background: "conic-gradient(from 0deg, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6, #ec4899, #ef4444)" }}
            />
            <button
              onClick={() => {
                const all = PRESETS.map((p) => p.value);
                const includeRainbow = Math.random() < 0.25; // 25% chance to pick rainbow
                if (includeRainbow) {
                  document.documentElement.setAttribute("data-accent", "rainbow");
                  localStorage.setItem("accentMode", "rainbow");
                  setAccentMode("rainbow");
                } else {
                  const value = all[Math.floor(Math.random() * all.length)];
                  setAccentValue(value);
                }
              }}
              aria-label="Random"
              title="Random"
              className="theme-swatch h-6 w-6 rounded-full border border-white/20 flex items-center justify-center"
            >
              {/* Random (asterisk) icon */}
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-white [data-theme=light]:stroke-black" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v18M3 12h18M5 5l14 14M19 5L5 19"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


