import type { ReactElement } from "react";
import Link from "next/link";
import resume from "@/data/resume";

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function generateStaticParams(): Array<{ slug: string }> {
  return resume.projects.map((p) => ({ slug: slugify(p.title) }));
}

// Typing quirk workaround for Next 15 app router
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }): Promise<ReactElement> {
  const { slug } = await params;
  const project = resume.projects.find((pr) => slugify(pr.title) === slug);
  if (!project) {
    return (
      <div className="px-6 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-white/80">Project not found.</p>
          <Link href="/" className="mt-4 inline-block underline underline-offset-4">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-[radial-gradient(800px_400px_at_10%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(800px_400px_at_100%_10%,rgba(16,185,129,0.15),transparent),radial-gradient(1000px_500px_at_50%_120%,rgba(236,72,153,0.1),transparent)] px-6 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-white/80 underline underline-offset-4">
          ← Home
        </Link>
        <h1 className="mt-4 text-3xl font-semibold">{project.title}</h1>
        <p className="mt-1 text-white/70">{project.tech}</p>
        <p className="mt-1 text-white/60 text-sm">{project.period}</p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          {project.title.toLowerCase() === "coming soon" ? (
            <p className="text-white/70">This project page is in progress. Check back soon.</p>
          ) : (
            <ul className="list-disc pl-5 text-sm text-white/80 marker-adaptive">
              {project.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}


