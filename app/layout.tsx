import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import Plasma from "@/components/Plasma";
import Navbar from "@/components/Navbar";
import posthog from 'posthog-js'


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

// Initialize PostHog analytics
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  defaults: '2025-05-24'
});
  return (
    <html lang="en">
      {/*  min-h-screen ensures the body takes at least the full height of the viewport */}
      <body className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased`}>
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
      </body>
    </html>
  );
}
