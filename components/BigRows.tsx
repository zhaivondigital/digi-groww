/* Giant text rows that slide in opposite directions with scroll (Motion: [data-scroll-x]).
   Word styles: plain, "o" outlined, "em" amber serif italic, "dot" a round media placeholder. */
import Placeholder from "./Placeholder";

type Word = string | { t: string; s: "o" | "em" } | { dot: [string, string] };

const render = (w: Word, i: number) => {
  if (typeof w === "string") return <span key={i}>{w}</span>;
  if ("dot" in w) return <span key={i} className="dot"><Placeholder tag="" px={w.dot[0]} py={w.dot[1]} play={false} /></span>;
  return w.s === "em" ? <em key={i}>{w.t}</em> : <span key={i} className="o">{w.t}</span>;
};

export default function BigRows({ rows }: { rows: [Word[], Word[]] }) {
  return (
    <div className="big-rows" aria-hidden="true">
      <div className="row" data-scroll-x="1"><div className="row-inner">{rows[0].map(render)}</div></div>
      <div className="row" data-scroll-x="-1"><div className="row-inner">{rows[1].map(render)}</div></div>
    </div>
  );
}
