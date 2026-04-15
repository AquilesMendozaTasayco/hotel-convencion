"use client";

import Image from "next/image";
import { Playfair_Display, Great_Vibes } from "next/font/google";
import { motion } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const GOLD = "#A67C3D";

export default function EventosSection() {
  return (
    <section className="relative w-full py-28 overflow-hidden">

      {/* Imagen de fondo con zoom sutil */}
      <motion.div 
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <Image
          src="/12.jpeg"
          alt="Sala de Reuniones"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Difuminado dorado sutil */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${GOLD}, transparent 70%)`,
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">

        {/* Título sección con fade-up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p
            className={`${vibes.className} text-3xl`}
            style={{ color: GOLD }}
          >
            Espacios Corporativos
          </p>

          <h2
            className={`${playfair.className} text-center text-3xl sm:text-5xl mt-2 tracking-wide`}
          >
            Sala de Reuniones
          </h2>
        </motion.div>

        {/* Card Sala de Reuniones */}
        <div className="mt-16 max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-lg flex flex-col justify-between"
          >
            <div>
              <h3
                className={`${playfair.className} text-2xl mb-4`}
                style={{ color: GOLD }}
              >
                Sala de Reuniones
              </h3>

              <p className="text-white/85 leading-7 text-sm sm:text-base">
                Nuestra sala de reuniones está diseñada para inspirar decisiones
                inteligentes y conversaciones productivas: equipada con elegantes
                sillones ejecutivos, televisor Smart, aire acondicionado y todo lo
                necesario para planear, presentar y concretar tus negocios en un
                ambiente cómodo y profesional.
              </p>

              <p className="text-white/85 leading-7 text-sm sm:text-base mt-3">
                El espacio ideal donde las ideas se transforman en resultados.
              </p>

              <ul className="mt-4 space-y-2 text-sm sm:text-base text-white/85">
                <li className="flex items-center gap-2">
                  <span style={{ color: GOLD }}>✦</span> Mobiliario ejecutivo
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: GOLD }}>✦</span> Equipo para videoconferencias
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: GOLD }}>✦</span> Bocaditos previa reserva
                </li>
              </ul>
            </div>

            <motion.a
              whileHover={{ backgroundColor: GOLD, borderColor: GOLD }}
              href="#sala-reuniones"
              className="inline-block mt-6 text-center text-xs uppercase tracking-[0.3em]
                         border border-white px-6 py-3 transition duration-500"
            >
              Ver Sala de Reuniones
            </motion.a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}