"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/Motion";

export default function FinalCTA() {
  return (
    <section className="bg-[#4E3953] text-white py-20 md:py-28 overflow-hidden">
      <div className="px-5 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: CTA Text & Actions */}
        <div className="lg:col-span-6 space-y-8">
          <FadeIn direction="up">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#C0A8C9] font-semibold block">
                Appointment &amp; Location
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display leading-tight text-white font-semibold">
                Ready to prioritize your health?
              </h2>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="space-y-3 bg-[#7B5A7E]/20 border border-[#C0A8C9]/20 p-6 rounded-2xl">
              <h3 className="text-sm uppercase tracking-wider font-semibold text-[#C0A8C9] flex items-center gap-2">
                <span className="material-symbols-outlined text-base">schedule</span>
                Clinic Timings (FemHealth Clinic)
              </h3>
              <p className="text-base text-[#FDFBFC]/90 font-light leading-relaxed pl-6">
                10:30 AM to 2:00 PM<br />
                4:00 PM to 8:00 PM
              </p>
            </div>
          </FadeIn>

          {/* Perfectly aligned equal-size buttons */}
          <FadeIn direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 sm:flex-initial"
              >
                <Link
                  href="/contact#book"
                  className="w-full h-13 px-8 inline-flex items-center justify-center gap-2 bg-[#D46789] text-white rounded-xl text-xs font-semibold tracking-widest uppercase hover:bg-[#E898A8] transition-colors shadow-lg shadow-[#D46789]/20 text-center"
                >
                  <span className="material-symbols-outlined text-base">calendar_today</span>
                  <span>Book an Appointment</span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 sm:flex-initial"
              >
                <Link
                  href="/contact"
                  className="w-full h-13 px-8 inline-flex items-center justify-center gap-2 border border-[#C0A8C9]/60 text-[#C0A8C9] rounded-xl text-xs font-semibold tracking-widest uppercase hover:bg-white/10 hover:border-[#C0A8C9] transition-colors text-center"
                >
                  <span className="material-symbols-outlined text-base">call</span>
                  <span>Contact Us</span>
                </Link>
              </motion.div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="pt-6 border-t border-[#C0A8C9]/30 space-y-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C0A8C9] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">location_on</span>
                Primary Location
              </h3>
              <p className="text-sm text-[#FDFBFC]/80 pl-5">
                FemHealth Clinic, VJ Happiness Street, Hinjewadi, Pune
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Embedded Interactive Google Map */}
        <div className="lg:col-span-6">
          <FadeIn direction="up" delay={0.2}>
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#C0A8C9]/30 relative shadow-2xl shadow-[#4E3953]/50 group">
              {/* Google Maps Embed */}
              <iframe
                title="FemHealth Clinic Hinjewadi Location Map"
                src="https://maps.google.com/maps?q=VJ+Happiness+Street,+Hinjewadi,+Pune&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "contrast(1.05) saturate(1.1)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Glassmorphism Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#4E3953]/90 backdrop-blur-md p-4 rounded-xl border border-[#C0A8C9]/30 text-white z-10 flex items-center justify-between gap-4 shadow-xl">
                <div>
                  <p className="font-serif-display text-base font-semibold text-white">
                    FemHealth Clinic Hinjewadi
                  </p>
                  <p className="text-xs text-[#C0A8C9] mt-0.5">
                    Modern, serene, and patient-first ambiance
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=VJ+Happiness+Street,+Hinjewadi,+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-lg bg-[#D46789] text-white hover:bg-[#E898A8] transition-colors shrink-0 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider"
                  title="Open in Google Maps"
                >
                  <span className="material-symbols-outlined text-base">directions</span>
                  <span className="hidden sm:inline">Directions</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
