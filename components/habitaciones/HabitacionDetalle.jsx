"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { habitaciones } from "@/data/habitaciones";
import { motion, AnimatePresence } from "framer-motion"; // 📦 Importar framer-motion

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const GOLD = "#A67C3D";

export default function HabitacionDetalle({ room }) {
  const index = habitaciones.findIndex((h) => h.slug === room.slug);
  const prev = index > 0 ? habitaciones[index - 1] : null;
  const next = index < habitaciones.length - 1 ? habitaciones[index + 1] : null;

  // Modal
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(room.slug);

  // Opciones del select
  const roomOptions = useMemo(() => {
    return habitaciones.map((h) => ({
      slug: h.slug,
      label: h.nombre,
    }));
  }, []);

  // Cerrar modal con ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openModal = () => {
    setSelected(room.slug);
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
      <section className="bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-16">
          {/* Breadcrumb simple con fade in */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs uppercase tracking-[0.25em] text-black/50"
          >
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link href="/habitaciones" className="hover:text-black transition">
              Habitaciones
            </Link>
            <span className="mx-2">›</span>
            <span className="text-black/80">{room.nombre}</span>
          </motion.div>

          {/* Título animado */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`${vibes.className} mt-6 text-4xl sm:text-6xl`}
            style={{ color: GOLD }}
          >
            {room.nombre}
          </motion.h1>

          {/* Imagen grande con efecto Reveal */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mt-10 relative w-full h-[420px] sm:h-[560px] overflow-hidden shadow-md border border-black/10"
          >
            <Image
              src={room.imagen}
              alt={room.nombre}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>

          {/* Info */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Detalles */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-black/10 p-6">
                  <p className={`${playfair.className} text-sm uppercase tracking-[0.18em] text-black/60`}>
                    Camas
                  </p>
                  <p className="mt-2 text-black/80">{room.camas}</p>
                </div>

                <div className="border border-black/10 p-6">
                  <p className={`${playfair.className} text-sm uppercase tracking-[0.18em] text-black/60`}>
                    Pisos
                  </p>
                  <p className="mt-2 text-black/80">{room.pisos}</p>
                </div>
              </div>

              <p className="mt-8 text-sm sm:text-base leading-7 text-black/70">
                {room.descripcion}
              </p>

              {/* Línea dorada animada */}
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

            {/* CTA Reservar con Sticky sutil */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="border border-black/10 p-8 lg:sticky lg:top-24"
            >
              <p className={`${playfair.className} text-sm uppercase tracking-[0.22em] text-black/60`}>
                Reserva tu estadía
              </p>

              <p className="mt-4 text-sm text-black/65 leading-6">
                Disfruta una experiencia cómoda y ejecutiva con atención personalizada.
              </p>

              <button
                type="button"
                onClick={openModal}
                className="mt-8 block text-center w-full py-3 text-xs uppercase tracking-[0.28em]
                           transition-all duration-500
                           bg-black text-white hover:bg-[#A67C3D]"
              >
                Reservar ahora
              </button>
            </motion.div>
          </div>

          {/* Navegación anterior / siguiente */}
          <div className="mt-16 flex items-center justify-between gap-4 border-t border-black/5 pt-10">
            {prev ? (
              <Link
                href={`/habitaciones/${prev.slug}`}
                className="group flex flex-col gap-2"
              >
                <span className="text-[10px] uppercase tracking-widest text-black/40">Anterior</span>
                <span className="text-xs uppercase tracking-[0.25em] text-black/70 group-hover:text-[#A67C3D] transition">
                  ← {prev.nombre}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link
                href={`/habitaciones/${next.slug}`}
                className="group flex flex-col gap-2 items-end text-right"
              >
                <span className="text-[10px] uppercase tracking-widest text-black/40">Siguiente</span>
                <span className="text-xs uppercase tracking-[0.25em] text-black/70 group-hover:text-[#A67C3D] transition">
                  {next.nombre} →
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </section>

      {/* MODAL ANIMADO */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center px-4"
            onMouseDown={onBackdropClick}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-md bg-white shadow-2xl border border-black/10"
            >
              <div className="px-6 pt-6">
                <p className={`${vibes.className} text-3xl`} style={{ color: GOLD }}>
                  Reservar
                </p>
                <p className="mt-1 text-sm text-black/60">
                  Completa tus datos y te contactaremos.
                </p>
              </div>

              <form onSubmit={onSubmit} className="px-6 pb-6 pt-6 space-y-5">
                <div>
                  <label className={`${playfair.className} text-sm text-black`}>Nombre</label>
                  <input
                    type="text"
                    required
                    className="mt-2 w-full h-11 px-4 border border-black/20 outline-none
                               focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition"
                  />
                </div>

                <div>
                  <label className={`${playfair.className} text-sm text-black`}>Tipo de habitación</label>
                  <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="mt-2 w-full h-11 px-4 border border-black/20 bg-white outline-none
                               focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition"
                  >
                    {roomOptions.map((opt) => (
                      <option key={opt.slug} value={opt.slug}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`${playfair.className} text-sm text-black`}>Teléfono</label>
                  <input
                    type="tel"
                    required
                    className="mt-2 w-full h-11 px-4 border border-black/20 outline-none
                               focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition"
                  />
                </div>

                <div>
                  <label className={`${playfair.className} text-sm text-black`}>Email</label>
                  <input
                    type="email"
                    required
                    className="mt-2 w-full h-11 px-4 border border-black/20 outline-none
                               focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition"
                  />
                </div>

                <label className="flex items-start gap-3 text-sm text-black/70 cursor-pointer">
                  <input type="checkbox" required className="mt-1 accent-[#A67C3D]" />
                  <span>
                    Acepto la{" "}
                    <Link href="/privacidad" className="underline decoration-black/30 hover:decoration-[#A67C3D] transition">
                      política de privacidad
                    </Link>.
                  </span>
                </label>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 h-11 text-xs uppercase tracking-[0.28em]
                               bg-black text-white transition-all duration-500
                               hover:bg-[#A67C3D]"
                  >
                    Reservar
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="h-11 px-5 text-xs uppercase tracking-[0.28em]
                               border border-black/30 text-black/80
                               hover:border-[#A67C3D] transition"
                  >
                    Cerrar
                  </button>
                </div>
              </form>

              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 h-9 w-9 grid place-items-center text-black/60 hover:text-black transition"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}