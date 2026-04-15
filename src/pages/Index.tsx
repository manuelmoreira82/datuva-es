import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CampoSection from "@/components/CampoSection";
import VendimiaSection from "@/components/VendimiaSection";
import BodegaSection from "@/components/BodegaSection";
import LaboratorioSection from "@/components/LaboratorioSection";
import EmbotilladoSection from "@/components/EmbotilladoSection";
import ExpedicionesSection from "@/components/ExpedicionesSection";
import NormativaSection from "@/components/NormativaSection";
import CostesSection from "@/components/CostesSection";
import RRHHSection from "@/components/RRHHSection";
import ProveedoresSection from "@/components/ProveedoresSection";
import CTAFinalSection from "@/components/CTAFinalSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CampoSection />
      <VendimiaSection />
      <BodegaSection />
      <LaboratorioSection />
      <EmbotilladoSection />
      <ExpedicionesSection />
      <NormativaSection />
      <CostesSection />
      <RRHHSection />
      <ProveedoresSection />
      <CTAFinalSection />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;