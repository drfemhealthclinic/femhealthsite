"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/Motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-[#2E1E32]">
      {/* ── Background Video Layer (Rotated Left -90deg for Correct Orientation) ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-90deg)",
            width: "180vh",
            height: "180vw",
            minWidth: "120vmax",
            minHeight: "120vmax",
            objectFit: "cover",
          }}
        >
          <source src="/hero-video.mov" type="video/mp4" />
          <source src="/hero-video/Interior video.mov" type="video/quicktime" />
        </video>

        {/* Rich Dark Cinematic Veil */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e0e22]/80 via-[#2e1732]/65 to-[#1e0e22]/50 pointer-events-none" />
      </div>

      {/* ── Main Hero Content ────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline & Clinical Actions (6 cols) */}
          <div className="lg:col-span-6 space-y-8 md:space-y-10 text-white">
            {/* Doctor Name + Credentials */}
            <FadeIn direction="down" delay={0.1}>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-px bg-[#E898A8]" />
                  <span className="text-xs font-bold tracking-wider text-[#E898A8] uppercase">
                    Dr. Pooja Wadgaonkar Patil
                  </span>
                </div>
                <span className="hidden sm:inline text-white/40">•</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {["MBBS", "MS OBGY", "FMAS", "DNB"].map((cred) => (
                    <span
                      key={cred}
                      className="px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[10px] font-bold tracking-wider text-white uppercase shadow-sm"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Giant Editorial Headline */}
            <FadeIn direction="up" delay={0.2}>
              <div className="max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-serif-display text-white leading-[1.05] font-semibold tracking-tight">
                  Compassionate,{" "}
                  <span className="relative inline-block text-[#F7D6E4]">
                    <span className="relative z-10">Evidence-Based</span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 1.8,
                        delay: 0.5,
                        ease: [0.25, 1, 0.5, 1],
                      }}
                      className="absolute bottom-0 md:bottom-1 left-0 h-1 md:h-1.5 bg-[#D46789]/80 rounded-full pointer-events-none"
                    />
                  </span>
                  ,<br className="hidden md:block" /> Ethical Healthcare{" "}
                  <span className="text-[#E6C2D6]">for Women</span>
                </h1>
              </div>
            </FadeIn>

            {/* Subtitle & Value Proposition */}
            <div className="space-y-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              <FadeIn direction="up" delay={0.3}>
                <p className="text-lg md:text-xl text-white max-w-lg leading-relaxed font-light">
                  Advanced Maternity, Gynaecological Care, Minimal Access
                  Laparoscopic Surgery &amp; Complete Infertility Solutions in Hinjawadi, Pune.
                </p>
              </FadeIn>

              {/* Verified Doctor Strip */}
              <FadeIn direction="up" delay={0.35}>
                <div className="inline-flex items-center gap-3.5 bg-white/10 backdrop-blur-md border border-white/20 p-2 pr-5 rounded-full">
                  <div className="w-10 h-10 rounded-full bg-[#D46789] flex items-center justify-center text-white shrink-0 shadow-md">
                    <span
                      className="material-symbols-outlined text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      Dr. Pooja Wadgaonkar Patil
                    </p>
                    <p className="text-[11px] text-white/70">
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
                      className="group relative bg-[#D46789] hover:bg-[#b8486c] text-white px-9 py-4.5 rounded-full text-xs font-bold tracking-widest uppercase overflow-hidden text-center transition-all duration-300 hover:shadow-xl hover:shadow-[#D46789]/30 block shadow-lg"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-base">
                          calendar_today
                        </span>
                        Book an Appointment
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/contact"
                      className="group flex items-center justify-center gap-2 border border-white/40 hover:border-white text-white hover:bg-white/15 backdrop-blur-sm px-9 py-4.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 text-center block"
                    >
                      <span className="material-symbols-outlined text-base">
                        videocam
                      </span>
                      Consult Online
                    </Link>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Right Column: Doctor Photo (6 cols) */}
          <FadeIn direction="right" delay={0.3} className="lg:col-span-6">
            <div className="relative flex justify-center lg:justify-end lg:translate-y-3">
              <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl group">
                {/* Decorative background shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#E898A8]/30 via-[#C0A8C9]/25 to-[#D46789]/30 rounded-3xl -rotate-2 scale-105 transition-transform duration-500 group-hover:rotate-0" />

                {/* Photo container */}
                <motion.div
                  whileHover={{ rotate: 0 }}
                  className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/40 border-2 border-white/30 bg-[#241427] aspect-[4/5] sm:aspect-[3/4] -rotate-1 transition-transform duration-500"
                >
                  <Image
                    src="/hero2.jpg"
                    alt="Dr. Pooja Wadgaonkar Patil - Leading Consultant Gynaecologist and Obstetrician in Hinjawadi Pune"
                    fill
                    className="object-cover object-[65%_18%] scale-110 group-hover:scale-115 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />

                  {/* Subtle bottom vignette on photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Doctor Badge on Photo */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="bg-black/40 backdrop-blur-md border border-white/20 p-3 rounded-2xl text-white flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#D46789] flex items-center justify-center text-white shrink-0 shadow-md">
                        <span className="material-symbols-outlined text-base">
                          medical_services
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white leading-tight truncate">
                          Dr. Pooja Wadgaonkar Patil
                        </p>
                        <p className="text-[10px] text-white/80 font-light truncate">
                          12+ Years Clinical &amp; Surgical Care
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
