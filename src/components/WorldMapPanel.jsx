// WorldMapPanel.jsx
import { areaList } from "../game/areas";

function WorldMapPanel({ gameState, currentAreaId, setCurrentAreaId }) {
  return (
    <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #333", borderRadius: "8px", maxWidth: "400px" }}>
      <h3>🗺️ World Map</h3>
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              marginBottom: "8px",
              background: isActive ? "#2a1e3a" : "#1a1a2a",
              borderRadius: "6px",
              cursor: isUnlocked ? "pointer" : "not-allowed",
              opacity: isUnlocked ? 1 : 0.5,
              border: isActive ? "1px solid #8e44ad" : "1px solid transparent",
            }}
          >
            <div>
              <strong>{lockIcon} {area.emoji} {area.name}</strong>
              <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                Level {area.minLevel}–{area.maxLevel}
              </p>
            </div>
            {!isUnlocked && (
              <span style={{ fontSize: "12px", color: "#888" }}>
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