import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CrtOverlay } from "@/components/os/CrtOverlay";
import { TopBar } from "@/components/os/TopBar";
import { BottomBar } from "@/components/os/BottomBar";
import { BootGate } from "@/components/os/BootGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "rocapine/os — ed boucas",
  description:
    "Portfolio of Ed Boucas — design engineer. Built as a fictional operating system.",
  openGraph: {
    title: "rocapine/os — ed boucas",
    description:
      "Portfolio of Ed Boucas — design engineer. Built as a fictional operating system.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full crt-flicker">
        <BootGate>
          <TopBar />
          {children}
          <BottomBar />
        </BootGate>
        <CrtOverlay />
      </body>
    </html>
  );
}
