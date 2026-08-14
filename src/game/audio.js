// audio.js
// Menghasilkan efek suara sederhana menggunakan Web Audio API (tanpa file eksternal)

let audioContext = null;
let sfxEnabled = true;

function getContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

export function setSfxEnabled(enabled) {
  sfxEnabled = enabled;
}

// Fungsi dasar: mainkan satu nada (beep) dengan frekuensi dan durasi tertentu
function playTone(frequency, duration, type = "sine", volume = 0.15) {
  if (!sfxEnabled) return;

  try {
    const ctx = getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (err) {
    // Kalau browser tidak mendukung, gagal secara diam-diam (tidak mengganggu gameplay)
    console.warn("Audio playback failed:", err);
  }
}

export function playAttackSound() {
  playTone(220, 0.08, "square", 0.08);
}

export function playCriticalSound() {
  playTone(440, 0.15, "sawtooth", 0.15);
  setTimeout(() => playTone(660, 0.1, "sawtooth", 0.12), 60);
}

export function playLevelUpSound() {
  playTone(523, 0.12, "sine", 0.15);
  setTimeout(() => playTone(659, 0.12, "sine", 0.15), 100);
  setTimeout(() => playTone(784, 0.2, "sine", 0.15), 200);
}

export function playLootSound() {
  playTone(880, 0.1, "triangle", 0.1);
}

export function playBossDefeatSound() {
  playTone(196, 0.2, "sawtooth", 0.15);
  setTimeout(() => playTone(261, 0.2, "sawtooth", 0.15), 150);
  setTimeout(() => playTone(329, 0.3, "sawtooth", 0.15), 300);
}

export function playAscensionSound() {
  playTone(392, 0.15, "sine", 0.15);
  setTimeout(() => playTone(523, 0.15, "sine", 0.15), 120);
  setTimeout(() => playTone(659, 0.15, "sine", 0.15), 240);
  setTimeout(() => playTone(880, 0.4, "sine", 0.18), 360);
}