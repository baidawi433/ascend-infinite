// BossScreen.jsx

function BossScreen({ boss, attackBoss }) {
  if (!boss) return null;

  const hpPercent = Math.max(0, (boss.currentHp / boss.hp) * 100);

  return (
    <div style={{ marginTop: "30px", padding: "20px", border: "2px solid #e74c3c", borderRadius: "8px", maxWidth: "400px", background: "#1a0a0a" }}>
      <h3>{boss.emoji} BOSS: {boss.name}</h3>
      <div style={{ background: "#222", borderRadius: "4px", overflow: "hidden", height: "24px", marginBottom: "10px" }}>
        <div
          style={{
            width: `${hpPercent}%`,
            background: "linear-gradient(90deg, #e74c3c, #c0392b)",
            height: "100%",
            transition: "width 0.15s ease",
          }}
        />
      </div>
      <p>{boss.currentHp} / {boss.hp} HP</p>
      <button
        onClick={attackBoss}
        style={{ padding: "10px 20px", background: "#c0392b", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" }}
      >
        ⚔️ Attack Boss
      </button>
    </div>
  );
}

export default BossScreen;