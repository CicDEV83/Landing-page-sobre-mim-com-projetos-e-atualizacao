import { AboutSection } from "../components/AboutCorporateSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { VisitorSection } from "../components/VisitorSection";
import { ServicesSection } from "../components/ServicesSection";
import { FounderSection } from "../components/FounderSection";
import { EcosystemSection } from "../components/EcosystemSection";
import { PartnerShowcase } from "../components/PartnerShowcase";
import { SolutionsSection } from "../components/SolutionsSection";

export function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <FounderSection />
          <SolutionsSection />


        <EcosystemSection />

        <section
          id="parceiros"
          className="eon-partners-section"
          aria-label="Empresas Parceiras"
        >
          <div className="container">
            <PartnerShowcase />
          </div>
        </section>
        <ContactSection />
      </main>

      <VisitorSection />
      <Footer />
    </div>
  );
}
