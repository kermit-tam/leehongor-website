/**
 * N5 課程類型定義
 */

export interface N5Vocab {
  hiragana: string;
  kanji: string;
  meaning: string;
  cantonese?: string;
  note?: string;
}

export interface GrammarPoint {
  pattern: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
}

export interface ListeningItem {
  title: string;
  audioScript: string;
  translation: string;
  keyPhrases: string[];
}

export interface DialogueItem {
  speaker: string;
  japanese: string;
  cantonese?: string;
  meaning: string;
}

export interface N5Unit {
  id: number;
  title: string;
  subtitle: string;
  vocab: N5Vocab[];
  grammar?: GrammarPoint[];
  listening?: ListeningItem;
  dialogue?: DialogueItem[];
  estimatedTime: number;
}

export interface N5Lesson {
  id: string;
  lessonNum: number;
  title: string;
  description: string;
  totalVocab: number;
  totalTime: number;
  units: N5Unit[];
}
