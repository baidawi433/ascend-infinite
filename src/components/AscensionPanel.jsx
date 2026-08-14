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
    <div className="panel-card" style={{ border: "1px solid var(--color-accent-gold)" }}>
      <h3 style={{ marginTop: 0 }}>🌟 Ascension</h3>
      <p style={{ fontSize: "13px" }}>Soul: {gameState.soul}</p>
      <p style={{ fontSize: "13px" }}>Ascension Point: {gameState.ascensionPoint}</p>
      <p style={{ fontSize: "13px" }}>Total Ascensions: {gameState.ascensionCount}</p>
      <p style={{ color: "var(--color-accent-gold)" }}>Current Global Bonus: +{currentBonus}% Damage & Gold</p>

      {ready ? (
        <>
          <p style={{ color: "var(--color-accent-gold)" }}>✨ Ascension Ready! Next bonus: +{nextBonus}%</p>
          <button
            onClick={handleAscend}
            style={{ padding: "10px 20px", background: "var(--color-accent-gold)", color: "#000", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}
          >
            🌟 ASCEND
          </button>
        </>
      ) : (
        <p style={{ color: "var(--color-text-muted)" }}>
          Requires Level {ASCENSION_LEVEL_REQUIREMENT} (Current: {gameState.level})
        </p>
      )}
    </div>
  );
}

export default AscensionPanel;