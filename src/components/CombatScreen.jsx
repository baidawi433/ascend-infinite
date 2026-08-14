// CombatScreen.jsx
import { useState, useCallback } from "react";
import { useCombat } from "../game/useCombat";
import { useAutoAttack } from "../game/useAutoAttack";
import FloatingDamageNumber from "./FloatingDamageNumber";
import { formatNumber } from "../game/numberFormat";

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
    <div className="panel-card" style={{ position: "relative", overflow: "hidden" }}>
      <h3 style={{ marginTop: 0 }}>👹 {enemy.name}</h3>
      <div style={{ background: "#0a0a12", borderRadius: "6px", overflow: "hidden", height: "22px", marginBottom: "10px", border: "1px solid #2a2a3a" }}>
        <div
          className="hp-bar-glow"
          style={{
            width: `${hpPercent}%`,
            background: "linear-gradient(90deg, #e74c3c, #c0392b)",
            height: "100%",
            transition: "width 0.15s ease",
          }}
        />
      </div>
      <p style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
        {formatNumber(enemy.currentHp)} / {formatNumber(enemy.hp)} HP
      </p>
      <button
        onClick={attackEnemy}
        style={{ padding: "12px 24px", background: "var(--color-accent-purple)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}
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