import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#EFEDEE] border-t border-[#CFC3CC]/40 text-[#464647] mt-auto">
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
            © {new Date().getFullYear()} FemHealth Clinic. Dr. Pooja Wadgaonkar (Patil). All rights reserved.
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
                About &amp; Clinic
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
            <li>Advanced Infertility &amp; Reproductive Health</li>
            <li>Minimally Invasive / Laparoscopy</li>
            <li>High-Risk Obstetrics &amp; Maternity</li>
            <li>Preventive &amp; Adolescent Gynaecology</li>
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
            <p>4:00 PM – 8:00 PM</p>
            <p className="text-xs text-[#878787] pt-2">
              VJ Happiness Street, Hinjewadi, Pune
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
