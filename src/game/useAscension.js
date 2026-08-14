// useAscension.js
// Mengatur logika Ascension: reset progress, beri bonus permanen

import { initialGameState, ASCENSION_LEVEL_REQUIREMENT } from "./GameState";

export function canAscend(gameState) {
  return gameState.level >= ASCENSION_LEVEL_REQUIREMENT;
}

// Bonus permanen (dalam persen) berdasarkan jumlah ascension yang sudah dilakukan
// Rumus sederhana: makin banyak ascend, makin besar bonus, tapi growth-nya melambat
export function getGlobalBonusPercent(ascensionCount) {
  return ascensionCount * 10; // Ascension 1 = +10%, Ascension 2 = +20%, dst
}

export function performAscension(gameState, setGameState) {
  if (!canAscend(gameState)) return;

  const soulGained = 1 + Math.floor(gameState.level / 10);
  const ascensionPointGained = 5;

  setGameState((prev) => ({
    ...initialGameState,               // reset semua progress dasar
    soul: prev.soul + soulGained,       // tapi Soul tetap bertambah
    ascensionCount: prev.ascensionCount + 1,
    ascensionPoint: prev.ascensionPoint + ascensionPointGained,
    unlockedSkills: [],                // skill juga direset (sesuai desain awal)
  }));
}