"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";

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
    imageAlt: "Advanced Fertility and Reproductive Health Consultation",
    items: [
      "Comprehensive Fertility Evaluation (Male & Female)",
      "Ovulation Induction & Follicular Monitoring",
      "Intrauterine Insemination (IUI)",
      "Management of PCOS & Endometriosis",
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
      "Keyhole Surgeries for Faster Recovery",
      "Laparoscopic Hysterectomy",
      "Laparoscopic Myomectomy",
      "Ovarian Cystectomy",
      "Laparoscopy / Hysteroscopy for Infertility",
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
      "Antenatal Care & Routine Screenings",
      "High-Risk Pregnancy Management",
      "Normal Delivery, VBAC, & C-Sections",
      "Postnatal Care & Breastfeeding Support",
    ],
    ctaLabel: "Book Maternity Consultation",
    whatsappMessage:
      "Hello Dr. Pooja, I would like to book a Maternity / Antenatal Care consultation.",
    blogCategoryLink: "/blog?category=Maternity%20%26%20Pregnancy",
  },
  {
    badge: "Women's Wellness",
    icon: "health_and_safety",
    title: "General & Preventive Gynaecology",
    description:
      "Comprehensive, confidential care addressing female wellness across all life stages—from adolescent menstrual health and preventive cancer screenings to menopausal transitions.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Women's Preventive Healthcare and Hormonal Wellness",
    items: [
      "Abnormal Uterine Bleeding & Irregular Cycles",
      "Adolescent Gynaecology",
      "Pap Smears & Cervical Cancer Screening",
      "Perimenopause & Menopause Management",
    ],
    ctaLabel: "Schedule Gynaecology Checkup",
    whatsappMessage:
      "Hello Dr. Pooja, I would like to schedule a General Gynaecology checkup.",
    blogCategoryLink: "/blog?category=Women%27s%20Wellness",
  },
];

function OfferingCard({ offering, index }: { offering: ClinicalOffering; index: number }) {
  return (
    <StaggerItem>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="group h-full bg-white rounded-3xl overflow-hidden border border-[#CFC3CC]/40 organic-shadow hover:organic-shadow-hover transition-all duration-300 flex flex-col"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={offering.image}
            alt={offering.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E1E32]/35 to-transparent" />

          {/* Badge chip */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#D46789]">
              {offering.icon}
            </span>
            <span className="text-[10px] font-bold text-[#7B5A7E] uppercase tracking-wider">
              {offering.badge}
            </span>
          </div>

          {/* Index */}
          <span className="absolute bottom-3 right-4 text-5xl font-serif-display font-bold text-white/30 select-none pointer-events-none">
            0{index + 1}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6 sm:p-7 space-y-4">
          <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-[#4E3953] leading-snug">
            {offering.title}
          </h3>

          <p className="text-sm text-[#464647] font-light leading-relaxed">
            {offering.description}
          </p>

          {/* Compact procedure list */}
          <ul className="grid grid-cols-1 gap-y-1.5 pt-1 flex-1">
            {offering.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="material-symbols-outlined text-[#D46789] text-sm shrink-0 mt-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span className="text-[13px] font-medium text-[#4E3953] leading-snug">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="pt-2 border-t border-[#CFC3CC]/30 flex items-center justify-between gap-3 mt-auto">
            <a
              href={`https://wa.me/918446608581?text=${encodeURIComponent(
                offering.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#7B5A7E] hover:bg-[#4E3953] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#7B5A7E]/15 active:scale-95"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              <span className="hidden sm:inline">{offering.ctaLabel}</span>
              <span className="sm:hidden">Enquire</span>
            </a>

            <Link
              href={offering.blogCategoryLink}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#7B5A7E] hover:text-[#4E3953] transition-colors"
            >
              <span>Guides</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </motion.article>
    </StaggerItem>
  );
}

export default function ServicesShowcase() {
  return (
    <section className="py-24 md:py-32 border-t border-[#CFC3CC]/30 bg-gradient-to-b from-[#FDFBFC] via-white to-[#FAF7F9]">
      <div className="px-5 md:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-8 md:pb-12 border-b border-[#CFC3CC]/30 mb-14 md:mb-20">
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

        {/* Bento Grid — 4 self-contained editorial cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {CLINICAL_OFFERINGS.map((offering, idx) => (
            <OfferingCard key={offering.title} offering={offering} index={idx} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
