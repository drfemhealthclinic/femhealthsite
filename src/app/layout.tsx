import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import FloatingContact from "@/components/FloatingContact";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://femhealthclinic.in"),
  title: {
    default: "FemHealth Clinic | Dr. Pooja Wadgaonkar Patil - Gynecologist & Obstetrician in Pune",
    template: "%s | FemHealth Clinic",
  },
  description:
    "FemHealth Clinic in Hinjawadi, Pune, led by Dr. Pooja Wadgaonkar Patil (MBBS, MS OBGY, FMAS, DNB). Specializing in High-Risk Pregnancy, Laparoscopic Surgery, Infertility Solutions, and Comprehensive Gynaecological Care.",
  keywords: [
    "Dr Pooja Wadgaonkar Patil",
    "Dr Pooja Wadgaonkar",
    "Dr Pooja Patil",
    "FemHealth Clinic",
    "Gynecologist in Hinjawadi Pune",
    "Best Gynecologist in Pune",
    "Obstetrician Pune",
    "Maternity Hospital Hinjawadi",
    "Laparoscopic Surgeon Pune",
    "Infertility Specialist Hinjawadi",
    "High Risk Pregnancy Doctor Pune",
    "PCOS Treatment Pune",
    "Endometriosis Specialist Pune",
    "Female Gynecologist near me",
    "VJ Happiness Street Clinic",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FemHealth Clinic | Dr. Pooja Wadgaonkar Patil",
    description:
      "Advanced Maternity, Gynaecological Care, Minimal Access Laparoscopic Surgery & Complete Infertility Solutions in Hinjawadi, Pune.",
    url: "https://femhealthclinic.in",
    siteName: "FemHealth Clinic",
    locale: "en_IN",
    type: "website",
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
    title: "FemHealth Clinic | Dr. Pooja Wadgaonkar Patil",
    description:
      "Consultant Obstetrician, Gynaecologist & Laparoscopic Surgeon in Hinjawadi, Pune.",
    images: ["/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Pune, Hinjawadi",
    "geo.position": "18.5873025;73.7010871",
    ICBM: "18.5873025, 73.7010871",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalClinic",
      "@id": "https://femhealthclinic.in/#clinic",
      name: "FemHealth Clinic",
      url: "https://femhealthclinic.in",
      logo: "https://femhealthclinic.in/logo-desktop.png",
      image: "https://femhealthclinic.in/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg",
      telephone: "+919272379105",
      email: "femhealthclinic@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Shop No. 85, 1st Floor, VJ Happiness Street, Hinjawadi Phase 2 Road, Rajiv Gandhi Infotech Park, Maan",
        addressLocality: "Hinjawadi, Pune",
        addressRegion: "Maharashtra",
        postalCode: "411057",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 18.5873025,
        longitude: 73.7010871,
      },
      hasMap: "https://maps.app.goo.gl/nMDYh7KxdbZmxcAi8",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:30",
          closes: "14:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "16:00",
          closes: "20:30",
        },
      ],
      priceRange: "$$",
      medicalSpecialty: [
        "Obstetric",
        "Gynecologic",
        "Surgical",
      ],
    },
    {
      "@type": "Physician",
      "@id": "https://femhealthclinic.in/#doctor",
      name: "Dr. Pooja Wadgaonkar Patil",
      jobTitle: "Consultant Obstetrician, Gynaecologist & Laparoscopic Surgeon",
      medicalSpecialty: [
        "Obstetrics",
        "Gynecology",
        "Laparoscopic Surgery",
        "Infertility and Reproductive Medicine",
      ],
      worksFor: {
        "@id": "https://femhealthclinic.in/#clinic",
      },
      address: {
        "@id": "https://femhealthclinic.in/#clinic",
      },
      telephone: "+919272379105",
      image: "https://femhealthclinic.in/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg",
      description:
        "Specialist Obstetrician, Gynaecologist & Laparoscopic Surgeon in Pune holding MBBS, MS OBGY, FMAS, and DNB qualifications with extensive clinical experience.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} scroll-smooth`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#fefcfd] text-[#1b1c1c] antialiased">
        <ScrollToTop />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
