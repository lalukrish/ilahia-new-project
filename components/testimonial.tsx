"use client";

import { useState, useEffect, useRef } from "react";

interface Testimonial {
  name: string;
  course: string;
  quote: string;
  image: string;
}

interface TestimonialSectionProps {
  heading?: string;
  subtext?: string;
  testimonials?: Testimonial[];
  autoPlayMs?: number;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Aisha Rahman",
    course: "B.Com Finance and Taxation",
    quote:
      "Ilahia gave me hands-on exposure I couldn't have gotten anywhere else. The faculty actually care.",
    image: "/testim1.png",
  },
  {
    name: "Rohan Nair",
    course: "BCA (Hons.)",
    quote:
      "The labs and project support here are genuinely industry-grade. I landed my internship through campus placements.",
    image: "/testim2.png",
  },
  {
    name: "Fathima Sidhiq",
    course: "B.A. English (Hons.)",
    quote:
      "Small class sizes meant every professor knew me by name. That made all the difference.",
    image: "/testim3.png",
  },
  {
    name: "Arjun Menon",
    course: "BBA (Hons.)",
    quote:
      "From day one, the campus felt like it was built for students to actually grow, not just attend.",
    image: "/testim4.png",
  },
  {
    name: "Meera Pillai",
    course: "B.Sc Psychology",
    quote:
      "The research opportunities in my final year shaped my entire career path.",
    image: "/testimonials/meera.jpg",
  },
];

export default function TestimonialSection({
  heading = "What our students say",
  subtext = "Real experiences from students who've walked these halls.",
  testimonials = DEFAULT_TESTIMONIALS,
  autoPlayMs = 3500,
}: TestimonialSectionProps) {
  const [centerIndex, setCenterIndex] = useState(0);
  const total = testimonials.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % total);
    }, autoPlayMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, autoPlayMs]);

  // distance from center, wrapped both directions — used to pick each card's slot
  const slotFor = (i: number) => {
    const raw = i - centerIndex;
    const half = total / 2;
    if (raw > half) return raw - total;
    if (raw < -half) return raw + total;
    return raw;
  };

  const goTo = (i: number) => {
    setCenterIndex(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % total);
    }, autoPlayMs);
  };

  return (
    <div className="relative  overflow-hidden px-6 py-20 md:px-10 lg:px-10">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/test4.jpg')" }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.8) 80%, #2c5364 100%)",
        }}
      />
      <div className="mx-auto mb-14 flex max-w-4xl flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <h2 className="text-3xl font-medium text-white md:text-4xl">
          {heading}
        </h2>
        <p className="max-w-sm text-sm text-white/55 md:text-base">{subtext}</p>
      </div>

      <div
        className="relative mx-auto flex items-center justify-center"
        style={{ height: "420px", perspective: "1400px" }}
      >
        {testimonials.map((t, i) => {
          const slot = slotFor(i);
          const abs = Math.abs(slot);

          // only render nearby slots — anything beyond +-2 is parked invisible off to the side
          if (abs > 2) return null;

          const isCenter = slot === 0;
          const xOffset = slot * 230; // px spacing between cards
          const rotateY = slot * -22; // tilt away from center, like ref's perspective fan
          const scale = isCenter ? 1 : abs === 1 ? 0.82 : 0.68;
          const zIndex = 10 - abs;
          const opacity = abs === 2 ? 0.5 : 1;

          return (
            <div
              key={t.name}
              onClick={() => goTo(i)}
              className="absolute cursor-pointer overflow-hidden rounded-2xl shadow-xl transition-all duration-700 ease-out "
              style={{
                width: "300px",
                height: isCenter ? "400px" : "340px",
                transform: `translateX(${xOffset}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
                gap: 8,
              }}
            >
              <img
                src={t.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.8) 100%)",
                }}
              />

              {/* quote only shown on center card, like ref's "View" label overlay */}
              {isCenter && (
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-sm font-medium leading-snug text-white md:text-base">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-3 text-sm font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-white/70">{t.course}</p>
                </div>
              )}
              {!isCenter && (
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/70">{t.course}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* dots */}
      <div className="mt-10 flex justify-center gap-2">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            onClick={() => goTo(i)}
            aria-label={`Go to ${t.name}`}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === centerIndex ? "24px" : "8px",
              background: i === centerIndex ? "#0f2027" : "rgba(15,32,39,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
