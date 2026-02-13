import Image from "next/image";
import { Playfair_Display, Great_Vibes } from "next/font/google";
import { Target, Eye, ShieldCheck } from "lucide-react"; // 🏛️ Iconos elegantes

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const GOLD = "#A67C3D";

export default function MisionVisionValores() {
  const items = [
    {
      title: "Misión",
      icon: <Target size={32} strokeWidth={1.2} />,
      content: "Brindar una experiencia de hospedaje cómoda y eficiente, ofreciendo un servicio personalizado y cordial que garantice la satisfacción de nuestros huéspedes en cada estadía.",
    },
    {
      title: "Visión",
      icon: <Eye size={32} strokeWidth={1.2} />,
      content: "Consolidarnos como un hotel ejecutivo referente en Trujillo, reconocido por la excelencia en el servicio, la comodidad de nuestras instalaciones y la confianza de nuestros clientes.",
    },
    {
      title: "Valores",
      icon: <ShieldCheck size={32} strokeWidth={1.2} />,
      content: "Compromiso, responsabilidad, hospitalidad, respeto y excelencia en cada detalle del servicio que brindamos a quienes nos visitan.",
    },
  ];

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden bg-neutral-900">
      {/* 🖼️ Fondo con Parallax sutil */}
      <div className="absolute inset-0">
        <Image
          src="/12.jpeg"
          alt="Hotel Convención Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Overlay degradado para mejor lectura */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      </div>

      {/* ✨ Glow Dorado central */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 blur-[120px] rounded-full"
        style={{ background: GOLD }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* 🖋️ Cabecera */}
        <div className="text-center mb-20">
          <span
            className={`${vibes.className} text-4xl md:text-5xl block mb-2`}
            style={{ color: GOLD }}
          >
            Nuestra Filosofía
          </span>
          <h2
            className={`${playfair.className} text-white text-4xl md:text-6xl font-medium tracking-tight`}
          >
            Compromiso <span className="italic font-light">&</span> Excelencia
          </h2>
          <div className="w-24 h-[1px] bg-[#A67C3D] mx-auto mt-8 opacity-50" />
        </div>

        {/* 🗂️ Cards con Glassmorphism refinado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative p-10 rounded-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Fondo de la card con borde degradado */}
              <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-[#A67C3D]/40 transition-colors" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icono con círculo sutil */}
                <div 
                  className="mb-6 p-4 rounded-full border border-white/10 text-white/90 group-hover:scale-110 transition-transform duration-500"
                  style={{ color: GOLD }}
                >
                  {item.icon}
                </div>

                <h3
                  className={`${playfair.className} text-2xl mb-5 tracking-wide text-white`}
                >
                  {item.title}
                </h3>
                
                <p className="text-neutral-300 leading-relaxed font-light text-base md:text-[15px]">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}