// MenuSettingsPanel.jsx
import { setSfxEnabled } from "../game/audio";

const graphicsQualityOptions = ["Low", "Medium", "High"];

function MenuSettingsPanel({ settings, setSettings, onBack }) {
  function toggleSfx() {
    const newValue = !settings.sfxEnabled;
    setSfxEnabled(newValue);
    setSettings((prev) => ({ ...prev, sfxEnabled: newValue }));
  }

  function setGraphicsQuality(quality) {
    setSettings((prev) => ({ ...prev, graphicsQuality: quality }));
  }

  function toggleParticles() {
    setSettings((prev) => ({ ...prev, particlesEnabled: !prev.particlesEnabled }));
  }

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(ellipse at 50% 30%, #1a0a2e 0%, #05050f 70%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        zIndex: 5000, padding: "20px",
      }}
    >
      <div className="glass-panel" style={{ padding: "24px", width: "280px" }}>
        <h2 style={{ margin: "0 0 20px 0", fontSize: "18px", textAlign: "center" }}>⚙️ Settings</h2>

        <div style={{ marginBottom: "18px" }}>
          <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "8px" }}>Audio</div>
          <button
            onClick={toggleSfx}
            className="hud-pill"
            style={{ width: "100%", justifyContent: "center", background: settings.sfxEnabled ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.05)", color: settings.sfxEnabled ? "#34d399" : "var(--color-text-muted)", border: "none", cursor: "pointer" }}
          >
            🔊 Sound Effects: {settings.sfxEnabled ? "ON" : "OFF"}
          </button>
        </div>

        <div style={{ marginBottom: "18px" }}>
          <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "8px" }}>Graphics Quality</div>
          <div style={{ display: "flex", gap: "6px" }}>
            {graphicsQualityOptions.map((q) => (
              <button
                key={q}
                onClick={() => setGraphicsQuality(q)}
                style={{
                  flex: 1, padding: "8px", borderRadius: "10px", border: "none", fontSize: "11px", cursor: "pointer",
                  background: settings.graphicsQuality === q ? "linear-gradient(135deg, #a855f7, #7c3aed)" : "rgba(255,255,255,0.05)",
                  color: "white",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "8px" }}>Effects</div>
          <button
            onClick={toggleParticles}
            className="hud-pill"
            style={{ width: "100%", justifyContent: "center", background: settings.particlesEnabled ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.05)", color: settings.particlesEnabled ? "#34d399" : "var(--color-text-muted)", border: "none", cursor: "pointer" }}
          >
            ✨ Particle Effects: {settings.particlesEnabled ? "ON" : "OFF"}
          </button>
        </div>

        <button
          onClick={onBack}
          style={{ width: "100%", padding: "11px", borderRadius: "var(--radius-pill)", border: "1px solid var(--color-border)", background: "rgba(255,255,255,0.05)", color: "white", cursor: "pointer", fontSize: "12px" }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default MenuSettingsPanel;