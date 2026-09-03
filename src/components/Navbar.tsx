"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track which section is in view on the home page
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const sectionIds = ["services"];
    const visibleSections = new Set<string>();
    let observer: IntersectionObserver | null = null;

    const observe = () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                visibleSections.add(id);
              } else {
                visibleSections.delete(id);
              }
            });
            // Activate the first visible section, or clear
            const first = sectionIds.find((s) => visibleSections.has(s));
            setActiveSection(first ?? null);
          },
          { rootMargin: "-20% 0px -60% 0px" }
        );
        observer.observe(el);
      });
    };

    // Small delay to ensure DOM is ready after mount
    const raf = requestAnimationFrame(observe);

    // Clear active section when scrolled back to top
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection(null);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (!el) return;
    const navOffset = window.innerWidth < 768 ? 75 : 95;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - navOffset;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });
    window.history.replaceState(null, "", "/#services");
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // If clicking a link to the exact same page we're already on, smoothly scroll to top
    if (href === pathname || (href === "/" && pathname === "/")) {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else if (href === "/#services" && pathname === "/") {
      e.preventDefault();
      scrollToServices();
    }
  };

  const handleMobileNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setMobileMenuOpen(false);
    // If clicking a link to the exact same page we're already on, smoothly scroll to top
    if (href === pathname || (href === "/" && pathname === "/")) {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else if (href === "/#services" && pathname === "/") {
      e.preventDefault();
      // Wait for the mobile drawer closing animation (200ms) so layout stabilizes
      setTimeout(() => {
        scrollToServices();
      }, 220);
    }
  };

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? "rgba(253, 251, 252, 0)"
          : "#FDFBFC",
        borderBottomColor: scrolled
          ? "rgba(207, 195, 204, 0)"
          : "rgba(207, 195, 204, 0.4)",
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full border-b border-solid pointer-events-none"
    >
      <div className="w-full px-3 sm:px-6 md:px-8">
        <motion.div
          initial={false}
          animate={{
            maxWidth: scrolled ? "1120px" : "1280px",
            borderRadius: scrolled ? "9999px" : "0px",
            marginTop: scrolled ? "10px" : "0px",
            marginBottom: scrolled ? "10px" : "0px",
            paddingTop: scrolled ? "8px" : "14px",
            paddingBottom: scrolled ? "8px" : "14px",
            borderColor: scrolled
              ? "rgba(207, 195, 204, 0.6)"
              : "rgba(207, 195, 204, 0)",
            backgroundColor: scrolled
              ? "#FDFBFC"
              : "rgba(253, 251, 252, 0)",
            boxShadow: scrolled
              ? "0 10px 25px -5px rgba(123, 90, 126, 0.12), 0 4px 6px -2px rgba(123, 90, 126, 0.04)"
              : "0 0 0 0 rgba(0, 0, 0, 0)",
          }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`border border-solid flex justify-between items-center w-full mx-auto pointer-events-auto relative transition-[padding] duration-300 ${scrolled ? "px-6 md:px-8" : "px-4 sm:px-6 md:px-12"
            }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center group shrink-0"
          >
            <motion.div
              animate={{ width: scrolled ? 150 : 175 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src="/logo-desktop.png"
                alt="FemHealth Clinic"
                width={180}
                height={55}
                priority
                style={{ height: "auto" }}
                className="w-full h-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-7 lg:gap-8 items-center">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/#services"
                  ? pathname === "/" && activeSection === "services"
                  : pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[13px] font-semibold tracking-wider uppercase transition-colors duration-200 relative py-1 ${isActive
                      ? "text-[#7B5A7E] font-bold"
                      : "text-[#464647] hover:text-[#7B5A7E]"
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7B5A7E] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block shrink-0">
            <Link
              href="/contact#book"
              className="inline-flex items-center justify-center bg-[#7B5A7E] text-white font-semibold tracking-wider uppercase hover:bg-[#4E3953] transition-all duration-200 rounded-full px-5 lg:px-6 py-2.5 text-xs lg:text-[13px] organic-shadow hover:shadow-lg hover:shadow-[#D46789]/20 active:scale-95"
            >
              Book an Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#7B5A7E] p-2 focus:outline-none flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </motion.div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden mt-2 bg-[#FDFBFC] border border-[#CFC3CC]/50 rounded-2xl px-6 py-5 space-y-3 shadow-xl max-w-xl mx-auto pointer-events-auto"
            >
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/#services"
                    ? pathname === "/" && activeSection === "services"
                    : pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleMobileNavClick(e, link.href)}
                    className={`block text-sm font-semibold uppercase tracking-wider py-2 transition-colors ${isActive ? "text-[#7B5A7E] font-bold" : "text-[#464647] hover:text-[#7B5A7E]"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-2">
                <Link
                  href="/contact#book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center bg-[#7B5A7E] text-white px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[#4E3953] transition-colors shadow-sm"
                >
                  Book an Appointment
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];
