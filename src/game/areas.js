// areas.js
// Data area/wilayah dunia Elyndra (10 area), dengan tema warna masing-masing

export const areaList = [
  { id: "whispering_forest", name: "Whispering Forest", emoji: "🌲", levelRequirement: 1, minLevel: 1, maxLevel: 10, themeColor: "#1a3a1a" },
  { id: "burning_desert", name: "Burning Desert", emoji: "🏜️", levelRequirement: 11, minLevel: 11, maxLevel: 25, themeColor: "#3a2a10" },
  { id: "frozen_kingdom", name: "Frozen Kingdom", emoji: "❄️", levelRequirement: 26, minLevel: 26, maxLevel: 50, themeColor: "#1a2a3a" },
  { id: "inferno_valley", name: "Inferno Valley", emoji: "🌋", levelRequirement: 51, minLevel: 51, maxLevel: 100, themeColor: "#3a1010" },
  { id: "shadow_realm", name: "Shadow Realm", emoji: "🌑", levelRequirement: 101, minLevel: 101, maxLevel: 200, themeColor: "#20102a" },
  { id: "necropolis", name: "Necropolis", emoji: "💀", levelRequirement: 201, minLevel: 201, maxLevel: 350, themeColor: "#1a1a1a" },
  { id: "demon_abyss", name: "Demon Abyss", emoji: "👹", levelRequirement: 351, minLevel: 351, maxLevel: 500, themeColor: "#2a0a1a" },
  { id: "void_dimension", name: "Void Dimension", emoji: "🌌", levelRequirement: 501, minLevel: 501, maxLevel: 750, themeColor: "#10102a" },
  { id: "celestial_realm", name: "Celestial Realm", emoji: "✨", levelRequirement: 751, minLevel: 751, maxLevel: 1000, themeColor: "#2a2a1a" },
  { id: "infinity_realm", name: "Infinity Realm", emoji: "♾️", levelRequirement: 1001, minLevel: 1001, maxLevel: 999999, themeColor: "#0a0a2a" },
];

export function getAreaThemeColor(areaId) {
  const area = areaList.find((a) => a.id === areaId);
  return area ? area.themeColor : "#1a1a2e";
}