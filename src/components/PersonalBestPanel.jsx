// PersonalBestPanel.jsx
import { formatNumber } from "../game/numberFormat";

function PersonalBestPanel({ gameState }) {
  const records = gameState.records || {};

  const items = [
    { emoji: "💥", label: "Highest Hit", value: formatNumber(records.highestDamageHit || 0) },
    { emoji: "🪙", label: "Best Gold Drop", value: formatNumber(records.highestGoldFromKill || 0) },
    { emoji: "⭐", label: "Highest Level", value: formatNumber(records.highestLevel || 1) },
    { emoji: "🗼", label: "Tower Floor", value: formatNumber(gameState.highestTowerFloor || 0) },
  ];

  return (
    <div className="glass-panel" style={{ padding: "18px", marginTop: "14px", maxWidth: "420px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <span style={{ fontSize: "20px" }}>📊</span>
        <h3 style={{ margin: 0, fontSize: "15px" }}>Personal Best</h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
        {items.map((item) => (
          <div key={item.label} style={{ padding: "10px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border)", textAlign: "center" }}>
            <div style={{ fontSize: "18px" }}>{item.emoji}</div>
            <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--color-accent-gold)" }}>{item.value}</div>
            <div style={{ fontSize: "9px", color: "var(--color-text-muted)" }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PersonalBestPanel;