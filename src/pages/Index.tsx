import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VisionGlobalSection from "@/components/VisionGlobalSection";
import FuncionalidadesSection from "@/components/FuncionalidadesSection";
import FacilidadUsoSection from "@/components/FacilidadUsoSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <VisionGlobalSection />
      <FuncionalidadesSection />
      <FacilidadUsoSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
