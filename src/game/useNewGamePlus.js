// useNewGamePlus.js
// Mengatur logika New Game+ - reset lebih dalam dari Ascension, tapi permanen lebih kuat

import { initialGameState } from "./GameState";

export function canStartNewGamePlus(gameState) {
  return gameState.infinityModeUnlocked;
}

// Bonus permanen dari NG+ jauh lebih besar per tingkat dibanding Ascension biasa
export function getNewGamePlusBonusPercent(ngPlusCount) {
  return ngPlusCount * 100; // NG+1 = +100%, NG+2 = +200%, dst - jauh lebih besar dari ascension bonus
}

export function performNewGamePlus(gameState, setGameState) {
  if (!canStartNewGamePlus(gameState)) return;

  setGameState((prev) => ({
    ...initialGameState,
    newGamePlusCount: prev.newGamePlusCount + 1,
    infinityModeUnlocked: true, // tetap terbuka, tidak perlu kalahkan The Ascended lagi
    unlockedAchievements: prev.unlockedAchievements, // achievement tetap permanen
    highestTowerFloor: prev.highestTowerFloor, // rekor tower tetap permanen
  }));
}