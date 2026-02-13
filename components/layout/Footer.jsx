"use client";

import Image from "next/image";
import Link from "next/link";

const GOLD = "#A67C3D";

export default function Footer() {
  return (
    <footer className="bg-black text-white">

      {/* CONTENIDO PRINCIPAL */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* ACERCA DE NOSOTROS */}
        <div>
          <h3
            className="uppercase tracking-[0.25em] text-sm mb-6"
            style={{ color: GOLD }}
          >
            Acerca de Nosotros
          </h3>

          <Image
            src="/logowhite.png"
            alt="Convencion Hotel"
            width={200}
            height={80}
            className="h-14 w-auto mb-6"
          />

          <p className="text-sm text-white/70 leading-7">
            Hacemos de tu estadía de negocio o turismo una experiencia satisfactoria 
            la cual está garantizada por la estratégica ubicación, excelente servicio 
            personalizado, trato cordial y la variedad de comodidades que el servicio 
            ejecutivo de Convención Hotel le ofrece.
          </p>
        </div>

        {/* SECCIONES */}
        <div>
          <h3
            className="uppercase tracking-[0.25em] text-sm mb-6"
            style={{ color: GOLD }}
          >
            Explorar
          </h3>

          <ul className="space-y-3 text-sm tracking-[0.15em] uppercase">
            {[
              "Habitaciones",
              "Ofertas",
              "Restaurante",
              "Eventos",
              "Galería",
              "Contacto",
            ].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-white/70 hover:text-[#A67C3D] transition duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* INFORMACIÓN DE CONTACTO */}
        <div>
          <h3
            className="uppercase tracking-[0.25em] text-sm mb-6"
            style={{ color: GOLD }}
          >
            Información de Contacto
          </h3>

          <ul className="space-y-4 text-sm text-white/70">

            <li className="flex gap-3">
              <PinIcon />
              <span>
                Calle las Orquídeas Mz. F Lt. 10 Urb. Las Flores - 
                Víctor Larco Herrera, Trujillo
              </span>
            </li>

            <li className="flex gap-3">
              <PhoneIcon />
              <span>(044) 286691 - 942710631</span>
            </li>

            <li className="flex gap-3">
              <MailIcon />
              <span>reservas@conventiontrujillo.com</span>
            </li>

            <li className="flex gap-3">
              <ClockIcon />
              <span>Lunes – Domingo 8:00 am - 8:00 pm</span>
            </li>

          </ul>

          {/* REDES SOCIALES */}
          <div className="flex gap-5 mt-8">
            <SocialIcon href="#" label="Facebook">
              <FacebookIcon />
            </SocialIcon>

            <SocialIcon href="#" label="Instagram">
              <InstagramIcon />
            </SocialIcon>

            <SocialIcon href="#" label="YouTube">
              <YouTubeIcon />
            </SocialIcon>

            <SocialIcon href="#" label="LinkedIn">
              <LinkedInIcon />
            </SocialIcon>
          </div>
        </div>
      </div>

      {/* LÍNEA INFERIOR */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50 tracking-[0.2em] uppercase">
        © {new Date().getFullYear()} Convención Hotel — Todos los derechos reservados
      </div>
    </footer>
  );
}

/* ---------- ICONOS ---------- */

function SocialIcon({ href, label, children }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="text-white/60 hover:text-[#A67C3D] transition duration-300"
    >
      {children}
    </Link>
  );
}

function IconBase({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function FacebookIcon() {
  return (
    <IconBase>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v3H8v3h3v6h3v-6h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </IconBase>
  );
}

function InstagramIcon() {
  return (
    <IconBase>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
    </IconBase>
  );
}

function YouTubeIcon() {
  return (
    <IconBase>
      <path d="M10 9.5l5 2.5-5 2.5V9.5z" />
      <path d="M21 12c0-3.5-.4-5-2.3-5.4C16.9 6.2 12 6.2 12 6.2s-4.9 0-6.7.4C3.4 7 3 8.5 3 12s.4 5 2.3 5.4c1.8.4 6.7.4 6.7.4s4.9 0 6.7-.4C20.6 17 21 15.5 21 12z" />
    </IconBase>
  );
}

function LinkedInIcon() {
  return (
    <IconBase>
      <path d="M6.5 9.5V19" />
      <path d="M6.5 6.5h.01" />
      <path d="M10 19v-5.2c0-1.7 1-2.8 2.5-2.8s2.5 1.1 2.5 2.8V19" />
      <path d="M15 12.2V19" />
    </IconBase>
  );
}

/* Contacto */
function PinIcon() {
  return (
    <IconBase>
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </IconBase>
  );
}
function PhoneIcon() {
  return (
    <IconBase>
      <path d="M22 16.8v2a2 2 0 0 1-2.2 2c-9.7-.9-17.5-8.7-18.4-18.4A2 2 0 0 1 3.4 1h2a2 2 0 0 1 2 1.7c.2 1.2.5 2.3.9 3.4a2 2 0 0 1-.5 2.1L6.7 9.3a16 16 0 0 0 8 8l1.1-1.1a2 2 0 0 1 2.1-.5c1.1.4 2.2.7 3.4.9A2 2 0 0 1 22 16.8z" />
    </IconBase>
  );
}
function MailIcon() {
  return (
    <IconBase>
      <path d="M4 6h16v12H4z" />
      <path d="M4 7l8 6 8-6" />
    </IconBase>
  );
}
function ClockIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </IconBase>
  );
}
