"use client";

/* A form that sends its fields as a pre-filled WhatsApp message. */
import { waLink } from "@/lib/site";

export default function WaForm({ intro, children, className = "form" }: { intro: string; children: React.ReactNode; className?: string }) {
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const lines = Array.from(new FormData(e.currentTarget).entries())
      .filter(([, v]) => String(v).trim())
      .map(([k, v]) => `${k}: ${v}`);
    window.open(waLink(`Hi Bridge Code Digi Grow! ${intro}\n\n${lines.join("\n")}`), "_blank", "noopener");
    e.currentTarget.reset();
  }
  return <form className={className} onSubmit={submit}>{children}</form>;
}
