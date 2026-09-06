// DailyLoginPopup.jsx

function DailyLoginPopup({ show, todayReward, dailyRewards, onClaim }) {
  if (!show || !todayReward) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2500, padding: "20px"
    }}>
      <div className="glass-panel" style={{ padding: "24px", maxWidth: "340px", textAlign: "center" }}>
        <div style={{ fontSize: "36px", marginBottom: "8px" }}>🎁</div>
        <h2 style={{ margin: "0 0 4px 0", fontSize: "18px" }}>Daily Reward!</h2>
        <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "16px" }}>Day {todayReward.day} Streak</p>

        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "18px", flexWrap: "wrap" }}>
          {dailyRewards.map((r) => (
            <div
              key={r.day}
              style={{
                width: "36px", height: "36px", borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: 700,
                background: r.day === todayReward.day ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : r.day < todayReward.day ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.05)",
                color: r.day === todayReward.day ? "#1a1200" : r.day < todayReward.day ? "#34d399" : "var(--color-text-muted)",
                border: r.day === todayReward.day ? "2px solid #fbbf24" : "1px solid var(--color-border)",
              }}
            >
              {r.day < todayReward.day ? "✓" : r.day}
            </div>
          ))}
        </div>

        <p style={{ fontSize: "14px", marginBottom: "18px" }}>
          🪙 {todayReward.gold} Gold {todayReward.skillPoint > 0 && `· 🌟 ${todayReward.skillPoint} SP`}
        </p>

        <button
          onClick={onClaim}
          style={{ padding: "12px 32px", borderRadius: "var(--radius-pill)", border: "none", background: "linear-gradient(135deg, #fbbf24, #f59e0b)", color: "#1a1200", fontWeight: 800, fontSize: "14px", cursor: "pointer" }}
        >
          Claim
        </button>
      </div>
    </div>
  );
}

export default DailyLoginPopup;