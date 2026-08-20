// GameState.js
// Tempat menyimpan data utama game

export const initialGameState = {
  level: 1,
  damage: 5,
  hp: 100,
  gold: 0,
  xp: 0,
  skillPoint: 0,
  ascensionPoint: 0,
  unlockedSkills: [],
  killCount: 0,
  bossesDefeated: [],
  soul: 0,
  ascensionCount: 0,
  inventory: [],
  equippedItems: {
    weapon: null, helmet: null, armor: null, gloves: null, boots: null, ring: null, amulet: null,
  },
  totalKills: 0,
  totalGoldEarned: 0,
  completedQuests: [],
  unlockedAchievements: [],
  autoAttackEnabled: false,
  lastSeenTimestamp: Date.now(),
  critChance: 0.1,
  critMultiplier: 2,
  highestTowerFloor: 0,
  sfxEnabled: true,
  infinityModeUnlocked: false,
  newGamePlusCount: 0,
  autoCastEnabled: false,
  materials: {},
};

export const ASCENSION_LEVEL_REQUIREMENT = 20;
export const OFFLINE_CAP_HOURS = 8;
export const ATTACKS_PER_SECOND = 1;
export const FINAL_BOSS_ID = "the_ascended";