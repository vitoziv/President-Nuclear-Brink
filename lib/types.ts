export type StatEffects = {
  approval: number;
  economy: number;
  military: number;
  diplomacy: number;
};

export type Choice = {
  text: string;
  effects: StatEffects;
};

export type GameEvent = {
  id: string;
  description: string;
  characterName: string;
  characterType: string;
  leftChoice: Choice;
  rightChoice: Choice;
};

export type GameState = {
  approval: number;
  economy: number;
  military: number;
  diplomacy: number;
  turn: number;
  gameOver: boolean;
  gameOverReason: string;
};
