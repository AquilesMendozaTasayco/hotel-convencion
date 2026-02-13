import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Great_Vibes } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});

const GOLD = "#A67C3D";

const ofertas = [
  {
    id: 1,
    titulo: "Fiestas Patrias",
    descripcion:
      "Celebra Fiestas Patrias con una escapada inolvidable en Hotel Convención. Disfruta de una noche mágica con todo lo que necesitas para relajarte y celebrar con quien más quieres. Solo para Peruanos y Residentes.",
    imagen: "/ofertas/fiestas.jpg",
    verHref: "#",
    reservarHref: "#reservar",
  },
  {
    id: 2,
    titulo: "Relax Time",
    descripcion:
      "Disfruta de un día espectacular en pareja con una sesión de masajes incluida. Crea recuerdos memorables y momentos mágicos con este paquete de alojamiento. Solo para Peruanos y Residentes.",
    imagen: "/ofertas/relax.jpg",
    verHref: "#",
    reservarHref: "#reservar",
  },
  {
    id: 3,
    titulo: "Escape cultural",
    descripcion:
      "Descubre nuestro Paquete de Alojamiento Escape y regálate una experiencia cultural inolvidable. Solo para Peruanos y Residentes.",
    imagen: "/ofertas/cultural.jpg",
    verHref: "#",
    reservarHref: "#reservar",
  },
];

export default function Ofertas() {
  return (
    <section id="ofertas" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Título */}
        <h2
          className={`${vibes.className} text-center text-3xl sm:text-5xl tracking-[0.05em]`}
          style={{ color: GOLD }}
        >
          Nuestras Ofertas
        </h2>

        <p className="mt-4 text-center text-sm sm:text-base text-black/65 max-w-2xl mx-auto">
          Paquetes especiales diseñados para que disfrutes Trujillo con comodidad, estilo y experiencias memorables.
        </p>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {ofertas.map((o) => (
            <div
              key={o.id}
              className="bg-white border border-black/10 shadow-sm overflow-hidden hover:shadow-md transition duration-500"
            >
              {/* Imagen */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={o.imagen}
                  alt={o.titulo}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>

              {/* Texto */}
              <div className="p-6">
                <h3 className={`${playfair.className} text-lg text-black`}>
                  {o.titulo}
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/65">
                  {o.descripcion}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href={o.verHref}
                    className="text-xs uppercase tracking-[0.22em] text-black/70 hover:text-[#A67C3D] transition"
                  >
                    Ver ofertas →
                  </Link>
                </div>

                <a
                  href={o.reservarHref}
                  className="mt-6 block text-center w-full py-3 text-xs uppercase tracking-[0.28em] transition-all duration-500
                             border border-black text-black hover:bg-[#A67C3D] hover:border-[#A67C3D] hover:text-white"
                >
                  Reservar
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
