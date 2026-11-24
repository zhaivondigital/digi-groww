/* Inner-page hero: numbered label, giant split-reveal title (Motion splits .page-hero h1),
   lead text, optional CTA buttons + facts strip, scroll cue, and the cycling project flipbook. */
import HeroFlip from "./HeroFlip";

export type HeroFact = { k: string; v: string };

export default function PageHero({
  index, label, title, lead, flip = true, actions, facts,
}: {
  index: string; label: string; title: React.ReactNode; lead?: string; flip?: boolean;
  actions?: React.ReactNode; facts?: HeroFact[];
}) {
  return (
    <section className="page-hero">
      <div className="wrap" style={{ position: "relative" }}>
        {flip && <HeroFlip />}
        <span className="label"><b>{index}</b> {label}</span>
        <h1 style={{ marginTop: 16 }} data-depth="0.12">{title}</h1>
        <div className="page-hero-foot">
          <div>
            {lead && <p className="lead">{lead}</p>}
            {actions && <div className="hero-actions" style={{ marginTop: 22 }}>{actions}</div>}
          </div>
          <span className="scroll-down">Scroll down</span>
        </div>
        {facts && (
          <dl className="hero-facts">
            {facts.map((f) => <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>)}
          </dl>
        )}
      </div>
    </section>
  );
}
