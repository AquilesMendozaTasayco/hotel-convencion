import Hero from "@/components/home/Hero";
import ReservaBar from "@/components/home/ReservaBar";
import About from "@/components/home/About";
import BrochureCTA from "@/components/home/BrochureCTA";
import Habitaciones from "@/components/home/Habitaciones";
import EventosSection from "@/components/home/EventosSection";
import Ofertas from "@/components/home/Ofertas";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mt-8">
        <ReservaBar />
      </div>
      <About />
      <BrochureCTA />
      <Habitaciones />
      <EventosSection />
      <Ofertas />
    </>
  );
}