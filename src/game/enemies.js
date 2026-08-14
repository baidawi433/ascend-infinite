// enemies.js
// Data musuh dikelompokkan berdasarkan area (10 area)

export const enemiesByArea = {
  whispering_forest: [
    { id: "slime", name: "Slime", hp: 20, goldReward: 5, xpReward: 2 },
    { id: "goblin", name: "Goblin", hp: 35, goldReward: 8, xpReward: 4 },
    { id: "wolf", name: "Wolf", hp: 50, goldReward: 12, xpReward: 6 },
    { id: "bat", name: "Bat", hp: 25, goldReward: 6, xpReward: 3 },
    { id: "spider", name: "Spider", hp: 40, goldReward: 9, xpReward: 5 },
  ],
  burning_desert: [
    { id: "bandit", name: "Bandit", hp: 120, goldReward: 25, xpReward: 15 },
    { id: "scorpion", name: "Scorpion", hp: 150, goldReward: 30, xpReward: 18 },
    { id: "sand_wraith", name: "Sand Wraith", hp: 180, goldReward: 35, xpReward: 20 },
  ],
  frozen_kingdom: [
    { id: "ice_wolf", name: "Ice Wolf", hp: 300, goldReward: 60, xpReward: 35 },
    { id: "frost_bat", name: "Frost Bat", hp: 280, goldReward: 55, xpReward: 32 },
    { id: "ice_golem", name: "Ice Golem", hp: 450, goldReward: 90, xpReward: 50 },
  ],
  inferno_valley: [
    { id: "fire_imp", name: "Fire Imp", hp: 800, goldReward: 160, xpReward: 90 },
    { id: "magma_slime", name: "Magma Slime", hp: 900, goldReward: 180, xpReward: 100 },
    { id: "flame_hound", name: "Flame Hound", hp: 1100, goldReward: 220, xpReward: 120 },
  ],
  shadow_realm: [
    { id: "shadow_wolf", name: "Shadow Wolf", hp: 2500, goldReward: 500, xpReward: 280 },
    { id: "dark_knight", name: "Dark Knight", hp: 3000, goldReward: 600, xpReward: 340 },
    { id: "wraith", name: "Wraith", hp: 2200, goldReward: 450, xpReward: 250 },
  ],
  necropolis: [
    { id: "skeleton_warrior", name: "Skeleton Warrior", hp: 6000, goldReward: 1200, xpReward: 700 },
    { id: "zombie_lord", name: "Zombie Lord", hp: 7500, goldReward: 1500, xpReward: 850 },
    { id: "cursed_spirit", name: "Cursed Spirit", hp: 5500, goldReward: 1100, xpReward: 650 },
  ],
  demon_abyss: [
    { id: "lesser_demon", name: "Lesser Demon", hp: 15000, goldReward: 3000, xpReward: 1700 },
    { id: "abyss_stalker", name: "Abyss Stalker", hp: 18000, goldReward: 3600, xpReward: 2000 },
    { id: "hellhound", name: "Hellhound", hp: 20000, goldReward: 4000, xpReward: 2200 },
  ],
  void_dimension: [
    { id: "void_wraith", name: "Void Wraith", hp: 40000, goldReward: 8000, xpReward: 4500 },
    { id: "star_eater", name: "Star Eater", hp: 45000, goldReward: 9000, xpReward: 5000 },
    { id: "null_entity", name: "Null Entity", hp: 50000, goldReward: 10000, xpReward: 5600 },
  ],
  celestial_realm: [
    { id: "fallen_seraph", name: "Fallen Seraph", hp: 100000, goldReward: 20000, xpReward: 11000 },
    { id: "light_wraith", name: "Light Wraith", hp: 110000, goldReward: 22000, xpReward: 12000 },
    { id: "divine_guardian", name: "Divine Guardian", hp: 130000, goldReward: 26000, xpReward: 14000 },
  ],
  infinity_realm: [
    { id: "infinity_spawn", name: "Infinity Spawn", hp: 300000, goldReward: 60000, xpReward: 33000 },
    { id: "reality_shard", name: "Reality Shard", hp: 350000, goldReward: 70000, xpReward: 38000 },
    { id: "chaos_entity", name: "Chaos Entity", hp: 400000, goldReward: 80000, xpReward: 44000 },
  ],
};

export function getRandomEnemy(areaId) {
  const list = enemiesByArea[areaId] || enemiesByArea.whispering_forest;
  const index = Math.floor(Math.random() * list.length);
  const base = list[index];
  return { ...base, currentHp: base.hp };
}