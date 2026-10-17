import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { Carousel } from "../components/ProjectCarousel/Carousel";
import { VisitorSection } from "../components/VisitorSection";
import { ServicesSection } from "../components/ServicesSection";
import { FounderSection } from "../components/FounderSection";
import { TeamSection } from "../components/TeamSection";
import { EcosystemSection } from "../components/EcosystemSection";
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
        <TeamSection />
        <SolutionsSection />
        <Carousel />
        <EcosystemSection />
        <ContactSection />
      </main>

      <VisitorSection />
      <Footer />
    </div>
  );
}
