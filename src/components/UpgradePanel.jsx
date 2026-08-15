// UpgradePanel.jsx
import { getUpgradeCost } from "../game/formulas";
import { formatNumber } from "../game/numberFormat";

function UpgradePanel({ gameState, setGameState }) {
  const cost = getUpgradeCost(gameState.damage);
  const canAfford = gameState.gold >= cost;

  function handleUpgrade() {
    if (!canAfford) return;
    setGameState((prev) => ({
      ...prev,
      gold: prev.gold - cost,
      damage: prev.damage + 1,
    }));
  }

  return (
    <div
      className="glass-panel"
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 16px", marginTop: "14px", maxWidth: "420px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "50%",
          background: "linear-gradient(135deg, #22d3ee, #0ea5e9)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
          flexShrink: 0,
        }}>
          ⚔️
        </div>
        <div>
          <div style={{ fontSize: "13px", fontWeight: 700 }}>Damage: {formatNumber(gameState.damage)}</div>
          <div style={{ fontSize: "11px", color: "var(--color-accent-gold)" }}>{formatNumber(cost)} 🪙</div>
        </div>
      </div>

      <button
        onClick={handleUpgrade}
        disabled={!canAfford}
        style={{
          width: "40px", height: "40px", borderRadius: "50%", border: "none",
          background: canAfford ? "linear-gradient(135deg, #34d399, #059669)" : "rgba(255,255,255,0.08)",
          color: "white", fontSize: "20px", fontWeight: "bold",
          cursor: canAfford ? "pointer" : "not-allowed",
          boxShadow: canAfford ? "0 4px 14px rgba(52,211,153,0.4)" : "none",
          flexShrink: 0,
        }}
      >
        +
      </button>
    </div>
  );
}

export default UpgradePanel;