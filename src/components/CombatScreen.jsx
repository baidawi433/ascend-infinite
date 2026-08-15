// CombatScreen.jsx
import { useState, useCallback, useEffect, useRef } from "react";
import { useCombat } from "../game/useCombat";
import { useAutoAttack } from "../game/useAutoAttack";
import FloatingDamageNumber from "./FloatingDamageNumber";
import BattleArena from "./BattleArena";
import { playAttackSound, playCriticalSound } from "../game/audio";

const enemyEmojiMap = {
  slime: "🟢", goblin: "👺", wolf: "🐺", bat: "🦇", spider: "🕷️",
  bandit: "🥷", scorpion: "🦂", sand_wraith: "👻",
  ice_wolf: "🐺", frost_bat: "🦇", ice_golem: "🗿",
  fire_imp: "😈", magma_slime: "🟠", flame_hound: "🐕",
  shadow_wolf: "🐺", dark_knight: "🗡️", wraith: "👻",
  skeleton_warrior: "💀", zombie_lord: "🧟", cursed_spirit: "👻",
  lesser_demon: "😈", abyss_stalker: "👹", hellhound: "🐕",
  void_wraith: "🌌", star_eater: "⭐", null_entity: "⚫",
  fallen_seraph: "🪽", light_wraith: "✨", divine_guardian: "😇",
  infinity_spawn: "♾️", reality_shard: "💎", chaos_entity: "🌀",
};

function CombatScreen({ damage, areaId, onReward, autoAttackEnabled, critChance, critMultiplier }) {
  const [floatingNumbers, setFloatingNumbers] = useState([]);
  const [isCritical, setIsCritical] = useState(false);
  const [isDying, setIsDying] = useState(false);
  const attackIdRef = useRef(0);
  const [attackTrigger, setAttackTrigger] = useState(0);

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

  const { enemy, attackEnemy } = useCombat(
    damage, areaId, onReward, critChance, critMultiplier, handleDamageDealt
  );

  useAutoAttack(autoAttackEnabled, attackEnemy);

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
      />

      {/* FAB Attack button - mengambang di bawah tengah arena, sedikit overlap */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "-32px", position: "relative", zIndex: 10 }}>
        <button onClick={attackEnemy} className="fab-attack">
          ⚔️
        </button>
      </div>

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