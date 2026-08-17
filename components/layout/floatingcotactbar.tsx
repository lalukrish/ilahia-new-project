"use client";

import { Menu } from "lucide-react";

interface FloatingContactBarProps {
  onClick: () => void;
}

export default function FloatingContactBar({
  onClick,
}: FloatingContactBarProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 left-1/2 z-40 flex -translate-x-1/2 items-center gap-6 rounded-full bg-black/70 py-2 pl-6 pr-2 text-white backdrop-blur-sm transition-transform duration-200 hover:scale-105"
    >
      <span className="text-sm font-medium">Tell us about your needs</span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
        <Menu size={16} />
      </span>
    </button>
  );
}
