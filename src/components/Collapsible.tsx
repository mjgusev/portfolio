"use client";
import type { PropsWithChildren, ReactElement } from "react";
import { useEffect, useRef } from "react";

type CollapsibleProps = PropsWithChildren<{
  isOpen: boolean;
  durationMs?: number;
}>;

export default function Collapsible({ isOpen, durationMs = 280, children }: CollapsibleProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const shouldAnimate = !prefersReducedMotion && hasMountedRef.current;

    element.style.overflow = "hidden";
    element.style.willChange = "max-height, opacity";
    element.style.transition = shouldAnimate
      ? `max-height ${durationMs}ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity ${durationMs}ms ease`
      : "none";

    if (!hasMountedRef.current) {
      // Initial paint: don't animate; just set to the correct end state
      if (isOpen) {
        element.style.maxHeight = "none";
        element.style.opacity = "1";
      } else {
        element.style.maxHeight = "0px";
        element.style.opacity = "0.96";
      }
      hasMountedRef.current = true;
      return;
    }

    if (isOpen) {
      // Opening: from current height (likely 0px) to content height, then set to 'none' after transition
      const targetHeight = element.scrollHeight;
      element.style.maxHeight = `${targetHeight}px`;
      element.style.opacity = "1";
      const handleEnd = () => {
        element.style.transition = "none";
        element.style.maxHeight = "none"; // allow natural height after animation
      };
      element.addEventListener("transitionend", handleEnd, { once: true });
    } else {
      // Closing: if maxHeight is 'none', set to pixel height first to enable transition to 0
      if (element.style.maxHeight === "" || element.style.maxHeight === "none") {
        element.style.maxHeight = `${element.scrollHeight}px`;
        // Force reflow to ensure the browser picks up the starting height
        void element.getBoundingClientRect();
      }
      element.style.opacity = "0.96";
      element.style.transition = shouldAnimate
        ? `max-height ${durationMs}ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity ${durationMs}ms ease`
        : "none";
      element.style.maxHeight = "0px";
    }
  }, [isOpen, durationMs, children]);

  return <div ref={ref}>{children}</div>;
}


