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
    <div className="panel-card">
      <h3 style={{ marginTop: 0 }}>⬆️ Upgrade Damage</h3>
      <p style={{ color: "var(--color-text-muted)", fontSize: "13px" }}>Current Damage: {formatNumber(gameState.damage)}</p>
      <p style={{ color: "var(--color-accent-gold)", fontSize: "14px" }}>Cost: {formatNumber(cost)} Gold</p>
      <button
        onClick={handleUpgrade}
        disabled={!canAfford}
        style={{
          padding: "10px 20px",
          background: canAfford ? "var(--color-success)" : "#444",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: canAfford ? "pointer" : "not-allowed",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        Upgrade (+1 Damage)
      </button>
    </div>
  );
}

export default UpgradePanel;