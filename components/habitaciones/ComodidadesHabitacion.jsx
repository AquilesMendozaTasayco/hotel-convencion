import { Great_Vibes, Playfair_Display } from "next/font/google";

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const GOLD = "#A67C3D";

const comodidades = [
  "Wifi Gratuito",
  "Tv Smart, con señal digital",
  "Plancha y tabla de planchar",
  "Camas con cubierta tipo almohada",
  "Secadora de cabello",
  "Calefacción y aire acondicionado individual",
  "Mesa de trabajo",
  "Periódico diario",
  "Cortinas blackout",
  "Atención de bienvenida",
  "34 habitaciones",
];

export default function ComodidadesHabitacion() {
  return (
    <section className="relative overflow-hidden bg-[#F7F3EE]">
      {/* Textura suave (sin imagen) */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(166,124,61,0.18), transparent 55%), radial-gradient(circle at 80% 60%, rgba(0,0,0,0.05), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        {/* Título */}
        <h2
          className={`${vibes.className} text-center text-3xl sm:text-5xl`}
          style={{ color: GOLD }}
        >
          Comodidades en la Habitación
        </h2>

        {/* Subtítulo corto (opcional y elegante) */}
        <p className="mt-4 text-center text-sm sm:text-base text-black/60 max-w-2xl mx-auto">
          Pensadas para que descanses, trabajes y disfrutes con total comodidad.
        </p>

        {/* Lista en columnas */}
        <div className="mt-14 rounded-2xl bg-white/70 border border-black/10 p-10">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
            {comodidades.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-[9px] h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: GOLD }}
                />
                <span className={`${playfair.className} text-sm sm:text-base text-black/75 leading-7`}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Línea decorativa */}
        <div className="mt-10 flex justify-center">
          <span className="h-[2px] w-24" style={{ backgroundColor: GOLD }} />
        </div>
      </div>
    </section>
  );
}
