"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/Motion";

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
    image: "/infertility.webp",
    imageAlt: "Advanced Fertility and Reproductive Health Consultation",
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
    image: "/idk.jpg",
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
  const selectedService = CLINICAL_SERVICES[activeTab];

  return (
    <section className="py-12 md:py-28 border-t border-[#CFC3CC]/30 bg-white">
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

        {/* MOBILE INTERACTIVE TAB SELECTOR (lg:hidden) */}
        <div className="lg:hidden space-y-6">
          {/* Scrollable Category Pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-5 px-5">
            {CLINICAL_SERVICES.map((service, idx) => (
              <button
                key={service.title}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === idx
                    ? "bg-[#7B5A7E] text-white shadow-md shadow-[#7B5A7E]/20"
                    : "bg-[#F3EEF5] text-[#4E3953] hover:bg-[#EBDDE5]"
                }`}
              >
                {service.category}
              </button>
            ))}
          </div>

          {/* Active Service Card */}
          <div className="bg-[#FAF7F8] rounded-3xl p-5 sm:p-6 border border-[#CFC3CC]/30 space-y-5">
            {/* Service Image */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md border border-[#CFC3CC]/40 bg-[#F3EEF5]">
              <Image
                src={selectedService.image}
                alt={selectedService.imageAlt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* Service Title */}
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#D46789]">
                {selectedService.indexStr} • {selectedService.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif-display font-semibold text-[#4E3953] leading-snug">
                {selectedService.title}
              </h3>
            </div>

            {/* Service Keypoints */}
            <div className="space-y-2">
              {selectedService.points.map((point) => (
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
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact#book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#7B5A7E] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md shadow-[#7B5A7E]/15 text-center"
              >
                <span>{selectedService.ctaLabel}</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </Link>

              <a
                href={`https://wa.me/918446608581?text=${encodeURIComponent(
                  selectedService.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full border border-[#CFC3CC]/50 bg-white text-[#4E3953] text-xs font-bold uppercase tracking-wider text-center"
              >
                <span className="material-symbols-outlined text-base text-[#D46789]">
                  chat
                </span>
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>

        {/* DESKTOP ALTERNATING EDITORIAL ROWS (hidden lg:block) */}
        <div className="hidden lg:block space-y-24">
          {CLINICAL_SERVICES.map((service, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <FadeIn key={service.title} direction="up">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
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
                        href={`https://wa.me/918446608581?text=${encodeURIComponent(
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
