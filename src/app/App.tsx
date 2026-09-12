import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { Carousel } from "../components/ProjectCarousel/Carousel";

export function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <HeroSection />
        <Carousel />
      </main>
    </div>
  );
}