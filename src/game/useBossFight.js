// useBossFight.js
// Mengatur logika combat melawan boss

import { useState, useEffect } from "react";
import { getBossForArea } from "./bosses";

export function useBossFight(damage, areaId, isBossActive, onBossDefeated) {
  const [boss, setBoss] = useState(null);

  // Setiap kali fight boss diaktifkan/area berubah, siapkan boss baru
  useEffect(() => {
    if (isBossActive) {
      setBoss(getBossForArea(areaId));
    } else {
      setBoss(null);
    }
  }, [isBossActive, areaId]);

  function attackBoss() {
    if (!boss) return;

    setBoss((prev) => {
      if (!prev) return prev;
      const newHp = prev.currentHp - damage;

      if (newHp <= 0) {
        onBossDefeated(prev.goldReward, prev.xpReward, prev.skillPointReward);
        return null; // Boss dikalahkan, kembali ke combat biasa
      }

      return { ...prev, currentHp: newHp };
    });
  }

  return { boss, attackBoss };
}