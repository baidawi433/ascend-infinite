// formulas.js
// Kumpulan formula perhitungan game (harga upgrade, xp untuk naik level, dll)

// Harga upgrade damage berikutnya, makin mahal tiap level
export function getUpgradeCost(currentDamage) {
  return Math.floor(10 * Math.pow(1.15, currentDamage));
}

// Berapa XP dibutuhkan untuk naik ke level berikutnya
export function getXpToNextLevel(level) {
  return Math.floor(50 * Math.pow(1.2, level - 1));
}