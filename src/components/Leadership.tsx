import type { ReactElement } from "react";
import resume from "@/data/resume";

export default function Leadership(): ReactElement {
  return (
    <ul className="flex flex-col gap-4">
      {resume.leadership.map((l) => (
        <li
          key={`${l.org}-${l.period}`}
          className="rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold">{l.org}</h3>
              <p className="mt-1 text-sm text-white/80">{l.role}</p>
            </div>
            <span className="shrink-0 text-xs text-white/60">{l.period}</span>
          </div>
          {l.bullets.length ? (
            <ul className="mt-3 list-disc pl-5 text-sm text-white/80 marker-adaptive">
              {l.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}


