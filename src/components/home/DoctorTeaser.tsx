"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";
import CustomVideoPlayer from "@/components/ui/CustomVideoPlayer";

export default function DoctorTeaser() {
  return (
    <section id="clinic-tour" className="px-4 sm:px-8 md:px-12 py-10 md:py-24 max-w-7xl mx-auto my-6 md:my-12 scroll-mt-24">
      <FadeIn direction="up">
        <div className="bg-[#F9F5F6] rounded-3xl p-5 sm:p-8 md:p-12 border border-[#CFC3CC]/30 overflow-hidden space-y-6 md:space-y-10">
          {/* Header Row: Title & Verbatim Bio */}
          <div className="max-w-4xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#D46789] font-bold block">
              Lead Consultant
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display text-[#4E3953] font-semibold leading-tight">
              Meet Dr. Pooja Wadgaonkar Patil
            </h2>
            <p className="text-sm md:text-base text-[#464647] font-light leading-relaxed pt-1">
              Dr. Pooja Wadgaonkar Patil is an accomplished Consultant Obstetrician, Gynaecologist, Laparoscopic Surgeon, and Infertility Specialist. With extensive expertise in managing high-risk pregnancies, performing minimally invasive surgeries, and guiding couples through their fertility journeys, Dr. Pooja Wadgaonkar Patil brings both clinical precision and heartfelt dedication to every patient.
            </p>
          </div>

          {/* Luxury Custom Video Player */}
          <CustomVideoPlayer
            src="/videos/dr-pooja-intro.mp4"
            poster="/videos/dr-pooja-thumbnail.jpg"
            aspectRatioClass="aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]"
          />

          {/* Action Buttons Below Video */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-[#7B5A7E] text-[#7B5A7E] px-8 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-[#F9E4EA] hover:border-[#D46789] transition-all shadow-xs"
            >
              <span>About Dr. Pooja &amp; Clinic</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>

            <Link
              href="/contact#book"
              className="inline-flex items-center gap-2 bg-[#7B5A7E] hover:bg-[#4E3953] text-white px-8 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all shadow-md shadow-[#7B5A7E]/20"
            >
              <span>Book Appointment</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
