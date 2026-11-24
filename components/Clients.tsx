/* Two rows of client logos drifting in opposite directions (placeholders until
   `src` is set on each entry in lib/site.ts). */
import { CLIENTS } from "@/lib/site";

const Logo = ({ name, src }: { name: string; src?: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <div className="logo-ph">{src ? <img src={src} alt={name} /> : <><i />{name}</>}</div>
);

export default function Clients({ index = "(03)", label = "Trusted by creators & brands" }: { index?: string; label?: string }) {
  const rev = CLIENTS.slice().reverse();
  return (
    <div className="clients">
      <div className="wrap"><span className="label"><b>{index}</b> {label} · logos are placeholders</span></div>
      <div className="logo-row">{[...CLIENTS, ...CLIENTS].map((c, i) => <Logo key={i} {...c} />)}</div>
      <div className="logo-row rev">{[...rev, ...rev].map((c, i) => <Logo key={i} {...c} />)}</div>
    </div>
  );
}
