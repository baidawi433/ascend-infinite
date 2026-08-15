// useFusion.js
// Mengatur logika menggabungkan item menjadi rarity lebih tinggi

import { rarityOrder, fusionRequirement, createFusedItem } from "./equipment";

export function getNextRarity(rarity) {
  const index = rarityOrder.indexOf(rarity);
  if (index === -1 || index === rarityOrder.length - 1) return null;
  return rarityOrder[index + 1];
}

export function canFuse(rarity, inventory) {
  const nextRarity = getNextRarity(rarity);
  if (!nextRarity) return false;

  const requiredCount = fusionRequirement[rarity];
  const availableCount = inventory.filter((item) => item.rarity === rarity).length;

  return availableCount >= requiredCount;
}

export function fuseItems(rarity, gameState, setGameState) {
  const nextRarity = getNextRarity(rarity);
  if (!nextRarity) return;

  const requiredCount = fusionRequirement[rarity];
  const itemsOfRarity = gameState.inventory.filter((item) => item.rarity === rarity);

  if (itemsOfRarity.length < requiredCount) return;

  const idsToRemove = itemsOfRarity.slice(0, requiredCount).map((item) => item.instanceId);
  // Hasil fusion memakai slot dari item pertama yang dipakai (item-item lain dianggap "bahan")
  const resultSlot = itemsOfRarity[0].slot;
  const newItem = createFusedItem(nextRarity, resultSlot);

  setGameState((prev) => ({
    ...prev,
    inventory: [
      ...prev.inventory.filter((item) => !idsToRemove.includes(item.instanceId)),
      newItem,
    ],
  }));
}