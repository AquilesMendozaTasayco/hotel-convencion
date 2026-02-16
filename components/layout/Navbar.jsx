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

  // detectar móvil
  const [isMobile, setIsMobile] = useState(false);

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
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setOpen(false);
    };
    onResize();
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
    closeModal();
  };

  // ✅ MÓVIL: al inicio NO transparente (siempre blanco)
  const bgClass = scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white/95 lg:bg-transparent";

  // ✅ texto/logo: en móvil al inicio negro; en desktop al inicio blanco
  const isMobileTop = isMobile && !scrolled;
  const textClass = scrolled ? "text-black" : isMobileTop ? "text-black" : "text-white";
  const logoSrc = scrolled ? "/logoblack.png" : isMobileTop ? "/logoblack.png" : "/logowhite.png";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}
      >
        <nav className="mx-auto max-w-7xl px-6">
          {/* ====== MOBILE (solo móvil) ====== */}
          <div className="lg:hidden py-3">
            {/* Fila 1: LOGO centrado */}
            <div className="flex items-center justify-center">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src={logoSrc}
                  alt="Hotel Convención"
                  width={220}
                  height={70}
                  priority
                  className="h-12 w-auto transition-all duration-300 hover:scale-105"
                />
              </Link>
            </div>

            {/* Fila 2: acciones (hamburguesa + llamada + reservar) */}
            <div className="mt-3 flex items-center justify-between">
              {/* Hamburguesa IZQ */}
              <button
                type="button"
                aria-label="Abrir menú"
                onClick={() => setOpen((v) => !v)}
                className={`inline-flex items-center justify-center p-2 transition ${textClass}`}
              >
                <HamburgerIcon open={open} />
              </button>

              {/* ÍCONO LLAMADA (solo móvil) → /contacto */}
              <Link
                href="/contacto"
                aria-label="Ir a contacto"
                onClick={() => setOpen(false)}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300
                  ${
                    scrolled || isMobileTop
                      ? "border-black/30 text-black hover:border-[#A67C3D] hover:text-[#A67C3D]"
                      : "border-white/60 text-white hover:border-[#A67C3D] hover:text-[#A67C3D]"
                  }`}
              >
                <PhoneIcon />
              </Link>

              {/* ✅ Botón RESERVAR AHORA (móvil) dorado */}
              <button
                type="button"
                onClick={openModal}
                className="px-5 py-2 text-xs uppercase tracking-[0.25em] border border-[#A67C3D]
                           bg-[#A67C3D] text-white transition-all duration-500 hover:opacity-90"
              >
                Reservar ahora
              </button>
            </div>
          </div>

          {/* ====== DESKTOP (NO SE TOCA) ====== */}
          <div className="hidden lg:flex h-24 items-center justify-between">
            {/* LOGO */}
            <Link href="/" className="flex items-center">
              <Image
                src={logoSrc}
                alt="Hotel Convención"
                width={220}
                height={70}
                priority
                className="h-14 w-auto transition-all duration-300 hover:scale-105"
              />
            </Link>

            {/* DESKTOP MENU */}
            <div className="flex items-center gap-10">
              <ul
                className={`flex items-center gap-10 text-sm tracking-[0.22em] uppercase ${textClass}`}
              >
                {NAV_ITEMS.map((item) => (
                  <li key={item.href} className="relative group">
                    <a href={item.href} className="transition-colors duration-300">
                      {item.label}
                    </a>
                    <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-[#A67C3D] transition-all duration-500 group-hover:w-full" />
                  </li>
                ))}
              </ul>

              {/* BOTÓN RESERVAR (desktop) */}
              <button
                type="button"
                onClick={openModal}
                className={`px-6 py-3 text-sm uppercase tracking-[0.25em] border transition-all duration-500
                  ${
                    scrolled
                      ? "border-black text-black hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]"
                      : "border-white text-white hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]"
                  }`}
              >
                Reservar
              </button>
            </div>
          </div>

          {/* MOBILE MENU (solo móvil) */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ${
              open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={`pb-6 pt-4 text-center uppercase tracking-[0.22em] ${
                scrolled || isMobileTop ? "text-black" : "text-white"
              }`}
            >
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

              {/* BOTÓN RESERVAR MOBILE */}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openModal();
                }}
                className={`mt-5 inline-block px-6 py-3 border transition-all duration-500
                  ${
                    scrolled || isMobileTop
                      ? "border-black text-black hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]"
                      : "border-white text-white hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]"
                  }`}
              >
                Reservar
              </button>
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