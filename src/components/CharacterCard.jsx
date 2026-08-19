// CharacterCard.jsx
import AnimatedNumber from "./AnimatedNumber";

function CharacterCard({ gameState, effectiveHp }) {
  const hpPercent = 100;

  function getTitle(level) {
    if (level >= 1000) return "Infinity Walker";
    if (level >= 500) return "Ascended";
    if (level >= 200) return "Skill Master";
    if (level >= 100) return "Boss Hunter";
    if (level >= 50) return "Monster Slayer";
    if (level >= 20) return "Adventurer";
    return "Novice";
  }

  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: "12px", padding: "10px 20px",
        background: "linear-gradient(90deg, rgba(142,68,173,0.12), rgba(52,152,219,0.08))",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          fontSize: "32px", width: "50px", height: "50px",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#1a1a2a", borderRadius: "50%",
          border: "2px solid var(--color-accent-purple)", flexShrink: 0,
        }}
        className="sprite-idle"
      >
        🧙
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <strong style={{ fontSize: "13px" }}>Arin</strong>
          <span style={{ fontSize: "11px", color: "var(--color-accent-gold)" }}>{getTitle(gameState.level)}</span>
        </div>
        <div style={{ fontSize: "11px", color: "var(--color-text-muted)", marginBottom: "3px" }}>
          Lv.{gameState.level} · <AnimatedNumber value={effectiveHp} /> HP
        </div>
        <div style={{ background: "#0a0a12", borderRadius: "4px", overflow: "hidden", height: "6px" }}>
          <div style={{ width: `${hpPercent}%`, background: "linear-gradient(90deg, #27ae60, #2ecc71)", height: "100%" }} />
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;