import type { ReactElement } from "react";
import resume from "@/data/resume";

export default function Education(): ReactElement {
  const edu = resume.education ?? [];
  return (
    <ul className="flex flex-col gap-4">
      {edu.map((e) => (
        <li key={`${e.school}-${e.period}`} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold">{e.school}</h3>
              <p className="mt-1 text-sm text-white/80">{e.degree}</p>
              <p className="mt-1 text-xs text-white/60">{e.location}</p>
            </div>
            <div className="text-right">
              <span className="block text-xs text-white/60">{e.period}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}


