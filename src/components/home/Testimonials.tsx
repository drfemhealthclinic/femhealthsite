"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";

export default function Testimonials() {
  const stories = [
    {
      quote:
        "Dr. Pooja provided exceptional care throughout my high-risk pregnancy. Her calm demeanor, clear guidance, and clinical expertise gave my entire family peace of mind.",
      role: "Maternity Patient",
      stars: 5,
      color: "#D46789",
    },
    {
      quote:
        "The laparoscopic procedure was minimally invasive with a very smooth recovery. I appreciated the thorough pre-op counseling and attentive post-operative follow-up.",
      role: "Surgery Patient",
      stars: 5,
      color: "#7B5A7E",
    },
    {
      quote:
        "Dr. Pooja\u2019s individualized fertility approach was both compassionate and transparent. Her empathetic counseling made a stressful journey feel hopeful.",
      role: "Fertility Patient",
      stars: 5,
      color: "#C0A8C9",
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
          <StaggerItem key={story.role}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl organic-shadow border border-[#CFC3CC]/30 relative flex flex-col justify-between group hover:border-[#C0A8C9] transition-all duration-300 h-full overflow-hidden"
              style={{ background: `linear-gradient(180deg, ${story.color}14 0%, #FFFFFF 45%)` }}
            >

              <div className="p-8 pt-10 flex flex-col flex-1">
                {/* Quote icon */}
                <span
                  className="material-symbols-outlined text-[#C0A8C9]/30 text-5xl mb-4 inline-block self-start"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  format_quote
                </span>

                {/* Quote text */}
                <p className="text-sm text-[#464647] leading-relaxed italic mb-6 flex-1">
                  &ldquo;{story.quote}&rdquo;
                </p>

                {/* Star rating */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: story.stars }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-sm"
                      style={{ color: story.color, fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>

                {/* Attribution */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#CFC3CC]/30">
                  <div className="relative shrink-0">
                    <div
                      className="absolute -inset-1.5 rounded-full blur-lg opacity-40"
                      style={{ backgroundColor: story.color }}
                    />
                    <div
                      className="relative w-10 h-10 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: story.color }}
                    >
                      <span
                        className="material-symbols-outlined text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        person
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4E3953]">{story.role}</p>
                    <p className="text-[11px] text-[#878787] uppercase tracking-wider">Patient Story</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
