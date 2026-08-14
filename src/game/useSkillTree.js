// useSkillTree.js
// Mengatur logika unlock skill dan menghitung total bonus dari skill yang sudah dibuka

import { skillList } from "./skills";

export function canUnlockSkill(skillId, unlockedSkills, skillPoint) {
  const skill = skillList.find((s) => s.id === skillId);
  if (!skill) return false;

  const alreadyUnlocked = unlockedSkills.includes(skillId);
  if (alreadyUnlocked) return false;

  const hasEnoughPoints = skillPoint >= skill.cost;
  const prereqMet = skill.prerequisite === null || unlockedSkills.includes(skill.prerequisite);

  return hasEnoughPoints && prereqMet;
}

export function unlockSkill(gameState, setGameState, skillId) {
  const skill = skillList.find((s) => s.id === skillId);
  if (!skill) return;

  if (!canUnlockSkill(skillId, gameState.unlockedSkills, gameState.skillPoint)) return;

  setGameState((prev) => ({
    ...prev,
    skillPoint: prev.skillPoint - skill.cost,
    unlockedSkills: [...prev.unlockedSkills, skillId],
  }));
}

// Fungsi umum: jumlahkan satu jenis efek tertentu (misal "damagePercent") dari semua skill terbuka
function sumEffect(unlockedSkills, effectKey) {
  return skillList
    .filter((s) => unlockedSkills.includes(s.id))
    .reduce((total, s) => total + (s.effect[effectKey] || 0), 0);
}

export function getTotalDamageBonus(unlockedSkills) {
  return sumEffect(unlockedSkills, "damagePercent");
}

export function getTotalAttackSpeedBonus(unlockedSkills) {
  return sumEffect(unlockedSkills, "attackSpeedPercent");
}

export function getTotalGoldBonus(unlockedSkills) {
  return sumEffect(unlockedSkills, "goldPercent");
}

export function getTotalHpBonus(unlockedSkills) {
  return sumEffect(unlockedSkills, "hpPercent");
}