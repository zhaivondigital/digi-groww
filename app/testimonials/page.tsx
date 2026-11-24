import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import HorizontalTrack from "@/components/HorizontalTrack";
import BigRows from "@/components/BigRows";
import Clients from "@/components/Clients";
import Link from "next/link";
import { TESTIMONIALS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What creators, brands and corporates say about working with Bridge Code Digi Grow.",
};

export default function TestimonialsPage() {
  const [lead, ...rest] = TESTIMONIALS;
  return (
    <>
      <PageHero
        index="(05)"
        label="Testimonials"
        title={<>Kind words, <em>on the record.</em></>}
        lead="Creators, brands and corporates on what it's like to grow with us. Sample quotes until real ones are added in lib/site.ts."
        actions={<><button className="btn btn-primary" data-book="">Book an appointment <span className="arrow">→</span></button><Link className="btn btn-ghost" href="/portfolio">See the work</Link></>}
        facts={[{ k: "Reviews", v: `${TESTIMONIALS.length} shared` }, { k: "Rating", v: "★★★★★ average" }, { k: "From", v: "Creators, brands, corporates" }, { k: "Retention", v: "98% (sample)" }]}
      />

      {/* Featured quote: words light up */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap statement">
          <span className="label"><b>(01)</b> Featured</span>
          <div>
            <blockquote className="scrub-text" data-scrub style={{ fontFamily: "var(--font-display)" }}>“{lead.quote}”</blockquote>
            <div className="who-line"><span className="avatar">{lead.initials}</span><div><b>{lead.name}</b><span>{lead.role} · Placeholder</span></div></div>
          </div>
        </div>
      </section>

      {/* All quotes in the pinned horizontal track */}
      <HorizontalTrack index="(02)" label="All reviews" title={<>In their <em>own words.</em></>}>
        {rest.map((t, i) => (
          <figure key={t.name} className={`quote-tile${i % 2 ? " alt" : ""}`} data-cursor="Read">
            <span className="mark">“</span>
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
              <div className="who-line"><span className="avatar">{t.initials}</span><div><b>{t.name}</b><span>{t.role}</span></div></div>
            </figcaption>
          </figure>
        ))}
        <button className="hz-end" data-book="" data-cursor="Book">
          <span>Be our</span><em>next story</em><b>→</b>
        </button>
      </HorizontalTrack>

      <BigRows rows={[
        ["Trusted", { dot: ["30%", "30%"] }, { t: "by creators", s: "em" }, { t: "Brands", s: "o" }, { dot: ["60%", "70%"] }, "Leaders"],
        [{ t: "Five stars", s: "o" }, { dot: ["50%", "20%"] }, "Real results", { t: "growth", s: "em" }, { dot: ["20%", "80%"] }, { t: "Retention", s: "o" }],
      ]} />

      {/* Stats on amber */}
      <section data-theme="amber">
        <div className="wrap">
          <div className="section-head">
            <span className="label"><b>(03)</b> By the numbers</span>
            <h2>Results that <em>speak.</em></h2>
          </div>
          <div data-fade>
            <div className="stats">
              <div className="stat"><b><span data-count="120">0</span><sup>+</sup></b><span>Videos delivered</span></div>
              <div className="stat"><b><span data-count="40">0</span><sup>+</sup></b><span>Creators &amp; brands</span></div>
              <div className="stat"><b><span data-count="25">0</span><sup>M+</sup></b><span>Views generated</span></div>
              <div className="stat"><b><span data-count="98">0</span><sup>%</sup></b><span>Client retention</span></div>
            </div>
            <p className="sample-note">Sample figures. Replace with your real numbers.</p>
          </div>
        </div>
      </section>

      <Clients index="(04)" />
    </>
  );
}
