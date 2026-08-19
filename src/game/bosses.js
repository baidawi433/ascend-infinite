// bosses.js
// Data boss untuk setiap area - sekarang 2 boss berurutan per area (20 boss total)

export const bossByArea = {
  whispering_forest: [
    { id: "forest_guardian", name: "Forest Guardian", emoji: "🌳", hp: 500, goldReward: 300, xpReward: 150, skillPointReward: 2 },
    { id: "goblin_king", name: "Goblin King", emoji: "👑", hp: 1200, goldReward: 700, xpReward: 350, skillPointReward: 3 },
  ],
  burning_desert: [
    { id: "sand_wyrm", name: "Sand Wyrm", emoji: "🐍", hp: 2500, goldReward: 1200, xpReward: 600, skillPointReward: 3 },
    { id: "desert_tyrant", name: "Desert Tyrant", emoji: "🦂", hp: 5500, goldReward: 2800, xpReward: 1400, skillPointReward: 4 },
  ],
  frozen_kingdom: [
    { id: "frost_queen", name: "Frost Queen", emoji: "❄️", hp: 8000, goldReward: 4000, xpReward: 2000, skillPointReward: 4 },
    { id: "ice_colossus", name: "Ice Colossus", emoji: "🧊", hp: 17000, goldReward: 8500, xpReward: 4200, skillPointReward: 5 },
  ],
  inferno_valley: [
    { id: "flame_titan", name: "Flame Titan", emoji: "🔥", hp: 25000, goldReward: 12000, xpReward: 6000, skillPointReward: 5 },
    { id: "magma_lord", name: "Magma Lord", emoji: "🌋", hp: 55000, goldReward: 27000, xpReward: 13500, skillPointReward: 6 },
  ],
  shadow_realm: [
    { id: "shadow_knight", name: "Shadow Knight", emoji: "🗡️", hp: 70000, goldReward: 35000, xpReward: 18000, skillPointReward: 6 },
    { id: "abyss_beast", name: "Abyss Beast", emoji: "🐺", hp: 150000, goldReward: 75000, xpReward: 38000, skillPointReward: 7 },
  ],
  necropolis: [
    { id: "necromancer_king", name: "Necromancer King", emoji: "💀", hp: 180000, goldReward: 90000, xpReward: 45000, skillPointReward: 8 },
    { id: "celestial_serpent", name: "Celestial Serpent", emoji: "🐉", hp: 380000, goldReward: 190000, xpReward: 95000, skillPointReward: 9 },
  ],
  demon_abyss: [
    { id: "demon_general", name: "Demon General", emoji: "👹", hp: 450000, goldReward: 225000, xpReward: 110000, skillPointReward: 10 },
    { id: "ancient_dragon", name: "Ancient Dragon", emoji: "🐲", hp: 950000, goldReward: 475000, xpReward: 240000, skillPointReward: 11 },
  ],
  void_dimension: [
    { id: "void_guardian", name: "Void Guardian", emoji: "🌌", hp: 1100000, goldReward: 550000, xpReward: 270000, skillPointReward: 12 },
    { id: "time_keeper", name: "Time Keeper", emoji: "⏳", hp: 2300000, goldReward: 1150000, xpReward: 570000, skillPointReward: 13 },
  ],
  celestial_realm: [
    { id: "fallen_angel", name: "Fallen Angel", emoji: "🪽", hp: 2800000, goldReward: 1400000, xpReward: 700000, skillPointReward: 15 },
    { id: "world_eater", name: "World Eater", emoji: "🌍", hp: 6000000, goldReward: 3000000, xpReward: 1500000, skillPointReward: 17 },
  ],
  infinity_realm: [
    { id: "infinity_guardian", name: "Infinity Guardian", emoji: "🔱", hp: 15000000, goldReward: 7500000, xpReward: 3800000, skillPointReward: 20 },
    { id: "the_ascended", name: "The Ascended", emoji: "♾️", hp: 30000000, goldReward: 15000000, xpReward: 7600000, skillPointReward: 25 },
  ],
};

// Ambil boss ke-N (0-indexed) yang belum dikalahkan untuk area ini
export function getBossForArea(areaId, defeatedBossIds) {
  const bossQueue = bossByArea[areaId];
  if (!bossQueue) return null;

  const nextBoss = bossQueue.find((b) => !defeatedBossIds.includes(b.id));
  if (!nextBoss) return null; // semua boss area ini sudah dikalahkan

  return { ...nextBoss, currentHp: nextBoss.hp };
}

// Cek apakah masih ada boss yang bisa ditantang di area ini
export function hasAvailableBoss(areaId, defeatedBossIds) {
  const bossQueue = bossByArea[areaId];
  if (!bossQueue) return false;
  return bossQueue.some((b) => !defeatedBossIds.includes(b.id));
}