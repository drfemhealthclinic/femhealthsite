"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";

export default function WhyChoose() {
  const pillars = [
    {
      icon: "favorite",
      title: "Patient-Centric Approach",
      desc: "Warm, non-judgmental environment focused on clear communication and empathetic listening.",
      color: "#D46789",
    },
    {
      icon: "biotech",
      title: "Advanced Surgical Tech",
      desc: "Minimal scarring, shorter hospital stays, and quick return to daily routine via minimally invasive techniques.",
      color: "#7B5A7E",
    },
    {
      icon: "child_care",
      title: "Tailored Fertility Pathways",
      desc: "Individualized treatment protocols instead of \u201cone-size-fits-all\u201d solutions.",
      color: "#C0A8C9",
    },
    {
      icon: "self_improvement",
      title: "Holistic Continuum of Care",
      desc: "From pre-conception through delivery and surgical recovery.",
      color: "#B08AB0",
    },
  ];

  return (
    <section className="px-5 md:px-12 py-20 md:py-28 max-w-7xl mx-auto bg-gradient-to-b from-[#FDFBFC] to-[#F5F3F4] rounded-3xl my-12">
      <FadeIn direction="up">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#7B5A7E] font-bold">
            Our Patient Promise
          </span>
          <h2 className="text-3xl md:text-4xl font-serif-display text-[#4E3953]">
            Why Patients Trust Us
          </h2>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pillars.map((pillar, i) => (
          <StaggerItem key={pillar.title}>
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className="text-center space-y-4 p-6 rounded-xl organic-shadow border border-[#CFC3CC]/20 hover:border-[#C0A8C9] transition-all duration-300 group h-full relative overflow-hidden"
              style={{ background: `linear-gradient(180deg, ${pillar.color}14 0%, #FFFFFF 45%)` }}
            >

              {/* Numbered indicator */}
              <span
                className="absolute top-4 right-4 text-[10px] font-bold tracking-wider opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ color: pillar.color }}
              >
                0{i + 1}
              </span>

              <div className="relative mx-auto w-fit">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-2xl opacity-25"
                  style={{ backgroundColor: pillar.color }}
                />
                <div
                  className="relative w-16 h-16 bg-[#F3EEF5] rounded-full flex items-center justify-center text-[#D46789] group-hover:text-white transition-colors duration-300 z-10"
                  style={{ "--tw-shadow": `0 0 0 0 ${pillar.color}00`, "--tw-shadow-colored": `0 0 0 0 ${pillar.color}00` } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = pillar.color;
                    e.currentTarget.style.boxShadow = `0 8px 24px ${pillar.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {pillar.icon}
                </span>
                </div>
              </div>
              <h3 className="text-lg font-serif-display font-semibold text-[#4E3953] relative z-10">
                {pillar.title}
              </h3>
              <p className="text-sm text-[#464647] leading-relaxed relative z-10">
                {pillar.desc}
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
