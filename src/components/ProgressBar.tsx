"use client";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

export default function ProgressBar(): ReactElement {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, scrolled / height) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="progress-track fixed left-0 right-0 top-0 z-[60] h-[2px]">
      <div
        className="progress-fill h-full"
        style={{ width: `${progress * 100}%` }}
        aria-hidden
      />
    </div>
  );
}


