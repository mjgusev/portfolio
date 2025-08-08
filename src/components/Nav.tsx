"use client";
import type { ReactElement } from "react";
import Link from "next/link";
import CommandPalette from "@/components/CommandPalette";
import ScrollSpy from "@/components/ScrollSpy";
import ThemeMenu from "@/components/ThemeMenu";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/#education", label: "Education" },
  { href: "/#skills", label: "Skills" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#leadership", label: "Leadership" },
];

export default function Nav(): ReactElement {
  return (
    <div className="nav-container sticky top-0 z-40 mb-6 pt-4 backdrop-blur transition-opacity">
      <nav className="mx-auto max-w-5xl rounded-full border border-white/10 bg-black/40 px-5 py-3 text-sm text-white/80 [data-theme=light]:light-surface">
        <ul className="flex flex-wrap items-center gap-4">
          <li className="font-semibold text-white">
            <Link href="/" className="hover:opacity-90">MG</Link>
          </li>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-white/90 [data-theme=light]:hover:text-black">
                {l.label}
              </Link>
            </li>
          ))}
          <li className="ml-auto flex items-center gap-3 pl-2">
            <ThemeToggle />
            <ThemeMenu />
            <Link
              href="#contact"
              className="rounded-full border border-white/15 bg-white text-black px-4 py-2 font-medium hover:bg-white/90"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <CommandPalette />
      <ScrollSpy />
    </div>
  );
}


