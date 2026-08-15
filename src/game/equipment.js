// equipment.js
// Data equipment dengan rarity, slot, dan aturan fusion

export const rarityOrder = ["common", "rare", "epic", "legendary", "mythic"];

export const rarityConfig = {
  common:    { label: "Common",    color: "#9e9e9e", dropChance: 0.70, sellPrice: 5,   statBonus: 2 },
  rare:      { label: "Rare",      color: "#3498db", dropChance: 0.20, sellPrice: 20,  statBonus: 6 },
  epic:      { label: "Epic",      color: "#9b59b6", dropChance: 0.08, sellPrice: 60,  statBonus: 15 },
  legendary: { label: "Legendary", color: "#f1c40f", dropChance: 0.018, sellPrice: 200, statBonus: 40 },
  mythic:    { label: "Mythic",    color: "#e74c3c", dropChance: 0.002, sellPrice: 800, statBonus: 100 },
};

export const fusionRequirement = {
  common: 3,
  rare: 5,
  epic: 5,
  legendary: 5,
};

// Setiap slot punya nama item dan jenis bonus yang berbeda
export const slotList = ["weapon", "helmet", "armor", "gloves", "boots", "ring", "amulet"];

export const slotConfig = {
  weapon: { label: "Weapon", emoji: "⚔️", names: ["Rusty Sword", "Iron Blade", "Flame Sword", "Void Staff", "Storm Axe"], statType: "damageBonus" },
  helmet: { label: "Helmet", emoji: "🪖", names: ["Leather Cap", "Iron Helm", "Dragon Helm"], statType: "hpBonus" },
  armor: { label: "Armor", emoji: "🛡️", names: ["Cloth Robe", "Chainmail", "Plate Armor"], statType: "hpBonus" },
  gloves: { label: "Gloves", emoji: "🧤", names: ["Cloth Gloves", "Iron Gauntlets", "Shadow Gloves"], statType: "damageBonus" },
  boots: { label: "Boots", emoji: "🥾", names: ["Worn Boots", "Steel Boots", "Wind Walkers"], statType: "hpBonus" },
  ring: { label: "Ring", emoji: "💍", names: ["Copper Ring", "Silver Band", "Ring of Power"], statType: "damageBonus" },
  amulet: { label: "Amulet", emoji: "📿", names: ["Bone Amulet", "Crystal Pendant", "Amulet of Ascension"], statType: "hpBonus" },
};

// Menggulung dadu rarity, lalu buat item baru untuk slot tertentu (acak jika tidak ditentukan)
export function rollItemDrop(forcedSlot) {
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

  const slot = forcedSlot || slotList[Math.floor(Math.random() * slotList.length)];
  const config = rarityConfig[chosenRarity];
  const slotInfo = slotConfig[slot];
  const name = slotInfo.names[Math.floor(Math.random() * slotInfo.names.length)];

  return {
    instanceId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    slot,
    rarity: chosenRarity,
    statType: slotInfo.statType,
    statValue: config.statBonus,
    sellPrice: config.sellPrice,
  };
}

export function createFusedItem(newRarity, slot) {
  const config = rarityConfig[newRarity];
  const slotInfo = slotConfig[slot];
  const name = slotInfo.names[Math.floor(Math.random() * slotInfo.names.length)];

  return {
    instanceId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: `${config.label} ${name}`,
    slot,
    rarity: newRarity,
    statType: slotInfo.statType,
    statValue: config.statBonus,
    sellPrice: config.sellPrice,
  };
}