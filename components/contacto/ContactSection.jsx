"use client";

import { motion } from "framer-motion"; // 📦 Importar framer-motion
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare, Smartphone } from "lucide-react";

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const GOLD = "#A67C3D";

export default function ContactSection() {
  return (
    <section id="contacto" className="bg-neutral-50 py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* 🏛️ INFO DE CONTACTO - Entrada desde la izquierda */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <span className={`${vibes.className} text-4xl block mb-2`} style={{ color: GOLD }}>
                Contacto
              </span>
              <h2 className={`${playfair.className} text-4xl md:text-5xl text-neutral-900 tracking-tight`}>
                Estamos a su <span className="italic font-light">servicio</span>
              </h2>
              <p className="mt-6 text-neutral-500 leading-relaxed max-w-md">
                Ponte en contacto con nosotros para consultas, reservas o información adicional. 
                Será un honor recibirte en Trujillo.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { Icon: MapPin, title: "Nuestra Dirección", content: "Calle las Orquídeas Mz. F Lt. 10 Urb. Las Flores - Víctor Larco Herrera, Trujillo" },
                { Icon: Phone, title: "Teléfonos", content: "(044) 286691 • 942710631" },
                { Icon: Mail, title: "Correo Electrónico", content: "reservas@convenciontrujillo.com" },
                { Icon: Clock, title: "Horario", content: "Abierto las 24 horas (Lunes a Domingo)" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="p-3 rounded-full bg-white shadow-sm text-[#A67C3D] group-hover:bg-[#A67C3D] group-hover:text-white transition-colors duration-300">
                    <item.Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className={`${playfair.className} text-lg text-neutral-900`}>{item.title}</h4>
                    <p className="text-neutral-500 text-sm mt-1">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ✉️ FORMULARIO EJECUTIVO - Entrada desde la derecha */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-10 lg:p-12 shadow-2xl shadow-black/[0.03] rounded-2xl border border-neutral-100"
          >
            <h3 className={`${playfair.className} text-2xl text-neutral-900 mb-8`}>
              Envíanos tu consulta
            </h3>

            <form className="space-y-6">
              <div className="relative">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2 block font-semibold">Nombres Completos</label>
                <div className="relative group">
                  <User className="absolute left-0 top-3 text-neutral-300 group-focus-within:text-[#A67C3D] transition-colors" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-transparent border-b border-neutral-200 py-3 pl-8 outline-none focus:border-[#A67C3D] transition-all placeholder:text-neutral-300 text-neutral-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2 block font-semibold">Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-0 top-3 text-neutral-300 group-focus-within:text-[#A67C3D] transition-colors" size={18} />
                    <input
                      type="email"
                      required
                      placeholder="correo@ejemplo.com"
                      className="w-full bg-transparent border-b border-neutral-200 py-3 pl-8 outline-none focus:border-[#A67C3D] transition-all placeholder:text-neutral-300 text-neutral-700"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2 block font-semibold">Celular</label>
                  <div className="relative group">
                    <Smartphone className="absolute left-0 top-3 text-neutral-300 group-focus-within:text-[#A67C3D] transition-colors" size={18} />
                    <input
                      type="tel"
                      required
                      placeholder="999 999 999"
                      className="w-full bg-transparent border-b border-neutral-200 py-3 pl-8 outline-none focus:border-[#A67C3D] transition-all placeholder:text-neutral-300 text-neutral-700"
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2 block font-semibold">Tu Consulta</label>
                <div className="relative group">
                  <MessageSquare className="absolute left-0 top-3 text-neutral-300 group-focus-within:text-[#A67C3D] transition-colors" size={18} />
                  <textarea
                    rows={3}
                    required
                    placeholder="¿En qué podemos ayudarte?"
                    className="w-full bg-transparent border-b border-neutral-200 py-3 pl-8 outline-none focus:border-[#A67C3D] transition-all placeholder:text-neutral-300 text-neutral-700 resize-none"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full group relative flex items-center justify-center gap-3 bg-neutral-900 text-white py-4 rounded-lg overflow-hidden transition-all hover:bg-[#A67C3D]"
              >
                <span className="text-xs uppercase tracking-[0.3em] font-medium relative z-10">Enviar Mensaje</span>
                <Send size={14} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* 🗺️ MAPA CON REVELADO - Fade up sutil */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-24"
        >
          <div className="bg-white p-1 rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
             <div className="h-[450px] w-full rounded-xl overflow-hidden grayscale-[0.3] hover:grayscale-0 transition-all duration-700">
                <iframe
                  title="Mapa Hotel Convención"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d284!2d-79.0445553!3d-8.1290284!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d12f68a8c57%3A0x24016094264218f6!2sHotel%20Convencion!5e0!3m2!1ses!2spe!4v1645000000000!5m2!1ses!2spe"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
