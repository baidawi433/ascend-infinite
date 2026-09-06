// usePrestigeShop.js
// Toko permanen menggunakan Soul - upgrade ini TIDAK direset oleh Ascension atau NG+

export const prestigeUpgrades = [
  { id: "max_hp_boost", name: "Vitality Core", emoji: "❤️", description: "+10 Max HP permanen per level", maxLevel: 20, baseCost: 1 },
  { id: "crit_chance_boost", name: "Precision Core", emoji: "🎯", description: "+1% Crit Chance permanen per level", maxLevel: 15, baseCost: 2 },
  { id: "gold_find_boost", name: "Fortune Core", emoji: "🍀", description: "+5% Gold permanen per level", maxLevel: 20, baseCost: 1 },
  { id: "regen_boost", name: "Renewal Core", emoji: "💫", description: "+0.5% HP Regen/detik permanen per level", maxLevel: 10, baseCost: 3 },
];

export function getUpgradeCost(upgrade, currentLevel) {
  return Math.floor(upgrade.baseCost * Math.pow(1.5, currentLevel));
}

export function canBuyPrestigeUpgrade(upgrade, currentLevel, soul) {
  if (currentLevel >= upgrade.maxLevel) return false;
  return soul >= getUpgradeCost(upgrade, currentLevel);
}

export function buyPrestigeUpgrade(upgradeId, gameState, setGameState) {
  const upgrade = prestigeUpgrades.find((u) => u.id === upgradeId);
  if (!upgrade) return;

  const currentLevel = gameState.prestigeUpgrades?.[upgradeId] || 0;
  if (!canBuyPrestigeUpgrade(upgrade, currentLevel, gameState.soul)) return;

  const cost = getUpgradeCost(upgrade, currentLevel);

  setGameState((prev) => ({
    ...prev,
    soul: prev.soul - cost,
    prestigeUpgrades: { ...prev.prestigeUpgrades, [upgradeId]: currentLevel + 1 },
  }));
}

// Hitung total bonus dari semua prestige upgrade yang sudah dibeli
export function getPrestigeBonuses(prestigeUpgradesOwned = {}) {
  return {
    maxHpBonus: (prestigeUpgradesOwned.max_hp_boost || 0) * 10,
    critChanceBonus: (prestigeUpgradesOwned.crit_chance_boost || 0) * 0.01,
    goldPercentBonus: (prestigeUpgradesOwned.gold_find_boost || 0) * 5,
    regenPercentBonus: (prestigeUpgradesOwned.regen_boost || 0) * 0.005,
  };
}