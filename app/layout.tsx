import type { Metadata } from "next";
import { Schibsted_Grotesk,Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "@/components/LightRays";
import Navebar from "@/components/Navebar";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "Dev Events | Find Developer Events Worldwide",
        template: "%s | Dev Events"
    },
    description: "Discover hackathons, meetups, and tech conferences around the world. The hub for every developer event you can't miss!",
    keywords: ["developer events", "hackathons", "tech conferences", "meetups", "Dev Events"],
    authors: [{ name: "Dev Events Team", url: "https://dev-events-nine.vercel.app" }],
    openGraph: {
        title: "Dev Events | Discover Global Developer Events",
        description: "All the best hackathons, meetups, and conferences in one place.",
        url: "https://dev-events-nine.vercel.app",
        siteName: "Dev Events",
        images: [
            {
                url: "https://dev-events-nine.vercel.app/og-image.png",
                width: 1200,
                height: 630,
                alt: "Dev Events Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
    twitter: {
        card: "summary_large_image",
        title: "Dev Events",
        description: "Discover the best hackathons, meetups, and tech conferences.",
        images: ["https://dev-events-nine.vercel.app/og-image.png"],
    },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
        <head><meta name="google-site-verification" content="kynhGmIFTSihArrRzcNS_tNPffELT072HJ8u44Sacg0" /></head>
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased`}
      >
            <Navebar/>
            <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
                <LightRays
                    raysOrigin="top-center-offset"
                    raysColor="#5dfeca"
                    raysSpeed={0.5}
                    lightSpread={0.9}
                    rayLength={1.4}
                    followMouse={true}
                    mouseInfluence={0.02}
                    noiseAmount={0.0}
                    distortion={0.01}
                    className=""
                />
            </div>

    <main>
        {children}
    </main>

      </body>
    </html>
  );
}
