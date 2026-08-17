"use client";

import { useState } from "react";

interface FeatureItem {
  title: string;
  description: string;
  image: string;
}

interface WhyChooseSectionProps {
  items?: FeatureItem[];
}

const DEFAULT_ITEMS: FeatureItem[] = [
  {
    title: "Reliability",
    description:
      "Consistent academic delivery and campus operations you can count on, year after year.",
    image: "/test4.jpg",
  },
  {
    title: "Security",
    description:
      "24x7 campus surveillance and secure hostel access, keeping students safe on and off class hours.",
    image: "/test5.jpg",
  },
  {
    title: "Expert core",
    description:
      "Faculty drawn from industry and research backgrounds, engineered into every course's DNA.",
    image: "/test6.jpg",
  },
  {
    title: "Functionality",
    description:
      "Labs, libraries, and digital tools that actually work the way students need them to.",
    image: "/kathakali.jpg",
  },
];

export default function WhyChooseSection({
  items = DEFAULT_ITEMS,
}: WhyChooseSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  return (
    <div className="px-6 py-16 md:px-10 lg:px-20">
      <div className="relative mx-auto max-w-7xl">
        <h2 className="mb-10 text-3xl font-bold text-[#0f2027] md:text-4xl">
          Why Choose Ilahia
        </h2>

        {/* image — fixed on right, swaps per hovered item */}
        <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[260px] w-[380px] -translate-y-1/2 overflow-hidden rounded-2xl bg-black/5 shadow-md md:block">
          {items.map((item, i) => (
            <img
              key={item.title}
              src={item.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-400"
              style={{ opacity: i === activeIndex ? 1 : 0 }}
            />
          ))}
        </div>

        <div>
          {items.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={item.title}
                onMouseEnter={() => setActiveIndex(i)}
                className="cursor-pointer border-t border-black/10 py-6 transition-colors last:border-b md:pr-[420px]"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-10">
                  <h3
                    className={`text-3xl font-normal transition-colors duration-300 md:text-4xl ${
                      isActive ? "text-black" : "text-black/35"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="max-w-md text-sm text-black/55 transition-all duration-300 md:text-base"
                    style={{
                      opacity: isActive ? 1 : 0,
                      maxHeight: isActive ? "100px" : "0px",
                      overflow: "hidden",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
