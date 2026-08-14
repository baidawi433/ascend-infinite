// InventoryPanel.jsx
import { rarityConfig, rarityOrder, fusionRequirement } from "../game/equipment";
import { canFuse, fuseItems, getNextRarity } from "../game/useFusion";

function InventoryPanel({ gameState, setGameState }) {
  function handleEquip(item) {
    setGameState((prev) => ({ ...prev, equippedWeapon: item }));
  }

  function handleSell(item) {
    setGameState((prev) => ({
      ...prev,
      gold: prev.gold + item.sellPrice,
      inventory: prev.inventory.filter((i) => i.instanceId !== item.instanceId),
      equippedWeapon: prev.equippedWeapon?.instanceId === item.instanceId ? null : prev.equippedWeapon,
    }));
  }

  function handleFuse(rarity) {
    fuseItems(rarity, gameState, setGameState);
  }

  return (
    <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #333", borderRadius: "8px", maxWidth: "400px" }}>
      <h3>🎒 Inventory</h3>

      <div style={{ marginBottom: "12px", padding: "8px", background: "#1a1a2a", borderRadius: "6px" }}>
        <strong>Equipped: </strong>
        {gameState.equippedWeapon ? (
          <span style={{ color: rarityConfig[gameState.equippedWeapon.rarity].color }}>
            {gameState.equippedWeapon.name} (+{gameState.equippedWeapon.damageBonus} Dmg)
          </span>
        ) : (
          <span style={{ color: "#888" }}>None</span>
        )}
      </div>

      {/* Panel Fusion - tampilkan tombol fusion untuk tiap rarity yang bisa di-fuse */}
      <div style={{ marginBottom: "12px", padding: "8px", background: "#1a1a2a", borderRadius: "6px" }}>
        <strong style={{ fontSize: "13px" }}>⚗️ Fusion</strong>
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
                style={{ padding: "4px 10px", background: ready ? "#8e44ad" : "#444", color: "white", border: "none", borderRadius: "4px", cursor: ready ? "pointer" : "not-allowed", fontSize: "11px" }}
              >
                Fuse
              </button>
            </div>
          );
        })}
      </div>

      {gameState.inventory.length === 0 && (
        <p style={{ color: "#888" }}>No items yet. Defeat enemies for a chance to find loot.</p>
      )}

      {gameState.inventory.map((item) => {
        const config = rarityConfig[item.rarity];
        const isEquipped = gameState.equippedWeapon?.instanceId === item.instanceId;

        return (
          <div
            key={item.instanceId}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px", marginBottom: "6px", background: "#141420",
              borderRadius: "6px", borderLeft: `4px solid ${config.color}`,
            }}
          >
            <div>
              <strong style={{ color: config.color }}>{item.name}</strong>
              <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                {config.label} · +{item.damageBonus} Dmg
              </p>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={() => handleEquip(item)}
                disabled={isEquipped}
                style={{ padding: "4px 10px", background: isEquipped ? "#444" : "#27ae60", color: "white", border: "none", borderRadius: "4px", cursor: isEquipped ? "default" : "pointer", fontSize: "12px" }}
              >
                {isEquipped ? "Equipped" : "Equip"}
              </button>
              <button
                onClick={() => handleSell(item)}
                style={{ padding: "4px 10px", background: "#c0392b", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
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