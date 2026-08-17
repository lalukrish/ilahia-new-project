"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ManagementSectionProps {
  heading?: string;
  subtext?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  mobileImage?: string;
  mobileBg?: string;
  dashboardImage?: string;
  mobileCaptionTitle?: string;
  mobileCaptionBody?: string;
  dashboardCaptionTitle?: string;
  dashboardCaptionBody?: string;
}

export default function ManagementSection({
  heading = "Manage it all, wherever you are",
  subtext = "From admissions to attendance, get total visibility and control of campus operations on any device, at any time.",
  ctaLabel = "Get Started",
  onCtaClick = () => {},
  mobileImage = "/poster1.png",
  mobileBg = "/poster1.png",
  dashboardImage = "/ar.png",
  mobileCaptionTitle = "Student App",
  mobileCaptionBody = "Stay connected to timetables, results, and notices in real time, right from your phone.",
  dashboardCaptionTitle = "Admin Dashboard",
  dashboardCaptionBody = "One central hub that brings admissions, attendance, and fees into focus so staff always know what's happening next.",
}: ManagementSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftPanelRef.current;
    const right = rightPanelRef.current;
    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      // flex row — left starts small (flex-grow:1), right starts big (flex-grow:2)
      // scrolling down through section flips it: left grows, right shrinks
      // scrub ties directly to scroll offset, reverses live on scroll-up
      gsap.fromTo(
        left,
        { flexGrow: 1 },
        {
          flexGrow: 2,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 30%",
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        right,
        { flexGrow: 2 },
        {
          flexGrow: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 30%",
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="px-6 py-16 md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* top: heading left, subtext + CTA right */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <h2 className="max-w-md text-4xl font-medium leading-tight text-black md:text-5xl">
            {heading}
          </h2>
          <div className="max-w-sm">
            <p className="text-sm text-black/65 md:text-base">{subtext}</p>
            <button
              onClick={onCtaClick}
              className="mt-5 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105"
            >
              {ctaLabel}
            </button>
          </div>
        </div>

        {/* flexbox row — panels swap size via flex-grow, not grid columns */}
        <div ref={rowRef} className="flex flex-col gap-4 md:flex-row">
          {/* left: student app */}
          <div
            ref={leftPanelRef}
            className="min-w-0 md:flex-grow"
            style={{ flexBasis: 0 }}
          >
            <div
              className="relative h-[360px] overflow-hidden rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: `url('${mobileBg}')` }}
            >
              <img
                src={mobileImage}
                alt=""
                className="absolute inset-x-0 bottom-0 mx-auto h-[92%] w-[80%] rounded-t-xl object-cover object-top shadow-2xl"
              />
            </div>
            <p className="mt-4 text-sm font-semibold text-black">
              {mobileCaptionTitle}
            </p>
            <p className="mt-1 text-sm text-black/60">{mobileCaptionBody}</p>
          </div>

          {/* right: admin dashboard */}
          <div
            ref={rightPanelRef}
            className="min-w-0 md:flex-grow"
            style={{ flexBasis: 0 }}
          >
            <div className="relative h-[360px] overflow-hidden rounded-2xl bg-[#dce6f0]">
              <img
                src={dashboardImage}
                alt=""
                className="absolute inset-x-0 top-0 w-full object-cover object-top"
              />
            </div>
            <p className="mt-4 text-sm font-semibold text-black">
              {dashboardCaptionTitle}
            </p>
            <p className="mt-1 text-sm text-black/60">{dashboardCaptionBody}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
