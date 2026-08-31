import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import FloatingContact from "@/components/FloatingContact";
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
  title: "FemHealth Clinic | Dr. Pooja Wadgaonkar Patil",
  description:
    "Advanced Maternity, Gynaecological Care, Minimal Access Laparoscopic Surgery & Complete Infertility Solutions by Dr. Pooja Wadgaonkar Patil in Pune.",
  keywords: [
    "Dr Pooja Wadgaonkar Patil",
    "Dr Pooja Wadgaonkar",
    "Dr Pooja Patil",
    "Gynaecologist Hinjewadi",
    "Obstetrician Pune",
    "Laparoscopic Surgeon",
    "Infertility Specialist",
    "FemHealth Clinic",
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
      </head>
      <body className="min-h-screen flex flex-col bg-[#fbf9fa] text-[#1b1c1c] antialiased">
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
