"use client";

import { motion } from "framer-motion";

export default function WelcomeQuote() {
  return (
    <section className="bg-[#F5F3F4] border-y border-[#CFC3CC]/30 overflow-hidden">
      <div className="px-5 md:px-12 py-16 md:py-24 max-w-4xl mx-auto text-center space-y-6">
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="material-symbols-outlined text-[#C0A8C9] text-5xl block"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          format_quote
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-xl sm:text-2xl md:text-3xl font-serif-display text-[#4E3953] leading-relaxed"
        >
          &ldquo;Every woman&rsquo;s health journey is unique. My practice is built on a foundation of empathy, clinical excellence, and cutting-edge medical technology—ensuring you receive personalised care at every stage of life, from adolescence to motherhood and beyond.&rdquo;
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-4 border-t border-[#C0A8C9]/60 w-24 mx-auto origin-center"
        />
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="block text-xs font-bold text-[#464647] tracking-widest uppercase"
        >
          Dr. Pooja Wadgaonkar Patil
        </motion.span>
      </div>
    </section>
  );
}
