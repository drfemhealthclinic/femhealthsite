"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/Motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden flex items-center bg-[#FEFCFD]">
      {/* Background organic floating shapes from pushed code */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.12, 0.20, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#D4A0C0] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.14, 0.22, 0.14],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E898A8] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"
      />

      {/* ── Main Hero Content ────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 pt-8 pb-14 md:pt-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline & Clinical Actions (6 cols) */}
          <div className="lg:col-span-6 space-y-8 md:space-y-10">
            {/* Doctor Name + Credentials */}
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

            {/* Giant Editorial Headline */}
            <FadeIn direction="up" delay={0.2}>
              <div className="max-w-2xl">
                <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-serif-display text-[#4E3953] leading-[1.05] font-semibold tracking-tight">
                  Compassionate,{" "}
                  <span className="relative inline-block pb-2 sm:pb-2.5 md:pb-3">
                    <span className="relative z-10">Evidence-Based</span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 1.8,
                        delay: 0.5,
                        ease: [0.25, 1, 0.5, 1],
                      }}
                      className="absolute bottom-0 left-0 h-1.5 md:h-2 bg-[#D46789]/70 rounded-full pointer-events-none"
                    />
                  </span>
                  ,<br className="hidden md:block" /> Ethical Healthcare{" "}
                  <span className="text-[#7B5A7E]">for Women</span>
                </h1>
              </div>
            </FadeIn>

            {/* Subtitle & Value Proposition */}
            <div className="space-y-6">
              <FadeIn direction="up" delay={0.3}>
                <p className="text-lg md:text-xl text-[#464647] max-w-lg leading-relaxed font-light">
                  Advanced Maternity, Gynaecological Care, Minimal Access
                  Laparoscopic Surgery &amp; Complete Infertility Solutions in Hinjawadi, Pune.
                </p>
              </FadeIn>

              {/* Verified Doctor Strip */}
              <FadeIn direction="up" delay={0.35}>
                <div className="inline-flex items-center gap-3.5 bg-white/80 backdrop-blur-md border border-[#C0A8C9]/30 p-2 pr-5 rounded-full shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-[#7B5A7E] flex items-center justify-center text-white shrink-0 shadow-sm shadow-[#7B5A7E]/20">
                    <span
                      className="material-symbols-outlined text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[#4E3953]">
                      Dr. Pooja Wadgaonkar Patil
                    </p>
                    <p className="text-[11px] text-[#878787]">
                      Consultant Gynaecologist &amp; Laparoscopic Surgeon
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Call-to-Action Buttons */}
              <FadeIn direction="up" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/contact#book"
                      className="group relative bg-[#7B5A7E] text-white px-9 py-4.5 rounded-full text-xs font-bold tracking-widest uppercase overflow-hidden text-center transition-all duration-300 hover:shadow-xl hover:shadow-[#7B5A7E]/25 block shadow-md"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-base">
                          calendar_today
                        </span>
                        Book an Appointment
                      </span>
                      <span className="absolute inset-0 bg-[#4E3953] translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <a
                      href="#clinic-tour"
                      className="group relative flex items-center justify-center gap-3.5 bg-white border border-[#CFC3CC]/50 hover:border-[#D46789] text-[#4E3953] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#D46789]/20 cursor-pointer block"
                    >
                      {/* Pulsing Play Orb Icon */}
                      <div className="relative flex items-center justify-center shrink-0">
                        {/* Animated radar ping ring */}
                        <span className="absolute inline-flex h-9 w-9 rounded-full bg-[#D46789] opacity-30 animate-ping" />

                        {/* Solid play orb */}
                        <span className="relative w-9 h-9 rounded-full bg-[#D46789] group-hover:bg-[#B84E70] text-white flex items-center justify-center shadow-md shadow-[#D46789]/30 group-hover:scale-110 transition-all duration-300">
                          <span
                            className="material-symbols-outlined text-lg translate-x-0.5"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            play_arrow
                          </span>
                        </span>
                      </div>

                      {/* Text label with micro-tag */}
                      <div className="text-left">
                        <span className="block text-xs font-bold tracking-wider uppercase text-[#4E3953] group-hover:text-[#D46789] transition-colors leading-tight">
                          Watch Clinic Tour
                        </span>
                        <span className="text-[10px] text-[#878787] font-medium tracking-normal block leading-tight">
                          Virtual Tour with Dr. Pooja
                        </span>
                      </div>
                    </a>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Right Column: Doctor Photo (6 cols) */}
          <FadeIn direction="right" delay={0.3} className="lg:col-span-6">
            <div className="relative flex justify-center lg:justify-end lg:translate-y-4">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl group">
                {/* Decorative background shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C0A8C9]/20 to-[#E898A8]/35 rounded-3xl -rotate-2 scale-105 transition-transform duration-500 group-hover:rotate-0" />

                {/* Photo container */}
                <motion.div
                  whileHover={{ rotate: 0 }}
                  className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#7B5A7E]/15 border-2 border-white bg-white aspect-[4/5] sm:aspect-[3/4] -rotate-1 transition-transform duration-500"
                >
                  <Image
                    src="/dr-pooja-wadgaonkar-patil-gynaecologist-pune.jpeg"
                    alt="Dr. Pooja Wadgaonkar Patil - Leading Consultant Gynaecologist and Obstetrician in Hinjawadi Pune"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />

                  {/* Floating Doctor Badge on Photo */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="bg-white/90 backdrop-blur-md border border-[#C0A8C9]/30 p-3 rounded-2xl text-[#4E3953] flex items-center gap-3 shadow-lg">
                      <div className="w-9 h-9 rounded-xl bg-[#7B5A7E] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-base">
                          medical_services
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#4E3953] leading-tight truncate">
                          Dr. Pooja Wadgaonkar Patil
                        </p>
                        <p className="text-[10px] text-[#7B5A7E] font-medium truncate">
                          11+ Years of Experience
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
