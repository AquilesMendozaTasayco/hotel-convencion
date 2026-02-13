"use client";

import Image from "next/image";
import Link from "next/link";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { ofertas } from "@/data/ofertas";
import { motion } from "framer-motion"; // 📦 Importar framer-motion

const vibes = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] });
const GOLD = "#A67C3D";

export default function OfertaDetalle({ oferta }) {
  const index = ofertas.findIndex((o) => o.slug === oferta.slug);
  const prev = index > 0 ? ofertas[index - 1] : null;
  const next = index < ofertas.length - 1 ? ofertas[index + 1] : null;

  return (
    <section className="bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-16">
        
        {/* Breadcrumb con entrada lateral suave */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs uppercase tracking-[0.25em] text-black/50"
        >
          <Link href="/" className="hover:text-black transition">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/ofertas" className="hover:text-black transition">Ofertas</Link>
          <span className="mx-2">›</span>
          <span className="text-black/80">{oferta.titulo}</span>
        </motion.div>

        {/* Título con Fade Up */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`${vibes.className} mt-6 text-4xl sm:text-6xl`} 
          style={{ color: GOLD }}
        >
          {oferta.titulo}
        </motion.h1>

        {/* Imagen con zoom-out sutil al cargar */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mt-10 relative w-full h-[420px] sm:h-[560px] overflow-hidden shadow-md border border-black/10"
        >
          <Image src={oferta.imagen} alt={oferta.titulo} fill className="object-cover" sizes="100vw" priority />
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Descripción */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <p className="text-sm sm:text-base leading-7 text-black/70">
              {oferta.descripcion}
            </p>

            <div className="mt-10">
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="block h-[2px]" 
                style={{ backgroundColor: GOLD }} 
              />
            </div>
          </motion.div>

          {/* Caja de Reserva (CTA) con efecto de aparecer desde la derecha */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border border-black/10 p-8 lg:sticky lg:top-24"
          >
            <p className={`${playfair.className} text-sm uppercase tracking-[0.22em] text-black/60`}>
              Aprovecha esta oferta
            </p>

            <p className="mt-4 text-sm text-black/65 leading-6">
              Reserva ahora y vive una experiencia única en Hotel Convención.
            </p>

            <a
              href="#reservar"
              className="mt-8 block text-center w-full py-3 text-xs uppercase tracking-[0.28em]
                         transition-all duration-500 bg-black text-white hover:bg-[#A67C3D]"
            >
              Reservar ahora
            </a>
          </motion.div>
        </div>

        {/* Navegación Inferior */}
        <div className="mt-16 flex items-center justify-between gap-4 border-t border-black/5 pt-10">
          {prev ? (
            <Link
              href={`/ofertas/${prev.slug}`}
              className="group flex flex-col gap-2"
            >
              <span className="text-[10px] uppercase tracking-widest text-black/40">Anterior</span>
              <span className="text-xs uppercase tracking-[0.25em] text-black/70 group-hover:text-[#A67C3D] transition">
                ← {prev.titulo}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/ofertas/${next.slug}`}
              className="group flex flex-col gap-2 items-end text-right"
            >
              <span className="text-[10px] uppercase tracking-widest text-black/40">Siguiente</span>
              <span className="text-xs uppercase tracking-[0.25em] text-black/70 group-hover:text-[#A67C3D] transition">
                {next.titulo} →
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </section>
  );
}