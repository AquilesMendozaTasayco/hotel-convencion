"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Sidebar from "@/components/admin/Sidebar";
import { Great_Vibes } from "next/font/google";
import { motion } from "framer-motion";

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const GOLD = "#A67C3D";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
        
        if (!isLoginPage) {
          router.push("/admin/login");
        }
      }
    });

    return () => unsubscribe();
  }, [router, isLoginPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAF9F6]">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            {/* Spinner elegante en color Oro */}
            <div 
              className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent mb-6"
              style={{ borderColor: `${GOLD}33`, borderTopColor: GOLD }}
            ></div>
            
            <p className={`${vibes.className} text-3xl text-black mb-2`}>
              Hotel Convención
            </p>
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-400">
              Verificando credenciales
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#FAF9F6]">
      <Sidebar />
      <main className="flex-1 p-8 bg-[#FAF9F6] overflow-y-auto">
        {/* Contenedor con Fade-in para el contenido */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}