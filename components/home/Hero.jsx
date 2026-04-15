"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ReservaBar from "@/components/home/ReservaBar";

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const q = query(
          collection(db, "banners"),
          where("active", "==", true),
          orderBy("order", "asc")
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({
          id: d.id,
          src: d.data().imageUrl,
          alt: `Hotel Convención - Banner ${d.data().order}`,
        }));
        setSlides(data);
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const yTranslate = useTransform(scrollY, [0, 200], [0, 50]);

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Slides */}
      <div className="absolute inset-0">
        {slides.length === 0 ? (
          <div className="absolute inset-0 bg-[#1a1410]" />
        ) : (
          slides.map((slide, i) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                className={`object-cover transition-transform duration-[7000ms] ${
                  i === index ? "scale-110" : "scale-100"
                }`}
                sizes="100vw"
              />
            </div>
          ))
        )}
      </div>

      <div className="absolute inset-0 bg-black/40" />

      {/* ReservaBar */}
      <motion.div
        style={{ opacity, y: yTranslate }}
        className="absolute bottom-12 left-0 w-full z-30 px-6 hidden lg:block"
      >
      </motion.div>

      {/* Indicadores */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
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
      )}
    </section>
  );
}