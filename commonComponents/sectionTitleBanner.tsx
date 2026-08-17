// "use client";

// import { useRef, useLayoutEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// interface SectionTitleBannerProps {
//   title: string;
//   subtext?: string;
//   buttonLabel?: string;
//   onButtonClick?: () => void;
//   bgColor?: string; // defaults to near-black
//   gradientColors?: string; // css gradient stop list, defaults to brand teal/blue/green
// }

// export default function SectionTitleBanner({
//   title,
//   subtext,
//   buttonLabel,
//   onButtonClick = () => {},
//   bgColor = "#0a1416",
//   gradientColors = "#2c5364, #38b2ac, #4dd0c4, #2c5364",
// }: SectionTitleBannerProps) {
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     const el = titleRef.current;
//     const wrapper = wrapperRef.current;
//     if (!el || !wrapper) return;

//     const ctx = gsap.context(() => {
//       // gradient sweeps across the text as the section scrolls through view —
//       // background-position tween on the bg-clip-text gradient itself
//       gsap.fromTo(
//         el,
//         { backgroundPosition: "0% 50%" },
//         {
//           backgroundPosition: "200% 50%",
//           ease: "none",
//           scrollTrigger: {
//             trigger: wrapper,
//             start: "top 90%",
//             end: "bottom 10%",
//             scrub: true,
//           },
//         },
//       );
//     }, wrapper);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       ref={wrapperRef}
//       className="px-6 py-14 md:px-10 lg:px-20"
//       style={{ background: bgColor }}
//     >
//       <h2
//         ref={titleRef}
//         className="text-5xl font-extrabold uppercase leading-none tracking-tight md:text-7xl lg:text-8xl"
//         style={{
//           backgroundImage: `linear-gradient(90deg, ${gradientColors})`,
//           backgroundSize: "200% 100%",
//           WebkitBackgroundClip: "text",
//           backgroundClip: "text",
//           color: "transparent",
//         }}
//       >
//         {title}
//       </h2>

//       {subtext && (
//         <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/80 md:text-base">
//           {subtext}
//         </p>
//       )}

//       {buttonLabel && (
//         <button
//           onClick={onButtonClick}
//           className="mt-8 flex items-center gap-2 rounded-md bg-[#2c5364] px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105"
//         >
//           {buttonLabel}
//           <span aria-hidden="true">&#8599;</span>
//         </button>
//       )}
//     </div>
//   );
// }

"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleBannerProps {
  title: string;
  subtext?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  fromColor?: string;
  toColor?: string;
}

export default function SectionTitleBanner({
  title,
  subtext,
  buttonLabel,
  onButtonClick = () => {},
  fromColor = "#f5b400",
  toColor = "#2c5364",
}: SectionTitleBannerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const letters = lettersRef.current.filter(Boolean);
    if (!wrapper || !letters.length) return;

    const ctx = gsap.context(() => {
      gsap.set(letters, { color: fromColor });
      gsap.to(letters, {
        color: toColor,
        duration: 0.4,
        stagger: 0.04,
        ease: "power1.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 85%",
          toggleActions: "restart none restart none",
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [title, fromColor, toColor]);

  return (
    <div ref={wrapperRef} className="px-0 py-4 md:px-0 lg:px-0">
      <h2 className="text-3xl font-bold  leading-none tracking-tight md:text-4xl lg:text-[38px]">
        {title.split("").map((char, i) => (
          <span
            key={`${char}-${i}`}
            ref={(el) => {
              lettersRef.current[i] = el;
            }}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>

      {/* {subtext && (
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-black/70 md:text-base">
          {subtext}
        </p>
      )}

      {buttonLabel && (
        <button
          onClick={onButtonClick}
          className="mt-8 flex items-center gap-2 rounded-md bg-[#2c5364] px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105"
        >
          {buttonLabel}
          <span aria-hidden="true">&#8599;</span>
        </button>
      )} */}
    </div>
  );
}
