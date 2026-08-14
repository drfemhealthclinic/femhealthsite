"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";

export default function WhyChoose() {
  const pillars = [
    {
      icon: "favorite",
      title: "Patient-Centric Approach",
      desc: "Warm, non-judgmental environment focused on clear communication and empathetic listening.",
    },
    {
      icon: "biotech",
      title: "Advanced Surgical Tech",
      desc: "Minimal scarring, shorter hospital stays, and quick return to daily routine via minimally invasive techniques.",
    },
    {
      icon: "child_care",
      title: "Tailored Fertility Pathways",
      desc: "Individualized treatment protocols instead of \u201cone-size-fits-all\u201d solutions.",
    },
    {
      icon: "self_improvement",
      title: "Holistic Continuum of Care",
      desc: "From pre-conception through delivery and surgical recovery.",
    },
  ];

  return (
    <section className="px-5 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
      <FadeIn direction="up">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#7B5A7E] font-bold">
            Our Patient Promise
          </span>
          <h2 className="text-3xl md:text-4xl font-serif-display text-[#4E3953]">
            Why Choose This Clinic
          </h2>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pillars.map((pillar) => (
          <StaggerItem key={pillar.title}>
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className="text-center space-y-4 p-6 rounded-xl bg-white organic-shadow border border-[#CFC3CC]/20 hover:border-[#C0A8C9] transition-all duration-300 group h-full"
            >
              <div className="w-16 h-16 bg-[#F3EEF5] rounded-full flex items-center justify-center mx-auto text-[#D46789] group-hover:bg-[#D46789] group-hover:text-white transition-colors duration-300">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {pillar.icon}
                </span>
              </div>
              <h3 className="text-lg font-serif-display font-semibold text-[#4E3953]">
                {pillar.title}
              </h3>
              <p className="text-sm text-[#464647] leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
