// PrestigeShopPanel.jsx
import { prestigeUpgrades, getUpgradeCost, canBuyPrestigeUpgrade, buyPrestigeUpgrade } from "../game/usePrestigeShop";

function PrestigeShopPanel({ gameState, setGameState }) {
  const owned = gameState.prestigeUpgrades || {};

  return (
    <div className="glass-panel" style={{ padding: "18px", marginTop: "14px", maxWidth: "420px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
        <span style={{ fontSize: "20px" }}>👻</span>
        <h3 style={{ margin: 0, fontSize: "15px" }}>Soul Shop</h3>
      </div>
      <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginBottom: "14px" }}>
        Permanent upgrades. Never reset by Ascension or New Game+.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {prestigeUpgrades.map((upgrade) => {
          const currentLevel = owned[upgrade.id] || 0;
          const isMaxed = currentLevel >= upgrade.maxLevel;
          const cost = getUpgradeCost(upgrade, currentLevel);
          const canBuy = canBuyPrestigeUpgrade(upgrade, currentLevel, gameState.soul);

          return (
            <div key={upgrade.id} style={{ padding: "10px 12px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "12px", fontWeight: 700 }}>{upgrade.emoji} {upgrade.name}</span>
                  <span style={{ fontSize: "10px", color: "var(--color-accent-purple)", marginLeft: "6px" }}>Lv.{currentLevel}/{upgrade.maxLevel}</span>
                </div>
                <button
                  onClick={() => buyPrestigeUpgrade(upgrade.id, gameState, setGameState)}
                  disabled={!canBuy || isMaxed}
                  style={{
                    padding: "5px 14px", borderRadius: "var(--radius-pill)", border: "none",
                    background: isMaxed ? "rgba(52,211,153,0.2)" : canBuy ? "linear-gradient(135deg, #a855f7, #7c3aed)" : "rgba(255,255,255,0.05)",
                    color: isMaxed ? "#34d399" : "white", fontSize: "10px",
                    cursor: canBuy && !isMaxed ? "pointer" : "not-allowed",
                  }}
                >
                  {isMaxed ? "MAX" : `${cost} 👻`}
                </button>
              </div>
              <p style={{ fontSize: "10px", color: "var(--color-text-muted)", margin: "4px 0 0 0" }}>{upgrade.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PrestigeShopPanel;