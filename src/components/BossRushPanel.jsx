// BossRushPanel.jsx
import { useBossRush } from "../game/useBossRush";
import BattleArena from "./BattleArena";
import { formatNumber } from "../game/numberFormat";

const bossEmojiMap = {
  forest_guardian: "🌳", goblin_king: "👑", sand_wyrm: "🐍", desert_tyrant: "🦂",
  frost_queen: "❄️", ice_colossus: "🧊", flame_titan: "🔥", magma_lord: "🌋",
  shadow_knight: "🗡️", abyss_beast: "🐺", necromancer_king: "💀", celestial_serpent: "🐉",
  demon_general: "👹", ancient_dragon: "🐲", void_guardian: "🌌", time_keeper: "⏳",
  fallen_angel: "🪽", world_eater: "🌍", infinity_guardian: "🔱", the_ascended: "♾️",
};

function BossRushPanel({ damage, gameState, setGameState }) {
  function handleRushComplete(bossCount) {
    const reward = bossCount * 500;
    setGameState((prev) => ({ ...prev, gold: prev.gold + reward }));
  }

  const rush = useBossRush(damage, gameState.bossesDefeated, handleRushComplete);

  if (!rush.canStartRush && !rush.isRushing) {
    return (
      <div className="glass-panel" style={{ padding: "18px", marginTop: "14px", maxWidth: "420px", textAlign: "center" }}>
        <div style={{ fontSize: "24px", marginBottom: "6px" }}>🏃</div>
        <h3 style={{ margin: "0 0 6px 0", fontSize: "15px" }}>Boss Rush</h3>
        <p style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>Defeat at least 3 different bosses to unlock this challenge.</p>
      </div>
    );
  }

  if (rush.isRushing && rush.currentBoss) {
    const bossEmoji = bossEmojiMap[rush.currentBoss.id] || "👹";
    return (
      <div className="glass-panel" style={{ padding: "18px", marginTop: "14px", maxWidth: "420px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <h3 style={{ margin: 0, fontSize: "15px" }}>🏃 Boss Rush</h3>
          <span className="hud-pill" style={{ fontSize: "11px" }}>{rush.currentIndex + 1} / {rush.totalBosses}</span>
        </div>

        <BattleArena
          enemyName={`${bossEmoji} ${rush.currentBoss.name}`}
          enemyEmoji={bossEmoji}
          enemyKey={rush.currentBoss.id + rush.currentIndex}
          enemyHp={rush.currentBoss.currentHp}
          enemyMaxHp={rush.currentBoss.hp}
          isCritical={false}
          isDying={false}
          triggerAttackId={0}
          areaId="shadow_realm"
        />

        <div style={{ display: "flex", gap: "8px", marginTop: "-32px", position: "relative", zIndex: 10, justifyContent: "center" }}>
          <button onClick={rush.attackRushBoss} className="fab-attack">⚔️</button>
        </div>

        <button
          onClick={rush.cancelRush}
          style={{ width: "100%", marginTop: "12px", padding: "8px", borderRadius: "var(--radius-pill)", background: "rgba(244,63,94,0.15)", color: "#fb7185", border: "1px solid rgba(244,63,94,0.4)", cursor: "pointer", fontSize: "11px" }}
        >
          Cancel Rush
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: "18px", marginTop: "14px", maxWidth: "420px", textAlign: "center" }}>
      <div style={{ fontSize: "24px", marginBottom: "6px" }}>🏃</div>
      <h3 style={{ margin: "0 0 6px 0", fontSize: "15px" }}>Boss Rush</h3>
      <p style={{ fontSize: "11px", color: "var(--color-text-muted)", marginBottom: "12px" }}>
        Fight all {rush.totalBosses} defeated bosses back-to-back for bonus rewards.
      </p>
      <button
        onClick={rush.startRush}
        style={{ padding: "10px 24px", borderRadius: "var(--radius-pill)", border: "none", background: "linear-gradient(135deg, #f43f5e, #a855f7)", color: "white", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}
      >
        Start Rush
      </button>
    </div>
  );
}

export default BossRushPanel;