"use client";

/* Site-wide scroll & pointer animations (GSAP + ScrollTrigger + SplitText).
   Pages stay Server Components and opt in with attributes / classes:
   - every <h2> in <main> and .page-hero h1  → lines rise out of a mask
   - [data-scrub]                            → words light up as you scroll
   - [data-theme="amber" | "light"]          → page colour switches while the section is centred
   - [data-scroll-x="1" | "-1"]              → big text rows slide with scroll
   - [data-depth="0.4"]                      → follows the mouse with parallax
   - [data-stack] > .stack-card              → cards stack and shrink
   - media (.wi-card .media, .hz-media, …)   → clip-path wipe + zoom-out on enter
   - .btn, .round-btn, .menu-btn, .wa-float  → magnetic hover
   - .footer-ticker .track                   → skews with scroll velocity */
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { INTRO_DONE_EVENT } from "../LogoIntro";

gsap.registerPlugin(ScrollTrigger, SplitText);

const MEDIA = ".wi-card .media, .team-card .ph, .about-visual, .stack-media, [data-reveal-media]";

export default function Motion() {
  const pathname = usePathname();

  // If the logo intro is playing, wait for it so reveals happen when they can be seen.
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    const start = () => { cleanup = build(); };
    if (document.documentElement.classList.contains("intro-running")) {
      window.addEventListener(INTRO_DONE_EVENT, start, { once: true });
    } else {
      start();
    }
    return () => { window.removeEventListener(INTRO_DONE_EVENT, start); cleanup?.(); };
  }, [pathname]);

  return null;
}

function build(): () => void {
  {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const body = document.body;
    const splits: SplitText[] = [];
    const shades: HTMLElement[] = [];
    let cancelled = false;

    // ---- page colour themes (works even with reduced motion) ----
    const themed = Array.from(document.querySelectorAll<HTMLElement>("main [data-theme]"));
    const setTheme = () => {
      const mid = window.innerHeight * 0.5;
      let theme = "dark";
      for (const s of themed) {
        const r = s.getBoundingClientRect();
        if (r.top < mid && r.bottom > mid) theme = s.dataset.theme || "dark";
      }
      if (body.dataset.theme !== theme) body.dataset.theme = theme;
    };
    const themeST = themed.length ? ScrollTrigger.create({ start: 0, end: "max", onUpdate: setTheme, onRefresh: setTheme }) : null;
    setTheme();

    if (reduce) {
      return () => { themeST?.kill(); delete body.dataset.theme; };
    }

    const ctx = gsap.context(() => {
     try {
      // ---- headline line reveals ----
      document.querySelectorAll<HTMLElement>("main h2:not([data-nosplit]), .page-hero h1").forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines", mask: "lines", linesClass: "split-line", autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, {
            yPercent: 115, rotate: 2, duration: 1.15, ease: "expo.out", stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }),
        });
        splits.push(split);
      });

      // ---- word-by-word scrub ----
      document.querySelectorAll<HTMLElement>("[data-scrub]").forEach((el) => {
        const split = SplitText.create(el, { type: "words", wordsClass: "scrub-word" });
        splits.push(split);
        gsap.fromTo(split.words, { opacity: 0.14 }, {
          opacity: 1, ease: "none", stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        });
      });

      // ---- media wipe-in ----
      gsap.utils.toArray<HTMLElement>(MEDIA).forEach((el) => {
        const inner = el.firstElementChild as HTMLElement | null;
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        tl.from(el, { clipPath: "inset(100% 0% 0% 0%)", duration: 1.3, ease: "expo.out" });
        if (inner) tl.from(inner, { scale: 1.3, duration: 1.6, ease: "expo.out" }, 0);
      });

      // ---- big rows sliding with scroll ----
      gsap.utils.toArray<HTMLElement>("[data-scroll-x]").forEach((el) => {
        const dir = Number(el.dataset.scrollX) || 1;
        gsap.fromTo(el, { xPercent: dir > 0 ? -18 : 0 }, {
          xPercent: dir > 0 ? 0 : -18, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });

      // ---- stacking cards ----
      // GPU-only: the covered card scales back (transform) and a black overlay fades in
      // (opacity). No filters/box-shadow changes, so nothing repaints while scrolling.
      document.querySelectorAll<HTMLElement>("[data-stack]").forEach((stack) => {
        const cards = Array.from(stack.querySelectorAll<HTMLElement>(".stack-card"));
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          let shade = card.querySelector<HTMLElement>(":scope > .stack-shade");
          if (!shade) { shade = document.createElement("span"); shade.className = "stack-shade"; card.appendChild(shade); shades.push(shade); }
          const nextTop = parseFloat(getComputedStyle(next).top) || 100;
          const tl = gsap.timeline({
            scrollTrigger: { trigger: next, start: "top 92%", end: `top ${nextTop}px`, scrub: 0.7 },
          });
          tl.to(card, { scale: 0.92 + i * 0.015, ease: "none" }, 0)
            .to(shade, { opacity: 0.28, ease: "none" }, 0);
        });
      });

      // ---- list rows rising one by one as each enters ----
      document.querySelectorAll<HTMLElement>("[data-rows]").forEach((list) => {
        Array.from(list.children).forEach((row) => {
          gsap.from(row, {
            yPercent: 60, opacity: 0, duration: 1.1, ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 94%", once: true },
          });
        });
      });

      // ---- generic fade-up for elements marked [data-fade] ----
      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.from(el.children, {
          y: 60, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // ---- footer ticker skews with scroll speed ----
      const tickers = gsap.utils.toArray<HTMLElement>(".footer-ticker .track, .big-rows .row-inner");
      if (tickers.length) {
        const skewTo = gsap.quickTo(tickers, "skewX", { duration: 0.5, ease: "power3" });
        ScrollTrigger.create({
          start: 0, end: "max",
          onUpdate: (self) => skewTo(gsap.utils.clamp(-12, 12, self.getVelocity() / -260)),
        });
      }
     } catch (err) {
      // one bad trigger must never take the whole page down
      console.warn("[Motion] scroll animations skipped:", err);
     }
    });

    // ---- pointer effects (desktop) ----
    const offs: (() => void)[] = [];
    if (fine) {
      // magnetic buttons
      document.querySelectorAll<HTMLElement>(".btn, .round-btn, .menu-btn, .wa-float, .toggle").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.36);
        };
        const leave = () => { xTo(0); yTo(0); };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        offs.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); gsap.killTweensOf(el); gsap.set(el, { x: 0, y: 0 }); });
      });
      // mouse parallax layers
      const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-depth]")).map((el) => ({
        el, d: Number(el.dataset.depth) || 0.2,
        x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" }),
      }));
      if (layers.length) {
        const move = (e: PointerEvent) => {
          const px = e.clientX / window.innerWidth - 0.5, py = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => { l.x(px * l.d * 80); l.y(py * l.d * 60); });
        };
        window.addEventListener("pointermove", move, { passive: true });
        offs.push(() => { window.removeEventListener("pointermove", move); layers.forEach((l) => gsap.killTweensOf(l.el)); });
      }
    }

    // layout settles after fonts + pinned sections → recompute positions
    document.fonts?.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      cancelled = true;
      clearTimeout(t);
      offs.forEach((f) => f());
      splits.forEach((s) => s.revert());
      ctx.revert();
      shades.forEach((s) => s.remove());
      themeST?.kill();
      delete body.dataset.theme;
    };
  }
}
