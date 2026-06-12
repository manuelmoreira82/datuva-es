import { usePageTracking } from "@/hooks/usePageTracking";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ConfianzaBand from "@/components/sections/ConfianzaBand";
import ProblemaSection from "@/components/sections/ProblemaSection";
import CicloSection from "@/components/sections/CicloSection";
import CumplimientoSection from "@/components/sections/CumplimientoSection";
import QuienSection from "@/components/sections/QuienSection";
import CTAContactoSection from "@/components/sections/CTAContactoSection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  usePageTracking();

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <HeroSection />
        <ConfianzaBand />
        <ProblemaSection />
        <CicloSection />
        <CumplimientoSection />
        <QuienSection />
        <CTAContactoSection />
      </main>
      <Footer />
      <CookieBanner />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
