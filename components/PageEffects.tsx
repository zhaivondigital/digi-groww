"use client";

/* Wires up scroll reveals, count-up stats and 3D tilt cards on every route.
   Pages stay Server Components and just use the class names:
   .reveal / .reveal-stagger, [data-count], .tilt (optional data-tilt="6"). */
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    // Reveal on scroll
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal:not(.in), .reveal-stagger:not(.in)").forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    // Count-up numbers
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement;
        const end = Number(el.dataset.count), t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / 1600);
          el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));
    cleanups.push(() => cio.disconnect());

    // 3D tilt with cursor glare
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    document.querySelectorAll<HTMLElement>(".tilt").forEach((card) => {
      if (!card.querySelector(":scope > .glare")) card.insertAdjacentHTML("beforeend", '<span class="glare"></span>');
      const max = Number(card.dataset.tilt) || 10;
      const move = (x: number, y: number) => {
        const r = card.getBoundingClientRect();
        const px = (x - r.left) / r.width, py = (y - r.top) / r.height;
        card.style.transform = `perspective(900px) rotateY(${(px - 0.5) * max * 2}deg) rotateX(${(0.5 - py) * max * 2}deg)`;
        card.style.setProperty("--gx", `${px * 100}%`);
        card.style.setProperty("--gy", `${py * 100}%`);
      };
      const onPointer = (e: PointerEvent) => move(e.clientX, e.clientY);
      const onTouch = (e: TouchEvent) => move(e.touches[0].clientX, e.touches[0].clientY);
      const reset = () => { card.style.transform = ""; };
      if (fine) {
        card.addEventListener("pointermove", onPointer);
        card.addEventListener("pointerleave", reset);
      } else {
        card.addEventListener("touchmove", onTouch, { passive: true });
        card.addEventListener("touchend", reset);
      }
      cleanups.push(() => {
        card.removeEventListener("pointermove", onPointer);
        card.removeEventListener("pointerleave", reset);
        card.removeEventListener("touchmove", onTouch);
        card.removeEventListener("touchend", reset);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, [pathname]);

  return null;
}
