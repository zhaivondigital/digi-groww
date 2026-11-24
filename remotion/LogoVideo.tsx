/* Video version of the glitch logo. Reuses the exact component the website intro
   uses; time comes from the frame number instead of requestAnimationFrame. */
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadBodoni } from "@remotion/google-fonts/BodoniModa";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import LogoGlitch from "../components/logo/LogoGlitch";
import { INTRO } from "../lib/glitch";

const { fontFamily: display } = loadBodoni();
const { fontFamily: body } = loadOutfit();

export const LogoVideo = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;

  // hold the resolved logo after the build, with one brief glitch "blink" for life
  const logoT = Math.min(t, INTRO.contentEnd);
  const blink = t > 3.75 && t < 3.83 ? 0.55 : 0;
  const logoWidth = Math.min(width * 0.82, height * 0.95, 1100);

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505", alignItems: "center", justifyContent: "center" }}>
      <AbsoluteFill style={{ background: "radial-gradient(closest-side, rgba(243,156,18,.14), transparent 75%)" }} />
      <div style={{ width: logoWidth }}>
        <LogoGlitch t={logoT} extraGlitch={blink} fonts={{ display, body }} style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }} />
      </div>
      <AbsoluteFill
        style={{
          background: "repeating-linear-gradient(0deg, rgba(255,255,255,.035) 0 2px, transparent 2px 6px)",
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};
