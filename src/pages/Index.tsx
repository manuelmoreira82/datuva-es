import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OfflineModeSection from "@/components/OfflineModeSection";
import FuncionalidadesSection from "@/components/FuncionalidadesSection";
import AppShowcaseSection from "@/components/AppShowcaseSection";
import FacilidadUsoSection from "@/components/FacilidadUsoSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <OfflineModeSection />
      <FuncionalidadesSection />
      <AppShowcaseSection />
      <FacilidadUsoSection />
      <ContactSection />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
