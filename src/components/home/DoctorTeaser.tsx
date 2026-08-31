"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/Motion";

export default function DoctorTeaser() {
  return (
    <section className="px-5 md:px-12 py-16 md:py-24 max-w-7xl mx-auto my-12">
      <FadeIn direction="up">
        <div className="bg-[#F5F3F4] rounded-3xl p-8 md:p-14 border border-[#CFC3CC]/30 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xs uppercase tracking-widest text-[#7B5A7E] font-bold block"
              >
                Lead Consultant
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl font-serif-display text-[#4E3953]"
              >
                Meet Dr. Pooja Wadgaonkar Patil
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm md:text-base text-[#464647] leading-relaxed"
              >
                Dr. Pooja Wadgaonkar Patil is an accomplished Consultant Obstetrician, Gynaecologist, Laparoscopic Surgeon, and Infertility Specialist. With extensive expertise in managing high-risk pregnancies, performing minimally invasive surgeries, and guiding couples through their fertility journeys, Dr. Pooja Wadgaonkar Patil brings both clinical precision and heartfelt dedication to every patient.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pt-2"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 border border-[#7B5A7E] text-[#7B5A7E] px-8 py-3.5 rounded text-xs font-semibold tracking-widest uppercase hover:bg-[#F3EEF5] transition-colors"
                  >
                    Read Full Bio
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full aspect-[3/4] md:aspect-[3/4]"
            >
              {/* Decorative background shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C0A8C9]/20 to-[#E898A8]/20 rounded-2xl -rotate-3 scale-105" />
              {/* Photo container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden organic-shadow border border-[#CFC3CC]/40">
                <Image
                  src="/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg"
                  alt="Dr. Pooja Wadgaonkar Patil - Expert Obstetrician and Advanced Laparoscopic Surgeon Pune"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
