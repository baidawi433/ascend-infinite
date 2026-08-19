// AscendedOverlay.jsx
// Layar cinematic khusus saat mengalahkan The Ascended pertama kali

function AscendedOverlay({ show, onClose }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(ellipse at center, rgba(20,10,40,0.97), rgba(2,2,8,0.99))",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        zIndex: 3000, padding: "20px", textAlign: "center",
      }}
    >
      <div style={{ fontSize: "56px", marginBottom: "16px" }} className="sprite-idle">♾️</div>
      <div
        style={{
          fontSize: "26px", fontWeight: 900, letterSpacing: "1px",
          background: "linear-gradient(90deg, #a855f7, #22d3ee, #fbbf24)",
          WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: "10px",
        }}
      >
        YOU HAVE ASCENDED
      </div>
      <p style={{ fontSize: "13px", color: "var(--color-text-muted)", maxWidth: "300px", fontStyle: "italic", marginBottom: "24px" }}>
        "But true infinity has no end."
      </p>
      <button
        onClick={onClose}
        style={{
          padding: "14px 36px", borderRadius: "var(--radius-pill)", border: "none",
          background: "linear-gradient(135deg, #a855f7, #7c3aed)",
          color: "white", fontWeight: 800, fontSize: "14px", cursor: "pointer",
          boxShadow: "0 10px 30px rgba(168,85,247,0.5)",
        }}
      >
        ENTER INFINITY
      </button>
    </div>
  );
}

export default AscendedOverlay;