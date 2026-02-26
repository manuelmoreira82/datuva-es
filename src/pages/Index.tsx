import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemasSection from "@/components/ProblemasSection";
import SolucionSection from "@/components/SolucionSection";
import AppShowcaseSection from "@/components/AppShowcaseSection";
import ComparativaSection from "@/components/ComparativaSection";
import TestimoniosSection from "@/components/TestimoniosSection";
import ROISection from "@/components/ROISection";
import FAQSection from "@/components/FAQSection";
import CTAFinalSection from "@/components/CTAFinalSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemasSection />
      <SolucionSection />
      <AppShowcaseSection />
      <ComparativaSection />
      <TestimoniosSection />
      <ROISection />
      <FAQSection />
      <CTAFinalSection />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
