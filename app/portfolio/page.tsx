import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Showreel from "@/components/Showreel";
import BigRows from "@/components/BigRows";
import HorizontalWork from "@/components/HorizontalWork";
import WorkIndex from "@/components/WorkIndex";
import Clients from "@/components/Clients";
import Link from "next/link";
import { WORK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Reels, campaigns, brand identities and corporate films produced by Bridge Code Digi Grow.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        index="(04)"
        label="Portfolio / Projects"
        title={<>The <em>proof.</em></>}
        lead="All our work matters. Reels, campaigns, identities and films for creators, brands and corporates."
        actions={<><button className="btn btn-primary" data-book="">Book an appointment <span className="arrow">→</span></button><Link className="btn btn-ghost" href="#projects">Browse all projects</Link></>}
        facts={[{ k: "Projects", v: `${WORK.length} showcased` }, { k: "Formats", v: "Reels, campaigns, films" }, { k: "Clients", v: "Creators, brands, corporates" }, { k: "Years", v: "2025 – 2026" }]}
      />

      <Showreel />

      <HorizontalWork index="(01)" />

      <BigRows rows={[
        ["Reels", { dot: ["30%", "30%"] }, { t: "campaigns", s: "em" }, { t: "Identity", s: "o" }, { dot: ["60%", "70%"] }, "Films"],
        [{ t: "Influencers", s: "o" }, { dot: ["50%", "20%"] }, "Brands", { t: "corporates", s: "em" }, { dot: ["20%", "80%"] }, { t: "Artists", s: "o" }],
      ]} />

      <section id="projects" style={{ paddingTop: 0, scrollMarginTop: 80 }}>
        <div className="wrap">
          <WorkIndex filters title="All projects" index="(02)" />
          <p className="sample-note">Placeholder projects. Add real images to /public and set <code>src</code> in lib/site.ts.</p>
        </div>
      </section>

      <Clients index="(03)" />
    </>
  );
}
