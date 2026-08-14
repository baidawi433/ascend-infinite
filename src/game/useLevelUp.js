// useLevelUp.js
// Mengecek apakah XP sudah cukup untuk naik level, lalu menaikkan level otomatis

import { useEffect } from "react";
import { getXpToNextLevel } from "./formulas";

export function useLevelUp(gameState, setGameState) {
  useEffect(() => {
    const xpNeeded = getXpToNextLevel(gameState.level);

    if (gameState.xp >= xpNeeded) {
      setGameState((prev) => ({
        ...prev,
        level: prev.level + 1,
        xp: prev.xp - xpNeeded,
        hp: prev.hp + 20,       // HP bertambah tiap naik level
        skillPoint: prev.skillPoint + 1,
      }));
    }
  }, [gameState.xp, gameState.level, setGameState]);
}