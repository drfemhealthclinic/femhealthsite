import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. Pooja Wadgaonkar Patil | Obstetrician & Laparoscopic Surgeon",
  description:
    "Meet Dr. Pooja Wadgaonkar Patil (MBBS, MS OBGY, FMAS, DNB), leading Obstetrician, Gynaecologist & Laparoscopic Surgeon in Hinjewadi, Pune. Dedicated to compassionate, evidence-based women's healthcare.",
  keywords: [
    "Dr Pooja Wadgaonkar Patil",
    "Dr Pooja Wadgaonkar",
    "Dr Pooja Patil",
    "Gynecologist Hinjewadi",
    "Obstetrician Pune",
    "Laparoscopic Surgeon Pune",
    "Infertility Specialist Hinjewadi",
    "FemHealth Clinic Doctor",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Dr. Pooja Wadgaonkar Patil | FemHealth Clinic Pune",
    description:
      "MBBS, MS OBGY, FMAS, DNB. Experienced Obstetrician, Gynaecologist & Laparoscopic Surgeon specializing in high-risk pregnancy, infertility, and minimally invasive surgery.",
    url: "/about",
    images: [
      {
        url: "/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg",
        width: 1200,
        height: 630,
        alt: "Dr. Pooja Wadgaonkar Patil - FemHealth Clinic Pune",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dr. Pooja Wadgaonkar Patil | FemHealth Clinic Pune",
    description:
      "Consultant Obstetrician, Gynaecologist & Minimal Access Surgeon in Hinjewadi, Pune.",
    images: ["/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
