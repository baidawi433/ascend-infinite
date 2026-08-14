// bosses.js
// Data boss untuk setiap area

export const bossByArea = {
  whispering_forest: {
    id: "forest_guardian",
    name: "Forest Guardian",
    emoji: "🌳",
    hp: 500,
    goldReward: 300,
    xpReward: 150,
    skillPointReward: 2,
  },
  burning_desert: {
    id: "sand_wyrm",
    name: "Sand Wyrm",
    emoji: "🐍",
    hp: 2500,
    goldReward: 1200,
    xpReward: 600,
    skillPointReward: 3,
  },
  frozen_kingdom: {
    id: "frost_queen",
    name: "Frost Queen",
    emoji: "❄️",
    hp: 8000,
    goldReward: 4000,
    xpReward: 2000,
    skillPointReward: 4,
  },
  inferno_valley: {
    id: "flame_titan",
    name: "Flame Titan",
    emoji: "🔥",
    hp: 25000,
    goldReward: 12000,
    xpReward: 6000,
    skillPointReward: 5,
  },
  shadow_realm: {
    id: "shadow_knight",
    name: "Shadow Knight",
    emoji: "🗡️",
    hp: 70000,
    goldReward: 35000,
    xpReward: 18000,
    skillPointReward: 6,
  },
  necropolis: {
    id: "necromancer_king",
    name: "Necromancer King",
    emoji: "💀",
    hp: 180000,
    goldReward: 90000,
    xpReward: 45000,
    skillPointReward: 8,
  },
};

export function getBossForArea(areaId) {
  const base = bossByArea[areaId];
  if (!base) return null;
  return { ...base, currentHp: base.hp };
}