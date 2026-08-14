// equipment.js
// Data equipment dengan rarity, drop chance, dan aturan fusion

export const rarityOrder = ["common", "rare", "epic", "legendary", "mythic"];

export const rarityConfig = {
  common:    { label: "Common",    color: "#9e9e9e", dropChance: 0.70, sellPrice: 5,   damageBonus: 2 },
  rare:      { label: "Rare",      color: "#3498db", dropChance: 0.20, sellPrice: 20,  damageBonus: 6 },
  epic:      { label: "Epic",      color: "#9b59b6", dropChance: 0.08, sellPrice: 60,  damageBonus: 15 },
  legendary: { label: "Legendary", color: "#f1c40f", dropChance: 0.018, sellPrice: 200, damageBonus: 40 },
  mythic:    { label: "Mythic",    color: "#e74c3c", dropChance: 0.002, sellPrice: 800, damageBonus: 100 },
};

// Berapa item dibutuhkan untuk fusion ke rarity berikutnya
export const fusionRequirement = {
  common: 3,   // 3 Common -> 1 Rare
  rare: 5,     // 5 Rare -> 1 Epic
  epic: 5,     // 5 Epic -> 1 Legendary
  legendary: 5, // 5 Legendary -> 1 Mythic
};

const weaponNames = ["Rusty Sword", "Iron Blade", "Flame Sword", "Void Staff", "Storm Axe"];

export function rollItemDrop() {
  const roll = Math.random();
  let cumulative = 0;
  let chosenRarity = "common";

  for (const [rarityId, config] of Object.entries(rarityConfig)) {
    cumulative += config.dropChance;
    if (roll <= cumulative) {
      chosenRarity = rarityId;
      break;
    }
  }

  const config = rarityConfig[chosenRarity];
  const name = weaponNames[Math.floor(Math.random() * weaponNames.length)];

  return {
    instanceId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    rarity: chosenRarity,
    damageBonus: config.damageBonus,
    sellPrice: config.sellPrice,
  };
}

// Membuat item hasil fusion dengan rarity yang lebih tinggi
export function createFusedItem(newRarity) {
  const config = rarityConfig[newRarity];
  const name = weaponNames[Math.floor(Math.random() * weaponNames.length)];

  return {
    instanceId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: `${config.label} ${name}`,
    rarity: newRarity,
    damageBonus: config.damageBonus,
    sellPrice: config.sellPrice,
  };
}