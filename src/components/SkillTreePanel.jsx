// SkillTreePanel.jsx
import { useState } from "react";
import { skillList } from "../game/skills";
import { canUnlockSkill, unlockSkill } from "../game/useSkillTree";
import { canRespec, performRespec, RESPEC_COST } from "../game/useRespec";
import { formatNumber } from "../game/numberFormat";
import SkillNodeTree from "./SkillNodeTree";

const branches = ["Strength", "Agility", "Greed", "Vitality"];
const branchEmoji = { Strength: "⚔️", Agility: "⚡", Greed: "💰", Vitality: "🛡️" };
const branchColor = { Strength: "#f43f5e", Agility: "#22d3ee", Greed: "#fbbf24", Vitality: "#34d399" };

function SkillTreePanel({ gameState, setGameState }) {
  const [selectedSkillId, setSelectedSkillId] = useState(null);
  const respecReady = canRespec(gameState);

  const selectedSkill = skillList.find((s) => s.id === selectedSkillId);
  const isSelectedUnlocked = selectedSkill && gameState.unlockedSkills.includes(selectedSkill.id);
  const canUnlockSelected = selectedSkill && canUnlockSkill(selectedSkill.id, gameState.unlockedSkills, gameState.skillPoint);

  function handleRespec() {
    const confirmed = window.confirm(
      `Reset Skill Tree seharga ${RESPEC_COST} Gold?\n\nSemua skill yang terbuka akan dikunci kembali, tetapi Skill Point yang sudah kamu pakai akan dikembalikan sepenuhnya.`
    );
    if (confirmed) {
      performRespec(gameState, setGameState);
      setSelectedSkillId(null);
    }
  }

  function handleUnlockSelected() {
    unlockSkill(gameState, setGameState, selectedSkill.id);
  }

  return (
    <div className="glass-panel" style={{ padding: "18px", maxWidth: "420px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
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
        <div key={branch} style={{ marginTop: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", justifyContent: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: branchColor[branch] }}>{branch}</span>
          </div>
          <SkillNodeTree
            branchName={branch}
            branchEmoji={branchEmoji[branch]}
            branchColor={branchColor[branch]}
            skills={skillList.filter((s) => s.branch === branch)}
            unlockedSkills={gameState.unlockedSkills}
            skillPoint={gameState.skillPoint}
            selectedSkillId={selectedSkillId}
            onSelectNode={setSelectedSkillId}
          />
        </div>
      ))}

      {/* Kartu detail skill yang dipilih, muncul di bawah, mirip referensi */}
      {selectedSkill && (
        <div
          className="glass-panel"
          style={{
            marginTop: "16px", padding: "14px", maxWidth: "none",
            border: `1px solid ${branchColor[selectedSkill.branch]}55`,
            background: `${branchColor[selectedSkill.branch]}0d`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 800 }}>{selectedSkill.name}</div>
              <div style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "2px" }}>{selectedSkill.description}</div>
            </div>
            <button onClick={() => setSelectedSkillId(null)} style={{ background: "none", border: "none", color: "var(--color-text-muted)", cursor: "pointer", fontSize: "14px" }}>✕</button>
          </div>

          <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {isSelectedUnlocked ? (
              <span style={{ fontSize: "12px", color: branchColor[selectedSkill.branch] }}>✨ Unlocked</span>
            ) : (
              <>
                <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>Cost: {selectedSkill.cost} SP</span>
                <button
                  onClick={handleUnlockSelected}
                  disabled={!canUnlockSelected}
                  style={{
                    padding: "8px 18px", borderRadius: "var(--radius-pill)", border: "none",
                    background: canUnlockSelected ? `linear-gradient(135deg, ${branchColor[selectedSkill.branch]}, #7c3aed)` : "rgba(255,255,255,0.05)",
                    color: "white", fontWeight: 700, fontSize: "12px",
                    cursor: canUnlockSelected ? "pointer" : "not-allowed",
                  }}
                >
                  Unlock
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillTreePanel;