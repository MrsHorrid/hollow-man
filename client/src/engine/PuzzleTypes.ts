/** PuzzleTypes.ts - Additional puzzle types for the game */
import { Puzzle, Vector3 } from '@shared/types/game';

// Extended puzzle types beyond the base game
export type ExtendedPuzzleType = 
  | 'switch'
  | 'code'
  | 'lever'
  | 'pressure_plate'
  | 'symbol_sequence'
  | 'memory_pattern'
  | 'timing_challenge'
  | 'circuit_connection'
  | 'riddle_text'
  | 'shadow_matching'
  | 'audio_pattern'
  | 'cooperative_button';

export interface ExtendedPuzzle extends Puzzle {
  type: ExtendedPuzzleType;
  // Type-specific data
  symbols?: string[];
  targetSequence?: string[];
  currentSequence?: string[];
  pattern?: number[];
  playerPattern?: number[];
  timeLimit?: number;
  riddleQuestion?: string;
  riddleAnswer?: string;
  shadowShape?: string;
  audioPattern?: string[];
  buttonOrder?: number[];
  pressedButtons?: number[];
  attempts?: number;
  maxAttempts?: number;
}

// Symbol sequence puzzle
export class SymbolSequencePuzzle {
  private symbols = ['◆', '●', '▲', '■', '★', '✦'];
  private sequence: string[] = [];
  private playerInput: string[] = [];
  private length: number;

  constructor(length: number = 4) {
    this.length = length;
    this.generateSequence();
  }

  private generateSequence(): void {
    this.sequence = [];
    for (let i = 0; i < this.length; i++) {
      this.sequence.push(this.symbols[Math.floor(Math.random() * this.symbols.length)]);
    }
  }

  getSequence(): string[] {
    return this.sequence;
  }

  getDisplaySequence(): string[] {
    // Show sequence with some hidden (for harder difficulty)
    return this.sequence.map((s, i) => (i < this.length - 2 ? s : '?'));
  }

  input(symbol: string): boolean {
    this.playerInput.push(symbol);
    
    if (this.playerInput.length > this.sequence.length) {
      this.playerInput.shift();
    }

    return this.checkWin();
  }

  checkWin(): boolean {
    if (this.playerInput.length !== this.sequence.length) return false;
    return this.playerInput.every((s, i) => s === this.sequence[i]);
  }

  reset(): void {
    this.playerInput = [];
    this.generateSequence();
  }
}

// Memory pattern puzzle (Simon says style)
export class MemoryPatternPuzzle {
  private pattern: number[] = [];
  private playerPattern: number[] = [];
  private currentLength: number = 3;
  private maxLength: number;

  constructor(maxLength: number = 6) {
    this.maxLength = maxLength;
    this.generatePattern();
  }

  private generatePattern(): void {
    this.pattern = [];
    for (let i = 0; i < this.currentLength; i++) {
      this.pattern.push(Math.floor(Math.random() * 4));
    }
  }

  getPattern(): number[] {
    return this.pattern;
  }

  input(index: number): { correct: boolean; complete: boolean; failed?: boolean } {
    this.playerPattern.push(index);

    // Check if input matches so far
    for (let i = 0; i < this.playerPattern.length; i++) {
      if (this.playerPattern[i] !== this.pattern[i]) {
        this.playerPattern = [];
        return { correct: false, complete: false, failed: true };
      }
    }

    const complete = this.playerPattern.length === this.pattern.length;
    
    if (complete) {
      this.currentLength++;
      if (this.currentLength > this.maxLength) {
        return { correct: true, complete: true };
      }
      this.generatePattern();
      this.playerPattern = [];
      return { correct: true, complete: false };
    }

    return { correct: true, complete: false };
  }

  reset(): void {
    this.currentLength = 3;
    this.playerPattern = [];
    this.generatePattern();
  }
}

// Timing challenge puzzle
export class TimingChallengePuzzle {
  private targetZones: Array<{ start: number; end: number }> = [];
  private currentZone: number = 0;
  private progress: number = 0;
  private speed: number;

  constructor(difficulty: 'easy' | 'medium' | 'hard' = 'medium') {
    this.speed = difficulty === 'easy' ? 1 : difficulty === 'hard' ? 3 : 2;
    this.generateZones();
  }

  private generateZones(): void {
    this.targetZones = [];
    const zoneCount = 3;
    
    for (let i = 0; i < zoneCount; i++) {
      const start = 20 + Math.random() * 40;
      const width = 15 + Math.random() * 20;
      this.targetZones.push({ start, end: start + width });
    }
  }

  update(deltaTime: number): void {
    this.progress += this.speed * deltaTime * 10;
    if (this.progress > 100) {
      this.progress = 0;
    }
  }

  tryHit(): { hit: boolean; complete: boolean } {
    const zone = this.targetZones[this.currentZone];
    const hit = this.progress >= zone.start && this.progress <= zone.end;

    if (hit) {
      this.currentZone++;
      if (this.currentZone >= this.targetZones.length) {
        return { hit: true, complete: true };
      }
      this.progress = 0;
      return { hit: true, complete: false };
    }

    return { hit: false, complete: false };
  }

  getProgress(): number {
    return this.progress;
  }

  getCurrentZone(): number {
    return this.currentZone;
  }

  getTargetZones(): Array<{ start: number; end: number }> {
    return this.targetZones;
  }

  reset(): void {
    this.currentZone = 0;
    this.progress = 0;
    this.generateZones();
  }
}

// Riddle puzzle
export class RiddlePuzzle {
  private riddles: Array<{ question: string; answer: string; hint: string }> = [
    {
      question: "I have no face, no hands, no feet. I roam the woods but never eat. What am I?",
      answer: "shadow",
      hint: "I follow you but have no weight."
    },
    {
      question: "The more you take, the more you leave behind. What am I?",
      answer: "footsteps",
      hint: "You make me when you walk."
    },
    {
      question: "I have cities, but no houses live there. I have mountains, but no trees grow there. I have water, but no fish swim there. What am I?",
      answer: "map",
      hint: "I help you find your way."
    },
    {
      question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
      answer: "echo",
      hint: "I repeat what you say."
    },
    {
      question: "The man who made me doesn't want me. The man who bought me doesn't need me. The man who needs me doesn't know it. What am I?",
      answer: "coffin",
      hint: "I am the final bed."
    },
  ];

  private currentRiddle: { question: string; answer: string; hint: string };
  private attempts: number = 0;
  private maxAttempts: number = 3;

  constructor() {
    this.currentRiddle = this.riddles[Math.floor(Math.random() * this.riddles.length)];
  }

  getQuestion(): string {
    return this.currentRiddle.question;
  }

  getHint(): string {
    return this.currentRiddle.hint;
  }

  checkAnswer(answer: string): { correct: boolean; hint?: string; gameOver?: boolean } {
    this.attempts++;
    const normalized = answer.toLowerCase().trim();
    const correct = normalized === this.currentRiddle.answer.toLowerCase() ||
                   this.currentRiddle.answer.toLowerCase().includes(normalized);

    if (correct) {
      return { correct: true };
    }

    if (this.attempts >= this.maxAttempts) {
      return { correct: false, gameOver: true };
    }

    return { 
      correct: false, 
      hint: this.attempts >= 2 ? this.currentRiddle.hint : undefined 
    };
  }

  getAttemptsRemaining(): number {
    return this.maxAttempts - this.attempts;
  }

  reset(): void {
    this.currentRiddle = this.riddles[Math.floor(Math.random() * this.riddles.length)];
    this.attempts = 0;
  }
}

// Cooperative button puzzle (requires multiple players to press buttons simultaneously)
export class CooperativeButtonPuzzle {
  private buttonCount: number;
  private pressedButtons: Set<number> = new Set();
  private requiredButtons: Set<number> = new Set();
  private timeWindow: number = 3000; // ms
  private lastPressTime: number = 0;

  constructor(buttonCount: number = 3) {
    this.buttonCount = buttonCount;
    this.selectRequiredButtons();
  }

  private selectRequiredButtons(): void {
    this.requiredButtons.clear();
    const required = Math.min(2, this.buttonCount); // At least 2 buttons needed
    
    while (this.requiredButtons.size < required) {
      this.requiredButtons.add(Math.floor(Math.random() * this.buttonCount));
    }
  }

  pressButton(buttonIndex: number, playerId: string, gameTime: number): {
    success: boolean;
    complete: boolean;
    message: string;
    reset?: boolean;
  } {
    // Check if too much time has passed since last press
    if (this.lastPressTime > 0 && gameTime - this.lastPressTime > this.timeWindow) {
      this.pressedButtons.clear();
      this.lastPressTime = 0;
      return { success: false, complete: false, message: 'Too slow! Resetting...', reset: true };
    }

    this.lastPressTime = gameTime;

    if (!this.requiredButtons.has(buttonIndex)) {
      this.pressedButtons.clear();
      this.lastPressTime = 0;
      return { success: false, complete: false, message: 'Wrong button! Resetting...', reset: true };
    }

    if (this.pressedButtons.has(buttonIndex)) {
      return { success: false, complete: false, message: 'Button already pressed!' };
    }

    this.pressedButtons.add(buttonIndex);

    const remaining = this.requiredButtons.size - this.pressedButtons.size;
    
    if (remaining === 0) {
      return { success: true, complete: true, message: 'Puzzle solved!' };
    }

    return { 
      success: true, 
      complete: false, 
      message: `${remaining} more button${remaining > 1 ? 's' : ''} needed!` 
    };
  }

  releaseButton(buttonIndex: number): void {
    this.pressedButtons.delete(buttonIndex);
  }

  getRequiredButtons(): number[] {
    return Array.from(this.requiredButtons);
  }

  getPressedButtons(): number[] {
    return Array.from(this.pressedButtons);
  }

  reset(): void {
    this.pressedButtons.clear();
    this.lastPressTime = 0;
    this.selectRequiredButtons();
  }
}

// Puzzle factory
export const createPuzzle = (
  type: ExtendedPuzzleType,
  position: Vector3,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): ExtendedPuzzle => {
  const basePuzzle: ExtendedPuzzle = {
    id: `puzzle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    position,
    solved: false,
    requiresPlayers: type === 'pressure_plate' || type === 'cooperative_button' ? 2 : 1,
    activatedBy: [],
    rewardDescription: getRewardDescription(type),
    attempts: 0,
    maxAttempts: 3,
  };

  switch (type) {
    case 'symbol_sequence':
      const seqPuzzle = new SymbolSequencePuzzle(difficulty === 'hard' ? 6 : difficulty === 'medium' ? 4 : 3);
      basePuzzle.symbols = ['◆', '●', '▲', '■', '★', '✦'];
      basePuzzle.targetSequence = seqPuzzle.getSequence();
      basePuzzle.currentSequence = [];
      break;

    case 'memory_pattern':
      const memPuzzle = new MemoryPatternPuzzle(difficulty === 'hard' ? 8 : 6);
      basePuzzle.pattern = memPuzzle.getPattern();
      basePuzzle.playerPattern = [];
      break;

    case 'riddle_text':
      const riddlePuzzle = new RiddlePuzzle();
      basePuzzle.riddleQuestion = riddlePuzzle.getQuestion();
      basePuzzle.riddleAnswer = 'hidden'; // Don't expose this
      break;

    case 'timing_challenge':
      basePuzzle.timeLimit = difficulty === 'hard' ? 10 : difficulty === 'medium' ? 15 : 20;
      break;

    case 'cooperative_button':
      const coopPuzzle = new CooperativeButtonPuzzle(3);
      basePuzzle.buttonOrder = coopPuzzle.getRequiredButtons();
      basePuzzle.pressedButtons = [];
      break;
  }

  return basePuzzle;
};

function getRewardDescription(type: ExtendedPuzzleType): string {
  const descriptions: Record<ExtendedPuzzleType, string> = {
    switch: 'Power restored to the area',
    code: 'Lock mechanism disengaged',
    lever: 'Hidden passage revealed',
    pressure_plate: 'Heavy door opened',
    symbol_sequence: 'Ancient mechanism activated',
    memory_pattern: 'Security system bypassed',
    timing_challenge: 'Timed lock opened',
    circuit_connection: 'Emergency power online',
    riddle_text: 'Knowledge barrier removed',
    shadow_matching: 'Optical illusion dispelled',
    audio_pattern: 'Sound lock disengaged',
    cooperative_button: 'Teamwork triumphs',
  };
  return descriptions[type] || 'Mystery solved';
}

export default {
  SymbolSequencePuzzle,
  MemoryPatternPuzzle,
  TimingChallengePuzzle,
  RiddlePuzzle,
  CooperativeButtonPuzzle,
  createPuzzle,
};
