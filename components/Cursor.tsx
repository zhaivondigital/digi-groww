"use client";

/* Amber dot cursor that grows into a labelled circle over [data-cursor="Label"].
   Fine pointers only; the native cursor stays visible for accessibility. */
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current!;
    const pos = { x: -100, y: -100, tx: -100, ty: -100 };
    let raf = 0;
    const move = (e: PointerEvent) => {
      pos.tx = e.clientX; pos.ty = e.clientY;
      setOn(true);
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? "");
    };
    const leave = () => setOn(false);
    const loop = () => {
      pos.x += (pos.tx - pos.x) * 0.2;
      pos.y += (pos.ty - pos.y) * 0.2;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={`cursor${on ? " on" : ""}${label ? " big" : ""}`} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
