"use client";
import type { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";

const PRESETS = [
  { name: "Violet", value: "#8b5cf6" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Magenta", value: "#ec4899" },
];

export default function ThemePanel(): ReactElement {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState<string>("#8b5cf6");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const a = localStorage.getItem("accent") || accent;
    const t = (localStorage.getItem("theme") as "dark" | "light") || theme;
    document.documentElement.style.setProperty("--accent", a);
    document.documentElement.setAttribute("data-theme", t);
    setAccent(a);
    setTheme(t);
  }, []);

  const setAccentValue = (value: string) => {
    setAccent(value);
    document.documentElement.style.setProperty("--accent", value);
    localStorage.setItem("accent", value);
  };

  const setThemeValue = (value: "dark" | "light") => {
    setTheme(value);
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem("theme", value);
  };

  const previewGradient = useMemo(
    () => ({
      background:
        `radial-gradient(800px 400px at 10% -10%, color-mix(in oklab, ${accent} 25%, transparent), transparent),` +
        `radial-gradient(800px 400px at 100% 10%, color-mix(in oklab, ${accent} 15%, transparent), transparent),` +
        `radial-gradient(1000px 500px at 50% 120%, color-mix(in oklab, #ec4899 10%, transparent), transparent)`,
    }),
    [accent]
  );

  return (
    <div className="hidden">
      {open && (
        <div className="mt-2 w-80 rounded-2xl border border-white/10 bg-black/70 p-4 text-sm text-white/80 backdrop-blur" role="dialog" aria-label="Theme panel">
          <div className="mb-3">
            <div className="text-xs text-white/60">Mode</div>
            <div className="mt-1 flex gap-2">
              {(["dark", "light"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setThemeValue(t)}
                  className={`rounded-full border border-white/20 px-3 py-1 ${theme === t ? "bg-white/20" : "bg-white/10"}`}
                >
                  {t === "dark" ? "Dark" : "Light"}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-xs text-white/60">Accent</div>
            <div className="mt-1 flex gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setAccentValue(p.value)}
                  aria-label={p.name}
                  className="h-6 w-6 rounded-full border border-white/20"
                  style={{ background: p.value, outline: accent === p.value ? "2px solid white" : undefined }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-2">
            <div className="h-16 rounded-lg" style={previewGradient} />
          </div>
        </div>
      )}
    </div>
  );
}


