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

export default function PageHero({
  title = "Título",
  description = "",
  image = "/12.jpeg",
}) {
  return (
    <section className="relative w-full h-[38vh] min-h-[220px] overflow-hidden">

      {/* Imagen de fondo */}
      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/65" />

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

          <p
            className={`${vibes.className} text-2xl`}
            style={{ color: GOLD }}
          >
            Hotel Convención
          </p>

          <h1
            className={`${playfair.className} mt-1 text-3xl sm:text-5xl tracking-[0.08em]`}
          >
            {title}
          </h1>

          {description && (
            <p className="mt-4 text-sm sm:text-base text-white/80 leading-7">
              {description}
            </p>
          )}

        </div>
      </div>

    </section>
  );
}
