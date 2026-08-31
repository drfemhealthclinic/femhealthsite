"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CLINIC } from "@/lib/clinic";

export default function FloatingContact() {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const actions = [
    {
      id: "phone",
      href: CLINIC.phoneHref,
      label: "Call Us",
      icon: "call",
      bg: "bg-[#7B5A7E]",
      hoverBg: "hover:bg-[#4E3953]",
      shadow: "shadow-[#7B5A7E]/30",
    },
    {
      id: "whatsapp",
      href: CLINIC.whatsappHref,
      label: "WhatsApp",
      icon: null, // using SVG for WhatsApp
      bg: "bg-[#25D366]",
      hoverBg: "hover:bg-[#1EB954]",
      shadow: "shadow-[#25D366]/30",
    },
    {
      id: "email",
      href: CLINIC.emailHref,
      label: "Email Us",
      icon: "mail",
      bg: "bg-[#D46789]",
      hoverBg: "hover:bg-[#C0506F]",
      shadow: "shadow-[#D46789]/30",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
      {actions.map((action) => (
        <div key={action.id} className="relative flex items-center">
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip === action.id && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-full mr-3 whitespace-nowrap px-3 py-1.5 rounded-lg bg-[#4E3953] text-white text-xs font-semibold shadow-lg"
              >
                {action.label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.a
            href={action.href}
            target={action.id === "whatsapp" ? "_blank" : undefined}
            rel={action.id === "whatsapp" ? "noopener noreferrer" : undefined}
            onMouseEnter={() => setShowTooltip(action.id)}
            onMouseLeave={() => setShowTooltip(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-14 h-14 rounded-full ${action.bg} ${action.hoverBg} text-white flex items-center justify-center shadow-lg ${action.shadow} transition-colors duration-200`}
            aria-label={action.label}
          >
            {action.icon ? (
              <span
                className="material-symbols-outlined text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {action.icon}
              </span>
            ) : (
              /* WhatsApp SVG icon */
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            )}
          </motion.a>
        </div>
      ))}
    </div>
  );
}
