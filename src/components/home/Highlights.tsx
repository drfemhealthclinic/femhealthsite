"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/Motion";

const HIGHLIGHTS = [
  {
    title: "Obstetrics",
    desc: "Complete Pregnancy & High-Risk Maternity Care",
    icon: "pregnant_woman",
    badge: "Maternity",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Obstetrics and High-Risk Pregnancy Care by Dr. Pooja",
    link: "/blog?category=Maternity%20%26%20Pregnancy",
  },
  {
    title: "Laparoscopy",
    desc: "Scarless, Fast-Recovery Surgical Solutions",
    icon: "healing",
    badge: "Minimally Invasive",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Advanced Laparoscopic Gynaecological Surgery",
    link: "/blog?category=Laparoscopic%20Surgery",
  },
  {
    title: "Infertility",
    desc: "Personalised Conception Plans & Fertility Enhancement",
    icon: "family_restroom",
    badge: "Reproductive Care",
    image:
      "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Fertility Evaluation and Conception Counseling",
    link: "/blog?category=Infertility%20%26%20IVF",
  },
  {
    title: "Preventive Care",
    desc: "Routine Gynaecological Check-ups & Cancer Screenings",
    icon: "health_and_safety",
    badge: "Wellness & Screenings",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Preventive Gynaecological Checkups and Cervical Screening",
    link: "/blog?category=Women%27s%20Wellness",
  },
];

export default function Highlights() {
  return (
    <section className="py-20 md:py-28 px-5 md:px-12 max-w-7xl mx-auto space-y-12 md:space-y-16">
      {/* Section Header */}
      <FadeIn direction="up">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold tracking-widest text-[#D46789] uppercase block">
            Clinical Focus
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-display text-[#4E3953] font-semibold leading-tight">
            Core Key Highlights
          </h2>
          <p className="text-sm md:text-base text-[#464647] font-light leading-relaxed">
            Specialized clinical expertise delivered with empathy, cutting-edge surgical precision, and evidence-based protocols.
          </p>
        </div>
      </FadeIn>

      {/* 4-Card Photographic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {HIGHLIGHTS.map((item, idx) => (
          <FadeIn key={item.title} direction="up" delay={idx * 0.08}>
            <Link href={item.link} className="group block h-full">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl overflow-hidden border border-[#CFC3CC]/40 organic-shadow hover:shadow-xl hover:border-[#7B5A7E]/50 transition-all duration-300 flex flex-col h-full"
              >
                {/* Photo Window */}
                <div className="relative w-full h-48 sm:h-52 bg-[#F3EEF5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#7B5A7E] shadow-sm">
                    {item.badge}
                  </div>

                  {/* Bottom Icon */}
                  <div className="absolute bottom-3 right-3 w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                    <span className="material-symbols-outlined text-lg">
                      {item.icon}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif-display font-bold text-[#4E3953] group-hover:text-[#7B5A7E] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#464647] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#CFC3CC]/20 flex items-center justify-between text-xs font-bold text-[#7B5A7E]">
                    <span>Explore Care</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </motion.article>
            </Link>
          </FadeIn>
        ))}
      </div>

      {/* 5th Highlight: Lifestyle & Endocrine Banner with Photography */}
      <FadeIn direction="up" delay={0.25}>
        <div className="bg-gradient-to-br from-[#FAF7F9] via-white to-[#F3EEF5] rounded-3xl border border-[#CFC3CC]/50 overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
          {/* Left Column Details */}
          <div className="p-8 sm:p-10 lg:p-12 lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D46789]/10 text-[#D46789] text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">spa</span>
              <span>Hormonal &amp; Metabolic Care</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-[#4E3953] leading-tight">
              Lifestyle &amp; Endocrine Disorders Management
            </h3>

            <p className="text-sm sm:text-base text-[#464647] font-light leading-relaxed max-w-xl">
              Holistic, sustainable, and evidence-based protocols for Polycystic Ovary Syndrome (PCOS/PCOD), insulin resistance, thyroid imbalances, weight management, and cycle regularity.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/918446608581?text=Hello%20Dr.%20Pooja,%20I%20would%20like%20to%20consult%20regarding%20PCOS%20and%20Hormonal%20Health"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#7B5A7E] hover:bg-[#4E3953] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                <span>Inquire About PCOS Care</span>
              </a>

              <Link
                href="/blog?category=PCOS%20%26%20PCOD"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B5A7E] hover:text-[#4E3953] px-4 py-3 transition-colors"
              >
                <span>Read PCOS Guides</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Right Column Photo */}
          <div className="relative h-64 sm:h-80 lg:h-full min-h-[260px] lg:col-span-5 bg-[#F3EEF5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
              alt="Lifestyle and Endocrine Disorders Management - PCOS and Hormonal Health"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#4E3953] shadow-md flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#D46789]">spa</span>
              <span>Holistic Wellness Synergy</span>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
