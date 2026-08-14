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
    <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #9b59b6", borderRadius: "8px", maxWidth: "400px" }}>
      <h3>🗼 Endless Tower</h3>
      <p>🏆 Highest Floor Reached: {gameState.highestTowerFloor}</p>
      <p>Current Floor: {currentFloor}</p>

      <h4>{enemy.name}</h4>
      <div style={{ background: "#222", borderRadius: "4px", overflow: "hidden", height: "20px", marginBottom: "10px" }}>
        <div
          style={{
            width: `${hpPercent}%`,
            background: "linear-gradient(90deg, #9b59b6, #8e44ad)",
            height: "100%",
            transition: "width 0.15s ease",
          }}
        />
      </div>
      <p>{formatNumber(enemy.currentHp)} / {formatNumber(enemy.hp)} HP</p>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={attackTowerEnemy}
          style={{ padding: "10px 20px", background: "#9b59b6", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" }}
        >
          ⚔️ Attack
        </button>
        <button
          onClick={resetTower}
          style={{ padding: "10px 20px", background: "#444", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}
        >
          🔄 Restart
        </button>
      </div>
    </div>
  );
}

export default EndlessTowerPanel;