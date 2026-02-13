import { Playfair_Display, Great_Vibes } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const GOLD = "#A67C3D";

export default function HabitacionesIntro() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        {/* Título principal (como la imagen) */}
        <h2
          className={`${playfair.className} text-2xl sm:text-4xl tracking-[0.18em] uppercase text-black`}
        >
          Lujosas Habitaciones en Hotel Convención
        </h2>

        {/* Subtítulo dorado cursivo */}
        <p
          className={`${vibes.className} mt-4 text-3xl sm:text-4xl`}
          style={{ color: GOLD }}
        >
          Tu refugio en Trujillo, Perú
        </p>

        {/* Descripción */}
        <p className="mt-8 text-sm sm:text-base leading-7 text-black/70 max-w-4xl mx-auto">
          Disfruta del confort y la tranquilidad en Hotel Convención, con habitaciones diseñadas
          para viajes de negocio o turismo. Cada espacio está pensado para brindarte descanso,
          funcionalidad y una experiencia cálida, con comodidades modernas y atención personalizada
          durante toda tu estadía.
        </p>

        {/* Línea decorativa sutil */}
        <div className="mt-10 flex justify-center">
          <span className="h-[2px] w-24" style={{ backgroundColor: GOLD }} />
        </div>
      </div>
    </section>
  );
}
