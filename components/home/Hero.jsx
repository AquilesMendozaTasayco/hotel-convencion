"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const slides = useMemo(
    () => [
      { src: "/hero/1.jpeg", alt: "Hotel Convención - Slide 1" },
      { src: "/hero/2.jpeg", alt: "Hotel Convención - Slide 2" },
      { src: "/hero/3.jpeg", alt: "Hotel Convención - Slide 3" },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(id);
  }, [slides.length]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover scale-105 transition-transform duration-[7000ms]"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Overlay elegante */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Flecha izquierda */}
      <button
        onClick={prevSlide}
        aria-label="Anterior"
        className="absolute left-6 top-1/2 -translate-y-1/2 
        w-12 h-12 flex items-center justify-center 
        border border-white/60 text-white 
        bg-white/10 backdrop-blur-sm 
        hover:bg-white hover:text-black 
        transition-all duration-300"
      >
        ‹
      </button>

      {/* Flecha derecha */}
      <button
        onClick={nextSlide}
        aria-label="Siguiente"
        className="absolute right-6 top-1/2 -translate-y-1/2 
        w-12 h-12 flex items-center justify-center 
        border border-white/60 text-white 
        bg-white/10 backdrop-blur-sm 
        hover:bg-white hover:text-black 
        transition-all duration-300"
      >
        ›
      </button>

      {/* Indicadores minimalistas */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-[2px] w-12 transition-all duration-500 ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
