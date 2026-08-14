// SkillTreePanel.jsx
import { skillList } from "../game/skills";
import { canUnlockSkill, unlockSkill } from "../game/useSkillTree";
import { canRespec, performRespec, RESPEC_COST } from "../game/useRespec";
import { formatNumber } from "../game/numberFormat";

const branches = ["Strength", "Agility", "Greed", "Vitality"];
const branchEmoji = { Strength: "⚔️", Agility: "⚡", Greed: "💰", Vitality: "🛡️" };
const branchColor = { Strength: "#e74c3c", Agility: "#3498db", Greed: "#f1c40f", Vitality: "#27ae60" };

function SkillTreePanel({ gameState, setGameState }) {
  const respecReady = canRespec(gameState);

  function handleRespec() {
    const confirmed = window.confirm(
      `Reset Skill Tree seharga ${RESPEC_COST} Gold?\n\nSemua skill yang terbuka akan dikunci kembali, tetapi Skill Point yang sudah kamu pakai akan dikembalikan sepenuhnya.`
    );
    if (confirmed) {
      performRespec(gameState, setGameState);
    }
  }

  return (
    <div className="panel-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
        <div>
          <h3 style={{ marginTop: 0, marginBottom: "4px" }}>🌳 Skill Tree</h3>
          <p style={{ color: "var(--color-accent-gold)", fontSize: "14px", margin: 0 }}>Skill Point: {gameState.skillPoint}</p>
        </div>
        <button
          onClick={handleRespec}
          disabled={!respecReady}
          style={{
            padding: "8px 14px",
            background: respecReady ? "var(--color-danger)" : "#444",
            color: "white", border: "none", borderRadius: "6px",
            cursor: respecReady ? "pointer" : "not-allowed",
            fontSize: "12px", whiteSpace: "nowrap",
          }}
        >
          🔄 Reset Build ({formatNumber(RESPEC_COST)}g)
        </button>
      </div>

      {branches.map((branch) => (
        <div key={branch} style={{ marginTop: "18px", marginBottom: "18px" }}>
          <h4 style={{ marginBottom: "8px", color: branchColor[branch], borderBottom: `1px solid ${branchColor[branch]}44`, paddingBottom: "4px" }}>
            {branchEmoji[branch]} {branch}
          </h4>

          {skillList.filter((s) => s.branch === branch).map((skill) => {
            const isUnlocked = gameState.unlockedSkills.includes(skill.id);
            const canUnlock = canUnlockSkill(skill.id, gameState.unlockedSkills, gameState.skillPoint);

            let statusIcon = "🔒";
            if (isUnlocked) statusIcon = "✨";
            else if (canUnlock) statusIcon = "⭕";

            return (
              <div
                key={skill.id}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px", marginBottom: "6px", borderRadius: "8px",
                  background: isUnlocked ? "rgba(39, 174, 96, 0.15)" : "#1a1a2a",
                  border: isUnlocked ? "1px solid rgba(39, 174, 96, 0.4)" : "1px solid var(--color-border)",
                }}
              >
                <div>
                  <strong>{statusIcon} {skill.name}</strong>
                  <p style={{ margin: 0, fontSize: "13px", color: "#aaa" }}>{skill.description}</p>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-muted)" }}>Cost: {skill.cost} SP</p>
                </div>
                {!isUnlocked && (
                  <button
                    onClick={() => unlockSkill(gameState, setGameState, skill.id)}
                    disabled={!canUnlock}
                    style={{
                      padding: "6px 14px",
                      background: canUnlock ? "var(--color-accent-purple)" : "#444",
                      color: "white", border: "none", borderRadius: "6px",
                      cursor: canUnlock ? "pointer" : "not-allowed",
                    }}
                  >
                    Unlock
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default SkillTreePanel;