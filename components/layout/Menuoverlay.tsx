"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Careers", href: "/careers" },
  { label: "Internships", href: "/internships" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us" },
];

const STATS = [
  { value: "500+", label: "Worldwide Projects" },
  { value: "12+", label: "Industries" },
  { value: "50+", label: "Workforce" },
];

const PARTNER_LOGOS = [
  { name: "Greydesk", src: "/images/partners/greydesk.svg" },
  { name: "Stak CMS", src: "/images/partners/stak-cms.svg" },
];

const SOCIAL_LINKS = [
  { Icon: FaFacebookF, href: "https://www.facebook.com/", label: "Facebook" },
  { Icon: FaLinkedinIn, href: "https://www.linkedin.com/", label: "LinkedIn" },
  { Icon: FaInstagram, href: "https://www.instagram.com/", label: "Instagram" },
  { Icon: FaYoutube, href: "https://www.youtube.com/", label: "YouTube" },
];

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-black px-6 py-6 text-white md:px-10 lg:px-16">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-extrabold">Konceptslab</span>
        <button
          onClick={onClose}
          className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-transform duration-200 hover:scale-105"
        >
          Close
        </button>
      </div>

      <div className="mt-16 flex flex-1 flex-col justify-between gap-16 lg:flex-row">
        <nav className="flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-3xl font-semibold text-white/90 transition-colors duration-200 hover:text-white md:text-4xl"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-8 lg:max-w-md">
          <div className="flex gap-4">
            {PARTNER_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="flex h-24 w-40 items-center justify-center rounded-2xl bg-white"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={40}
                  className="h-auto w-28 object-contain"
                />
              </div>
            ))}
          </div>

          <div>
            <a
              href="/contact-us"
              className="inline-block rounded-full bg-[#E0201E] px-8 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-105"
            >
              Connect with Experts
            </a>
            <p className="mt-4 text-white/70">
              Ready to start a project? Let&apos;s work together.
            </p>
            <a
              href="mailto:hello@konceptslab.com"
              className="mt-1 block font-medium text-white"
            >
              hello@konceptslab.com
            </a>
          </div>

          <div className="flex gap-3">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 transition-colors duration-200 hover:border-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <div className="flex gap-10 border-t border-white/20 pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white/90">{stat.value}</p>
                <p className="text-sm text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
