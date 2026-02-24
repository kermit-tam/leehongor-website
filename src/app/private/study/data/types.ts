/**
 * 類型定義
 */

export interface ExamplePair {
  id: string;
  scenario: string;
  spoken: string;
  written: string;
}

export interface StudyCard {
  id: string;
  subject: 'chinese' | 'english';
  lessonId?: string;
  isBasic?: boolean;
  character?: string;
  pinyin?: string;
  jyutping?: string;
  strokes?: number;
  word?: string;
  phonetic?: string;
  meaning: string;
  examples: ExamplePair[];
  category: string;
}

export interface Lesson {
  id: string;
  subject: 'chinese' | 'english';
  title: string;
  description: string;
  order: number;
  cardCount: number;
}
