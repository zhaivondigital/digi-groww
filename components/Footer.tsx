import Link from "next/link";
import { NAV, SERVICES, SITE, waLink } from "@/lib/site";
import { BrandLockup, WhatsAppIcon } from "./Icons";
import NextPage from "./NextPage";

const TICKER = ["Create", "connect", "Grow", "Personal branding", "creative", "Social media", "Collaborations", "growth", "Video editing"];

export default function Footer() {
  return (
    <footer className="site-footer" style={{ paddingTop: 0 }}>
      {/* Big "let's talk" call to action */}
      <div className="wrap footer-cta">
        <span className="label"><b>(Next)</b> Ready to grow your brand?</span>
        <button className="big" data-book="" data-cursor="Book">
          Let&apos;s <em>grow</em><br />together →
        </button>
        <div className="hero-actions">
          <button className="btn btn-primary" data-book="">Book an appointment <span className="arrow">→</span></button>
          <a className="btn btn-ghost" href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
      </div>

      <div className="footer-ticker" aria-hidden="true">
        <div className="track">
          {[...TICKER, ...TICKER].map((w, i) => <span key={i}>{w}</span>)}
        </div>
      </div>

      <div className="wrap footer-cols">
        <div className="footer-grid">
          <div>
            <Link className="brand" href="/"><BrandLockup /></Link>
            <p style={{ color: "var(--muted)", fontSize: 15, marginTop: 18, maxWidth: 320 }}>
              Personal branding, social media management, creative production and collaborations for influencers, brands and corporates.
            </p>
          </div>
          <div>
            <h4>Navigate</h4>
            <ul>{NAV.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {SERVICES.map((s) => <li key={s.id}><Link href="/services">{s.footer}</Link></li>)}
              <li><Link href="/services">Video Editing</Link></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><a href={waLink("Hi Bridge Code Digi Grow, I'd like to talk about my brand.")} target="_blank" rel="noopener noreferrer">WhatsApp · {SITE.phoneDisplay}</a></li>
              <li><a href={`tel:+${SITE.whatsapp}`}>Call Raphael · {SITE.phoneDisplay}</a></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a href={`https://instagram.com/${SITE.instagram}`} target="_blank" rel="noopener noreferrer">@{SITE.instagram}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom" style={{ marginTop: 56 }}>
          <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <NextPage />
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={waLink("Hi Bridge Code Digi Grow, I found you on your website and would like to know more.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon />
      <span className="wa-label">Chat with us</span>
    </a>
  );
}
