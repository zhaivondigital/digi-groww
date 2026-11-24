"use client";

/* Pinned showreel: a small rounded frame grows to full screen as you scroll while
   "PLAY" and "REEL" slide apart. Click opens the reel. Uses SITE.showreel when set,
   otherwise an animated placeholder. */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

function ReelMedia({ playing = false }: { playing?: boolean }) {
  if (SITE.showreel) {
    return <video className="reel-video" src={SITE.showreel} autoPlay muted={!playing} loop playsInline controls={playing} />;
  }
  return (
    <div className="reel-ph" aria-hidden="true">
      <div className="reel-ph-glow" />
      <div className="reel-ph-bars"><i /><i /><i /><i /><i /></div>
      <span className="reel-ph-tag">Showreel · Placeholder</span>
      <span className="reel-ph-tc">REC ● 00:01:24:12</span>
      <span className="reel-ph-hint">Add /public/showreel.mp4 and set <code>showreel</code> in lib/site.ts</span>
    </div>
  );
}

export default function Showreel() {
  const sec = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  // layout effect: its cleanup runs BEFORE React removes the DOM, so GSAP can unwrap its pin-spacer first
  useLayoutEffect(() => {
    const el = sec.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = window.matchMedia("(max-width: 820px)").matches
      ? "inset(32% 8% 32% 8% round 18px)"
      : "inset(24% 30% 24% 30% round 22px)";
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "+=140%", pin: true, scrub: 0.8, anticipatePin: 1 },
      });
      tl.fromTo(".reel-frame", { clipPath: start }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut" }, 0)
        .fromTo(".reel-frame > *", { scale: 1.25 }, { scale: 1, ease: "power2.inOut" }, 0)
        .to(".reel-word.l", { xPercent: -60, opacity: 0.0, ease: "power2.in" }, 0)
        .to(".reel-word.r", { xPercent: 60, opacity: 0.0, ease: "power2.in" }, 0)
        .fromTo(".reel-play", { scale: 0.6 }, { scale: 1, ease: "power2.out" }, 0.2);
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.documentElement.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <section className="reel" ref={sec} aria-label="Showreel">
        <div className="reel-frame"><ReelMedia /></div>
        <div className="reel-words" aria-hidden="true">
          <span className="reel-word l">Play</span>
          <span className="reel-word r"><em>reel</em></span>
        </div>
        <button className="reel-play" onClick={() => setOpen(true)} data-cursor="Play" aria-label="Play showreel">
          <span>▶</span> Play reel
        </button>
      </section>

      <div className={`lightbox${open ? " open" : ""}`} onClick={(e) => e.target === e.currentTarget && setOpen(false)} inert={!open}>
        <button className="close-btn" onClick={() => setOpen(false)} aria-label="Close">×</button>
        <div className="lightbox-inner">{open && <ReelMedia playing />}</div>
      </div>
    </>
  );
}
