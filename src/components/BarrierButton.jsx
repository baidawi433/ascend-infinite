// BarrierButton.jsx
function BarrierButton({ isActive, cooldownRemaining, cooldownPercent, onActivate }) {
  const ready = cooldownRemaining <= 0 && !isActive;

  return (
    <button
      onClick={onActivate}
      disabled={!ready}
      style={{
        position: "absolute", top: "16px", right: "16px",
        width: "44px", height: "44px", borderRadius: "50%", border: "none",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
        cursor: ready ? "pointer" : "not-allowed",
        background: isActive
          ? "radial-gradient(circle at 35% 30%, #67e8f9, #0891b2 70%)"
          : ready
          ? "linear-gradient(135deg, #22d3ee, #0891b2)"
          : "rgba(255,255,255,0.06)",
        boxShadow: isActive ? "0 0 16px rgba(34,211,238,0.7)" : ready ? "0 4px 14px rgba(34,211,238,0.4)" : "none",
        opacity: ready || isActive ? 1 : 0.5,
        color: "white",
      }}
    >
      {isActive ? "🛡️" : ready ? "🛡️" : `${Math.ceil(cooldownRemaining / 1000)}`}
    </button>
  );
}

export default BarrierButton;