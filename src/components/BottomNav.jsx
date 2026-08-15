// BottomNav.jsx
// Navigasi bawah mengambang bergaya pill, sesuai game mobile modern

const tabs = [
  { id: "battle", label: "Battle", emoji: "⚔️" },
  { id: "skills", label: "Skills", emoji: "🌳" },
  { id: "inventory", label: "Bag", emoji: "🎒" },
  { id: "world", label: "World", emoji: "🗺️" },
  { id: "progress", label: "More", emoji: "🏆" },
];

function BottomNav({ activeTab, setActiveTab }) {
  return (
    <div className="floating-nav">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`floating-nav-item ${isActive ? "active" : ""}`}
          >
            <span className="icon">{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default BottomNav;