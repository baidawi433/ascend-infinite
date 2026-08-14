// SkillTreePanel.jsx
import { skillList } from "../game/skills";
import { canUnlockSkill, unlockSkill } from "../game/useSkillTree";

const branches = ["Strength", "Agility", "Greed", "Vitality"];
const branchEmoji = { Strength: "⚔️", Agility: "⚡", Greed: "💰", Vitality: "🛡️" };

function SkillTreePanel({ gameState, setGameState }) {
  return (
    <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #333", borderRadius: "8px", maxWidth: "400px" }}>
      <h3>🌳 Skill Tree</h3>
      <p>Skill Point: {gameState.skillPoint}</p>

      {branches.map((branch) => (
        <div key={branch} style={{ marginBottom: "16px" }}>
          <h4 style={{ marginBottom: "8px", color: "#ccc" }}>{branchEmoji[branch]} {branch}</h4>

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
                  padding: "10px", marginBottom: "6px",
                  background: isUnlocked ? "#1e3a1e" : "#1a1a2a", borderRadius: "6px",
                }}
              >
                <div>
                  <strong>{statusIcon} {skill.name}</strong>
                  <p style={{ margin: 0, fontSize: "13px", color: "#aaa" }}>{skill.description}</p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>Cost: {skill.cost} SP</p>
                </div>
                {!isUnlocked && (
                  <button
                    onClick={() => unlockSkill(gameState, setGameState, skill.id)}
                    disabled={!canUnlock}
                    style={{
                      padding: "6px 12px", background: canUnlock ? "#8e44ad" : "#444",
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