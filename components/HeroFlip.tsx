"use client";

/* Small flipbook card in the hero that cycles through project frames
   (Bulletproof's hero stills). Each new frame wipes in over the previous one,
   so there is never a flash of empty card. Placeholders until real media is added. */
import { useEffect, useState } from "react";
import { WORK } from "@/lib/site";
import Placeholder from "./Placeholder";

const FRAMES = WORK.slice(0, 6);
const INTERVAL = 3200;

export default function HeroFlip() {
  const [tick, setTick] = useState(0);
  const i = tick % FRAMES.length;
  const prev = tick > 0 ? (tick - 1) % FRAMES.length : null;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((n) => n + 1), INTERVAL);
    return () => clearInterval(id);
  }, []);

  const frame = (k: number) => {
    const w = FRAMES[k];
    return <Placeholder tag={w.tag} title={w.title} sub={w.client} px={w.px} py={w.py} src={w.src} play={false} />;
  };

  return (
    <div className="hero-flip" data-depth="0.6" aria-hidden="true">
      {prev !== null && <div className="hero-flip-under">{frame(prev)}</div>}
      <div className="hero-flip-inner" key={tick}>{frame(i)}</div>
      <span className="hero-flip-count">{String(i + 1).padStart(2, "0")} / {String(FRAMES.length).padStart(2, "0")}</span>
    </div>
  );
}
