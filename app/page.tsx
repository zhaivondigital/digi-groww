import Link from "next/link";
import HeroFlip from "@/components/HeroFlip";
import Showreel from "@/components/Showreel";
import HorizontalWork from "@/components/HorizontalWork";
import WorkIndex from "@/components/WorkIndex";
import Placeholder from "@/components/Placeholder";
import BigRows from "@/components/BigRows";
import Clients from "@/components/Clients";
import { PLATFORMS, SERVICES, TESTIMONIALS, WORK } from "@/lib/site";

const AUDIENCES = [
  { n: "01", tag: "Influencers", title: "Creators", text: "Turn your personality into a brand people recognise in one scroll.", points: ["Identity & content style", "Reels that hold attention", "Brand deals, sourced & tracked"] },
  { n: "02", tag: "Brands", title: "Brands", text: "Show up consistently with content that sells without shouting.", points: ["Social calendars & publishing", "Campaign production", "Creator collaborations"] },
  { n: "03", tag: "Corporates", title: "Corporates", text: "Give leaders and companies a voice that earns trust online.", points: ["Leadership personal branding", "Corporate films & stories", "Performance reporting"] },
];

const STEPS = [
  { t: "Discover", em: "listen first", d: "We learn who you are, who you speak to and where you want to be in a year. No templates, no guesswork." },
  { t: "Shape", em: "find the voice", d: "Identity, content pillars, visual style and a calendar you can actually keep." },
  { t: "Create", em: "make it move", d: "Shoots, edits, captions and publishing, with your approval at every step." },
  { t: "Grow", em: "compound it", d: "Collaborations, reporting and monthly tuning based on what the numbers say." },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function HomePage() {
  const t = TESTIMONIALS[0];
  return (
    <>
      {/* HERO: giant stacked type over the liquid background + flipbook */}
      <section className="hero2">
        <div className="wrap">
          <div className="hero2-top fade-up">
            <span className="live"><i /> Now onboarding creators &amp; brands</span>
            <span className="label">Digital marketing · Creator growth</span>
          </div>
          <HeroFlip />
          <h1 className="mega" aria-label="Create. Connect. Grow.">
            <span className="line" data-depth="0.15"><span>Create.</span></span>
            <span className="line" data-depth="0.35"><span><em>connect.</em></span></span>
            <span className="line" data-depth="0.22"><span>Grow.</span></span>
          </h1>
          <div className="hero2-foot fade-up">
            <div>
              <p className="lead">Your identity, shaped. Your growth, managed. Personal branding, social media, creative production and collaborations for influencers, brands and corporates.</p>
              <div className="hero-actions">
                <button className="btn btn-primary" data-book="">Book an appointment <span className="arrow">→</span></button>
                <Link className="btn btn-ghost" href="/portfolio">View our work</Link>
              </div>
            </div>
            <span className="scroll-down">Scroll down</span>
          </div>
        </div>
      </section>

      {/* SHOWREEL: grows to full screen on scroll */}
      <Showreel />

      {/* BIG ROWS sliding with scroll */}
      <BigRows rows={[
        ["Personal branding", { dot: ["30%", "30%"] }, { t: "reels", s: "em" }, { t: "Social media", s: "o" }, { dot: ["70%", "60%"] }, "Campaigns"],
        [{ t: "Collaborations", s: "o" }, { dot: ["50%", "20%"] }, "Video editing", { t: "growth", s: "em" }, { dot: ["20%", "80%"] }, { t: "Strategy", s: "o" }],
      ]} />

      {/* STATEMENT: words light up as you scroll */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap statement">
          <span className="label"><b>(01)</b> Who we are</span>
          <div>
            <p className="scrub-text" data-scrub>
              We are the creator and brand growth partner for people worth following. We shape who you are online, keep your channels alive, produce the content and bring the right collaborations to the table, so you can focus on what only you can do.
            </p>
            <Link className="link-arrow" href="/about">About us <span>→</span></Link>
          </div>
        </div>
      </section>

      {/* FEATURED: pinned horizontal gallery */}
      <HorizontalWork />

      {/* CLIENT LOGOS (placeholders) */}
      <Clients />

      {/* SERVICES: page turns amber */}
      <section data-theme="amber">
        <div className="wrap">
          <div className="wi-head">
            <div>
              <span className="label"><b>(04)</b> What we do</span>
              <h2>Four ways we <em>grow</em> you</h2>
            </div>
            <Link className="link-arrow" href="/services">Services &amp; pricing <span>→</span></Link>
          </div>
          <ul className="svc-list" data-rows>
            {SERVICES.map((s, i) => (
              <li key={s.id}>
                <Link href="/services" data-cursor="Explore">
                  <span className="n">{pad(i + 1)}</span>
                  <span className="t">{s.footer}</span>
                  <p>{s.short}</p>
                  <span className="go" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROCESS: stacking cards on a light page */}
      <section data-theme="light">
        <div className="wrap">
          <div className="section-head">
            <span className="label"><b>(05)</b> How we work</span>
            <h2>From first call to <em>compound growth.</em></h2>
          </div>
          <div className="stack" data-stack>
            {STEPS.map((s, i) => (
              <article key={s.t} className="stack-card" style={{ "--i": i } as React.CSSProperties}>
                <div className="num">{pad(i + 1)}</div>
                <div className="body">
                  <h3>{s.t}<br /><em>{s.em}</em></h3>
                  <p>{s.d}</p>
                </div>
                <div className="stack-media"><Placeholder tag={`Step ${pad(i + 1)}`} px={WORK[i].px} py={WORK[i].py} play={false} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WORK INDEX */}
      <section>
        <div className="wrap">
          <WorkIndex limit={6} index="(06)" />
        </div>
      </section>

      {/* AUDIENCES */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <span className="label"><b>(07)</b> Who it&apos;s for</span>
            <h2>Built for people <em>worth following.</em></h2>
          </div>
          <div className="grid grid-3" data-fade>
            {AUDIENCES.map((a) => (
              <article key={a.n} className="card tilt audience-card">
                <div><span className="tag">{a.n} · {a.tag}</span><h3 className="pop" style={{ marginTop: 14, fontSize: "clamp(34px,3.6vw,52px)", textTransform: "uppercase", fontWeight: 800, fontStretch: "72%" }}>{a.title}</h3></div>
                <div>
                  <p>{a.text}</p>
                  <ul>{a.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS + PLATFORMS */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div data-fade>
            <div className="stats">
              <div className="stat"><b><span data-count="120">0</span><sup>+</sup></b><span>Videos delivered</span></div>
              <div className="stat"><b><span data-count="40">0</span><sup>+</sup></b><span>Creators &amp; brands</span></div>
              <div className="stat"><b><span data-count="25">0</span><sup>M+</sup></b><span>Views generated</span></div>
              <div className="stat"><b><span data-count="98">0</span><sup>%</sup></b><span>Client retention</span></div>
            </div>
            <p className="sample-note">Sample figures. Replace with your real numbers.</p>
          </div>
          <div className="section-head" style={{ marginTop: "clamp(70px,10vw,130px)" }}>
            <span className="label"><b>(08)</b> Where we grow brands</span>
            <h2>Every feed <em>that matters</em><span className="count">({pad(PLATFORMS.length)})</span></h2>
          </div>
          <div className="wall" data-fade>
            {PLATFORMS.map((p) => <div key={p.name}><b>{p.name}</b><span>{p.kind}</span></div>)}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap statement">
          <span className="label"><b>(09)</b> Kind words</span>
          <div>
            <blockquote className="scrub-text" data-scrub style={{ fontFamily: "var(--font-display)" }}>
              “{t.quote}”
            </blockquote>
            <div className="quote-card" style={{ padding: 0, background: "none", marginTop: 28 }}>
              <div className="who"><span className="avatar">{t.initials}</span><div><b>{t.name}</b><span>{t.role} · Placeholder</span></div></div>
            </div>
            <div style={{ marginTop: 30 }}><Link className="link-arrow" href="/testimonials">All testimonials <span>→</span></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
