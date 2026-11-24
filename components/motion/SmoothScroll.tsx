"use client";

/* Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
   Pauses automatically whenever the page is scroll-locked (intro, menu, dialogs). */
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global { interface Window { __lenis?: Lenis } }

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const root = document.documentElement;
    const raf = (time: number) => {
      const locked = root.style.overflow === "hidden";
      if (locked && !lenis.isStopped) lenis.stop();
      else if (!locked && lenis.isStopped) lenis.start();
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // new page: jump to top (or to the #hash target)
  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    const hash = window.location.hash;
    if (hash) {
      const t = setTimeout(() => {
        let el: Element | null = null;
        try { el = document.querySelector(hash); } catch { /* invalid selector like #1st */ }
        if (el) lenis.scrollTo(el as HTMLElement, { offset: -90, immediate: true });
      }, 80);
      return () => clearTimeout(t);
    }
    lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
