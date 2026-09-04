import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women's Health & Medical Insights Blog | FemHealth Clinic",
  description:
    "Read expert clinical guides and health insights on pregnancy, high-risk obstetrics, infertility treatments, PCOS management, and laparoscopic surgery by Dr. Pooja Wadgaonkar Patil.",
  keywords: [
    "Women Health Blog Pune",
    "Pregnancy Care Tips",
    "PCOS Diet and Treatment Guide",
    "Laparoscopic Surgery Recovery Guide",
    "Infertility Advice Pune",
    "FemHealth Medical Articles",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Women's Health & Medical Insights Blog | FemHealth Clinic",
    description:
      "Evidence-based clinical insights on obstetrics, gynaecology, fertility, and laparoscopic surgery written by Dr. Pooja Wadgaonkar Patil.",
    url: "/blog",
    images: [
      {
        url: "/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg",
        width: 1200,
        height: 630,
        alt: "FemHealth Clinic Women's Health Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Women's Health & Medical Insights Blog | FemHealth Clinic",
    description:
      "Expert health insights by Dr. Pooja Wadgaonkar Patil, Obstetrician & Gynecologist.",
    images: ["/dr-pooja-patil-obstetrician-laparoscopic-surgeon.jpg"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
