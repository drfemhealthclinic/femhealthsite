import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import WelcomeQuote from "@/components/home/WelcomeQuote";
import Highlights from "@/components/home/Highlights";
import ServicesAccordion from "@/components/home/ServicesAccordion";
import DoctorTeaser from "@/components/home/DoctorTeaser";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import PatientEducation from "@/components/home/PatientEducation";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <WelcomeQuote />
        <Highlights />
        <ServicesAccordion />
        <DoctorTeaser />
        <WhyChoose />
        <Testimonials />
        <PatientEducation />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
