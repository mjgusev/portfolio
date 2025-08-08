"use client";
import type { ReactElement } from "react";
import { useEffect, useMemo, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useCallback } from "react";

type Item = { label: string; href: string };
const ITEMS: Item[] = [
  { label: "Go to Education", href: "/#education" },
  { label: "Go to Skills", href: "/#skills" },
  { label: "Go to Experience", href: "/#experience" },
  { label: "Go to Projects", href: "/#projects" },
  { label: "Go to Leadership", href: "/#leadership" },
  { label: "Contact", href: "/#contact" },
  { label: "Download resume", href: "/Misha_Gusev_Resume.pdf" },
  { label: "GitHub", href: "https://github.com/mjgusev" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/misha-gusev/" },
];

export default function CommandPalette(): ReactElement {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<number>(0);
  const listRef = useRef<HTMLUListElement | null>(null);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return ITEMS;
    return ITEMS.filter((it) => it.label.toLowerCase().includes(qq));
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      if ((isMac && e.metaKey && e.key.toLowerCase() === "k") || (!isMac && e.ctrlKey && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        // Toggle on chord; ignore auto-repeat to prevent instant close
        if (e.repeat) return;
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
      if (open) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setIndex((i) => Math.min(i + 1, filtered.length - 1));
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setIndex((i) => Math.max(i - 1, 0));
        }
        if (e.key === "Enter" && filtered[index]) {
          e.preventDefault();
          const href = filtered[index].href;
          if (href.startsWith("#")) {
            document.querySelector(href)?.dispatchEvent(new MouseEvent("click"));
            window.location.hash = href;
          } else {
            window.location.href = href;
          }
          setOpen(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, filtered]);

  // filtered defined above

  useEffect(() => setIndex(0), [q, open]);
  useEffect(() => {
    if (!listRef.current) return;
    const nodeList = listRef.current.querySelectorAll<HTMLAnchorElement>("a[data-item]");
    const el = nodeList[index];
    el?.scrollIntoView({ block: "nearest" });
  }, [index, filtered]);

  const onBackdrop = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setOpen(false);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-cmd-open", open ? "1" : "0");
    return () => document.documentElement.setAttribute("data-cmd-open", "0");
  }, [open]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!open || !mounted) return <></>;
  return createPortal(
    (
      <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-24">
        <div onClick={onBackdrop} className="fixed inset-0 bg-black/50 [data-theme=light]:bg-black/30" aria-hidden />
        <div
          className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-black/70 p-2 backdrop-blur [data-theme=light]:bg-white/90"
          role="dialog"
          aria-modal="true"
          aria-labelledby="command-palette-title"
        >
          <h2 id="command-palette-title" className="sr-only">Command palette</h2>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command or search…"
            className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-sm placeholder:text-white/40 focus:outline-none [data-theme=light]:bg-white/80 [data-theme=light]:placeholder:text-black/40"
          />
          <ul ref={listRef} className="mt-2 max-h-72 overflow-auto">
            {filtered.map((it, i) => (
              <li key={it.label} className="rounded-lg">
                <Link
                  href={it.href}
                  data-item
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 [data-theme=light]:text-black/80 [data-theme=light]:hover:bg-black/10 ${i === index ? "bg-white/10 [data-theme=light]:bg-black/10" : ""}`}
                >
                  {it.label}
                </Link>
              </li>
            ))}
            {!filtered.length && (
              <li className="px-3 py-4 text-center text-sm text-white/50">No results</li>
            )}
          </ul>
          <div className="mt-2 flex items-center justify-between px-2 pb-1 text-xs text-white/40">
            <span>Press Esc to close</span>
            <span>⌘K / Ctrl-K</span>
          </div>
        </div>
      </div>
    ),
    document.body
  );
}


