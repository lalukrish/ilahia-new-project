import { GraduationCap, Building2 } from "lucide-react";

interface SalaryStat {
  students: number;
  package: string; // e.g. "30 L"
}

interface RecruiterLogo {
  name: string;
  logo: string; // image path
}

interface PlacementsSectionProps {
  heading?: string;
  subtext?: string;
  companyCount?: string;
  stats?: SalaryStat[];
  recruiters?: RecruiterLogo[];
  capIconCount?: number;
}

const DEFAULT_STATS: SalaryStat[] = [
  { students: 3, package: "30 L" },
  { students: 13, package: "20 L" },
  { students: 56, package: "10 L" },
  { students: 112, package: "7 L" },
  { students: 450, package: "4 L" },
];

const DEFAULT_RECRUITERS: RecruiterLogo[] = [
  { name: "Autodesk", logo: "/recruiters/autodesk.png" },
  { name: "Caterpillar", logo: "/recruiters/caterpillar.png" },
  { name: "Microsoft", logo: "/recruiters/microsoft.png" },
  { name: "XPayBack", logo: "/recruiters/xpayback.png" },
  { name: "Meta", logo: "/recruiters/meta.png" },
  { name: "Autodesk", logo: "/recruiters/autodesk.png" },
  { name: "Caterpillar", logo: "/recruiters/caterpillar.png" },
  { name: "Microsoft", logo: "/recruiters/microsoft.png" },
  { name: "XPayBack", logo: "/recruiters/xpayback.png" },
  { name: "Meta", logo: "/recruiters/meta.png" },
  { name: "Autodesk", logo: "/recruiters/autodesk.png" },
  { name: "Caterpillar", logo: "/recruiters/caterpillar.png" },
  { name: "Microsoft", logo: "/recruiters/microsoft.png" },
  { name: "XPayBack", logo: "/recruiters/xpayback.png" },
  { name: "Meta", logo: "/recruiters/meta.png" },
  { name: "Autodesk", logo: "/recruiters/autodesk.png" },
  { name: "Caterpillar", logo: "/recruiters/caterpillar.png" },
  { name: "Microsoft", logo: "/recruiters/microsoft.png" },
];

export default function PlacementsSection({
  heading = "Outstanding Facilities",
  subtext = "Sharing the glorious success of our 2024 batch who are placed in more than 120 top multinational companies. **We are so proud of them!**",
  companyCount = "120+",
  stats = DEFAULT_STATS,
  recruiters = DEFAULT_RECRUITERS,
  capIconCount = 7,
}: PlacementsSectionProps) {
  // splits subtext on ** markers so the closing phrase renders bold, matching ref
  const renderSubtext = (text: string) => {
    const parts = text.split("**");
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
    );
  };

  return (
    <div className="px-2 py-16 md:px-10 lg:px-20">
      {/* <h2 className="text-3xl font-bold text-[#0f2027] md:text-4xl">
        {heading}
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-black/65 md:text-base">
        {renderSubtext(subtext)}
      </p> */}

      {/* dark stat panel */}
      <div
        className="mt-8 rounded-2xl p-6 md:p-8"
        style={{
          background:
            "linear-gradient(160deg, #0f2027 0%, #142e3a 60%, #16394a 100%)",
        }}
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
          {/* left: big number badge */}
          <div
            className="flex shrink-0 flex-col items-start justify-center rounded-xl px-8 py-6 md:w-[220px]"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <span className="text-5xl font-extrabold text-[#f5b400] md:text-6xl">
              {companyCount}
            </span>
            <div className="mt-4 flex items-center gap-2 text-white">
              <Building2 size={20} />
              <span className="text-sm font-semibold md:text-base">
                Top Companies
              </span>
            </div>
          </div>

          {/* right: stat columns */}
          <div className="grid flex-1 grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-5">
            {stats.map((s) => (
              <div key={s.package} className="text-center">
                <p className="text-2xl font-bold text-white md:text-3xl">
                  {s.students}
                </p>
                <p className="text-xs text-white/60 md:text-sm">Students</p>
                <p className="mt-2 text-xl font-bold text-white md:text-2xl">
                  {s.package}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* decorative grad-cap row */}
        <div className="mt-8 flex justify-center gap-6 opacity-70 md:justify-end md:gap-8">
          {Array.from({ length: capIconCount }).map((_, i) => (
            <GraduationCap key={i} size={22} className="text-white/50" />
          ))}
        </div>
      </div>
    </div>
  );
}
