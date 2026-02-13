import PageHero from "@/components/shared/PageHero";
import HabitacionDetalle from "@/components/habitaciones/HabitacionDetalle";
import { habitaciones } from "@/data/habitaciones";

export default async function HabitacionPage({ params }) {
  const { slug } = await params; // ✅ en Next 16 puede venir como promesa

  const room = habitaciones.find((h) => h.slug === slug);

  if (!room) {
    return (
      <>
        <PageHero
          title="Habitación"
          description="No existe esta habitación."
          image="/12.jpeg"
        />
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-black/70">
            Slug recibido: <b>{String(slug)}</b>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero
        title={room.nombre}
        description="Confort ejecutivo y descanso perfecto en cada detalle."
        image={room.imagen}
      />
      <HabitacionDetalle room={room} />
    </>
  );
}

export function generateStaticParams() {
  return habitaciones.map((h) => ({ slug: h.slug }));
}
