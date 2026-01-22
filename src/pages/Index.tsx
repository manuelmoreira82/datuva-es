import HeroSection from "@/components/HeroSection";
import ProblemsRealSection from "@/components/ProblemsRealSection";
import SolutionDatuvaSection from "@/components/SolutionDatuvaSection";
import BenefitsSection from "@/components/BenefitsSection";
import ForWhoSection from "@/components/ForWhoSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ProblemsRealSection />
      <SolutionDatuvaSection />
      <BenefitsSection />
      <ForWhoSection />
      <ContactSection />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
