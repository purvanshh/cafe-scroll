import type { Metadata } from "next";
import { Alfa_Slab_One, Archivo, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

const alfaSlabOne = Alfa_Slab_One({
  variable: "--font-alfa-slab-one",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "700", // Bold for headings/buttons
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400"], // Regular for body
  display: "swap",
});

export const metadata: Metadata = {
  title: "Artisan Coffee | Brewed to Perfection",
  description: "Experience premium artisan coffee in a calm, minimal setting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${alfaSlabOne.variable} ${archivo.variable} ${sourceSans.variable} antialiased bg-bg-light text-text-dark`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
