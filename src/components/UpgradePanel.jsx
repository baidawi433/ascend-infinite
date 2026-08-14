// UpgradePanel.jsx
import { getUpgradeCost } from "../game/formulas";

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
    <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #333", borderRadius: "8px", maxWidth: "400px" }}>
      <h3>⬆️ Upgrade Damage</h3>
      <p>Current Damage: {gameState.damage}</p>
      <p>Cost: {cost} Gold</p>
      <button
        onClick={handleUpgrade}
        disabled={!canAfford}
        style={{
          padding: "10px 20px",
          background: canAfford ? "#27ae60" : "#555",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: canAfford ? "pointer" : "not-allowed",
          fontSize: "16px",
        }}
      >
        Upgrade (+1 Damage)
      </button>
    </div>
  );
}

export default UpgradePanel;