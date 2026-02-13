"use client"; // ✨ Necesario para animaciones

import { Great_Vibes, Playfair_Display } from "next/font/google";
import { motion } from "framer-motion"; // 📦 Importar framer-motion

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
      {/* Textura suave con sutil animación de opacidad */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.35 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(166,124,61,0.18), transparent 55%), radial-gradient(circle at 80% 60%, rgba(0,0,0,0.05), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        {/* Título y Subtítulo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className={`${vibes.className} text-center text-3xl sm:text-5xl`}
            style={{ color: GOLD }}
          >
            Comodidades en la Habitación
          </h2>

          <p className="mt-4 text-center text-sm sm:text-base text-black/60 max-w-2xl mx-auto">
            Pensadas para que descanses, trabajes y disfrutes con total comodidad.
          </p>
        </motion.div>

        {/* Contenedor de lista con entrada suave */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14 rounded-2xl bg-white/70 border border-black/10 p-10 shadow-sm"
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
            {comodidades.map((item, index) => (
              <motion.li 
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }} // 💧 Efecto goteo
                className="flex items-start gap-3"
              >
                <span
                  className="mt-[9px] h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: GOLD }}
                />
                <span className={`${playfair.className} text-sm sm:text-base text-black/75 leading-7`}>
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Línea decorativa que se expande */}
        <div className="mt-10 flex justify-center">
          <motion.span 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-[2px]" 
            style={{ backgroundColor: GOLD }} 
          />
        </div>
      </div>
    </section>
  );
}