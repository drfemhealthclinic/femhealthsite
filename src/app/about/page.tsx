"use client";

import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import CustomVideoPlayer from "@/components/ui/CustomVideoPlayer";

const CLINIC_PHOTOS = [
  {
    src: "/clinic photos/ac449978-74ee-4ae5-b1f4-370ea05317c3.jpg",
    alt: "FemHealth Clinic Consultation Suite",
  },
  {
    src: "/clinic photos/42087fee-1ef6-48ce-8e05-f55be982726f.jpg",
    alt: "FemHealth Clinic Interior Care Area",
  },
  {
    src: "/clinic photos/8e129c12-ce4b-458e-a3b6-231ffa20694b.jpg",
    alt: "FemHealth Clinic Reception Setup",
  },
];

export default function AboutPage() {
  const photoScrollRef = useRef<HTMLDivElement>(null);
  const [qualProgress, setQualProgress] = useState(0);

  const handleQualScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      setQualProgress(Math.max(0, Math.min(1, el.scrollLeft / maxScroll)));
    }
  };

  // Infinite silky smooth auto-scroll animation on mobile
  useEffect(() => {
    const el = photoScrollRef.current;
    if (!el) return;

    let isInteracting = false;
    let resumeTimeout: NodeJS.Timeout;
    let animId: number;

    const step = () => {
      if (!isInteracting && el) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 20) {
          const singleSetWidth = el.scrollWidth / 3;
          if (el.scrollLeft >= singleSetWidth) {
            el.scrollLeft -= singleSetWidth;
          } else {
            el.scrollLeft += 0.75; // Silky smooth 60fps continuous glide
          }
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    const onTouchStart = () => {
      isInteracting = true;
      clearTimeout(resumeTimeout);
    };

    const onTouchEnd = () => {
      resumeTimeout = setTimeout(() => {
        isInteracting = false;
      }, 2500);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resumeTimeout);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const scrollPhotos = (direction: "left" | "right") => {
    const el = photoScrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    const scrollAmount = el.clientWidth * 0.75;

    if (direction === "left" && el.scrollLeft <= 10) {
      el.scrollLeft += singleSetWidth;
    }
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Navbar />

      <main className="flex-grow bg-[#FEFCFD]">
        {/* PAGE HEADER */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 px-5 md:px-12 max-w-7xl mx-auto text-center">
          {/* Ambient background blurs */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D4A0C0]/15 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#E898A8]/18 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9E4EA] text-[#D46789] border border-[#E898A8]/30 text-xs font-bold uppercase tracking-widest mb-6">
              Consultant Profile
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display text-[#4E3953] max-w-5xl mx-auto leading-tight font-semibold tracking-tight">
              Dr. Pooja Wadgaonkar Patil
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-lg md:text-2xl font-serif-display text-[#7B5A7E] italic font-light mt-4 max-w-3xl mx-auto">
              Consultant Obstetrician, Gynaecologist, Laparoscopic Surgeon, and Infertility Specialist
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <p className="text-base text-[#464647] mt-4 font-medium max-w-2xl mx-auto">
              Compassionate care backed by clinical excellence and cutting-edge medical advancements.
            </p>
          </FadeIn>
        </section>

        {/* DOCTOR PROFILE SECTION */}
        <section className="px-5 md:px-12 py-12 md:py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Doctor Portrait Card */}
            <div className="md:col-span-5">
              <FadeIn direction="up">
                <div className="relative">
                  <div className="absolute -top-3 -right-3 w-20 h-20 border-2 border-[#C0A8C9]/30 rounded-2xl -z-10" />
                  <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-[#D46789]/10 rounded-full -z-10" />

                  <div className="relative">
                    {/* Decorative background shape */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C0A8C9]/20 to-[#E898A8]/35 rounded-2xl -rotate-3 scale-105" />
                    {/* Photo container */}
                    <div className="relative bg-white rounded-2xl border border-[#CFC3CC]/40 overflow-hidden shadow-xl shadow-[#7B5A7E]/8">
                      <div className="relative aspect-[3/4] w-full">
                        <Image
                          src="/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg"
                          alt="Dr. Pooja Wadgaonkar Patil - Expert Obstetrician and Advanced Laparoscopic Surgeon Pune"
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 40vw"
                          priority
                        />

                        {/* Bottom Doctor Badge */}
                        <div className="absolute bottom-5 left-5 right-5 text-left bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#CFC3CC]/40 shadow-lg space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[#7B5A7E] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                                verified
                              </span>
                              <span className="text-xs font-bold text-[#4E3953] uppercase tracking-wider">
                                11+ Years Experience
                              </span>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F3EEF5] border border-[#C0A8C9]/40 text-[#7B5A7E] text-[10px] font-bold tracking-wide">
                              <span className="material-symbols-outlined text-[#D46789] text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                                workspace_premium
                              </span>
                              MUHS State Rank 15
                            </span>
                          </div>
                          <p className="text-[11px] text-[#878787] pt-0.5 border-t border-[#CFC3CC]/25">
                            MBBS · MS OBGY · FMAS · DNB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right: Bio & Philosophy */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <FadeIn direction="up" delay={0.1}>
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-[#D46789] font-bold block">
                    Philosophy of Care
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif-display text-[#4E3953] font-semibold">
                    Meet Dr. Pooja Wadgaonkar Patil
                  </h2>
                  <div className="w-16 h-1 bg-[#D46789] rounded-full mt-2" />
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <p className="text-base sm:text-lg text-[#464647] leading-relaxed font-light">
                  Dr. Pooja Wadgaonkar Patil is an accomplished Consultant Obstetrician, Gynaecologist, Laparoscopic Surgeon, and Infertility Specialist. With extensive expertise in managing high-risk pregnancies, performing minimally invasive surgeries, and guiding couples through their fertility journeys, Dr. Pooja Wadgaonkar Patil brings both clinical precision and heartfelt dedication to every patient.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.3}>
                <p className="text-base text-[#464647] leading-relaxed font-light">
                  Believing firmly that healthcare should be a collaborative partnership between doctor and patient, Dr. Pooja Wadgaonkar Patil ensures every woman is heard, empowered with evidence-based choices, and treated with utmost empathy in a warm, welcoming environment.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.4}>
                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/contact#book"
                      className="bg-[#7B5A7E] text-white px-8 py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase hover:bg-[#4E3953] transition-colors organic-shadow block text-center"
                    >
                      Schedule an Appointment
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/contact"
                      className="border border-[#7B5A7E]/40 text-[#7B5A7E] px-8 py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase hover:bg-[#F9E4EA] hover:border-[#D46789] transition-colors block text-center"
                    >
                      View Clinic Locations
                    </Link>
                  </motion.div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* QUALIFICATIONS & ACCREDITATIONS */}
        <section className="bg-[#F5F3F4] py-12 md:py-20 px-5 md:px-12 border-y border-[#CFC3CC]/30">
          <div className="max-w-7xl mx-auto">
            <FadeIn direction="up">
              <div className="text-center mb-10 md:mb-14 space-y-2 md:space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#D46789] font-bold">
                  Academic &amp; Clinical Excellence
                </span>
                <h2 className="text-3xl md:text-4xl font-serif-display text-[#4E3953] font-semibold">
                  Qualifications &amp; Accreditations
                </h2>
              </div>
            </FadeIn>

            {/* Mobile Swipe Strip */}
            <div className="md:hidden space-y-3">
              <div
                onScroll={handleQualScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-5 px-5 pb-2 gap-4"
              >
                {/* Card 1: Degrees */}
                <div className="w-[82vw] sm:w-[50vw] shrink-0 snap-center">
                  <div className="bg-white p-6 rounded-2xl organic-shadow border border-[#CFC3CC]/30 flex flex-col gap-4 h-full">
                    <div className="w-12 h-12 bg-[#F3EEF5] rounded-xl flex items-center justify-center text-[#D46789]">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                    </div>
                    <h3 className="text-xs font-bold text-[#7B5A7E] uppercase tracking-widest">
                      Degrees &amp; Honors
                    </h3>
                    <ul className="space-y-3 text-xs sm:text-sm text-[#464647]">
                      <li className="flex items-start gap-2 leading-relaxed">
                        <span className="material-symbols-outlined text-[#D46789] text-sm mt-0.5 shrink-0">check_circle</span>
                        <span><strong className="text-[#1B1C1C] font-semibold">MBBS, MS OBGY (GMC Nagpur)</strong> — MUHS State Rank 15</span>
                      </li>
                      <li className="flex items-start gap-2 leading-relaxed">
                        <span className="material-symbols-outlined text-[#D46789] text-sm mt-0.5 shrink-0">check_circle</span>
                        <span><strong className="text-[#1B1C1C] font-semibold">DNB OBGY</strong> (NBE New Delhi)</span>
                      </li>
                      <li className="flex items-start gap-2 leading-relaxed">
                        <span className="material-symbols-outlined text-[#D46789] text-sm mt-0.5 shrink-0">check_circle</span>
                        <span><strong className="text-[#1B1C1C] font-semibold">FMAS</strong> — Fellowship in Minimal Access Surgery and Gynaec Oncology (Pune)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Card 2: Special Interests */}
                <div className="w-[82vw] sm:w-[50vw] shrink-0 snap-center">
                  <div className="bg-white p-6 rounded-2xl organic-shadow border border-[#CFC3CC]/30 flex flex-col gap-4 h-full">
                    <div className="w-12 h-12 bg-[#F3EEF5] rounded-xl flex items-center justify-center text-[#D46789]">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    </div>
                    <h3 className="text-xs font-bold text-[#7B5A7E] uppercase tracking-widest">
                      Special Interests
                    </h3>
                    <ul className="space-y-3 text-xs sm:text-sm text-[#464647]">
                      <li className="flex items-start gap-2 leading-relaxed">
                        <span className="material-symbols-outlined text-[#D46789] text-sm mt-0.5 shrink-0">check_circle</span>
                        <span><strong className="text-[#1B1C1C] font-semibold">Advanced Laparoscopy</strong> — Complex scarless laparoscopic and hysteroscopic procedures</span>
                      </li>
                      <li className="flex items-start gap-2 leading-relaxed">
                        <span className="material-symbols-outlined text-[#D46789] text-sm mt-0.5 shrink-0">check_circle</span>
                        <span><strong className="text-[#1B1C1C] font-semibold">Reproductive Medicine &amp; Infertility</strong> — Tailored ovulation induction, IUI, and reproductive surgery</span>
                      </li>
                      <li className="flex items-start gap-2 leading-relaxed">
                        <span className="material-symbols-outlined text-[#D46789] text-sm mt-0.5 shrink-0">check_circle</span>
                        <span><strong className="text-[#1B1C1C] font-semibold">High-Risk Obstetrics</strong> — Intensive fetal monitoring and maternity safety</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Card 3: Memberships */}
                <div className="w-[82vw] sm:w-[50vw] shrink-0 snap-center">
                  <div className="bg-white p-6 rounded-2xl organic-shadow border border-[#CFC3CC]/30 flex flex-col gap-4 h-full">
                    <div className="w-12 h-12 bg-[#F3EEF5] rounded-xl flex items-center justify-center text-[#D46789]">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                    </div>
                    <h3 className="text-xs font-bold text-[#7B5A7E] uppercase tracking-widest">
                      Professional Memberships
                    </h3>
                    <ul className="space-y-3 text-xs sm:text-sm text-[#464647]">
                      <li className="flex items-start gap-2 leading-relaxed">
                        <span className="material-symbols-outlined text-[#D46789] text-sm mt-0.5 shrink-0">check_circle</span>
                        <span>Member of <strong className="text-[#1B1C1C] font-semibold">POGS</strong> (Pune Obstetric &amp; Gynaecological Society)</span>
                      </li>
                      <li className="flex items-start gap-2 leading-relaxed">
                        <span className="material-symbols-outlined text-[#D46789] text-sm mt-0.5 shrink-0">check_circle</span>
                        <span>Member of <strong className="text-[#1B1C1C] font-semibold">IMA</strong> (Indian Medical Association)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Apple-style Progress Indicator */}
              <div className="flex items-center justify-between px-2 pt-1">
                <div className="w-24 h-1 bg-[#CFC3CC]/40 rounded-full overflow-hidden relative">
                  <div
                    className="absolute top-0 bottom-0 bg-[#D46789] rounded-full transition-all duration-75"
                    style={{
                      width: "33.3%",
                      left: `${qualProgress * 66.7}%`,
                    }}
                  />
                </div>
                <span className="text-[11px] font-medium text-[#7B5A7E] tracking-wider">
                  {Math.min(3, Math.floor(qualProgress * 2.99) + 1)} of 3
                </span>
              </div>
            </div>

            {/* Desktop 3-Column Grid */}
            <StaggerContainer className="hidden md:grid md:grid-cols-3 gap-8">
              {/* Degrees */}
              <StaggerItem>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white p-8 rounded-2xl organic-shadow border border-[#CFC3CC]/30 hover:border-[#D46789]/40 hover:shadow-xl transition-all duration-300 flex flex-col gap-5 h-full group"
                >
                  <div className="w-14 h-14 bg-[#F3EEF5] rounded-xl flex items-center justify-center text-[#D46789] group-hover:bg-[#7B5A7E] group-hover:text-white transition-colors duration-300">
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      school
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-[#7B5A7E] uppercase tracking-widest">
                    Degrees &amp; Honors
                  </h3>
                  <ul className="space-y-3.5 text-sm text-[#464647]">
                    <li className="flex items-start gap-2.5 leading-relaxed">
                      <span className="material-symbols-outlined text-[#D46789] text-sm mt-1 shrink-0">
                        check_circle
                      </span>
                      <span>
                        <strong className="text-[#1B1C1C] font-semibold">MBBS, MS OBGY (GMC Nagpur)</strong> — MUHS State Rank 15
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 leading-relaxed">
                      <span className="material-symbols-outlined text-[#D46789] text-sm mt-1 shrink-0">
                        check_circle
                      </span>
                      <span>
                        <strong className="text-[#1B1C1C] font-semibold">DNB OBGY</strong> (NBE New Delhi)
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 leading-relaxed">
                      <span className="material-symbols-outlined text-[#D46789] text-sm mt-1 shrink-0">
                        check_circle
                      </span>
                      <span>
                        <strong className="text-[#1B1C1C] font-semibold">FMAS</strong> — Fellowship in Minimal Access Surgery and Gynaec Oncology (Pune)
                      </span>
                    </li>
                  </ul>
                </motion.div>
              </StaggerItem>

              {/* Special Interest */}
              <StaggerItem>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white p-8 rounded-2xl organic-shadow border border-[#CFC3CC]/30 hover:border-[#D46789]/40 hover:shadow-xl transition-all duration-300 flex flex-col gap-5 h-full group"
                >
                  <div className="w-14 h-14 bg-[#F3EEF5] rounded-xl flex items-center justify-center text-[#D46789] group-hover:bg-[#7B5A7E] group-hover:text-white transition-colors duration-300">
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      favorite
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-[#7B5A7E] uppercase tracking-widest">
                    Special Interests
                  </h3>
                  <ul className="space-y-3.5 text-sm text-[#464647]">
                    <li className="flex items-start gap-2.5 leading-relaxed">
                      <span className="material-symbols-outlined text-[#D46789] text-sm mt-1 shrink-0">
                        check_circle
                      </span>
                      <span>
                        <strong className="text-[#1B1C1C] font-semibold">Advanced Laparoscopy</strong> — Complex scarless laparoscopic and hysteroscopic procedures
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 leading-relaxed">
                      <span className="material-symbols-outlined text-[#D46789] text-sm mt-1 shrink-0">
                        check_circle
                      </span>
                      <span>
                        <strong className="text-[#1B1C1C] font-semibold">Reproductive Medicine &amp; Infertility</strong> — Tailored ovulation induction, IUI, and reproductive surgery
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 leading-relaxed">
                      <span className="material-symbols-outlined text-[#D46789] text-sm mt-1 shrink-0">
                        check_circle
                      </span>
                      <span>
                        <strong className="text-[#1B1C1C] font-semibold">High-Risk Obstetrics</strong> — Intensive fetal monitoring and maternity safety
                      </span>
                    </li>
                  </ul>
                </motion.div>
              </StaggerItem>

              {/* Memberships */}
              <StaggerItem>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white p-8 rounded-2xl organic-shadow border border-[#CFC3CC]/30 hover:border-[#D46789]/40 hover:shadow-xl transition-all duration-300 flex flex-col gap-5 h-full group"
                >
                  <div className="w-14 h-14 bg-[#F3EEF5] rounded-xl flex items-center justify-center text-[#D46789] group-hover:bg-[#7B5A7E] group-hover:text-white transition-colors duration-300">
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      group
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-[#7B5A7E] uppercase tracking-widest">
                    Professional Memberships
                  </h3>
                  <ul className="space-y-3.5 text-sm text-[#464647]">
                    <li className="flex items-start gap-2.5 leading-relaxed">
                      <span className="material-symbols-outlined text-[#D46789] text-sm mt-1 shrink-0">
                        check_circle
                      </span>
                      <span>
                        Member of <strong className="text-[#1B1C1C] font-semibold">POGS</strong> (Pune Obstetric &amp; Gynaecological Society)
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 leading-relaxed">
                      <span className="material-symbols-outlined text-[#D46789] text-sm mt-1 shrink-0">
                        check_circle
                      </span>
                      <span>
                        Member of <strong className="text-[#1B1C1C] font-semibold">IMA</strong> (Indian Medical Association)
                      </span>
                    </li>
                  </ul>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* OUR CLINIC INTERIOR SECTION */}
        <section id="facilities" className="py-20 px-5 md:px-12 max-w-7xl mx-auto scroll-mt-24 space-y-8">
          <FadeIn direction="up">
            <div className="text-center mb-10 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#D46789] font-bold">
                A Calm &amp; Welcoming Space
              </span>
              <h2 className="text-3xl md:text-4xl font-serif-display text-[#4E3953] font-semibold">
                Inside Our Clinic
              </h2>
            </div>
          </FadeIn>

          <div className="w-full max-w-7xl mx-auto space-y-7">
            {/* Centered Video on Top with Luxury Custom Player UI */}
            <FadeIn direction="up">
              <CustomVideoPlayer
                src="/videos/clinic-walkthrough.mp4"
                autoPlay={true}
                muted={true}
                loop={true}
                showCenterPlayButton={false}
                aspectRatioClass="aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]"
              />
            </FadeIn>

            {/* 3 Photos with Left/Right Navigation Arrows (Arrows on Mobile only) */}
            <div className="relative group/gallery">
              {/* Left Arrow Button (Mobile/Tablet only) */}
              <button
                type="button"
                onClick={() => scrollPhotos("left")}
                aria-label="Previous clinic photo"
                className="md:hidden absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md text-[#4E3953] hover:text-[#D46789] hover:bg-[#F9E4EA] shadow-xl border border-[#CFC3CC]/50 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
              </button>

              {/* Right Arrow Button (Mobile/Tablet only) */}
              <button
                type="button"
                onClick={() => scrollPhotos("right")}
                aria-label="Next clinic photo"
                className="md:hidden absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md text-[#4E3953] hover:text-[#D46789] hover:bg-[#F9E4EA] shadow-xl border border-[#CFC3CC]/50 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>

              {/* Photo Carousel Container */}
              <div
                ref={photoScrollRef}
                className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible pb-3 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 md:mx-0 md:px-0"
              >
                {/* Primary Set 1 (Always visible on mobile + desktop) */}
                {CLINIC_PHOTOS.map((photo, i) => (
                  <div
                    key={`orig-${i}`}
                    className="w-[75vw] sm:w-[48vw] md:w-full shrink-0 snap-center relative aspect-[3/4] rounded-3xl overflow-hidden border border-[#CFC3CC]/40 shadow-md hover:shadow-xl transition-all duration-300 group bg-[#F9F5F6]"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                      sizes="(max-width: 768px) 75vw, 33vw"
                    />
                  </div>
                ))}

                {/* Duplicate Set 2 (Mobile only for seamless infinite looping) */}
                {CLINIC_PHOTOS.map((photo, i) => (
                  <div
                    key={`dup1-${i}`}
                    className="md:hidden w-[75vw] sm:w-[48vw] shrink-0 snap-center relative aspect-[3/4] rounded-3xl overflow-hidden border border-[#CFC3CC]/40 shadow-md group bg-[#F9F5F6]"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover object-center"
                      sizes="75vw"
                    />
                  </div>
                ))}

                {/* Duplicate Set 3 (Mobile only buffer for seamless infinite looping) */}
                {CLINIC_PHOTOS.map((photo, i) => (
                  <div
                    key={`dup2-${i}`}
                    className="md:hidden w-[75vw] sm:w-[48vw] shrink-0 snap-center relative aspect-[3/4] rounded-3xl overflow-hidden border border-[#CFC3CC]/40 shadow-md group bg-[#F9F5F6]"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover object-center"
                      sizes="75vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HYGIENE & SAFETY REASSURANCE */}
        <section className="px-5 md:px-12 py-16 max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="bg-white p-10 md:p-14 rounded-2xl organic-shadow border border-[#CFC3CC]/30 flex flex-col items-center text-center max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-[#F3EEF5] rounded-full flex items-center justify-center text-[#D46789] mb-4">
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  health_and_safety
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif-display text-[#4E3953] mb-3 font-semibold">
                Hygiene, Safety &amp; Sterilization
              </h2>
              <p className="text-base text-[#464647] leading-relaxed max-w-2xl font-light">
                Patient safety is our uncompromised priority. FemHealth Clinic adheres to international multi-stage sterilization protocols, biomedical waste management standards, and hospital-grade sanitization practices to ensure a secure, hygienic clinical journey.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* CTA */}
        <section className="bg-[#4E3953] text-white py-20 px-5 md:px-12 text-center">
          <FadeIn direction="up">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif-display font-semibold">
                Begin Your Health Journey Today
              </h2>
              <p className="text-base text-[#C0A8C9] font-light">
                Schedule a consultation with Dr. Pooja Wadgaonkar Patil for personalized, expert care.
              </p>
              <div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Link
                    href="/contact#book"
                    className="inline-block bg-[#D46789] text-white px-8 py-4 rounded-xl text-xs font-semibold tracking-widest uppercase hover:bg-[#E898A8] transition-colors shadow-lg shadow-[#D46789]/20"
                  >
                    Book a Consultation
                  </Link>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </>
  );
}
