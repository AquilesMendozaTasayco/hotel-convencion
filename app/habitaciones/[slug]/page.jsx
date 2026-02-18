import PageHero from "@/components/shared/PageHero";
import HabitacionDetalle from "@/components/habitaciones/HabitacionDetalle";

export default async function HabitacionPage({ params }) {
  const { slug } = await params;

  return (
    <>
      <PageHero
        title="Habitación"
        description="Confort ejecutivo y descanso perfecto en cada detalle."
        image="/12.jpeg"
      />
      <HabitacionDetalle slug={slug} />
    </>
  );
}
