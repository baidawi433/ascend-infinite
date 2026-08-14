// useEndlessTower.js
// Mengatur logika naik lantai di Endless Tower

import { useState } from "react";
import { getTowerEnemy } from "./endlessTower";

export function useEndlessTower(damage, onFloorCleared) {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [enemy, setEnemy] = useState(getTowerEnemy(1));

  function attackTowerEnemy() {
    setEnemy((prev) => {
      const newHp = prev.currentHp - damage;

      if (newHp <= 0) {
        onFloorCleared(currentFloor, prev.goldReward, prev.xpReward);
        const nextFloor = currentFloor + 1;
        setCurrentFloor(nextFloor);
        return getTowerEnemy(nextFloor);
      }

      return { ...prev, currentHp: newHp };
    });
  }

  function resetTower() {
    setCurrentFloor(1);
    setEnemy(getTowerEnemy(1));
  }

  return { currentFloor, enemy, attackTowerEnemy, resetTower };
}