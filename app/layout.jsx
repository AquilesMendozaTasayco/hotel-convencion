"use client";

import { Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const esAdmin = pathname.startsWith("/admin");
  return (
    <html lang="es">
      <body className={`${playfair.variable} antialiased`}>
        {!esAdmin && <Navbar />}
        <main className="min-h-[calc(100vh-1px)]">{children}</main>
       {!esAdmin && <Footer />}
      </body>
    </html>
  );
}
