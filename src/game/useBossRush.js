// useBossRush.js
// Mode Boss Rush: lawan semua boss yang sudah pernah dikalahkan, berturut-turut

import { useState } from "react";
import { bossByArea } from "./bosses";

// Ambil daftar semua boss yang sudah pernah dikalahkan pemain, urut dari lemah ke kuat
export function getDefeatedBossQueue(defeatedBossIds) {
  const allBosses = Object.values(bossByArea).flat();
  return allBosses.filter((b) => defeatedBossIds.includes(b.id));
}

export function useBossRush(playerDamage, defeatedBossIds, onRushComplete) {
  const [isRushing, setIsRushing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBoss, setCurrentBoss] = useState(null);

  const queue = getDefeatedBossQueue(defeatedBossIds);

  function startRush() {
    if (queue.length === 0) return;
    setIsRushing(true);
    setCurrentIndex(0);
    // Scale HP boss rush jadi lebih kecil dari HP asli, supaya rush terasa cepat & seru (bukan grind ulang)
    const first = queue[0];
    setCurrentBoss({ ...first, hp: Math.floor(first.hp * 0.4), currentHp: Math.floor(first.hp * 0.4) });
  }

  function attackRushBoss() {
    if (!currentBoss) return;

    setCurrentBoss((prev) => {
      if (!prev) return prev;
      const newHp = prev.currentHp - playerDamage;

      if (newHp <= 0) {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= queue.length) {
          // Semua boss dalam antrian sudah dikalahkan - rush selesai
          setIsRushing(false);
          onRushComplete(queue.length);
          return null;
        }
        setCurrentIndex(nextIndex);
        const next = queue[nextIndex];
        return { ...next, hp: Math.floor(next.hp * 0.4), currentHp: Math.floor(next.hp * 0.4) };
      }

      return { ...prev, currentHp: newHp };
    });
  }

  function cancelRush() {
    setIsRushing(false);
    setCurrentBoss(null);
    setCurrentIndex(0);
  }

  return {
    isRushing, currentBoss, currentIndex, totalBosses: queue.length,
    canStartRush: queue.length >= 3, // minimal 3 boss dikalahkan supaya rush bermakna
    startRush, attackRushBoss, cancelRush,
  };
}