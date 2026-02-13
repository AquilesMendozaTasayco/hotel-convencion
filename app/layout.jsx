import { Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Hotel Convención",
  description: "Hotel Convención - Trujillo, Perú",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} antialiased`}>
        <Navbar />
        <main className="min-h-[calc(100vh-1px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
