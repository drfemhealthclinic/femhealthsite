"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FadeIn } from "@/components/ui/Motion";

interface Story {
  id: string;
  name: string;
  sub: string;
  quote: string;
  stars: number;
  color: string;
}

const stories: Story[] = [
  {
    id: "pooja-mane",
    name: "Pooja Mane",
    sub: "Virtual Consultation (USA)",
    quote:
      "I’m currently living in the USA, but I continue to consult Dr. Pooja as my gynac in Pune, and I’m really happy with the care. She has always been able to answer my questions clearly and explain things in a simple, practical way. Even through virtual consultations, she takes the time to understand my concerns and gives thoughtful guidance. I really appreciate how knowledgeable, patient, and approachable she is. Her advice always gives me confidence and peace of mind. I’m truly grateful to have a doctor I can trust even from so far away. I would definitely recommend her to anyone looking for a highly knowledgeable and caring gynecologist. ❤️",
    stars: 5,
    color: "#D46789",
  },
  {
    id: "shraddha-patil",
    name: "Shraddha Patil",
    sub: "PCOS Care",
    quote:
      "One of the best female gynaecs in Pune! Dr. Pooja Patil is extremely kind, empathetic and very clear in her explanation. Visited Femhealth Clinic for my PCOS concerns and I am completely satisfied with the treatment. Got the best treatment and guidance! She is very approachable and genuinely cares for her patients. 5/5 stars!",
    stars: 5,
    color: "#7B5A7E",
  },
  {
    id: "mayuri-kothare",
    name: "Mayuri Kothare",
    sub: "Online Consultation Patient",
    quote:
      "I have been taking online consultations with Dr. Pooja Wadgaonkar for the past few years, and she has been consistently exceptional. She is incredibly knowledgeable and takes the time to handle every single query promptly. What stands out most is her warm, friendly approach—her comforting demeanor makes every conversation feel easy, open, and reassuring. I highly recommend Dr. Pooja to anyone looking for an expert and genuinely caring doctor for women's health and gynecological issues. Thank you. 😊",
    stars: 5,
    color: "#C0A8C9",
  },
  {
    id: "sudeshna-hazra",
    name: "Sudeshna Hazra",
    sub: "Consultation Patient",
    quote:
      "Dr. Pooja has been extremely helpful and professional. She patiently listened to each and every concern I had and took the time to understand my issues thoroughly. I truly appreciate her attentive approach, empathy, and the care she provided throughout the consultation.",
    stars: 5,
    color: "#D46789",
  },
  {
    id: "shivani-khillare",
    name: "Shivani Khillare",
    sub: "Clinic Patient",
    quote:
      "Here I met with a very intelligent and soft speaking Dr. Pooja. I liked her consultation because she explains everything in details, and I feel completely satisfied by her consultation.",
    stars: 5,
    color: "#7B5A7E",
  },
  {
    id: "abhinaya",
    name: "Abhinaya",
    sub: "Teleconsultation",
    quote:
      "I connected with her through a call once regarding my issue. She provided immediate clarity, guidance, and peace of mind. The best and talented gynecologist I have come across.",
    stars: 5,
    color: "#C0A8C9",
  },
];

// Repeat stories multiple times for a seamless infinite scroll loop in both directions
const marqueeStories = [...stories, ...stories, ...stories, ...stories];

export default function Testimonials() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const oneSetWidthRef = useRef(0);

  // Sync state to ref so rAF loop reads latest without re-creating
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Temporarily pause auto-scroll during user interaction, resumes after 4s
  const triggerUserPause = () => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4500);
  };

  // Measure one complete set of stories for precise loop reset
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || el.children.length === 0) return;
    const firstCard = el.children[0] as HTMLElement;
    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    oneSetWidthRef.current = firstCard.offsetWidth * stories.length + gap * (stories.length - 1);
  }, []);

  // Continuous auto-scroll loop — runs once, reads isPausedRef.current each frame
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;

    const step = () => {
      if (!isPausedRef.current && !selectedStory && el) {
        el.scrollLeft += 0.8;
        const resetPoint = oneSetWidthRef.current;
        if (resetPoint > 0 && el.scrollLeft >= resetPoint) {
          el.scrollLeft -= resetPoint;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [selectedStory]);

  // Manual next/prev scroll handler
  const handleManualScroll = (direction: "left" | "right") => {
    triggerUserPause();
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.clientWidth < 640 ? 320 : 390;

    // Wrap around gracefully if scrolling left at the boundary
    if (direction === "left" && el.scrollLeft <= 20 && oneSetWidthRef.current > 0) {
      el.scrollLeft += oneSetWidthRef.current;
    }

    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedStory) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedStory]);

  // Handle ESC key for modal dismissal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedStory(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="w-full bg-white border-y border-[#CFC3CC]/20 py-20 md:py-28 overflow-hidden relative">
      {/* Header with Title & Manual Navigation Controls */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 mb-12">
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 text-center md:text-left">
              <span className="text-xs uppercase tracking-widest text-[#D46789] font-bold">
                Kind Words
              </span>
              <h2 className="text-3xl md:text-4xl font-serif-display text-[#4E3953]">
                Patient Stories
              </h2>
              <p className="text-sm md:text-base text-[#464647] max-w-xl">
                Real experiences from women who found compassionate, personalized healthcare with Dr. Pooja Wadgaonkar Patil.
              </p>
            </div>

            {/* Manual Scroll Controls (Arrows + Pause indicator) */}
            <div className="flex items-center justify-center md:justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleManualScroll("left")}
                aria-label="Scroll to previous testimonial"
                className="w-11 h-11 rounded-full border border-[#CFC3CC]/50 bg-white hover:bg-[#F9E4EA] hover:border-[#D46789] text-[#4E3953] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
              </button>

              <button
                type="button"
                onClick={() => handleManualScroll("right")}
                aria-label="Scroll to next testimonial"
                className="w-11 h-11 rounded-full border border-[#CFC3CC]/50 bg-white hover:bg-[#F9E4EA] hover:border-[#D46789] text-[#4E3953] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Infinite Horizontal Marquee Track with Manual Touch/Wheel/Drag capability */}
      <div className="relative w-full overflow-hidden">
        {/* Left edge fade gradient */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-10" />

        {/* Right edge fade gradient */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={triggerUserPause}
          onWheel={triggerUserPause}
          className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth py-4 px-6 md:px-12 focus:outline-hidden select-none cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            willChange: "scroll-position",
          }}
        >
          {marqueeStories.map((story, idx) => (
            <div
              key={`${story.id}-${idx}`}
              className="w-[300px] sm:w-[360px] md:w-[380px] shrink-0 flex flex-col"
            >
              <div
                className="rounded-2xl organic-shadow border border-[#CFC3CC]/30 relative flex flex-col justify-between group hover:border-[#D46789]/40 hover:shadow-xl transition-all duration-300 h-full overflow-hidden bg-white p-6 sm:p-7"
                style={{
                  background: `linear-gradient(180deg, ${story.color}14 0%, #FFFFFF 45%)`,
                }}
              >
                <div className="flex flex-col flex-1">
                  {/* Quote icon & Star rating */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="material-symbols-outlined text-4xl text-[#C0A8C9]/40"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      format_quote
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: story.stars }).map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-sm"
                          style={{
                            color: story.color,
                            fontVariationSettings: "'FILL' 1",
                          }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 3-4 lines content snippet only */}
                  <p className="text-sm text-[#464647] leading-relaxed italic line-clamp-3 mb-4 flex-1">
                    &ldquo;{story.quote}&rdquo;
                  </p>

                  {/* Read full story button */}
                  <button
                    type="button"
                    onClick={() => setSelectedStory(story)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7B5A7E] hover:text-[#4E3953] transition-colors mb-5 self-start cursor-pointer group/link"
                  >
                    <span>Read full story</span>
                    <span className="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>

                  {/* Attribution */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#CFC3CC]/30">
                    <div className="relative shrink-0">
                      <div
                        className="absolute -inset-1.5 rounded-full blur-lg opacity-40"
                        style={{ backgroundColor: story.color }}
                      />
                      <div
                        className="relative w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xs"
                        style={{ backgroundColor: story.color }}
                      >
                        <span
                          className="material-symbols-outlined text-lg"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          person
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#4E3953]">
                        {story.name}
                      </p>
                      <p className="text-[11px] text-[#878787] uppercase tracking-wider">
                        {story.sub}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedStory(null)}
              className="fixed inset-0 bg-[#1B1C1C]/40 backdrop-blur-xs"
            />

            {/* Modal Card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-patient-name"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#CFC3CC]/40 z-10 my-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedStory(null)}
                aria-label="Close story dialog"
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F3EEF5] text-[#4E3953] hover:bg-[#CFC3CC]/40 flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>

              {/* Patient Attribution Header */}
              <div className="flex items-center gap-3.5 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs"
                  style={{ backgroundColor: selectedStory.color }}
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    person
                  </span>
                </div>
                <div>
                  <h3
                    id="modal-patient-name"
                    className="text-base font-bold text-[#4E3953]"
                  >
                    {selectedStory.name}
                  </h3>
                  <p className="text-xs text-[#878787]">
                    {selectedStory.sub}
                  </p>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: selectedStory.stars }).map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-base"
                    style={{
                      color: selectedStory.color,
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    star
                  </span>
                ))}
              </div>

              {/* Full Quote Text */}
              <div className="max-h-[50vh] overflow-y-auto pr-1 text-[#464647] text-sm sm:text-base leading-relaxed italic">
                <p>&ldquo;{selectedStory.quote}&rdquo;</p>
              </div>

              {/* Modal Actions */}
              <div className="mt-8 pt-4 border-t border-[#CFC3CC]/30 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedStory(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#464647] hover:text-[#1B1C1C] cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href="/contact"
                  onClick={() => setSelectedStory(null)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#7B5A7E] hover:bg-[#4E3953] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                >
                  <span>Book a Consultation</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
