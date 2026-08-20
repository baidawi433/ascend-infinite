// LightningButton.jsx
function LightningButton({ cooldownRemaining, isReady, onCast }) {
  return (
    <button
      onClick={onCast}
      disabled={!isReady}
      style={{
        position: "absolute", top: "68px", right: "16px",
        width: "44px", height: "44px", borderRadius: "50%", border: "none",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
        cursor: isReady ? "pointer" : "not-allowed",
        background: isReady ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : "rgba(255,255,255,0.06)",
        boxShadow: isReady ? "0 4px 14px rgba(251,191,36,0.4)" : "none",
        opacity: isReady ? 1 : 0.5,
        color: "white",
      }}
    >
      {isReady ? "⚡" : Math.ceil(cooldownRemaining / 1000)}
    </button>
  );
}

export default LightningButton;