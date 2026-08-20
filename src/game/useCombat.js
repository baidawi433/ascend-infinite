// useCombat.js
import { useState, useEffect } from "react";
import { getRandomEnemy } from "./enemies";
import { rollItemDrop } from "./equipment";
import { rollMaterialDrop } from "./materials";

const ITEM_DROP_CHANCE = 0.3;
const MATERIAL_DROP_CHANCE = 0.35;

export function useCombat(damage, areaId, onReward, critChance, critMultiplier, onDamageDealt) {
  const [enemy, setEnemy] = useState(getRandomEnemy(areaId));

  useEffect(() => {
    setEnemy(getRandomEnemy(areaId));
  }, [areaId]);

  function dealDamageToEnemy(finalDamage) {
    setEnemy((prev) => {
      const newHp = prev.currentHp - finalDamage;
      if (newHp <= 0) {
        const droppedItem = Math.random() <= ITEM_DROP_CHANCE ? rollItemDrop() : null;
        const droppedMaterial = Math.random() <= MATERIAL_DROP_CHANCE ? rollMaterialDrop() : null;
        onReward(prev.goldReward, prev.xpReward, droppedItem, droppedMaterial);
        return getRandomEnemy(areaId);
      }
      return { ...prev, currentHp: newHp };
    });
  }

  function attackEnemy() {
    const isCritical = Math.random() <= critChance;
    const finalDamage = isCritical ? Math.floor(damage * critMultiplier) : damage;
    if (onDamageDealt) onDamageDealt(finalDamage, isCritical);
    dealDamageToEnemy(finalDamage);
  }

  function attackEnemyWithDamage(customDamage) {
    dealDamageToEnemy(customDamage);
  }

  return { enemy, attackEnemy, attackEnemyWithDamage };
}