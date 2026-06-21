import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { Intro } from "./scenes/Intro";
import { Services } from "./scenes/Services";
import { Stats } from "./scenes/Stats";
import { CallToAction } from "./scenes/CallToAction";

const SCENES = {
  intro:    { from: 0,    duration: 300 },
  services: { from: 300,  duration: 600 },
  stats:    { from: 900,  duration: 300 },
  cta:      { from: 1200, duration: 600 },
};

const SceneTransition: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [startFrame - 10, startFrame, startFrame + 10], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: "#000", opacity, pointerEvents: "none", zIndex: 999 }} />;
};

interface LoneStarPromoProps { variant?: "widescreen" | "square"; }

export const LoneStarPromo: React.FC<LoneStarPromoProps> = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence from={SCENES.intro.from} durationInFrames={SCENES.intro.duration}><Intro /></Sequence>
      <Sequence from={SCENES.services.from} durationInFrames={SCENES.services.duration}><AbsoluteFill><Services localFrame={frame - SCENES.services.from} /></AbsoluteFill></Sequence>
      <Sequence from={SCENES.stats.from} durationInFrames={SCENES.stats.duration}><AbsoluteFill><Stats localFrame={frame - SCENES.stats.from} /></AbsoluteFill></Sequence>
      <Sequence from={SCENES.cta.from} durationInFrames={SCENES.cta.duration}><AbsoluteFill><CallToAction localFrame={frame - SCENES.cta.from} /></AbsoluteFill></Sequence>
      <SceneTransition startFrame={SCENES.services.from} />
      <SceneTransition startFrame={SCENES.stats.from} />
      <SceneTransition startFrame={SCENES.cta.from} />
    </AbsoluteFill>
  );
};
