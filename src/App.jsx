import ToastNotification from "./components/ToastNotification";
import { useState, useEffect } from "react";
import CombatScreen from "./components/CombatScreen";
import BossScreen from "./components/BossScreen";
import UpgradePanel from "./components/UpgradePanel";
import SkillTreePanel from "./components/SkillTreePanel";
import WorldMapPanel from "./components/WorldMapPanel";
import AscensionPanel from "./components/AscensionPanel";
import InventoryPanel from "./components/InventoryPanel";
import QuestPanel from "./components/QuestPanel";
import SettingsPanel from "./components/SettingsPanel";
import OfflineProgressPopup from "./components/OfflineProgressPopup";
import BottomNav from "./components/BottomNav";
import EndlessTowerPanel from "./components/EndlessTowerPanel";
import NpcPanel from "./components/NpcPanel";
import { loadGame, useAutoSave } from "./game/useSaveGame";
import { useLevelUp } from "./game/useLevelUp";
import { useBossFight } from "./game/useBossFight";
import { useAchievementChecker } from "./game/useQuestsAndAchievements";
import { useOfflineProgressPopup } from "./game/useOfflineProgress";
import { getXpToNextLevel } from "./game/formulas";
import { getTotalDamageBonus, getTotalGoldBonus } from "./game/useSkillTree";
import { getGlobalBonusPercent } from "./game/useAscension";
import { formatNumber } from "./game/numberFormat";
import { playLevelUpSound, playLootSound, playBossDefeatSound, setSfxEnabled } from "./game/audio";
import "./App.css";

const KILLS_TO_UNLOCK_BOSS = 10;
const AVERAGE_GOLD_PER_KILL = 8;
const AVERAGE_XP_PER_KILL = 4;

function App() {
  const [gameState, setGameState] = useState(loadGame());
  const [currentAreaId, setCurrentAreaId] = useState("whispering_forest");
  const [isBossActive, setIsBossActive] = useState(false);
  const [activeTab, setActiveTab] = useState("battle");
  const [toasts, setToasts] = useState([]);

  function addToast(type, title, subtitle) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, title, subtitle }]);
  }

  function removeToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  useAutoSave(gameState);
  useLevelUp(gameState, setGameState);

  // Sinkronkan status SFX ke modul audio setiap kali gameState.sfxEnabled berubah
  useEffect(() => {
    setSfxEnabled(gameState.sfxEnabled);
  }, [gameState.sfxEnabled]);

  // Mainkan suara level up setiap kali level bertambah
  const prevLevelRef = useState(gameState.level)[0];
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useAchievementChecker(gameState, setGameState);

  const { offlineReport, claimOfflineProgress } = useOfflineProgressPopup(
    gameState, setGameState, AVERAGE_GOLD_PER_KILL, AVERAGE_XP_PER_KILL
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev) => ({ ...prev, lastSeenTimestamp: Date.now() }));
    }, 5000);
    return () => clearInterval(interval);
  }, [setGameState]);

  const globalBonusPercent = getGlobalBonusPercent(gameState.ascensionCount);

  function handleReward(gold, xp, droppedItem) {
    const skillGoldBonus = getTotalGoldBonus(gameState.unlockedSkills);
    const goldWithBonus = Math.floor(gold * (1 + (globalBonusPercent + skillGoldBonus) / 100));

    if (droppedItem) {
      playLootSound();
      addToast("loot", `${droppedItem.rarity.toUpperCase()} ITEM!`, droppedItem.name);
    }

    setGameState((prev) => ({
      ...prev,
      gold: prev.gold + goldWithBonus,
      xp: prev.xp + xp,
      killCount: prev.killCount + 1,
      totalKills: prev.totalKills + 1,
      totalGoldEarned: prev.totalGoldEarned + goldWithBonus,
      inventory: droppedItem ? [...prev.inventory, droppedItem] : prev.inventory,
    }));
  }

  function handleBossDefeated(gold, xp, skillPoints) {
    const goldWithBonus = Math.floor(gold * (1 + globalBonusPercent / 100));
    playBossDefeatSound();
    addToast("boss", "BOSS DEFEATED!", `+${skillPoints} Skill Points`);
    setGameState((prev) => ({
      ...prev,
      gold: prev.gold + goldWithBonus,
      xp: prev.xp + xp,
      skillPoint: prev.skillPoint + skillPoints,
      killCount: 0,
      totalKills: prev.totalKills + 1,
      totalGoldEarned: prev.totalGoldEarned + goldWithBonus,
      bossesDefeated: [...prev.bossesDefeated, currentAreaId],
    }));
    setIsBossActive(false);
  }

  function toggleAutoAttack() {
    setGameState((prev) => ({ ...prev, autoAttackEnabled: !prev.autoAttackEnabled }));
  }

  const xpNeeded = getXpToNextLevel(gameState.level);
  const skillDamageBonusPercent = getTotalDamageBonus(gameState.unlockedSkills);
  const totalDamageBonusPercent = skillDamageBonusPercent + globalBonusPercent;
  const equipmentDamageBonus = Object.values(gameState.equippedItems)
    .filter((item) => item && item.statType === "damageBonus")
    .reduce((total, item) => total + item.statValue, 0);

  const equipmentHpBonus = Object.values(gameState.equippedItems)
    .filter((item) => item && item.statType === "hpBonus")
    .reduce((total, item) => total + item.statValue, 0);

  const effectiveDamage = Math.floor(
    (gameState.damage + equipmentDamageBonus) * (1 + totalDamageBonusPercent / 100)
  );
  const effectiveHp = gameState.hp + equipmentHpBonus;

  const { boss, attackBoss } = useBossFight(effectiveDamage, currentAreaId, isBossActive, handleBossDefeated);
  const canChallengeBoss = gameState.killCount >= KILLS_TO_UNLOCK_BOSS && !isBossActive;

  return (
    <div style={{ color: "white", background: "#0a0a1a", minHeight: "100vh", paddingBottom: "70px", fontFamily: "sans-serif" }}>
      <div className="game-header">
        <h1 className="game-title">⚔️ ASCEND: INFINITE</h1>
        <div className="stat-bar" style={{ marginBottom: "10px" }}>
          <span>Lv.{formatNumber(gameState.level)}</span>
          <span>🪙 {formatNumber(gameState.gold)}</span>
          <span>✨ {formatNumber(gameState.xp)}/{formatNumber(xpNeeded)}</span>
          <span>🌟 {formatNumber(gameState.skillPoint)} SP</span>
        </div>
      </div>

      <div style={{ padding: "0 20px" }}>
        {activeTab === "battle" && (
          <>
            <button
              onClick={toggleAutoAttack}
              style={{
                marginBottom: "10px", padding: "8px 16px",
                background: gameState.autoAttackEnabled ? "#27ae60" : "#333",
                color: "white", border: "none", borderRadius: "6px", cursor: "pointer"
              }}
            >
              🤖 Auto Attack: {gameState.autoAttackEnabled ? "ON" : "OFF"}
            </button>

            {!isBossActive && (
              <CombatScreen
                damage={effectiveDamage}
                areaId={currentAreaId}
                onReward={handleReward}
                autoAttackEnabled={gameState.autoAttackEnabled}
                critChance={gameState.critChance}
                critMultiplier={gameState.critMultiplier}
              />
            )}

            {canChallengeBoss && (
              <button
                onClick={() => setIsBossActive(true)}
                style={{ marginTop: "15px", padding: "10px 20px", background: "#e74c3c", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" }}
              >
                🔥 Challenge Boss!
              </button>
            )}

            {isBossActive && <BossScreen boss={boss} attackBoss={attackBoss} />}

            <UpgradePanel gameState={gameState} setGameState={setGameState} />
          </>
        )}

        {activeTab === "skills" && (
          <SkillTreePanel gameState={gameState} setGameState={setGameState} />
        )}

        {activeTab === "inventory" && (
          <InventoryPanel gameState={gameState} setGameState={setGameState} />
        )}

        {activeTab === "world" && (
          <>
            <WorldMapPanel gameState={gameState} currentAreaId={currentAreaId} setCurrentAreaId={setCurrentAreaId} />
            <NpcPanel />
          </>
        )}

        {activeTab === "progress" && (
          <>
            <AscensionPanel gameState={gameState} setGameState={setGameState} />
            <EndlessTowerPanel damage={effectiveDamage} gameState={gameState} setGameState={setGameState} />
            <QuestPanel gameState={gameState} setGameState={setGameState} />
            <SettingsPanel gameState={gameState} setGameState={setGameState} />
          </>
        )}
      </div>

      <OfflineProgressPopup offlineReport={offlineReport} onClaim={claimOfflineProgress} />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <ToastNotification toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;