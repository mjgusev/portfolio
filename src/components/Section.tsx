import type { PropsWithChildren, ReactElement } from "react";
import Reveal from "@/components/Reveal";

type SectionProps = PropsWithChildren<{
  id?: string;
  title: string;
  subtitle?: string;
}>;

export default function Section({ id, title, subtitle, children }: SectionProps): ReactElement {
  return (
    <section id={id} className="relative">
      <Reveal>
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-white/60">{subtitle}</p>
          ) : null}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          {children}
        </div>
      </Reveal>
    </section>
  );
}


