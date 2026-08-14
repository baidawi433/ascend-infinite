// OfflineProgressPopup.jsx

function OfflineProgressPopup({ offlineReport, onClaim }) {
  if (!offlineReport) return null;

  const hours = Math.floor(offlineReport.elapsedSeconds / 3600);
  const minutes = Math.floor((offlineReport.elapsedSeconds % 3600) / 60);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{ background: "#141420", padding: "30px", borderRadius: "10px", border: "1px solid #8e44ad", maxWidth: "350px", textAlign: "center" }}>
        <h2>👋 WELCOME BACK!</h2>
        <p style={{ color: "#888" }}>You were away for {hours}h {minutes}m</p>
        <p>⚔️ Enemies Defeated: {offlineReport.kills}</p>
        <p>🪙 Gold: +{offlineReport.gold}</p>
        <p>✨ XP: +{offlineReport.xp}</p>
        <button
          onClick={onClaim}
          style={{ marginTop: "15px", padding: "10px 25px", background: "#8e44ad", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" }}
        >
          Claim Rewards
        </button>
      </div>
    </div>
  );
}

export default OfflineProgressPopup;