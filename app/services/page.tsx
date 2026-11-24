import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BigRows from "@/components/BigRows";
import Placeholder from "@/components/Placeholder";
import Link from "next/link";
import { PLANS, SERVICES, WORK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Personal branding, social media management, creative production, collaborations and video editing packages from ₹49,990.",
};

const EM: Record<string, string> = { branding: "& creator management", social: "account management", production: "that carries you", growth: "& collaborations" };
const TITLE: Record<string, string> = { branding: "Personal branding", social: "Social media", production: "Creative production", growth: "Growth" };

const NOTES = [
  "Ad spend / media spend is separate from the package fee.",
  "Additional shoot days and specialized production may be quoted separately.",
  "Collaboration outcomes depend on partner fit and response; we source, pitch and track them.",
  "Deliverables and posting schedule are agreed during onboarding; monthly pricing follows agreed scope.",
  "Services outside the agreed scope will be charged separately.",
];
const TERMS = [
  { t: "50% advance", d: "Required before commencement of services." },
  { t: "Remaining 50%", d: "Payable on completion of agreed monthly deliverables, before final delivery / publication." },
  { t: "Monthly renewals", d: "Continuing monthly services are payable at the beginning of each billing cycle." },
];
const INCLUDED = [
  { t: "A dedicated lead", d: "One point of contact who knows your brand, your goals and your calendar.", p: ["Weekly check-ins", "Single WhatsApp thread", "Clear owner for every task"] },
  { t: "Approval at every step", d: "Nothing goes live without your sign-off, from concept to final cut.", p: ["Concept & script review", "Draft edits before delivery", "Revision rounds in scope"] },
  { t: "Reporting that helps", d: "Monthly numbers translated into what to do next, not a wall of charts.", p: ["Reach & engagement", "Best-performing formats", "Next-month plan"] },
];
const FAQS = [
  { q: "How do we get started?", a: "Book a call or message us on WhatsApp. We learn about you, suggest a scope and share a quote within a couple of days." },
  { q: "Do you work with brands and corporates, or only creators?", a: "All three: influencers and artists, consumer brands, and corporates or leadership teams who want a stronger voice online." },
  { q: "Is ad spend included in the packages?", a: "No. Ad spend and media spend are separate from the package fee, and we plan them with you openly." },
  { q: "How long does a video edit take?", a: "Typical turnaround is 3 to 7 working days depending on length and package. Priority delivery comes with the Premium plan." },
  { q: "Can I change my scope later?", a: "Yes. Scope is reviewed monthly, and anything outside the agreed scope is quoted separately before we start." },
];
const pad = (n: number) => String(n).padStart(2, "0");

export default function ServicesPage() {
  return (
    <>
      <PageHero
        index="(03)"
        label="Services"
        title={<>Support that fits <em>where you&apos;re going.</em></>}
        lead="Personal branding, social media management, creative production and collaborations for influencers, artists, brands and corporates."
        actions={<><button className="btn btn-primary" data-book="">Book an appointment <span className="arrow">→</span></button><Link className="btn btn-ghost" href="#pricing">Video editing prices</Link></>}
        facts={[{ k: "Services", v: "4 core + video editing" }, { k: "Who for", v: "Creators, brands, corporates" }, { k: "Editing from", v: "₹49,990 / project" }, { k: "Payment", v: "50% advance to begin" }]}
      />

      {/* Services: stacking cards */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <span className="label"><b>(01)</b> What we do</span>
            <h2>Four ways we <em>grow</em> you</h2>
          </div>
          <div className="stack" data-stack>
            {SERVICES.map((s, i) => (
              <article key={s.id} id={s.id} className="stack-card" style={{ "--i": i, scrollMarginTop: 110 } as React.CSSProperties}>
                <div className="num">{pad(i + 1)}</div>
                <div className="body">
                  <div>
                    <h3>{TITLE[s.id]}<br /><em>{EM[s.id]}</em></h3>
                    <p>{s.long}</p>
                  </div>
                  <div className="chips">{s.chips.map((c) => <span key={c} className="chip">{c}</span>)}</div>
                </div>
                <div className="stack-media"><Placeholder tag={s.footer} px={WORK[i + 2].px} py={WORK[i + 2].py} play={false} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What every engagement includes */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <span className="label"><b>(02)</b> Every engagement</span>
            <h2>What you get <em>with us.</em></h2>
          </div>
          <div className="info-grid" data-fade>
            {INCLUDED.map((c, i) => (
              <article key={c.t} className="info-card"><span className="n">{pad(i + 1)}</span><h3>{c.t}</h3><p>{c.d}</p><ul>{c.p.map((x) => <li key={x}>{x}</li>)}</ul></article>
            ))}
          </div>
        </div>
      </section>

      <BigRows rows={[
        ["Edited", { dot: ["30%", "40%"] }, { t: "to be", s: "em" }, { t: "Seen", s: "o" }, { dot: ["70%", "30%"] }, "Reels"],
        [{ t: "Colour", s: "o" }, { dot: ["50%", "70%"] }, "Sound", { t: "motion", s: "em" }, { dot: ["20%", "20%"] }, { t: "Captions", s: "o" }],
      ]} />

      {/* Pricing on amber */}
      <section id="pricing" data-theme="amber" style={{ scrollMarginTop: 60 }}>
        <div className="wrap">
          <div className="wi-head">
            <div>
              <span className="label"><b>(03)</b> Video editing</span>
              <h2>Priced <em>per project.</em></h2>
            </div>
          </div>
          <div className="price-grid" data-fade>
            {PLANS.map((p) => {
              const featured = "featured" in p && p.featured;
              return (
                <article key={p.key} className={`price-v2${featured ? " featured" : ""}`}>
                  {featured && <span className="badge">Popular</span>}
                  <span className="tier">{p.tier}</span>
                  <h3>{p.title}</h3>
                  <div className="price">{p.price}<small> /project</small></div>
                  <p className="blurb">{p.blurb}</p>
                  <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                  <button className={`btn ${featured ? "btn-primary" : "btn-ghost"}`} data-book={p.key}>Get in touch <span className="arrow">→</span></button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notes + terms on a light page */}
      <section data-theme="light">
        <div className="wrap">
          <div className="statement">
            <span className="label"><b>(04)</b> The fine print</span>
            <div>
              <p className="scrub-text" data-scrub>Clear expectations make a smoother partnership. Here&apos;s exactly how we work together.</p>
              <div className="terms-grid" data-fade>
                {TERMS.map((t, i) => (
                  <div key={t.t} className="term">
                    <span className="n">{pad(i + 1)}</span>
                    <h3>{t.t}</h3>
                    <p>{t.d}</p>
                  </div>
                ))}
              </div>
              <ul className="notes" style={{ marginTop: 50 }} data-fade>{NOTES.map((n) => <li key={n}>{n}</li>)}</ul>
              <p className="form-note" style={{ marginTop: 22 }}>Services pause if payments are overdue.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <span className="label"><b>(05)</b> Questions</span>
            <h2>Good things <em>to know.</em></h2>
          </div>
          <div className="faq" data-fade>
            {FAQS.map((x) => <details key={x.q}><summary>{x.q}</summary><p>{x.a}</p></details>)}
          </div>
          <div className="cta-band" style={{ marginTop: 60 }}>
            <h2>Ready to <em>grow?</em></h2>
            <button className="btn btn-primary" data-book="">Book an appointment <span className="arrow">→</span></button>
          </div>
        </div>
      </section>
    </>
  );
}
