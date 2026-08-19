// BattleArena.jsx
// Arena full-bleed dengan radial HP ring di sekeliling musuh

import { useState, useEffect, useRef } from "react";
import { getAreaThemeColor } from "../game/areas";
import AnimatedNumber from "./AnimatedNumber";

function BattleArena({ enemyName, enemyEmoji, enemyKey, enemyHp, enemyMaxHp, isCritical, isDying, triggerAttackId, areaId, playerHitClass = "" }) {
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
  const hpPercent = Math.max(0, Math.min(100, (enemyHp / enemyMaxHp) * 100));

  // Radial ring pakai conic-gradient: merah untuk HP terisi, gelap untuk sisa
  const ringStyle = {
    background: `conic-gradient(#f43f5e ${hpPercent}%, rgba(255,255,255,0.08) ${hpPercent}%)`,
  };

  return (
    <div
      className={isCritical ? "screen-shake" : ""}
      style={{
        position: "relative",
        background: `radial-gradient(ellipse at center, ${themeColor} 0%, #05050f 100%)`,
        borderRadius: "var(--radius-lg)",
        marginTop: "8px",
        minHeight: "260px",
        overflow: "hidden",
        transition: "background 0.4s ease",
      }}
    >
      {/* Nama & HP musuh mengambang di atas */}
      <div style={{ position: "absolute", top: "16px", left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontSize: "14px", fontWeight: 700 }}>{enemyName}</div>
        <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
          <AnimatedNumber value={enemyHp} duration={150} /> / <AnimatedNumber value={enemyMaxHp} duration={150} /> HP
        </div>
      </div>

      {/* Arena tengah: player - vs - enemy dengan radial ring */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", height: "260px", padding: "0 10px" }}>
        <div className={`${playerAnim} ${playerHitClass}`} style={{ fontSize: "56px", filter: "drop-shadow(0 4px 8px rgba(142,68,173,0.5))" }}>
        🧙
      </div>

        {/* Enemy dengan radial HP ring di sekelilingnya */}
        <div
          key={enemyKey}
          className={isDying ? "sprite-dying" : "sprite-spawning"}
          style={{
            width: "110px", height: "110px", borderRadius: "50%",
            padding: "5px",
            ...ringStyle,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.15s ease",
          }}
        >
          <div
            className={enemyAnim}
            style={{
              width: "100%", height: "100%", borderRadius: "50%",
              background: "#05050f",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "44px",
            }}
          >
            {enemyEmoji}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BattleArena;