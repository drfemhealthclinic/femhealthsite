"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";

export default function PatientEducation() {
  const topics = [
    {
      icon: "cycle",
      title: "Understanding PCOS: Symptoms, Management, and Fertility",
    },
    {
      icon: "surgical",
      title: "What to Expect During a Laparoscopic Surgery",
    },
    {
      icon: "pregnancy",
      title: "High-Risk Pregnancy: Tips for a Safe and Healthy Journey",
    },
    {
      icon: "fertility",
      title: "When Should You Consult a Fertility Specialist?",
    },
  ];

  return (
    <section className="px-5 md:px-12 py-20 md:py-28 max-w-7xl mx-auto">
      <FadeIn direction="up">
        <div className="text-center mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#7B5A7E] font-bold">
            Learn &amp; Empower
          </span>
          <h2 className="text-3xl md:text-4xl font-serif-display text-[#4E3953]">
            Patient Education
          </h2>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
        {topics.map((topic, idx) => (
          <StaggerItem key={idx}>
            <motion.div
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-5 p-6 bg-white rounded-xl organic-shadow border border-[#CFC3CC]/20 hover:border-[#C0A8C9] transition-all duration-300 group h-full"
            >
              <div className="w-12 h-12 rounded-full bg-[#F3EEF5] flex items-center justify-center text-[#7B5A7E] shrink-0 group-hover:bg-[#7B5A7E] group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                  {topic.icon === "cycle" ? "cycle" :
                   topic.icon === "surgical" ? "healing" :
                   topic.icon === "pregnancy" ? "pregnant_woman" :
                   "family_restroom"}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-[#4E3953] group-hover:text-[#7B5A7E] transition-colors leading-snug">
                  {topic.title}
                </h3>
                <p className="text-xs text-[#878787] mt-1.5 uppercase tracking-wider font-medium">
                  Coming Soon
                </p>
              </div>
              <span className="material-symbols-outlined text-[#C0A8C9] group-hover:text-[#7B5A7E] group-hover:translate-x-1 transition-all duration-300 mt-1">
                arrow_forward
              </span>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
