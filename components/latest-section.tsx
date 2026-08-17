"use client";

import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TABS = ["News", "Events", "Exam Notification", "Exam Timetable"] as const;
type Tab = (typeof TABS)[number];

interface LatestItem {
  category: string;
  title: string;
  meta: string; // author or date
  image: string;
}

interface SideItem {
  category: string;
  title: string;
  meta: string;
  image: string;
  dark?: boolean; // navy-panel style card, like the "IBM AI model chief" ref card
}

interface FeaturedItem {
  category: string;
  title: string;
  image: string;
}

interface LatestUpdatesSectionProps {
  latest?: LatestItem[];
  featured?: FeaturedItem;
  sideCards?: SideItem[];
}

const DEFAULT_LATEST: LatestItem[] = [
  {
    category: "Placements",
    title: "Nirmala College Honoured with Edu Excellence Award 2026",
    meta: "13 Aug 2026",
    image: "/test1.png",
  },
  {
    category: "Research",
    title:
      "Bharat Space Education Research Centre to conduct 3-Day AI Bootcamp",
    meta: "11 Aug 2026",
    image: "/test2.png",
  },
  {
    category: "Workshops",
    title: "Three-Day Bootcamp on Investor-Friendly Pitch Deck",
    meta: "11 Aug 2026",
    image: "/test3.png",
  },
  {
    category: "Academics",
    title: "New Innovation Lab inaugurated on campus",
    meta: "24 Jul 2026",
    image: "/test4.jpg",
  },
];

const DEFAULT_FEATURED: FeaturedItem = {
  category: "Convocation",
  title: "Spring 2026 batch graduates in record numbers",
  image: "/test5.jpg",
};

const DEFAULT_SIDE: SideItem[] = [
  {
    category: "Alumni",
    title: "Alumni Meet 2026 registrations now live",
    meta: "Register before Sept 1",
    image: "/test6.jpg",
    dark: true,
  },
  {
    category: "Admissions",
    title: "Spring 2026 Registration is Now Open",
    meta: "View details",
    image: "/kathakali.jpg",
  },
];

export default function LatestUpdatesSection({
  latest = DEFAULT_LATEST,
  featured = DEFAULT_FEATURED,
  sideCards = DEFAULT_SIDE,
}: LatestUpdatesSectionProps) {
  const [activeTab, setActiveTab] = useState<Tab>("News");

  const sectionRef = useRef<HTMLDivElement>(null);
  const latestRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const latestItems =
        latestRef.current?.querySelectorAll("[data-latest-item]");
      const sideItems = sideRef.current?.querySelectorAll("[data-side-item]");

      if (latestItems?.length) {
        gsap.set(latestItems, { opacity: 0, x: -24 });
        gsap.to(latestItems, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        });
      }

      if (featuredRef.current) {
        gsap.set(featuredRef.current, { opacity: 0, scale: 0.96 });
        gsap.to(featuredRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        });
      }

      if (sideItems?.length) {
        gsap.set(sideItems, { opacity: 0, x: 24 });
        gsap.to(sideItems, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="px-6 py-16 md:px-10 lg:px-20">
      {/* tab switcher */}
      <div className="mb-10 flex gap-8 border-b border-black/10">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-4 text-sm font-semibold uppercase tracking-wide transition-colors ${
              activeTab === tab
                ? "text-[#2891be]"
                : "text-black/40 hover:text-black/60"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#2c5364]" />
            )}
          </button>
        ))}
      </div>

      <h2 className="mb-10 text-3xl font-semibold text-black md:text-4xl">
        Latest Updates
      </h2>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* left: latest list */}
        <div ref={latestRef} className="lg:col-span-3">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-black/40">
            Latest
          </p>
          <div className="flex flex-col gap-5">
            {latest.map((item) => (
              <div
                key={item.title}
                data-latest-item
                className="group flex cursor-pointer gap-3"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black/5">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-black/45">
                    {item.category}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug text-black group-hover:underline">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-black/40">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* center: featured */}
        <div ref={featuredRef} className="lg:col-span-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-black/40">
            Featured
          </p>
          <div className="group cursor-pointer overflow-hidden rounded-2xl">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={featured.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-black/45">
            {featured.category}
          </p>
          <h3 className="mt-1 text-2xl font-medium leading-snug text-black group-hover:underline md:text-3xl">
            {featured.title}
          </h3>
        </div>

        {/* right: side cards, navy panel style */}
        <div ref={sideRef} className="flex flex-col gap-5 lg:col-span-3">
          {sideCards.map((item) => (
            <div
              key={item.title}
              data-side-item
              className={`group cursor-pointer overflow-hidden rounded-2xl ${
                item.dark ? "bg-[#0f2027]" : "border border-black/10"
              }`}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p
                  className={`text-xs font-medium ${item.dark ? "text-white/60" : "text-black/45"}`}
                >
                  {item.category}
                </p>
                <p
                  className={`mt-1 text-sm font-semibold leading-snug group-hover:underline ${
                    item.dark ? "text-white" : "text-black"
                  }`}
                >
                  {item.title}
                </p>
                <p
                  className={`mt-2 text-xs ${item.dark ? "text-white/50" : "text-black/40"}`}
                >
                  {item.meta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
