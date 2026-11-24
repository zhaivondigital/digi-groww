"use client";

/* Minimal header (logo · Book a call · Menu) with a full-screen menu overlay:
   giant numbered links on the left, grouped Explore / Socials / Say hello on the right. */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SERVICES, SITE, waLink } from "@/lib/site";
import { BrandLockup } from "./Icons";

// Italic serif word shown on hover / for the current page
const HOVER_WORD: Record<string, string> = {
  "/": "start here", "/about": "who we are", "/services": "what we do",
  "/portfolio": "the proof", "/testimonials": "kind words", "/careers": "join us",
};

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const tab = open ? 0 : -1;
  // clicking the page you are already on: close the menu and glide back to the hero
  const go = (href: string) => () => {
    if (href !== pathname) return;
    setOpen(false);
    setTimeout(() => (window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" })), 120);
  };

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="wrap nav">
          <Link className="brand" href="/" aria-label="Bridge Code Digi Grow home">
            <BrandLockup />
          </Link>
          <div className="nav-cta">
            <button className="btn btn-primary btn-book" data-book="">
              Book a call <span className="arrow">→</span>
            </button>
            <button className="menu-btn" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen((o) => !o)}>
              <span>{open ? "Close" : "Menu"}</span>
              <span className="bars" aria-hidden="true"><i /><i /></span>
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" className="menu-overlay" aria-hidden={!open}>
        <div className="menu-inner">
          <nav aria-label="Main">
            <ul className="menu-links">
              {NAV.map((n, i) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={go(n.href)}
                    tabIndex={tab}
                    className={pathname === n.href ? "active" : ""}
                    aria-current={pathname === n.href ? "page" : undefined}
                    style={{ transitionDelay: open ? `${0.12 + i * 0.05}s` : "0s" }}
                  >
                    <small>0{i + 1}</small>
                    <span className="txt">{n.label}</span>
                    <span className="em" aria-hidden="true">{HOVER_WORD[n.href]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu-side">
            <div>
              <h4>Explore</h4>
              <ul>
                {SERVICES.map((s) => <li key={s.id}><Link tabIndex={tab} href="/services" onClick={go("/services")}>{s.footer}</Link></li>)}
                <li><Link tabIndex={tab} href="/services" onClick={go("/services")}>Video Editing</Link></li>
              </ul>
            </div>
            <div>
              <h4>Socials</h4>
              <ul>
                <li><a tabIndex={tab} href={`https://instagram.com/${SITE.instagram}`} target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a tabIndex={tab} href={waLink("Hi Bridge Code Digi Grow!")} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              </ul>
            </div>
            <div>
              <h4>Say hello</h4>
              <ul>
                <li><a tabIndex={tab} href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
                <li><a tabIndex={tab} href={`tel:+${SITE.whatsapp}`}>{SITE.phoneDisplay}</a></li>
              </ul>
              <button className="btn btn-primary" style={{ marginTop: 20 }} data-book="" tabIndex={tab} onClick={() => setOpen(false)}>
                Book an appointment <span className="arrow">→</span>
              </button>
            </div>
          </div>
          <div className="menu-foot">
            <span>Bridge Code Digi Grow</span>
            <span>Create · Connect · Grow</span>
          </div>
        </div>
      </div>
    </>
  );
}
