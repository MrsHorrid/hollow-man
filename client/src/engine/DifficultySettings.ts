/** DifficultySettings.ts - Game difficulty configuration system */
import { MonsterAIConfig } from './MonsterAI';

export type DifficultyLevel = 'novice' | 'survivor' | 'nightmare' | 'hollow';

export interface DifficultySettings {
  // Display
  name: string;
  description: string;
  color: string;
  
  // Monster settings
  monster: MonsterAIConfig;
  
  // Game settings
  pageCount: number;
  puzzleCount: number;
  playerStaminaDrain: number;
  playerStaminaRegen: number;
  flashlightDrain: number;
  monsterSpeedMultiplier: number;
  monsterDetectionMultiplier: number;
  
  // Environmental
  ambientEventFrequency: number; // 0-1
  weatherIntensity: number; // 0-1
  fogDensity: number;
  
  // Jumpscare settings
  jumpscareFrequency: number; // 0-1
  jumpscareIntensityMultiplier: number;
  
  // Puzzle settings
  puzzleTimeLimit: number; // seconds, 0 = no limit
  puzzleMaxAttempts: number;
  
  // Win conditions
  pagesRequiredToWin: number; // percentage, 1 = all
  
  // Loss conditions
  respawnEnabled: boolean;
  respawnTime: number; // seconds
}

const BASE_MONSTER_CONFIG: MonsterAIConfig = {
  baseSpeed: 3.5,
  sprintSpeed: 8.0,
  detectionRadius: 60,
  attackRange: 2.5,
  teleportCooldown: 15000,
  stalkDistance: 25,
  huntTimeout: 30000,
  intelligence: 0.7,
  aggression: 0.6,
};

export const DIFFICULTY_PRESETS: Record<DifficultyLevel, DifficultySettings> = {
  novice: {
    name: 'NOVICE',
    description: 'For those new to the forest. The Hollow Man is slower and less perceptive.',
    color: '#44ff44',
    
    monster: {
      ...BASE_MONSTER_CONFIG,
      baseSpeed: 2.5,
      sprintSpeed: 5.0,
      detectionRadius: 40,
      teleportCooldown: 25000,
      intelligence: 0.4,
      aggression: 0.3,
    },
    
    pageCount: 6,
    puzzleCount: 3,
    playerStaminaDrain: 10,
    playerStaminaRegen: 15,
    flashlightDrain: 2,
    monsterSpeedMultiplier: 0.7,
    monsterDetectionMultiplier: 0.6,
    
    ambientEventFrequency: 0.2,
    weatherIntensity: 0.2,
    fogDensity: 0.03,
    
    jumpscareFrequency: 0.1,
    jumpscareIntensityMultiplier: 0.5,
    
    puzzleTimeLimit: 0,
    puzzleMaxAttempts: 5,
    
    pagesRequiredToWin: 0.8, // 80% of pages
    
    respawnEnabled: true,
    respawnTime: 30,
  },
  
  survivor: {
    name: 'SURVIVOR',
    description: 'The standard experience. Face the forest as it was meant to be experienced.',
    color: '#ffaa00',
    
    monster: {
      ...BASE_MONSTER_CONFIG,
      baseSpeed: 3.5,
      sprintSpeed: 8.0,
      detectionRadius: 60,
      teleportCooldown: 15000,
      intelligence: 0.7,
      aggression: 0.6,
    },
    
    pageCount: 8,
    puzzleCount: 4,
    playerStaminaDrain: 15,
    playerStaminaRegen: 10,
    flashlightDrain: 3,
    monsterSpeedMultiplier: 1.0,
    monsterDetectionMultiplier: 1.0,
    
    ambientEventFrequency: 0.4,
    weatherIntensity: 0.4,
    fogDensity: 0.04,
    
    jumpscareFrequency: 0.3,
    jumpscareIntensityMultiplier: 1.0,
    
    puzzleTimeLimit: 0,
    puzzleMaxAttempts: 3,
    
    pagesRequiredToWin: 1.0, // All pages
    
    respawnEnabled: false,
    respawnTime: 0,
  },
  
  nightmare: {
    name: 'NIGHTMARE',
    description: 'The forest is darker. The Hollow Man is faster, smarter, and hungrier.',
    color: '#ff4444',
    
    monster: {
      ...BASE_MONSTER_CONFIG,
      baseSpeed: 5.0,
      sprintSpeed: 11.0,
      detectionRadius: 80,
      attackRange: 3.5,
      teleportCooldown: 8000,
      intelligence: 0.9,
      aggression: 0.85,
    },
    
    pageCount: 10,
    puzzleCount: 5,
    playerStaminaDrain: 20,
    playerStaminaRegen: 5,
    flashlightDrain: 5,
    monsterSpeedMultiplier: 1.4,
    monsterDetectionMultiplier: 1.3,
    
    ambientEventFrequency: 0.7,
    weatherIntensity: 0.7,
    fogDensity: 0.06,
    
    jumpscareFrequency: 0.6,
    jumpscareIntensityMultiplier: 1.5,
    
    puzzleTimeLimit: 60,
    puzzleMaxAttempts: 2,
    
    pagesRequiredToWin: 1.0,
    
    respawnEnabled: false,
    respawnTime: 0,
  },
  
  hollow: {
    name: 'HOLLOW',
    description: 'You should not have come here. The forest shows no mercy.',
    color: '#aa00ff',
    
    monster: {
      ...BASE_MONSTER_CONFIG,
      baseSpeed: 6.5,
      sprintSpeed: 14.0,
      detectionRadius: 100,
      attackRange: 4.0,
      teleportCooldown: 5000,
      huntTimeout: 60000,
      intelligence: 1.0,
      aggression: 1.0,
    },
    
    pageCount: 12,
    puzzleCount: 6,
    playerStaminaDrain: 25,
    playerStaminaRegen: 3,
    flashlightDrain: 8,
    monsterSpeedMultiplier: 1.8,
    monsterDetectionMultiplier: 1.5,
    
    ambientEventFrequency: 1.0,
    weatherIntensity: 1.0,
    fogDensity: 0.08,
    
    jumpscareFrequency: 0.9,
    jumpscareIntensityMultiplier: 2.0,
    
    puzzleTimeLimit: 45,
    puzzleMaxAttempts: 1,
    
    pagesRequiredToWin: 1.0,
    
    respawnEnabled: false,
    respawnTime: 0,
  },
};

// Manager class for difficulty
export class DifficultyManager {
  private currentDifficulty: DifficultyLevel = 'survivor';
  private customSettings: Partial<DifficultySettings> | null = null;

  setDifficulty(level: DifficultyLevel): void {
    this.currentDifficulty = level;
    this.customSettings = null;
    this.saveSettings();
  }

  setCustomSettings(settings: Partial<DifficultySettings>): void {
    this.customSettings = settings;
    this.saveSettings();
  }

  getSettings(): DifficultySettings {
    const base = DIFFICULTY_PRESETS[this.currentDifficulty];
    if (this.customSettings) {
      return { ...base, ...this.customSettings };
    }
    return base;
  }

  getCurrentDifficulty(): DifficultyLevel {
    return this.currentDifficulty;
  }

  isCustom(): boolean {
    return this.customSettings !== null;
  }

  private saveSettings(): void {
    localStorage.setItem('hollow-man-difficulty', this.currentDifficulty);
    if (this.customSettings) {
      localStorage.setItem('hollow-man-difficulty-custom', JSON.stringify(this.customSettings));
    } else {
      localStorage.removeItem('hollow-man-difficulty-custom');
    }
  }

  loadSettings(): void {
    const saved = localStorage.getItem('hollow-man-difficulty');
    if (saved && saved in DIFFICULTY_PRESETS) {
      this.currentDifficulty = saved as DifficultyLevel;
    }

    const custom = localStorage.getItem('hollow-man-difficulty-custom');
    if (custom) {
      try {
        this.customSettings = JSON.parse(custom);
      } catch (e) {
        console.warn('Failed to load custom difficulty settings');
      }
    }
  }

  // Get difficulty modifiers for various systems
  getMonsterSpeedModifier(): number {
    return this.getSettings().monsterSpeedMultiplier;
  }

  getStaminaDrainRate(): number {
    return this.getSettings().playerStaminaDrain;
  }

  getStaminaRegenRate(): number {
    return this.getSettings().playerStaminaRegen;
  }

  getAmbientEventChance(): number {
    return this.getSettings().ambientEventFrequency;
  }

  getJumpscareChance(): number {
    return this.getSettings().jumpscareFrequency;
  }

  getFogDensity(): number {
    return this.getSettings().fogDensity;
  }

  getRequiredPages(totalPages: number): number {
    const settings = this.getSettings();
    return Math.ceil(totalPages * settings.pagesRequiredToWin);
  }
}

// Difficulty selector UI component styles
export const difficultyStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    width: '100%',
  },
  option: (selected: boolean, color: string): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: selected ? `${color}20` : 'rgba(0,0,0,0.4)',
    border: `1px solid ${selected ? color : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }),
  colorIndicator: (color: string): React.CSSProperties => ({
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: color,
    boxShadow: `0 0 10px ${color}`,
  }),
  info: {
    flex: 1,
  },
  name: {
    fontSize: '14px',
    letterSpacing: '2px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  description: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: '0.5px',
  },
  checkmark: {
    fontSize: '18px',
    color: '#44ff44',
  },
};

// Helper to get difficulty description
export function getDifficultyDescription(level: DifficultyLevel): string {
  return DIFFICULTY_PRESETS[level].description;
}

// Helper to get difficulty color
export function getDifficultyColor(level: DifficultyLevel): string {
  return DIFFICULTY_PRESETS[level].color;
}

export default DifficultyManager;
