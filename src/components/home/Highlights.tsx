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
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Obstetrics - Complete Pregnancy & High-Risk Maternity Care",
  },
  {
    num: "02",
    title: "Laparoscopy",
    desc: "Scarless, Fast-Recovery Surgical Solutions",
    icon: "healing",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Laparoscopy - Scarless, Fast-Recovery Surgical Solutions",
  },
  {
    num: "03",
    title: "Infertility",
    desc: "Personalised Conception Plans & Fertility Enhancement",
    icon: "family_restroom",
    image:
      "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Infertility - Personalised Conception Plans & Fertility Enhancement",
  },
  {
    num: "04",
    title: "Preventive Care",
    desc: "Routine Gynaecological Check-ups & Cancer Screenings",
    icon: "health_and_safety",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
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

export default function Highlights() {
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

      {/* Luxury Editorial Asymmetrical Mosaic Grid */}
      <div className="space-y-6">
        {/* Top Row: 3 Vertical Editorial Image Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HIGHLIGHTS.slice(0, 3).map((item, idx) => (
            <FadeIn key={item.title} direction="up" delay={idx * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-lg border border-[#CFC3CC]/40 bg-[#4E3953] flex flex-col justify-between p-7 text-white"
              >
                {/* Background Image with Dark Vignette */}
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-45 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E1E32] via-[#4E3953]/60 to-transparent" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#E6C2D6]/80">
                    {item.num}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-[#D46789] group-hover:border-[#D46789] transition-all duration-300">
                    <span className="material-symbols-outlined text-lg">
                      {item.icon}
                    </span>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-white group-hover:text-[#F3EEF5] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom Row: 2 Horizontal Split Editorial Image Panels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 04: Preventive Care (5 columns on desktop) */}
          <FadeIn direction="up" delay={0.25} className="md:col-span-5">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative h-72 md:h-80 rounded-3xl overflow-hidden shadow-lg border border-[#CFC3CC]/40 bg-[#4E3953] flex flex-col justify-between p-7 text-white"
            >
              <Image
                src={HIGHLIGHTS[3].image}
                alt={HIGHLIGHTS[3].imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E1E32] via-[#4E3953]/60 to-transparent" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-[#E6C2D6]/80">
                  {HIGHLIGHTS[3].num}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-[#D46789] group-hover:border-[#D46789] transition-all duration-300">
                  <span className="material-symbols-outlined text-lg">
                    {HIGHLIGHTS[3].icon}
                  </span>
                </div>
              </div>

              <div className="relative z-10 space-y-2">
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-white leading-tight">
                  {HIGHLIGHTS[3].title}
                </h3>
                <p className="text-xs sm:text-sm text-white/85 font-light leading-relaxed">
                  {HIGHLIGHTS[3].desc}
                </p>
              </div>
            </motion.div>
          </FadeIn>

          {/* 05: Lifestyle & Endocrine (7 columns on desktop) */}
          <FadeIn direction="up" delay={0.3} className="md:col-span-7">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative h-72 md:h-80 rounded-3xl overflow-hidden shadow-lg border border-[#CFC3CC]/40 bg-[#4E3953] flex flex-col justify-between p-7 sm:p-8 text-white"
            >
              <Image
                src={HIGHLIGHTS[4].image}
                alt={HIGHLIGHTS[4].imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#2E1E32] via-[#4E3953]/70 to-transparent" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-[#E6C2D6]/80">
                  {HIGHLIGHTS[4].num}
                </span>
                <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-[#D46789] group-hover:border-[#D46789] transition-all duration-300">
                  <span className="material-symbols-outlined text-lg">
                    {HIGHLIGHTS[4].icon}
                  </span>
                </div>
              </div>

              <div className="relative z-10 max-w-lg space-y-2">
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-white leading-tight">
                  {HIGHLIGHTS[4].title}
                </h3>
                <p className="text-xs sm:text-sm text-white/85 font-light leading-relaxed">
                  {HIGHLIGHTS[4].desc}
                </p>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
