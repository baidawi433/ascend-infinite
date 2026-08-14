// NpcPanel.jsx
import { useState } from "react";
import { npcList, loreText } from "../game/npc";

function NpcPanel() {
  const [selectedNpc, setSelectedNpc] = useState(null);

  return (
    <div className="panel-card">
      <h3 style={{ marginTop: 0 }}>👥 Townsfolk of Elyndra</h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
        {npcList.map((npc) => (
          <button
            key={npc.id}
            onClick={() => setSelectedNpc(npc)}
            style={{
              padding: "8px 12px",
              background: selectedNpc?.id === npc.id ? "var(--color-accent-purple)" : "#1a1a2a",
              color: "white",
              border: "1px solid var(--color-border)",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            {npc.emoji} {npc.name}
          </button>
        ))}
      </div>

      {selectedNpc ? (
        <div style={{ padding: "12px", background: "#1a1a2a", borderRadius: "8px", borderLeft: "3px solid var(--color-accent-purple)" }}>
          <strong>{selectedNpc.emoji} {selectedNpc.name}</strong>
          <p style={{ margin: "2px 0 8px 0", fontSize: "12px", color: "var(--color-text-muted)" }}>{selectedNpc.role}</p>
          <p style={{ margin: 0, fontStyle: "italic", color: "#ddd" }}>"{selectedNpc.dialogue}"</p>
        </div>
      ) : (
        <p style={{ color: "var(--color-text-muted)", fontSize: "13px" }}>Klik salah satu nama di atas untuk berbicara.</p>
      )}

      <details style={{ marginTop: "16px" }}>
        <summary style={{ cursor: "pointer", color: "var(--color-accent-gold)", fontSize: "13px" }}>📜 Lore Dunia Elyndra</summary>
        <p style={{ fontSize: "13px", color: "#ccc", whiteSpace: "pre-line", marginTop: "8px" }}>{loreText}</p>
      </details>
    </div>
  );
}

export default NpcPanel;