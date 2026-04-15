"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Great_Vibes } from "next/font/google";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "nosotros" },
  { label: "Habitaciones", href: "habitaciones" },
  { label: "Ofertas", href: "ofertas" },
  { label: "Contacto", href: "contacto" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/HotelConvencion",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.77c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99C18.34 21.13 22 16.99 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/hotelconvencion/",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.667.072 4.947.085 1.856.601 3.698 1.942 5.039 1.341 1.341 3.183 1.857 5.039 1.942C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.856-.085 3.698-.601 5.039-1.942 1.341-1.341 1.857-3.183 1.942-5.039.058-1.28.072-1.688.072-4.947 0-3.259-.014-3.667-.072-4.947-.085-1.856-.601-3.698-1.942-5.039C20.645.673 18.803.157 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@hotel_convencion",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
];

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] });
const vibes = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const GOLD = "#A67C3D";

const initialModal = { nombre: "", telefono: "", email: "" };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [habitacionesOpts, setHabitacionesOpts] = useState([
    { value: "habitacion-simple", label: "Habitación Simple" },
    { value: "habitacion-doble", label: "Habitación Doble" },
    { value: "habitacion-matrimonial", label: "Habitación Matrimonial" },
    { value: "habitacion-king", label: "Habitación King" },
  ]);
  const [selected, setSelected] = useState("habitacion-simple");
  const [modalData, setModalData] = useState(initialModal);
  const [modalLoading, setModalLoading] = useState(false);

  // Fetch habitaciones desde Firebase
  useEffect(() => {
    const fetchHabs = async () => {
      try {
        const q = query(
          collection(db, "habitaciones"),
          where("active", "==", true),
          orderBy("nombre", "asc")
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const opts = snap.docs.map((d) => ({
            value: d.data().slug,
            label: d.data().nombre,
          }));
          setHabitacionesOpts(opts);
          setSelected(opts[0].value);
        }
      } catch (err) {
        console.error("Error fetching habitaciones:", err);
      }
    };
    fetchHabs();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openModal = () => {
    setModalData(initialModal);
    setModalOpen(true);
    document.documentElement.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.documentElement.style.overflow = "";
  };

  const onBackdropClick = (e) => { if (e.target === e.currentTarget) closeModal(); };
  const handleChange = (e) => setModalData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      const res = await fetch("/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: modalData.nombre,
          apellido: "",
          email: modalData.email,
          telefono: modalData.telefono,
          habitacion: habitacionesOpts.find((o) => o.value === selected)?.label || selected,
          entrada: "",
          salida: "",
          adultos: "",
          ninos: "",
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);

      closeModal();
      Swal.fire({
        icon: "success",
        title: "¡Reserva enviada!",
        text: "Nos pondremos en contacto contigo a la brevedad.",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#A67C3D",
        background: "#fff",
        color: "#111",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al enviar. Inténtalo nuevamente.",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#A67C3D",
      });
    } finally {
      setModalLoading(false);
    }
  };

  const headerBg = scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white/95 lg:bg-transparent";
  const textClass = scrolled ? "text-black" : "text-black lg:text-white";
  const logoSrcDesktop = scrolled ? "/logoblack.png" : "/logowhite.png";
  const logoSrcMobile = "/logoblack.png";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
        <nav className="mx-auto max-w-7xl px-6">

          {/* DESKTOP */}
          <div className="hidden lg:block">
            {!scrolled ? (
              <div className="pt-6 pb-4">
                <div className="relative flex items-center justify-center">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-4">
                    {SOCIAL_LINKS.map((s) => (
                      <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-white/70 hover:text-[#A67C3D] transition duration-300">
                        {s.icon}
                      </Link>
                    ))}
                  </div>
                  <Link href="/" className="flex items-center">
                    <Image src={logoSrcDesktop} alt="Hotel Convención" width={260} height={86} priority className="h-16 w-auto transition-all duration-300 hover:scale-105" />
                  </Link>
                </div>
                <div className="mt-5">
                  <div className="h-px w-full bg-white/35" />
                  <div className="flex items-center justify-between py-4">
                    <div className="w-40" />
                    <ul className={`flex items-center gap-10 text-sm tracking-[0.22em] uppercase ${textClass}`}>
                      {NAV_ITEMS.map((item) => (
                        <li key={item.href} className="relative group">
                          <a href={item.href} className="transition-colors duration-300">{item.label}</a>
                          <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-[#A67C3D] transition-all duration-500 group-hover:w-full" />
                        </li>
                      ))}
                    </ul>
                    <div className="w-40 flex justify-end">
                      <button type="button" onClick={openModal} className="px-6 py-3 text-sm uppercase tracking-[0.25em] border transition-all duration-500 border-white text-white hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]">
                        Reservar
                      </button>
                    </div>
                  </div>
                  <div className="h-px w-full bg-white/35" />
                </div>
              </div>
            ) : (
              <div className="h-24 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                  <Image src={logoSrcDesktop} alt="Hotel Convención" width={220} height={70} priority className="h-14 w-auto transition-all duration-300 hover:scale-105" />
                </Link>
                <ul className={`flex items-center gap-10 text-sm tracking-[0.22em] uppercase ${textClass}`}>
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href} className="relative group">
                      <a href={item.href} className="transition-colors duration-300">{item.label}</a>
                      <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-[#A67C3D] transition-all duration-500 group-hover:w-full" />
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-5">
                  {SOCIAL_LINKS.map((s) => (
                    <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-black/50 hover:text-[#A67C3D] transition duration-300">
                      {s.icon}
                    </Link>
                  ))}
                  <button type="button" onClick={openModal} className="px-6 py-3 text-sm uppercase tracking-[0.25em] border transition-all duration-500 border-black text-black hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]">
                    Reservar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* MOBILE */}
          <div className="lg:hidden">
            <div className="pt-4 flex items-center justify-center">
              <Link href="/" className="flex items-center justify-center">
                <Image src={logoSrcMobile} alt="Hotel Convención" width={200} height={64} priority className="h-12 w-auto transition-all duration-300" />
              </Link>
            </div>
            <div className="mt-3 pb-4 flex items-center justify-between">
              <button type="button" aria-label="Abrir menú" onClick={() => setOpen((v) => !v)} className={`inline-flex items-center justify-center p-2 transition ${textClass}`}>
                <HamburgerIcon open={open} />
              </button>
              <Link href="/contacto" aria-label="Ir a contacto" onClick={() => setOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/25 text-black transition-all duration-300 hover:border-[#A67C3D] hover:text-[#A67C3D]">
                <PhoneIcon />
              </Link>
              <button type="button" onClick={openModal} className="px-4 py-2 text-xs uppercase tracking-[0.25em] bg-[#A67C3D] text-white border border-[#A67C3D] transition-all duration-500 hover:opacity-90">
                Reservar ahora
              </button>
            </div>
            <div className="h-px w-full bg-black/10" />
            <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="pb-6 pt-4 text-center uppercase tracking-[0.22em] text-black">
                {NAV_ITEMS.map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block py-3 transition-all duration-300 hover:text-[#A67C3D]">
                    {item.label}
                  </a>
                ))}
                <div className="flex justify-center gap-6 mt-6">
                  {SOCIAL_LINKS.map((s) => (
                    <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-black/50 hover:text-[#A67C3D] transition duration-300">
                      {s.icon}
                    </Link>
                  ))}
                </div>
                <button type="button" onClick={() => { setOpen(false); openModal(); }} className="mt-5 inline-block px-6 py-3 border transition-all duration-500 border-black text-black hover:bg-[#A67C3D] hover:text-white hover:border-[#A67C3D]">
                  Reservar
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center px-4" onMouseDown={onBackdropClick}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md bg-white shadow-2xl border border-black/10">
            <div className="px-6 pt-6">
              <p className={`${vibes.className} text-3xl`} style={{ color: GOLD }}>Reservar</p>
              <p className="mt-1 text-sm text-black/60">Completa tus datos y te contactaremos.</p>
            </div>

            <form onSubmit={handleSubmit} className="px-6 pb-6 pt-6 space-y-5">
              <div>
                <label className={`${playfair.className} text-sm text-black`}>Nombre</label>
                <input type="text" name="nombre" required value={modalData.nombre} onChange={handleChange} className="mt-2 w-full h-11 px-4 border border-black/20 outline-none focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition" />
              </div>
              <div>
                <label className={`${playfair.className} text-sm text-black`}>Tipo de habitación</label>
                <select value={selected} onChange={(e) => setSelected(e.target.value)} className="mt-2 w-full h-11 px-4 border border-black/20 bg-white outline-none focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition">
                  {habitacionesOpts.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`${playfair.className} text-sm text-black`}>Teléfono</label>
                <input type="tel" name="telefono" required value={modalData.telefono} onChange={handleChange} className="mt-2 w-full h-11 px-4 border border-black/20 outline-none focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition" />
              </div>
              <div>
                <label className={`${playfair.className} text-sm text-black`}>Email</label>
                <input type="email" name="email" required value={modalData.email} onChange={handleChange} className="mt-2 w-full h-11 px-4 border border-black/20 outline-none focus:border-[#A67C3D] focus:ring-2 focus:ring-[#A67C3D]/20 transition" />
              </div>
              <label className="flex items-start gap-3 text-sm text-black/70">
                <input type="checkbox" required className="mt-1 accent-[#A67C3D]" />
                <span>Acepto la <Link href="/privacidad" className="underline decoration-black/30 hover:decoration-[#A67C3D] hover:text-black transition">política de privacidad</Link>.</span>
              </label>
              <div className="pt-2 flex items-center gap-3">
                <button type="submit" disabled={modalLoading} className="flex-1 h-11 text-xs uppercase tracking-[0.28em] bg-black text-white transition-all duration-500 hover:bg-[#A67C3D] disabled:opacity-70 flex items-center justify-center gap-2">
                  {modalLoading ? <Loader2 size={15} className="animate-spin" /> : "Reservar"}
                </button>
                <button type="button" onClick={closeModal} className="h-11 px-5 text-xs uppercase tracking-[0.28em] border border-black/30 text-black/80 hover:border-[#A67C3D] hover:text-[#A67C3D] transition">
                  Cerrar
                </button>
              </div>
            </form>

            <button type="button" onClick={closeModal} aria-label="Cerrar" className="absolute right-4 top-4 h-9 w-9 grid place-items-center text-black/60 hover:text-black transition">✕</button>
          </div>
        </div>
      )}
    </>
  );
}

function HamburgerIcon({ open }) {
  return (
    <div className="relative h-5 w-6">
      <span className={`absolute left-0 top-0 h-[2px] w-6 bg-current transition-transform duration-300 ${open ? "translate-y-[9px] rotate-45" : ""}`} />
      <span className={`absolute left-0 top-[9px] h-[2px] w-6 bg-current transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
      <span className={`absolute left-0 top-[18px] h-[2px] w-6 bg-current transition-transform duration-300 ${open ? "-translate-y-[9px] -rotate-45" : ""}`} />
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5 3.5h3L11 8l-2 2c1.7 3.3 4.4 6 7.7 7.7l2-2 4.5 1.5v3c0 1-0.7 1.8-1.7 2-1.2.2-2.5.3-3.8.1-8.2-1.2-14.7-7.7-15.9-15.9-.2-1.3-.1-2.6.1-3.8.2-1 .9-1.7 2-1.7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}