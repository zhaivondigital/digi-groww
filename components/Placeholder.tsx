/* Media tile. Shows a branded placeholder until `src` is provided
   (an image in /public, e.g. "/work/creator-launch.jpg"). */
export default function Placeholder({
  tag, title, sub, px = "30%", py = "20%", play = true, src,
}: { tag: string; title?: string; sub?: string; px?: string; py?: string; play?: boolean; src?: string }) {
  const style = { "--px": px, "--py": py } as React.CSSProperties;
  return (
    <div className="ph" style={src ? { ...style, backgroundImage: `linear-gradient(transparent 50%, rgba(0,0,0,.75)), url(${src})`, backgroundSize: "cover", backgroundPosition: "center" } : style}>
      {tag && <span className="ph-tag">{tag}{src ? "" : " · Placeholder"}</span>}
      {play && <span className="play" />}
      {title && <span className="ph-title">{title}{sub && <small>{sub}</small>}</span>}
    </div>
  );
}
