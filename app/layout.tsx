import type { Metadata, Viewport } from "next";
import { Archivo, Bodoni_Moda, Outfit } from "next/font/google";
import "./globals.css";
import "./v2.css";
import "./motion.css";
import "./pages.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Motion from "@/components/motion/Motion";
import Header from "@/components/Header";
import Footer, { WhatsAppFloat } from "@/components/Footer";
import Scene3D from "@/components/Scene3D";
import BookingModal from "@/components/BookingModal";
import PageEffects from "@/components/PageEffects";
import LogoIntro from "@/components/LogoIntro";
import Cursor from "@/components/Cursor";
import PageTransition from "@/components/PageTransition";

// Runs before first paint. Already played this session → hide the intro.
// Otherwise hide the header/page so the intro plays alone in the hero
// (with a failsafe so the page can never stay hidden).
const introGate = `(function(){var r=document.documentElement;try{if(sessionStorage.getItem("bcdg-intro")&&!/[?&]intro(T)?=/.test(location.search)){r.dataset.intro="seen";return}}catch(e){}r.classList.add("intro-running");setTimeout(function(){r.classList.remove("intro-running")},9000)})()`;
import { SITE } from "@/lib/site";

const bodoni = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-bodoni", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Personal Branding & Creator Growth Agency`, template: `%s | ${SITE.name}` },
  description: "Bridge Code Digi Grow builds personal brands, manages social media and produces creative content for influencers, brands and corporates. Create. Connect. Grow.",
  icons: { icon: "/logo.jpg", apple: "/logo.jpg" },
  openGraph: {
    title: SITE.name,
    description: "Personal branding, social media management, creative production and collaborations. Create. Connect. Grow.",
    images: ["/logo.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${outfit.variable} ${archivo.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGate }} />
      </head>
      <body>
        <LogoIntro />
        <div className="bg-fallback" aria-hidden="true" />
        <Scene3D />
        <div className="grain" aria-hidden="true" />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <BookingModal />
        <PageEffects />
        <Cursor />
        <PageTransition />
        <SmoothScroll />
        <Motion />
      </body>
    </html>
  );
}
