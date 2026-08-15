// SkillTreePanel.jsx
import { skillList } from "../game/skills";
import { canUnlockSkill, unlockSkill } from "../game/useSkillTree";
import { canRespec, performRespec, RESPEC_COST } from "../game/useRespec";
import { formatNumber } from "../game/numberFormat";

const branches = ["Strength", "Agility", "Greed", "Vitality"];
const branchEmoji = { Strength: "⚔️", Agility: "⚡", Greed: "💰", Vitality: "🛡️" };
const branchColor = { Strength: "#f43f5e", Agility: "#22d3ee", Greed: "#fbbf24", Vitality: "#34d399" };

function SkillTreePanel({ gameState, setGameState }) {
  const respecReady = canRespec(gameState);

  function handleRespec() {
    const confirmed = window.confirm(
      `Reset Skill Tree seharga ${RESPEC_COST} Gold?\n\nSemua skill yang terbuka akan dikunci kembali, tetapi Skill Point yang sudah kamu pakai akan dikembalikan sepenuhnya.`
    );
    if (confirmed) performRespec(gameState, setGameState);
  }

  return (
    <div className="glass-panel" style={{ padding: "18px", maxWidth: "420px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "16px" }}>🌳 Skill Tree</h3>
          <span className="hud-pill" style={{ marginTop: "6px", color: "var(--color-accent-gold)", fontSize: "11px", padding: "5px 10px" }}>
            🌟 {gameState.skillPoint} SP
          </span>
        </div>
        <button
          onClick={handleRespec}
          disabled={!respecReady}
          style={{
            padding: "8px 12px", borderRadius: "var(--radius-pill)",
            background: respecReady ? "rgba(244,63,94,0.2)" : "rgba(255,255,255,0.05)",
            color: respecReady ? "#fb7185" : "var(--color-text-muted)",
            border: `1px solid ${respecReady ? "rgba(244,63,94,0.4)" : "var(--color-border)"}`,
            cursor: respecReady ? "pointer" : "not-allowed",
            fontSize: "11px", whiteSpace: "nowrap",
          }}
        >
          🔄 Reset ({formatNumber(RESPEC_COST)}g)
        </button>
      </div>

      {branches.map((branch) => (
        <div key={branch} style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
            <div style={{
              width: "26px", height: "26px", borderRadius: "50%",
              background: `${branchColor[branch]}22`, border: `1px solid ${branchColor[branch]}55`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px",
            }}>
              {branchEmoji[branch]}
            </div>
            <span style={{ fontSize: "12px", fontWeight: 700, color: branchColor[branch] }}>{branch}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingLeft: "13px", borderLeft: `2px dashed ${branchColor[branch]}33` }}>
            {skillList.filter((s) => s.branch === branch).map((skill) => {
              const isUnlocked = gameState.unlockedSkills.includes(skill.id);
              const canUnlock = canUnlockSkill(skill.id, gameState.unlockedSkills, gameState.skillPoint);

              return (
                <div
                  key={skill.id}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 12px", marginLeft: "8px", borderRadius: "16px",
                    background: isUnlocked ? `${branchColor[branch]}15` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isUnlocked ? branchColor[branch] + "44" : "var(--color-border)"}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "16px" }}>{isUnlocked ? "✨" : canUnlock ? "⭕" : "🔒"}</span>
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: 700 }}>{skill.name}</div>
                      <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{skill.description}</div>
                    </div>
                  </div>
                  {!isUnlocked && (
                    <button
                      onClick={() => unlockSkill(gameState, setGameState, skill.id)}
                      disabled={!canUnlock}
                      style={{
                        width: "32px", height: "32px", borderRadius: "50%", border: "none",
                        background: canUnlock ? `linear-gradient(135deg, ${branchColor[branch]}, #7c3aed)` : "rgba(255,255,255,0.06)",
                        color: "white", fontSize: "14px", flexShrink: 0,
                        cursor: canUnlock ? "pointer" : "not-allowed",
                      }}
                    >
                      {skill.cost}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillTreePanel;