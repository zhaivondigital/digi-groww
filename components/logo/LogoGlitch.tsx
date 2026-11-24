/* Bridge Code Digi Grow logo, rebuilt as SVG and rendered purely from time `t`.
   No browser APIs or hooks besides useId, so the website intro and the Remotion
   videos share it. Imports stay relative for the Remotion bundler. */
import { useId } from "react";
import {
  INTRO, channelSplit, easeOutCubic, glitchIntensity, glowStrength, markVisible,
  scramble, segment, sliceOffsets, typedCount,
} from "../../lib/glitch";

const AMBER = "#f39c12";
const WHITE = "#f5f5f2";
const NAME = "BRIDGE CODE DIGI GROW";
const TAGLINE = "CREATE · CONNECT · GROW";

// Geometry follows public/logo.jpg (500×500 artboard)
const MARK_TOP = 128;
const MARK_H = 150;
const CX = 250;
const CY = 205;

type Fonts = { display: string; body: string };

export default function LogoGlitch({
  t,
  extraGlitch = 0,
  showWordmark = true,
  wordOpacity = 1,
  fonts = { display: "var(--font-display), Georgia, serif", body: "var(--font-body), sans-serif" },
  className,
  style,
}: {
  t: number;
  /** Added on top of the timeline's glitch (used for exit and video micro-bursts). */
  extraGlitch?: number;
  showWordmark?: boolean;
  /** Fades the name + tagline independently of the mark. */
  wordOpacity?: number;
  fonts?: Fonts;
  className?: string;
  style?: React.CSSProperties;
}) {
  const uid = useId().replace(/:/g, "");
  const intensity = Math.min(1, glitchIntensity(t) + extraGlitch);
  const visible = markVisible(t) || extraGlitch > 0;
  const slices = sliceOffsets(t + extraGlitch * 3.7, intensity, 9, MARK_TOP, MARK_H);
  const split = channelSplit(t + extraGlitch * 2.1, intensity);
  const settle = easeOutCubic(segment(t, INTRO.glitchStart, INTRO.lockAt));
  const scale = 1.06 - 0.06 * settle;
  const glow = glowStrength(t);
  const scanP = segment(t, INTRO.lockAt, INTRO.lockAt + 0.5);
  const cursorOn = t < INTRO.cursorEnd && Math.floor(t * 4) % 2 === 0;

  const letter = (ch: "D" | "G", fill: string, key?: string) => (
    <text
      key={key}
      x={ch === "D" ? 180 : 229}
      y={ch === "D" ? 228 : 268}
      fill={fill}
      fontFamily={fonts.display}
      fontSize={126}
      fontWeight={400}
    >
      {ch}
    </text>
  );
  const mark = (d = WHITE, g = AMBER) => (
    <>
      {letter("D", d)}
      {letter("G", g)}
    </>
  );

  const name = scramble(NAME, t, INTRO.wordStart, INTRO.taglineStart + 0.15, 4);
  const shown = typedCount(TAGLINE, t, INTRO.taglineStart, INTRO.contentEnd);

  return (
    <svg
      viewBox={showWordmark ? "0 110 500 280" : "150 118 200 170"}
      className={className}
      style={style}
      role="img"
      aria-label="Bridge Code Digi Grow. Create, connect, grow."
    >
      <defs>
        {slices.map((s, i) => (
          <clipPath id={`${uid}-s${i}`} key={i}>
            <rect x={-200} y={s.y} width={900} height={s.h} />
          </clipPath>
        ))}
        <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <linearGradient id={`${uid}-scan`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={AMBER} stopOpacity="0" />
          <stop offset="1" stopColor={AMBER} stopOpacity=".9" />
        </linearGradient>
      </defs>

      {/* blinking cursor on black */}
      {cursorOn && <rect x={CX - 14} y={CY + 20} width={28} height={5} fill={AMBER} />}

      {visible && (
        <g transform={`translate(${CX} ${CY}) scale(${scale}) translate(${-CX} ${-CY})`}>
          {/* soft glow behind the G */}
          {glow > 0 && (
            <g filter={`url(#${uid}-glow)`} opacity={glow}>
              {letter("G", AMBER)}
            </g>
          )}

          {intensity > 0 && (
            <>
              <g transform={`translate(${split.ax} 0)`} opacity={0.55} style={{ mixBlendMode: "screen" }}>
                {mark(AMBER, AMBER)}
              </g>
              <g transform={`translate(${split.wx} 0)`} opacity={0.35} style={{ mixBlendMode: "screen" }}>
                {mark(WHITE, WHITE)}
              </g>
            </>
          )}

          {intensity > 0 ? (
            slices.map((s, i) => (
              <g key={i} clipPath={`url(#${uid}-s${i})`}>
                <g transform={`translate(${s.dx} 0)`}>
                  {mark()}
                </g>
              </g>
            ))
          ) : (
            mark()
          )}

          {/* scan bar sweeping down as the mark locks */}
          {scanP > 0 && scanP < 1 && (
            <rect x={160} y={MARK_TOP - 30 + scanP * (MARK_H + 30)} width={180} height={30} fill={`url(#${uid}-scan)`} opacity={0.6} />
          )}
        </g>
      )}

      {showWordmark && (
        <g opacity={wordOpacity}>
          <text
            x={CX}
            y={322}
            textAnchor="middle"
            fill={WHITE}
            fontFamily={fonts.body}
            fontSize={25}
            fontWeight={600}
            letterSpacing={1.6}
            style={{ whiteSpace: "pre" }}
          >
            {name.map((g, i) => (
              <tspan key={i} fill={g.state === "scrambling" ? AMBER : WHITE} fillOpacity={g.state === "hidden" ? 0 : 1}>
                {g.ch}
              </tspan>
            ))}
          </text>
          <text
            x={CX}
            y={368}
            textAnchor="middle"
            fill="#d8d8d4"
            fontFamily={fonts.body}
            fontSize={12.5}
            letterSpacing={4.4}
            style={{ whiteSpace: "pre" }}
          >
            <tspan>{TAGLINE.slice(0, shown)}</tspan>
            <tspan fillOpacity={0}>{TAGLINE.slice(shown)}</tspan>
          </text>
        </g>
      )}
    </svg>
  );
}
