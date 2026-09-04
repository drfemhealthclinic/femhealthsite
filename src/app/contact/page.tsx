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
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const errs: { name?: string; phone?: string } = {};
    const trimmedName = formData.name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      errs.name = "Please enter your full name (at least 2 characters)";
    }

    const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const patientName = formData.name.trim();
    const subject = encodeURIComponent(
      `Appointment Request - ${patientName}`
    );
    const body = encodeURIComponent(
      [
        `Patient Name: ${patientName}`,
        `Contact Phone: ${formData.phone.trim()}`,
        `Preferred Appointment Date: ${formData.date || "Flexible / Not specified"}`,
        `Service / Care Required: ${formData.service || "General Consultation"}`,
        "",
        "Clinical Notes / Symptoms:",
        formData.notes.trim() || "None provided",
      ].join("\n")
    );

    const mailtoUrl = `${CLINIC.emailHref}?subject=${subject}&body=${body}`;

    // Pure openmail client launch — no server SMTP / nodemailer
    try {
      window.location.href = mailtoUrl;
    } catch {
      const a = document.createElement("a");
      a.href = mailtoUrl;
      a.click();
    }

    setFormSubmitted(true);
  };

  const today = new Date().toISOString().split("T")[0];

  const whatsappBookingUrl = `${CLINIC.whatsappHref}?text=${encodeURIComponent(
    `Hello Dr. Pooja Patil,\n\nI would like to request an appointment at FemHealth Clinic.\n\n• *Name:* ${formData.name.trim() || "Patient"}\n• *Phone:* ${formData.phone.trim() || "-"}\n• *Preferred Date:* ${formData.date || "Flexible"}\n• *Service:* ${formData.service || "General Consultation"}${formData.notes.trim() ? `\n• *Notes:* ${formData.notes.trim()}` : ""}`
  )}`;

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-[#FEFCFD]">
        {/* PAGE HEADER */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 px-5 md:px-12 max-w-7xl mx-auto text-center">
          {/* Ambient background blurs */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D4A0C0]/15 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#E898A8]/18 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9E4EA] text-[#D46789] border border-[#E898A8]/30 text-xs font-bold uppercase tracking-widest mb-6">
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
              Appointments, multiple consultation locations, and convenient ways to connect with Dr. Pooja Wadgaonkar Patil.
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
                <div className="bg-white p-8 md:p-10 organic-shadow rounded-2xl border border-[#CFC3CC]/30 hover:border-[#D46789]/40 hover:shadow-xl transition-all duration-300">
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
                      <h3 className="text-xs font-bold text-[#D46789] mb-1 uppercase tracking-wider">
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
                      <h3 className="text-xs font-bold text-[#D46789] mb-1 uppercase tracking-wider">
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
                    <span className="bg-[#F9E4EA] text-[#D46789] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#E898A8]/30 self-start sm:self-auto">
                      Direct Clinic Booking
                    </span>
                  </div>

                  {formSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[#F3EEF5]/60 border border-[#C0A8C9] rounded-2xl p-8 text-center space-y-4"
                    >
                      <span className="material-symbols-outlined text-4xl text-[#7B5A7E]">
                        check_circle
                      </span>
                      <h3 className="text-xl font-serif-display text-[#4E3953] font-semibold">
                        Appointment Email Prepared
                      </h3>
                      <p className="text-sm text-[#464647] max-w-md mx-auto font-light leading-relaxed">
                        Your appointment request has been drafted in your device&apos;s email app addressed directly to <strong>{CLINIC.email}</strong>. Simply tap <strong>Send</strong> to deliver it.
                      </p>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                          href={`${CLINIC.emailHref}?subject=${encodeURIComponent(`Appointment Request - ${formData.name.trim()}`)}&body=${encodeURIComponent([
                            `Patient Name: ${formData.name.trim()}`,
                            `Contact Phone: ${formData.phone.trim()}`,
                            `Preferred Date: ${formData.date || "Flexible / Not specified"}`,
                            `Service: ${formData.service || "General Consultation"}`,
                            "",
                            "Notes:",
                            formData.notes.trim() || "None",
                          ].join("\n"))}`}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#7B5A7E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#4E3953] transition-colors shadow-sm"
                        >
                          <span className="material-symbols-outlined text-base">mail</span>
                          <span>Re-open Email App</span>
                        </a>

                        <a
                          href={whatsappBookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors shadow-sm"
                        >
                          <span>Send via WhatsApp</span>
                        </a>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ name: "", phone: "", date: "", service: "", notes: "" });
                            setErrors({});
                            setFormSubmitted(false);
                          }}
                          className="text-xs font-bold uppercase tracking-widest text-[#7B5A7E] hover:text-[#4E3953] underline transition-colors cursor-pointer"
                        >
                          Submit Another Request
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[#464647] uppercase tracking-wider mb-2" htmlFor="name">
                            Full Name *
                          </label>
                          <input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({ ...formData, name: e.target.value });
                              if (errors.name) setErrors({ ...errors, name: undefined });
                            }}
                            className={`medical-input ${errors.name ? "border-red-400 focus:border-red-500" : ""}`}
                            placeholder="e.g. Ananya Sharma"
                            type="text"
                          />
                          {errors.name && (
                            <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#464647] uppercase tracking-wider mb-2" htmlFor="phone">
                            Phone Number *
                          </label>
                          <input
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value });
                              if (errors.phone) setErrors({ ...errors, phone: undefined });
                            }}
                            className={`medical-input ${errors.phone ? "border-red-400 focus:border-red-500" : ""}`}
                            placeholder="+91 92723 79105"
                            type="tel"
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-[11px] mt-1 font-medium">{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[#464647] uppercase tracking-wider mb-2" htmlFor="date">
                            Preferred Date (Optional)
                          </label>
                          <input
                            id="date"
                            min={today}
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="medical-input"
                            type="date"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#464647] uppercase tracking-wider mb-2" htmlFor="service">
                            Service Type (Optional)
                          </label>
                          <select
                            id="service"
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="medical-input text-[#464647]"
                          >
                            <option value="">Select a service...</option>
                            <option value="Advanced Infertility & Reproductive Health">Advanced Infertility &amp; Reproductive Health</option>
                            <option value="Minimally Invasive / Laparoscopic Surgery">Minimally Invasive / Laparoscopic Surgery</option>
                            <option value="High-Risk Obstetrics & Maternity Care">Comprehensive Obstetrics (Maternity Care)</option>
                            <option value="Preventive & Adolescent Gynaecology">General &amp; Preventive Gynaecology</option>
                            <option value="Routine Consultation / Second Opinion">Routine Consultation / Second Opinion</option>
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

                      <div className="space-y-3">
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          type="submit"
                          className="w-full bg-[#7B5A7E] text-white py-4 rounded-xl text-xs font-semibold uppercase tracking-widest hover:bg-[#4E3953] transition-colors organic-shadow cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-sm">mail</span>
                          <span>Send Appointment Request via Email</span>
                        </motion.button>
                        
                        <p className="text-[11px] text-[#878787] text-center font-light">
                          Directly opens your device&apos;s email client with pre-filled details addressed to {CLINIC.email}.
                        </p>
                      </div>
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
                    <div className="bg-white p-5 rounded-xl border border-[#CFC3CC]/30 space-y-2 hover:border-[#D46789]/40 transition-colors">
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
                      <a
                        href={CLINIC.directionsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D46789] hover:text-[#7B5A7E] pt-1 transition-colors"
                      >
                        <span className="material-symbols-outlined text-xs">location_on</span>
                        <span>View on Google Maps ↗</span>
                      </a>
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
                          <span>Evening: 4:00 PM – 8:30 PM</span>
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
                  Please bring along previous medical records, recent ultrasound scans, blood test reports, and a list of current medications to help Dr. Pooja Wadgaonkar Patil offer an accurate, comprehensive clinical assessment.
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
