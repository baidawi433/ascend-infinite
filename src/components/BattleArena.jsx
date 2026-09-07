// BattleArena.jsx
import { useState, useEffect, useRef, useMemo } from "react";
import { getAreaThemeColor } from "../game/areas";
import AnimatedNumber from "./AnimatedNumber";

const FAR_DISTANCE_PERCENT = 82;
const NEAR_DISTANCE_PERCENT = 58;
const APPROACH_STEP = 2.2;
const APPROACH_INTERVAL_MS = 400;

// Untuk boss, mendekat lebih cepat dan lebih dekat, supaya terasa lebih mengancam
const BOSS_NEAR_DISTANCE_PERCENT = 50;
const BOSS_APPROACH_STEP = 3.2;
const BOSS_APPROACH_INTERVAL_MS = 300;

function AmbientParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: (5 + Math.random() * 40) + "%",
      bottom: (Math.random() * 40) + "%",
      size: 2 + Math.random() * 3,
      duration: 4 + Math.random() * 5,
      delay: Math.random() * 5,
      drift: ((Math.random() - 0.5) * 40) + "px",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {particles.map((p) => {
        const style = {
          left: p.left,
          bottom: p.bottom,
          width: p.size + "px",
          height: p.size + "px",
          background: "rgba(255,255,255,0.5)",
          boxShadow: "0 0 4px rgba(255,255,255,0.4)",
          animationDuration: p.duration + "s",
          animationDelay: p.delay + "s",
        };
        style["--drift"] = p.drift;
        return <div key={p.id} className="ambient-particle" style={style} />;
      })}
    </>
  );
}

function BattleArena(props) {
  const enemyName = props.enemyName;
  const enemyEmoji = props.enemyEmoji;
  const enemyKey = props.enemyKey;
  const enemyHp = props.enemyHp;
  const enemyMaxHp = props.enemyMaxHp;
  const isCritical = props.isCritical;
  const isDying = props.isDying;
  const triggerAttackId = props.triggerAttackId;
  const areaId = props.areaId;
  const playerHitClass = props.playerHitClass || "";
  const enemyWarning = props.enemyWarning || false;
  const barrierActive = props.barrierActive || false;
  const petEmoji = props.petEmoji || null;
  const isBoss = props.isBoss || false;

  const nearDistance = isBoss ? BOSS_NEAR_DISTANCE_PERCENT : NEAR_DISTANCE_PERCENT;
  const approachStep = isBoss ? BOSS_APPROACH_STEP : APPROACH_STEP;
  const approachInterval = isBoss ? BOSS_APPROACH_INTERVAL_MS : APPROACH_INTERVAL_MS;

  const [playerAnim, setPlayerAnim] = useState("sprite-idle");
  const [enemyHitAnim, setEnemyHitAnim] = useState("");
  const [enemyDistance, setEnemyDistance] = useState(FAR_DISTANCE_PERCENT);
  const prevAttackId = useRef(triggerAttackId);
  const prevEnemyKeyRef = useRef(enemyKey);

  useEffect(() => {
    if (enemyKey !== prevEnemyKeyRef.current) {
      prevEnemyKeyRef.current = enemyKey;
      setEnemyDistance(FAR_DISTANCE_PERCENT);
    }
  }, [enemyKey]);

  useEffect(() => {
    if (isDying) return;
    const interval = setInterval(() => {
      setEnemyDistance((prev) => Math.max(nearDistance, prev - approachStep));
    }, approachInterval);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDying, enemyKey]);

  useEffect(() => {
    if (triggerAttackId !== prevAttackId.current) {
      prevAttackId.current = triggerAttackId;
      setPlayerAnim("sprite-charge-attack");
      setEnemyHitAnim("sprite-hit hit-stop-flash");
      const timeout = setTimeout(() => {
        setPlayerAnim("sprite-idle");
        setEnemyHitAnim("");
      }, 450);
      return () => clearTimeout(timeout);
    }
  }, [triggerAttackId]);

  const themeColor = getAreaThemeColor(areaId);
  const hpPercent = Math.max(0, Math.min(100, (enemyHp / enemyMaxHp) * 100));
  const ringStyle = { background: "conic-gradient(#f43f5e " + hpPercent + "%, rgba(255,255,255,0.08) " + hpPercent + "%)" };

  const chargeDistancePx = Math.max(50, (enemyDistance - 30) * 2.2);
  const isEnemyClose = enemyDistance <= nearDistance + 3;

  const playerWrapperStyle = { position: "relative" };
  playerWrapperStyle["--charge-distance"] = chargeDistancePx + "px";

  const playerSpriteStyle = {
    fontSize: "56px",
    filter: "drop-shadow(0 4px 8px rgba(168,85,247,0.5))",
    position: "relative",
  };
  playerSpriteStyle["--charge-distance"] = chargeDistancePx + "px";

  return (
    <div
      className={isCritical ? "screen-shake" : ""}
      style={{
        position: "relative",
        background: "radial-gradient(ellipse at center, " + themeColor + " 0%, #05050f 100%)",
        borderRadius: "var(--radius-lg)",
        marginTop: "8px",
        minHeight: "260px",
        overflow: "hidden",
        transition: "background 0.4s ease",
      }}
    >
      <AmbientParticles />

      <div style={{ position: "absolute", top: "16px", left: 0, right: 0, textAlign: "center", zIndex: 5 }}>
        <div style={{ fontSize: "14px", fontWeight: 700 }}>{enemyName}</div>
        <div style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
          <AnimatedNumber value={enemyHp} duration={150} /> / <AnimatedNumber value={enemyMaxHp} duration={150} /> HP
        </div>
        {isEnemyClose && (
          <div style={{ fontSize: "10px", color: "var(--color-danger)", fontWeight: 700, marginTop: "2px" }}>
            ⚠️ Enemy is closing in!
          </div>
        )}
      </div>

      <div style={{ position: "absolute", bottom: "38px", left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.08)" }} />

      <div style={{ position: "relative", height: "260px" }}>
        <div style={{ position: "absolute", left: "28%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <div style={playerWrapperStyle}>
            {barrierActive && (
              <div style={{
                position: "absolute", top: "-10px", left: "-10px", right: "-10px", bottom: "-10px",
                borderRadius: "50%", border: "2px solid #22d3ee",
                boxShadow: "0 0 16px rgba(34,211,238,0.6), inset 0 0 16px rgba(34,211,238,0.3)",
                pointerEvents: "none",
              }} />
            )}
            <div className={playerAnim + " " + playerHitClass} style={playerSpriteStyle}>
              🧙
            </div>
            {petEmoji && (
              <div className="sprite-idle" style={{ position: "absolute", bottom: "-6px", right: "-16px", fontSize: "26px" }}>
                {petEmoji}
              </div>
            )}
          </div>
        </div>

        <div
          className="enemy-approach-wrapper"
          style={{ position: "absolute", left: enemyDistance + "%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <div
            key={enemyKey}
            className={isDying ? "sprite-dying" : "sprite-spawning"}
            style={{ width: isBoss ? "120px" : "100px", height: isBoss ? "120px" : "100px", borderRadius: "50%", padding: "5px", background: ringStyle.background, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s ease", position: "relative" }}
          >
            {enemyWarning && (
              <div style={{ position: "absolute", top: "-6px", right: "-6px", fontSize: isBoss ? "22px" : "18px", animation: "enrageGlow 0.3s ease-in-out infinite" }}>
                ⚡
              </div>
            )}
            <div className={"sprite-enemy-idle " + enemyHitAnim} style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#05050f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isBoss ? "50px" : "40px" }}>
              {enemyEmoji}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BattleArena;