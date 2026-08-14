"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Motion";
import { CLINIC } from "@/lib/clinic";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    service: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Appointment Request - ${formData.name || "New Patient"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${formData.name}`,
        `Phone: ${formData.phone}`,
        `Preferred Date: ${formData.date || "Not specified"}`,
        `Service: ${formData.service || "Not specified"}`,
        "",
        "Notes:",
        formData.notes || "None",
      ].join("\n")
    );
    const mailtoUrl = `${CLINIC.emailHref}?subject=${subject}&body=${body}`;
    const anchor = document.createElement("a");
    anchor.href = mailtoUrl;
    anchor.click();
    setFormSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-[#FDFBFC]">
        {/* PAGE HEADER */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 px-5 md:px-12 max-w-7xl mx-auto text-center">
          {/* Ambient background blurs */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C0A8C9]/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#E898A8]/8 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f1d7fa] text-[#614265] text-xs font-semibold uppercase tracking-widest mb-6">
              Get In Touch
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-display text-[#4E3953] mb-4 font-semibold tracking-tight">
              Contact &amp; Appointments
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-[#464647] max-w-2xl mx-auto leading-relaxed font-light">
              Appointments, multiple consultation locations, and convenient ways to connect with Dr. Pooja Wadgaonkar.
            </p>
          </FadeIn>
        </section>

        {/* MAIN BENTO GRID */}
        <section className="px-5 md:px-12 pb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* LEFT COLUMN: CONTACT & BOOKING FORM */}
            <div className="md:col-span-7 flex flex-col gap-8">
              {/* DIRECT CONTACT INFO CARD */}
              <FadeIn direction="up">
                <div className="bg-white p-8 md:p-10 organic-shadow rounded-2xl border border-[#CFC3CC]/30 hover:border-[#C0A8C9] transition-colors">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#F3EEF5] flex items-center justify-center text-[#7B5A7E]">
                      <span className="material-symbols-outlined text-2xl">call</span>
                    </div>
                    <h2 className="text-2xl font-serif-display text-[#4E3953] font-semibold">
                      Direct Contact
                    </h2>
                  </div>
                  <p className="text-sm text-[#464647] mb-6 font-light">
                    Reach out directly for appointment bookings, pre-visit inquiries, or emergency guidance.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-[#FDFBFC] p-5 rounded-xl border border-[#CFC3CC]/40 hover:border-[#C0A8C9] transition-colors">
                      <h3 className="text-xs font-bold text-[#7B5A7E] mb-1 uppercase tracking-wider">
                        Phone &amp; WhatsApp
                      </h3>
                      <a
                        href={CLINIC.phoneHref}
                        className="text-base text-[#1B1C1C] font-semibold hover:text-[#7B5A7E] transition-colors"
                      >
                        {CLINIC.phoneDisplay}
                      </a>
                    </div>
                    <div className="bg-[#FDFBFC] p-5 rounded-xl border border-[#CFC3CC]/40 hover:border-[#C0A8C9] transition-colors">
                      <h3 className="text-xs font-bold text-[#7B5A7E] mb-1 uppercase tracking-wider">
                        Email Inquiries
                      </h3>
                      <a
                        href={CLINIC.emailHref}
                        className="text-sm text-[#1B1C1C] font-semibold hover:text-[#7B5A7E] transition-colors break-all"
                      >
                        {CLINIC.email}
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* BOOKING FORM CARD */}
              <FadeIn direction="up" delay={0.1}>
                <div
                  className="bg-white p-8 md:p-10 organic-shadow rounded-2xl border border-[#CFC3CC]/30 scroll-mt-24"
                  id="book"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h2 className="text-2xl font-serif-display text-[#4E3953] font-semibold">
                      Request an Appointment
                    </h2>
                    <span className="bg-[#F3EEF5] text-[#7B5A7E] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#C0A8C9]/40 self-start sm:self-auto">
                      Direct Clinic Booking
                    </span>
                  </div>

                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[#F3EEF5]/60 border border-[#C0A8C9] rounded-2xl p-8 text-center space-y-3"
                    >
                      <span className="material-symbols-outlined text-4xl text-[#7B5A7E]">
                        check_circle
                      </span>
                      <h3 className="text-xl font-serif-display text-[#4E3953] font-semibold">
                        Appointment Request Received
                      </h3>
                      <p className="text-sm text-[#464647] max-w-md mx-auto font-light">
                        Your appointment request has been drafted in your email app — just press Send to deliver it to <strong>{CLINIC.email}</strong>. You can also call us directly at <strong>{CLINIC.phoneDisplay}</strong> to book faster.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="mt-4 text-xs font-bold uppercase tracking-widest text-[#7B5A7E] hover:text-[#4E3953] underline transition-colors"
                      >
                        Submit Another Request
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[#464647] uppercase tracking-wider mb-2" htmlFor="name">
                            Full Name *
                          </label>
                          <input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="medical-input"
                            placeholder="e.g. Ananya Sharma"
                            type="text"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#464647] uppercase tracking-wider mb-2" htmlFor="phone">
                            Phone Number *
                          </label>
                          <input
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="medical-input"
                            placeholder="+91 92723 79105"
                            type="tel"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[#464647] uppercase tracking-wider mb-2" htmlFor="date">
                            Preferred Date
                          </label>
                          <input
                            id="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="medical-input"
                            type="date"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#464647] uppercase tracking-wider mb-2" htmlFor="service">
                            Service Type
                          </label>
                          <select
                            id="service"
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="medical-input text-[#464647]"
                          >
                            <option value="">Select a service...</option>
                            <option value="infertility">Advanced Infertility &amp; Reproductive Health</option>
                            <option value="laparoscopic">Minimally Invasive / Laparoscopic Surgery</option>
                            <option value="obstetrics">Comprehensive Obstetrics (Maternity Care)</option>
                            <option value="gynaecology">General &amp; Preventive Gynaecology</option>
                            <option value="routine">Routine Consultation / Second Opinion</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#464647] uppercase tracking-wider mb-2" htmlFor="notes">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="medical-input"
                          placeholder="Briefly mention any symptoms or specific consultation requirements..."
                          rows={3}
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        className="w-full bg-[#7B5A7E] text-white py-4 rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-[#4E3953] transition-colors organic-shadow"
                      >
                        Confirm Appointment Request
                      </motion.button>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* RIGHT COLUMN: LOCATIONS & MAP */}
            <div className="md:col-span-5 flex flex-col gap-8">
              {/* PRIMARY CLINIC LOCATIONS */}
              <FadeIn direction="up" delay={0.1}>
                <div className="bg-[#F5F3F4] p-8 rounded-2xl border border-[#CFC3CC]/40 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#7B5A7E] text-2xl">
                      location_on
                    </span>
                    <h2 className="text-2xl font-serif-display text-[#4E3953] font-semibold">
                      Consultation Centers
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {/* Primary Clinic */}
                    <div className="bg-white p-5 rounded-xl border border-[#CFC3CC]/30 space-y-2 hover:border-[#C0A8C9] transition-colors">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif-display font-semibold text-lg text-[#1B1C1C]">
                          FemHealth Clinic
                        </h3>
                        <span className="text-[10px] uppercase font-bold bg-[#F3EEF5] text-[#7B5A7E] border border-[#C0A8C9]/40 px-2 py-0.5 rounded-full">
                          Main Clinic
                        </span>
                      </div>
                      <p className="text-xs font-medium text-[#7B5A7E]">
                        {CLINIC.addressFull}
                      </p>
                      <div className="pt-2 text-xs text-[#464647] space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-[#D46789]">
                            schedule
                          </span>
                          <span>Morning: 10:30 AM – 2:00 PM</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-[#D46789]">
                            schedule
                          </span>
                          <span>Evening: 4:00 PM – 8:00 PM</span>
                        </div>
                      </div>
                    </div>

                    {/* Saishree Hospital */}
                    <div className="bg-white p-5 rounded-xl border border-[#CFC3CC]/30 space-y-2 hover:border-[#C0A8C9] transition-colors">
                      <h3 className="font-serif-display font-semibold text-lg text-[#1B1C1C]">
                        Saishree VitaLife
                      </h3>
                      <p className="text-xs font-medium text-[#7B5A7E]">
                        Wakad, Pune
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-[#464647] pt-1">
                        <span className="material-symbols-outlined text-sm text-[#D46789]">
                          event
                        </span>
                        <span>Tuesday &amp; Thursday (Prior Appointment)</span>
                      </div>
                    </div>

                    {/* Ruby Hall Clinic */}
                    <div className="bg-white p-5 rounded-xl border border-[#CFC3CC]/30 space-y-2 hover:border-[#C0A8C9] transition-colors">
                      <h3 className="font-serif-display font-semibold text-lg text-[#1B1C1C]">
                        Ruby Hall Clinic
                      </h3>
                      <p className="text-xs font-medium text-[#7B5A7E]">
                        Hinjewadi, Pune
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-[#464647] pt-1">
                        <span className="material-symbols-outlined text-sm text-[#D46789]">
                          event_available
                        </span>
                        <span>Available on Appointment Basis</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* MAP EMBED */}
              <FadeIn direction="up" delay={0.2}>
                <div className="bg-white rounded-2xl overflow-hidden organic-shadow border border-[#CFC3CC]/30 relative group h-72">
                  <iframe
                    title="FemHealth Clinic Map Location"
                    src={CLINIC.mapEmbedSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "contrast(1.05) saturate(1.1)" }}
                    allowFullScreen={false}
                    loading="lazy"
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-3.5 border-t border-[#CFC3CC]/30 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#4E3953]">
                        {CLINIC.name}, VJ Happiness Street
                      </p>
                      <p className="text-[11px] text-[#878787]">Hinjawadi, Pune - 411057</p>
                    </div>
                    <a
                      href={CLINIC.directionsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-[#7B5A7E] uppercase tracking-wider hover:underline flex items-center gap-1"
                    >
                      <span>Open Map</span>
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </a>
                  </div>
                </div>
              </FadeIn>

              {/* EMPANELLED HOSPITALS */}
              <FadeIn direction="up" delay={0.3}>
                <div className="bg-[#F3EEF5]/60 p-6 rounded-2xl border border-[#C0A8C9]/40 space-y-3">
                  <h3 className="font-serif-display font-semibold text-base text-[#4E3953]">
                    Also Empanelled / Available At
                  </h3>
                  <ul className="space-y-2 text-xs text-[#464647]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D46789]"></span>
                      Saishree VitaLife Hospital, Wakad
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D46789]"></span>
                      Ruby Hall Clinic, Hinjewadi
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D46789]"></span>
                      Hinjewadi Hospital, Pune
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D46789]"></span>
                      Golden Care Hospital, Hinjewadi
                    </li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="editorial-divider my-16"></div>

          {/* FIRST VISIT & EMERGENCY GUIDANCE */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StaggerItem>
              <div className="bg-white p-8 rounded-2xl border border-[#CFC3CC]/30 space-y-3 organic-shadow h-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F3EEF5] flex items-center justify-center text-[#7B5A7E]">
                    <span className="material-symbols-outlined text-2xl">info</span>
                  </div>
                  <h3 className="text-xl font-serif-display text-[#4E3953] font-semibold">
                    Before Your First Visit
                  </h3>
                </div>
                <p className="text-sm text-[#464647] leading-relaxed font-light">
                  Please bring along previous medical records, recent ultrasound scans, blood test reports, and a list of current medications to help Dr. Pooja offer an accurate, comprehensive clinical assessment.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="bg-[#F5F3F4] p-8 rounded-2xl border border-[#CFC3CC]/40 space-y-3 h-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E898A8]/20 flex items-center justify-center text-[#D46789]">
                    <span className="material-symbols-outlined text-2xl">emergency</span>
                  </div>
                  <h3 className="text-xl font-serif-display text-[#D46789] font-semibold">
                    Emergency &amp; Urgent Care
                  </h3>
                </div>
                <p className="text-sm text-[#464647] leading-relaxed font-light">
                  For urgent obstetric emergencies, labour onset, or acute surgical conditions, please proceed immediately to our affiliated emergency hospital centers or call emergency helpline services directly.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </section>
      </main>

      <Footer />
    </>
  );
}
