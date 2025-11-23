export interface HanziChar {
  char: string;
  pinyin: string;
  meaning: string;
  visualization: string;
}

export type AppView = 'start' | 'quiz' | 'results';

export interface AppState {
  view: AppView;
  currentSet: HanziChar[];
  currentIndex: number;
  sessionForgotten: HanziChar[];
  persistentForgotten: string[]; // Stores only the char string
}