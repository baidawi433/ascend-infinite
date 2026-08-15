// formulas.js
// Kumpulan formula perhitungan game

// Harga upgrade damage berikutnya.
// Growth rate 1.12 dipilih supaya tetap terjangkau sampai damage menengah,
// lalu mulai terasa mahal di damage tinggi (mendorong pemain cari sumber damage lain: skill, equipment).
export function getUpgradeCost(currentDamage) {
  return Math.floor(8 * Math.pow(1.12, currentDamage));
}

// XP dibutuhkan untuk naik level.
// Growth rate 1.15 dipilih supaya level 1-10 terasa cepat (beberapa kill saja),
// lalu melandai secukupnya di level menengah-tinggi.
export function getXpToNextLevel(level) {
  return Math.floor(35 * Math.pow(1.15, level - 1));
}