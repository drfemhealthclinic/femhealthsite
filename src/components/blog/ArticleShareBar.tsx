"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ArticleShareBarProps {
  title: string;
  slug: string;
}

export default function ArticleShareBar({ title, slug }: ArticleShareBarProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return `https://femhealthclinic.in/blog/${slug}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${title} - Read Dr. Pooja's article: ${getUrl()}`
  )}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${title} - via FemHealth Clinic`
  )}&url=${encodeURIComponent(getUrl())}`;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    getUrl()
  )}`;

  return (
    <div className="flex items-center gap-2 relative">
      <span className="text-xs font-semibold text-[#878787] mr-1 hidden sm:inline">
        Share:
      </span>

      {/* WhatsApp */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors flex items-center justify-center shadow-xs"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>

      {/* LinkedIn */}
      <motion.a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-8 h-8 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors flex items-center justify-center shadow-xs"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6H9.2v-7.6H6.46M7.83 6.6a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
        </svg>
      </motion.a>

      {/* Twitter / X */}
      <motion.a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-8 h-8 rounded-full bg-[#000000]/10 text-[#1B1C1C] hover:bg-[#1B1C1C] hover:text-white transition-colors flex items-center justify-center shadow-xs"
        aria-label="Share on X"
        title="Share on X"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </motion.a>

      {/* Copy Link */}
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-8 h-8 rounded-full bg-[#7B5A7E]/10 text-[#7B5A7E] hover:bg-[#7B5A7E] hover:text-white transition-colors flex items-center justify-center shadow-xs"
        aria-label="Copy link to clipboard"
        title="Copy Link"
      >
        <span className="material-symbols-outlined text-base">
          {copied ? "check" : "link"}
        </span>
      </motion.button>

      {/* Copied Toast */}
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -top-8 right-0 bg-[#4E3953] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md"
          >
            Link copied!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
