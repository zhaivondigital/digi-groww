import { Composition } from "remotion";
import { LogoVideo } from "./LogoVideo";

// 3.5s animation (2.9s build) + hold on the final logo, so it works as intro or outro.
const FPS = 60;
const DURATION = Math.round(4.5 * FPS);

export const RemotionRoot = () => (
  <>
    <Composition id="logo-square" component={LogoVideo} width={1080} height={1080} fps={FPS} durationInFrames={DURATION} />
    <Composition id="logo-vertical" component={LogoVideo} width={1080} height={1920} fps={FPS} durationInFrames={DURATION} />
    <Composition id="logo-wide" component={LogoVideo} width={1920} height={1080} fps={FPS} durationInFrames={DURATION} />
  </>
);
