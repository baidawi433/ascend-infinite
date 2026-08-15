// LevelUpOverlay.jsx
// Overlay besar yang muncul sebentar saat pemain naik level

import { useEffect, useState } from "react";

function LevelUpOverlay({ show, level, onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timeout = setTimeout(() => {
        setVisible(false);
        setTimeout(onDone, 300); // tunggu fade-out selesai baru benar-benar hilang
      }, 1400);
      return () => clearTimeout(timeout);
    }
  }, [show, onDone]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", zIndex: 1500,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        style={{
          fontSize: "48px", fontWeight: "bold",
          background: "linear-gradient(90deg, #f1c40f, #f39c12)",
          WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
          textShadow: "0 0 30px rgba(241, 196, 15, 0.8)",
          transform: visible ? "scale(1)" : "scale(0.5)",
          transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        ⭐ LEVEL UP! ⭐
      </div>
      <div
        style={{
          fontSize: "24px", color: "white", marginTop: "8px",
          transform: visible ? "translateY(0)" : "translateY(10px)",
          opacity: visible ? 1 : 0,
          transition: "all 0.35s ease 0.1s",
        }}
      >
        Level {level}
      </div>
    </div>
  );
}

export default LevelUpOverlay;