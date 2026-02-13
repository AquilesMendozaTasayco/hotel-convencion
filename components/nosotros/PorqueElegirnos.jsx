import { Playfair_Display, Great_Vibes } from "next/font/google";
import { MapPin, UserCheck, Coffee, Building2 } from "lucide-react"; // 🏛️ Iconos ejecutivos

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const GOLD = "#A67C3D";

const items = [
  {
    titulo: "Ubicación Estratégica",
    icon: <MapPin size={24} strokeWidth={1.5} />,
    texto: "Accede con facilidad a puntos clave de Trujillo. Ideal para viajes corporativos, turismo y estadías de trabajo.",
  },
  {
    titulo: "Servicio Personalizado",
    icon: <UserCheck size={24} strokeWidth={1.5} />,
    texto: "Atención cordial y dedicada. Nuestro equipo cuida cada detalle para una estadía tranquila y eficiente.",
  },
  {
    titulo: "Confort Ejecutivo",
    icon: <Coffee size={24} strokeWidth={1.5} />,
    texto: "Habitaciones equipadas para descansar y trabajar: comodidad, conectividad y un ambiente pensado para ti.",
  },
  {
    titulo: "Espacios Corporativos",
    icon: <Building2 size={24} strokeWidth={1.5} />,
    texto: "Ambientes ideales para reuniones y eventos: salón ejecutivo, sala de conferencias y soporte técnico.",
  },
];

export default function PorqueElegirnos() {
  return (
    <section className="bg-neutral-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* 🖋️ Título y Subtítulo */}
        <div className="text-center mb-16">
          <span
            className={`${vibes.className} text-4xl block mb-2`}
            style={{ color: GOLD }}
          >
            ¿Por qué elegirnos?
          </span>
          <h2
            className={`${playfair.className} text-3xl md:text-5xl text-neutral-900 tracking-tight`}
          >
            Excelencia en cada <span className="italic">detalle</span>
          </h2>
          <p className="mt-6 text-neutral-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Una experiencia diseñada para viajeros exigentes que buscan comodidad, 
            atención personalizada y una ubicación privilegiada en Trujillo.
          </p>
        </div>

        {/* 🗂️ Cards Mejoradas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((it) => (
            <div
              key={it.titulo}
              className="group relative bg-white p-8 rounded-xl border border-neutral-200 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1 overflow-hidden"
            >
              {/* ✨ Línea decorativa animada que crece al hacer hover */}
              <div 
                className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700"
                style={{ backgroundColor: GOLD }}
              />

              {/* 🛡️ Icono con acento dorado */}
              <div 
                className="mb-6 flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-50 group-hover:bg-[#A67C3D]/10 transition-colors"
                style={{ color: GOLD }}
              >
                {it.icon}
              </div>

              <h3 className={`${playfair.className} text-xl text-neutral-900 font-medium`}>
                {it.titulo}
              </h3>

              <div 
                className="my-4 h-[1px] w-8 transition-all duration-500 group-hover:w-16" 
                style={{ backgroundColor: GOLD, opacity: 0.4 }}
              />

              <p className="text-sm leading-7 text-neutral-600 font-light">
                {it.texto}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}