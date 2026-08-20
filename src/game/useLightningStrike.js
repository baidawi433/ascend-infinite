// useLightningStrike.js
// Skill aktif Lightning Strike: damage besar instan, cooldown 8 detik

import { useState, useEffect, useCallback, useRef } from "react";

const LIGHTNING_COOLDOWN_MS = 8000;
const LIGHTNING_DAMAGE_MULTIPLIER = 5; // 500% dari damage normal, sesuai dokumen asli

export function useLightningStrike(baseDamage, onStrike) {
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const cooldownIntervalRef = useRef(null);

  const castLightning = useCallback(() => {
    if (cooldownRemaining > 0) return;

    const strikeDamage = Math.floor(baseDamage * LIGHTNING_DAMAGE_MULTIPLIER);
    onStrike(strikeDamage);

    setCooldownRemaining(LIGHTNING_COOLDOWN_MS);
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
  }, [cooldownRemaining, baseDamage, onStrike]);

  useEffect(() => {
    return () => clearInterval(cooldownIntervalRef.current);
  }, []);

  return {
    cooldownRemaining,
    isReady: cooldownRemaining <= 0,
    castLightning,
  };
}