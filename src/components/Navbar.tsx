"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "fixed top-3 left-0 right-0 px-4 md:px-8 max-w-6xl mx-auto"
          : "sticky top-0 w-full px-0 border-b border-[#CFC3CC]/40 bg-[#FDFBFC]/95 backdrop-blur-md"
      }`}
    >
      <div
        className={`flex justify-between items-center w-full transition-all duration-500 ${
          scrolled
            ? "bg-[#FDFBFC]/90 backdrop-blur-xl border border-[#CFC3CC]/60 rounded-full shadow-xl shadow-[#7B5A7E]/10 px-5 md:px-8 py-1.5"
            : "max-w-7xl mx-auto px-5 md:px-12 py-2"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group shrink-0">
          <Image
            src="/logo-desktop.png"
            alt="FemHealth Clinic"
            width={scrolled ? 150 : 180}
            height={scrolled ? 150 : 180}
            style={{ height: "auto" }}
            className="group-hover:scale-105 transition-all duration-300"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[13px] font-semibold tracking-wider uppercase transition-colors duration-200 relative py-1 ${
                  isActive
                    ? "text-[#7B5A7E] font-bold"
                    : "text-[#464647] hover:text-[#7B5A7E]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7B5A7E] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block shrink-0">
          <Link
            href="/contact#book"
            className={`inline-flex items-center justify-center bg-[#7B5A7E] text-white font-semibold tracking-wider uppercase hover:bg-[#4E3953] transition-all organic-shadow active:scale-95 duration-200 ${
              scrolled
                ? "px-5 py-2.5 rounded-full text-xs"
                : "px-7 py-3 rounded-lg text-[13px]"
            }`}
          >
            Book an Appointment
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#7B5A7E] p-2 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined text-3xl">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden bg-[#FDFBFC] border border-[#CFC3CC]/50 px-6 py-6 space-y-4 shadow-2xl animate-fadeIn ${
            scrolled ? "mt-2 rounded-2xl" : "border-t-0"
          }`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-semibold uppercase tracking-wider py-2 ${
                  isActive ? "text-[#7B5A7E] font-bold" : "text-[#464647]"
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
              className="block text-center bg-[#7B5A7E] text-white px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[#4E3953] transition-colors"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About & Clinic", href: "/about" },
  { name: "Contact", href: "/contact" },
];
