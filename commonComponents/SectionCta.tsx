"use client";

import { useRef, useLayoutEffect, RefObject, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCtaContext, SocialLink } from "./CtaProvider";

gsap.registerPlugin(ScrollTrigger);

interface SectionCtaProps {
  triggerRef: RefObject<HTMLElement | null>;
  label: string;
  icon?: "arrow" | ReactNode | null;
  onClick?: () => void;
  start?: string;
  end?: string;
  socialLinks?: SocialLink[];
}

export default function SectionCta({
  triggerRef,
  label,
  icon = null,
  onClick,
  start = "top 60%",
  end = "bottom 40%",
  socialLinks,
}: SectionCtaProps) {
  const { push, remove } = useCtaContext();
  const idRef = useRef(`cta-${Math.random().toString(36).slice(2)}`);

  useLayoutEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const id = idRef.current;

    const enter = () => push({ id, label, icon, onClick, socialLinks });
    const leave = () => remove(id);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger,
        start,
        end,
        onEnter: enter,
        onEnterBack: enter,
        onLeave: leave,
        onLeaveBack: leave,
      });
    }, trigger);

    return () => {
      remove(id);
      ctx.revert();
    };
  }, [triggerRef, start, end, label, icon, onClick, socialLinks]);

  return null; // registers with the shared slot, renders nothing itself
}
