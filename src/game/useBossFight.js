// useBossFight.js
// Mengatur logika combat melawan boss, mendukung multi-boss per area

import { useState, useEffect } from "react";
import { getBossForArea } from "./bosses";

export function useBossFight(damage, areaId, isBossActive, defeatedBossIds, onBossDefeated) {
  const [boss, setBoss] = useState(null);

  useEffect(() => {
    if (isBossActive) {
      setBoss(getBossForArea(areaId, defeatedBossIds));
    } else {
      setBoss(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBossActive, areaId]);

  function attackBoss() {
    if (!boss) return;

    setBoss((prev) => {
      if (!prev) return prev;
      const newHp = prev.currentHp - damage;

      if (newHp <= 0) {
        onBossDefeated(prev.id, prev.goldReward, prev.xpReward, prev.skillPointReward);
        return null;
      }

      return { ...prev, currentHp: newHp };
    });
  }

  return { boss, attackBoss };
}