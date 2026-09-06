// PetPanel.jsx
import { petList } from "../game/pets";
import { formatNumber } from "../game/numberFormat";

function PetPanel({ gameState, setGameState }) {
  const ownedPets = gameState.ownedPets || [];
  const equippedPetId = gameState.equippedPetId;

  function handleUnlock(pet) {
    if (gameState.gold < pet.cost || ownedPets.includes(pet.id)) return;
    setGameState((prev) => ({
      ...prev,
      gold: prev.gold - pet.cost,
      ownedPets: [...prev.ownedPets, pet.id],
    }));
  }

  function handleEquip(petId) {
    setGameState((prev) => ({ ...prev, equippedPetId: prev.equippedPetId === petId ? null : petId }));
  }

  return (
    <div className="glass-panel" style={{ padding: "18px", marginTop: "14px", maxWidth: "420px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <span style={{ fontSize: "20px" }}>🐾</span>
        <h3 style={{ margin: 0, fontSize: "15px" }}>Pet Companion</h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {petList.map((pet) => {
          const isOwned = ownedPets.includes(pet.id);
          const isEquipped = equippedPetId === pet.id;
          const canAfford = gameState.gold >= pet.cost;

          return (
            <div key={pet.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 10px", borderRadius: "14px",
              background: isEquipped ? "rgba(168,85,247,0.15)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${isEquipped ? "rgba(168,85,247,0.5)" : "var(--color-border)"}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "22px" }}>{pet.emoji}</span>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700 }}>{pet.name}</div>
                  <div style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>{pet.description}</div>
                </div>
              </div>

              {isOwned ? (
                <button
                  onClick={() => handleEquip(pet.id)}
                  style={{
                    padding: "5px 12px", borderRadius: "var(--radius-pill)", border: "none",
                    background: isEquipped ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.06)",
                    color: isEquipped ? "#34d399" : "var(--color-text-muted)", fontSize: "10px", cursor: "pointer",
                  }}
                >
                  {isEquipped ? "Equipped" : "Equip"}
                </button>
              ) : (
                <button
                  onClick={() => handleUnlock(pet)}
                  disabled={!canAfford}
                  style={{
                    padding: "5px 12px", borderRadius: "var(--radius-pill)", border: "none",
                    background: canAfford ? "linear-gradient(135deg, #a855f7, #7c3aed)" : "rgba(255,255,255,0.05)",
                    color: "white", fontSize: "10px", cursor: canAfford ? "pointer" : "not-allowed",
                  }}
                >
                  {formatNumber(pet.cost)} 🪙
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PetPanel;