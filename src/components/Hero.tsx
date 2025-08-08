"use client";
import type { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import resume from "@/data/resume";

export default function Hero(): ReactElement {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(1200px_600px_at_80%_-20%,rgba(141,100,255,0.25),transparent),radial-gradient(1000px_500px_at_-10%_10%,rgba(0,200,255,0.25),transparent)] p-8 sm:p-12 text-left [data-theme=light]:light-surface">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <span>Software Engineer</span>
            <span className="text-white/40">•</span>
            <span>Go, Java, Python</span>
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {resume.name}
          </h1>
          <p className="mt-3 text-white/70">
            Building reliable, high‑impact systems. I craft resilient backend services and thoughtful user experiences.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/Misha_Gusev_Resume.pdf"
              className="btn-strong rounded-full border border-white/15 bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              prefetch={false}
            >
              Download resume
            </Link>
            <Link
              href={resume.github}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors"
            >
              <Image src="/github-mark-white.svg" alt="GitHub" width={16} height={16} className="logo-invert" />
              GitHub
            </Link>
            <Link
              href={resume.linkedin}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors"
            >
              <Image src="/linkedin-svgrepo-com.svg" alt="LinkedIn" width={16} height={16} className="logo-invert" />
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


