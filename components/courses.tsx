"use client";

import { useRef, useState } from "react";
import { ChevronRight, GraduationCap, BookOpen } from "lucide-react";
import SectionCta from "@/commonComponents/SectionCta";

interface Program {
  name: string;
}

interface ProgramsSectionProps {
  heading?: string;
  ugPrograms?: Program[];
  pgPrograms?: Program[];
  ugImage?: string;
  pgImage?: string;
  onVisitCourses?: () => void;
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
  ugImage = "/testim1.png",
  pgImage = "/testim2.png",
  onVisitCourses = () => {},
}: ProgramsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null); // this section IS the CTA's trigger now

  const [activeTab, setActiveTab] = useState<"UG" | "PG">("UG");
  const active = activeTab === "UG" ? ugPrograms : pgPrograms;

  return (
    <div ref={sectionRef} className="px-2 py-16 md:px-10 lg:px-20">
      <h2 className="mb-8 text-center text-3xl font-bold text-[#0f2027] md:text-4xl">
        {heading}
      </h2>
      <SectionCta
        triggerRef={sectionRef}
        label="Visit All Courses"
        icon="arrow"
        // onClick={onVisitCourses}
        start="top 90%"
        end="bottom 10%"
      />
      <div className="overflow-hidden rounded-2xl  bg-cyan-900">
        <div className="grid grid-cols-1 lg:grid-cols-[38%_62%]">
          {/* left: decorative image, crossfades per tab, icon badge floats on top */}
          <div className="relative hidden min-h-[420px] overflow-hidden lg:block">
            <img
              src={ugImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
              style={{ opacity: activeTab === "UG" ? 1 : 0 }}
            />
            <img
              src={pgImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
              style={{ opacity: activeTab === "PG" ? 1 : 0 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 60%)",
              }}
            />

            {/* floating icon badge — swaps shape + spins in on tab change */}
            <div
              key={activeTab}
              className="absolute bottom-6 left-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md"
              style={{ animation: "badgeIn 0.4s ease-out" }}
            >
              {activeTab === "UG" ? (
                <GraduationCap size={28} className="text-white" />
              ) : (
                <BookOpen size={28} className="text-white" />
              )}
            </div>

            <p className="absolute bottom-6 left-28 right-6 text-sm font-medium text-white/90">
              {activeTab === "UG"
                ? "Undergraduate programmes built for a head-start in your field."
                : "Postgraduate programmes for deeper specialization and research."}
            </p>
          </div>

          {/* right: toggle + course boxes */}
          <div className="p-6 md:p-10">
            <div className="mb-8 flex justify-center lg:justify-start">
              <div className="inline-flex gap-2 rounded-full bg-white/10 p-1.5">
                {(["UG", "PG"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      console.log("clicked", tab);
                      setActiveTab(tab);
                    }}
                    className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                      activeTab === tab
                        ? "bg-white text-[#0f2027]"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {tab === "UG" ? (
                      <GraduationCap size={16} />
                    ) : (
                      <BookOpen size={16} />
                    )}
                    {tab} Programs
                  </button>
                ))}
              </div>
            </div>

            <div
              key={activeTab}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              style={{ animation: "fadeIn 0.3s ease-out" }}
            >
              {active.map((program) => (
                <div
                  key={program.name}
                  className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: "rgba(0,0,0,0.15)" }}
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
        @keyframes badgeIn {
          from {
            opacity: 0;
            transform: scale(0.6) rotate(-20deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}
