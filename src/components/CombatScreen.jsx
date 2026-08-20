// CombatScreen.jsx
import { useState, useCallback, useEffect, useRef } from "react";
import { useCombat } from "../game/useCombat";
import { useAutoAttack } from "../game/useAutoAttack";
import FloatingDamageNumber from "./FloatingDamageNumber";
import { useBarrier } from "../game/useBarrier";
import { useLightningStrike } from "../game/useLightningStrike";
import LightningButton from "./LightningButton";
import BarrierButton from "./BarrierButton";
import BattleArena from "./BattleArena";
import PlayerHpBar from "./PlayerHpBar";
import { playAttackSound, playCriticalSound } from "../game/audio";

const enemyEmojiMap = {
  slime: "🟢", goblin: "👺", wolf: "🐺", bat: "🦇", spider: "🕷️", forest_sprite: "🧚", wild_boar: "🐗",
  bandit: "🥷", scorpion: "🦂", sand_wraith: "👻", desert_jackal: "🐕", mummy: "🧟", sand_worm: "🪱",
  ice_wolf: "🐺", frost_bat: "🦇", ice_golem: "🗿", snow_troll: "🧌", yeti: "🦧", frozen_wraith: "👻",
  fire_imp: "😈", magma_slime: "🟠", flame_hound: "🐕", lava_golem: "🗿", ember_wraith: "👻", cinder_bat: "🦇",
  shadow_wolf: "🐺", dark_knight: "🗡️", wraith: "👻", nightmare_horse: "🐴", shade_assassin: "🥷", void_hound: "🐕",
  skeleton_warrior: "💀", zombie_lord: "🧟", cursed_spirit: "👻", bone_golem: "🗿", grave_wraith: "👻", plague_bearer: "🦠",
  lesser_demon: "😈", abyss_stalker: "👹", hellhound: "🐕", imp_lord: "😈", soul_reaper: "💀", brimstone_beast: "🐐",
  void_wraith: "🌌", star_eater: "⭐", null_entity: "⚫", cosmic_horror: "👁️", dimension_shard: "💎", gravity_wisp: "🌀",
  fallen_seraph: "🪽", light_wraith: "✨", divine_guardian: "😇", star_seraphim: "🌟", radiant_wisp: "✨", holy_construct: "⛪",
  infinity_spawn: "♾️", reality_shard: "💎", chaos_entity: "🌀", paradox_wraith: "👻", eternity_construct: "🗿", unmaker: "⚫",
};

function CombatScreen({ damage, areaId, onReward, autoAttackEnabled, critChance, critMultiplier, playerHp, autoCastEnabled }) {
  const [floatingNumbers, setFloatingNumbers] = useState([]);
  const [isCritical, setIsCritical] = useState(false);
  const [isDying, setIsDying] = useState(false);
  const [isPlayerHit, setIsPlayerHit] = useState(false);
  const attackIdRef = useRef(0);
  const [attackTrigger, setAttackTrigger] = useState(0);
  const [enemyWarning, setEnemyWarning] = useState(false);
  const enemyAttackTimerRef = useRef(null);
  const barrier = useBarrier();
    const lightning = useLightningStrike(damage, (strikeDamage) => {
    handleDamageDealt(strikeDamage, false);
    attackEnemyWithDamage(strikeDamage);
  });

  const handleDamageDealt = useCallback((dmg, critical) => {
    const numberId = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setFloatingNumbers((prev) => [...prev, { id: numberId, damage: dmg, isCritical: critical }]);

    attackIdRef.current += 1;
    setAttackTrigger(attackIdRef.current);

    if (critical) {
      playCriticalSound();
      setIsCritical(true);
      setTimeout(() => setIsCritical(false), 250);
    } else {
      playAttackSound();
    }
  }, []);

  const removeFloatingNumber = useCallback((id) => {
    setFloatingNumbers((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const { enemy, attackEnemy, attackEnemyWithDamage } = useCombat(
    damage, areaId, onReward, critChance, critMultiplier, handleDamageDealt
  );

  useAutoAttack(autoAttackEnabled, attackEnemy);
    useEffect(() => {
    if (!autoCastEnabled) return;
    if (barrier.cooldownRemaining <= 0 && !barrier.isActive && playerHp.currentHp < playerHp.maxHp * 0.5) {
      barrier.activateBarrier();
    }
  }, [autoCastEnabled, barrier, playerHp.currentHp, playerHp.maxHp]);

  useEffect(() => {
    if (!autoCastEnabled || !lightning.isReady) return;
    const randomDelay = 500 + Math.random() * 1500;
    const timeout = setTimeout(() => lightning.castLightning(), randomDelay);
    return () => clearTimeout(timeout);
  }, [autoCastEnabled, lightning]);

  // Musuh menyerang balik otomatis tiap 2.5 detik, selama tidak down
  useEffect(() => {
    if (playerHp.isDown) return;
    enemyAttackTimerRef.current = setInterval(() => {
      setEnemyWarning(true);
      setTimeout(() => {
        setEnemyWarning(false);
        const mitigated = barrier.mitigateDamage(enemy.damage || 1);
        playerHp.takeDamage(mitigated);
        setIsPlayerHit(true);
        setTimeout(() => setIsPlayerHit(false), 300);
      }, 600);
    }, 3200);
    return () => clearInterval(enemyAttackTimerRef.current);
  }, [enemy.damage, playerHp.isDown, playerHp.takeDamage, barrier]);

  const enemyEmoji = enemyEmojiMap[enemy.id] || "👹";

  const prevEnemyIdRef = useRef(enemy.id);
  useEffect(() => {
    if (enemy.currentHp <= 0 && !isDying) {
      setIsDying(true);
    }
    if (enemy.id !== prevEnemyIdRef.current) {
      prevEnemyIdRef.current = enemy.id;
      setIsDying(false);
    }
  }, [enemy, isDying]);

  return (
    <div style={{ position: "relative" }}>
      <BattleArena
        enemyName={enemy.name}
        enemyEmoji={enemyEmoji}
        enemyKey={enemy.id + enemy.hp}
        enemyHp={enemy.currentHp}
        enemyMaxHp={enemy.hp}
        isCritical={isCritical}
        isDying={isDying}
        triggerAttackId={attackTrigger}
        areaId={areaId}
        playerHitClass={isPlayerHit ? "sprite-hit" : ""}
        enemyWarning={enemyWarning}
        barrierActive={barrier.isActive}
      />

      <BarrierButton
        isActive={barrier.isActive}
        cooldownRemaining={barrier.cooldownRemaining}
        cooldownPercent={barrier.cooldownPercent}
        onActivate={barrier.activateBarrier}
      />

      <LightningButton
        cooldownRemaining={lightning.cooldownRemaining}
        isReady={lightning.isReady}
        onCast={lightning.castLightning}
      />

      <PlayerHpBar currentHp={playerHp.currentHp} maxHp={playerHp.maxHp} isDown={playerHp.isDown} />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "-32px", position: "relative", zIndex: 10 }}>
        <button onClick={attackEnemy} className="fab-attack" disabled={playerHp.isDown} style={playerHp.isDown ? { opacity: 0.4, cursor: "not-allowed" } : {}}>
          ⚔️
        </button>
      </div>

      {playerHp.isDown && (
        <p style={{ textAlign: "center", fontSize: "12px", color: "var(--color-danger)", marginTop: "8px" }}>
          😵 You're down! Recovering...
        </p>
      )}

      {floatingNumbers.map((n) => (
        <FloatingDamageNumber
          key={n.id}
          id={n.id}
          damage={n.damage}
          isCritical={n.isCritical}
          onFinish={removeFloatingNumber}
        />
      ))}
    </div>
  );
}

export default CombatScreen;