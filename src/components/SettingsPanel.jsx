// SettingsPanel.jsx
import { useState } from "react";
import { initialGameState } from "../game/GameState";
import { setSfxEnabled, playAttackSound } from "../game/audio";

function SettingsPanel({ gameState, setGameState }) {
  const [importText, setImportText] = useState("");
  const [message, setMessage] = useState("");

  function handleReset() {
    const confirmed = window.confirm("RESET ALL PROGRESS?\n\nSemua progress lokal akan dihapus secara permanen.");
    if (confirmed) {
      setGameState(initialGameState);
      setMessage("Game telah direset.");
    }
  }

  function handleExport() {
    const json = JSON.stringify(gameState);
    const code = btoa(encodeURIComponent(json));
    navigator.clipboard.writeText(code).then(() => {
      setMessage("Save code disalin ke clipboard!");
    }).catch(() => {
      setMessage("Gagal menyalin otomatis. Salin manual di bawah.");
    });
    setImportText(code);
  }

  function handleImport() {
    try {
      const json = decodeURIComponent(atob(importText.trim()));
      setGameState(JSON.parse(json));
      setMessage("Save berhasil dimuat!");
    } catch {
      setMessage("Save code tidak valid.");
    }
  }

  function toggleSfx() {
    const newValue = !gameState.sfxEnabled;
    setSfxEnabled(newValue);
    setGameState((prev) => ({ ...prev, sfxEnabled: newValue }));
    if (newValue) playAttackSound();
  }

  const pillBtn = (bg, color) => ({
    padding: "10px 18px", borderRadius: "var(--radius-pill)", border: "none",
    background: bg, color, cursor: "pointer", fontSize: "12px", fontWeight: 700,
  });

  return (
    <div className="glass-panel" style={{ padding: "18px", marginTop: "14px", maxWidth: "420px" }}>
      <h3 style={{ margin: "0 0 14px 0", fontSize: "16px" }}>⚙️ Settings</h3>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
        <button onClick={toggleSfx} style={pillBtn(gameState.sfxEnabled ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.05)", gameState.sfxEnabled ? "#34d399" : "var(--color-text-muted)")}>
          🔊 SFX {gameState.sfxEnabled ? "ON" : "OFF"}
        </button>
        <button onClick={handleExport} style={pillBtn("rgba(34,211,238,0.2)", "#22d3ee")}>📤 Export</button>
      </div>

      <textarea
        value={importText}
        onChange={(e) => setImportText(e.target.value)}
        placeholder="Paste save code..."
        style={{ width: "100%", height: "56px", background: "rgba(255,255,255,0.03)", color: "white", border: "1px solid var(--color-border)", borderRadius: "14px", padding: "10px", fontSize: "11px", resize: "vertical", boxSizing: "border-box", marginBottom: "8px" }}
      />
      <button onClick={handleImport} style={{ ...pillBtn("rgba(52,211,153,0.2)", "#34d399"), width: "100%", marginBottom: "12px" }}>📥 Import Save</button>

      {message && <p style={{ fontSize: "11px", color: "var(--color-accent-gold)", textAlign: "center" }}>{message}</p>}

      <button onClick={handleReset} style={{ ...pillBtn("rgba(244,63,94,0.2)", "#fb7185"), width: "100%" }}>🗑️ Reset All Progress</button>
    </div>
  );
}

export default SettingsPanel;