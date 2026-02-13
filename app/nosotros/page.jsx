import PageHero from "@/components/shared/PageHero";
import AboutNosotros from "@/components/nosotros/AboutNosotros";
import MisionVisionValores from "@/components/nosotros/MisionVisionValores";
import PorqueElegirnos from "@/components/nosotros/PorqueElegirnos";

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        title="Nosotros"
        description="Conoce nuestra esencia, nuestro servicio y el confort ejecutivo que ofrecemos en Trujillo."
        image="/12.jpeg"
      />

      <AboutNosotros />
      <MisionVisionValores />
      <PorqueElegirnos />
    </>
  );
}
