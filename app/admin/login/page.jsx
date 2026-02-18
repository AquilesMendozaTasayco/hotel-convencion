"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Lock, Mail, ChevronRight, Loader2, ShieldCheck } from "lucide-react";
import { Playfair_Display, Great_Vibes } from "next/font/google";
import { motion } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const GOLD = "#A67C3D";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/habitaciones");
    } catch (err) {
      setError("Credenciales inválidas o acceso denegado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[450px] bg-white shadow-2xl rounded-sm p-8 md:p-12 relative overflow-hidden border border-gray-100"
      >
        {/* Decoración de esquinas estilo Hotel Convención */}
        <div
          className="absolute top-4 left-4 w-12 h-12"
          style={{ borderTop: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` }}
        />
        <div
          className="absolute bottom-4 right-4 w-12 h-12"
          style={{ borderBottom: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` }}
        />

        <div className="text-center mb-10">
          <p className={`${vibes.className} text-3xl text-black`}>
            Bienvenido al
          </p>
          <h1 className={`${playfair.className} mt-1 text-2xl font-medium uppercase tracking-[0.15em] text-black`}>
            Hotel <span style={{ color: GOLD }}>Convención</span>
          </h1>
          <div className="mt-4 flex justify-center">
             <span className="h-[1px] w-12" style={{ backgroundColor: GOLD }} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mt-4">
            Panel de Administración
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Campo Correo */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/60 ml-1">
              Email Corporativo
            </label>
            <div className="relative group">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#A67C3D] transition-colors" />
              <input
                type="email"
                placeholder="admin@hotelconvencion.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-b border-gray-200 bg-transparent py-3 pl-8 pr-4 text-sm outline-none transition-all focus:border-[#A67C3D] text-black"
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/60 ml-1">
              Contraseña
            </label>
            <div className="relative group">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#A67C3D] transition-colors" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-b border-gray-200 bg-transparent py-3 pl-8 pr-4 text-sm outline-none transition-all focus:border-[#A67C3D] text-black"
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="bg-red-50 border-l-2 border-red-400 p-3"
            >
              <p className="text-[10px] font-bold uppercase text-red-600 italic tracking-wider">
                {error}
              </p>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full group relative flex items-center justify-center bg-black py-4 px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#A67C3D] disabled:bg-gray-200"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Acceder al Sistema
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3 w-3" style={{ color: GOLD }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Conexión Encriptada
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}