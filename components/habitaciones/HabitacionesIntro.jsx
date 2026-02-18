"use client";

import { Playfair_Display, Great_Vibes } from "next/font/google";
import { motion } from "framer-motion";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] });
const vibes = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const GOLD = "#A67C3D";

export default function HabitacionesIntro() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`${playfair.className} text-2xl sm:text-4xl tracking-[0.18em] uppercase text-black`}
        >
          Lujosas Habitaciones en Hotel Convención
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`${vibes.className} mt-4 text-3xl sm:text-4xl`}
          style={{ color: GOLD }}
        >
          Tu refugio en Trujillo, Perú
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 text-sm sm:text-base leading-7 text-black/70 max-w-4xl mx-auto"
        >
          Disfruta del confort y la tranquilidad en Hotel Convención, con habitaciones diseñadas
          para viajes de negocio o turismo. Cada espacio está pensado para brindarte descanso,
          funcionalidad y una experiencia cálida, con comodidades modernas y atención personalizada
          durante toda tu estadía.
        </motion.p>

        <div className="mt-10 flex justify-center">
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
            className="h-[2px]"
            style={{ backgroundColor: GOLD }}
          />
        </div>
      </div>
    </section>
  );
}