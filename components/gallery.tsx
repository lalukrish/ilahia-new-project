// "use client";

// import { useEffect, useRef, useState, useLayoutEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import SectionTitleBanner from "@/commonComponents/sectionTitleBanner";
// import SectionCta from "@/commonComponents/SectionCta";

// gsap.registerPlugin(ScrollTrigger);

// interface GalleryTile {
//   id: string;
//   images: string[]; // cycles through these — mimics ref's video-swap tiles
//   shape: "square" | "circle" | "portrait" | "wide";
//   position: string; // tailwind absolute position classes
//   size: string; // tailwind width/height classes
//   floatDelay: number; // stagger the float loop per tile
// }

// interface GallerySectionProps {
//   heading?: string;
//   subtext?: string;
//   ctaLabel?: string;
//   onCtaClick?: () => void;
//   tiles?: GalleryTile[];
// }

// const DEFAULT_TILES: GalleryTile[] = [
//   {
//     id: "t1",
//     images: ["/test6.jpg", "/test2.png"],
//     shape: "circle",
//     position: "-left-6 bottom-16 md:left-4 md:bottom-20",
//     size: "h-[220px] w-[220px] md:h-[270px] md:w-[270px]",
//     floatDelay: 0,
//   },
//   {
//     id: "t2",
//     images: ["/kathakali.jpg", "/test1.png"],
//     shape: "portrait",
//     position: "left-40 top-4 md:left-60 md:top-8",
//     size: "h-[150px] w-[110px] md:h-[180px] md:w-[135px]",
//     floatDelay: 0.4,
//   },
//   {
//     id: "t3",
//     images: ["/test3.png", "/test4.jpg"],
//     shape: "square",
//     position: "right-24 top-8 md:right-40 md:top-10",
//     size: "h-[110px] w-[110px] md:h-[135px] md:w-[135px]",
//     floatDelay: 0.8,
//   },
//   {
//     id: "t4",
//     images: ["/test6.jpg"],
//     shape: "wide",
//     position: "-right-6 top-0 md:right-10 md:top-60",
//     size: "h-[130px] w-[280px] md:h-[160px] md:w-[340px]",
//     floatDelay: 1.2,
//   },
//   {
//     id: "t5",
//     images: ["/test1.png"],
//     shape: "square",
//     position: "left-14 bottom-16 md:left-90",
//     size: "h-[130px] w-[170px] md:h-[150px] md:w-[200px]",
//     floatDelay: 1.6,
//   },
//   {
//     id: "t6",
//     images: ["/test5.jpg"],
//     shape: "wide",
//     position: "-right-6 bottom-10 md:right-80 md:bottom-10",
//     size: "h-[160px] w-[220px] md:h-[190px] md:w-[260px]",
//     floatDelay: 2,
//   },
// ];

// const IMAGE_CYCLE_MS = 3500;

// export default function GallerySection({
//   heading = "Explore campus life at Ilahia",
//   subtext = "A closer look at the people, spaces, and moments that make Ilahia what it is.",
//   ctaLabel = "Explore Gallery",
//   onCtaClick = () => {},
//   tiles = DEFAULT_TILES,
// }: GallerySectionProps) {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const [imgIndex, setImgIndex] = useState<Record<string, number>>({});

//   // cycle each tile's image set independently — mirrors ref's tiles swapping content
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setImgIndex((prev) => {
//         const next = { ...prev };
//         tiles.forEach((t) => {
//           if (t.images.length > 1) {
//             next[t.id] = ((prev[t.id] ?? 0) + 1) % t.images.length;
//           }
//         });
//         return next;
//       });
//     }, IMAGE_CYCLE_MS);
//     return () => clearInterval(timer);
//   }, [tiles]);

//   useLayoutEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     const ctx = gsap.context(() => {
//       const els = tileRefs.current.filter(Boolean) as HTMLDivElement[];

//       // scroll-in reveal, staggered
//       // scroll-in reveal AND scroll-out shrink — replays every pass, both directions
//       // scroll-scrubbed grow-in / shrink-out — tile scale tracks scroll position
//       // directly instead of toggling a fixed-duration tween on enter/leave
//       gsap.set(els, { opacity: 0, scale: 0.85, y: 30 });

//       // entrance: as section's top scrolls from bottom of viewport up to 40%,
//       // tiles grow from small -> full size, tied 1:1 to scroll progress
//       gsap.to(els, {
//         opacity: 1,
//         scale: 1,
//         y: 0,
//         stagger: 0.08,
//         ease: "none", // scrub controls timing, not the ease curve
//         scrollTrigger: {
//           trigger: section,
//           start: "top bottom",
//           end: "top 40%",
//           scrub: true,
//         },
//       });

//       // exit: as section's bottom scrolls from 60% up past top of viewport,
//       // tiles shrink back down, same scrub-tied behavior
//       gsap.to(els, {
//         opacity: 0,
//         scale: 0.85,
//         y: -30,
//         stagger: 0.08,
//         ease: "none",
//         scrollTrigger: {
//           trigger: section,
//           start: "bottom 60%",
//           end: "bottom top",
//           scrub: true,
//         },
//       });
//       // gentle continuous float, per-tile offset delay so they don't move in sync
//       els.forEach((el, i) => {
//         gsap.to(el, {
//           y: "+=14",
//           duration: 2.6,
//           repeat: -1,
//           yoyo: true,
//           ease: "sine.inOut",
//           delay: tiles[i]?.floatDelay ?? i * 0.3,
//         });
//       });
//     }, section);

//     return () => ctx.revert();
//   }, [tiles]);

//   const shapeClass = (shape: GalleryTile["shape"]) =>
//     shape === "circle" ? "rounded-full" : "rounded-2xl";

//   return (
//     <div
//       ref={sectionRef}
//       className="relative overflow-hidden px-6 py-24 md:px-10 h-[95vh]"
//       style={{
//         background:
//           "linear-gradient(135deg, #fdf2f8 0%, #eef2ff 50%, #f0fdfa 100%)",
//         minHeight: "560px",
//       }}
//     >
//       {tiles.map((tile, i) => (
//         <div
//           key={tile.id}
//           ref={(el) => {
//             tileRefs.current[i] = el;
//           }}
//           className={`absolute overflow-hidden shadow-lg ${shapeClass(tile.shape)} ${tile.position} ${tile.size}`}
//         >
//           {tile.images.map((src, imgI) => (
//             <img
//               key={src}
//               src={src}
//               alt=""
//               className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
//               style={{ opacity: (imgIndex[tile.id] ?? 0) === imgI ? 1 : 0 }}
//             />
//           ))}
//         </div>
//       ))}

//       {/* center content, always on top */}
//       <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
//         {/* <h2 className="text-4xl font-medium leading-tight text-black md:text-5xl">
//           {heading}
//         </h2> */}
//         <SectionTitleBanner
//           title={heading}
//           subtext="Discover our flexible admission process, eligibility criteria, and application steps to begin your academic journey with us."
//           // buttonLabel="Get Started"
//           //  onButtonClick={() => router.push("/admissions")}
//         />
//         <SectionCta
//           triggerRef={sectionRef}
//           label="Take a look"
//           icon="arrow"
//           onClick={onCtaClick}
//           socialLinks={[
//             { icon: "instagram", href: "#" },
//             { icon: "linkedin", href: "#" },
//             { icon: "youtube", href: "#" },
//             { icon: "twitter", href: "#" },
//           ]}
//         />
//         {/* <p className="mt-4 text-base text-black/60 md:text-lg">{subtext}</p> */}
//         <button
//           onClick={onCtaClick}
//           className="mt-8 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105"
//         >
//           {ctaLabel}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitleBanner from "@/commonComponents/sectionTitleBanner";
import SectionCta from "@/commonComponents/SectionCta";

gsap.registerPlugin(ScrollTrigger);

interface GalleryTile {
  id: string;
  media: string[]; // .mp4/.webm → video, everything else → image, auto-detected
  shape: "square" | "circle" | "portrait" | "wide";
  position: string;
  size: string;
  floatDelay: number;
}

interface GallerySectionProps {
  heading?: string;
  subtext?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  tiles?: GalleryTile[];
  bgImage?: string; // revealed inside the cursor-follow circle
}

const DEFAULT_TILES: GalleryTile[] = [
  {
    id: "t1",
    media: ["/test6.jpg", "/test2.png"],
    shape: "circle",
    position: "-left-6 bottom-40 md:left-4 md:bottom-20",
    size: "h-[140px] w-[140px] md:h-[270px] md:w-[270px]",
    floatDelay: 0,
  },
  {
    id: "t2",
    media: ["/kathakali.jpg", "/home1.mp4"],
    shape: "portrait",
    position: "right-36 top-56 md:right-40 md:top-8",
    size: "h-[150px] w-[110px] md:h-[180px] md:w-[135px]",
    floatDelay: 0.4,
  },
  {
    id: "t3",
    media: ["/test3.png", "/test4.jpg"],
    shape: "square",
    position: "left-12 top-28 md:right-40 md:top-10",
    size: "h-[110px] w-[110px] md:h-[135px] md:w-[135px]",
    floatDelay: 0.8,
  },
  {
    id: "t4",
    media: ["/home1.mp4"],
    shape: "wide",
    position: "-right-6 top-0 md:right-10 md:top-60",
    size: "h-[130px] w-[220px] md:h-[160px] md:w-[340px]",
    floatDelay: 1.2,
  },
  {
    id: "t5",
    media: ["/test1.png"],
    shape: "square",
    position: "left-14 bottom-4 md:bottom-16 md:left-90",
    size: "h-[130px] w-[170px] md:h-[150px] md:w-[200px]",
    floatDelay: 1.6,
  },
  {
    id: "t7",
    media: ["/test3.mp4"],
    shape: "wide",
    position: "-right-6 bottom-40 md:left-88 md:bottom-70",
    size: "h-[160px] w-[220px] md:h-[190px] md:w-[260px]",
    floatDelay: 2,
  },
  {
    id: "t6",
    media: ["/test3.mp4"],
    shape: "wide",
    position: "-right-6 bottom-40 md:right-80 md:bottom-10",
    size: "h-[160px] w-[220px] md:h-[190px] md:w-[260px]",
    floatDelay: 2,
  },
];

const IMAGE_CYCLE_MS = 3500;
const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

export default function GallerySection({
  heading = "Explore campus life at Ilahia",
  subtext = "A closer look at the people, spaces, and moments that make Ilahia what it is.",
  ctaLabel = "Explore Gallery",
  onCtaClick = () => {},
  tiles = DEFAULT_TILES,
  bgImage = "/clg.png",
}: GallerySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const maskLayerRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [imgIndex, setImgIndex] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => {
        const next = { ...prev };
        tiles.forEach((t) => {
          if (t.media.length > 1) {
            next[t.id] = ((prev[t.id] ?? 0) + 1) % t.media.length;
          }
        });
        return next;
      });
    }, IMAGE_CYCLE_MS);
    return () => clearInterval(timer);
  }, [tiles]);

  // cursor-follow circular reveal — gradient layer's mask cutout tracks mouse
  // position via CSS vars, showing the bg image underneath through the hole
  // cursor-follow circular reveal — gradient covers everything always;
  // only the mask's cutout position moves with the cursor, punching a
  // hole that shows the bg image through — never toggles the layer itself
  useEffect(() => {
    const section = sectionRef.current;
    const mask = maskLayerRef.current;
    if (!section || !mask) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mask.style.setProperty("--mx", `${x}px`);
      mask.style.setProperty("--my", `${y}px`);
    };
    const handleLeave = () => {
      // push the circle off-screen so no hole is visible, gradient reads as full cover
      mask.style.setProperty("--mx", "-9999px");
      mask.style.setProperty("--my", "-9999px");
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);
    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const els = tileRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(els, { opacity: 0, scale: 0.85, y: 30 });

      gsap.to(els, {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 40%",
          scrub: true,
        },
      });

      gsap.to(els, {
        opacity: 0,
        scale: 0.85,
        y: -30,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "bottom 60%",
          end: "bottom top",
          scrub: true,
        },
      });

      els.forEach((el, i) => {
        gsap.to(el, {
          y: "+=14",
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: tiles[i]?.floatDelay ?? i * 0.3,
        });
      });
    }, section);

    return () => ctx.revert();
  }, [tiles]);

  const shapeClass = (shape: GalleryTile["shape"]) =>
    shape === "circle" ? "rounded-full" : "rounded-2xl";

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:px-10 h-[95vh]"
      style={{ minHeight: "560px" }}
    >
      {/* bg image — sits at the very back, only visible through the cursor-follow hole */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      {/* gradient layer with a circular cutout that tracks the mouse — everywhere
          else stays the solid gradient, the bg image shows through only inside the circle */}
      <div
        ref={maskLayerRef}
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(135deg, #fdf2f8 0%, #eef2ff 50%, #f0fdfa 100%)",
          WebkitMaskImage:
            "radial-gradient(circle 260px at var(--mx, -9999px) var(--my, -9999px), transparent 80%, transparent 55%, black 78%)",
          maskImage:
            "radial-gradient(circle 300px at var(--mx, -9999px) var(--my, -9999px), transparent 30%, transparent 55%, black 78%)",
        }}
      />
      {tiles.map((tile, i) => (
        <div
          key={tile.id}
          ref={(el) => {
            tileRefs.current[i] = el;
          }}
          className={`absolute z-10 overflow-hidden shadow-lg ${shapeClass(tile.shape)} ${tile.position} ${tile.size}`}
        >
          {tile.media.map((src, mediaI) => {
            const visible = (imgIndex[tile.id] ?? 0) === mediaI;
            return isVideo(src) ? (
              <video
                key={src}
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                style={{ opacity: visible ? 1 : 0 }}
              />
            ) : (
              <img
                key={src}
                src={src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                style={{ opacity: visible ? 1 : 0 }}
              />
            );
          })}
        </div>
      ))}

      {/* center content, always on top */}
      <div className="relative z-20 mx-auto flex max-w-2xl flex-col items-center text-center">
        <SectionTitleBanner
          title={heading}
          subtext="Discover our flexible admission process, eligibility criteria, and application steps to begin your academic journey with us."
        />
        <SectionCta
          triggerRef={sectionRef}
          label="Take a look"
          icon="arrow"
          onClick={onCtaClick}
          socialLinks={[
            { icon: "instagram", href: "#" },
            { icon: "linkedin", href: "#" },
            { icon: "youtube", href: "#" },
            { icon: "twitter", href: "#" },
          ]}
        />
        <button
          onClick={onCtaClick}
          className="mt-8 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
