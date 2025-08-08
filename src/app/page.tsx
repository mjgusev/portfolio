import type { ReactElement } from "react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Leadership from "@/components/Leadership";
import Education from "@/components/Education";
import CTA from "@/components/CTA";

export default function Home(): ReactElement {
  return (
    <div className="min-h-svh px-6 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-5xl">
        <Hero />

        <div className="mt-10 grid gap-10">
          <Section id="education" title="Education" subtitle="The Ohio State University">
            <Education />
          </Section>

          <Section id="skills" title="Skills" subtitle="Languages, frameworks, and tools">
            <Skills />
          </Section>

          <Section id="experience" title="Experience" subtitle="Impactful internships and teaching">
            <Experience />
          </Section>

          <Section id="projects" title="Projects" subtitle="Selected work">
            <Projects />
          </Section>

          <Section id="leadership" title="Leadership" subtitle="Clubs and initiatives">
            <Leadership />
          </Section>

          <CTA />

          <footer className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-sm text-white/70">
            © {new Date().getFullYear()} Misha Gusev • Built with Next.js and Tailwind
          </footer>
        </div>
      </div>
    </div>
  );
}
