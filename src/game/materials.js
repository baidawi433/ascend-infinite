// materials.js
// Data material crafting dan resep untuk Blacksmith

export const materialList = [
  { id: "iron_ore", name: "Iron Ore", emoji: "⛏️", dropChance: 0.25 },
  { id: "monster_fang", name: "Monster Fang", emoji: "🦷", dropChance: 0.2 },
  { id: "ancient_rune", name: "Ancient Rune", emoji: "🔯", dropChance: 0.1 },
  { id: "dragon_scale", name: "Dragon Scale", emoji: "🐲", dropChance: 0.03 },
];

export function rollMaterialDrop() {
  const roll = Math.random();
  let cumulative = 0;
  for (const mat of materialList) {
    cumulative += mat.dropChance;
    if (roll <= cumulative) return mat.id;
  }
  return null;
}

// Resep crafting: butuh kombinasi material tertentu untuk hasil equipment spesial
export const craftingRecipes = [
  {
    id: "craft_iron_sword",
    name: "Iron Sword",
    resultSlot: "weapon",
    resultRarity: "rare",
    cost: { iron_ore: 5, monster_fang: 2 },
    goldCost: 200,
  },
  {
    id: "craft_rune_amulet",
    name: "Rune Amulet",
    resultSlot: "amulet",
    resultRarity: "epic",
    cost: { ancient_rune: 4, iron_ore: 3 },
    goldCost: 800,
  },
  {
    id: "craft_dragon_armor",
    name: "Dragon Armor",
    resultSlot: "armor",
    resultRarity: "legendary",
    cost: { dragon_scale: 3, ancient_rune: 5, monster_fang: 5 },
    goldCost: 3000,
  },
];

export function canCraft(recipe, materials, gold) {
  if (gold < recipe.goldCost) return false;
  return Object.entries(recipe.cost).every(([matId, needed]) => (materials[matId] || 0) >= needed);
}