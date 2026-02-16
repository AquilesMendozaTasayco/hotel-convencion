"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Great_Vibes } from "next/font/google";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "nosotros" },
  { label: "Habitaciones", href: "habitaciones" },
  { label: "Ofertas", href: "ofertas" },
  { label: "Contacto", href: "contacto" },
];

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const GOLD = "#A67C3D";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // MODAL
  const [modalOpen, setModalOpen] = useState(false);

  const options = useMemo(
    () => [
      { value: "habitacion-simple", label: "Habitación Simple" },
      { value: "habitacion-doble", label: "Habitación Doble" },
      { value: "habitacion-matrimonial", label: "Habitación Matrimonial" },
      { value: "habitacion-king", label: "Habitación King" },
    ],
    []
  );

  const [selected, setSelected] = useState(options?.[0]?.value ?? "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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
    setModalOpen(true);
    document.documentElement.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.documentElement.style.overflow = "";
  };

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // luego conectas a WhatsApp / API
    closeModal();
  };

  // ✅ CAMBIO: en MÓVIL al inicio NO transparente (siempre blanco)
  const headerBg = scrolled
    ? "bg-white/95 backdrop-blur-md shadow-sm"
    : "bg-white/95 lg:bg-transparent";

  // ✅ CAMBIO: en MÓVIL texto negro al inicio (porque fondo blanco)
  const textClass = scrolled ? "text-black" : "text-black lg:text-white";

  // Desktop mantiene su lógica
  const logoSrcDesktop = scrolled ? "/logoblack.png" : "/logowhite.png";
  // ✅ Móvil siempre logo negro (fondo blanco)
  const logoSrcMobile = "/logoblack.png";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
      >
        <nav className="mx-auto max-w-7xl px-6">
          {/* =========================
              DESKTOP (LG+)
              - TOP (no scroll): 2 filas (logo arriba, menú abajo con líneas)
              - SCROLL: 1 fila (logo izq, menú centro, botón der)
          ========================== */}
          <div className="hidden lg:block">
            {!scrolled ? (
              // ======= ESTADO ARRIBA (TRANSPARENTE) =======
              <div className="pt-6 pb-4">
                {/* FILA 1: logo centrado */}
                <div className="relative flex items-center justify-center">
                  <Link href="/" className="flex items-center">
                    <Image
                      src={logoSrcDesktop}
                      alt="Hotel Convención"
                      width={260}
                      height={86}
                      priority
                      className="h-16 w-auto transition-all duration-300 hover:scale-105"
                    />
                  </Link>

                  {/* derecha: teléfono (opcional visual como 1ra imagen) */}
                  <div
                    className={`absolute right-0 top-1/2 -translate-y-1/2 text-sm ${textClass} opacity-90`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden>📞</span>
                      <span>(51) 215-7000</span>
                    </span>
                  </div>
                </div>

                {/* FILA 2: líneas + menú centrado + reservar a la derecha */}
                <div className="mt-5">
                  <div className="h-px w-full bg-white/35" />

                  <div className="flex items-center justify-between py-4">
                    <div className="w-40" /> {/* espaciador izq */}

                    <ul
                      className={`flex items-center gap-10 text-sm tracking-[0.22em] uppercase ${textClass}`}
                    >
                      {NAV_ITEMS.map((item) => (
                        <li key={item.href} className="relative group">
                          <a
                            href={item.href}
                            className="transition-colors duration-300"
                          >
                            {item.label}
                          </a>
                          <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-[#A67C3D] transition-all duration-500 group-hover:w-full" />
                        </li>
                      ))}
                    </ul>

                    <div className="w-40 flex justify-end">
                      <button
                        type="button"
                        onClick={openModal}
                        className="px-6 py-3 text-sm uppercase tracking-[0.25em] border transition-all duration-500
                                 border-white text-white hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]"
                      >
                        Reservar
                      </button>
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/35" />
                </div>
              </div>
            ) : (
              // ======= ESTADO SCROLL (BLANCO / 1 FILA) =======
              <div className="h-24 flex items-center justify-between">
                {/* LOGO izquierda */}
                <Link href="/" className="flex items-center">
                  <Image
                    src={logoSrcDesktop}
                    alt="Hotel Convención"
                    width={220}
                    height={70}
                    priority
                    className="h-14 w-auto transition-all duration-300 hover:scale-105"
                  />
                </Link>

                {/* menú centro */}
                <ul
                  className={`flex items-center gap-10 text-sm tracking-[0.22em] uppercase ${textClass}`}
                >
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href} className="relative group">
                      <a
                        href={item.href}
                        className="transition-colors duration-300"
                      >
                        {item.label}
                      </a>
                      <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-[#A67C3D] transition-all duration-500 group-hover:w-full" />
                    </li>
                  ))}
                </ul>

                {/* botón derecha */}
                <button
                  type="button"
                  onClick={openModal}
                  className="px-6 py-3 text-sm uppercase tracking-[0.25em] border transition-all duration-500
                           border-black text-black hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]"
                >
                  Reservar
                </button>
              </div>
            )}
          </div>

          {/* =========================
              MOBILE (<= LG)
              ✅ CAMBIO:
              - Fondo blanco al inicio (no transparente)
              - Barra de acciones: hamburguesa + icono llamada (a /contacto) + RESERVAR AHORA dorado
          ========================== */}
          <div className="lg:hidden">
            {/* FILA 1: logo centrado */}
            <div className="pt-4 flex items-center justify-center">
              <Link href="/" className="flex items-center justify-center">
                <Image
                  src={logoSrcMobile}
                  alt="Hotel Convención"
                  width={200}
                  height={64}
                  priority
                  className="h-12 w-auto transition-all duration-300"
                />
              </Link>
            </div>

            {/* FILA 2: acciones */}
            <div className="mt-3 pb-4 flex items-center justify-between">
              {/* hamburguesa */}
              <button
                type="button"
                aria-label="Abrir menú"
                onClick={() => setOpen((v) => !v)}
                className={`inline-flex items-center justify-center p-2 transition ${textClass}`}
              >
                <HamburgerIcon open={open} />
              </button>

              {/* icono llamada -> /contacto */}
              <Link
                href="/contacto"
                aria-label="Ir a contacto"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/25
                           text-black transition-all duration-300 hover:border-[#A67C3D] hover:text-[#A67C3D]"
              >
                <PhoneIcon />
              </Link>

              {/* ✅ Reservar ahora dorado */}
              <button
                type="button"
                onClick={openModal}
                className="px-4 py-2 text-xs uppercase tracking-[0.25em]
                           bg-[#A67C3D] text-white border border-[#A67C3D]
                           transition-all duration-500 hover:opacity-90"
              >
                Reservar ahora
              </button>
            </div>

            <div className="h-px w-full bg-black/10" />

            {/* MOBILE MENU */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pb-6 pt-4 text-center uppercase tracking-[0.22em] text-black">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 transition-all duration-300 hover:text-[#A67C3D]"
                  >
                    {item.label}
                  </a>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openModal();
                  }}
                  className="mt-5 inline-block px-6 py-3 border transition-all duration-500
                             border-black text-black hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]"
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center px-4"
          onMouseDown={onBackdropClick}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative z-10 w-full max-w-md bg-white shadow-2xl border border-black/10">
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
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

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

              <label className="flex items-start gap-3 text-sm text-black/70">
                <input
                  type="checkbox"
                  required
                  className="mt-1 accent-[#A67C3D]"
                />
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

function HamburgerIcon({ open }) {
  return (
    <div className="relative h-5 w-6">
      <span
        className={`absolute left-0 top-0 h-[2px] w-6 bg-current transition-transform duration-300 ${
          open ? "translate-y-[9px] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[9px] h-[2px] w-6 bg-current transition-opacity duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 top-[18px] h-[2px] w-6 bg-current transition-transform duration-300 ${
          open ? "-translate-y-[9px] -rotate-45" : ""
        }`}
      />
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5h3L11 8l-2 2c1.7 3.3 4.4 6 7.7 7.7l2-2 4.5 1.5v3c0 1-0.7 1.8-1.7 2
           -1.2.2-2.5.3-3.8.1-8.2-1.2-14.7-7.7-15.9-15.9
           -.2-1.3-.1-2.6.1-3.8.2-1 .9-1.7 2-1.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}