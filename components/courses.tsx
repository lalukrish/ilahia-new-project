"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface Program {
  name: string;
}

interface ProgramsSectionProps {
  heading?: string;
  ugPrograms?: Program[];
  pgPrograms?: Program[];
}

const DEFAULT_UG: Program[] = [
  { name: "BBA (Hons.) (AICTE Approved)" },
  { name: "BCA (Hons.) (AICTE Approved)" },
  { name: "B.A. (Hons.) Economics" },
  { name: "B.A. (Hons.) English" },
  { name: "B.Com (Hons.) Accounting" },
  { name: "B.Com (Hons.) Finance and Taxation" },
  { name: "B.Com (Hons.) Logistics Management" },
  { name: "B.Sc. (Hons.) Psychology" },
  { name: "B.Sc. (Hons.) Cyber Forensic" },
  { name: "B.Sc. (Hons.) Computer Science" },
];

const DEFAULT_PG: Program[] = [
  { name: "M.Sc. Computer Science" },
  { name: "M.Com Finance" },
  { name: "M.A. English" },
  { name: "B.Lib.I.Sc" },
  { name: "M.Sc. Psychology" },
  { name: "M.Sc. Cyber Forensic" },
  { name: "Master of Social Work (MSW)" },
];

export default function ProgramsSection({
  heading = "Explore Our Futuristic Programmes",
  ugPrograms = DEFAULT_UG,
  pgPrograms = DEFAULT_PG,
}: ProgramsSectionProps) {
  const [activeTab, setActiveTab] = useState<"UG" | "PG">("UG");
  const active = activeTab === "UG" ? ugPrograms : pgPrograms;

  return (
    <div className="px-6 py-16 md:px-10 lg:px-20">
      <h2 className="mb-8 text-center text-3xl font-bold text-[#0f2027] md:text-4xl">
        {heading}
      </h2>

      <div
        className="rounded-2xl p-6 md:p-10 border-2 border-[#16394a]"
        style={{
          background:
            "linear-gradient(160deg, rgba(0,0,0,0.9) 0%, rgba(15,32,39,0.95) 45%, rgba(44,83,100,0.9) 100%)",
        }}
      >
        {/* pill toggle — centered */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex gap-2 rounded-full bg-white/10 p-1.5">
            {(["UG", "PG"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  activeTab === tab
                    ? "bg-white text-[#0f2027]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {tab} Programs
              </button>
            ))}
          </div>
        </div>

        {/* course boxes — teal bg, white text */}
        <div
          key={activeTab}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{ animation: "fadeIn 0.3s ease-out" }}
        >
          {active.map((program) => (
            <div
              key={program.name}
              className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "rgba(0,0,0,0.35)" }}
            >
              <span className="text-sm font-medium text-white md:text-base">
                {program.name}
              </span>
              <ChevronRight
                size={18}
                className="shrink-0 text-white/80 transition-transform duration-200 group-hover:translate-x-1"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
