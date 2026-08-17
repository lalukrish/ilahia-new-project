"use client";

import { useRef, useLayoutEffect, ReactNode } from "react";
import gsap from "gsap";

interface StickyCtaButtonProps {
  label: string;
  icon?: "arrow" | ReactNode | null;
  onClick?: () => void;
  className?: string;
}

export default function StickyCtaButton({
  label,
  icon = null,
  onClick = () => {},
  className = "",
}: StickyCtaButtonProps) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const prevLabel = useRef(label);

  // when label (or icon) changes on an already-mounted button, run a swap
  // transition instead of an instant text flip — old slides up+fades,
  // new slides in from below+fades, icon gets a little rotate-swap too
  useLayoutEffect(() => {
    if (prevLabel.current === label) return;
    prevLabel.current = label;
    if (!labelRef.current) return;

    const tl = gsap.timeline();
    tl.to(labelRef.current, {
      y: -10,
      opacity: 0,
      duration: 0.18,
      ease: "power2.in",
    })
      .set(labelRef.current, { y: 10 })
      .to(labelRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.22,
        ease: "power2.out",
      });

    if (iconRef.current) {
      tl.to(iconRef.current, { rotate: 20, opacity: 0, duration: 0.15 }, 0)
        .set(iconRef.current, { rotate: -20 })
        .to(
          iconRef.current,
          { rotate: 0, opacity: 1, duration: 0.2 },
          "-=0.15",
        );
    }
  }, [label]);

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 overflow-hidden rounded-full bg-black px-8 py-4 text-xs md:text-sm font-semibold tracking-wide text-white shadow-lg transition-transform duration-200 hover:scale-105 md:text-base ${className}`}
    >
      <span ref={labelRef} style={{ display: "inline-block" }}>
        {label}
      </span>
      {icon && (
        <span
          ref={iconRef}
          style={{ display: "inline-block" }}
          aria-hidden="true"
        >
          {icon === "arrow" ? "→" : icon}
        </span>
      )}
    </button>
  );
}
