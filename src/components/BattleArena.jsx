// BattleArena.jsx
// Menampilkan karakter dan musuh sebagai "sprite" visual besar dengan animasi

import { useState, useEffect, useRef } from "react";
import { getAreaThemeColor } from "../game/areas";

function BattleArena({ enemyEmoji, enemyKey, isCritical, isDying, triggerAttackId, areaId }) {
  const [playerAnim, setPlayerAnim] = useState("sprite-idle");
  const [enemyAnim, setEnemyAnim] = useState("sprite-idle");
  const prevAttackId = useRef(triggerAttackId);

  useEffect(() => {
    if (triggerAttackId !== prevAttackId.current) {
      prevAttackId.current = triggerAttackId;

      setPlayerAnim("sprite-attacking");
      setEnemyAnim("sprite-hit");

      const timeout = setTimeout(() => {
        setPlayerAnim("sprite-idle");
        setEnemyAnim("sprite-idle");
      }, 350);

      return () => clearTimeout(timeout);
    }
  }, [triggerAttackId]);

  const themeColor = getAreaThemeColor(areaId);

  return (
    <div
      className={isCritical ? "screen-shake" : ""}
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "20px 10px",
        background: `radial-gradient(ellipse at center, ${themeColor} 0%, #0a0a12 100%)`,
        borderRadius: "10px",
        marginBottom: "12px",
        minHeight: "140px",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.4s ease",
      }}
    >
      <div className={playerAnim} style={{ fontSize: "56px", filter: "drop-shadow(0 4px 8px rgba(142,68,173,0.5))" }}>
        🧙
      </div>

      <div style={{ fontSize: "14px", color: "var(--color-text-muted)", fontWeight: "bold" }}>VS</div>

      <div
        key={enemyKey}
        className={isDying ? "sprite-dying" : `${enemyAnim} sprite-spawning`}
        style={{ fontSize: "56px", filter: "drop-shadow(0 4px 8px rgba(231,76,60,0.5))" }}
      >
        {enemyEmoji}
      </div>
    </div>
  );
}

export default BattleArena;