import { Header } from "../components/layout/Header/Header";
import { Hero } from "../components/sections/Hero/Hero";
import { Specialties } from "../components/sections/Specialties/Specialties";
import { Services } from "../components/sections/Services/Services";
import { Cases } from "../components/sections/Cases/Cases";
import { Problems } from "../components/sections/Problems/Problems";
import { Methodology } from "../components/sections/Methodology/Methodology";
import { About } from "../components/sections/About/About";
import { Technologies } from "../components/sections/Technologies/Technologies";
import { FAQ } from "../components/sections/FAQ/FAQ";
import { Contact } from "../components/sections/Contact/ContactForm";
import { Footer } from "../components/layout/Footer/Footer";

export function App() {
  return (
    <>
      <Header />

      <main id="inicio" className="site">
        <Hero />
        <Specialties />
        <Services />
        <Cases />
        <Problems />
        <Methodology />
        <About />
        <Technologies />
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
