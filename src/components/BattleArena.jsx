// BattleArena.jsx
import { useState, useEffect, useRef } from "react";
import { getAreaThemeColor } from "../game/areas";
import AnimatedNumber from "./AnimatedNumber";

function BattleArena({ enemyName, enemyEmoji, enemyKey, enemyHp, enemyMaxHp, isCritical, isDying, triggerAttackId, areaId, playerHitClass = "", enemyWarning = false, barrierActive = false }) {
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
  const ringStyle = { background: `conic-gradient(#f43f5e ${hpPercent}%, rgba(255,255,255,0.08) ${hpPercent}%)` };

  return (
    <div
      className={isCritical ? "screen-shake" : ""}
      style={{
        position: "relative",
        background: `radial-gradient(ellipse at center, ${themeColor} 0%, #05050f 100%)`,
        borderRadius: "var(--radius-lg)", marginTop: "8px", minHeight: "260px",
        overflow: "hidden", transition: "background 0.4s ease",
      }}
    >
      <div style={{ position: "absolute", top: "16px", left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontSize: "14px", fontWeight: 700 }}>{enemyName}</div>
        <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
          <AnimatedNumber value={enemyHp} duration={150} /> / <AnimatedNumber value={enemyMaxHp} duration={150} /> HP
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", height: "260px", padding: "0 10px" }}>
        <div style={{ position: "relative" }}>
          {barrierActive && (
            <div style={{
              position: "absolute", top: "-10px", left: "-10px", right: "-10px", bottom: "-10px",
              borderRadius: "50%", border: "2px solid #22d3ee",
              boxShadow: "0 0 16px rgba(34,211,238,0.6), inset 0 0 16px rgba(34,211,238,0.3)",
              pointerEvents: "none",
            }} />
          )}
          <div className={`${playerAnim} ${playerHitClass}`} style={{ fontSize: "56px", filter: "drop-shadow(0 4px 8px rgba(168,85,247,0.5))", position: "relative" }}>
            🧙
          </div>
        </div>

        <div
          key={enemyKey}
          className={isDying ? "sprite-dying" : "sprite-spawning"}
          style={{ width: "110px", height: "110px", borderRadius: "50%", padding: "5px", ...ringStyle, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s ease", position: "relative" }}
        >
          {enemyWarning && (
            <div style={{
              position: "absolute", top: "-6px", right: "-6px",
              fontSize: "20px", animation: "enrageGlow 0.3s ease-in-out infinite",
            }}>
              ⚡
            </div>
          )}
          <div className={enemyAnim} style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#05050f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "44px" }}>
            {enemyEmoji}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BattleArena;