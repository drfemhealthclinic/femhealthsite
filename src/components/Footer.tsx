"use client";

import Link from "next/link";
import Image from "next/image";
import { CLINIC } from "@/lib/clinic";

const SPECIALTIES = [
  { name: "Advanced Infertility & Reproductive Health", index: 0 },
  { name: "Minimally Invasive / Laparoscopy", index: 1 },
  { name: "High-Risk Obstetrics & Maternity", index: 2 },
  { name: "Preventive & Adolescent Gynaecology", index: 3 },
];

export default function Footer() {
  const handleSpecialtyClick = (e: React.MouseEvent, index: number) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("femhealth:open-service-tab", { detail: { index } })
      );

      if (window.location.pathname === "/") {
        e.preventDefault();
        const isDesktop = window.innerWidth >= 1024;
        const targetId = isDesktop ? `clinical-service-${index}` : "services";
        const targetEl = document.getElementById(targetId) || document.getElementById("services");

        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        window.history.replaceState(null, "", `/#services?service=${index}`);
      }
    }
  };

  return (
    <footer className="bg-[#F3F1F2] border-t border-[#CFC3CC]/30 text-[#464647] mt-auto">
      <div className="max-w-7xl mx-auto px-5 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-footer.png"
              alt="FemHealth Clinic"
              width={150}
              height={150}
              style={{ height: "auto" }}
              className=""
            />
          </div>
          <p className="text-sm text-[#4C444C] leading-relaxed">
            Personalised, compassionate, and evidence-based healthcare for women across all stages of life.
          </p>
          <p className="text-xs text-[#878787] pt-2">
            © FemHealth Clinic. Dr. Pooja Wadgaonkar Patil. All rights reserved.
          </p>
          <p className="text-xs text-[#878787]">
            <Link href="/privacy" className="hover:text-[#7B5A7E] transition-colors underline">
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#7B5A7E]">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm font-medium">
            <li>
              <Link href="/" className="hover:text-[#7B5A7E] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#7B5A7E] transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#7B5A7E] transition-colors">
                Blog &amp; Articles
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#7B5A7E] transition-colors">
                Contact &amp; Locations
              </Link>
            </li>
            <li>
              <Link href="/contact#book" className="hover:text-[#7B5A7E] transition-colors">
                Book an Appointment
              </Link>
            </li>
          </ul>
        </div>

        {/* Specialized Services */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#7B5A7E]">
            Specialties
          </h4>
          <ul className="space-y-2 text-sm text-[#4C444C]">
            {SPECIALTIES.map((item) => (
              <li key={item.name}>
                <Link
                  href={`/#services?service=${item.index}`}
                  onClick={(e) => handleSpecialtyClick(e, item.index)}
                  className="hover:text-[#7B5A7E] hover:underline transition-colors block py-0.5"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Clinic Timings & Location */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#7B5A7E]">
            Clinic Hours
          </h4>
          <div className="text-sm text-[#4C444C] space-y-1">
            <p className="font-semibold text-[#1B1C1C]">FemHealth Clinic (Hinjewadi):</p>
            <p>10:30 AM – 2:00 PM</p>
            <p>4:00 PM – 8:30 PM</p>
            <a
              href={CLINIC.directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#878787] pt-2 hover:text-[#7B5A7E] transition-colors flex items-start gap-1 group"
              title="Open in Google Maps"
            >
              <span className="material-symbols-outlined text-sm text-[#7B5A7E] shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                location_on
              </span>
              <span>{CLINIC.addressFull}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
