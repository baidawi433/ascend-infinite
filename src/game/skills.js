// skills.js
// Data skill untuk semua branch

export const skillList = [
  // ⚔️ STRENGTH — fokus Damage
  {
    id: "power1", name: "Power I", branch: "Strength", cost: 1, prerequisite: null,
    effect: { damagePercent: 10 }, description: "+10% Damage",
  },
  {
    id: "power2", name: "Power II", branch: "Strength", cost: 2, prerequisite: "power1",
    effect: { damagePercent: 15 }, description: "+15% Damage",
  },
  {
    id: "power3", name: "Power III", branch: "Strength", cost: 3, prerequisite: "power2",
    effect: { damagePercent: 20 }, description: "+20% Damage",
  },

  // ⚡ AGILITY — fokus Attack Speed
  {
    id: "swift1", name: "Swift I", branch: "Agility", cost: 1, prerequisite: null,
    effect: { attackSpeedPercent: 10 }, description: "+10% Attack Speed",
  },
  {
    id: "swift2", name: "Swift II", branch: "Agility", cost: 2, prerequisite: "swift1",
    effect: { attackSpeedPercent: 15 }, description: "+15% Attack Speed",
  },
  {
    id: "swift3", name: "Swift III", branch: "Agility", cost: 3, prerequisite: "swift2",
    effect: { attackSpeedPercent: 20 }, description: "+20% Attack Speed",
  },

  // 💰 GREED — fokus Gold
  {
    id: "gold1", name: "Gold I", branch: "Greed", cost: 1, prerequisite: null,
    effect: { goldPercent: 15 }, description: "+15% Gold",
  },
  {
    id: "gold2", name: "Gold II", branch: "Greed", cost: 2, prerequisite: "gold1",
    effect: { goldPercent: 20 }, description: "+20% Gold",
  },
  {
    id: "gold3", name: "Gold III", branch: "Greed", cost: 3, prerequisite: "gold2",
    effect: { goldPercent: 25 }, description: "+25% Gold",
  },

  // 🛡️ VITALITY — fokus HP
  {
    id: "hp1", name: "HP I", branch: "Vitality", cost: 1, prerequisite: null,
    effect: { hpPercent: 15 }, description: "+15% Max HP",
  },
  {
    id: "hp2", name: "HP II", branch: "Vitality", cost: 2, prerequisite: "hp1",
    effect: { hpPercent: 20 }, description: "+20% Max HP",
  },
  {
    id: "hp3", name: "HP III", branch: "Vitality", cost: 3, prerequisite: "hp2",
    effect: { hpPercent: 25 }, description: "+25% Max HP",
  },
];