"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/Motion";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left column: Text content (7 columns) */}
          <div className="lg:col-span-7 space-y-8 md:space-y-10">
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
                      transition={{
                        duration: 1.8,
                        delay: 0.5,
                        ease: [0.25, 1, 0.5, 1],
                      }}
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
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/contact#book"
                      className="group relative bg-[#7B5A7E] text-white px-10 py-5 rounded-lg text-xs font-semibold tracking-widest uppercase overflow-hidden text-center transition-all duration-300 hover:shadow-lg hover:shadow-[#7B5A7E]/25 block"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-base">
                          calendar_today
                        </span>
                        Book an Appointment
                      </span>
                      <span className="absolute inset-0 bg-[#4E3953] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href="/contact"
                      className="group flex items-center justify-center gap-2 border border-[#7B5A7E]/30 text-[#7B5A7E] px-10 py-5 rounded-lg text-xs font-semibold tracking-widest uppercase hover:border-[#7B5A7E] hover:bg-[#F3EEF5] transition-all duration-300 text-center block"
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

          {/* Right column: Tilted Hero Video Showcase (5 columns) */}
          <FadeIn direction="right" delay={0.3} className="lg:col-span-5">
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg group">
                {/* Decorative background shape tilted to the RIGHT */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C0A8C9]/35 via-[#E898A8]/30 to-[#7B5A7E]/20 rounded-3xl rotate-3 scale-105 transition-transform duration-500 group-hover:rotate-1" />

                {/* Video container tilted to the RIGHT */}
                <motion.div
                  whileHover={{ rotate: 0 }}
                  className="relative overflow-hidden rounded-3xl shadow-2xl shadow-[#7B5A7E]/15 border-2 border-white/80 bg-[#4E3953] aspect-[4/5] rotate-1 transition-transform duration-500"
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  >
                    <source src="/hero-video.mov" type="video/mp4" />
                    <source
                      src="/hero-video/Interior video.mov"
                      type="video/quicktime"
                    />
                    Your browser does not support the video tag.
                  </video>

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#4E3953] shadow-md flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D46789] animate-pulse" />
                      <span className="text-[11px] font-sans tracking-wide">
                        FemHealth Clinic · Hinjawadi
                      </span>
                    </div>

                    {/* Sound / Play Controls */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                        className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/30 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isMuted ? "volume_off" : "volume_up"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                        className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center border border-white/30 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isPlaying ? "pause" : "play_arrow"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom Floating Bar */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="bg-black/40 backdrop-blur-md border border-white/20 p-3 rounded-2xl text-white flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#7B5A7E] flex items-center justify-center text-white shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-base">
                          apartment
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white leading-tight truncate">
                          Modern Clinical Facility
                        </p>
                        <p className="text-[10px] text-white/80 font-light truncate">
                          Advanced diagnostics &amp; patient-first care
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
