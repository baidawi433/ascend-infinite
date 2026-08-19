// usePlayerHp.js
// Mengatur HP pemain: menerima damage dari musuh, regen otomatis, dan kondisi "down" saat HP habis

import { useState, useEffect, useRef, useCallback } from "react";

const REGEN_PERCENT_PER_SECOND = 0.02; // regen 2% max HP tiap detik
const DOWN_DURATION_MS = 4000; // durasi "down" saat HP habis, sebelum bangkit lagi dengan HP separuh

export function usePlayerHp(maxHp) {
  const [currentHp, setCurrentHp] = useState(maxHp);
  const [isDown, setIsDown] = useState(false);
  const downTimeoutRef = useRef(null);

  // Kalau maxHp berubah (misal equip item baru), sesuaikan currentHp secara proporsional
  const prevMaxHpRef = useRef(maxHp);
  useEffect(() => {
    if (maxHp !== prevMaxHpRef.current) {
      setCurrentHp((prev) => Math.min(maxHp, Math.max(1, prev + (maxHp - prevMaxHpRef.current))));
      prevMaxHpRef.current = maxHp;
    }
  }, [maxHp]);

  // Regen otomatis tiap detik, kalau tidak sedang down
  useEffect(() => {
    if (isDown) return;
    const interval = setInterval(() => {
      setCurrentHp((prev) => Math.min(maxHp, prev + maxHp * REGEN_PERCENT_PER_SECOND));
    }, 1000);
    return () => clearInterval(interval);
  }, [maxHp, isDown]);

  const takeDamage = useCallback((amount) => {
    setCurrentHp((prev) => {
      const newHp = Math.max(0, prev - amount);
      if (newHp <= 0 && !isDown) {
        setIsDown(true);
        downTimeoutRef.current = setTimeout(() => {
          setIsDown(false);
          setCurrentHp(maxHp * 0.5); // bangkit dengan 50% HP
        }, DOWN_DURATION_MS);
      }
      return newHp;
    });
  }, [maxHp, isDown]);

  useEffect(() => {
    return () => clearTimeout(downTimeoutRef.current);
  }, []);

  return { currentHp: Math.floor(currentHp), maxHp, isDown, takeDamage };
}