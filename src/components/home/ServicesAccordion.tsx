"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/Motion";

export default function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const services = [
    {
      num: "01",
      icon: "family_restroom",
      title: "Advanced Infertility & Reproductive Health",
      items: [
        "Comprehensive Fertility Evaluation (Male & Female)",
        "Ovulation Induction & Follicular Monitoring",
        "Intrauterine Insemination (IUI)",
        "Management of Polycystic Ovarian Syndrome (PCOS) & Endometriosis",
        "Recurrent Pregnancy Loss Evaluation",
      ],
    },
    {
      num: "02",
      icon: "healing",
      title: "Minimally Invasive / Laparoscopic Surgery",
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
    },
    {
      num: "03",
      icon: "pregnant_woman",
      title: "Comprehensive Obstetrics (Maternity Care)",
      items: [
        "Pre-conception Counseling & Health Optimization",
        "Antenatal (Pregnancy) Care & Routine Screenings",
        "High-Risk Pregnancy Management (Gestational Diabetes, Hypertension, Multiple Gestations)",
        "Normal Delivery, Vaginal Birth After Cesarean (VBAC), & C-Sections",
        "Postnatal Care, Breastfeeding Support, & Postpartum Mental Health",
      ],
    },
    {
      num: "04",
      icon: "health_and_safety",
      title: "General & Preventive Gynaecology",
      items: [
        "Treatment for Abnormal Uterine Bleeding (AUB) & Irregular Cycles",
        "Adolescent Gynaecology & Menstrual Disorders",
        "Pap Smears, HPV Vaccination & Cervical Cancer Screening",
        "Perimenopause & Menopause Management",
      ],
    },
  ];

  const toggleService = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 md:py-32 border-t border-[#CFC3CC]/30 bg-white">
      <div className="px-5 md:px-12 max-w-7xl mx-auto">
        {/* Section header — editorial alignment */}
        <FadeIn direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20 md:mb-24">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#7B5A7E] font-bold">
                Clinical Offerings
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-display text-[#4E3953] font-semibold leading-tight">
                Services Overview
              </h2>
            </div>
            <div className="lg:col-span-4 flex items-end">
              <p className="text-sm text-[#878787] leading-relaxed lg:text-right">
                Comprehensive care across every stage of a woman&apos;s health journey
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Editorial interactive accordion rows */}
        <div className="space-y-0">
          {services.map((service, idx) => {
            const isOpen = openIndex === idx;
            return (
              <FadeIn key={service.num} direction="up" delay={idx * 0.08}>
                <div className="border-b border-[#CFC3CC]/30 first:border-t">
                  <button
                    onClick={() => toggleService(idx)}
                    className="w-full text-left group flex items-center justify-between py-6 md:py-8 gap-4 px-2 rounded-lg transition-all duration-300 hover:bg-[#FDFBFC]/50"
                  >
                    {/* Left: Number + Icon + Title */}
                    <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
                      <span className="text-3xl md:text-4xl font-serif-display font-semibold text-[#EFEDEE] group-hover:text-[#C0A8C9] transition-colors duration-500 shrink-0">
                        {service.num}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-[#F3EEF5] flex items-center justify-center text-[#7B5A7E] group-hover:bg-[#7B5A7E] group-hover:text-white transition-all duration-300 shrink-0">
                        <span
                          className="material-symbols-outlined text-lg"
                          style={{ fontVariationSettings: "'FILL' 0" }}
                        >
                          {service.icon}
                        </span>
                      </div>
                      <h3 className="text-base md:text-xl font-serif-display font-semibold text-[#4E3953] leading-snug group-hover:text-[#7B5A7E] transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>

                    {/* Right: Toggle Indicator */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="w-8 h-8 rounded-full border border-[#CFC3CC]/40 flex items-center justify-center text-[#7B5A7E] group-hover:border-[#7B5A7E]/50 shrink-0"
                    >
                      <span className="material-symbols-outlined text-lg">
                        keyboard_arrow_down
                      </span>
                    </motion.div>
                  </button>

                  {/* Dropdown Items list */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-2 lg:pl-[104px] pr-2 pb-8">
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                            {service.items.map((item) => (
                              <motion.li
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                key={item}
                                className="flex items-start gap-2.5 text-sm text-[#464647] leading-relaxed py-1"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D46789] mt-2 shrink-0" />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
