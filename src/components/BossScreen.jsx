// BossScreen.jsx
import { useState, useCallback, useEffect, useRef } from "react";
import { formatNumber } from "../game/numberFormat";
import { useAutoAttack } from "../game/useAutoAttack";
import { playAttackSound, playCriticalSound } from "../game/audio";

const bossEmojiMap = {
  forest_guardian: "🌳", sand_wyrm: "🐍", frost_queen: "❄️", flame_titan: "🔥",
  shadow_knight: "🗡️", necromancer_king: "💀", demon_general: "👹",
  void_guardian: "🌌", fallen_angel: "🪽", the_ascended: "♾️",
};

function BossScreen({ boss, attackBoss, autoAttackEnabled }) {
  const [isShaking, setIsShaking] = useState(false);
  const [playerAnim, setPlayerAnim] = useState("sprite-idle");
  const attackIdRef = useRef(0);

  const handleAttack = useCallback(() => {
    attackIdRef.current += 1;
    playAttackSound();

    setPlayerAnim("sprite-attacking");
    setIsShaking(true);
    setTimeout(() => {
      setPlayerAnim("sprite-idle");
      setIsShaking(false);
    }, 300);

    attackBoss();
  }, [attackBoss]);

  useAutoAttack(autoAttackEnabled && !!boss, handleAttack);

  if (!boss) return null;

  const hpPercent = Math.max(0, (boss.currentHp / boss.hp) * 100);
  const isEnraged = hpPercent <= 30;
  const bossEmoji = bossEmojiMap[boss.id] || boss.emoji || "👹";

  return (
    <div className="panel-card" style={{ border: "2px solid var(--color-danger)", background: "#1a0a0a" }}>
      <h3 style={{ marginTop: 0 }}>{bossEmoji} BOSS: {boss.name}</h3>

      {isEnraged && (
        <p className="boss-enrage-text" style={{ color: "var(--color-danger)", fontWeight: "bold", textAlign: "center", margin: "0 0 10px 0" }}>
          ⚠️ BOSS ENRAGED! ⚠️
        </p>
      )}

      <div
        className={isShaking ? "boss-screen-shake" : ""}
        style={{
          display: "flex", justifyContent: "space-around", alignItems: "center",
          padding: "20px 10px", background: "radial-gradient(ellipse at center, #2a0a0a 0%, #0a0a12 100%)",
          borderRadius: "10px", marginBottom: "12px", minHeight: "160px",
        }}
      >
        <div className={playerAnim} style={{ fontSize: "56px", filter: "drop-shadow(0 4px 8px rgba(142,68,173,0.5))" }}>
          🧙
        </div>
        <div style={{ fontSize: "14px", color: "var(--color-text-muted)", fontWeight: "bold" }}>VS</div>
        <div style={{ fontSize: "80px", filter: `drop-shadow(0 4px 12px rgba(231,76,60,${isEnraged ? 0.9 : 0.5}))` }}>
          {bossEmoji}
        </div>
      </div>

      <div style={{ background: "#0a0a12", borderRadius: "6px", overflow: "hidden", height: "26px", marginBottom: "10px", border: "1px solid #3a1a1a" }}>
        <div
          style={{
            width: `${hpPercent}%`,
            background: isEnraged ? "linear-gradient(90deg, #ff4d4d, #c0392b)" : "linear-gradient(90deg, #e74c3c, #c0392b)",
            height: "100%",
            transition: "width 0.15s ease",
            boxShadow: `0 0 ${isEnraged ? 16 : 10}px rgba(231, 76, 60, 0.6)`,
          }}
        />
      </div>
      <p style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
        {formatNumber(boss.currentHp)} / {formatNumber(boss.hp)} HP
      </p>
      <button
        onClick={handleAttack}
        style={{ padding: "12px 24px", background: "var(--color-danger)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}
      >
        ⚔️ Attack Boss
      </button>
    </div>
  );
}

export default BossScreen;