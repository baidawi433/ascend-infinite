// endlessTower.js
// Menghasilkan musuh untuk setiap lantai Endless Tower.
// Semakin tinggi lantai, semakin kuat musuh (scaling eksponensial).

const towerEnemyNames = ["Goblin", "Orc", "Skeleton", "Demon", "Golem", "Wraith"];

export function getTowerEnemy(floor) {
  const growth = 1.15; // pertumbuhan HP per lantai
  const baseHp = 50;
  const baseGold = 10;
  const baseXp = 5;

  const hp = Math.floor(baseHp * Math.pow(growth, floor));
  const goldReward = Math.floor(baseGold * Math.pow(growth, floor));
  const xpReward = Math.floor(baseXp * Math.pow(growth, floor));

  const name = towerEnemyNames[floor % towerEnemyNames.length];

  return {
    name: `${name} (Floor ${floor})`,
    hp,
    currentHp: hp,
    goldReward,
    xpReward,
  };
}