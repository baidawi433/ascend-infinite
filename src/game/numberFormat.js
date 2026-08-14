// numberFormat.js
// Mengubah angka besar menjadi format singkat: 1.25M, 3.4B, dst

const suffixes = [
  { value: 1e33, symbol: "Dc" },
  { value: 1e30, symbol: "No" },
  { value: 1e27, symbol: "Oc" },
  { value: 1e24, symbol: "Sp" },
  { value: 1e21, symbol: "Sx" },
  { value: 1e18, symbol: "Qi" },
  { value: 1e15, symbol: "Qa" },
  { value: 1e12, symbol: "T" },
  { value: 1e9, symbol: "B" },
  { value: 1e6, symbol: "M" },
  { value: 1e3, symbol: "K" },
];

export function formatNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return "0";

  const isNegative = num < 0;
  const absNum = Math.abs(num);

  // Angka di bawah 1000 ditampilkan apa adanya (dibulatkan ke bawah)
  if (absNum < 1000) {
    return (isNegative ? "-" : "") + Math.floor(absNum).toString();
  }

  for (const suffix of suffixes) {
    if (absNum >= suffix.value) {
      const shortNum = absNum / suffix.value;
      // Tampilkan 2 angka desimal, tapi hilangkan .00 jika tidak perlu
      const formatted = shortNum.toFixed(2).replace(/\.?0+$/, "");
      return (isNegative ? "-" : "") + formatted + suffix.symbol;
    }
  }

  return (isNegative ? "-" : "") + Math.floor(absNum).toString();
}