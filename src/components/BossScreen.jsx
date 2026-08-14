// BossScreen.jsx
import { formatNumber } from "../game/numberFormat";

function BossScreen({ boss, attackBoss }) {
  if (!boss) return null;

  const hpPercent = Math.max(0, (boss.currentHp / boss.hp) * 100);

  return (
    <div className="panel-card" style={{ border: "2px solid var(--color-danger)", background: "#1a0a0a" }}>
      <h3 style={{ marginTop: 0 }}>{boss.emoji} BOSS: {boss.name}</h3>
      <div style={{ background: "#0a0a12", borderRadius: "6px", overflow: "hidden", height: "26px", marginBottom: "10px", border: "1px solid #3a1a1a" }}>
        <div
          style={{
            width: `${hpPercent}%`,
            background: "linear-gradient(90deg, #e74c3c, #c0392b)",
            height: "100%",
            transition: "width 0.15s ease",
            boxShadow: "0 0 10px rgba(231, 76, 60, 0.6)",
          }}
        />
      </div>
      <p style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
        {formatNumber(boss.currentHp)} / {formatNumber(boss.hp)} HP
      </p>
      <button
        onClick={attackBoss}
        style={{ padding: "12px 24px", background: "var(--color-danger)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}
      >
        ⚔️ Attack Boss
      </button>
    </div>
  );
}

export default BossScreen;