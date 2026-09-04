"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/Motion";
import { CLINIC } from "@/lib/clinic";

interface ClinicalService {
  indexStr: string;
  category: string;
  title: string;
  image: string;
  imageAlt: string;
  points: string[];
  ctaLabel: string;
  whatsappMessage: string;
}

const CLINICAL_SERVICES: ClinicalService[] = [
  {
    indexStr: "01",
    category: "Reproductive Medicine",
    title: "Advanced Infertility & Reproductive Health",
    image: "/IMG_4218.JPG",
    imageAlt: "Advanced Infertility and Reproductive Health Consultation",
    points: [
      "Comprehensive Fertility Evaluation (Male & Female)",
      "Ovulation Induction & Follicular Monitoring",
      "Intrauterine Insemination (IUI)",
      "Management of Polycystic Ovarian Syndrome (PCOS) & Endometriosis",
      "Recurrent Pregnancy Loss Evaluation",
    ],
    ctaLabel: "Consult for Fertility",
    whatsappMessage:
      "Hello Dr. Pooja, I would like to inquire about an Infertility and Reproductive Health consultation.",
  },
  {
    indexStr: "02",
    category: "Minimally Invasive Surgery",
    title: "Minimally Invasive / Laparoscopic Surgery",
    image: "/laparoscopic-surgery.jpg",
    imageAlt: "Advanced Laparoscopic Gynaecological Surgery Suite",
    points: [
      "Keyhole Surgeries for Faster Recovery & Minimal Pain",
      "Laparoscopic Hysterectomy (Uterus Removal)",
      "Laparoscopic Myomectomy (Fibroid Removal)",
      "Ovarian Cystectomy (Cyst Removal)",
      "Diagnostic & Operative Laparoscopy / Hysteroscopy for Infertility",
      "Treatment for Ectopic Pregnancy",
      "Laparoscopic Tubal Ligation",
      "Hysteroscopic Polypectomy & D&C",
    ],
    ctaLabel: "Consult for Surgery",
    whatsappMessage:
      "Hello Dr. Pooja, I would like to consult regarding Laparoscopic / Minimally Invasive Surgery.",
  },
  {
    indexStr: "03",
    category: "Maternal & Fetal Care",
    title: "Comprehensive Obstetrics (Maternity Care)",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Compassionate Maternity Care and Antenatal Guidance",
    points: [
      "Pre-conception Counseling & Health Optimization",
      "Antenatal (Pregnancy) Care & Routine Screenings",
      "High-Risk Pregnancy Management (Gestational Diabetes, Hypertension, Multiple Gestations)",
      "Normal Delivery, Vaginal Birth After Cesarean (VBAC), & C-Sections",
      "Postnatal Care, Breastfeeding Support, & Postpartum Mental Health",
    ],
    ctaLabel: "Book Maternity Visit",
    whatsappMessage:
      "Hello Dr. Pooja, I would like to book a Maternity / Antenatal Care consultation.",
  },
  {
    indexStr: "04",
    category: "Women's Wellness",
    title: "General & Preventive Gynaecology",
    image: "/preventive.jpg",
    imageAlt: "Women's Preventive Healthcare and Hormonal Wellness",
    points: [
      "Treatment for Abnormal Uterine Bleeding (AUB) & Irregular Cycles",
      "Adolescent Gynaecology & Menstrual Disorders",
      "Pap Smears, HPV Vaccination & Cervical Cancer Screening",
      "Perimenopause & Menopause Management",
    ],
    ctaLabel: "Schedule Checkup",
    whatsappMessage:
      "Hello Dr. Pooja, I would like to schedule a General Gynaecology checkup.",
  },
];

export default function ServicesShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Automatically scroll the top pills horizontally ONLY so the active heading stays centered
  useEffect(() => {
    const activePill = pillRefs.current[activeTab];
    const pillContainer = activePill?.parentElement;
    if (activePill && pillContainer) {
      const containerRect = pillContainer.getBoundingClientRect();
      const pillRect = activePill.getBoundingClientRect();
      const offset =
        pillRect.left -
        containerRect.left -
        (containerRect.width - pillRect.width) / 2;

      pillContainer.scrollTo({
        left: pillContainer.scrollLeft + offset,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  const scrollToService = (idx: number) => {
    setActiveTab(idx);
    const container = mobileCarouselRef.current;
    const card = cardRefs.current[idx];
    if (container && card) {
      // Scroll strictly horizontally inside the container — ZERO vertical page jump
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const offset =
        cardRect.left -
        containerRect.left -
        (containerRect.width - cardRect.width) / 2;

      container.scrollTo({
        left: container.scrollLeft + offset,
        behavior: "smooth",
      });
    }
  };

  const handleMobileScroll = () => {
    const el = mobileCarouselRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 300;
    const gap = 16;
    const scrollPos = el.scrollLeft + cardWidth / 2;
    const newIdx = Math.min(
      CLINICAL_SERVICES.length - 1,
      Math.max(0, Math.floor(scrollPos / (cardWidth + gap)))
    );
    if (newIdx !== activeTab) {
      setActiveTab(newIdx);
    }
  };

  useEffect(() => {
    // 1. Listen for custom event dispatched by Footer or other components
    const handleServiceTabEvent = (e: CustomEvent<{ index: number }>) => {
      if (typeof e.detail?.index === "number") {
        const idx = e.detail.index;
        if (idx >= 0 && idx < CLINICAL_SERVICES.length) {
          scrollToService(idx);
        }
      }
    };

    // 2. Parse URL parameters or hash on mount/hashchange
    const checkHashOrQuery = () => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      let targetIdx = -1;

      if (params.has("service")) {
        targetIdx = parseInt(params.get("service") || "-1", 10);
      } else if (hash.startsWith("#service-")) {
        targetIdx = parseInt(hash.replace("#service-", ""), 10);
      }

      if (targetIdx >= 0 && targetIdx < CLINICAL_SERVICES.length) {
        scrollToService(targetIdx);
        setTimeout(() => {
          const isDesktop = window.innerWidth >= 1024;
          const targetId = isDesktop ? `clinical-service-${targetIdx}` : "services";
          const el = document.getElementById(targetId) || document.getElementById("services");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      } else if (hash === "#services") {
        setTimeout(() => {
          const el = document.getElementById("services");
          if (el) {
            const navOffset = window.innerWidth < 768 ? 75 : 95;
            const targetY = el.getBoundingClientRect().top + window.scrollY - navOffset;
            window.scrollTo({
              top: Math.max(0, targetY),
              behavior: "smooth",
            });
          }
        }, 150);
      }
    };

    window.addEventListener(
      "femhealth:open-service-tab",
      handleServiceTabEvent as EventListener
    );
    window.addEventListener("hashchange", checkHashOrQuery);

    checkHashOrQuery();

    return () => {
      window.removeEventListener(
        "femhealth:open-service-tab",
        handleServiceTabEvent as EventListener
      );
      window.removeEventListener("hashchange", checkHashOrQuery);
    };
  }, []);

  return (
    <section id="services" className="py-12 md:py-28 border-t border-[#CFC3CC]/30 bg-white scroll-mt-24">
      <div className="px-5 md:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 md:pb-8 border-b border-[#CFC3CC]/30 mb-8 md:mb-16">
            <div className="space-y-2 md:space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#D46789] font-bold block">
                Clinical Offerings
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-display text-[#4E3953] font-semibold leading-tight">
                Services Overview
              </h2>
            </div>
            <p className="text-sm md:text-base text-[#464647] font-light max-w-md md:text-right leading-relaxed">
              Comprehensive clinical specializations and advanced surgical procedures led by Dr. Pooja Wadgaonkar Patil.
            </p>
          </div>
        </FadeIn>

        {/* MOBILE INTERACTIVE SWIPE CAROUSEL (lg:hidden) */}
        <div className="lg:hidden space-y-4">
          {/* Scrollable Category Pills / Synced Top Headings */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mx-5 px-5">
            {CLINICAL_SERVICES.map((service, idx) => (
              <button
                key={service.title}
                ref={(el) => {
                  pillRefs.current[idx] = el;
                }}
                type="button"
                onClick={() => scrollToService(idx)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === idx
                    ? "bg-[#7B5A7E] text-white shadow-md shadow-[#7B5A7E]/20"
                    : "bg-[#F3EEF5] text-[#4E3953] hover:bg-[#EBDDE5]"
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* Swipeable Cards Row with Title Fixed to Each Card */}
          <div
            ref={mobileCarouselRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-5 px-5 pb-2 gap-4"
          >
            {CLINICAL_SERVICES.map((service, idx) => (
              <div
                key={service.title}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="w-[85vw] sm:w-[70vw] shrink-0 snap-center flex flex-col bg-[#FAF7F8] rounded-3xl p-5 sm:p-6 border border-[#CFC3CC]/30 space-y-4"
              >
                {/* Service Title - Fixed at the top of each card so it slides in perfect sync */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif-display font-semibold text-[#4E3953] leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* Service Image */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md border border-[#CFC3CC]/40 bg-[#F3EEF5] shrink-0">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 768px) 85vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Service Keypoints */}
                <div className="space-y-2 flex-grow">
                  {service.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#CFC3CC]/25"
                    >
                      <span
                        className="material-symbols-outlined text-[#D46789] text-base shrink-0 mt-0.5"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className="text-xs font-medium text-[#464647] leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col gap-2.5 mt-auto">
                  <Link
                    href="/contact#book"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#7B5A7E] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md shadow-[#7B5A7E]/15 text-center"
                  >
                    <span>{service.ctaLabel}</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </Link>

                  <a
                    href={`${CLINIC.whatsappHref}?text=${encodeURIComponent(
                      service.whatsappMessage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full border border-[#CFC3CC]/50 bg-white text-[#4E3953] text-xs font-bold uppercase tracking-wider text-center"
                  >
                    <span className="material-symbols-outlined text-base text-[#D46789]">
                      chat
                    </span>
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Progress / Position Indicator */}
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="w-24 h-1 bg-[#CFC3CC]/30 rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 bottom-0 bg-[#D46789] rounded-full transition-all duration-150"
                style={{
                  width: "25%",
                  left: `${(activeTab / (CLINICAL_SERVICES.length - 1 || 1)) * 75}%`,
                }}
              />
            </div>
            <span className="text-[11px] font-medium text-[#7B5A7E] tracking-wider">
              {activeTab + 1} of {CLINICAL_SERVICES.length} • Swipe to explore
            </span>
          </div>
        </div>

        {/* DESKTOP ALTERNATING EDITORIAL ROWS (hidden lg:block) */}
        <div className="hidden lg:block space-y-24">
          {CLINICAL_SERVICES.map((service, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <FadeIn key={service.title} direction="up">
                <div
                  id={`clinical-service-${idx}`}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center scroll-mt-32 ${
                    idx !== CLINICAL_SERVICES.length - 1
                      ? "pb-16 md:pb-24 border-b border-[#CFC3CC]/25"
                      : ""
                  }`}
                >
                  {/* Photo Column */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.015 }}
                      transition={{ duration: 0.3 }}
                      className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-xl shadow-[#7B5A7E]/10 border border-[#CFC3CC]/40 bg-[#F3EEF5] group"
                    >
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </motion.div>
                  </div>

                  {/* Content Column: Category, Heading & Full Keypoints */}
                  <div
                    className={`lg:col-span-7 space-y-6 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-semibold text-[#4E3953] leading-snug">
                        {service.title}
                      </h3>
                    </div>

                    {/* All points preserved — clean 2-column or list grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {service.points.map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F9F5F7] border border-[#CFC3CC]/25 hover:border-[#D46789]/35 hover:bg-[#F9E4EA]/25 transition-all duration-200"
                        >
                          <span
                            className="material-symbols-outlined text-[#D46789] text-base shrink-0 mt-0.5"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-[#464647] leading-snug">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Link
                        href="/contact#book"
                        className="inline-flex items-center gap-2 bg-[#7B5A7E] hover:bg-[#4E3953] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#7B5A7E]/15 active:scale-95"
                      >
                        <span>{service.ctaLabel}</span>
                        <span className="material-symbols-outlined text-xs">arrow_forward</span>
                      </Link>

                      <a
                        href={`${CLINIC.whatsappHref}?text=${encodeURIComponent(
                          service.whatsappMessage
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#CFC3CC]/50 bg-white hover:bg-[#F9E4EA] hover:border-[#D46789] text-[#4E3953] text-xs font-bold uppercase tracking-wider transition-all"
                      >
                        <span className="material-symbols-outlined text-base text-[#D46789]">
                          chat
                        </span>
                        <span>WhatsApp Inquiry</span>
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
