// useQuestsAndAchievements.js
// Mengecek otomatis apakah achievement baru terbuka

import { useEffect } from "react";
import { achievementList } from "./questsAndAchievements";

export function useAchievementChecker(gameState, setGameState) {
  useEffect(() => {
    const stats = {
      totalKills: gameState.totalKills,
      level: gameState.level,
      bossesDefeated: gameState.bossesDefeated,
      totalGoldEarned: gameState.totalGoldEarned,
      ascensionCount: gameState.ascensionCount,
      unlockedSkills: gameState.unlockedSkills,
      hasLegendaryItem: gameState.inventory.some(
        (item) => item.rarity === "legendary" || item.rarity === "mythic"
      ),
    };

    const newlyUnlocked = achievementList
      .filter((a) => !gameState.unlockedAchievements.includes(a.id))
      .filter((a) => a.check(stats))
      .map((a) => a.id);

    if (newlyUnlocked.length > 0) {
      setGameState((prev) => ({
        ...prev,
        unlockedAchievements: [...prev.unlockedAchievements, ...newlyUnlocked],
      }));
    }
  }, [gameState.totalKills, gameState.level, gameState.bossesDefeated, gameState.totalGoldEarned, gameState.ascensionCount, gameState.unlockedSkills, gameState.inventory, gameState.unlockedAchievements, setGameState]);
}

export function claimQuest(quest, gameState, setGameState) {
  setGameState((prev) => ({
    ...prev,
    gold: prev.gold + (quest.reward.gold || 0),
    skillPoint: prev.skillPoint + (quest.reward.skillPoint || 0),
    completedQuests: [...prev.completedQuests, quest.id],
  }));
}