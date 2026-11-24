import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import BigRows from "@/components/BigRows";
import Clients from "@/components/Clients";
import Placeholder from "@/components/Placeholder";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet Bridge Code Digi Grow, the team bridging creators, brands and corporates to the audiences they deserve.",
};

const VALUES = [
  { t: "Identity", em: "first", d: "Trends fade. A clear identity compounds. Every piece we make should be unmistakably yours.", px: "30%", py: "20%" },
  { t: "Craft in", em: "every frame", d: "Pacing, colour, sound and captions are where attention is won or lost. We sweat all of it.", px: "70%", py: "40%" },
  { t: "Honest", em: "growth", d: "Clear scopes, transparent reporting and collaborations that actually fit. No vanity promises.", px: "50%", py: "80%" },
];

const TEAM = [
  { name: "Raphael", role: "Founder & Brand Strategist", px: "50%", py: "30%" },
  { name: "Team Member", role: "Lead Video Editor", px: "30%", py: "60%" },
  { name: "Team Member", role: "Social Media Manager", px: "70%", py: "20%" },
  { name: "Team Member", role: "Partnerships & Collabs", px: "40%", py: "80%" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="(02)"
        label="About us"
        title={<>We build the <em>bridge</em> between you and your audience.</>}
        lead="A creator and brand growth team for influencers, brands and corporates."
        actions={<><button className="btn btn-primary" data-book="">Book an appointment <span className="arrow">→</span></button><Link className="btn btn-ghost" href="/portfolio">See our work</Link></>}
        facts={[{ k: "What we are", v: "Creator & brand growth team" }, { k: "We serve", v: "Influencers, brands, corporates" }, { k: "We handle", v: "Brand, content, edits, collabs" }, { k: "Motto", v: "Create. Connect. Grow." }]}
      />

      {/* Wide studio image (placeholder) wiping in */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="wide-media" data-reveal-media>
            <Placeholder tag="Studio / team photo" title="Behind the camera" sub="Replace with a team or studio photo" px="60%" py="40%" play={false} />
          </div>
        </div>
      </section>

      {/* Story: words light up */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap statement">
          <span className="label"><b>(01)</b> Our story</span>
          <div>
            <p className="scrub-text" data-scrub>
              Bridge Code Digi Grow started with a simple belief: talented people and good brands deserve to be seen. Too many creators burn out juggling content, captions, edits and brand deals alone. So we became the team behind the camera.
            </p>
            <p className="lead" data-fade><span>We shape your identity, manage your channels, produce the content and bring the right collaborations to the table, so you can focus on what only you can do.</span></p>
          </div>
        </div>
      </section>

      {/* What we do, in short */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <span className="label"><b>(02)</b> At a glance</span>
            <h2>One team, <em>whole journey.</em></h2>
          </div>
          <div className="info-grid" data-fade>
            {[
              { t: "Shape", d: "Identity, positioning and a content style that is unmistakably you.", p: ["Brand identity", "Content pillars", "Growth roadmap"] },
              { t: "Create", d: "Shoots, edits, captions and publishing handled end to end.", p: ["Reels & promo videos", "Social management", "Campaign production"] },
              { t: "Grow", d: "Partnerships and reporting that compound month after month.", p: ["Brand collaborations", "Creator collabs", "Monthly reporting"] },
            ].map((c, i) => (
              <article key={c.t} className="info-card"><span className="n">{pad(i + 1)}</span><h3>{c.t}</h3><p>{c.d}</p><ul>{c.p.map((x) => <li key={x}>{x}</li>)}</ul></article>
            ))}
          </div>
        </div>
      </section>

      <BigRows rows={[
        ["Create", { dot: ["30%", "40%"] }, { t: "connect", s: "em" }, { t: "Grow", s: "o" }, { dot: ["60%", "70%"] }, "Repeat"],
        [{ t: "Identity", s: "o" }, { dot: ["40%", "20%"] }, "Craft", { t: "honesty", s: "em" }, { dot: ["80%", "60%"] }, { t: "Growth", s: "o" }],
      ]} />

      {/* Values: stacking cards on amber */}
      <section data-theme="amber">
        <div className="wrap">
          <div className="section-head">
            <span className="label"><b>(03)</b> What drives us</span>
            <h2>Three things we <em>won&apos;t compromise on.</em></h2>
          </div>
          <div className="stack" data-stack>
            {VALUES.map((v, i) => (
              <article key={v.t} className="stack-card" style={{ "--i": i } as React.CSSProperties}>
                <div className="num">{pad(i + 1)}</div>
                <div className="body">
                  <h3>{v.t}<br /><em>{v.em}</em></h3>
                  <p>{v.d}</p>
                </div>
                <div className="stack-media"><Placeholder tag={`Value ${pad(i + 1)}`} px={v.px} py={v.py} play={false} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section>
        <div className="wrap">
          <div className="statement" style={{ marginBottom: "clamp(50px,8vw,110px)" }}>
            <span className="label"><b>(04)</b> Mission</span>
            <p className="scrub-text" data-scrub>Give every creator and brand a team that treats their growth like its own.</p>
          </div>
          <div className="statement">
            <span className="label"><b>(05)</b> Vision</span>
            <p className="scrub-text" data-scrub>Be the most trusted bridge between talent, brands and the audiences that matter.</p>
          </div>
        </div>
      </section>

      {/* Team on a light page */}
      <section data-theme="light">
        <div className="wrap">
          <div className="wi-head">
            <div>
              <span className="label"><b>(06)</b> The team</span>
              <h2>The people <em>behind the camera.</em></h2>
            </div>
            <span className="sample-note">Placeholder profiles. Swap in real photos and names.</span>
          </div>
          <div className="team-grid" data-fade>
            {TEAM.map((m, i) => (
              <article key={m.role} className="team-tile" data-cursor="Hello">
                <div className="team-photo" data-reveal-media><Placeholder tag="Photo" px={m.px} py={m.py} play={false} /></div>
                <span className="n">{pad(i + 1)}</span>
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 50 }}><Link className="link-arrow" href="/careers">Join the team <span>→</span></Link></div>
        </div>
      </section>

      <Clients index="(07)" />
    </>
  );
}
