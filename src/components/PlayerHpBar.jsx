// PlayerHpBar.jsx
import AnimatedNumber from "./AnimatedNumber";

function PlayerHpBar({ currentHp, maxHp, isDown }) {
  const percent = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));

  return (
    <div style={{ position: "absolute", top: "16px", left: "16px", width: "90px" }}>
      <div style={{ fontSize: "9px", color: "var(--color-text-muted)", marginBottom: "2px" }}>
        {isDown ? "😵 DOWN" : <><AnimatedNumber value={currentHp} duration={200} /> HP</>}
      </div>
      <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-pill)", height: "6px", overflow: "hidden" }}>
        <div
          style={{
            width: `${percent}%`, height: "100%",
            background: isDown ? "#555" : percent > 30 ? "linear-gradient(90deg, #34d399, #22d3ee)" : "linear-gradient(90deg, #f43f5e, #fb7185)",
            transition: "width 0.2s ease, background 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

export default PlayerHpBar;