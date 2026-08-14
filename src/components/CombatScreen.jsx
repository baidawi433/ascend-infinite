// CombatScreen.jsx
import { useState, useCallback } from "react";
import { useCombat } from "../game/useCombat";
import { useAutoAttack } from "../game/useAutoAttack";
import FloatingDamageNumber from "./FloatingDamageNumber";

function CombatScreen({ damage, areaId, onReward, autoAttackEnabled, critChance, critMultiplier }) {
  const [floatingNumbers, setFloatingNumbers] = useState([]);

  const handleDamageDealt = useCallback((dmg, isCritical) => {
    const numberId = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setFloatingNumbers((prev) => [...prev, { id: numberId, damage: dmg, isCritical }]);
  }, []);

  const removeFloatingNumber = useCallback((id) => {
    setFloatingNumbers((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const { enemy, attackEnemy } = useCombat(
    damage, areaId, onReward, critChance, critMultiplier, handleDamageDealt
  );

  useAutoAttack(autoAttackEnabled, attackEnemy);

  const hpPercent = Math.max(0, (enemy.currentHp / enemy.hp) * 100);

  return (
    <div style={{ position: "relative", marginTop: "30px", padding: "20px", border: "1px solid #333", borderRadius: "8px", maxWidth: "400px", overflow: "hidden" }}>
      <h3>👹 {enemy.name}</h3>
      <div style={{ background: "#222", borderRadius: "4px", overflow: "hidden", height: "20px", marginBottom: "10px" }}>
        <div
          style={{
            width: `${hpPercent}%`,
            background: "#e74c3c",
            height: "100%",
            transition: "width 0.15s ease",
          }}
        />
      </div>
      <p>{enemy.currentHp} / {enemy.hp} HP</p>
      <button
        onClick={attackEnemy}
        style={{ padding: "10px 20px", background: "#8e44ad", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" }}
      >
        ⚔️ Attack
      </button>

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