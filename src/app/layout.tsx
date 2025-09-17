import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LennyLogo } from "@/components/LennyLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Providers } from "@/components/providers";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lendly - Rent Cool Stuff in Tel Aviv",
  description: "Peer-to-peer gear rental platform. Rent cameras, DJ equipment, tools, and more in Tel Aviv.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <nav className="border-b bg-cream/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <LennyLogo size="md" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-coral to-teal bg-clip-text text-transparent">
                    Lendly
                  </span>
                </Link>
                
                <div className="flex items-center gap-4">
                  <Button variant="ghost" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/list-item">List Item</Link>
                  </Button>
                </div>
              </div>
            </div>
          </nav>
          
          <main className="min-h-screen">
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </main>
          
          <footer className="border-t bg-cream/30 py-8 mt-16">
            <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground">
              <p>© 2024 Lendly. Made with ❤️ in Tel Aviv.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
