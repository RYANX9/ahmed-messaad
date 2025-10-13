import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ahmed Messaad",
  description: "AI/ML Researcher specializing in Medical Imaging and Deep Learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex items-center gap-3 p-4">
          <Image
            src="/ahmed.jpg"
            alt="Ahmed Messaad"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <div className="font-mono text-sm lg:text-xl font-bold tracking-wider">
            AHMED <span className="italic">MESSAAD</span>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
