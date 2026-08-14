// SettingsPanel.jsx
import { useState } from "react";
import { initialGameState } from "../game/GameState";

function SettingsPanel({ gameState, setGameState }) {
  const [importText, setImportText] = useState("");
  const [message, setMessage] = useState("");

  function handleReset() {
    const confirmed = window.confirm(
      "RESET ALL PROGRESS?\n\nSemua progress lokal akan dihapus secara permanen. Tindakan ini tidak bisa dibatalkan."
    );
    if (confirmed) {
      setGameState(initialGameState);
      setMessage("Game telah direset.");
    }
  }

  function handleExport() {
    // Encode data game menjadi teks base64 sederhana (bukan enkripsi asli, hanya untuk save code)
    const json = JSON.stringify(gameState);
    const code = btoa(encodeURIComponent(json));
    navigator.clipboard.writeText(code).then(() => {
      setMessage("Save code disalin ke clipboard! Simpan di tempat aman.");
    }).catch(() => {
      setMessage("Gagal menyalin otomatis. Salin manual dari kotak di bawah.");
    });
    setImportText(code);
  }

  function handleImport() {
    try {
      const json = decodeURIComponent(atob(importText.trim()));
      const parsed = JSON.parse(json);
      setGameState(parsed);
      setMessage("Save berhasil dimuat!");
    } catch {
      setMessage("Save code tidak valid. Periksa kembali kode yang kamu masukkan.");
    }
  }

  return (
    <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #333", borderRadius: "8px", maxWidth: "400px" }}>
      <h3>⚙️ Settings</h3>

      <div style={{ marginBottom: "16px" }}>
        <button
          onClick={handleExport}
          style={{ padding: "8px 16px", background: "#3498db", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", marginRight: "8px" }}
        >
          📤 Export Save
        </button>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <textarea
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder="Paste save code di sini..."
          style={{ width: "100%", height: "60px", background: "#141420", color: "white", border: "1px solid #333", borderRadius: "6px", padding: "8px", fontSize: "12px", resize: "vertical", boxSizing: "border-box" }}
        />
        <button
          onClick={handleImport}
          style={{ marginTop: "6px", padding: "8px 16px", background: "#27ae60", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          📥 Import Save
        </button>
      </div>

      {message && (
        <p style={{ fontSize: "13px", color: "#f1c40f" }}>{message}</p>
      )}

      <button
        onClick={handleReset}
        style={{ padding: "8px 16px", background: "#c0392b", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
      >
        🗑️ Reset All Progress
      </button>
    </div>
  );
}

export default SettingsPanel;