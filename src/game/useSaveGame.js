// useSaveGame.js
// Menyimpan game state ke localStorage setiap ada perubahan,
// dan memuat kembali saat game dibuka ulang

import { useEffect } from "react";
import { initialGameState } from "./GameState";

const SAVE_KEY = "ascend_infinite_save";

export function loadGame() {
  const saved = localStorage.getItem(SAVE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return initialGameState;
    }
  }
  return initialGameState;
}

export function useAutoSave(gameState) {
  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
  }, [gameState]);
}