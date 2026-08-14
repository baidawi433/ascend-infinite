// WorldMapPanel.jsx
import { areaList } from "../game/areas";

function WorldMapPanel({ gameState, currentAreaId, setCurrentAreaId }) {
  return (
    <div className="panel-card">
      <h3 style={{ marginTop: 0 }}>🗺️ World Map</h3>
      {areaList.map((area) => {
        const isUnlocked = gameState.level >= area.levelRequirement;
        const isActive = area.id === currentAreaId;

        let lockIcon = "🔒";
        if (isActive) lockIcon = "✨";
        else if (isUnlocked) lockIcon = "✓";

        return (
          <div
            key={area.id}
            onClick={() => isUnlocked && setCurrentAreaId(area.id)}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px", marginBottom: "8px", borderRadius: "8px",
              background: isActive ? "rgba(142, 68, 173, 0.15)" : "#1a1a2a",
              cursor: isUnlocked ? "pointer" : "not-allowed",
              opacity: isUnlocked ? 1 : 0.5,
              border: isActive ? "1px solid var(--color-accent-purple)" : "1px solid var(--color-border)",
            }}
          >
            <div>
              <strong>{lockIcon} {area.emoji} {area.name}</strong>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-muted)" }}>
                Level {area.minLevel}–{area.maxLevel}
              </p>
            </div>
            {!isUnlocked && (
              <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                Requires Lv.{area.levelRequirement}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default WorldMapPanel;