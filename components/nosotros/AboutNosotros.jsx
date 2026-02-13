import Image from "next/image";
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

export default function AboutNosotros() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Texto izquierda */}
          <div className="text-center lg:text-left">
            <p className={`${vibes.className} text-2xl sm:text-3xl text-black tracking-wide`}>
              Bienvenidos a
            </p>

            <h2 className={`${vibes.className} mt-2 text-3xl sm:text-5xl font-medium text-black tracking-[0.06em]`}>
              Hotel Convención
            </h2>

            <p
              className={`${vibes.className} mt-4 text-3xl sm:text-4xl`}
              style={{ color: GOLD }}
            >
              Confort ejecutivo en Trujillo
            </p>

            <div className="mt-6 text-sm sm:text-base leading-7 text-black/70 max-w-xl mx-auto lg:mx-0 space-y-4">
              <p>
                En Hotel Convención cuidamos cada detalle para que tu estadía sea cómoda,
                tranquila y eficiente, tanto si viajas por negocios como si visitas Trujillo por turismo.
                Nuestra atención se basa en un servicio cordial, personalizado y siempre disponible.
              </p>
              <p>
                Contamos con espacios pensados para el viajero moderno: habitaciones confortables,
                conectividad, áreas de descanso y servicios que te acompañan durante todo el día.
                Nuestra ubicación estratégica te permite acceder con facilidad a puntos clave de la ciudad.
              </p>
              <p>
                Aquí encontrarás un ambiente ideal para descansar, trabajar y disfrutar, con el respaldo de
                un equipo comprometido en brindarte una experiencia satisfactoria.
              </p>
            </div>

            {/* Línea decorativa elegante */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <span className="h-[2px] w-24" style={{ backgroundColor: GOLD }} />
            </div>
          </div>

          {/* Imagen derecha */}
          <div className="relative w-full h-[420px] sm:h-[520px] flex items-center justify-center">
            <div className="relative w-[92%] h-full rotate-[2deg] transition-transform duration-700 hover:rotate-0">
              {/* Líneas decorativas arriba izquierda */}
              <div
                className="absolute -top-6 -left-6 w-24 h-24"
                style={{
                  borderTop: `3px solid ${GOLD}`,
                  borderLeft: `3px solid ${GOLD}`,
                }}
              />

              {/* Líneas decorativas abajo derecha */}
              <div
                className="absolute -bottom-6 -right-6 w-24 h-24"
                style={{
                  borderBottom: `3px solid ${GOLD}`,
                  borderRight: `3px solid ${GOLD}`,
                }}
              />

              {/* Imagen */}
              <div className="relative w-full h-full overflow-hidden shadow-2xl">
                <Image
                  src="/12.jpeg"
                  alt="Hotel Convención - Trujillo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
