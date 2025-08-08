"use client";
import type { ReactElement } from "react";
import Link from "next/link";
import resume from "@/data/resume";

export default function Projects(): ReactElement {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {resume.projects.map((proj) => (
        <article
          key={`${proj.title}-${proj.period}`}
          className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold">{proj.title}</h3>
              <p className="mt-1 text-xs text-white/70">{proj.tech}</p>
            </div>
            <span className="shrink-0 text-xs text-white/60">{proj.period}</span>
          </div>
          <ul className="mt-3 list-disc pl-5 text-sm text-white/80 marker-adaptive">
            {proj.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="mt-4">
            {proj.title.toLowerCase() === "coming soon" ? (
              <span className="text-xs text-white/60">More details soon</span>
            ) : (
              <Link href={`/projects/${encodeURIComponent(proj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') )}`}
                className="text-xs text-white/80 underline underline-offset-4 hover:text-white">
                View details →
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}


