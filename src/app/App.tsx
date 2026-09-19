import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { Carousel } from "../components/ProjectCarousel/Carousel";
import { VisitorSection } from "../components/VisitorSection";

export function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <HeroSection />
        <Carousel />
        <AboutSection />
        <ContactSection />
      </main>

      <VisitorSection />
      <Footer />
    </div>
  );
}
