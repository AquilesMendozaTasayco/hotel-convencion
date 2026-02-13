import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import BrochureCTA from "@/components/home/BrochureCTA";
import Habitaciones from "@/components/home/Habitaciones";
import EventosSection from "@/components/home/EventosSection";
import Ofertas from "@/components/home/Ofertas";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <BrochureCTA />
      <Habitaciones />
      <EventosSection />
      <Ofertas />
    </>
  );
}
