// BottomNav.jsx
// Navigasi bawah untuk berpindah antar tab

const tabs = [
  { id: "battle", label: "Battle", emoji: "⚔️" },
  { id: "skills", label: "Skills", emoji: "🌳" },
  { id: "inventory", label: "Inventory", emoji: "🎒" },
  { id: "world", label: "World", emoji: "🗺️" },
  { id: "progress", label: "Progress", emoji: "🏆" },
];

function BottomNav({ activeTab, setActiveTab }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      display: "flex", justifyContent: "space-around",
      background: "#141420", borderTop: "1px solid #333",
      padding: "8px 0", zIndex: 500
    }}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              background: "none", border: "none", cursor: "pointer",
              color: isActive ? "#8e44ad" : "#888",
              padding: "6px 10px",
              fontSize: "11px",
            }}
          >
            <span style={{ fontSize: "20px" }}>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default BottomNav;