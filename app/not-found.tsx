import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ alignItems: "center" }}>
      <div className="wrap">
        <span className="crumb">404</span>
        <h1 style={{ marginTop: 16 }}>This frame <em>didn&apos;t make the cut.</em></h1>
        <p className="lead" style={{ margin: "22px 0 28px" }}>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link className="btn btn-primary" href="/">Back home <span className="arrow">→</span></Link>
      </div>
    </section>
  );
}
