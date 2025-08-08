"use client";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

const IDS = ["education", "skills", "experience", "projects", "leadership", "contact"] as const;
type SectionId = typeof IDS[number];

export default function ScrollSpy(): ReactElement {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const sections = IDS.map((id) => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: "-40% 0% -55% 0%", threshold: [0, 1] }
    );
    sections.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]');
    links.forEach((link) => {
      const hash = link.getAttribute("href")?.slice(1);
      if (hash && active === hash) link.classList.add("text-white");
      else link.classList.remove("text-white");
    });
  }, [active]);

  return <></>;
}


