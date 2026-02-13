"use client"; // ✨ Necesario para Framer Motion

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
          alt="Salón Ejecutivo y Sala de Conferencias"
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
            Salón Ejecutivo & Sala de Conferencias
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Card Salón Ejecutivo - Entra desde la izquierda */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-lg flex flex-col justify-between"
          >
            <div>
              <h3
                className={`${playfair.className} text-2xl mb-4`}
                style={{ color: GOLD }}
              >
                Salón Ejecutivo
              </h3>

              <p className="text-white/85 leading-7 text-sm sm:text-base">
                Ubicado en el primer piso del Hotel Convención, nuestro Salón Ejecutivo
                es un exclusivo refugio para disfrutar deliciosos desayunos, tentadores
                snack y bebidas no alcohólicas ilimitadas. Este espacio también cuenta
                con un directorio dedicado para sus reuniones de trabajo.
              </p>
            </div>

            <motion.a
              whileHover={{ backgroundColor: GOLD, borderColor: GOLD }}
              href="#salon-ejecutivo"
              className="inline-block mt-6 text-center text-xs uppercase tracking-[0.3em]
                         border border-white px-6 py-3 transition duration-500"
            >
              Ver Salón Ejecutivo
            </motion.a>
          </motion.div>

          {/* Card Sala de Conferencias - Entra desde la derecha */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-lg flex flex-col justify-between"
          >
            <div>
              <h3
                className={`${playfair.className} text-2xl mb-4`}
                style={{ color: GOLD }}
              >
                Sala de Conferencias
              </h3>

              <p className="text-white/85 leading-7 text-sm sm:text-base mb-4">
                Ya sea que esté organizando una reunión corporativa, una conferencia
                internacional o un evento especial, nuestro espacio ofrece el ambiente
                perfecto para destacar.
              </p>

              <ul className="text-white/80 text-sm space-y-2">
                <li>• Equipo técnico para eventos</li>
                <li>• Videoconferencia</li>
                <li>• Zona de exposición y presentaciones</li>
                <li>• Equipo audiovisual</li>
                <li>• Bocaditos personalizados</li>
                <li>• Decoración personalizada</li>
                <li>• Mobiliario ejecutivo</li>
                <li>• Servicios de almuerzo y cena</li>
              </ul>
            </div>

            <motion.a
              whileHover={{ backgroundColor: GOLD, borderColor: GOLD }}
              href="#sala-conferencias"
              className="inline-block mt-6 text-center text-xs uppercase tracking-[0.3em]
                         border border-white px-6 py-3 transition duration-500"
            >
              Ver Sala de Conferencias
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}