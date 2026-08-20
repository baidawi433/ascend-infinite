// useBarrier.js
// Skill aktif Barrier: mengurangi damage masuk 70% selama 5 detik, cooldown 15 detik

import { useState, useEffect, useCallback, useRef } from "react";

const BARRIER_DURATION_MS = 5000;
const BARRIER_COOLDOWN_MS = 15000;
const BARRIER_REDUCTION = 0.7; // 70% damage reduction

export function useBarrier() {
  const [isActive, setIsActive] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const activeTimeoutRef = useRef(null);
  const cooldownIntervalRef = useRef(null);

  const activateBarrier = useCallback(() => {
    if (cooldownRemaining > 0 || isActive) return;

    setIsActive(true);
    activeTimeoutRef.current = setTimeout(() => setIsActive(false), BARRIER_DURATION_MS);

    setCooldownRemaining(BARRIER_COOLDOWN_MS);
    cooldownIntervalRef.current = setInterval(() => {
      setCooldownRemaining((prev) => {
        const next = prev - 200;
        if (next <= 0) {
          clearInterval(cooldownIntervalRef.current);
          return 0;
        }
        return next;
      });
    }, 200);
  }, [cooldownRemaining, isActive]);

  // Terapkan reduction ke damage masuk kalau barrier aktif
  const mitigateDamage = useCallback((rawDamage) => {
    return isActive ? Math.ceil(rawDamage * (1 - BARRIER_REDUCTION)) : rawDamage;
  }, [isActive]);

  useEffect(() => {
    return () => {
      clearTimeout(activeTimeoutRef.current);
      clearInterval(cooldownIntervalRef.current);
    };
  }, []);

  return {
    isActive,
    cooldownRemaining,
    cooldownPercent: Math.round((cooldownRemaining / BARRIER_COOLDOWN_MS) * 100),
    activateBarrier,
    mitigateDamage,
  };
}