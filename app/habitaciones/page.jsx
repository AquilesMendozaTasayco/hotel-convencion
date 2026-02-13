import PageHero from "@/components/shared/PageHero";
import HabitacionesIntro from "@/components/habitaciones/HabitacionesIntro";
import ComodidadesHabitacion from "@/components/habitaciones/ComodidadesHabitacion";
import Habitaciones from "@/components/home/Habitaciones";

export default function HabitacionesPage() {
  return (
    <>
      <PageHero
        title="Habitaciones"
        description="Descubre confort ejecutivo y descanso perfecto en cada detalle."
        image="/12.jpeg"
      />

      <HabitacionesIntro />
      <ComodidadesHabitacion />
      <Habitaciones />
    </>
  );
}
