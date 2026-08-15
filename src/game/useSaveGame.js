// useSaveGame.js
// Menyimpan game state ke localStorage, dan memuat kembali dengan migrasi otomatis
// supaya save lama tetap kompatibel meskipun struktur data berubah

import { useEffect } from "react";
import { initialGameState } from "./GameState";

const SAVE_KEY = "ascend_infinite_save";

// Menggabungkan save lama dengan initialGameState terbaru:
// - Field yang ADA di save lama tetap dipakai (progress tidak hilang)
// - Field yang TIDAK ADA di save lama (fitur baru) diisi dari initialGameState (default)
// - Khusus objek bersarang (equippedItems), digabung juga per-key supaya slot baru tidak hilang
function migrateSave(savedData) {
  const merged = { ...initialGameState, ...savedData };

  // Migrasi khusus: equippedItems (objek bersarang per slot)
  if (savedData.equippedItems && typeof savedData.equippedItems === "object") {
    merged.equippedItems = { ...initialGameState.equippedItems, ...savedData.equippedItems };
  } else {
    merged.equippedItems = initialGameState.equippedItems;
  }

  // Migrasi khusus: array yang wajib berupa array, jaga-jaga kalau tersimpan bukan array
  const arrayFields = ["unlockedSkills", "bossesDefeated", "inventory", "completedQuests", "unlockedAchievements"];
  arrayFields.forEach((field) => {
    if (!Array.isArray(merged[field])) {
      merged[field] = [];
    }
  });

  return merged;
}

export function loadGame() {
  const saved = localStorage.getItem(SAVE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return migrateSave(parsed);
    } catch (err) {
      console.warn("Save data corrupt, starting fresh:", err);
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