// WorldMapPanel.jsx
import { areaList } from "../game/areas";

function WorldMapPanel({ gameState, currentAreaId, setCurrentAreaId }) {
  const activeArea = areaList.find((a) => a.id === currentAreaId);

  return (
    <div className="glass-panel" style={{ padding: "18px", maxWidth: "420px" }}>
      <h3 style={{ margin: "0 0 14px 0", fontSize: "16px" }}>🗺️ World Map</h3>

      {activeArea && (
        <div style={{
          padding: "12px 14px", borderRadius: "16px", marginBottom: "14px",
          background: "linear-gradient(90deg, rgba(168,85,247,0.12), rgba(34,211,238,0.06))",
          border: "1px solid rgba(168,85,247,0.3)",
        }}>
          <div style={{ fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{activeArea.emoji} {activeArea.name}</div>
          <div style={{ fontSize: "11px", color: "var(--color-text-muted)", fontStyle: "italic", lineHeight: "1.5" }}>
            "{activeArea.lore}"
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {areaList.map((area) => {
          const isUnlocked = gameState.level >= area.levelRequirement;
          const isActive = area.id === currentAreaId;
          const progress = Math.min(100, Math.max(0, ((gameState.level - area.minLevel) / (area.maxLevel - area.minLevel)) * 100));

          return (
            <div
              key={area.id}
              onClick={() => isUnlocked && setCurrentAreaId(area.id)}
              style={{
                display: "flex", alignItems: "center", gap: "12px", padding: "12px",
                borderRadius: "18px",
                background: isActive ? "linear-gradient(90deg, rgba(168,85,247,0.18), rgba(34,211,238,0.08))" : "rgba(255,255,255,0.03)",
                border: `1px solid ${isActive ? "rgba(168,85,247,0.5)" : "var(--color-border)"}`,
                cursor: isUnlocked ? "pointer" : "not-allowed",
                opacity: isUnlocked ? 1 : 0.45,
              }}
            >
              <div style={{
                width: "48px", height: "48px", borderRadius: "16px", flexShrink: 0,
                background: isActive ? "rgba(168,85,247,0.25)" : "rgba(255,255,255,0.05)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px",
              }}>
                {isUnlocked ? area.emoji : "🔒"}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700 }}>{area.name}</span>
                  {isActive && <span style={{ fontSize: "10px", color: "var(--color-accent-purple)" }}>ACTIVE</span>}
                </div>
                <div style={{ fontSize: "10px", color: "var(--color-text-muted)", marginBottom: "4px" }}>
                  {isUnlocked ? `Lv.${area.minLevel}–${area.maxLevel}` : `Requires Lv.${area.levelRequirement}`}
                </div>
                {isUnlocked && (
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "var(--radius-pill)", height: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #a855f7, #22d3ee)" }} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WorldMapPanel;