import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-svh px-6 py-16 sm:px-10">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-2 text-base text-white/70 [data-theme=light]:text-black/70">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-6">
          <Link href="/" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 [data-theme=light]:bg-black/5 [data-theme=light]:text-black [data-theme=light]:hover:bg-black/10">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}


