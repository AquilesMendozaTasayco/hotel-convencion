"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { Playfair_Display, Great_Vibes } from "next/font/google";
import { habitaciones } from "@/data/habitaciones";
import { motion, AnimatePresence } from "framer-motion"; // 📦 Importes necesarios

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const GOLD = "#A67C3D";

export default function Habitaciones() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(habitaciones?.[0]?.slug ?? "");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const roomOptions = useMemo(() => {
    return habitaciones.map((h) => ({
      slug: h.slug,
      label: h.nombre,
    }));
  }, []);

  const openModal = (slug) => {
    setSelected(slug);
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
  };

  const closeModal = () => {
    setOpen(false);
    document.documentElement.style.overflow = "";
  };

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      <section id="habitaciones" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Título animado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className={`${vibes.className} text-center text-3xl sm:text-5xl tracking-[0.05em]`}
              style={{ color: GOLD }}
            >
              Nuestras Habitaciones
            </h2>

            <p className="mt-4 text-center text-sm sm:text-base text-black/65 max-w-2xl mx-auto">
              Descubre el equilibrio perfecto entre comodidad y estilo. Elige la
              habitación ideal para tu viaje de negocio o descanso en Trujillo.
            </p>
          </motion.div>

          {/* Cards con Stagger Effect */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {habitaciones.map((hab, index) => (
              <motion.div
                key={hab.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }} // Entrada escalonada
                className="bg-white border border-black/10 shadow-sm overflow-hidden hover:shadow-md transition duration-500"
              >
                {/* Imagen */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={hab.imagen}
                    alt={hab.nombre}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                </div>

                {/* Texto */}
                <div className="p-6">
                  <h3
                    className={`${vibes.className} text-[26px] text-black`}
                    style={{ color: GOLD }}
                  >
                    {hab.nombre}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-black/65">
                    {hab.descripcion}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      href={`/habitaciones/${hab.slug}`}
                      className="text-xs uppercase tracking-[0.22em] text-black/70 hover:text-[#A67C3D] transition"
                    >
                      Ver habitación →
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={() => openModal(hab.slug)}
                    className="mt-6 block text-center w-full py-3 text-xs uppercase tracking-[0.28em] transition-all duration-500
                               border border-black text-black hover:bg-[#A67C3D] hover:border-[#A67C3D] hover:text-white"
                  >
                    Reservar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL ANIMADO */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onMouseDown={onBackdropClick}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            />

            {/* Card Modal */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative z-10 w-full max-w-md bg-white shadow-2xl border border-black/10"
            >
              {/* Header */}
              <div className="px-6 pt-6">
                <p className={`${vibes.className} text-3xl`} style={{ color: GOLD }}>
                  Reservar
                </p>
                <p className="mt-1 text-sm text-black/60">
                  Completa tus datos y te contactaremos.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="px-6 pb-6 pt-6 space-y-5">
                <div>
                  <label className={`${playfair.className} text-sm text-black`}>Nombre</label>
                  <input type="text" required className="mt-2 w-full h-11 px-4 border border-black/20 outline-none focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition" />
                </div>

                <div>
                  <label className={`${playfair.className} text-sm text-black`}>Tipo de habitación</label>
                  <select value={selected} onChange={(e) => setSelected(e.target.value)} className="mt-2 w-full h-11 px-4 border border-black/20 bg-white outline-none focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition">
                    {roomOptions.map((opt) => (
                      <option key={opt.slug} value={opt.slug}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`${playfair.className} text-sm text-black`}>Teléfono</label>
                  <input type="tel" required className="mt-2 w-full h-11 px-4 border border-black/20 outline-none focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition" />
                </div>

                <div>
                  <label className={`${playfair.className} text-sm text-black`}>Email</label>
                  <input type="email" required className="mt-2 w-full h-11 px-4 border border-black/20 outline-none focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition" />
                </div>

                <label className="flex items-start gap-3 text-sm text-black/70">
                  <input type="checkbox" required className="mt-1 accent-[#A67C3D]" />
                  <span>Acepto la <Link href="/privacidad" className="underline decoration-black/30 hover:decoration-[#A67C3D] hover:text-black transition">política de privacidad</Link>.</span>
                </label>

                <div className="pt-2 flex items-center gap-3">
                  <button type="submit" className="flex-1 h-11 text-xs uppercase tracking-[0.28em] bg-black text-white transition-all duration-500 hover:bg-[#A67C3D]">
                    Reservar
                  </button>
                  <button type="button" onClick={closeModal} className="h-11 px-5 text-xs uppercase tracking-[0.28em] border border-black/30 text-black/80 hover:border-[#A67C3D] hover:text-[#A67C3D] transition">
                    Cerrar
                  </button>
                </div>
              </form>

              <button type="button" onClick={closeModal} aria-label="Cerrar" className="absolute right-4 top-4 h-9 w-9 grid place-items-center text-black/60 hover:text-black transition">
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}