import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { terminalEnabled } from "@/lib/views";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ed bucaille — product designer",
  description:
    "Portfolio of Ed Bucaille — product designer with 7 years of experience.",
  openGraph: {
    title: "ed bucaille — product designer",
    description:
      "Portfolio of Ed Bucaille — product designer with 7 years of experience.",
    type: "website",
  },
};

// set view before first paint so there is no flash of the wrong palette
const viewScript = terminalEnabled
  ? `try{if(localStorage.getItem("view")==="terminal")document.documentElement.dataset.view="terminal"}catch(e){}`
  : "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {viewScript && <script dangerouslySetInnerHTML={{ __html: viewScript }} />}
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
}
