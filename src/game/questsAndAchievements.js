// questsAndAchievements.js
// Data quest dan achievement dasar

export const questList = [
  {
    id: "kill_10",
    name: "Defeat 10 Enemies",
    check: (stats) => stats.totalKills >= 10,
    goal: 10,
    getProgress: (stats) => Math.min(stats.totalKills, 10),
    reward: { gold: 100, skillPoint: 1 },
  },
  {
    id: "kill_50",
    name: "Defeat 50 Enemies",
    check: (stats) => stats.totalKills >= 50,
    goal: 50,
    getProgress: (stats) => Math.min(stats.totalKills, 50),
    reward: { gold: 500, skillPoint: 2 },
  },
  {
    id: "reach_level_10",
    name: "Reach Level 10",
    check: (stats) => stats.level >= 10,
    goal: 10,
    getProgress: (stats) => Math.min(stats.level, 10),
    reward: { gold: 300, skillPoint: 1 },
  },
  {
    id: "defeat_first_boss",
    name: "Defeat Your First Boss",
    check: (stats) => stats.bossesDefeated.length >= 1,
    goal: 1,
    getProgress: (stats) => Math.min(stats.bossesDefeated.length, 1),
    reward: { gold: 1000, skillPoint: 3 },
  },
];

export const achievementList = [
  { id: "first_kill", name: "First Kill", check: (stats) => stats.totalKills >= 1 },
  { id: "first_boss", name: "First Boss", check: (stats) => stats.bossesDefeated.length >= 1 },
  { id: "first_legendary", name: "First Legendary", check: (stats) => stats.hasLegendaryItem },
  { id: "millionaire", name: "Millionaire", check: (stats) => stats.totalGoldEarned >= 1000000 },
  { id: "first_ascension", name: "First Ascension", check: (stats) => stats.ascensionCount >= 1 },
  { id: "skill_master", name: "Skill Master", check: (stats) => stats.unlockedSkills.length >= 3 },
];