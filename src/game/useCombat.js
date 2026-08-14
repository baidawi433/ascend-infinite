// useCombat.js
// Mengatur logika combat, termasuk critical hit dan drop item

import { useState, useEffect } from "react";
import { getRandomEnemy } from "./enemies";
import { rollItemDrop } from "./equipment";

const ITEM_DROP_CHANCE = 0.3;

export function useCombat(damage, areaId, onReward, critChance, critMultiplier, onDamageDealt) {
  const [enemy, setEnemy] = useState(getRandomEnemy(areaId));

  useEffect(() => {
    setEnemy(getRandomEnemy(areaId));
  }, [areaId]);

  function attackEnemy() {
    const isCritical = Math.random() <= critChance;
    const finalDamage = isCritical ? Math.floor(damage * critMultiplier) : damage;

    if (onDamageDealt) {
      onDamageDealt(finalDamage, isCritical);
    }

    setEnemy((prev) => {
      const newHp = prev.currentHp - finalDamage;

      if (newHp <= 0) {
        const droppedItem = Math.random() <= ITEM_DROP_CHANCE ? rollItemDrop() : null;
        onReward(prev.goldReward, prev.xpReward, droppedItem);
        return getRandomEnemy(areaId);
      }

      return { ...prev, currentHp: newHp };
    });
  }

  return { enemy, attackEnemy };
}