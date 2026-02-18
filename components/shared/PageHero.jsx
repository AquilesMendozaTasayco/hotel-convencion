import Image from "next/image";
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

// Ajusta esto al alto real de tu navbar (en px)
const NAV_HEIGHT = 96;

export default function PageHero({
  title = "Título",
  description = "",
  image = "/12.jpeg",
}) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        // espacio para que el hero comience debajo del navbar fijo
        paddingTop: NAV_HEIGHT,
        // altura total del hero incluyendo ese padding
        height: `calc(38vh + ${NAV_HEIGHT}px)`,
        minHeight: `calc(220px + ${NAV_HEIGHT}px)`,
      }}
    >
      {/* Imagen de fondo */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
        // Mueve el foco un poquito hacia abajo para que no se “coma” la parte bonita
        style={{ objectPosition: "center 60%" }}
        sizes="100vw"
      />

      {/* Overlay: gradiente (mejor que un negro plano porque se ve más “pro”) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/65" />

      {/* Difuminado dorado sutil */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${GOLD}, transparent 70%)`,
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-6 max-w-3xl">
          <p className={`${vibes.className} text-2xl`} style={{ color: GOLD }}>
            Hotel Convención
          </p>

          <h1 className={`${playfair.className} mt-1 text-3xl sm:text-5xl tracking-[0.08em]`}>
            {title}
          </h1>

          {description && (
            <p className="mt-4 text-sm sm:text-base text-white/85 leading-7">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
