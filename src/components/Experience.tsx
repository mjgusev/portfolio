"use client";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import Collapsible from "@/components/Collapsible";
import Image from "next/image";
import resume from "@/data/resume";

type ExperienceItem = (typeof resume.experiences)[number];

function extractMostRecentYear(period: string): number {
  const years = Array.from(period.matchAll(/(20\d{2})/g)).map((m) => parseInt(m[1]!, 10));
  return years.length ? Math.max(...years) : 0;
}

function sortByMostRecentDesc(a: ExperienceItem, b: ExperienceItem): number {
  return extractMostRecentYear(b.period) - extractMostRecentYear(a.period);
}

export default function Experience(): ReactElement {
  const companyToItems = new Map<string, ExperienceItem[]>();
  for (const exp of resume.experiences) {
    const arr = companyToItems.get(exp.company) ?? [];
    arr.push(exp);
    companyToItems.set(exp.company, arr);
  }

  for (const [key, arr] of companyToItems) {
    companyToItems.set(key, [...arr].sort(sortByMostRecentDesc));
  }

  const groups = Array.from(companyToItems.entries()).sort(([, a], [, b]) =>
    sortByMostRecentDesc(a[0]!, b[0]!)
  );

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 hidden w-px timeline-line sm:block" />
      <ul className="flex flex-col gap-10">
        {groups.map(([company, items]) => {
          const primary = items[0]!;
          return (
            <li key={`${company}-${primary.period}`} className="relative pl-10 sm:pl-14">
              <div className="absolute left-4 top-2 hidden h-2 w-2 -translate-x-1/2 rounded-full dot-adaptive sm:block" />
              {(() => {
                const isFeatured = company.includes("Uber Freight") || company.includes("Ohio State");
                const logoSize = isFeatured ? 28 : 20;
                const titleClass = isFeatured ? "text-xl sm:text-2xl" : "text-lg";
                return (
                  <div className="flex items-center gap-3">
                    {primary.logo ? (
                      <Image
                        src={primary.logo}
                        alt={`${company} logo`}
                        width={logoSize}
                        height={logoSize}
                        className={`${company.includes("Ohio State") ? "" : "logo-invert"} opacity-95`}
                      />
                    ) : null}
                    <h3 className={`${titleClass} font-semibold tracking-tight`}>{company}</h3>
                  </div>
                );
              })()}

              <div className="mt-4 flex flex-col gap-6">
                {items.map((it, idx) => (
                  <RoleBlock key={`${company}-${idx}`} company={company} period={it.period} role={it.role} location={it.location} bullets={it.bullets} />
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function RoleBlock({ company, period, role, location, bullets }: { company: string; period: string; role: string; location: string; bullets: string[] }): ReactElement {
  const storageKey = `exp-open-${company}-${role}`;
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) setExpanded(stored === "1");
    } catch {}
  }, [storageKey]);
  const setAndPersist = (next: boolean) => {
    setExpanded(next);
    try { sessionStorage.setItem(storageKey, next ? "1" : "0"); } catch {}
  };
  const preview = bullets.slice(0, 2);
  const remaining = bullets.slice(2);
  const hasMore = remaining.length > 0;
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <button
          type="button"
          onClick={() => setAndPersist(!expanded)}
          className="group -ml-1 inline-flex items-center gap-1.5 rounded px-1 py-0.5 text-left"
          aria-expanded={expanded}
        >
          <span className="text-sm font-medium text-white/90">{role}</span>
          {hasMore && (
            <span
              className={`text-base leading-none transition-transform duration-200 ${expanded ? "rotate-180" : "rotate-0"}`}
              aria-hidden
            >
              ▾
            </span>
          )}
        </button>
        <p className="mt-0.5 text-xs text-white/60">{location}</p>
        {/* Preview bullets always visible */}
        <ul className="mt-2 list-disc pl-5 text-sm text-white/80 marker-adaptive">
          {preview.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        {/* Remaining bullets animated */}
        {hasMore && (
          <Collapsible isOpen={expanded}>
            <ul className="mt-1 list-disc pl-5 text-sm text-white/80 marker-adaptive">
              {remaining.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </Collapsible>
        )}
        {hasMore && (
          <button
            onClick={() => setAndPersist(!expanded)}
            className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
          >
            <span>{expanded ? "Show less" : "Show more"}</span>
            <span
              className={`text-sm transition-transform duration-200 ${expanded ? "-rotate-90" : "rotate-90"}`}
              aria-hidden
            >
              ❯
            </span>
          </button>
        )}
      </div>
      <span className="shrink-0 text-xs text-white/60">{period}</span>
    </div>
  );
}


