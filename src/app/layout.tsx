import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Magang Sim",
  description: "Simulasi magang interaktif",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} h-full antialiased`}
    >
      <body className={`${pressStart.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
