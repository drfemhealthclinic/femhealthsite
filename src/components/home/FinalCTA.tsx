"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/Motion";
import { CLINIC } from "@/lib/clinic";

export default function FinalCTA() {
  return (
    <section className="bg-[#4E3953] text-white py-20 md:py-28 overflow-hidden relative">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #C0A8C9 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
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

          {/* Perfectly aligned buttons */}
          <FadeIn direction="up" delay={0.2}>
            <div className="flex flex-col items-center gap-4 pt-2">
              {/* Row 1: Book + Call side-by-side on desktop, stacked full-width on mobile */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href="/contact#book"
                    className="w-full sm:w-auto h-12 px-8 inline-flex items-center justify-center gap-2 bg-[#D46789] text-white rounded-xl text-sm font-semibold tracking-wider uppercase hover:bg-[#E898A8] transition-colors shadow-lg shadow-[#D46789]/20 text-center whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-base">calendar_today</span>
                    <span>Book an Appointment</span>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href={CLINIC.phoneHref}
                    className="w-full sm:w-auto h-12 px-8 inline-flex items-center justify-center gap-2 border border-[#C0A8C9]/60 text-[#C0A8C9] rounded-xl text-sm font-semibold tracking-wider uppercase hover:bg-white/10 hover:border-[#C0A8C9] transition-colors text-center whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-base">call</span>
                    <span>Call Us</span>
                  </Link>
                </motion.div>
              </div>

              {/* Row 2: WhatsApp centered, full-width on mobile */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href={CLINIC.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto h-12 px-8 inline-flex items-center justify-center gap-2 bg-[#D46789] text-white rounded-xl text-sm font-semibold tracking-wider uppercase hover:bg-[#E898A8] transition-colors text-center whitespace-nowrap"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>WhatsApp</span>
                </Link>
              </motion.div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.25}>
            <div className="pt-6 border-t border-[#C0A8C9]/30 space-y-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C0A8C9] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">location_on</span>
                Primary Location
              </h3>
              <p className="text-sm text-[#FDFBFC]/80 pl-5">{CLINIC.addressFull}</p>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Embedded Interactive Google Map */}
        <div className="lg:col-span-6">
          <FadeIn direction="up" delay={0.2}>
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#C0A8C9]/30 relative shadow-2xl shadow-[#4E3953]/50 group">
              {/* Google Maps Embed */}
              <iframe
                title="FemHealth Clinic Hinjawadi Location Map"
                src={CLINIC.mapEmbedSrc}
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
                    FemHealth Clinic Hinjawadi
                  </p>
                  <p className="text-xs text-[#C0A8C9] mt-0.5">
                    {CLINIC.addressShort}, Pune - 411057
                  </p>
                </div>
                <a
                  href={CLINIC.directionsHref}
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
