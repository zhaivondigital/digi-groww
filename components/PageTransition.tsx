"use client";

/* Smooth page transition: an amber curtain slides up to cover the page on link click,
   the route changes underneath, then the curtain lifts away to reveal the new page. */
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NAV } from "@/lib/site";

type Phase = "idle" | "cover" | "reveal";
const COVER_MS = 650;
const REVEAL_MS = 1000;

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const phaseRef = useRef<Phase>("idle");
  const timers = useRef<number[]>([]);
  const failsafe = useRef<number>(0);
  const set = (p: Phase) => { phaseRef.current = p; setPhase(p); };
  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page / hash jump
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (document.documentElement.classList.contains("intro-running")) return;
      if (phaseRef.current !== "idle") return; // mid-transition: let the link navigate normally

      // capture phase: runs before next/link, so we can take over the navigation
      e.preventDefault();
      e.stopPropagation();
      setLabel(NAV.find((n) => n.href === url.pathname)?.label ?? "Bridge Code Digi Grow");
      set("cover");
      later(() => router.push(url.pathname + url.search + url.hash), COVER_MS);
      clearTimeout(failsafe.current);
      failsafe.current = window.setTimeout(() => { if (phaseRef.current === "cover") set("idle"); }, 4000); // route never changed
    };
    document.addEventListener("click", onClick, true);
    return () => { document.removeEventListener("click", onClick, true); timers.current.forEach(clearTimeout); clearTimeout(failsafe.current); };
  }, [router]);

  // route changed → lift the curtain
  useEffect(() => {
    if (phaseRef.current !== "cover") return;
    clearTimeout(failsafe.current); // otherwise a stale timer could reset a later transition
    set("reveal");
    later(() => set("idle"), REVEAL_MS + 100);
  }, [pathname]);

  return (
    <div className="curtain" data-phase={phase} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
