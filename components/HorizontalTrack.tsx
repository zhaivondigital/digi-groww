"use client";

/* Pinned horizontal track: vertical scroll drives the row sideways, media inside
   .hz-media drifts (parallax) and a progress bar fills. Native swipe row on phones.
   Used for featured work (home) and quotes (testimonials). */
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalTrack({
  index, label, title, link, children,
}: { index: string; label: string; title: React.ReactNode; link?: { href: string; text: string }; children: React.ReactNode }) {
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);

  // layout effect: cleanup must run before React removes the DOM (GSAP pin-spacer wraps the section)
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mm = gsap.matchMedia();
    const inner: ScrollTrigger[] = [];
    mm.add("(min-width: 821px)", () => {
      const el = sec.current!, tr = track.current!;
      const distance = () => Math.max(0, tr.scrollWidth - window.innerWidth);
      const tween = gsap.to(tr, {
        x: () => -distance(), ease: "none",
        scrollTrigger: {
          trigger: el, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.8,
          invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (self) => { if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`; },
        },
      });
      tr.querySelectorAll<HTMLElement>(".hz-media .ph").forEach((ph) => {
        const t = gsap.fromTo(ph, { xPercent: -8 }, {
          xPercent: 8, ease: "none",
          scrollTrigger: { trigger: ph.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
        if (t.scrollTrigger) inner.push(t.scrollTrigger);
      });
    });
    // kill children that depend on the pinned tween (containerAnimation) before the tween itself
    return () => { inner.forEach((st) => st.kill()); mm.revert(); };
  }, []);

  return (
    <section className="hz" ref={sec}>
      <div className="wrap hz-head">
        <div>
          <span className="label"><b>{index}</b> {label}</span>
          <h2>{title}</h2>
        </div>
        {link && <Link className="link-arrow" href={link.href}>{link.text} <span>→</span></Link>}
      </div>
      <div className="hz-track" ref={track}>{children}</div>
      <div className="wrap"><div className="hz-progress"><i ref={bar} /></div></div>
    </section>
  );
}
