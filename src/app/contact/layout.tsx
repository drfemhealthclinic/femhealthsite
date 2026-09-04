import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appointment & Clinic Location | FemHealth Clinic Hinjewadi",
  description:
    "Schedule your appointment with Dr. Pooja Wadgaonkar Patil at FemHealth Clinic, Shop No. 85, 1st Floor, VJ Happiness Street, Hinjewadi Phase 2 Road, Pune. Call or WhatsApp +91 92723 79105.",
  keywords: [
    "Book Gynecologist Appointment Pune",
    "FemHealth Clinic Hinjewadi Address",
    "Dr Pooja Patil Contact Number",
    "Maternity Hospital Hinjewadi",
    "Gynecology Clinic Phase 2 Hinjewadi",
    "Doctor Appointment Hinjewadi Pune",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Book Appointment | FemHealth Clinic - Dr. Pooja Wadgaonkar Patil",
    description:
      "Visit FemHealth Clinic in Hinjewadi Phase 2, Pune for maternity, infertility, and laparoscopic surgery consultations. Call/WhatsApp: +91 92723 79105.",
    url: "/contact",
    images: [
      {
        url: "/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg",
        width: 1200,
        height: 630,
        alt: "FemHealth Clinic Contact & Location",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Appointment | FemHealth Clinic Hinjewadi Pune",
    description:
      "Book an appointment with Dr. Pooja Wadgaonkar Patil at FemHealth Clinic Pune.",
    images: ["/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
