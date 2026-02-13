"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "nosotros" },
  { label: "Habitaciones", href: "habitaciones" },
  { label: "Ofertas", href: "ofertas" },
  // { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "contacto" },
];

const GOLD = "#A67C3D";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  const bgClass = scrolled
    ? "bg-white/95 backdrop-blur-md shadow-sm"
    : "bg-transparent";

  const textClass = scrolled ? "text-black" : "text-white";
  const logoSrc = scrolled ? "/logoblack.png" : "/logowhite.png";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}>
      <nav className="mx-auto max-w-7xl px-6">
        <div className="h-24 flex items-center justify-between">

          {/* LOGO MÁS GRANDE */}
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
          <div className="hidden lg:flex items-center gap-10">
            <ul className={`flex items-center gap-10 text-sm tracking-[0.22em] uppercase ${textClass}`}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="relative group">
                  <a
                    href={item.href}
                    className="transition-colors duration-300"
                  >
                    {item.label}
                  </a>

                  {/* Hover Dorado Elegante */}
                  <span
                    className="absolute left-0 -bottom-2 h-[2px] w-0 bg-[#A67C3D] transition-all duration-500 group-hover:w-full"
                  />
                </li>
              ))}
            </ul>

            {/* BOTÓN RESERVAR MÁS PREMIUM */}
            <a
              href="#reservar"
              className={`px-6 py-3 text-sm uppercase tracking-[0.25em] border transition-all duration-500
              ${
                scrolled
                  ? "border-black text-black hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]"
                  : "border-white text-white hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]"
              }`}
            >
              Reservar
            </a>
          </div>

          {/* HAMBURGUESA */}
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden inline-flex items-center justify-center p-2 transition ${textClass}`}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className={`pb-6 pt-4 text-center uppercase tracking-[0.22em] ${scrolled ? "text-black" : "text-white"}`}>
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

            <a
              href="#reservar"
              onClick={() => setOpen(false)}
              className={`mt-5 inline-block px-6 py-3 border transition-all duration-500
              ${
                scrolled
                  ? "border-black text-black hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]"
                  : "border-white text-white hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]"
              }`}
            >
              Reservar
            </a>
          </div>
        </div>
      </nav>
    </header>
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
