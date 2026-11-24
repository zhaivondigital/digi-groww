"use client";

/* Global booking dialog. Any element with a `data-book` attribute opens it
   (works from Server Components too). `data-book="Advanced"` preselects a service.
   Submitting opens WhatsApp with the details pre-filled. */
import { useEffect, useRef, useState } from "react";
import { BOOKING_SERVICES, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState(BOOKING_SERVICES[0]);
  const [minDate, setMinDate] = useState("");
  const lastFocus = useRef<HTMLElement | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const d = new Date(); // local date (toISOString is UTC and can be "yesterday")
    setMinDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-book]");
      if (!el) return;
      e.preventDefault();
      lastFocus.current = el;
      const want = el.dataset.book?.toLowerCase();
      if (want) {
        const match = BOOKING_SERVICES.find((s) => s.toLowerCase().includes(want));
        if (match) setService(match);
      }
      document.body.classList.remove("menu-open");
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden"; // scroll lock (also pauses Lenis)
    const t = setTimeout(() => nameRef.current?.focus(), 200);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); document.documentElement.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  function close() {
    setOpen(false);
    const f = lastFocus.current;
    if (f && f.offsetParent !== null) f.focus(); // skip if it lives in a now-hidden menu
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const notes = f.get("msg") ? `\nNotes: ${f.get("msg")}` : "";
    const msg = `Hi Bridge Code Digi Grow! I'd like to book an appointment.

Name: ${f.get("name")}
Phone: ${f.get("phone")}
I am a: ${f.get("type")}
Interested in: ${f.get("service")}
Preferred slot: ${f.get("date")} at ${f.get("time")}${notes}`;
    window.open(waLink(msg), "_blank", "noopener");
    e.currentTarget.reset();
    close();
  }

  return (
    <div
      className={`modal${open ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-title"
      inert={!open}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="modal-card">
        <button className="close-btn" onClick={close} aria-label="Close">×</button>
        <span className="eyebrow">Book an appointment</span>
        <h3 id="book-title" style={{ marginTop: 12 }}>Let&apos;s talk <em>growth.</em></h3>
        <p className="lead">Pick a slot. We&apos;ll confirm on WhatsApp within a few hours.</p>
        <form className="form" onSubmit={submit}>
          <div className="row">
            <div className="field"><label htmlFor="b-name">Your name</label><input ref={nameRef} id="b-name" name="name" required autoComplete="name" /></div>
            <div className="field"><label htmlFor="b-phone">Phone / WhatsApp</label><input id="b-phone" name="phone" type="tel" required autoComplete="tel" /></div>
          </div>
          <div className="field">
            <label htmlFor="b-type">I am a</label>
            <select id="b-type" name="type"><option>Influencer / Creator</option><option>Brand</option><option>Corporate</option><option>Other</option></select>
          </div>
          <div className="field">
            <label htmlFor="b-service">Interested in</label>
            <select id="b-service" name="service" value={service} onChange={(e) => setService(e.target.value)}>
              {BOOKING_SERVICES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="row">
            <div className="field"><label htmlFor="b-date">Preferred date</label><input id="b-date" name="date" type="date" min={minDate} required /></div>
            <div className="field"><label htmlFor="b-time">Preferred time</label><input id="b-time" name="time" type="time" required /></div>
          </div>
          <div className="field"><label htmlFor="b-msg">Tell us a little (optional)</label><textarea id="b-msg" name="msg" placeholder="Your handle, goals, budget..." /></div>
          <button className="btn btn-primary" type="submit"><WhatsAppIcon size={20} /> Book via WhatsApp</button>
          <p className="form-note">Opens WhatsApp with your details filled in. Nothing is stored on this site.</p>
        </form>
      </div>
    </div>
  );
}
