// QuestPanel.jsx
import { questList, achievementList } from "../game/questsAndAchievements";
import { claimQuest } from "../game/useQuestsAndAchievements";

function QuestPanel({ gameState, setGameState }) {
  const stats = {
    totalKills: gameState.totalKills,
    level: gameState.level,
    bossesDefeated: gameState.bossesDefeated,
  };

  return (
    <div className="glass-panel" style={{ padding: "18px", marginTop: "14px", maxWidth: "420px" }}>
      <h3 style={{ margin: "0 0 12px 0", fontSize: "16px" }}>📜 Quests</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "18px" }}>
        {questList.map((quest) => {
          const isCompleted = gameState.completedQuests.includes(quest.id);
          const isReady = quest.check(stats) && !isCompleted;
          const progress = quest.getProgress(stats);
          const progressPercent = (progress / quest.goal) * 100;

          return (
            <div key={quest.id} style={{ padding: "10px 12px", borderRadius: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: 700 }}>{isCompleted ? "✅" : isReady ? "🎁" : "⏳"} {quest.name}</span>
                {isReady && (
                  <button onClick={() => claimQuest(quest, gameState, setGameState)} style={{ padding: "4px 12px", borderRadius: "var(--radius-pill)", background: "linear-gradient(135deg, #34d399, #059669)", color: "white", border: "none", cursor: "pointer", fontSize: "10px" }}>
                    Claim
                  </button>
                )}
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "var(--radius-pill)", height: "4px", overflow: "hidden", marginTop: "6px" }}>
                <div style={{ width: `${Math.min(100, progressPercent)}%`, height: "100%", background: "var(--color-accent-cyan)" }} />
              </div>
            </div>
          );
        })}
      </div>

      <h3 style={{ margin: "0 0 12px 0", fontSize: "16px" }}>🏆 Achievements</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
        {achievementList.map((ach) => {
          const isUnlocked = gameState.unlockedAchievements.includes(ach.id);
          return (
            <div key={ach.id} style={{
              padding: "10px", borderRadius: "14px", textAlign: "center", fontSize: "11px",
              background: isUnlocked ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${isUnlocked ? "rgba(52,211,153,0.4)" : "var(--color-border)"}`,
              opacity: isUnlocked ? 1 : 0.5,
            }}>
              {isUnlocked ? "🏆" : "🔒"}<br />{ach.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuestPanel;