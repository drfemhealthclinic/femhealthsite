"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/Motion";

const HIGHLIGHTS = [
  {
    num: "01",
    title: "Obstetrics",
    desc: "Complete Pregnancy & High-Risk Maternity Care",
    icon: "pregnant_woman",
    image: "/IMG_4214.PNG",
    imageAlt: "Obstetrics and high-risk pregnancy care by Dr. Pooja Wadgaonkar Patil in Hinjawadi Pune",
  },
  {
    num: "02",
    title: "Laparoscopy",
    desc: "Scarless, Fast-Recovery Surgical Solutions",
    icon: "healing",
    image: "/IMG_4215.JPG",
    imageAlt: "Laparoscopic minimally invasive gynaecological surgery by Dr. Pooja Patil Hinjewadi Pune",
  },
  {
    num: "03",
    title: "Infertility",
    desc: "Personalised Conception Plans & Fertility Enhancement",
    icon: "family_restroom",
    image: "/infertility.webp",
    imageAlt: "Infertility evaluation and personalised conception care by Dr. Pooja Patil Hinjawadi Pune",
  },
  {
    num: "04",
    title: "Preventive Care",
    desc: "Routine Gynaecological Check-ups & Cancer Screenings",
    icon: "health_and_safety",
    image: "/preventive.jpg",
    imageAlt: "Preventive gynaecology checkups and cancer screening by Dr. Pooja Patil Hinjewadi Pune",
  },
  {
    num: "05",
    title: "Lifestyle and Endocrine Disorders Management",
    desc: "Holistic, sustainable care for PCOS, hormonal balance, and metabolic health",
    icon: "spa",
    image: "/IMG_4219.JPG",
    imageAlt: "PCOS and hormonal endocrine disorder management by Dr. Pooja Patil Hinjawadi Pune",
  },
];

interface CardProps {
  item: (typeof HIGHLIGHTS)[number];
  className?: string;
  heightClass?: string;
}

function HighlightCard({
  item,
  className = "",
  heightClass = "h-[380px] md:h-[420px]",
}: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-3xl border border-[#CFC3CC]/40 bg-[#231726] text-white organic-shadow hover:border-[#D46789]/40 hover:shadow-xl transition-all duration-300 ${heightClass} ${className}`}
    >
      {/* Edge-to-edge photo filling exact card area naturally without extreme zoom */}
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#231726]/90 via-[#231726]/30 to-transparent" />

      {/* Top row: icon */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-end p-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white">
          <span className="material-symbols-outlined text-base">{item.icon}</span>
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7">
        <div className="space-y-2">
          <span className="block w-10 h-[3px] bg-white/70 rounded-full transition-colors group-hover:bg-[#E898A8]" />
          <h3 className="font-serif-display font-bold text-white text-xl sm:text-2xl leading-tight transition-colors group-hover:text-[#F3EEF5]">
            {item.title}
          </h3>
          <p className="text-white/90 font-light text-xs sm:text-sm leading-relaxed max-w-md">
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Highlights() {
  const [obstetrics, laparoscopy, infertility, preventive, lifestyle] = HIGHLIGHTS;
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.max(0, Math.min(1, el.scrollLeft / maxScroll)));
    }
  };

  return (
    <section className="py-12 md:py-28 px-5 md:px-12 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <FadeIn direction="up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#CFC3CC]/30">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#D46789] uppercase block">
              Clinical Focus
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display text-[#4E3953] font-semibold leading-tight">
              Core Key Highlights
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#878787] font-light max-w-md md:text-right">
            Dr. Pooja Wadgaonkar Patil’s core clinical specializations and patient care focus.
          </p>
        </div>
      </FadeIn>

      {/* Mobile Swipe Strip: All 5 cards in 1 smooth swipe row */}
      <div className="md:hidden space-y-3">
        <div
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-5 px-5 pb-2 gap-4"
        >
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="w-[82vw] sm:w-[50vw] shrink-0 snap-center">
              <HighlightCard item={item} heightClass="h-[380px]" />
            </div>
          ))}
        </div>

        {/* Apple-style Progress Indicator */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="w-24 h-1 bg-[#CFC3CC]/30 rounded-full overflow-hidden relative">
            <div
              className="absolute top-0 bottom-0 bg-[#D46789] rounded-full transition-all duration-75"
              style={{
                width: "20%",
                left: `${scrollProgress * 80}%`,
              }}
            />
          </div>
          <span className="text-[11px] font-medium text-[#7B5A7E] tracking-wider">
            {Math.min(5, Math.floor(scrollProgress * 4.99) + 1)} of 5
          </span>
        </div>
      </div>

      {/* Desktop & Tablet: Balanced 3 + 2 Grid */}
      <div className="hidden md:block space-y-6">
        {/* Row 1: 3 equal portrait-proportional cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn direction="up">
            <HighlightCard item={infertility} heightClass="h-[380px] md:h-[430px]" />
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <HighlightCard item={obstetrics} heightClass="h-[380px] md:h-[430px]" />
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <HighlightCard item={laparoscopy} heightClass="h-[380px] md:h-[430px]" />
          </FadeIn>
        </div>

        {/* Row 2: 2 equal landscape-proportional cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeIn direction="up">
            <HighlightCard item={preventive} heightClass="h-[300px] md:h-[350px]" />
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <HighlightCard item={lifestyle} heightClass="h-[300px] md:h-[350px]" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
