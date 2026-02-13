"use client"; // ⚡️ Necesario para Framer Motion
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

export default function About() {
  return (
    <section id="about" className="bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Imagen izquierda con animación de entrada */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-[420px] sm:h-[520px] flex items-center justify-center"
          >
            {/* Contenedor inclinado */}
            <div className="relative w-[92%] h-full rotate-[-2deg] transition-transform duration-700 hover:rotate-0">
              
              {/* Líneas decorativas */}
              <div
                className="absolute -top-6 -left-6 w-24 h-24"
                style={{
                  borderTop: `3px solid ${GOLD}`,
                  borderLeft: `3px solid ${GOLD}`,
                }}
              />

              <div
                className="absolute -bottom-6 -right-6 w-24 h-24"
                style={{
                  borderBottom: `3px solid ${GOLD}`,
                  borderRight: `3px solid ${GOLD}`,
                }}
              />

              {/* Imagen */}
              <div className="relative w-full h-full overflow-hidden shadow-2xl">
                <Image
                  src="/12.jpeg"
                  alt="Hotel Convención - Trujillo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>

          {/* Texto derecha con entrada escalonada */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <p className={`${vibes.className} text-2xl sm:text-3xl text-black tracking-wide`}>
              Bienvenidos a
            </p>

            <h2 className={`${vibes.className} mt-2 text-3xl sm:text-5xl font-medium text-black tracking-[0.06em]`}>
              Hotel Convención
            </h2>

            <p
              className={`${vibes.className} mt-4 text-3xl sm:text-4xl`}
              style={{ color: GOLD }}
            >
              Confort ejecutivo en Trujillo
            </p>

            <p className="mt-6 text-sm sm:text-base leading-7 text-black/70 max-w-xl mx-auto lg:mx-0">
              Disfruta una estadía pensada para viajes de negocio o turismo, con un
              servicio cálido, ubicación estratégica y comodidades que elevan tu
              experiencia. En Hotel Convención cuidamos cada detalle para que te
              sientas cómodo, tranquilo y bien atendido.
            </p>

            {/* Línea decorativa */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }} // w-24 es 96px
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-8 flex justify-center lg:justify-start"
            >
              <span className="h-[2px] w-full" style={{ backgroundColor: GOLD }} />
            </motion.div>

            {/* Botón */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/nosotros"
                className="px-8 py-3 text-xs uppercase tracking-[0.3em] border transition-all duration-500
                           border-black text-black
                           hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]"
              >
                Conócenos más
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}