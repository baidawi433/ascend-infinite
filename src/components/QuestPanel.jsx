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
    <div className="panel-card">
      <h3 style={{ marginTop: 0 }}>📜 Quests</h3>
      {questList.map((quest) => {
        const isCompleted = gameState.completedQuests.includes(quest.id);
        const isReady = quest.check(stats) && !isCompleted;
        const progress = quest.getProgress(stats);

        return (
          <div key={quest.id} style={{ padding: "8px", marginBottom: "6px", background: "#141420", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
            <strong>{isCompleted ? "✅" : isReady ? "🎁" : "⏳"} {quest.name}</strong>
            <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-muted)" }}>
              Progress: {progress} / {quest.goal} · Reward: {quest.reward.gold}g, {quest.reward.skillPoint} SP
            </p>
            {isReady && (
              <button
                onClick={() => claimQuest(quest, gameState, setGameState)}
                style={{ marginTop: "4px", padding: "4px 10px", background: "var(--color-success)", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "12px" }}
              >
                Claim Reward
              </button>
            )}
          </div>
        );
      })}

      <h3 style={{ marginTop: "20px" }}>🏆 Achievements</h3>
      {achievementList.map((ach) => {
        const isUnlocked = gameState.unlockedAchievements.includes(ach.id);
        return (
          <div key={ach.id} style={{ padding: "6px 10px", marginBottom: "4px", background: isUnlocked ? "rgba(39, 174, 96, 0.15)" : "#141420", borderRadius: "8px", opacity: isUnlocked ? 1 : 0.5, border: "1px solid var(--color-border)" }}>
            {isUnlocked ? "🏆" : "🔒"} {ach.name}
          </div>
        );
      })}
    </div>
  );
}

export default QuestPanel;