/* Featured projects in the pinned horizontal track. */
import Link from "next/link";
import { WORK } from "@/lib/site";
import HorizontalTrack from "./HorizontalTrack";
import Placeholder from "./Placeholder";

const ITEMS = WORK.filter((w) => w.featured);
const pad = (n: number) => String(n).padStart(2, "0");

export default function HorizontalWork({ index = "(02)" }: { index?: string }) {
  return (
    <HorizontalTrack index={index} label="Featured projects" title={<>Work that <em>moves</em> people</>} link={{ href: "/portfolio", text: "All projects" }}>
      {ITEMS.map((w, i) => (
        <Link key={w.title} href="/portfolio" className={`hz-card${i % 2 ? " tall" : ""}`} data-cursor="View">
          <div className="hz-media"><Placeholder tag={w.tag} px={w.px} py={w.py} src={w.src} /></div>
          <div className="hz-cap">
            <span className="n">{pad(i + 1)}</span>
            <div><h3>{w.title}</h3><p>{w.tagline}</p></div>
            <span className="meta">{w.client} · {w.year}</span>
          </div>
        </Link>
      ))}
      <Link href="/portfolio" className="hz-end" data-cursor="All work">
        <span>See all</span><em>projects</em><b>→</b>
      </Link>
    </HorizontalTrack>
  );
}
