// useRespec.js
// Mengatur logika reset skill tree (respec)

import { skillList } from "./skills";

export const RESPEC_COST = 500; // biaya Gold untuk respec

export function canRespec(gameState) {
  return gameState.unlockedSkills.length > 0 && gameState.gold >= RESPEC_COST;
}

export function performRespec(gameState, setGameState) {
  if (!canRespec(gameState)) return;

  // Hitung total Skill Point yang sudah dipakai dari skill yang terbuka, untuk dikembalikan
  const refundedPoints = skillList
    .filter((s) => gameState.unlockedSkills.includes(s.id))
    .reduce((total, s) => total + s.cost, 0);

  setGameState((prev) => ({
    ...prev,
    gold: prev.gold - RESPEC_COST,
    unlockedSkills: [],
    skillPoint: prev.skillPoint + refundedPoints,
  }));
}