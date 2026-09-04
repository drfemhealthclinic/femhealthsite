"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";
import CustomVideoPlayer from "@/components/ui/CustomVideoPlayer";

export default function DoctorTeaser() {
  return (
    <section id="clinic-tour" className="px-0 sm:px-8 md:px-12 py-8 md:py-24 max-w-7xl mx-auto my-4 md:my-12 scroll-mt-24">
      <FadeIn direction="up">
        <div className="bg-[#F9F5F6] rounded-none sm:rounded-3xl p-0 sm:p-8 md:p-12 border-y sm:border border-[#CFC3CC]/30 overflow-hidden space-y-6 md:space-y-10">
          {/* Header Row: Title & Verbatim Bio */}
          <div className="max-w-4xl space-y-3 px-5 sm:px-0 pt-6 sm:pt-0">
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
          <div className="w-full">
            <CustomVideoPlayer
              src="/videos/dr-pooja-intro.mp4"
              poster="/videos/dr-pooja-thumbnail.jpg"
              aspectRatioClass="aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]"
              className="rounded-none sm:rounded-3xl border-y sm:border border-[#CFC3CC]/40 shadow-none sm:shadow-2xl sm:shadow-[#7B5A7E]/10"
            />
          </div>

          {/* Action Buttons Below Video */}
          <div className="flex flex-wrap items-center gap-4 pt-1 px-5 sm:px-0 pb-6 sm:pb-0">
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
