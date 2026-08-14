// useOfflineProgress.js
// Menghitung reward yang didapat selama pemain offline

import { useState, useEffect } from "react";
import { OFFLINE_CAP_HOURS } from "./GameState";

export function calculateOfflineProgress(gameState, goldPerKill, xpPerKill) {
  const now = Date.now();
  const lastSeen = gameState.lastSeenTimestamp || now;
  const elapsedMs = now - lastSeen;

  const cappedMs = Math.min(elapsedMs, OFFLINE_CAP_HOURS * 60 * 60 * 1000);
  const elapsedSeconds = Math.floor(cappedMs / 1000);

  if (elapsedSeconds < 30) {
    // Kurang dari 30 detik dianggap tidak signifikan, tidak perlu tampilkan popup
    return null;
  }

  // Asumsi 1 kill per detik saat auto attack aktif (disederhanakan untuk versi awal)
  const simulatedKills = Math.floor(elapsedSeconds * 0.5); // 1 kill tiap 2 detik, supaya tidak terlalu cepat
  const goldEarned = simulatedKills * goldPerKill;
  const xpEarned = simulatedKills * xpPerKill;

  return {
    elapsedSeconds,
    kills: simulatedKills,
    gold: goldEarned,
    xp: xpEarned,
  };
}

export function useOfflineProgressPopup(gameState, setGameState, goldPerKill, xpPerKill) {
  const [offlineReport, setOfflineReport] = useState(null);

  useEffect(() => {
    const report = calculateOfflineProgress(gameState, goldPerKill, xpPerKill);
    if (report) {
      setOfflineReport(report);
    }
    // Hanya dijalankan sekali saat pertama kali komponen dimuat (saat game dibuka)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function claimOfflineProgress() {
    if (!offlineReport) return;
    setGameState((prev) => ({
      ...prev,
      gold: prev.gold + offlineReport.gold,
      xp: prev.xp + offlineReport.xp,
      totalKills: prev.totalKills + offlineReport.kills,
      totalGoldEarned: prev.totalGoldEarned + offlineReport.gold,
    }));
    setOfflineReport(null);
  }

  return { offlineReport, claimOfflineProgress };
}