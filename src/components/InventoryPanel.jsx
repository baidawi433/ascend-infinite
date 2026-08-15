// InventoryPanel.jsx
import { rarityConfig, rarityOrder, fusionRequirement, slotList, slotConfig } from "../game/equipment";
import { canFuse, fuseItems, getNextRarity } from "../game/useFusion";

function InventoryPanel({ gameState, setGameState }) {
  function handleEquip(item) {
    setGameState((prev) => ({ ...prev, equippedItems: { ...prev.equippedItems, [item.slot]: item } }));
  }
  function handleUnequip(slot) {
    setGameState((prev) => ({ ...prev, equippedItems: { ...prev.equippedItems, [slot]: null } }));
  }
  function handleSell(item) {
    setGameState((prev) => {
      const isEquipped = prev.equippedItems[item.slot]?.instanceId === item.instanceId;
      return {
        ...prev,
        gold: prev.gold + item.sellPrice,
        inventory: prev.inventory.filter((i) => i.instanceId !== item.instanceId),
        equippedItems: isEquipped ? { ...prev.equippedItems, [item.slot]: null } : prev.equippedItems,
      };
    });
  }
  function handleFuse(rarity) {
    fuseItems(rarity, gameState, setGameState);
  }

  return (
    <div className="glass-panel" style={{ padding: "18px", maxWidth: "420px" }}>
      <h3 style={{ margin: "0 0 14px 0", fontSize: "16px" }}>🎒 Inventory</h3>

      {/* 7 slot bulat */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "16px" }}>
        {slotList.map((slot) => {
          const item = gameState.equippedItems[slot];
          const slotInfo = slotConfig[slot];
          const rarityColor = item ? rarityConfig[item.rarity].color : "rgba(255,255,255,0.15)";
          return (
            <div key={slot} style={{ textAlign: "center" }}>
              <div
                onClick={() => item && handleUnequip(slot)}
                style={{
                  width: "56px", height: "56px", borderRadius: "18px", margin: "0 auto",
                  background: item ? `${rarityColor}22` : "rgba(255,255,255,0.03)",
                  border: `2px solid ${item ? rarityColor : "var(--color-border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "22px", cursor: item ? "pointer" : "default",
                  boxShadow: item ? `0 0 12px ${rarityColor}55` : "none",
                }}
              >
                {slotInfo.emoji}
              </div>
              <div style={{ fontSize: "9px", color: "var(--color-text-muted)", marginTop: "3px" }}>{slotInfo.label}</div>
            </div>
          );
        })}
      </div>

      {/* Fusion */}
      <div className="glass-panel" style={{ padding: "12px", marginTop: 0, marginBottom: "14px", maxWidth: "none" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, marginBottom: "8px", color: "var(--color-text-muted)" }}>⚗️ FUSION</div>
        {rarityOrder.slice(0, -1).map((rarity) => {
          const config = rarityConfig[rarity];
          const nextRarity = getNextRarity(rarity);
          const nextConfig = rarityConfig[nextRarity];
          const required = fusionRequirement[rarity];
          const owned = gameState.inventory.filter((i) => i.rarity === rarity).length;
          const ready = canFuse(rarity, gameState.inventory);

          return (
            <div key={rarity} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px" }}>
              <span style={{ fontSize: "11px" }}>
                <span style={{ color: config.color }}>{owned}/{required}</span>
                {" → "}
                <span style={{ color: nextConfig.color }}>{nextConfig.label}</span>
              </span>
              <button
                onClick={() => handleFuse(rarity)}
                disabled={!ready}
                style={{
                  padding: "4px 12px", borderRadius: "var(--radius-pill)",
                  background: ready ? "linear-gradient(135deg, #a855f7, #7c3aed)" : "rgba(255,255,255,0.05)",
                  color: "white", border: "none", cursor: ready ? "pointer" : "not-allowed", fontSize: "10px",
                }}
              >
                Fuse
              </button>
            </div>
          );
        })}
      </div>

      {gameState.inventory.length === 0 && (
        <p style={{ color: "var(--color-text-muted)", fontSize: "12px", textAlign: "center" }}>No items yet. Defeat enemies for loot.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {gameState.inventory.map((item) => {
          const config = rarityConfig[item.rarity];
          const slotInfo = slotConfig[item.slot];
          const isEquipped = gameState.equippedItems[item.slot]?.instanceId === item.instanceId;
          const statLabel = item.statType === "damageBonus" ? "Dmg" : "HP";

          return (
            <div key={item.instanceId} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: "14px", background: "rgba(255,255,255,0.03)", border: `1px solid ${config.color}33` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: `${config.color}22`, border: `1px solid ${config.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", boxShadow: `0 0 8px ${config.color}44` }}>
                  {slotInfo.emoji}
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: config.color }}>{item.name}</div>
                  <div style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>+{item.statValue} {statLabel}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
                {!isEquipped && (
                  <button onClick={() => handleEquip(item)} style={{ padding: "4px 10px", borderRadius: "var(--radius-pill)", background: "rgba(52,211,153,0.2)", color: "#34d399", border: "1px solid rgba(52,211,153,0.4)", cursor: "pointer", fontSize: "10px" }}>Equip</button>
                )}
                <button onClick={() => handleSell(item)} style={{ padding: "4px 10px", borderRadius: "var(--radius-pill)", background: "rgba(244,63,94,0.2)", color: "#fb7185", border: "1px solid rgba(244,63,94,0.4)", cursor: "pointer", fontSize: "10px" }}>Sell</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InventoryPanel;