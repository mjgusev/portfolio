import type { ReactElement } from "react";
import resume from "@/data/resume";

function Pill({ label }: { label: string }): ReactElement {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      {label}
    </span>
  );
}

export default function Skills(): ReactElement {
  const groups: Array<[string, string[]]> = [
    ["Languages", resume.skills.languages],
    ["Frameworks", resume.skills.frameworks],
    ["Tools", resume.skills.tools],
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {groups.map(([title, items]) => (
        <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-medium text-white/80">{title}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {items.map((s) => (
              <Pill key={s} label={s} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


