"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";

export default function Testimonials() {
  const stories = [
    {
      quote:
        "Dr. Pooja provided exceptional care throughout my high-risk pregnancy. Her calm demeanor, clear guidance, and clinical expertise gave my entire family peace of mind.",
      attribution: "\u2014 Maternity Patient",
    },
    {
      quote:
        "The laparoscopic procedure was minimally invasive with a very smooth recovery. I appreciated the thorough pre-op counseling and attentive post-operative follow-up.",
      attribution: "\u2014 Surgery Patient",
    },
    {
      quote:
        "Dr. Pooja\u2019s individualized fertility approach was both compassionate and transparent. Her empathetic counseling made a stressful journey feel hopeful.",
      attribution: "\u2014 Fertility Patient",
    },
  ];

  return (
    <section className="px-5 md:px-12 py-20 md:py-28 max-w-7xl mx-auto bg-[#F5F3F4] rounded-3xl my-12 border border-[#CFC3CC]/30 overflow-hidden">
      <FadeIn direction="up">
        <div className="text-center mb-14 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#7B5A7E] font-bold">
            Kind Words
          </span>
          <h2 className="text-3xl md:text-4xl font-serif-display text-[#4E3953]">
            Patient Stories
          </h2>
        </div>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
        {stories.map((story) => (
          <StaggerItem key={story.attribution}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="bg-white p-8 rounded-xl organic-shadow border border-[#CFC3CC]/30 relative flex flex-col justify-between group hover:border-[#C0A8C9] transition-colors h-full"
            >
              <motion.span
                initial={{ rotate: 0 }}
                whileHover={{ rotate: -8, scale: 1.1 }}
                className="material-symbols-outlined text-[#C0A8C9] opacity-60 text-4xl mb-4 inline-block"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                format_quote
              </motion.span>
              <p className="text-sm text-[#464647] leading-relaxed italic mb-6">
                &ldquo;{story.quote}&rdquo;
              </p>
              <p className="text-xs font-bold text-[#7B5A7E] uppercase tracking-wider">
                {story.attribution}
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
