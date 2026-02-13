"use client"; // ✨ Necesario para animaciones
import Image from "next/image";
import { Playfair_Display, Great_Vibes } from "next/font/google";
import { motion } from "framer-motion"; // 📦 Importar framer-motion

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
    <section className="relative w-full h-[320px] md:h-[260px] flex items-center overflow-hidden">
      
      {/* Imagen de fondo con zoom suave */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <Image
          src="/hero/3.jpeg"
          alt="Hotel Convención"
          fill
          className="object-cover"
        />
      </motion.div>

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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-white">

        {/* Texto izquierda con fade-in y slide */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left max-w-xl"
        >
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
        </motion.div>

        {/* Botón derecha con entrada escalonada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/brochure-hotel-convencion.pdf"
            download
            className="inline-block px-8 py-3 text-xs uppercase tracking-[0.25em]
                       border border-white text-white
                       transition-all duration-500
                       hover:bg-[#A67C3D] hover:border-[#A67C3D]"
          >
            Descargar Brochure
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}