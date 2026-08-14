"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow bg-[#FDFBFC]">
        {/* PAGE HEADER */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 px-5 md:px-12 max-w-7xl mx-auto text-center">
          {/* Ambient background blurs */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C0A8C9]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#E898A8]/8 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f1d7fa] text-[#614265] text-xs font-semibold uppercase tracking-widest mb-6">
              Consultant Profile
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display text-[#4E3953] max-w-5xl mx-auto leading-tight font-semibold tracking-tight">
              Dr. Pooja Wadgaonkar (Patil)
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
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C0A8C9]/20 to-[#E898A8]/20 rounded-2xl -rotate-3 scale-105" />
                    {/* Photo container */}
                    <div className="relative bg-white rounded-2xl border border-[#CFC3CC]/40 overflow-hidden shadow-xl shadow-[#7B5A7E]/8">
                      <div className="relative aspect-[3/4] w-full">
                        <Image
                          src="/doctorphoto.jpg"
                          alt="Dr. Pooja Wadgaonkar Patil - Consultant Gynaecologist and Laparoscopic Surgeon"
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />

                        <div className="absolute bottom-6 left-6 right-6 text-left bg-white/90 backdrop-blur-md p-4 rounded-xl border border-[#CFC3CC]/30">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#7B5A7E] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                              verified
                            </span>
                            <span className="text-xs font-bold text-[#4E3953] uppercase tracking-wider">
                              MUHS State Rank 15
                            </span>
                          </div>
                          <p className="text-[11px] text-[#878787] mt-0.5">MS OBGY · FMAS · DNB</p>
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
                  <span className="text-xs uppercase tracking-widest text-[#7B5A7E] font-bold block">
                    Philosophy of Care
                  </span>
                  <h2 className="text-3xl md:text-4xl font-serif-display text-[#4E3953] font-semibold">
                    Meet Dr. Pooja
                  </h2>
                  <div className="w-16 h-1 bg-[#D46789] rounded-full mt-2" />
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <p className="text-base sm:text-lg text-[#464647] leading-relaxed font-light">
                  Dr. Pooja Wadgaonkar (Patil) is an accomplished Consultant Obstetrician, Gynaecologist, Laparoscopic Surgeon, and Infertility Specialist. With extensive expertise in managing high-risk pregnancies, performing minimally invasive surgeries, and guiding couples through their fertility journeys, Dr. Pooja brings both clinical precision and heartfelt dedication to every patient.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.3}>
                <p className="text-base text-[#464647] leading-relaxed font-light">
                  Believing firmly that healthcare should be a collaborative partnership between doctor and patient, Dr. Pooja ensures every woman is heard, empowered with evidence-based choices, and treated with utmost empathy in a warm, welcoming environment.
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
                      className="border border-[#7B5A7E]/40 text-[#7B5A7E] px-8 py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase hover:bg-[#F3EEF5] transition-colors block text-center"
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
        <section className="bg-[#F5F3F4] py-20 px-5 md:px-12 border-y border-[#CFC3CC]/30">
          <div className="max-w-7xl mx-auto">
            <FadeIn direction="up">
              <div className="text-center mb-14 space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#7B5A7E] font-bold">
                  Academic &amp; Clinical Excellence
                </span>
                <h2 className="text-3xl md:text-4xl font-serif-display text-[#4E3953] font-semibold">
                  Qualifications &amp; Accreditations
                </h2>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Degrees */}
              <StaggerItem>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white p-8 rounded-2xl organic-shadow border border-[#CFC3CC]/30 hover:border-[#C0A8C9] transition-all duration-300 flex flex-col gap-5 h-full group"
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
                  className="bg-white p-8 rounded-2xl organic-shadow border border-[#CFC3CC]/30 hover:border-[#C0A8C9] transition-all duration-300 flex flex-col gap-5 h-full group"
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
                  className="bg-white p-8 rounded-2xl organic-shadow border border-[#CFC3CC]/30 hover:border-[#C0A8C9] transition-all duration-300 flex flex-col gap-5 h-full group"
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

        {/* CLINIC FACILITIES SECTION */}
        <section className="py-20 px-5 md:px-12 max-w-7xl mx-auto">
          <FadeIn direction="up">
            <div className="text-center mb-14 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#7B5A7E] font-bold">
                State-of-the-Art Infrastructure
              </span>
              <h2 className="text-3xl md:text-4xl font-serif-display text-[#4E3953] font-semibold">
                Clinic Facilities
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Waiting Area Large Feature */}
            <StaggerItem className="md:col-span-8">
              <div className="rounded-2xl overflow-hidden organic-shadow border border-[#CFC3CC]/30 relative group h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4E3953] via-[#7B5A7E]/60 to-[#C0A8C9]/30 flex flex-col items-center justify-center text-center p-8">
                  <span
                    className="material-symbols-outlined text-white/30 mb-3"
                    style={{ fontSize: "72px", fontVariationSettings: "'FILL' 0" }}
                  >
                    chair
                  </span>
                  <p className="text-xs text-white/60 italic">Waiting Area photo</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#4E3953]/95 via-[#4E3953]/50 to-transparent p-8">
                  <span className="text-xs uppercase tracking-widest text-[#C0A8C9] font-semibold block mb-1">
                    Peaceful Environment
                  </span>
                  <h3 className="text-2xl font-serif-display text-white font-medium">
                    Welcoming Waiting Area
                  </h3>
                  <p className="text-xs sm:text-sm text-[#EFEDEE] mt-1 font-light">
                    Airy, serene ambience thoughtfully designed with natural light to minimize patient stress.
                  </p>
                </div>
              </div>
            </StaggerItem>

            {/* Side Facilities */}
            <StaggerItem className="md:col-span-4 flex flex-col gap-6 h-[400px]">
              {/* Consultation Room */}
              <div className="rounded-2xl overflow-hidden organic-shadow border border-[#CFC3CC]/30 relative group h-1/2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7B5A7E] to-[#4E3953] flex flex-col items-center justify-center text-center p-4">
                  <span
                    className="material-symbols-outlined text-white/30 mb-1"
                    style={{ fontSize: "40px", fontVariationSettings: "'FILL' 0" }}
                  >
                    stethoscope
                  </span>
                  <p className="text-[10px] text-white/60 italic">Consultation Room</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#4E3953]/90 to-transparent p-4 z-10">
                  <h3 className="text-base font-serif-display text-white font-medium">
                    Private Consultation
                  </h3>
                  <p className="text-xs text-[#C0A8C9]">Confidential, reassuring space</p>
                </div>
              </div>

              {/* Modern Equipment */}
              <div className="rounded-2xl overflow-hidden organic-shadow border border-[#CFC3CC]/30 relative group h-1/2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4E3953] to-[#7B5A7E] flex flex-col items-center justify-center text-center p-4">
                  <span
                    className="material-symbols-outlined text-white/30 mb-1"
                    style={{ fontSize: "40px", fontVariationSettings: "'FILL' 0" }}
                  >
                    biotech
                  </span>
                  <p className="text-[10px] text-white/60 italic">Advanced Equipment</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#4E3953]/90 to-transparent p-4 z-10">
                  <h3 className="text-base font-serif-display text-white font-medium">
                    Advanced Equipment
                  </h3>
                  <p className="text-xs text-[#C0A8C9]">State-of-the-art diagnostic machinery</p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
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
                Schedule a consultation with Dr. Pooja Wadgaonkar for personalized, expert care.
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
