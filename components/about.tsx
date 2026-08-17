"use client";

import { useRef, ReactElement } from "react";
import SectionCta from "@/commonComponents/SectionCta";
import SectionTitleBanner from "@/commonComponents/sectionTitleBanner";

interface AboutSectionProps {
  heading?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  paragraph1?: string;
  paragraph2?: string;
  image1?: string;
  image2?: string;
}

export default function AboutSection({
  heading = "Ilahia 2026 - Your Path to Success",
  ctaLabel = "Know More",
  onCtaClick = () => {},
  paragraph1 = "Ilahia College of Arts and Science was started under the auspices of Ilahia Trust in June 1995 and it completed 25 years of excellence in June 2020. The College is situated on a beautiful green hillock providing a panoramic view on Muvattupuzha – Perumbavoor route. The campus renders a calm and conducive atmosphere for dynamic study and academic activities.",
  paragraph2 = "Ilahia College of Arts and Science was started under the auspices of Ilahia Trust in June 1995 and it completed 25 years of excellence in June 2020. The College is situated on a beautiful green hillock providing a panoramic view on Muvattupuzha – Perumbavoor route. The campus renders a calm and conducive atmosphere for dynamic study and academic activities.",
  image1 = "/test4.png",
  image2 = "/test5.jpg",
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null); // this section IS the CTA's trigger now

  const boldify = (text: string) => {
    const terms = [
      "Ilahia College of Arts and Science",
      "25 years",
      "Muvattupuzha – Perumbavoor",
    ];
    let parts: (string | ReactElement)[] = [text];
    terms.forEach((term) => {
      parts = parts.flatMap((part) => {
        if (typeof part !== "string") return [part];
        const split = part.split(term);
        if (split.length === 1) return [part];
        const out: (string | ReactElement)[] = [];
        split.forEach((chunk, i) => {
          out.push(chunk);
          if (i < split.length - 1)
            out.push(<strong key={`${term}-${i}`}>{term}</strong>);
        });
        return out;
      });
    });
    return parts;
  };

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-10 md:px-10 bg-cyan-900"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/20 pb-6">
          <SectionTitleBanner
            title={heading}
            subtext="Discover our flexible admission process, eligibility criteria, and application steps to begin your academic journey with us."
            buttonLabel="Get Started"
            toColor="#fff"
          />
          <button
            onClick={onCtaClick}
            className="shrink-0 whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition-transform duration-200 hover:scale-105"
          >
            {ctaLabel}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 border-b border-white/20 pb-8 md:grid-cols-2 md:gap-10">
          <div className="overflow-hidden rounded-lg">
            <img
              src={image1}
              alt=""
              className="h-[220px] w-full object-cover md:h-[260px]"
            />
          </div>
          <div className="flex items-center border-l-0 md:border-l md:border-white/20 md:pl-10">
            <p className="text-sm leading-relaxed text-white/90 md:text-base">
              {boldify(paragraph1)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2 md:gap-10">
          <div className="flex items-center md:border-r md:border-white/20 md:pr-10">
            <p className="text-sm leading-relaxed text-white/90 md:text-base">
              {boldify(paragraph2)}
            </p>
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              src={image2}
              alt=""
              className="h-[220px] w-full object-cover md:h-[260px]"
            />
          </div>
        </div>
      </div>

      {/* sticky bottom CTA — shows while THIS section is in view, hides on scroll past */}
      <SectionCta
        triggerRef={sectionRef}
        label="View Facilities"
        icon="arrow"
        onClick={onCtaClick}
      />
    </div>
  );
}
