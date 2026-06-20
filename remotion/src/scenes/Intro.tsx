import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { HVACDeco } from "../components/HVACDeco";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const logoSpring = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 10, stiffness: 80 } });
  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [40, 80], [0, 320], { extrapolateRight: "clamp" });
  const pulseGlow = Math.sin(frame * 0.08) * 0.3 + 0.7;

  return (
    <div style={{ width, height, background: "radial-gradient(ellipse at 50% 50%, #0d1e3c 0%, #060d1a 60%, #020609 100%)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: bgOpacity }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <HVACDeco frame={frame} width={width} height={height} />
      <div style={{ transform: `scale(${logoScale})`, opacity: logoOpacity, textAlign: "center", zIndex: 10 }}>
        <div style={{ fontSize: 80, marginBottom: 10, filter: `drop-shadow(0 0 30px rgba(201,168,76,${pulseGlow}))` }}>⭐</div>
        <div style={{ fontSize: 78, fontWeight: 900, fontFamily: "'Arial Black', sans-serif", color: "#ffffff", letterSpacing: -2, textShadow: "0 0 40px rgba(201,168,76,0.6)" }}>LONE <span style={{ color: "#c9a84c" }}>STAR</span></div>
        <div style={{ fontSize: 26, fontFamily: "Arial, sans-serif", color: "#e8cc7e", letterSpacing: 10, textTransform: "uppercase", marginTop: 6 }}>HVAC</div>
      </div>
      <div style={{ width: lineWidth, height: 3, background: "linear-gradient(90deg, transparent, #c9a84c, #e8cc7e, transparent)", borderRadius: 2, marginTop: 30, boxShadow: "0 0 15px #c9a84c", zIndex: 10 }} />
      <div style={{ marginTop: 20, zIndex: 10 }}>
        <AnimatedText text="San Antonio's Trusted Heating & Cooling" delay={70} animationType="fade-in" style={{ fontSize: 24, fontFamily: "Arial, sans-serif", color: "#b8a070", letterSpacing: 2 }} />
      </div>
    </div>
  );
};
