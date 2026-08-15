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
    if (confirmed) performAscension(gameState, setGameState);
  }

  return (
    <div
      className="glass-panel"
      style={{
        padding: "20px", maxWidth: "420px",
        background: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(255,255,255,0.04))",
        border: "1px solid rgba(251,191,36,0.3)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: "6px" }}>🌟</div>
      <h3 style={{ margin: "0 0 12px 0", fontSize: "16px" }}>Ascension</h3>

      <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
        <span className="hud-pill" style={{ fontSize: "11px" }}>✨ {gameState.soul} Soul</span>
        <span className="hud-pill" style={{ fontSize: "11px" }}>🔹 {gameState.ascensionCount}x</span>
      </div>

      <div style={{ fontSize: "12px", color: "var(--color-accent-gold)", marginBottom: "14px" }}>
        Current Bonus: +{currentBonus}%
      </div>

      {ready ? (
        <>
          <p style={{ fontSize: "12px", color: "var(--color-accent-gold)" }}>Ready! Next: +{nextBonus}%</p>
          <button
            onClick={handleAscend}
            style={{
              padding: "12px 32px", borderRadius: "var(--radius-pill)", border: "none",
              background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              color: "#1a1200", fontWeight: 800, fontSize: "14px", cursor: "pointer",
              boxShadow: "0 8px 24px rgba(251,191,36,0.4)",
            }}
          >
            ASCEND NOW
          </button>
        </>
      ) : (
        <p style={{ color: "var(--color-text-muted)", fontSize: "12px" }}>
          Requires Level {ASCENSION_LEVEL_REQUIREMENT} (Current: {gameState.level})
        </p>
      )}
    </div>
  );
}

export default AscensionPanel;