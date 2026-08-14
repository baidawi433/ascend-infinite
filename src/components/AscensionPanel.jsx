// AscensionPanel.jsx
import { ASCENSION_LEVEL_REQUIREMENT } from "../game/GameState";
import { canAscend, getGlobalBonusPercent, performAscension } from "../game/useAscension";

function AscensionPanel({ gameState, setGameState }) {
  const ready = canAscend(gameState);
  const currentBonus = getGlobalBonusPercent(gameState.ascensionCount);
  const nextBonus = getGlobalBonusPercent(gameState.ascensionCount + 1);

  function handleAscend() {
    const confirmed = window.confirm(
      "Ascend sekarang? Level, Gold, Damage, dan Skill akan direset, tapi kamu akan mendapat Soul dan bonus permanen selamanya."
    );
    if (confirmed) {
      performAscension(gameState, setGameState);
    }
  }

  return (
    <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #f1c40f", borderRadius: "8px", maxWidth: "400px" }}>
      <h3>🌟 Ascension</h3>
      <p>Soul: {gameState.soul}</p>
      <p>Ascension Point: {gameState.ascensionPoint}</p>
      <p>Total Ascensions: {gameState.ascensionCount}</p>
      <p>Current Global Bonus: +{currentBonus}% Damage & Gold</p>

      {ready ? (
        <>
          <p style={{ color: "#f1c40f" }}>✨ Ascension Ready! Next bonus: +{nextBonus}%</p>
          <button
            onClick={handleAscend}
            style={{ padding: "10px 20px", background: "#f1c40f", color: "#000", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}
          >
            🌟 ASCEND
          </button>
        </>
      ) : (
        <p style={{ color: "#888" }}>
          Requires Level {ASCENSION_LEVEL_REQUIREMENT} (Current: {gameState.level})
        </p>
      )}
    </div>
  );
}

export default AscensionPanel;