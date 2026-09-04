import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CLINIC } from "@/lib/clinic";

export const metadata = {
  title: "Privacy Policy | FemHealth Clinic",
  description: "Privacy Policy for FemHealth Clinic - Dr. Pooja Wadgaonkar Patil",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow bg-[#FEFCFD]">
        <section className="px-5 md:px-12 py-12 md:py-24 max-w-4xl mx-auto">
          <div className="space-y-10">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#D46789] font-bold">
                Legal
              </span>
              <h1 className="text-3xl md:text-4xl font-serif-display text-[#4E3953] font-semibold">
                Privacy Policy
              </h1>
              <p className="text-sm text-[#878787]">Last updated: August 2026</p>
            </div>

            <div className="space-y-8 text-sm text-[#464647] leading-relaxed">
              <div className="space-y-3">
                <h2 className="text-lg font-serif-display font-semibold text-[#4E3953]">
                  1. Information We Collect
                </h2>
                <p>
                  When you book an appointment or contact us through our website, we may collect the following personal information:
                </p>
                <ul className="list-disc pl-6 space-y-1.5">
                  <li>Full name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                  <li>Preferred appointment date and time</li>
                  <li>Service type and medical notes you choose to share</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-serif-display font-semibold text-[#4E3953]">
                  2. How We Use Your Information
                </h2>
                <p>We use the information collected to:</p>
                <ul className="list-disc pl-6 space-y-1.5">
                  <li>Schedule and manage your appointments</li>
                  <li>Communicate with you regarding your visit</li>
                  <li>Provide personalised healthcare services</li>
                  <li>Send appointment reminders (via SMS, WhatsApp, or email)</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-serif-display font-semibold text-[#4E3953]">
                  3. Data Protection
                </h2>
                <p>
                  We implement appropriate security measures to protect your personal information. Your data is stored securely and is only accessible to authorised personnel involved in your care.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-serif-display font-semibold text-[#4E3953]">
                  4. Third-Party Services
                </h2>
                <p>
                  We may use third-party services (such as Google Maps for location embedding) that collect information. These services have their own privacy policies governing the use of your data.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-serif-display font-semibold text-[#4E3953]">
                  5. Your Rights
                </h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1.5">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of non-essential communications</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-serif-display font-semibold text-[#4E3953]">
                  6. Contact for Privacy Concerns
                </h2>
                <p>
                  If you have any questions or concerns about your privacy or the data we hold, please contact us:
                </p>
                <div className="bg-[#F5F3F4] rounded-xl p-5 mt-3 space-y-1">
                  <p className="font-semibold text-[#4E3953]">FemHealth Clinic</p>
                  <p>Dr. Pooja Wadgaonkar Patil</p>
                  <p>
                    <Link href={CLINIC.phoneHref} className="text-[#7B5A7E] hover:underline">
                      {CLINIC.phoneDisplay}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
