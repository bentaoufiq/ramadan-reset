import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "@/components/layout/bottom-nav";

export const metadata: Metadata = {
  title: "Ramadan Reset - Programme 40+",
  description: "Programme de recomposition corporelle et optimisation hormonale pendant le Ramadan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#0a0e0a" />
      </head>
      <body>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}

