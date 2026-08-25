// useBossFight.js
import { useState, useEffect, useRef } from "react";
import { getBossForArea } from "./bosses";

export function useBossFight(damage, areaId, isBossActive, defeatedBossIds, onBossDefeated) {
  const [boss, setBoss] = useState(null);
  const prevIsBossActiveRef = useRef(isBossActive);

  useEffect(() => {
    const justActivated = isBossActive && !prevIsBossActiveRef.current;
    prevIsBossActiveRef.current = isBossActive;

    if (justActivated) {
      setBoss(getBossForArea(areaId, defeatedBossIds));
    } else if (!isBossActive) {
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
        setTimeout(() => onBossDefeated(prev.id, prev.goldReward, prev.xpReward, prev.skillPointReward), 0);
        return null;
      }

      return { ...prev, currentHp: newHp };
    });
  }

  return { boss, attackBoss };
}