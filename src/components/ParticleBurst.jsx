// ParticleBurst.jsx
// Ledakan partikel kecil dari titik tengah layar, untuk momen-momen besar

import { useEffect, useState, useMemo } from "react";

const colorSets = {
  gold: ["#fbbf24", "#f59e0b", "#fde68a"],
  purple: ["#a855f7", "#c084fc", "#7c3aed"],
  rainbow: ["#a855f7", "#22d3ee", "#fbbf24", "#f43f5e", "#34d399"],
};

function ParticleBurst({ trigger, colorTheme = "gold", particleCount = 24 }) {
  const [burstId, setBurstId] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger > 0) {
      setBurstId(trigger);
      setActive(true);
      const timeout = setTimeout(() => setActive(false), 900);
      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  const particles = useMemo(() => {
    const colors = colorSets[colorTheme] || colorSets.gold;
    return Array.from({ length: particleCount }, (_, i) => {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.3;
      const distance = 80 + Math.random() * 100;
      return {
        id: i,
        color: colors[i % colors.length],
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        size: 4 + Math.random() * 5,
        delay: Math.random() * 0.05,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [burstId]);

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed", top: "40%", left: "50%",
        width: 0, height: 0, pointerEvents: "none", zIndex: 1800,
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            width: `${p.size}px`, height: `${p.size}px`,
            borderRadius: "50%", background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            animation: `particleFly 0.9s ease-out ${p.delay}s forwards`,
            "--tx": `${p.tx}px`, "--ty": `${p.ty}px`,
          }}
        />
      ))}
    </div>
  );
}

export default ParticleBurst;