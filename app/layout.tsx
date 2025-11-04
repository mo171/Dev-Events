import type { Metadata } from "next";
import {  Schibsted_Grotesk,  Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from '@/components/LightRays';
import Navbar from '@/components/Navbar';

const schibstedGrotesk = Schibsted_Grotesk({
    variable: "--font-schibsted-grotesk",
    subsets: ["latin"]
})


const martian_Mono = Martian_Mono({
  variable: "--font-martian-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvents",
  description: "The Hub for Every Dev Event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${martian_Mono.variable} min-h-screen antialiased`}
      >

     <Navbar/>
      <div  className="absolute inset-0 top-0 z-[-1] min-h-screen">
          <LightRays
              raysOrigin="top-center"
              raysColor="#5dfeca"
              raysSpeed={0.5}
              lightSpread={0.9}
              rayLength={1.4}
              followMouse={true}
              mouseInfluence={0.07}
              noiseAmount={0.0}
              distortion={0.01}

          />
      </div>
        {children}
      </body>
    </html>
  );
}
