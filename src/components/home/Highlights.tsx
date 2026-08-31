"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/Motion";

const HIGHLIGHTS = [
  {
    num: "01",
    title: "Obstetrics",
    desc: "Complete Pregnancy & High-Risk Maternity Care",
    icon: "pregnant_woman",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Obstetrics - Complete Pregnancy & High-Risk Maternity Care",
  },
  {
    num: "02",
    title: "Laparoscopy",
    desc: "Scarless, Fast-Recovery Surgical Solutions",
    icon: "healing",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Laparoscopy - Scarless, Fast-Recovery Surgical Solutions",
  },
  {
    num: "03",
    title: "Infertility",
    desc: "Personalised Conception Plans & Fertility Enhancement",
    icon: "family_restroom",
    image:
      "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Infertility - Personalised Conception Plans & Fertility Enhancement",
  },
  {
    num: "04",
    title: "Preventive Care",
    desc: "Routine Gynaecological Check-ups & Cancer Screenings",
    icon: "health_and_safety",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Preventive Care - Routine Gynaecological Check-ups & Cancer Screenings",
  },
  {
    num: "05",
    title: "Lifestyle and Endocrine Disorders Management",
    desc: "Holistic, sustainable care for PCOS, hormonal balance, and metabolic health",
    icon: "spa",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Lifestyle and Endocrine Disorders Management",
  },
];

interface CardProps {
  item: (typeof HIGHLIGHTS)[number];
  className?: string;
  heightClass?: string;
  contentWidth?: string;
  featured?: boolean;
}

function HighlightCard({
  item,
  className = "",
  heightClass = "",
  contentWidth = "max-w-md",
  featured = false,
}: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group relative h-80 md:h-[420px] overflow-hidden rounded-3xl border border-[#CFC3CC]/40 bg-white text-white organic-shadow hover:organic-shadow-hover ${heightClass} ${className}`}
    >
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#2E1E32]/85 via-[#4E3953]/20 to-transparent" />

      {/* Top row: numeral + icon */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between p-6">
        <span className="text-xs font-mono font-bold tracking-[0.3em] text-white/90 drop-shadow">
          {item.num}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white">
          <span className="material-symbols-outlined text-base">{item.icon}</span>
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7">
        <div className="space-y-2">
          <span className="block w-9 h-0.5 bg-white/70 transition-colors group-hover:bg-[#E6C2D6]" />
          <h3
            className={`font-serif-display font-bold text-white leading-tight transition-colors group-hover:text-[#F3EEF5] ${featured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl"
              }`}
          >
            {item.title}
          </h3>
          <p
            className={`text-white/90 font-light leading-relaxed ${contentWidth} ${featured ? "text-sm sm:text-base" : "text-xs sm:text-sm"
              }`}
          >
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Highlights() {
  const [obstetrics, laparoscopy, infertility, preventive, lifestyle] = HIGHLIGHTS;

  return (
    <section className="py-24 md:py-32 px-5 md:px-12 max-w-7xl mx-auto space-y-12 md:space-y-16">
      {/* Section Header */}
      <FadeIn direction="up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#CFC3CC]/30">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#D46789] uppercase block">
              Clinical Focus
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-display text-[#4E3953] font-semibold leading-tight">
              Core Key Highlights
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#878787] font-light max-w-md md:text-right">
            Dr. Pooja Wadgaonkar Patil’s core clinical specializations and patient care focus.
          </p>
        </div>
      </FadeIn>

      {/* Asymmetric Editorial Bento */}
      <div className="space-y-5 md:space-y-6">
        {/* Row 1: Infertility feature (7) + Obstetrics (5) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          <FadeIn direction="up" className="md:col-span-7">
            <HighlightCard
              item={infertility}
              featured
              heightClass="h-80 md:h-[420px]"
              contentWidth="max-w-lg"
            />
          </FadeIn>
          <FadeIn direction="up" delay={0.12} className="md:col-span-5">
            <HighlightCard item={obstetrics} heightClass="h-80 md:h-[420px]" />
          </FadeIn>
        </div>

        {/* Row 2: Laparoscopy (5) + Preventive (7) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          <FadeIn direction="up" className="md:col-span-5">
            <HighlightCard item={laparoscopy} heightClass="h-64 md:h-[300px]" />
          </FadeIn>
          <FadeIn direction="up" delay={0.12} className="md:col-span-7">
            <HighlightCard item={preventive} heightClass="h-64 md:h-[300px]" contentWidth="max-w-lg" />
          </FadeIn>
        </div>

        {/* Row 3: wide Lifestyle horizontal band */}
        <FadeIn direction="up" delay={0.1}>
          <HighlightCard
            item={lifestyle}
            heightClass="h-64 md:h-[320px]"
            contentWidth="max-w-xl"
          />
        </FadeIn>
      </div>
    </section>
  );
}
