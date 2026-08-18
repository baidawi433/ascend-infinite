// SkillNodeTree.jsx
// Menampilkan satu branch skill sebagai graph node dengan garis penghubung SVG

const skillIconMap = {
  power1: "💪", power2: "🔥", power3: "👑",
  swift1: "👟", swift2: "💨", swift3: "⏱️",
  gold1: "🪙", gold2: "💰", gold3: "🏆",
  hp1: "❤️", hp2: "🛡️", hp3: "⭐",
};

// Posisi node (pixel) dalam viewBox 300x140, zigzag seperti referensi
const positions = [
  { x: 110, y: 30 },
  { x: 190, y: 105 },
  { x: 270, y: 30 },
];
const hubPos = { x: 30, y: 68 };

function SkillNodeTree({ branchName, branchEmoji, branchColor, skills, unlockedSkills, skillPoint, selectedSkillId, onSelectNode }) {
  function getNodeStatus(skill) {
    const isUnlocked = unlockedSkills.includes(skill.id);
    if (isUnlocked) return "unlocked";
    const prereqMet = skill.prerequisite === null || unlockedSkills.includes(skill.prerequisite);
    if (prereqMet && skillPoint >= skill.cost) return "available";
    if (prereqMet) return "affordable-locked";
    return "locked";
  }

  return (
    <div style={{ position: "relative", width: "300px", height: "140px", margin: "0 auto" }}>
      <svg width="300" height="140" style={{ position: "absolute", top: 0, left: 0 }}>
        <line x1={hubPos.x} y1={hubPos.y} x2={positions[0].x} y2={positions[0].y} stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        <line x1={positions[0].x} y1={positions[0].y} x2={positions[1].x} y2={positions[1].y} stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        <line x1={positions[1].x} y1={positions[1].y} x2={positions[2].x} y2={positions[2].y} stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
      </svg>

      {/* Hub icon (dekorasi branch, tidak bisa diklik) */}
      <div
        style={{
          position: "absolute", left: hubPos.x - 20, top: hubPos.y - 20,
          width: "40px", height: "40px", borderRadius: "50%",
          background: `${branchColor}22`, border: `2px solid ${branchColor}`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
          boxShadow: `0 0 12px ${branchColor}44`,
        }}
      >
        {branchEmoji}
      </div>

      {skills.map((skill, i) => {
        const pos = positions[i];
        const status = getNodeStatus(skill);
        const isSelected = selectedSkillId === skill.id;

        const styleByStatus = {
          unlocked: { bg: `${branchColor}33`, border: branchColor, glow: `0 0 14px ${branchColor}66`, opacity: 1 },
          available: { bg: "rgba(255,255,255,0.08)", border: branchColor, glow: `0 0 10px ${branchColor}44`, opacity: 1 },
          "affordable-locked": { bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.2)", glow: "none", opacity: 0.55 },
          locked: { bg: "rgba(255,255,255,0.02)", border: "rgba(255,255,255,0.1)", glow: "none", opacity: 0.35 },
        }[status];

        return (
          <button
            key={skill.id}
            onClick={() => onSelectNode(skill.id)}
            style={{
              position: "absolute", left: pos.x - 22, top: pos.y - 22,
              width: "44px", height: "44px", borderRadius: "50%",
              background: styleByStatus.bg,
              border: `2px solid ${isSelected ? "#fff" : styleByStatus.border}`,
              boxShadow: isSelected ? "0 0 0 3px rgba(255,255,255,0.25)" : styleByStatus.glow,
              opacity: styleByStatus.opacity,
              fontSize: "18px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s ease",
            }}
          >
            {status === "locked" ? "🔒" : skillIconMap[skill.id] || "✨"}
          </button>
        );
      })}
    </div>
  );
}

export default SkillNodeTree;