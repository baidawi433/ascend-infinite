// useAutoAttack.js
// Menjalankan attackEnemy() secara otomatis tiap interval waktu, jika Auto Attack aktif

import { useEffect } from "react";
import { ATTACKS_PER_SECOND } from "./GameState";

export function useAutoAttack(enabled, attackFn) {
  useEffect(() => {
    if (!enabled) return;

    const intervalMs = 1000 / ATTACKS_PER_SECOND;
    const interval = setInterval(() => {
      attackFn();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [enabled, attackFn]);
}