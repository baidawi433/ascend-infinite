// bosses.js
// Data boss untuk setiap area (10 area)

export const bossByArea = {
  whispering_forest: { id: "forest_guardian", name: "Forest Guardian", emoji: "🌳", hp: 500, goldReward: 300, xpReward: 150, skillPointReward: 2 },
  burning_desert: { id: "sand_wyrm", name: "Sand Wyrm", emoji: "🐍", hp: 2500, goldReward: 1200, xpReward: 600, skillPointReward: 3 },
  frozen_kingdom: { id: "frost_queen", name: "Frost Queen", emoji: "❄️", hp: 8000, goldReward: 4000, xpReward: 2000, skillPointReward: 4 },
  inferno_valley: { id: "flame_titan", name: "Flame Titan", emoji: "🔥", hp: 25000, goldReward: 12000, xpReward: 6000, skillPointReward: 5 },
  shadow_realm: { id: "shadow_knight", name: "Shadow Knight", emoji: "🗡️", hp: 70000, goldReward: 35000, xpReward: 18000, skillPointReward: 6 },
  necropolis: { id: "necromancer_king", name: "Necromancer King", emoji: "💀", hp: 180000, goldReward: 90000, xpReward: 45000, skillPointReward: 8 },
  demon_abyss: { id: "demon_general", name: "Demon General", emoji: "👹", hp: 450000, goldReward: 225000, xpReward: 110000, skillPointReward: 10 },
  void_dimension: { id: "void_guardian", name: "Void Guardian", emoji: "🌌", hp: 1100000, goldReward: 550000, xpReward: 270000, skillPointReward: 12 },
  celestial_realm: { id: "fallen_angel", name: "Fallen Angel", emoji: "🪽", hp: 2800000, goldReward: 1400000, xpReward: 700000, skillPointReward: 15 },
  infinity_realm: { id: "the_ascended", name: "The Ascended", emoji: "♾️", hp: 7000000, goldReward: 3500000, xpReward: 1800000, skillPointReward: 20 },
};

export function getBossForArea(areaId) {
  const base = bossByArea[areaId];
  if (!base) return null;
  return { ...base, currentHp: base.hp };
}