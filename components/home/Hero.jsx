"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, Loader2 } from "lucide-react";

export default function Hero() {
  const slides = useMemo(
    () => [
      { src: "/hero/1.jpeg", alt: "Hotel Convención - Slide 1" },
      { src: "/hero/2.jpeg", alt: "Hotel Convención - Slide 2" },
      { src: "/hero/3.jpeg", alt: "Hotel Convención - Slide 3" },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  
  // --- ESTADOS DEL FORMULARIO ---
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  
  const initialFormState = {
    entrada: "2026-02-13",
    salida: "2026-02-14",
    habitacion: "Habitación Matrimonial",
    adultos: "1",
    niños: "0",
    email: "",
    telefono: ""
  };

  const [formData, setFormData] = useState(initialFormState);

  // Lógica de Scroll
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const yTranslate = useTransform(scrollY, [0, 200], [0, 50]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. Simulación de envío (2 segundos de carga)
    setTimeout(() => {
      setLoading(false);
      setSent(true);

      // 2. Volver al formulario original después de 3 segundos
      setTimeout(() => {
        setSent(false);
        setFormData(initialFormState); // Limpia los campos
      }, 3000);
      
    }, 2000);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides Background */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className={`object-cover transition-transform duration-[7000ms] ${i === index ? 'scale-110' : 'scale-100'}`}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40" />

      {/* Buscador de Reservas */}
      <motion.div 
        style={{ opacity, y: yTranslate }}
        className="absolute bottom-12 left-0 w-full z-30 px-6 hidden lg:block"
      >
        <div className="mx-auto max-w-7xl bg-[#0F172A]/95 backdrop-blur-md border border-white/10 p-8 shadow-2xl min-h-[160px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-white text-xs uppercase tracking-[0.2em] mb-6 font-light">Hacer una Reserva</p>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-8 gap-3 items-end">
                  <div className="col-span-1 space-y-2">
                    <label className="text-[10px] text-white/50 uppercase">Entrada</label>
                    <div className="relative border border-white/20 p-2 flex items-center bg-white/5">
                      <input 
                        type="date" 
                        className="bg-transparent text-white text-xs outline-none w-full [color-scheme:dark]"
                        value={formData.entrada}
                        onChange={(e) => setFormData({...formData, entrada: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="col-span-1 space-y-2">
                    <label className="text-[10px] text-white/50 uppercase">Habitación</label>
                    <div className="relative border border-white/20 bg-white/5">
                      <select 
                        className="w-full bg-transparent text-white text-[10px] p-2.5 outline-none appearance-none cursor-pointer"
                        value={formData.habitacion}
                        onChange={(e) => setFormData({...formData, habitacion: e.target.value})}
                      >
                        <option className="bg-[#0F172A]">Habitación Matrimonial</option>
                        <option className="bg-[#0F172A]">Habitación Doble</option>
                        <option className="bg-[#0F172A]">Habitación Simple</option>
                        <option className="bg-[#0F172A]">Habitación King</option>
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-3 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  <div className="col-span-1 space-y-2">
                    <label className="text-[10px] text-white/50 uppercase">Adultos</label>
                    <div className="relative border border-white/20 bg-white/5">
                      <select 
                        className="w-full bg-transparent text-white text-xs p-2.5 outline-none appearance-none"
                        value={formData.adultos}
                        onChange={(e) => setFormData({...formData, adultos: e.target.value})}
                      >
                        {[1, 2, 3, 4].map(n => <option key={n} className="bg-[#0F172A]" value={n}>{n}</option>)}
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-3 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  <div className="col-span-1 space-y-2">
                    <label className="text-[10px] text-white/50 uppercase">Niños</label>
                    <div className="relative border border-white/20 bg-white/5">
                      <select 
                        className="w-full bg-transparent text-white text-xs p-2.5 outline-none appearance-none"
                        value={formData.niños}
                        onChange={(e) => setFormData({...formData, niños: e.target.value})}
                      >
                        {[0, 1, 2, 3, 4].map(n => <option key={n} className="bg-[#0F172A]" value={n}>{n}</option>)}
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-3 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  <div className="col-span-1 space-y-2">
                    <label className="text-[10px] text-white/50 uppercase">Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="Tu correo"
                      className="w-full bg-white/5 border border-white/20 p-2.5 text-white text-xs outline-none focus:border-[#A67C3D] transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="col-span-1 space-y-2">
                    <label className="text-[10px] text-white/50 uppercase">Teléfono</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="999..."
                      className="w-full bg-white/5 border border-white/20 p-2.5 text-white text-xs outline-none focus:border-[#A67C3D] transition-colors"
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    />
                  </div>

                  <button 
                    disabled={loading}
                    className="col-span-2 bg-[#A67C3D] hover:bg-[#8e6a34] text-white text-xs uppercase tracking-[0.2em] py-3.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : "Reservar Ahora"}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-4 text-center"
              >
                <p className="text-[#A67C3D] text-2xl font-light italic">
                  Gracias, nos contactaremos contigo
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Indicadores Slides */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`h-[2px] w-12 transition-all duration-500 ${i === index ? "bg-white" : "bg-white/40"}`} />
        ))}
      </div>
    </section>
  );
}