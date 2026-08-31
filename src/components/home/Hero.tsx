"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/Motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FDFBFC] flex items-center">
      {/* Background organic floating shapes */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C0A8C9] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E898A8] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"
      />

      <div className="relative w-full max-w-7xl mx-auto px-5 md:px-12 pt-6 pb-12 md:pt-10 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left column: Text content */}
          <div className="space-y-8 md:space-y-10">
            {/* Top: Doctor Name + Credentials */}
            <FadeIn direction="down" delay={0.1}>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-px bg-[#D46789]" />
                  <span className="text-xs font-bold tracking-wider text-[#7B5A7E] uppercase">
                    Dr. Pooja Wadgaonkar Patil
                  </span>
                </div>
                <span className="hidden sm:inline text-[#CFC3CC]">•</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {["MBBS", "MS OBGY", "FMAS", "DNB"].map((cred) => (
                    <span
                      key={cred}
                      className="px-2.5 py-0.5 rounded-full border border-[#C0A8C9]/40 bg-white/80 backdrop-blur-sm text-[10px] font-bold tracking-wider text-[#7B5A7E] uppercase shadow-xs"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Center: Giant editorial headline */}
            <FadeIn direction="up" delay={0.2}>
              <div className="max-w-2xl">
                <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-serif-display text-[#4E3953] leading-[1.05] font-semibold tracking-tight">
                  Compassionate,{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">Evidence-Based</span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.8, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
                      className="absolute bottom-0 md:bottom-1 left-0 h-1 md:h-1.5 bg-[#E898A8]/60 rounded-full pointer-events-none"
                    />
                  </span>
                  ,<br className="hidden md:block" /> Ethical Healthcare{" "}
                  <span className="text-[#7B5A7E]">for Women</span>
                </h1>
              </div>
            </FadeIn>

            {/* Bottom row: Subtitle + CTAs */}
            <div className="space-y-6">
              <FadeIn direction="up" delay={0.3}>
                <p className="text-lg md:text-xl text-[#464647] max-w-lg leading-relaxed font-light">
                  Advanced Maternity, Gynaecological Care, Minimal Access
                  Laparoscopic Surgery &amp; Complete Infertility Solutions.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.35}>
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-12 h-12 rounded-full bg-[#F3EEF5] border border-[#C0A8C9]/30 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#7B5A7E] text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4E3953]">
                      Dr. Pooja Wadgaonkar Patil
                    </p>
                    <p className="text-xs text-[#878787]">
                      Consultant Gynaecologist &amp; Laparoscopic Surgeon
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/contact#book"
                      className="group relative bg-[#7B5A7E] text-white px-10 py-5 rounded-lg text-xs font-semibold tracking-widest uppercase overflow-hidden text-center transition-all duration-300 hover:shadow-lg hover:shadow-[#7B5A7E]/25 block"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-base">calendar_today</span>
                        Book an Appointment
                      </span>
                      <span className="absolute inset-0 bg-[#4E3953] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/contact"
                      className="group flex items-center justify-center gap-2 border border-[#7B5A7E]/30 text-[#7B5A7E] px-10 py-5 rounded-lg text-xs font-semibold tracking-widest uppercase hover:border-[#7B5A7E] hover:bg-[#F3EEF5] transition-all duration-300 text-center block"
                    >
                      <span className="material-symbols-outlined text-base">videocam</span>
                      Consult Online
                    </Link>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Right column: Doctor photo */}
          <FadeIn direction="right" delay={0.3}>
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg">
                {/* Decorative background shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C0A8C9]/20 to-[#E898A8]/20 rounded-3xl -rotate-3 scale-105" />
                {/* Photo container */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#7B5A7E]/10 aspect-[3/4]">
                  <Image
                    src="/doctorphoto.jpg"
                    alt="Dr. Pooja Wadgaonkar Patil - Consultant Gynaecologist and Laparoscopic Surgeon"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
