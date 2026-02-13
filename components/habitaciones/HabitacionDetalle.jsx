"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { habitaciones } from "@/data/habitaciones";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // Luego aquí conectas a WhatsApp / API / email
    closeModal();
  };

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          {/* Breadcrumb simple */}
          <div className="text-xs uppercase tracking-[0.25em] text-black/50">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link href="/habitaciones" className="hover:text-black transition">
              Habitaciones
            </Link>
            <span className="mx-2">›</span>
            <span className="text-black/80">{room.nombre}</span>
          </div>

          {/* Título */}
          <h1
            className={`${vibes.className} mt-6 text-4xl sm:text-6xl`}
            style={{ color: GOLD }}
          >
            {room.nombre}
          </h1>

          {/* Imagen grande */}
          <div className="mt-10 relative w-full h-[420px] sm:h-[560px] overflow-hidden shadow-md border border-black/10">
            <Image
              src={room.imagen}
              alt={room.nombre}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          {/* Info */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Detalles */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-black/10 p-6">
                  <p
                    className={`${playfair.className} text-sm uppercase tracking-[0.18em] text-black/60`}
                  >
                    Camas
                  </p>
                  <p className="mt-2 text-black/80">{room.camas}</p>
                </div>

                <div className="border border-black/10 p-6">
                  <p
                    className={`${playfair.className} text-sm uppercase tracking-[0.18em] text-black/60`}
                  >
                    Pisos
                  </p>
                  <p className="mt-2 text-black/80">{room.pisos}</p>
                </div>
              </div>

              <p className="mt-8 text-sm sm:text-base leading-7 text-black/70">
                {room.descripcion}
              </p>

              {/* Línea dorada */}
              <div className="mt-10">
                <span
                  className="block h-[2px] w-24"
                  style={{ backgroundColor: GOLD }}
                />
              </div>
            </div>

            {/* CTA Reservar */}
            <div className="border border-black/10 p-8">
              <p
                className={`${playfair.className} text-sm uppercase tracking-[0.22em] text-black/60`}
              >
                Reserva tu estadía
              </p>

              <p className="mt-4 text-sm text-black/65 leading-6">
                Disfruta una experiencia cómoda y ejecutiva con atención
                personalizada.
              </p>

              {/* MISMO BOTÓN, ahora abre modal */}
              <button
                type="button"
                onClick={openModal}
                className="mt-8 block text-center w-full py-3 text-xs uppercase tracking-[0.28em]
                         transition-all duration-500
                         bg-black text-white hover:bg-[#A67C3D]"
              >
                Reservar ahora
              </button>
            </div>
          </div>

          {/* Navegación anterior / siguiente */}
          <div className="mt-16 flex items-center justify-between gap-4">
            {prev ? (
              <Link
                href={`/habitaciones/${prev.slug}`}
                className="text-xs uppercase tracking-[0.25em] text-black/70 hover:text-[#A67C3D] transition"
              >
                ← {prev.nombre}
              </Link>
            ) : (
              <span />
            )}

            {next ? (
              <Link
                href={`/habitaciones/${next.slug}`}
                className="text-xs uppercase tracking-[0.25em] text-black/70 hover:text-[#A67C3D] transition"
              >
                {next.nombre} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </section>

      {/* MODAL (mismo estilo) */}
      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          onMouseDown={onBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Card Modal */}
          <div className="relative z-10 w-full max-w-md bg-white shadow-2xl border border-black/10">
            {/* Header */}
            <div className="px-6 pt-6">
              <p
                className={`${vibes.className} text-3xl`}
                style={{ color: GOLD }}
              >
                Reservar
              </p>
              <p className="mt-1 text-sm text-black/60">
                Completa tus datos y te contactaremos.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="px-6 pb-6 pt-6 space-y-5">
              {/* Nombre */}
              <div>
                <label className={`${playfair.className} text-sm text-black`}>
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  className="mt-2 w-full h-11 px-4 border border-black/20 outline-none
                             focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition"
                />
              </div>

              {/* Tipo habitación */}
              <div>
                <label className={`${playfair.className} text-sm text-black`}>
                  Tipo de habitación
                </label>
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

              {/* Teléfono */}
              <div>
                <label className={`${playfair.className} text-sm text-black`}>
                  Teléfono
                </label>
                <input
                  type="tel"
                  required
                  className="mt-2 w-full h-11 px-4 border border-black/20 outline-none
                             focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className={`${playfair.className} text-sm text-black`}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="mt-2 w-full h-11 px-4 border border-black/20 outline-none
                             focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition"
                />
              </div>

              {/* Política */}
              <label className="flex items-start gap-3 text-sm text-black/70">
                <input type="checkbox" required className="mt-1 accent-[#A67C3D]" />
                <span>
                  Acepto la{" "}
                  <Link
                    href="/privacidad"
                    className="underline decoration-black/30 hover:decoration-[#A67C3D] hover:text-black transition"
                  >
                    política de privacidad
                  </Link>
                  .
                </span>
              </label>

              {/* Botones */}
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
                             hover:border-[#A67C3D] hover:text-[#A67C3D] transition"
                >
                  Cerrar
                </button>
              </div>
            </form>

            {/* Close X */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Cerrar"
              className="absolute right-4 top-4 h-9 w-9 grid place-items-center
                         text-black/60 hover:text-black transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
