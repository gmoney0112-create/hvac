import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface AnimatedTextProps { text: string; delay?: number; style?: React.CSSProperties; animationType?: "slide-up" | "fade-in" | "scale-in" | "typewriter"; }

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, delay = 0, style = {}, animationType = "slide-up" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);
  const springConfig = { fps, frame: localFrame, config: { damping: 12, stiffness: 100, mass: 0.8 } };
  if (animationType === "slide-up") {
    const progress = spring(springConfig);
    return (<div style={{ overflow: "hidden", display: "inline-block" }}><div style={{ transform: `translateY(${interpolate(progress, [0, 1], [60, 0])}px)`, opacity: interpolate(localFrame, [0, 12], [0, 1], { extrapolateRight: "clamp" }), ...style }}>{text}</div></div>);
  }
  if (animationType === "fade-in") return <div style={{ opacity: interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" }), ...style }}>{text}</div>;
  if (animationType === "scale-in") {
    const scale = spring({ ...springConfig, config: { damping: 10, stiffness: 80 } });
    return <div style={{ transform: `scale(${scale})`, opacity: interpolate(localFrame, [0, 10], [0, 1], { extrapolateRight: "clamp" }), display: "inline-block", ...style }}>{text}</div>;
  }
  return <div style={style}>{text.slice(0, Math.floor(interpolate(localFrame, [0, text.length * 2], [0, text.length], { extrapolateRight: "clamp" })))}</div>;
};
