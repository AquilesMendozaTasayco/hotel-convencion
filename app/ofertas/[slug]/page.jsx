import PageHero from "@/components/shared/PageHero";
import OfertaDetalle from "@/components/ofertas/OfertaDetalle";
import { ofertas } from "@/data/ofertas";

export default async function OfertaPage({ params }) {
  const { slug } = await params;
  const oferta = ofertas.find((o) => o.slug === slug);

  if (!oferta) {
    return (
      <>
        <PageHero title="Oferta" description="Oferta no encontrada." image="/12.jpeg" />
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-black/70">No existe esta oferta.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero title={oferta.titulo} description="Promociones exclusivas para tu estadía." image={oferta.imagen} />
      <OfertaDetalle oferta={oferta} />
    </>
  );
}

export function generateStaticParams() {
  return ofertas.map((o) => ({ slug: o.slug }));
}
