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

export default function BrochureCTA() {
  return (
    <section className="relative w-full h-[260px] flex items-center overflow-hidden">
      
      {/* Imagen de fondo */}
      <Image
        src="/hero/3.jpeg"
        alt="Hotel Convención"
        fill
        className="object-cover"
      />

      {/* Overlay oscuro clásico */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Difuminado dorado sutil */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: `radial-gradient(circle at 25% 50%, ${GOLD}, transparent 65%)`,
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-white">

        {/* Texto izquierda */}
        <div className="text-center md:text-left max-w-xl">
          
          <p
            className={`${vibes.className} text-2xl`}
            style={{ color: GOLD }}
          >
            Nuestro Brochure
          </p>

          <h3
            className={`${playfair.className} mt-1 text-3xl sm:text-4xl tracking-wide`}
          >
            Conozca Más Sobre Hotel Convención
          </h3>

          <p className="mt-3 text-sm sm:text-base text-white/80">
            Descubra nuestros servicios, habitaciones y comodidades en nuestro brochure oficial.
          </p>
        </div>

        {/* Botón derecha */}
        <div>
          <a
            href="/brochure-hotel-convencion.pdf"
            download
            className="px-8 py-3 text-xs uppercase tracking-[0.25em]
                       border border-white text-white
                       transition-all duration-500
                       hover:bg-[#A67C3D] hover:border-[#A67C3D]"
          >
            Descargar Brochure
          </a>
        </div>

      </div>
    </section>
  );
}
