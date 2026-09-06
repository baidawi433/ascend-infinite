// pets.js
// Data pet companion dengan bonus pasif masing-masing

export const petList = [
  { id: "baby_slime", name: "Baby Slime", emoji: "🟢", cost: 500, bonusType: "gold", bonusValue: 5, description: "+5% Gold" },
  { id: "spirit_fox", name: "Spirit Fox", emoji: "🦊", cost: 2000, bonusType: "damage", bonusValue: 8, description: "+8% Damage" },
  { id: "tiny_dragon", name: "Tiny Dragon", emoji: "🐲", cost: 8000, bonusType: "xp", bonusValue: 10, description: "+10% XP" },
  { id: "shadow_cat", name: "Shadow Cat", emoji: "🐈‍⬛", cost: 25000, bonusType: "gold", bonusValue: 15, description: "+15% Gold" },
  { id: "phoenix_chick", name: "Phoenix Chick", emoji: "🐥", cost: 80000, bonusType: "damage", bonusValue: 20, description: "+20% Damage" },
];

export function getPetBonus(equippedPetId, bonusType) {
  const pet = petList.find((p) => p.id === equippedPetId);
  if (!pet || pet.bonusType !== bonusType) return 0;
  return pet.bonusValue;
}