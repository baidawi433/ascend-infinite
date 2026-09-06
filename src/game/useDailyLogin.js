// useDailyLogin.js
// Mengatur reward harian dengan sistem streak (7 hari siklus, reward makin besar)

import { useState, useEffect } from "react";

const dailyRewards = [
  { day: 1, gold: 100, skillPoint: 0 },
  { day: 2, gold: 200, skillPoint: 1 },
  { day: 3, gold: 350, skillPoint: 1 },
  { day: 4, gold: 500, skillPoint: 2 },
  { day: 5, gold: 750, skillPoint: 2 },
  { day: 6, gold: 1000, skillPoint: 3 },
  { day: 7, gold: 2000, skillPoint: 5 },
];

function getDateString(timestamp) {
  const d = new Date(timestamp);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function isConsecutiveDay(lastTimestamp, now) {
  const oneDayMs = 24 * 60 * 60 * 1000;
  const diff = now - lastTimestamp;
  return diff >= oneDayMs * 0.5 && diff <= oneDayMs * 2; // toleransi supaya tidak terlalu ketat soal jam pasti
}

export function useDailyLogin(gameState, setGameState) {
  const [showPopup, setShowPopup] = useState(false);
  const [todayReward, setTodayReward] = useState(null);

  useEffect(() => {
    const now = Date.now();
    const lastLogin = gameState.lastLoginTimestamp || 0;
    const todayStr = getDateString(now);
    const lastLoginStr = getDateString(lastLogin);

    if (todayStr === lastLoginStr) return; // sudah login hari ini, tidak perlu popup lagi

    let newStreak = 1;
    if (lastLogin > 0 && isConsecutiveDay(lastLogin, now)) {
      newStreak = ((gameState.loginStreak || 0) % 7) + 1;
    }

    const reward = dailyRewards[newStreak - 1];
    setTodayReward(reward);
    setShowPopup(true);

    setGameState((prev) => ({
      ...prev,
      lastLoginTimestamp: now,
      loginStreak: newStreak,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function claimDailyReward() {
    if (!todayReward) return;
    setGameState((prev) => ({
      ...prev,
      gold: prev.gold + todayReward.gold,
      skillPoint: prev.skillPoint + todayReward.skillPoint,
    }));
    setShowPopup(false);
  }

  return { showPopup, todayReward, claimDailyReward, dailyRewards };
}