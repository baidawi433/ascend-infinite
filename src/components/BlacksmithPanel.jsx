// BlacksmithPanel.jsx
import { materialList, craftingRecipes, canCraft } from "../game/materials";
import { rarityConfig } from "../game/equipment";

function BlacksmithPanel({ gameState, setGameState }) {
  function handleCraft(recipe) {
    if (!canCraft(recipe, gameState.materials, gameState.gold)) return;

    const rarityInfo = rarityConfig[recipe.resultRarity];
    const newItem = {
      instanceId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: recipe.name,
      slot: recipe.resultSlot,
      rarity: recipe.resultRarity,
      statType: recipe.resultSlot === "weapon" || recipe.resultSlot === "ring" || recipe.resultSlot === "gloves" ? "damageBonus" : "hpBonus",
      statValue: rarityInfo.statBonus,
      sellPrice: rarityInfo.sellPrice,
    };

    setGameState((prev) => {
      const newMaterials = { ...prev.materials };
      Object.entries(recipe.cost).forEach(([matId, needed]) => {
        newMaterials[matId] = (newMaterials[matId] || 0) - needed;
      });
      return {
        ...prev,
        gold: prev.gold - recipe.goldCost,
        materials: newMaterials,
        inventory: [...prev.inventory, newItem],
      };
    });
  }

  return (
    <div className="glass-panel" style={{ padding: "18px", maxWidth: "420px", marginTop: "14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <span style={{ fontSize: "20px" }}>🔨</span>
        <h3 style={{ margin: 0, fontSize: "15px" }}>Kael's Forge</h3>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
        {materialList.map((mat) => (
          <span key={mat.id} className="hud-pill" style={{ fontSize: "10px" }}>
            {mat.emoji} {gameState.materials[mat.id] || 0}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {craftingRecipes.map((recipe) => {
          const ready = canCraft(recipe, gameState.materials, gameState.gold);
          const rarityInfo = rarityConfig[recipe.resultRarity];

          return (
            <div key={recipe.id} style={{ padding: "10px 12px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", border: `1px solid ${ready ? rarityInfo.color + "55" : "var(--color-border)"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: rarityInfo.color }}>{recipe.name}</span>
                <button
                  onClick={() => handleCraft(recipe)}
                  disabled={!ready}
                  style={{
                    padding: "5px 14px", borderRadius: "var(--radius-pill)", border: "none",
                    background: ready ? `linear-gradient(135deg, ${rarityInfo.color}, #7c3aed)` : "rgba(255,255,255,0.05)",
                    color: "white", fontSize: "10px", cursor: ready ? "pointer" : "not-allowed",
                  }}
                >
                  Craft
                </button>
              </div>
              <div style={{ fontSize: "10px", color: "var(--color-text-muted)", marginTop: "4px" }}>
                {Object.entries(recipe.cost).map(([matId, needed]) => {
                  const mat = materialList.find((m) => m.id === matId);
                  const owned = gameState.materials[matId] || 0;
                  return `${mat?.emoji} ${owned}/${needed} `;
                })}
                · {recipe.goldCost}🪙
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BlacksmithPanel;