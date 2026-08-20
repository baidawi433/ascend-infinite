// BossScreen.jsx
import { useState, useCallback, useEffect } from "react";
import { useAutoAttack } from "../game/useAutoAttack";
import { playAttackSound } from "../game/audio";
import { useBarrier } from "../game/useBarrier";
import BattleArena from "./BattleArena";
import PlayerHpBar from "./PlayerHpBar";
import BarrierButton from "./BarrierButton";

const bossEmojiMap = {
  forest_guardian: "🌳", goblin_king: "👑", sand_wyrm: "🐍", desert_tyrant: "🦂",
  frost_queen: "❄️", ice_colossus: "🧊", flame_titan: "🔥", magma_lord: "🌋",
  shadow_knight: "🗡️", abyss_beast: "🐺", necromancer_king: "💀", celestial_serpent: "🐉",
  demon_general: "👹", ancient_dragon: "🐲", void_guardian: "🌌", time_keeper: "⏳",
  fallen_angel: "🪽", world_eater: "🌍", infinity_guardian: "🔱", the_ascended: "♾️",
};

function BossScreen({ boss, attackBoss, autoAttackEnabled, areaId, playerHp }) {
  const [isShaking, setIsShaking] = useState(false);
  const [isPlayerHit, setIsPlayerHit] = useState(false);
  const [attackTrigger, setAttackTrigger] = useState(0);
  const [enemyWarning, setEnemyWarning] = useState(false);
  const barrier = useBarrier();

  const handleAttack = useCallback(() => {
    setAttackTrigger((prev) => prev + 1);
    playAttackSound();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);
    attackBoss();
  }, [attackBoss]);

  useAutoAttack(autoAttackEnabled && !!boss, handleAttack);

  useEffect(() => {
    if (!boss || playerHp.isDown) return;
    const interval = setInterval(() => {
      setEnemyWarning(true);
      setTimeout(() => {
        setEnemyWarning(false);
        const mitigated = barrier.mitigateDamage(boss.damage || 5);
        playerHp.takeDamage(mitigated);
        setIsPlayerHit(true);
        setTimeout(() => setIsPlayerHit(false), 300);
      }, 600);
    }, 2000);
    return () => clearInterval(interval);
  }, [boss, playerHp.isDown, playerHp.takeDamage, barrier]);

  if (!boss) return null;

  const hpPercent = Math.max(0, (boss.currentHp / boss.hp) * 100);
  const isEnraged = hpPercent <= 30;
  const bossEmoji = bossEmojiMap[boss.id] || boss.emoji || "👹";

  return (
    <div style={{ position: "relative" }}>
      {isEnraged && (
        <p className="boss-enrage-text" style={{ color: "var(--color-danger)", fontWeight: "bold", textAlign: "center", margin: "0 0 6px 0", fontSize: "13px" }}>
          ⚠️ BOSS ENRAGED! ⚠️
        </p>
      )}

      <div className={isShaking ? "boss-screen-shake" : ""}>
        <BattleArena
          enemyName={`${bossEmoji} ${boss.name}`}
          enemyEmoji={bossEmoji}
          enemyKey={boss.id}
          enemyHp={boss.currentHp}
          enemyMaxHp={boss.hp}
          isCritical={false}
          isDying={false}
          triggerAttackId={attackTrigger}
          areaId={areaId}
          playerHitClass={isPlayerHit ? "sprite-hit" : ""}
          enemyWarning={enemyWarning}
          barrierActive={barrier.isActive}
        />
      </div>

      <PlayerHpBar currentHp={playerHp.currentHp} maxHp={playerHp.maxHp} isDown={playerHp.isDown} />

      <BarrierButton
        isActive={barrier.isActive}
        cooldownRemaining={barrier.cooldownRemaining}
        cooldownPercent={barrier.cooldownPercent}
        onActivate={barrier.activateBarrier}
      />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "-32px", position: "relative", zIndex: 10 }}>
        <button
          onClick={handleAttack}
          className="fab-attack"
          disabled={playerHp.isDown}
          style={{
            background: "radial-gradient(circle at 35% 30%, #fb7185, #e11d48 70%)",
            boxShadow: "0 0 0 4px rgba(244,63,94,0.25), 0 12px 28px rgba(225,29,72,0.5)",
            ...(playerHp.isDown ? { opacity: 0.4, cursor: "not-allowed" } : {}),
          }}
        >
          ⚔️
        </button>
      </div>

      {playerHp.isDown && (
        <p style={{ textAlign: "center", fontSize: "12px", color: "var(--color-danger)", marginTop: "8px" }}>
          😵 You're down! Recovering...
        </p>
      )}
    </div>
  );
}

export default BossScreen;