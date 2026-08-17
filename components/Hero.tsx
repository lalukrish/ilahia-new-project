"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitleBanner from "@/commonComponents/sectionTitleBanner";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "Admission is Open Now"; // was cycling — now constant per request
const CARD_BORDER_RADIUS = 24;
const NOTIF_CYCLE_MS = 3000;

interface CardItem {
  label: string;
  videoSrc: string;
}

interface NotifItem {
  title: string;
  date: string;
}

const DEFAULT_CARDS: CardItem[] = [
  { label: "Build Together", videoSrc: "/test3.mp4" },
  { label: "Transform", videoSrc: "/test3.mp4" },
  { label: "Scale", videoSrc: "/test2.mp4" },
  { label: "Grow", videoSrc: "/test.mp4" },
];

const DEFAULT_NOTIFS: NotifItem[] = [
  { title: "Spring 2026 Registration is Now Open!", date: "July 17, 2026" },
  { title: "Placement Drive begins next week", date: "July 20, 2026" },
  { title: "New Innovation Lab inaugurated", date: "July 24, 2026" },
  { title: "Alumni Meet 2026 registrations live", date: "July 29, 2026" },
];

interface HeroVideoSectionProps {
  videoSrc: string;
  cards?: CardItem[];
  notifications?: NotifItem[];
  onMenuOpen?: () => void;
}

// shared responsive size classes — slot card + normal cards must match, row stays even
const CARD_SIZE_CLASSES =
  "h-[340px] w-[380px] md:h-[300px] md:w-[420px] xl:h-[170px] xl:w-[400px] 2xl:h-[340px] 2xl:w-[480px]";

export default function HeroVideoSection({
  videoSrc,
  cards = DEFAULT_CARDS,
  notifications = DEFAULT_NOTIFS,
  onMenuOpen = () => {},
}: HeroVideoSectionProps) {
  const ROW_SCROLL_FRACTION = 0.5; // 0-1 — how much of the row's width actually scrolls before next section
  const [muted, setMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false); // gate: show gradient until video can play
  const [notifIndex, setNotifIndex] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null); // floating hero video, morphs then hides
  const slotVideoRef = useRef<HTMLVideoElement>(null); // real video inside card 1, crossfades in
  const wrapperRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null); // initial gradient wash, fades with chrome
  const chromeRef = useRef<HTMLDivElement>(null);
  const dockedTextRef = useRef<HTMLDivElement>(null);
  const dockedBgRef = useRef<HTMLDivElement>(null); // light bg behind docked panel, fades in with it
  const rowClipRef = useRef<HTMLDivElement>(null);
  const cardRowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  // notification stack ticker — separate from any headline logic now
  useEffect(() => {
    const timer = setInterval(() => {
      setNotifIndex((prev) => (prev + 1) % notifications.length);
    }, NOTIF_CYCLE_MS);
    return () => clearInterval(timer);
  }, [notifications.length]);

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      if (videoRef.current) videoRef.current.muted = next;
      if (slotVideoRef.current) slotVideoRef.current.muted = next;
      return next;
    });
  };

  useLayoutEffect(() => {
    const video = videoRef.current;
    const slotVideo = slotVideoRef.current;
    const wrapper = wrapperRef.current;
    const slot = slotRef.current;
    const row = cardRowRef.current;
    const clip = rowClipRef.current;
    if (!video || !slotVideo || !wrapper || !slot || !row || !clip) return;

    // cards + CTA start hidden — now revealed as ONE batch, not staggered
    gsap.set(cardRefs.current.filter(Boolean), { opacity: 0, x: 80 });
    gsap.set(slotVideo, { opacity: 0 });
    gsap.set(ctaRef.current, { opacity: 0, x: 80, pointerEvents: "none" });
    gsap.set(dockedTextRef.current, { opacity: 0 });
    gsap.set(dockedBgRef.current, { opacity: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // phase 1 (0 -> 0.28): floating video morphs down into slot position/size
      tl.to(
        video,
        {
          width: () => slot.getBoundingClientRect().width,
          height: () => slot.getBoundingClientRect().height,
          top: () => slot.getBoundingClientRect().top,
          left: () => slot.getBoundingClientRect().left,
          borderRadius: CARD_BORDER_RADIUS,
          ease: "power2.inOut",
          duration: 0.28,
        },
        0,
      );
      tl.to(
        chromeRef.current,
        { opacity: 0, duration: 0.28, ease: "power2.inOut" },
        0,
      );
      tl.to(
        gradientRef.current,
        { opacity: 0, duration: 0.28, ease: "power2.inOut" },
        0,
      );
      tl.to(
        dockedTextRef.current,
        { opacity: 1, duration: 0.28, ease: "power2.inOut" },
        0,
      );
      tl.to(
        dockedBgRef.current,
        { opacity: 1, duration: 0.28, ease: "power2.inOut" },
        0,
      );

      // crossfade: floating video hands off to real video sitting inside card 1
      tl.to(video, { opacity: 0, duration: 0.04 }, 0.27);
      tl.to(slotVideo, { opacity: 1, duration: 0.04 }, 0.27);

      // ALL other cards + CTA appear together, same window as the video shrink —
      // no more one-by-one stagger, whole row is ready once docked
      tl.to(
        cardRefs.current.filter(Boolean),
        { opacity: 1, x: 0, stagger: 0, duration: 0.24, ease: "power2.out" },
        0.04,
      );
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.24,
          ease: "power2.out",
          onStart: () => gsap.set(ctaRef.current, { pointerEvents: "auto" }),
          onReverseComplete: () =>
            gsap.set(ctaRef.current, { pointerEvents: "none" }),
        },
        0.04,
      );

      // phase 3 (0.42 -> 1): row scrolls left, full row width so it fully exits
      // past left edge before handing off to next section — unchanged
      tl.to(
        row,
        {
          // x: () => -row.scrollWidth,
          x: () => -row.scrollWidth * ROW_SCROLL_FRACTION,

          ease: "none",
          duration: 0.58,
        },
        0.42,
      );
    }, wrapper);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative mt-20"
      style={{ height: "500vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* gradient placeholder — shows till video can play, fades w/ chrome on scroll */}
        <div
          ref={gradientRef}
          className="fixed left-0 top-0 h-screen w-full"
          style={{
            zIndex: 5,
            // background:
            //   "linear-gradient(160deg, #0f2027 0%, #203a43 45%, #2c5364 100%)",
          }}
        />

        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted={muted}
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className="fixed left-0 top-0 object-cover transition-opacity duration-700"
          style={{
            width: "100vw",
            height: "100vh",
            zIndex: 30,
            borderRadius: 0,
            opacity: videoReady ? 1 : 0,
          }}
        />

        {/* hero chrome: menu, mute, glass headline card + notification stack */}
        <div
          ref={chromeRef}
          className="pointer-events-none absolute inset-0 z-40"
        >
          <div
            className="absolute inset-0"
            style={
              {
                // background:
                //   "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.55) 100%)",
              }
            }
          />
          {/* <button
            onClick={onMenuOpen}
            className="pointer-events-auto absolute right-6 top-6 z-10 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-transform duration-200 hover:scale-105 md:right-10 md:top-8"
            aria-label="Open menu"
          >
            Menu
          </button> */}
          <button
            onClick={toggleMute}
            className="pointer-events-auto absolute bottom-8 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white transition-transform duration-200 hover:scale-110 md:right-10"
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          {/* glass card, bottom-left — constant text now, no cycling */}
          <div className="absolute bottom-40 left-8 z-10 md:bottom-32 md:left-10">
            <div
              className="pointer-events-auto max-w-md rounded-2xl border border-white/20 px-6 py-6 backdrop-blur-md md:px-8 md:py-8"
              style={{ background: "rgba(0,0,0,0.35)" }}
            >
              <h1 className="text-2xl font-bold leading-tight text-white md:text-4xl">
                {HEADLINE}
              </h1>
              <button className="mt-5 flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-transform duration-200 hover:scale-105">
                Campus Tour
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>

          {/* notification stack, top-right — always 2 visible, new enters bottom, old exits top, loops */}
          <div className="pointer-events-none absolute right-6 bottom-72 z-10 h-[170px] w-[300px] md:right-10 md:bottom-40 md:w-[340px]">
            {notifications.map((n, i) => {
              const slot =
                (((i - notifIndex) % notifications.length) +
                  notifications.length) %
                notifications.length;
              // slot 0 = just exiting (top, fading up), 1 = current top card,
              // 2 = peeking card underneath, 3+ = parked out of view below
              const translateY =
                slot === 0 ? -40 : slot === 1 ? 0 : slot === 2 ? 64 : 140;
              const opacity =
                slot === 0 ? 0 : slot === 1 ? 1 : slot === 2 ? 0.6 : 0;
              const scale = slot === 1 ? 1 : 0.96;
              return (
                <div
                  key={n.title}
                  className="pointer-events-auto absolute left-0 top-0 w-full rounded-2xl border border-white/15 bg-black/45 px-5 py-4 backdrop-blur-md transition-all duration-700 ease-out"
                  style={{
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    opacity,
                    zIndex: slot === 1 ? 2 : 1,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold leading-snug text-white md:text-base">
                      {n.title}
                    </p>
                    <span aria-hidden="true" className="text-white/70">
                      &#8599;
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-white/70">
                    <span>View</span>
                    <span>{n.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* docked state: light bg, title, "Ilahia @2026", full card row shown at once */}
        <div
          ref={dockedBgRef}
          className="absolute inset-0 z-0"
          style={{
            background: "",
            // "linear-gradient(160deg, #0a364d 0%, #203a43 45%, #0a364d 100%)",
          }}
        />
        <div
          ref={dockedTextRef}
          className="absolute inset-0 z-10 flex flex-col justify-center px-2 md:px-10 lg:px-20"
        >
          {/* <h2 className="max-w-4xl text-3xl md:text-4xl font-normal leading-tight text-white ">
            Ilahia college Muvattupuzha
          </h2> */}

          <SectionTitleBanner
            title="Ilahia college Muvattupuzha"
            subtext="Discover our flexible admission process, eligibility criteria, and application steps to begin your academic journey with us."
            buttonLabel="Get Started"
            //  onButtonClick={() => router.push("/admissions")}
          />
          <p className="max-w-4xl mb-10 mt-2 text-md   md:text-lg font-semibold text-black/70">
            Ilahia College of Arts and Science was started under the auspices of
            Ilahia Trust in June 1995 and it completed 31 years of excellence in
            June 2026.
          </p>

          <div ref={rowClipRef} className="w-full overflow-hidden">
            <div
              ref={cardRowRef}
              className="flex gap-4"
              style={{ width: "max-content" }}
            >
              {/* card 1: real slot video lives here, crossfades in from the floating hero video */}
              <div
                ref={slotRef}
                className={`relative shrink-0 overflow-hidden rounded-3xl bg-black ${CARD_SIZE_CLASSES}`}
              >
                <video
                  ref={slotVideoRef}
                  src={videoSrc}
                  autoPlay
                  loop
                  muted={muted}
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ borderRadius: CARD_BORDER_RADIUS }}
                />
                {/* <div className="absolute inset-0 bg-black/20" /> */}
                <span className="absolute bottom-6 left-6 z-10 text-xl font-semibold text-white md:text-2xl">
                  Validate
                </span>
              </div>

              {cards.map((card, i) => (
                <div
                  key={card.label}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className={`relative shrink-0 overflow-hidden rounded-3xl bg-black ${CARD_SIZE_CLASSES}`}
                >
                  <video
                    src={card.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                  />
                  {/* <div className="absolute inset-0 bg-black/30" /> */}
                  <span className="absolute bottom-6 left-6 z-10 text-xl font-semibold text-white md:text-2xl">
                    {card.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
