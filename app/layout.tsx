import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import Plasma from "@/components/Plasma";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";


const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DCS Event Management",
  description: "Manage your events efficiently and effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*  min-h-screen ensures the body takes at least the full height of the viewport */}
    <body className={`${schibstedGrotesk?.variable ?? ""} ${martianMono?.variable ?? ""} min-h-screen antialiased`}>
        <Navbar/>

        <div className="fixed inset-0 top-0 z-[-1] min-h-screen">
            <Plasma
              color="#5dfeca"
              speed={0.6}
              direction="forward"
              scale={1.1}
              opacity={0.15}
              mouseInteractive={true}
            />
        </div>
        <main>
          {children}
        </main>

        <Footer/>
      
      </body>
    </html>
  );
}
