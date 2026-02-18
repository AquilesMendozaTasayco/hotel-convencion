"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Playfair_Display, Great_Vibes } from "next/font/google";
import {
  Handshake,
  Truck,
  Newspaper,
  Package,
  LogOut,
  LayoutGrid,
} from "lucide-react";
import { useState } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Añadido 700 para mayor peso
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const GOLD = "#D4AF37"; // Un dorado un poco más vibrante para contraste oscuro
const DARK_EBONY = "#1A1614"; 

const items = [
  { label: "Banners", href: "/admin/banners", icon: LayoutGrid },
  { label: "Habitaciones", href: "/admin/habitaciones", icon: Package },
  { label: "Ofertas", href: "/admin/ofertas", icon: Handshake },
  // { label: "Legales", href: "/admin/legales", icon: Truck },
  // { label: "Categorías", href: "/admin/categorias", icon: Newspaper },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    try {
      setIsLoggingOut(true);
      await signOut(auth);
      router.push("/admin/login");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <aside 
      className="sticky top-0 h-screen w-[280px] flex-shrink-0 flex flex-col border-r border-white/10 shadow-2xl"
      style={{ backgroundColor: DARK_EBONY }}
    >
      
      {/* 🏛️ HEADER - Tipografía blanca pura */}
      <div className="py-14 px-8 text-center">
        <div className="relative inline-block">
          <p className={`${vibes.className} text-4xl text-white leading-none`}>
            Hotel
          </p>
          <h2 className={`${playfair.className} text-xl font-bold uppercase tracking-[0.25em] text-white mt-2`}>
            Convención
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            className="mt-3 h-[2px] mx-auto" 
            style={{ backgroundColor: GOLD }} 
          />
        </div>
      </div>

      {/* 📂 NAVEGACIÓN - Mayor contraste */}
      <nav className="flex-1 px-4 space-y-3">
        <p className="px-4 mb-4 text-[9px] font-black uppercase tracking-[0.5em] text-white/40">
          Menú Principal
        </p>

        {items.map((it) => {
          const active = pathname === it.href || pathname.startsWith(it.href + "/");
          const Icon = it.icon;

          return (
            <Link
              key={it.href}
              href={it.href}
              className={`group relative flex items-center gap-4 px-5 py-4 transition-all duration-300 rounded-xl ${
                active 
                  ? "bg-white text-black" 
                  : "text-gray-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              {/* Luz lateral dorada para el activo */}
              {active && (
                <motion.div 
                  layoutId="sidebar-active-dark"
                  className="absolute left-[-4px] w-[6px] h-8 rounded-r-full shadow-[0_0_15px_#D4AF37]"
                  style={{ backgroundColor: GOLD }}
                />
              )}

              <Icon
                className={`h-5 w-5 transition-all duration-300 ${
                  active ? "text-[#1A1614]" : "text-gray-400 group-hover:text-white"
                }`}
              />

              <span className={`text-[11px] font-extrabold uppercase tracking-[0.15em] transition-all duration-300`}>
                {it.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* 🚪 FOOTER / SALIR */}
      <div className="p-6">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="group flex w-full items-center gap-4 px-5 py-4 transition-all duration-500 rounded-2xl border border-white/10 hover:border-red-500/50 hover:bg-red-500/5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 group-hover:bg-red-500/20 transition-colors">
            <LogOut className={`h-4 w-4 text-white group-hover:text-red-500 ${isLoggingOut ? 'animate-pulse' : ''}`} />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[11px] font-black uppercase tracking-widest text-white group-hover:text-red-500">
              {isLoggingOut ? "Cerrando" : "Salir"}
            </span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-white/30">
              Administrador
            </span>
          </div>
        </button>
      </div>
    </aside>
  );
}