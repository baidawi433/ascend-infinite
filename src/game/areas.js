// areas.js
// Data area/wilayah dunia Elyndra, dengan tema warna dan lore masing-masing

export const areaList = [
  { id: "whispering_forest", name: "Whispering Forest", emoji: "🌲", levelRequirement: 1, minLevel: 1, maxLevel: 10, themeColor: "#1a3a1a",
    lore: "Konon pohon-pohon di sini pernah berbisik peringatan kepada siapa pun yang membawa pecahan Infinite Core. Sekarang mereka hanya diam, menyaksikan." },
  { id: "burning_desert", name: "Burning Desert", emoji: "🏜️", levelRequirement: 11, minLevel: 11, maxLevel: 25, themeColor: "#3a2a10",
    lore: "Pasir di gurun ini menyimpan reruntuhan kerajaan yang hancur akibat keserakahan atas Core. Panasnya bukan hanya dari matahari." },
  { id: "frozen_kingdom", name: "Frozen Kingdom", emoji: "❄️", levelRequirement: 26, minLevel: 26, maxLevel: 50, themeColor: "#1a2a3a",
    lore: "Kerajaan yang membeku dalam semalam, saat Ratu Es mencoba menguasai pecahan Core untuk dirinya sendiri." },
  { id: "inferno_valley", name: "Inferno Valley", emoji: "🌋", levelRequirement: 51, minLevel: 51, maxLevel: 100, themeColor: "#3a1010",
    lore: "Lembah ini terbakar abadi sejak Titan Api bangkit dari perutnya, murka karena Core-nya dicuri." },
  { id: "shadow_realm", name: "Shadow Realm", emoji: "🌑", levelRequirement: 101, minLevel: 101, maxLevel: 200, themeColor: "#20102a",
    lore: "Bukan tempat, melainkan celah antara dunia. Di sinilah bayangan setiap makhluk yang pernah mati karena Core berkumpul." },
  { id: "necropolis", name: "Necropolis", emoji: "💀", levelRequirement: 201, minLevel: 201, maxLevel: 350, themeColor: "#1a1a1a",
    lore: "Kota mati yang dibangkitkan oleh seorang Raja Nekromancer yang menolak menerima ajalnya sendiri." },
  { id: "demon_abyss", name: "Demon Abyss", emoji: "👹", levelRequirement: 351, minLevel: 351, maxLevel: 500, themeColor: "#2a0a1a",
    lore: "Jurang yang menghubungkan Elyndra dengan alam para iblis, terbuka lebar sejak Core pecah dan menyentuh dunia bawah." },
  { id: "void_dimension", name: "Void Dimension", emoji: "🌌", levelRequirement: 501, minLevel: 501, maxLevel: 750, themeColor: "#10102a",
    lore: "Ruang tanpa hukum fisika, tempat pecahan Core yang paling murni bersembunyi — dijaga oleh entitas yang lebih tua dari waktu itu sendiri." },
  { id: "celestial_realm", name: "Celestial Realm", emoji: "✨", levelRequirement: 751, minLevel: 751, maxLevel: 1000, themeColor: "#2a2a1a",
    lore: "Surga yang jatuh setengah, saat para malaikat penjaganya terpecah menjadi yang setia dan yang murtad demi kekuatan Core." },
  { id: "infinity_realm", name: "Infinity Realm", emoji: "♾️", levelRequirement: 1001, minLevel: 1001, maxLevel: 999999, themeColor: "#0a0a2a",
    lore: "Bukan lagi tempat, melainkan konsep. Di sinilah Ascension sejati terjadi — dan di sinilah The Ascended menunggu." },
];

export function getAreaThemeColor(areaId) {
  const area = areaList.find((a) => a.id === areaId);
  return area ? area.themeColor : "#1a1a2e";
}