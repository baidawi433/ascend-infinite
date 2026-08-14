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
    <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #333", borderRadius: "8px", maxWidth: "400px" }}>
      <h3>📜 Quests</h3>
      {questList.map((quest) => {
        const isCompleted = gameState.completedQuests.includes(quest.id);
        const isReady = quest.check(stats) && !isCompleted;
        const progress = quest.getProgress(stats);

        return (
          <div key={quest.id} style={{ padding: "8px", marginBottom: "6px", background: "#141420", borderRadius: "6px" }}>
            <strong>{isCompleted ? "✅" : isReady ? "🎁" : "⏳"} {quest.name}</strong>
            <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
              Progress: {progress} / {quest.goal} · Reward: {quest.reward.gold}g, {quest.reward.skillPoint} SP
            </p>
            {isReady && (
              <button
                onClick={() => claimQuest(quest, gameState, setGameState)}
                style={{ marginTop: "4px", padding: "4px 10px", background: "#27ae60", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px" }}
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
          <div key={ach.id} style={{ padding: "6px 8px", marginBottom: "4px", background: isUnlocked ? "#1e3a1e" : "#141420", borderRadius: "6px", opacity: isUnlocked ? 1 : 0.5 }}>
            {isUnlocked ? "🏆" : "🔒"} {ach.name}
          </div>
        );
      })}
    </div>
  );
}

export default QuestPanel;