import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

const SERVICES = [
  { icon: "❄️", title: "AC Repair", subtitle: "Fast diagnostics & same-day repair. $89 flat diagnostic fee.", accent: "#5ba4cf", glow: "rgba(91,164,207,0.3)" },
  { icon: "🔥", title: "Heating Repair", subtitle: "24/7 emergency heating. All furnace & heat pump brands.", accent: "#e8734a", glow: "rgba(232,115,74,0.3)" },
  { icon: "🏠", title: "System Installation", subtitle: "Free estimates on full system replacement. All top brands.", accent: "#c9a84c", glow: "rgba(201,168,76,0.3)" },
  { icon: "⚡", title: "24/7 Emergency", subtitle: "AC down in July? We answer the phone around the clock.", accent: "#e8cc7e", glow: "rgba(232,204,126,0.3)" },
];

interface ServiceCardProps { service: typeof SERVICES[0]; index: number; activeIndex: number; }

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, activeIndex }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isActive = index === activeIndex;
  const isPast = index < activeIndex;
  let opacity = 1, scale = 1, translateX = 0;
  if (isActive) {
    const slideIn = spring({ fps, frame, config: { damping: 14, stiffness: 100 } });
    scale = interpolate(slideIn, [0, 1], [0.9, 1]);
    opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
    translateX = interpolate(slideIn, [0, 1], [80, 0]);
  } else if (isPast) {
    opacity = 0.15; scale = 0.9; translateX = -60;
  } else { opacity = 0.15; translateX = 60; }
  return (
    <div style={{ background: `linear-gradient(135deg, rgba(10,22,40,0.95), rgba(${isActive ? "20,35,60" : "5,12,25"},0.9))`, border: `2px solid ${isActive ? service.accent : "rgba(255,255,255,0.08)"}`, borderRadius: 20, padding: "30px 40px", marginBottom: 20, display: "flex", alignItems: "center", gap: 30, transform: `scale(${scale}) translateX(${translateX}px)`, opacity, boxShadow: isActive ? `0 0 40px ${service.glow}` : "0 4px 16px rgba(0,0,0,0.3)", minWidth: 700 }}>
      <div style={{ fontSize: 52, filter: isActive ? `drop-shadow(0 0 20px ${service.accent})` : "none" }}>{service.icon}</div>
      <div>
        <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Arial Black', sans-serif", color: isActive ? "#ffffff" : "#3a5070", marginBottom: 6 }}>{service.title}</div>
        <div style={{ fontSize: 18, fontFamily: "Arial, sans-serif", color: isActive ? service.accent : "#1a3050" }}>{service.subtitle}</div>
      </div>
      {isActive && <div style={{ marginLeft: "auto", width: 50, height: 50, borderRadius: "50%", background: service.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>✓</div>}
    </div>
  );
};

export const Services: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const { width, height } = useVideoConfig();
  const activeIndex = Math.min(3, Math.floor(localFrame / 50));
  const bgOpacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ width, height, background: "radial-gradient(ellipse at 20% 50%, #091428 0%, #040914 70%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: bgOpacity, position: "relative", overflow: "hidden" }}>
      <div style={{ marginBottom: 40, textAlign: "center" }}>
        <AnimatedText text="OUR SERVICES" delay={5} animationType="slide-up" style={{ fontSize: 16, fontFamily: "Arial, sans-serif", color: "#c9a84c", letterSpacing: 8, textTransform: "uppercase", marginBottom: 8 }} />
        <AnimatedText text="Heating & Cooling Done Right" delay={15} animationType="slide-up" style={{ fontSize: 52, fontWeight: 900, fontFamily: "'Arial Black', sans-serif", color: "#ffffff" }} />
      </div>
      <div>{SERVICES.map((service, i) => <ServiceCard key={i} service={service} index={i} activeIndex={activeIndex} />)}</div>
      <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
        {SERVICES.map((s, i) => <div key={i} style={{ width: i === activeIndex ? 32 : 10, height: 10, borderRadius: 5, background: i <= activeIndex ? s.accent : "rgba(255,255,255,0.15)" }} />)}
      </div>
    </div>
  );
};
