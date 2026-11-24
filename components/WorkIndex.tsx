"use client";

/* Work index with a List / Grid toggle (Bulletproof) and optional two-axis
   filters with an empty state (Bulletproof /work, Preymaker archive).
   List rows show a cursor-following preview; everything opens a lightbox. */
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { WORK, type Audience, type WorkCat, type WorkItem } from "@/lib/site";
import Placeholder from "./Placeholder";

const TYPES: { key: WorkCat | "all"; label: string }[] = [
  { key: "all", label: "All" }, { key: "reels", label: "Reels" }, { key: "brand", label: "Brand" },
  { key: "campaigns", label: "Campaigns" }, { key: "corporate", label: "Corporate" },
];
const AUDIENCES: { key: Audience | "all"; label: string }[] = [
  { key: "all", label: "All" }, { key: "influencer", label: "Influencers" }, { key: "brand", label: "Brands" }, { key: "corporate", label: "Corporates" },
];
const pad = (n: number) => String(n).padStart(2, "0");

export default function WorkIndex({ limit, filters = false, title = "Selected work", index = "(03)" }: { limit?: number; filters?: boolean; title?: string; index?: string }) {
  const [view, setView] = useState<"list" | "grid">("list");
  const [type, setType] = useState<WorkCat | "all">("all");
  const [aud, setAud] = useState<Audience | "all">("all");
  const [active, setActive] = useState<WorkItem | null>(null);
  const [hover, setHover] = useState<WorkItem | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    const list = WORK.filter((w) => (type === "all" || w.cat === type) && (aud === "all" || w.audience === aud));
    return limit ? list.slice(0, limit) : list;
  }, [type, aud, limit]);

  // cursor-following preview for list rows (desktop)
  useEffect(() => {
    const el = previewRef.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const pos = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    const move = (e: PointerEvent) => { pos.tx = e.clientX + 24; pos.ty = e.clientY - 110; };
    const loop = () => {
      pos.x += (pos.tx - pos.x) * 0.14; pos.y += (pos.ty - pos.y) * 0.14;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); };
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const open = (w: WorkItem) => ({
    onClick: () => setActive(w),
    onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(w); } },
    role: "button" as const,
    tabIndex: 0,
    "aria-label": `Open ${w.title}`,
  });
  const numberOf = (w: WorkItem) => pad(WORK.indexOf(w) + 1);

  return (
    <>
      <div className="wi-head">
        <div>
          <span className="label"><b>{index}</b> {filters ? "Archive" : "Index"}</span>
          <h2 data-nosplit>{title}<span className="count">({pad(filters ? items.length : WORK.length)})</span></h2>
        </div>
        <div className="toggle" role="group" aria-label="Layout">
          <button className={view === "list" ? "on" : ""} aria-pressed={view === "list"} onClick={() => setView("list")}>List</button>
          <button className={view === "grid" ? "on" : ""} aria-pressed={view === "grid"} onClick={() => setView("grid")}>Grid</button>
        </div>
      </div>

      {filters && (
        <div className="wi-filters">
          <div className="group" role="group" aria-label="Filter by type">
            <span>Type</span>
            {TYPES.map((f) => (
              <button key={f.key} className={`filter-btn${type === f.key ? " active" : ""}`} aria-pressed={type === f.key} onClick={() => setType(f.key)}>{f.label}</button>
            ))}
          </div>
          <div className="group" role="group" aria-label="Filter by audience">
            <span>For</span>
            {AUDIENCES.map((f) => (
              <button key={f.key} className={`filter-btn${aud === f.key ? " active" : ""}`} aria-pressed={aud === f.key} onClick={() => setAud(f.key)}>{f.label}</button>
            ))}
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="wi-empty">
          <b>No exact matches.</b>
          Try another combination, or <button className="link-arrow" style={{ background: "none", border: 0, cursor: "pointer", color: "var(--amber)" }} onClick={() => { setType("all"); setAud("all"); }}>see everything</button>
        </div>
      ) : view === "list" ? (
        <ul className="wi-list" onMouseLeave={() => setHover(null)}>
          {items.map((w) => (
            <li key={w.title} className="wi-row" {...open(w)} onMouseEnter={() => setHover(w)} data-cursor="View">
              <span className="n">{numberOf(w)}</span>
              <span className="t">{w.title}</span>
              <span className="tl">{w.tagline}</span>
              <span className="meta">{w.tag}</span>
              <span className="meta yr">{w.year}</span>
              <span className="go" aria-hidden="true">→</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="wi-grid">
          {items.map((w) => (
            <article key={w.title} className="wi-card" {...open(w)} data-cursor="View">
              <div className="media"><Placeholder tag={w.tag} px={w.px} py={w.py} src={w.src} /></div>
              <div className="cap">
                <span className="n">no. {numberOf(w)}</span>
                <h3>{w.title}</h3>
                <span className="meta">{w.tag} · {w.year}</span>
                <span className="tl">{w.tagline}</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {limit && (
        <div className="wi-more">
          <Link className="btn btn-ghost" href="/portfolio">See all work ({pad(WORK.length)}) <span className="arrow">→</span></Link>
        </div>
      )}

      <div ref={previewRef} className={`wi-preview${hover && view === "list" ? " on" : ""}`} aria-hidden="true">
        {hover && <Placeholder tag={hover.tag} px={hover.px} py={hover.py} src={hover.src} play={false} />}
      </div>

      <div className={`lightbox${active ? " open" : ""}`} onClick={(e) => e.target === e.currentTarget && setActive(null)} inert={!active}>
        <button className="close-btn" onClick={() => setActive(null)} aria-label="Close">×</button>
        <div className="lightbox-inner">
          {active && <Placeholder tag={active.tag} title={active.title} sub={`${active.client} · ${active.tagline}`} px={active.px} py={active.py} src={active.src} />}
        </div>
      </div>
    </>
  );
}
