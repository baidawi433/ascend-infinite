// MainMenu.jsx
import { useState } from "react";

function MainMenu({ hasSaveData, onContinue, onNewGame, onOpenSettings }) {
  const [showConfirmNewGame, setShowConfirmNewGame] = useState(false);

  function handleNewGameClick() {
    if (hasSaveData) {
      setShowConfirmNewGame(true);
    } else {
      onNewGame();
    }
  }

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(ellipse at 50% 30%, #1a0a2e 0%, #05050f 70%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        zIndex: 5000, padding: "20px", overflow: "hidden",
      }}
    >
      {/* Partikel bintang dekoratif di background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: "2px", height: "2px", borderRadius: "50%",
            background: "rgba(255,255,255,0.6)",
            animation: `idleBob ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      <div className="sprite-idle" style={{ fontSize: "48px", marginBottom: "8px" }}>⚔️</div>

      <h1
        style={{
          fontSize: "34px", fontWeight: 900, letterSpacing: "1px", margin: "0 0 4px 0",
          background: "linear-gradient(90deg, #a855f7, #22d3ee, #fbbf24)",
          WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
          textShadow: "0 0 40px rgba(168,85,247,0.4)",
        }}
      >
        ASCEND: INFINITE
      </h1>
      <p style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "40px", fontStyle: "italic" }}>
        Rise. Fall. Ascend. Repeat.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "220px" }}>
        {hasSaveData && (
          <MenuButton onClick={onContinue} primary>▶ Continue</MenuButton>
        )}
        <MenuButton onClick={handleNewGameClick}>🆕 New Game</MenuButton>
        <MenuButton onClick={onOpenSettings}>⚙️ Settings</MenuButton>
      </div>

      <p style={{ position: "absolute", bottom: "16px", fontSize: "10px", color: "var(--color-text-muted)" }}>
        v1.0 · Made with React + Vite
      </p>

      {showConfirmNewGame && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5100,
        }}>
          <div className="glass-panel" style={{ padding: "24px", maxWidth: "300px", textAlign: "center" }}>
            <p style={{ fontSize: "13px", marginBottom: "18px" }}>
              Starting a New Game will permanently erase your current progress. Are you sure?
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                onClick={() => setShowConfirmNewGame(false)}
                style={{ padding: "8px 18px", borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border)", background: "rgba(255,255,255,0.05)", color: "white", cursor: "pointer", fontSize: "12px" }}
              >
                Cancel
              </button>
              <button
                onClick={onNewGame}
                style={{ padding: "8px 18px", borderRadius: "var(--radius-pill)", border: "none", background: "linear-gradient(135deg, #f43f5e, #e11d48)", color: "white", cursor: "pointer", fontSize: "12px" }}
              >
                Erase & Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuButton({ children, onClick, primary }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "13px 20px", borderRadius: "var(--radius-pill)", border: "none",
        background: primary ? "linear-gradient(135deg, #a855f7, #7c3aed)" : "rgba(255,255,255,0.06)",
        color: "white", fontWeight: 700, fontSize: "13px", cursor: "pointer",
        boxShadow: primary ? "0 8px 24px rgba(168,85,247,0.4)" : "none",
        border: primary ? "none" : "1px solid var(--color-border)",
      }}
    >
      {children}
    </button>
  );
}

export default MainMenu;