"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Swal from "sweetalert2";

const inputClass =
  "w-full bg-white/5 border border-white/20 p-2.5 text-white text-xs outline-none focus:border-[#A67C3D] transition-colors placeholder:text-white/30";
const selectWrap = "relative border border-white/20 bg-white/5";
const selectClass =
  "w-full bg-transparent text-white text-[10px] p-2.5 outline-none appearance-none cursor-pointer";

const initialFormState = {
  nombre: "", apellido: "", entrada: "", salida: "",
  habitacion: "", adultos: "1", niños: "0", email: "", telefono: "",
};

export default function ReservaBar() {
  const [habitacionesOpts, setHabitacionesOpts] = useState([
    "Habitación Matrimonial", "Habitación Doble", "Habitación Simple", "Habitación King",
  ]);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

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
          const names = snap.docs.map((d) => d.data().nombre);
          setHabitacionesOpts(names);
          setFormData((prev) => ({ ...prev, habitacion: names[0] }));
        } else {
          setFormData((prev) => ({ ...prev, habitacion: "Habitación Matrimonial" }));
        }
      } catch (err) {
        console.error("Error fetching habitaciones:", err);
      }
    };
    fetchHabs();
  }, []);

  const set = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          telefono: formData.telefono,
          habitacion: formData.habitacion,
          entrada: formData.entrada,
          salida: formData.salida,
          adultos: formData.adultos,
          ninos: formData.niños,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Error al enviar");

      setFormData({ ...initialFormState, habitacion: habitacionesOpts[0] });
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
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl bg-[#0F172A]/95 backdrop-blur-md border border-white/10 p-8 shadow-2xl">
      <p className="text-white text-xs uppercase tracking-[0.2em] mb-6 font-light">
        Hacer una Reserva
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* FILA 1 */}
        <div className="grid grid-cols-5 gap-3">
          <div className="space-y-2">
            <label className="text-[10px] text-white/50 uppercase tracking-wider">Nombre</label>
            <input type="text" required placeholder="Juan" className={inputClass} value={formData.nombre} onChange={set("nombre")} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-white/50 uppercase tracking-wider">Apellido</label>
            <input type="text" required placeholder="Pérez" className={inputClass} value={formData.apellido} onChange={set("apellido")} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-white/50 uppercase tracking-wider">Entrada</label>
            <div className="border border-white/20 p-2 flex items-center bg-white/5">
              <input type="date" className="bg-transparent text-white text-xs outline-none w-full [color-scheme:dark]" value={formData.entrada} onChange={set("entrada")} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-white/50 uppercase tracking-wider">Salida</label>
            <div className="border border-white/20 p-2 flex items-center bg-white/5">
              <input type="date" className="bg-transparent text-white text-xs outline-none w-full [color-scheme:dark]" value={formData.salida} onChange={set("salida")} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-white/50 uppercase tracking-wider">Habitación</label>
            <div className={selectWrap}>
              <select className={selectClass} value={formData.habitacion} onChange={set("habitacion")}>
                {habitacionesOpts.map((h) => (
                  <option key={h} className="bg-[#0F172A]">{h}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-3 text-white/40 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* FILA 2 */}
        <div className="grid grid-cols-5 gap-3 items-end">
          <div className="space-y-2">
            <label className="text-[10px] text-white/50 uppercase tracking-wider">Adultos</label>
            <div className={selectWrap}>
              <select className={selectClass} value={formData.adultos} onChange={set("adultos")}>
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} className="bg-[#0F172A]" value={n}>{n}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-3 text-white/40 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-white/50 uppercase tracking-wider">Niños</label>
            <div className={selectWrap}>
              <select className={selectClass} value={formData.niños} onChange={set("niños")}>
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n} className="bg-[#0F172A]" value={n}>{n}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-3 text-white/40 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-white/50 uppercase tracking-wider">Email</label>
            <input type="email" required placeholder="Tu correo" className={inputClass} value={formData.email} onChange={set("email")} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-white/50 uppercase tracking-wider">Teléfono</label>
            <input type="tel" required placeholder="999..." className={inputClass} value={formData.telefono} onChange={set("telefono")} />
          </div>
          <button
            disabled={loading}
            className="bg-[#A67C3D] hover:bg-[#8e6a34] text-white text-xs uppercase tracking-[0.2em] py-3.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : "Reservar"}
          </button>
        </div>
      </form>
    </div>
  );
}