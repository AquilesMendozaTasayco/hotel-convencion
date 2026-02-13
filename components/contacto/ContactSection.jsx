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
    <section id="contacto" className="bg-neutral-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* 🏛️ INFO DE CONTACTO */}
          <div className="space-y-10">
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
              <div className="flex items-start gap-5 group">
                <div className="p-3 rounded-full bg-white shadow-sm text-[#A67C3D] group-hover:bg-[#A67C3D] group-hover:text-white transition-colors duration-300">
                  <MapPin size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className={`${playfair.className} text-lg text-neutral-900`}>Nuestra Dirección</h4>
                  <p className="text-neutral-500 text-sm mt-1">Calle las Orquídeas Mz. F Lt. 10 Urb. Las Flores - Víctor Larco Herrera, Trujillo</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="p-3 rounded-full bg-white shadow-sm text-[#A67C3D] group-hover:bg-[#A67C3D] group-hover:text-white transition-colors duration-300">
                  <Phone size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className={`${playfair.className} text-lg text-neutral-900`}>Teléfonos</h4>
                  <p className="text-neutral-500 text-sm mt-1">(044) 286691 • 942710631</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="p-3 rounded-full bg-white shadow-sm text-[#A67C3D] group-hover:bg-[#A67C3D] group-hover:text-white transition-colors duration-300">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className={`${playfair.className} text-lg text-neutral-900`}>Correo Electrónico</h4>
                  <p className="text-neutral-500 text-sm mt-1">reservas@convenciontrujillo.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="p-3 rounded-full bg-white shadow-sm text-[#A67C3D] group-hover:bg-[#A67C3D] group-hover:text-white transition-colors duration-300">
                  <Clock size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className={`${playfair.className} text-lg text-neutral-900`}>Horario</h4>
                  <p className="text-neutral-500 text-sm mt-1">Abierto las 24 horas (Lunes a Domingo)</p>
                </div>
              </div>
            </div>
          </div>

          {/* ✉️ FORMULARIO EJECUTIVO */}
          <div className="bg-white p-10 lg:p-12 shadow-2xl shadow-black/[0.03] rounded-2xl border border-neutral-100">
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

              <button
                type="submit"
                className="w-full group relative flex items-center justify-center gap-3 bg-neutral-900 text-white py-4 rounded-lg overflow-hidden transition-all hover:bg-[#A67C3D] active:scale-[0.98]"
              >
                <span className="text-xs uppercase tracking-[0.3em] font-medium relative z-10">Enviar Mensaje</span>
                <Send size={14} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* 🗺️ MAPA CON MARCO ELEGANTE */}
        <div className="mt-24">
          <div className="bg-white p-1 rounded-2xl shadow-xl border border-neutral-100 overflow-hidden">
             <div className="h-[450px] w-full rounded-xl overflow-hidden grayscale-[0.3] hover:grayscale-0 transition-all duration-700">
                <iframe
                  title="Mapa Hotel Convención"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.8824151761!2d-79.0345!3d-8.1256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMDcnMzIuMiJTIDc5wrAwMicwNC4yIlc!5e0!3m2!1ses!2spe!4v1700000000000" // Reemplazar por tu link real de embed
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}