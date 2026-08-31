"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/Motion";

interface ClinicalOffering {
  badge: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  items: string[];
  ctaLabel: string;
  whatsappMessage: string;
  blogCategoryLink: string;
}

const CLINICAL_OFFERINGS: ClinicalOffering[] = [
  {
    badge: "Reproductive Medicine",
    icon: "family_restroom",
    title: "Advanced Infertility & Reproductive Health",
    description:
      "Evidence-based fertility evaluation, precision cycle monitoring, and personalized reproductive care designed to support and guide your journey to parenthood.",
    image:
      "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Dr. Pooja Wadgaonkar Patil - Advanced Fertility and Reproductive Health Consultation",
    items: [
      "Comprehensive Fertility Evaluation (Male & Female)",
      "Ovulation Induction & Follicular Monitoring",
      "Intrauterine Insemination (IUI)",
      "Management of Polycystic Ovarian Syndrome (PCOS) & Endometriosis",
      "Recurrent Pregnancy Loss Evaluation",
    ],
    ctaLabel: "Inquire About Fertility Care",
    whatsappMessage:
      "Hello Dr. Pooja, I would like to inquire about an Infertility and Reproductive Health consultation.",
    blogCategoryLink: "/blog?category=Infertility%20%26%20IVF",
  },
  {
    badge: "Minimally Invasive Surgery",
    icon: "healing",
    title: "Minimally Invasive / Laparoscopic Surgery",
    description:
      "Advanced keyhole surgical techniques delivering pinpoint precision, maximal fertility preservation, minimal post-operative discomfort, and rapid return to everyday life.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Advanced Laparoscopic Gynaecological Surgery Suite",
    items: [
      "Keyhole Surgeries for Faster Recovery & Minimal Pain",
      "Laparoscopic Hysterectomy (Uterus Removal)",
      "Laparoscopic Myomectomy (Fibroid Removal)",
      "Ovarian Cystectomy (Cyst Removal)",
      "Diagnostic & Operative Laparoscopy / Hysteroscopy for Infertility",
      "Treatment for Ectopic Pregnancy",
      "Laparoscopic Tubal Ligation",
      "Hysteroscopic Polypectomy & D&C",
    ],
    ctaLabel: "Consult for Laparoscopic Surgery",
    whatsappMessage:
      "Hello Dr. Pooja, I would like to consult regarding Laparoscopic / Minimally Invasive Surgery.",
    blogCategoryLink: "/blog?category=Laparoscopic%20Surgery",
  },
  {
    badge: "Maternal & Fetal Care",
    icon: "pregnant_woman",
    title: "Comprehensive Obstetrics (Maternity Care)",
    description:
      "Dedicated, compassionate care through every phase of pregnancy—from pre-conception optimization and high-risk surveillance to normal delivery support and postpartum well-being.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Compassionate Maternity Care and Antenatal Guidance",
    items: [
      "Pre-conception Counseling & Health Optimization",
      "Antenatal (Pregnancy) Care & Routine Screenings",
      "High-Risk Pregnancy Management (Gestational Diabetes, Hypertension, Multiple Gestations)",
      "Normal Delivery, Vaginal Birth After Cesarean (VBAC), & C-Sections",
      "Postnatal Care, Breastfeeding Support, & Postpartum Mental Health",
    ],
    ctaLabel: "Book Maternity Consultation",
    whatsappMessage:
      "Hello Dr. Pooja, I would like to book a Maternity / Antenatal Care consultation.",
    blogCategoryLink: "/blog?category=Maternity%20%26%20Pregnancy",
  },
  {
    badge: "Women's Wellness & Prevention",
    icon: "health_and_safety",
    title: "General & Preventive Gynaecology",
    description:
      "Comprehensive, confidential care addressing female wellness across all life stages—from adolescent menstrual health and regular preventive cancer screenings to smooth menopausal transitions.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Women's Preventive Healthcare and Hormonal Wellness",
    items: [
      "Treatment for Abnormal Uterine Bleeding (AUB) & Irregular Cycles",
      "Adolescent Gynaecology & Menstrual Disorders",
      "Pap Smears, HPV Vaccination & Cervical Cancer Screening",
      "Perimenopause & Menopause Management",
    ],
    ctaLabel: "Schedule Gynaecology Checkup",
    whatsappMessage:
      "Hello Dr. Pooja, I would like to schedule a General Gynaecology checkup.",
    blogCategoryLink: "/blog?category=Women%27s%20Wellness",
  },
];

export default function ServicesShowcase() {
  return (
    <section className="py-24 md:py-32 border-t border-[#CFC3CC]/30 bg-gradient-to-b from-[#FDFBFC] via-white to-[#FAF7F9]">
      <div className="px-5 md:px-12 max-w-7xl mx-auto space-y-20 md:space-y-28">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8 border-b border-[#CFC3CC]/30">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#D46789] font-bold">
                Clinical Offerings
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-display text-[#4E3953] font-semibold leading-tight">
                Services Overview
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm md:text-base text-[#464647] leading-relaxed lg:text-right font-light">
                Comprehensive, empathetic, and evidence-based care across every stage of a woman&apos;s health journey.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* 4 Alternating Z-Pattern Feature Rows */}
        <div className="space-y-24 md:space-y-32">
          {CLINICAL_OFFERINGS.map((offering, idx) => {
            const isEven = idx % 2 === 1; // 0: Left Photo, 1: Right Photo, 2: Left Photo, 3: Right Photo

            return (
              <FadeIn key={offering.title} direction="up" delay={0.1}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-5 relative ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="relative group">
                      {/* Decorative Background Aura */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#C0A8C9]/20 to-[#D46789]/15 rounded-3xl -rotate-2 scale-102 group-hover:rotate-0 transition-transform duration-500" />

                      {/* Photo Container */}
                      <div className="relative h-72 sm:h-88 lg:h-[430px] rounded-3xl overflow-hidden border border-[#CFC3CC]/50 shadow-xl shadow-[#7B5A7E]/8 bg-[#F3EEF5]">
                        <Image
                          src={offering.image}
                          alt={offering.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Gradient Overlay for Tag Legibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                        {/* Top Floating Badge */}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#7B5A7E] shadow-md flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-[#D46789]">
                            {offering.icon}
                          </span>
                          <span className="text-[11px] font-sans tracking-wide">
                            {offering.badge}
                          </span>
                        </div>

                        {/* Bottom Floating Subtitle */}
                        <div className="absolute bottom-5 left-5 right-5 text-white flex items-center gap-3">
                          <p className="text-xs font-medium text-white/95 leading-tight bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/20">
                            Dr. Pooja Wadgaonkar Patil · Specialist Care
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content & Tag Grid Column */}
                  <div
                    className={`lg:col-span-7 space-y-6 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    {/* Header */}
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7B5A7E]/10 text-[#7B5A7E] text-xs font-bold uppercase tracking-wider">
                        <span className="material-symbols-outlined text-sm">
                          {offering.icon}
                        </span>
                        <span>{offering.badge}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold text-[#4E3953] leading-tight">
                        {offering.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#464647] font-light leading-relaxed">
                        {offering.description}
                      </p>
                    </div>

                    {/* Verbatim Treatment Check-Cards Grid (Zero Generic Bullets) */}
                    <div className="space-y-2.5 pt-2">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#7B5A7E]">
                        Key Clinical Procedures &amp; Care Areas
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {offering.items.map((item, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.01, x: 2 }}
                            transition={{ duration: 0.2 }}
                            className="bg-[#FAF7F9] hover:bg-white p-3.5 rounded-2xl border border-[#CFC3CC]/40 hover:border-[#7B5A7E]/50 hover:shadow-md transition-all duration-200 flex items-start gap-2.5"
                          >
                            <span
                              className="material-symbols-outlined text-[#D46789] text-base shrink-0 mt-0.5"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                            <span className="text-xs sm:text-[13px] font-medium text-[#4E3953] leading-snug">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <a
                        href={`https://wa.me/918446608581?text=${encodeURIComponent(
                          offering.whatsappMessage
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#7B5A7E] hover:bg-[#4E3953] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#7B5A7E]/20 active:scale-95"
                      >
                        <span className="material-symbols-outlined text-base">
                          chat
                        </span>
                        <span>{offering.ctaLabel}</span>
                      </a>

                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 border border-[#CFC3CC] hover:border-[#7B5A7E] text-[#464647] hover:text-[#7B5A7E] bg-white px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        <span>Clinic Visit</span>
                      </Link>

                      <Link
                        href={offering.blogCategoryLink}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#7B5A7E] hover:text-[#4E3953] px-3 py-2 transition-colors ml-auto sm:ml-0"
                      >
                        <span>Read Guides</span>
                        <span className="material-symbols-outlined text-sm">
                          arrow_forward
                        </span>
                      </Link>
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
