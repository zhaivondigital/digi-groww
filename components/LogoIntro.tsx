"use client";

/* Glitch logo intro, played inside the hero on first open (once per browser session).
   The logo glitches in over the liquid amber background, then shrinks and flies into
   the header logo while the header fades in and the hero headline rises.
   - Click / tap / Esc / "Skip intro" jumps straight to the fly-out.
   - prefers-reduced-motion: still logo + short fade, no glitching.
   - Debug: ?intro=1 forces a replay, ?introT=1.2 freezes that frame. */
import { useEffect, useRef, useState } from "react";
import LogoGlitch from "./logo/LogoGlitch";
import { INTRO, easeInOutCubic, segment } from "@/lib/glitch";

export const INTRO_KEY = "bcdg-intro";
export const INTRO_DONE_EVENT = "bcdg:intro-done";

type Mode = "pending" | "play" | "reduced" | "frozen" | "done";
type Fly = { ox: number; oy: number; dx: number; dy: number; s: number };

// mark centre / size inside LogoGlitch's viewBox "0 110 500 280"
const MARK_CX = 250 / 500, MARK_CY = (205 - 110) / 280, MARK_W = 160 / 500;

function revealSite() {
  const root = document.documentElement;
  const running = root.classList.contains("intro-running");
  if (!running) { window.dispatchEvent(new Event(INTRO_DONE_EVENT)); return; } // failsafe already cleared it: still wake Motion
  root.classList.remove("intro-running");
  root.classList.add("intro-reveal");
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
  setTimeout(() => root.classList.remove("intro-reveal"), 1400);
}

export default function LogoIntro() {
  const [mode, setMode] = useState<Mode>("pending");
  const [t, setT] = useState(0);
  const [fly, setFly] = useState<Fly | null>(null);
  const skipRef = useRef(false);
  const decided = useRef(false); // StrictMode runs effects twice in dev; decide once
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (decided.current) return;
    decided.current = true;
    const params = new URLSearchParams(window.location.search);
    const frozen = params.get("introT");
    if (frozen !== null) {
      setT(Number(frozen) || 0);
      setMode("frozen");
      return;
    }
    let seen = false;
    try { seen = !!sessionStorage.getItem(INTRO_KEY); } catch {}
    if (seen && params.get("intro") !== "1") {
      revealSite();
      setMode("done");
      return;
    }
    try { sessionStorage.setItem(INTRO_KEY, "1"); } catch {}
    document.documentElement.classList.add("intro-running");
    setMode(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduced" : "play");
  }, []);

  // drive the timeline
  useEffect(() => {
    if (mode !== "play" && mode !== "reduced") return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const end = mode === "play" ? INTRO.exitEnd : 1.1;
    const revealAt = mode === "play" ? INTRO.contentEnd : 0.6;
    let measured = false;
    // capped time step: a main-thread stall pauses the intro instead of skipping it
    let time = 0;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      time += Math.min(now - last, 250) / 1000;
      last = now;
      if (skipRef.current && mode === "play" && time < INTRO.contentEnd) time = INTRO.contentEnd;
      skipRef.current = false;

      if (time >= revealAt) {
        // measure once: where the mark is now, and where the header logo sits
        if (!measured && mode === "play") {
          measured = true;
          const box = logoRef.current?.getBoundingClientRect();
          const svg = logoRef.current?.querySelector("svg")?.getBoundingClientRect();
          const target = document.querySelector(".site-header .brand-mark")?.getBoundingClientRect();
          if (box && svg && target) {
            const mx = svg.left + svg.width * MARK_CX, my = svg.top + svg.height * MARK_CY;
            setFly({
              ox: mx - box.left, oy: my - box.top,
              dx: target.left + target.width / 2 - mx, dy: target.top + target.height / 2 - my,
              s: (target.width * 0.82) / (svg.width * MARK_W),
            });
          }
        }
        revealSite();
      }

      setT(time);
      if (time >= end) { setMode("done"); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skipRef.current = true; };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      revealSite(); // never leave the site hidden
    };
  }, [mode]);

  if (mode === "done") return null;

  const reduced = mode === "reduced";
  const exit = reduced ? 0 : segment(t, INTRO.contentEnd, INTRO.exitEnd);
  const p = easeInOutCubic(exit);
  const veil = reduced ? 1 - segment(t, 0.6, 1.1) : 1 - segment(t, INTRO.contentEnd, INTRO.exitEnd - 0.1);
  const logoStyle: React.CSSProperties = reduced
    ? { opacity: 1 - segment(t, 0.6, 1.1) }
    : fly
      ? {
          transformOrigin: `${fly.ox}px ${fly.oy}px`,
          transform: `translate(${fly.dx * p}px, ${fly.dy * p}px) scale(${1 + (fly.s - 1) * p})`,
          opacity: 1 - segment(t, INTRO.exitEnd - 0.12, INTRO.exitEnd),
        }
      : { opacity: 1 - exit };

  return (
    <div className={`intro${mode === "frozen" ? " intro-frozen" : ""}`} onClick={() => { skipRef.current = true; }}>
      <div className="intro-veil" aria-hidden="true" style={{ opacity: veil }} />
      <div className="intro-scanlines" aria-hidden="true" style={{ opacity: veil }} />
      <div className="intro-logo" ref={logoRef} style={logoStyle}>
        <LogoGlitch
          t={reduced ? INTRO.contentEnd : Math.min(t, INTRO.contentEnd)}
          extraGlitch={segment(t, INTRO.contentEnd, INTRO.contentEnd + 0.2) * 0.6 * (1 - segment(t, INTRO.contentEnd + 0.2, INTRO.contentEnd + 0.3))}
          wordOpacity={1 - segment(t, INTRO.contentEnd, INTRO.contentEnd + 0.25)}
        />
      </div>
      {!reduced && (
        <div className="intro-count" aria-hidden="true" style={{ opacity: veil }}>
          <small>Loading</small>
          {String(Math.round(segment(t, 0, INTRO.contentEnd) * 100)).padStart(3, "0")}%
        </div>
      )}
      {mode !== "frozen" && !reduced && (
        <button className="intro-skip" style={{ opacity: veil }} onClick={(e) => { e.stopPropagation(); skipRef.current = true; }}>
          Skip intro
        </button>
      )}
    </div>
  );
}
