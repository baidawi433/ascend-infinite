// NewGamePlusPanel.jsx
import { canStartNewGamePlus, getNewGamePlusBonusPercent, performNewGamePlus } from "../game/useNewGamePlus";

function NewGamePlusPanel({ gameState, setGameState }) {
  const ready = canStartNewGamePlus(gameState);
  if (!ready && gameState.newGamePlusCount === 0) return null; // sembunyi total kalau belum pernah unlock infinity mode

  const currentBonus = getNewGamePlusBonusPercent(gameState.newGamePlusCount);
  const nextBonus = getNewGamePlusBonusPercent(gameState.newGamePlusCount + 1);

  function handleNewGamePlus() {
    const confirmed = window.confirm(
      "Mulai New Game+?\n\nSemua progress (Level, Gold, Skill, Soul, Ascension Point) akan direset total. Sebagai gantinya, kamu mendapat bonus permanen +100% per tingkat NG+, dan musuh di seluruh dunia akan terasa lebih menantang.\n\nAchievement dan rekor Endless Tower tetap tersimpan."
    );
    if (confirmed) performNewGamePlus(gameState, setGameState);
  }

  return (
    <div
      className="glass-panel"
      style={{
        padding: "20px", marginTop: "14px", maxWidth: "420px", textAlign: "center",
        background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(34,211,238,0.06))",
        border: "1px solid rgba(168,85,247,0.35)",
      }}
    >
      <div style={{ fontSize: "28px", marginBottom: "6px" }}>🔁</div>
      <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>New Game+</h3>

      <div className="hud-pill" style={{ fontSize: "11px", marginBottom: "12px" }}>NG+{gameState.newGamePlusCount}</div>

      <div style={{ fontSize: "12px", color: "var(--color-accent-purple)", marginBottom: "14px" }}>
        Current Bonus: +{currentBonus}%
      </div>

      <button
        onClick={handleNewGamePlus}
        style={{
          padding: "12px 28px", borderRadius: "var(--radius-pill)", border: "none",
          background: "linear-gradient(135deg, #a855f7, #22d3ee)",
          color: "#0a0a12", fontWeight: 800, fontSize: "13px", cursor: "pointer",
          boxShadow: "0 8px 24px rgba(168,85,247,0.4)",
        }}
      >
        START NG+{gameState.newGamePlusCount + 1} (+{nextBonus}%)
      </button>
    </div>
  );
}

export default NewGamePlusPanel;