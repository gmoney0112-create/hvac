import React from "react";
import { interpolate, spring } from "remotion";

interface DecoProps { frame: number; width: number; height: number; }

const FloatingIcon: React.FC<{ x: number; y: number; delay: number; size: number; emoji: string; color: string; fps: number; frame: number }> = ({ x, y, delay, size, emoji, color, fps, frame }) => {
  const localFrame = Math.max(0, frame - delay);
  const ripple = spring({ fps, frame: localFrame, config: { damping: 8, stiffness: 60 } });
  const bobY = Math.sin(localFrame * 0.05) * 8;
  const opacity = interpolate(localFrame, [0, 15, 60, 90], [0, 0.7, 0.7, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: x, top: y + bobY, fontSize: size, transform: `scale(${interpolate(ripple, [0, 1], [0, 1])})`, opacity, filter: `drop-shadow(0 0 10px ${color})` }}>{emoji}</div>
  );
};

export const HVACDeco: React.FC<DecoProps> = ({ frame, width, height }) => {
  const fps = 30;
  return (
    <>
      <FloatingIcon x={60} y={80} delay={5} size={50} emoji="❄️" color="rgba(91,164,207,0.8)" fps={fps} frame={frame} />
      <FloatingIcon x={width - 160} y={60} delay={15} size={40} emoji="❄️" color="rgba(91,164,207,0.8)" fps={fps} frame={frame} />
      <FloatingIcon x={120} y={height - 200} delay={25} size={55} emoji="❄️" color="rgba(91,164,207,0.8)" fps={fps} frame={frame} />
      <FloatingIcon x={width - 200} y={height - 180} delay={10} size={50} emoji="🔥" color="rgba(232,115,74,0.8)" fps={fps} frame={frame} />
      <FloatingIcon x={width - 260} y={90} delay={20} size={42} emoji="🔥" color="rgba(232,115,74,0.8)" fps={fps} frame={frame} />
      <FloatingIcon x={80} y={height - 130} delay={8} size={45} emoji="🔥" color="rgba(232,115,74,0.8)" fps={fps} frame={frame} />
    </>
  );
};
