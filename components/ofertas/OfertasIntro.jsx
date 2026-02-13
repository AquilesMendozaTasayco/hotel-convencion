"use client";

import { motion } from "framer-motion"; // 📦 Importar framer-motion
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

export default function OfertasIntro() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        {/* Título Principal con Fade Up */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`${playfair.className} text-2xl sm:text-4xl tracking-[0.18em] uppercase text-black`}
        >
          Uno de los hoteles más elegantes y con estilo en Trujillo, Perú.
        </motion.h2>

        {/* Subtítulo en caligrafía con retraso */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`${vibes.className} mt-4 text-3xl sm:text-4xl`}
          style={{ color: GOLD }}
        >
          Ofertas y promociones exclusivas.
        </motion.p>

        {/* Párrafo descriptivo */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-sm sm:text-base leading-7 text-black/70 max-w-4xl mx-auto"
        >
          Descubre paquetes diseñados para vivir una experiencia especial. Ya sea por descanso,
          celebración o una escapada cultural, podrás aprovechar al máximo tu estadía con nuestras
          ofertas exclusivas.
        </motion.p>

        {/* Línea dorada que se expande */}
        <div className="mt-10 flex justify-center">
          <motion.span 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-[2px]" 
            style={{ backgroundColor: GOLD }} 
          />
        </div>
      </div>
    </section>
  );
}