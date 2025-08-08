import type { ReactElement } from "react";
import Link from "next/link";

export default function CTA(): ReactElement {
  return (
    <div id="contact" className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(1200px_600px_at_20%_100%,rgba(59,130,246,0.25),transparent),radial-gradient(900px_450px_at_100%_20%,rgba(236,72,153,0.2),transparent)] p-8 sm:p-12 text-center [data-theme=light]:light-surface">
      <h2 className="text-2xl font-semibold">Let’s build something great</h2>
      <p className="mx-auto mt-2 max-w-2xl text-white/70">
        I enjoy backend systems, product-minded engineering, and shipping high-quality features.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="mailto:michaeljgusev@gmail.com"
          className="btn-strong rounded-full border border-white/15 bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90"
        >
          Email me
        </Link>
        <Link
          href="/Misha_Gusev_Resume.pdf"
          className="btn-strong rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
        >
          Download resume
        </Link>
      </div>
    </div>
  );
}


