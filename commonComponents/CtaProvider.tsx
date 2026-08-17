"use client";

import { createContext, useContext, useRef, useState, ReactNode } from "react";
import gsap from "gsap";
import { useLayoutEffect as useLayoutEffectReact } from "react";
import StickyCtaButton from "./StickyCtaButton";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
const SOCIAL_ICONS = {
  instagram: FaFacebookF,
  linkedin: FaInstagram,
  youtube: FaLinkedinIn,
  twitter: FaYoutube,
};

export interface SocialLink {
  icon: "instagram" | "linkedin" | "youtube" | "twitter";
  href: string;
}

export interface CtaConfig {
  id: string;
  label: string;
  icon?: "arrow" | ReactNode | null;
  onClick?: () => void;
  socialLinks?: SocialLink[]; // only rendered if THIS config passes them — nothing implied
}

interface CtaContextValue {
  push: (config: CtaConfig) => void;
  remove: (id: string) => void;
}

const CtaContext = createContext<CtaContextValue | null>(null);

export function useCtaContext() {
  const ctx = useContext(CtaContext);
  if (!ctx) throw new Error("useCtaContext must be used inside <CtaProvider>");
  return ctx;
}

let introPlayed = false;

export function CtaProvider({ children }: { children: ReactNode }) {
  const stackRef = useRef<CtaConfig[]>([]);
  const [active, setActive] = useState<CtaConfig | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const prevVisible = useRef(false);

  const recompute = () => {
    setActive(stackRef.current[stackRef.current.length - 1] ?? null);
  };

  const push = (config: CtaConfig) => {
    stackRef.current = stackRef.current.filter((c) => c.id !== config.id);
    stackRef.current.push(config);
    recompute();
  };

  const remove = (id: string) => {
    stackRef.current = stackRef.current.filter((c) => c.id !== id);
    recompute();
  };

  // handles show/hide + one-time slide-up intro for the SLOT itself,
  // independent of which section's content currently fills it
  useLayoutEffectReact(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const isVisible = active !== null;

    if (isVisible && !prevVisible.current) {
      if (!introPlayed) {
        introPlayed = true;
        gsap.fromTo(
          wrap,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        );
      } else {
        gsap.to(wrap, { opacity: 1, y: 0, duration: 0.2, ease: "power1.out" });
      }
    } else if (!isVisible && prevVisible.current) {
      gsap.to(wrap, { opacity: 0, duration: 0.18, ease: "power1.in" });
    }
    prevVisible.current = isVisible;
  }, [active]);

  return (
    <CtaContext.Provider value={{ push, remove }}>
      {children}
      <div
        ref={wrapRef}
        className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4"
        style={{ opacity: 0, pointerEvents: active ? "auto" : "none" }}
      >
        {active && (
          <>
            <StickyCtaButton
              label={active.label}
              icon={active.icon ?? null}
              onClick={active.onClick}
            />
            {active.socialLinks && active.socialLinks.length > 0 && (
              <div className="flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 backdrop-blur-md">
                {active.socialLinks.slice(0, 4).map((s) => {
                  const Icon = SOCIAL_ICONS[s.icon];
                  return (
                    <a
                      key={s.icon}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.icon}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </CtaContext.Provider>
  );
}
