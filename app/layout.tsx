import Image from "next/image";

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
        <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-center bg-transparent py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/ahmed.jpg"
              alt="Ahmed Messaad"
              width={36}
              height={36}
              className="rounded-full object-cover shadow-md"
              priority
            />
            <div className="font-mono text-base lg:text-xl font-bold tracking-tight">
              AHMED <span className="italic font-serif font-light">MESSAAD</span>
            </div>
          </div>
        </nav>

        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
