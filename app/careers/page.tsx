import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BigRows from "@/components/BigRows";
import Placeholder from "@/components/Placeholder";
import WaForm from "@/components/WaForm";
import Link from "next/link";
import { JOBS, SITE, WORK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Bridge Code Digi Grow. Open roles for video editors, social media managers and graphic designers.",
};

const PERKS = [
  { t: "Real creative", em: "ownership", d: "Your ideas go live on real accounts, for real audiences, every week." },
  { t: "Learn across", em: "the stack", d: "Strategy, production, editing, publishing and partnerships under one roof." },
  { t: "Grow with", em: "the roster", d: "Work with influencers, brands and corporates, and build a portfolio that opens doors." },
];
const pad = (n: number) => String(n).padStart(2, "0");

export default function CareersPage() {
  return (
    <>
      <PageHero
        index="(06)"
        label="Careers"
        title={<>Make things people <em>can&apos;t scroll past.</em></>}
        lead="We're a growing team of editors, strategists and designers. If you love craft and care about results, let's talk."
        actions={<><Link className="btn btn-primary" href="#apply">Apply now <span className="arrow">→</span></Link><Link className="btn btn-ghost" href="#roles">See open roles</Link></>}
        facts={[{ k: "Open roles", v: `${JOBS.length} positions` }, { k: "Teams", v: "Editing, social, design" }, { k: "Mode", v: "On-site, hybrid, remote" }, { k: "Reply time", v: "Within a week" }]}
      />

      <section style={{ paddingTop: 0 }}>
        <div className="wrap statement">
          <span className="label"><b>(01)</b> Why join</span>
          <p className="scrub-text" data-scrub>We hire people who care about the frame, the caption and the result. Small team, real clients, work that ships every single week.</p>
        </div>
      </section>

      <BigRows rows={[
        ["We're hiring", { dot: ["30%", "40%"] }, { t: "editors", s: "em" }, { t: "Designers", s: "o" }, { dot: ["70%", "30%"] }, "Strategists"],
        [{ t: "Creators", s: "o" }, { dot: ["50%", "70%"] }, "Storytellers", { t: "makers", s: "em" }, { dot: ["20%", "20%"] }, { t: "You?", s: "o" }],
      ]} />

      {/* Perks: stacking cards on amber */}
      <section data-theme="amber">
        <div className="wrap">
          <div className="section-head">
            <span className="label"><b>(02)</b> Perks</span>
            <h2>Why you&apos;ll <em>love it here.</em></h2>
          </div>
          <div className="stack" data-stack>
            {PERKS.map((p, i) => (
              <article key={p.t} className="stack-card" style={{ "--i": i } as React.CSSProperties}>
                <div className="num">{pad(i + 1)}</div>
                <div className="body">
                  <h3>{p.t}<br /><em>{p.em}</em></h3>
                  <p>{p.d}</p>
                </div>
                <div className="stack-media"><Placeholder tag="Team life" px={WORK[i + 4].px} py={WORK[i + 4].py} play={false} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles: list rows that expand */}
      <section id="roles" style={{ scrollMarginTop: 80 }}>
        <div className="wrap">
          <div className="wi-head">
            <div>
              <span className="label"><b>(03)</b> Open roles</span>
              <h2>Find your <em>seat</em><span className="count">({pad(JOBS.length)})</span></h2>
            </div>
            <span className="sample-note">Sample roles. Edit in lib/site.ts.</span>
          </div>
          <div className="roles" data-rows>
            {JOBS.map((j, i) => (
              <details key={j.title} className="role">
                <summary data-cursor="Open">
                  <span className="n">{pad(i + 1)}</span>
                  <span className="t">{j.title}</span>
                  <span className="meta">{j.type}</span>
                  <span className="meta">{j.mode}</span>
                  <span className="go" aria-hidden="true">+</span>
                </summary>
                <div className="role-body">
                  <p>{j.summary}</p>
                  <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  <a className="btn btn-primary" href="#apply">Apply for this role <span className="arrow">→</span></a>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Apply on a light page */}
      <section id="apply" data-theme="light" style={{ scrollMarginTop: 80 }}>
        <div className="wrap">
          <div className="grid grid-2" style={{ gap: 50, alignItems: "start" }}>
            <div>
              <span className="label"><b>(04)</b> Apply</span>
              <h2>Show us <em>your work.</em></h2>
              <p className="lead">Send your details and a portfolio link. The form opens WhatsApp with everything filled in. Prefer email? Write to <a href={`mailto:${SITE.email}`} style={{ color: "var(--amber)" }}>{SITE.email}</a>.</p>
            </div>
            <div className="apply-card" data-fade>
              <WaForm intro="I'd like to apply for a role.">
                <div className="row">
                  <div className="field"><label htmlFor="c-name">Full name</label><input id="c-name" name="Name" required autoComplete="name" /></div>
                  <div className="field"><label htmlFor="c-phone">Phone / WhatsApp</label><input id="c-phone" name="Phone" type="tel" required autoComplete="tel" /></div>
                </div>
                <div className="field">
                  <label htmlFor="c-role">Role</label>
                  <select id="c-role" name="Role">{JOBS.map((j) => <option key={j.title}>{j.title}</option>)}<option>Internship / Other</option></select>
                </div>
                <div className="field"><label htmlFor="c-link">Portfolio / showreel link</label><input id="c-link" name="Portfolio" type="url" placeholder="https://" required /></div>
                <div className="field"><label htmlFor="c-msg">Why you? (optional)</label><textarea id="c-msg" name="Message" /></div>
                <button className="btn btn-primary" type="submit">Send application <span className="arrow">→</span></button>
              </WaForm>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
