"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";

export default function Highlights() {
  const highlights = [
    {
      num: "01",
      title: "Obstetrics",
      desc: "Complete Pregnancy & High-Risk Maternity Care",
      icon: "pregnant_woman",
    },
    {
      num: "02",
      title: "Laparoscopy",
      desc: "Scarless, Fast-Recovery Surgical Solutions",
      icon: "healing",
    },
    {
      num: "03",
      title: "Infertility",
      desc: "Personalised Conception Plans & Fertility Enhancement",
      icon: "family_restroom",
    },
    {
      num: "04",
      title: "Preventive Care",
      desc: "Routine Gynaecological Check-ups & Cancer Screenings",
      icon: "health_and_safety",
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      <FadeIn direction="up">
        <div className="mb-16 md:mb-20 space-y-3">
          <span className="text-xs font-semibold tracking-widest text-[#7B5A7E] uppercase block">
            Clinical Focus
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-display text-[#4E3953] font-semibold">
            Core Key Highlights
          </h2>
        </div>
      </FadeIn>

      {/* Asymmetric 2+2 Grid for the four items with scroll stagger */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E0EB] rounded-xl overflow-hidden border border-[#E8E0EB]">
        {highlights.map((item) => (
          <StaggerItem key={item.num}>
            <motion.div
              whileHover={{ backgroundColor: "#F7F4F7" }}
              className="bg-[#FDFBFC] p-8 md:p-10 lg:p-12 flex flex-col gap-8 group transition-colors duration-300 h-full"
            >
              <div className="flex justify-between items-start">
                <span className="text-sm font-bold tracking-widest text-[#C0A8C9] group-hover:text-[#7B5A7E] transition-colors">
                  {item.num}
                </span>
                <span
                  className="material-symbols-outlined text-[#7B5A7E]/70 text-2xl group-hover:text-[#7B5A7E] group-hover:scale-110 transition-all duration-300"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  {item.icon}
                </span>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-serif-display font-semibold text-[#4E3953] mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-[#464647] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* 5th Item: Full-Width Feature Row */}
      <FadeIn direction="up" delay={0.2} className="mt-6">
        <motion.div
          whileHover={{ borderColor: "#C0A8C9" }}
          className="bg-[#F3EEF5]/60 border border-[#E8E0EB] p-8 md:p-10 lg:p-12 rounded-xl flex flex-col md:flex-row md:items-center gap-6 group transition-all duration-300"
        >
          <div className="flex items-center gap-6 flex-1">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#7B5A7E] shrink-0 border border-[#E8E0EB] group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-xl">spa</span>
            </div>
            <div>
              <span className="text-sm font-bold tracking-widest text-[#C0A8C9] block mb-1">05</span>
              <h3 className="text-2xl md:text-3xl font-serif-display font-semibold text-[#4E3953]">
                Lifestyle and Endocrine Disorders Management
              </h3>
            </div>
          </div>
        </motion.div>
      </FadeIn>
    </section>
  );
}
