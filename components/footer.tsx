"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
interface FooterLinkGroup {
  heading: string;
  links: { label: string; href: string }[];
}

interface FooterSectionProps {
  brandName?: string;
  tagline?: string;
  linkGroups?: FooterLinkGroup[];
  socials?: {
    icon: "instagram" | "linkedin" | "youtube" | "twitter";
    href: string;
  }[];
  onNewsletterSubmit?: (email: string) => void;
  address?: string;
  phone?: string;
  email?: string;
}

const DEFAULT_GROUPS: FooterLinkGroup[] = [
  {
    heading: "Academics",
    links: [
      { label: "UG Programs", href: "#" },
      { label: "PG Programs", href: "#" },
      { label: "Departments", href: "#" },
      { label: "Research", href: "#" },
    ],
  },
  {
    heading: "Admissions",
    links: [
      { label: "How to Apply", href: "#" },
      { label: "Fee Structure", href: "#" },
      { label: "Scholarships", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
  {
    heading: "Campus",
    links: [
      { label: "Facilities", href: "#" },
      { label: "Hostel Life", href: "#" },
      { label: "Placements", href: "#" },
      { label: "Events", href: "#" },
    ],
  },
  {
    heading: "College",
    links: [
      { label: "About Us", href: "#" },
      { label: "Faculty", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const SOCIAL_ICONS = {
  instagram: FaFacebookF,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  twitter: FaYoutube,
};

export default function FooterSection({
  brandName = "Ilahia",
  tagline = "Shaping futures on the Muvattupuzha–Perumbavoor route since 1995.",
  linkGroups = DEFAULT_GROUPS,
  socials = [
    { icon: "instagram", href: "#" },
    { icon: "linkedin", href: "#" },
    { icon: "youtube", href: "#" },
    { icon: "twitter", href: "#" },
  ],
  onNewsletterSubmit = () => {},
  address = "Ilahia College of Arts and Science, Muvattupuzha, Kerala",
  phone = "+91 00000 00000",
  email = "info@ilahia.edu.in",
}: FooterSectionProps) {
  const [emailInput, setEmailInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    onNewsletterSubmit(emailInput.trim());
    setSubmitted(true);
    setEmailInput("");
  };

  return (
    <footer
      className="relative overflow-hidden px-6 pt-20 md:px-10 lg:px-2"
      style={{
        background: "linear-gradient(160deg, #0f2027 0%, #16394a 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* top: newsletter row */}
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-14 md:flex-row md:items-end">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
              Stay in the loop
            </p>
            <h3 className="mt-2 text-2xl font-medium text-white md:text-3xl">
              Get admissions news and campus updates
            </h3>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-sm items-center gap-2"
          >
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="your@email.com"
              required
              className="h-12 flex-1 rounded-full border border-white/20 bg-white/5 px-5 text-sm text-white placeholder-white/40 outline-none focus:border-white/50"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 hover:scale-105"
            >
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
        {submitted && (
          <p className="mt-3 text-sm text-white/60">
            Thanks — you're on the list.
          </p>
        )}

        {/* mid: link columns + contact */}
        <div className="grid grid-cols-2 gap-8 py-14 sm:grid-cols-3 md:grid-cols-5">
          <div className="col-span-2 sm:col-span-1 md:col-span-1">
            <p className="text-sm font-semibold text-white">{brandName}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/55">
              {tagline}
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon];
                return (
                  <a
                    key={s.icon}
                    href={s.href}
                    aria-label={s.icon}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-white/40 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.heading}>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                {group.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-1 text-sm text-white/70 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={13}
                        className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* contact strip */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <span>{address}</span>
          <div className="flex gap-6">
            <a href={`tel:${phone}`} className="hover:text-white">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="hover:text-white">
              {email}
            </a>
          </div>
        </div>
      </div>

      {/* giant wordmark, bleeds off bottom edge */}
      <div className="pointer-events-none mx-auto max-w-6xl overflow-hidden">
        <p
          className="select-none text-center font-extrabold leading-none text-white/[0.06]"
          style={{
            fontSize: "clamp(4rem, 18vw, 13rem)",
            transform: "translateY(18%)",
          }}
        >
          {brandName}
        </p>
      </div>

      {/* bottom bar */}
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/40 md:flex-row">
        <span>
          &copy; {new Date().getFullYear()} {brandName} College. All rights
          reserved.
        </span>
        <div className="flex gap-5">
          <a href="#" className="hover:text-white/70">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white/70">
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
}
