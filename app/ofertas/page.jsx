import PageHero from "@/components/shared/PageHero";
import OfertasIntro from "@/components/ofertas/OfertasIntro";
import OfertasGrid from "@/components/ofertas/OfertasGrid";

export default function OfertasPage() {
  return (
    <>
      <PageHero
        title="Ofertas"
        description="Paquetes especiales para disfrutar una estadía inolvidable."
        image="/12.jpeg"
      />

      <OfertasIntro />
      <OfertasGrid />
    </>
  );
}
