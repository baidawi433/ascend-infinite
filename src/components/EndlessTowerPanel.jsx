// EndlessTowerPanel.jsx
import { useEndlessTower } from "../game/useEndlessTower";
import { formatNumber } from "../game/numberFormat";

function EndlessTowerPanel({ damage, gameState, setGameState }) {
  function handleFloorCleared(floor, gold, xp) {
    setGameState((prev) => ({
      ...prev,
      gold: prev.gold + gold,
      xp: prev.xp + xp,
      highestTowerFloor: Math.max(prev.highestTowerFloor, floor),
    }));
  }

  const { currentFloor, enemy, attackTowerEnemy, resetTower } = useEndlessTower(damage, handleFloorCleared);
  const hpPercent = Math.max(0, (enemy.currentHp / enemy.hp) * 100);

  return (
    <div className="glass-panel" style={{ padding: "18px", marginTop: "14px", maxWidth: "420px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h3 style={{ margin: 0, fontSize: "16px" }}>🗼 Endless Tower</h3>
        <span className="hud-pill" style={{ fontSize: "11px", color: "var(--color-accent-purple)" }}>🏆 {gameState.highestTowerFloor}</span>
      </div>

      <div style={{
        borderRadius: "18px", padding: "16px", textAlign: "center",
        background: "radial-gradient(ellipse at center, rgba(168,85,247,0.15), rgba(5,5,15,0.4))",
      }}>
        <div style={{ fontSize: "11px", color: "var(--color-text-muted)", marginBottom: "6px" }}>Floor {currentFloor}</div>
        <div style={{ fontSize: "13px", fontWeight: 700, marginBottom: "10px" }}>{enemy.name}</div>

        <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "var(--radius-pill)", height: "10px", overflow: "hidden", marginBottom: "6px" }}>
          <div style={{ width: `${hpPercent}%`, height: "100%", background: "linear-gradient(90deg, #a855f7, #7c3aed)", transition: "width 0.15s ease" }} />
        </div>
        <div style={{ fontSize: "10px", color: "var(--color-text-muted)" }}>{formatNumber(enemy.currentHp)} / {formatNumber(enemy.hp)} HP</div>
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
        <button
          onClick={attackTowerEnemy}
          style={{ flex: 1, padding: "12px", borderRadius: "var(--radius-pill)", border: "none", background: "linear-gradient(135deg, #a855f7, #7c3aed)", color: "white", fontWeight: 700, cursor: "pointer" }}
        >
          ⚔️ Attack
        </button>
        <button
          onClick={resetTower}
          style={{ padding: "12px 16px", borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border)", background: "rgba(255,255,255,0.04)", color: "var(--color-text-muted)", cursor: "pointer" }}
        >
          🔄
        </button>
      </div>
    </div>
  );
}

export default EndlessTowerPanel;