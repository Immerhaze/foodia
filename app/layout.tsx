import { inter } from "@/app/ui/font";
import type { Metadata } from "next";
import "@/app/globals.css";

// Metadata for the page
export const metadata: Metadata = {
  title: "FOODIA",
  description: "Recetas generadas con IA, powered by Vercel's IA-sdk",
};

// RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
