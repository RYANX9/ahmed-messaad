import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmed Messaad",
  description:
    "AI/ML Researcher specializing in Medical Imaging and Deep Learning.",
  icons: {
    icon: "/ahmed-icon.png", // favicon file must be in /public
    shortcut: "/ahmed-icon.png",
    apple: "/ahmed-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Explicit favicon link for full browser compatibility */}
        <link rel="icon" href="/ahmed-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/ahmed-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
