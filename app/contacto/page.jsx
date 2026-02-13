import PageHero from "@/components/shared/PageHero";
import ContactSection from "@/components/contacto/ContactSection";

export default function ContactoPage() {
  return (
    <>
      <PageHero
        title="Contacto"
        description="Estamos listos para ayudarte. Escríbenos y nos comunicaremos contigo."
        image="/12.jpeg"
      />

      <ContactSection />
    </>
  );
}
