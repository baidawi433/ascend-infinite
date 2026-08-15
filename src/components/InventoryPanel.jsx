// InventoryPanel.jsx
import { rarityConfig, rarityOrder, fusionRequirement, slotList, slotConfig } from "../game/equipment";
import { canFuse, fuseItems, getNextRarity } from "../game/useFusion";

function InventoryPanel({ gameState, setGameState }) {
  function handleEquip(item) {
    setGameState((prev) => ({
      ...prev,
      equippedItems: { ...prev.equippedItems, [item.slot]: item },
    }));
  }

  function handleUnequip(slot) {
    setGameState((prev) => ({
      ...prev,
      equippedItems: { ...prev.equippedItems, [slot]: null },
    }));
  }

  function handleSell(item) {
    setGameState((prev) => {
      const isEquipped = prev.equippedItems[item.slot]?.instanceId === item.instanceId;
      return {
        ...prev,
        gold: prev.gold + item.sellPrice,
        inventory: prev.inventory.filter((i) => i.instanceId !== item.instanceId),
        equippedItems: isEquipped
          ? { ...prev.equippedItems, [item.slot]: null }
          : prev.equippedItems,
      };
    });
  }

  function handleFuse(rarity) {
    fuseItems(rarity, gameState, setGameState);
  }

  return (
    <div className="panel-card">
      <h3 style={{ marginTop: 0 }}>🎒 Inventory</h3>

      {/* Equipped Items - 7 slot */}
      <div style={{ marginBottom: "12px", padding: "10px", background: "#1a1a2a", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
        <strong style={{ fontSize: "13px" }}>Equipped:</strong>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginTop: "6px" }}>
          {slotList.map((slot) => {
            const item = gameState.equippedItems[slot];
            const slotInfo = slotConfig[slot];
            return (
              <div key={slot} style={{ fontSize: "12px", padding: "4px 6px", background: "#141420", borderRadius: "6px" }}>
                <span>{slotInfo.emoji} </span>
                {item ? (
                  <span style={{ color: rarityConfig[item.rarity].color }}>{item.name}</span>
                ) : (
                  <span style={{ color: "var(--color-text-muted)" }}>Empty</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fusion Panel */}
      <div style={{ marginBottom: "12px", padding: "10px", background: "#1a1a2a", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
        <strong style={{ fontSize: "13px" }}>⚗️ Fusion (per rarity, semua slot digabung)</strong>
        {rarityOrder.slice(0, -1).map((rarity) => {
          const config = rarityConfig[rarity];
          const nextRarity = getNextRarity(rarity);
          const nextConfig = rarityConfig[nextRarity];
          const required = fusionRequirement[rarity];
          const owned = gameState.inventory.filter((i) => i.rarity === rarity).length;
          const ready = canFuse(rarity, gameState.inventory);

          return (
            <div key={rarity} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px" }}>
              <span style={{ fontSize: "12px" }}>
                <span style={{ color: config.color }}>{owned}/{required} {config.label}</span>
                {" → "}
                <span style={{ color: nextConfig.color }}>1 {nextConfig.label}</span>
              </span>
              <button
                onClick={() => handleFuse(rarity)}
                disabled={!ready}
                style={{ padding: "4px 10px", background: ready ? "var(--color-accent-purple)" : "#444", color: "white", border: "none", borderRadius: "5px", cursor: ready ? "pointer" : "not-allowed", fontSize: "11px" }}
              >
                Fuse
              </button>
            </div>
          );
        })}
      </div>

      {gameState.inventory.length === 0 && (
        <p style={{ color: "var(--color-text-muted)", fontSize: "13px" }}>No items yet. Defeat enemies for a chance to find loot.</p>
      )}

      {gameState.inventory.map((item) => {
        const config = rarityConfig[item.rarity];
        const slotInfo = slotConfig[item.slot];
        const isEquipped = gameState.equippedItems[item.slot]?.instanceId === item.instanceId;
        const statLabel = item.statType === "damageBonus" ? "Dmg" : "HP";

        return (
          <div
            key={item.instanceId}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px", marginBottom: "6px", background: "#141420",
              borderRadius: "8px", borderLeft: `4px solid ${config.color}`,
            }}
          >
            <div>
              <strong style={{ color: config.color }}>{slotInfo.emoji} {item.name}</strong>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-muted)" }}>
                {config.label} {slotInfo.label} · +{item.statValue} {statLabel}
              </p>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {isEquipped ? (
                <button
                  onClick={() => handleUnequip(item.slot)}
                  style={{ padding: "4px 10px", background: "#444", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "12px" }}
                >
                  Unequip
                </button>
              ) : (
                <button
                  onClick={() => handleEquip(item)}
                  style={{ padding: "4px 10px", background: "var(--color-success)", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "12px" }}
                >
                  Equip
                </button>
              )}
              <button
                onClick={() => handleSell(item)}
                style={{ padding: "4px 10px", background: "var(--color-danger)", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "12px" }}
              >
                Sell ({item.sellPrice}g)
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InventoryPanel;