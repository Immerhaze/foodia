// app/layout.tsx
import { inter } from "@/app/ui/font";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
      <body className={`${inter.className} antialiased bg-dashboard_light`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
