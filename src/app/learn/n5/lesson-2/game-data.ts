/**
 * 第2課遊戲化數據結構
 * Lesson 2 Gamified Data Structures
 */

// ==================== 詞彙數據 ====================

export interface GameVocab {
  id: string;
  hiragana: string;
  kanji: string;
  meaning: string;
  cantonese: string;
  note?: string;
  emoji?: string;
  category: 'pronoun' | 'stationery' | 'item' | 'electronics' | 'furniture' | 'food' | 'language' | 'phrase';
}

export const lesson2Vocab: GameVocab[] = [
  // Unit 1: 指示代名詞
  { id: '2-1-1', hiragana: 'これ', kanji: '', meaning: '這（離說話人近的東西）', cantonese: '哥咧', category: 'pronoun', emoji: '👆', note: '' },
  { id: '2-1-2', hiragana: 'それ', kanji: '', meaning: '那（離聽話人近的東西）', cantonese: '梳咧', category: 'pronoun', emoji: '👉', note: '' },
  { id: '2-1-3', hiragana: 'あれ', kanji: '', meaning: '那（離說話人、聽話人都遠的東西）', cantonese: '阿咧', category: 'pronoun', emoji: '👋', note: '' },
  { id: '2-1-4', hiragana: 'この ～', kanji: '', meaning: '這個', cantonese: '哥囉', category: 'pronoun', emoji: '📍', note: '後接名詞' },
  { id: '2-1-5', hiragana: 'その ～', kanji: '', meaning: '那個', cantonese: '梳囉', category: 'pronoun', emoji: '📌', note: '後接名詞' },
  { id: '2-1-6', hiragana: 'あの ～', kanji: '', meaning: '那個', cantonese: '阿囉', category: 'pronoun', emoji: '📎', note: '後接名詞' },
  
  // Unit 2: 日常用品
  { id: '2-2-1', hiragana: 'ほん', kanji: '本', meaning: '書', cantonese: '虹', category: 'stationery', emoji: '📚' },
  { id: '2-2-2', hiragana: 'じしょ', kanji: '辞書', meaning: '字典', cantonese: '芝梳', category: 'stationery', emoji: '📖' },
  { id: '2-2-3', hiragana: 'ざっし', kanji: '雑誌', meaning: '雜誌', cantonese: '咋士', category: 'stationery', emoji: '📰' },
  { id: '2-2-4', hiragana: 'しんぶん', kanji: '新聞', meaning: '報紙', cantonese: '心崩', category: 'stationery', emoji: '🗞️' },
  { id: '2-2-5', hiragana: 'ノート', kanji: '', meaning: '筆記本', cantonese: '囉多', category: 'stationery', emoji: '📝', note: '外來語' },
  { id: '2-2-6', hiragana: 'てちょう', kanji: '手帳', meaning: '記事本', cantonese: '鉄昭', category: 'stationery', emoji: '📒' },
  { id: '2-2-7', hiragana: 'めいし', kanji: '名刺', meaning: '名片', cantonese: '咩西', category: 'item', emoji: '🪪' },
  { id: '2-2-8', hiragana: 'カード', kanji: '', meaning: '卡片', cantonese: '卡多', category: 'item', emoji: '💳', note: '外來語' },
  { id: '2-2-9', hiragana: 'えんぴつ', kanji: '鉛筆', meaning: '鉛筆', cantonese: '胭筆', category: 'stationery', emoji: '✏️' },
  { id: '2-2-10', hiragana: 'ボールペン', kanji: '', meaning: '圓珠筆', cantonese: '波囉筆', category: 'stationery', emoji: '🖊️', note: '外來語' },
  { id: '2-2-11', hiragana: 'シャープペンシル', kanji: '', meaning: '自動鉛筆', cantonese: '些阿啤 芯梳', category: 'stationery', emoji: '✏️', note: '外來語' },
  
  // Unit 3: 電器和家具
  { id: '2-3-1', hiragana: 'かぎ', kanji: '鍵', meaning: '鑰匙', cantonese: '卡gi', category: 'item', emoji: '🔑' },
  { id: '2-3-2', hiragana: 'とけい', kanji: '時計', meaning: '鐘表', cantonese: '多kei', category: 'item', emoji: '⌚' },
  { id: '2-3-3', hiragana: 'かさ', kanji: '傘', meaning: '傘', cantonese: '卡撒', category: 'item', emoji: '☂️' },
  { id: '2-3-4', hiragana: 'かばん', kanji: '', meaning: '皮包、提包', cantonese: '卡崩', category: 'item', emoji: '💼' },
  { id: '2-3-5', hiragana: 'CD', kanji: '', meaning: 'CD、光盤', cantonese: '西迪', category: 'electronics', emoji: '💿', note: '外來語' },
  { id: '2-3-6', hiragana: 'テレビ', kanji: '', meaning: '電視', cantonese: '堤碑', category: 'electronics', emoji: '📺', note: '外來語' },
  { id: '2-3-7', hiragana: 'ラジオ', kanji: '', meaning: '收音機', cantonese: '啦芝哦', category: 'electronics', emoji: '📻', note: '外來語' },
  { id: '2-3-8', hiragana: 'カメラ', kanji: '', meaning: '照相機', cantonese: '卡咩啦', category: 'electronics', emoji: '📷', note: '外來語' },
  { id: '2-3-9', hiragana: 'コンピューター', kanji: '', meaning: '電腦', cantonese: '拱啤有多', category: 'electronics', emoji: '💻', note: '外來語' },
  { id: '2-3-10', hiragana: 'くるま', kanji: '車', meaning: '汽車', cantonese: '古路嘛', category: 'item', emoji: '🚗' },
  { id: '2-3-11', hiragana: 'つくえ', kanji: '机', meaning: '桌子', cantonese: '刺古也', category: 'furniture', emoji: '🪑' },
  { id: '2-3-12', hiragana: 'いす', kanji: '椅子', meaning: '椅子', cantonese: '衣士', category: 'furniture', emoji: '🪑' },
  
  // Unit 4: 食物和語言
  { id: '2-4-1', hiragana: 'チョコレート', kanji: '', meaning: '巧克力', cantonese: '租古咧多', category: 'food', emoji: '🍫', note: '外來語' },
  { id: '2-4-2', hiragana: 'コーヒー', kanji: '', meaning: '咖啡', cantonese: '拱啡', category: 'food', emoji: '☕', note: '外來語' },
  { id: '2-4-3', hiragana: '[お]みやげ', kanji: '[お]土産', meaning: '禮物', cantonese: '[哦]咪也gi', category: 'item', emoji: '🎁' },
  { id: '2-4-4', hiragana: 'えいご', kanji: '英語', meaning: '英語', cantonese: '英語', category: 'language', emoji: '🇬🇧' },
  { id: '2-4-5', hiragana: 'にほんご', kanji: '日本語', meaning: '日語', cantonese: '你虹語', category: 'language', emoji: '🇯🇵' },
  { id: '2-4-6', hiragana: '～ご', kanji: '～語', meaning: '～語', cantonese: '語', category: 'language', emoji: '🗣️' },
  { id: '2-4-7', hiragana: 'なん', kanji: '何', meaning: '什麼', cantonese: '難', category: 'phrase', emoji: '❓' },
  
  // Unit 5: 基本對話
  { id: '2-5-1', hiragana: 'そう', kanji: '', meaning: '是（肯定回答）', cantonese: '搜', category: 'phrase', emoji: '👍' },
  { id: '2-5-2', hiragana: 'あのう', kanji: '', meaning: '欸...', cantonese: '阿囉', category: 'phrase', emoji: '🤔', note: '用於客氣、躊躇打招呼' },
  { id: '2-5-3', hiragana: 'えっ', kanji: '', meaning: '嗨...', cantonese: '也', category: 'phrase', emoji: '😲', note: '聽到意外消息驚嘆' },
  { id: '2-5-4', hiragana: 'どうぞ', kanji: '', meaning: '請', cantonese: '多囉', category: 'phrase', emoji: '🤲', note: '用於勸別人做某事' },
  { id: '2-5-5', hiragana: '[どうも] ありがとう [ございます]', kanji: '', meaning: '謝謝', cantonese: '[多謨] 阿利卡多 [哥咋衣嘛司]', category: 'phrase', emoji: '🙏' },
  { id: '2-5-6', hiragana: 'そうですか', kanji: '', meaning: '是嗎', cantonese: '搜 爹司 卡', category: 'phrase', emoji: '🤷' },
  { id: '2-5-7', hiragana: 'ちがいます', kanji: '違います', meaning: '不是', cantonese: '芝嘎衣嘛司', category: 'phrase', emoji: '❌' },
  { id: '2-5-8', hiragana: 'あ', kanji: '', meaning: '啊', cantonese: '阿', category: 'phrase', emoji: '💡', note: '用於意識到什麼時' },
  { id: '2-5-9', hiragana: 'これから おせわに なります', kanji: 'これから お世話に なります', meaning: '今後會給您添麻煩（請多關照）', cantonese: '哥咧卡拉 哦些哇你 哪利嘛司', category: 'phrase', emoji: '🙇' },
  { id: '2-5-10', hiragana: 'こちらこそ [どうぞ] よろしく [おねがいします]', kanji: 'こちらこそ [どうぞ] よろしく [お願いします]', meaning: '也要請你們多多關照', cantonese: '哥芝啦哥梳 [多囉] 喲洛西哭 [哦捏嘎衣西嘛司]', category: 'phrase', emoji: '🤝' },
];

// ==================== 單元定義 ====================

export interface GameUnit {
  id: number;
  title: string;
  subtitle: string;
  vocabIds: string[];
  estimatedTime: number;
}

export const lesson2Units: GameUnit[] = [
  {
    id: 1,
    title: '指示代名詞',
    subtitle: 'これ・それ・あれ',
    vocabIds: ['2-1-1', '2-1-2', '2-1-3', '2-1-4', '2-1-5', '2-1-6'],
    estimatedTime: 3,
  },
  {
    id: 2,
    title: '日常用品',
    subtitle: '書本和文具',
    vocabIds: ['2-2-1', '2-2-2', '2-2-3', '2-2-4', '2-2-5', '2-2-6', '2-2-7', '2-2-8', '2-2-9', '2-2-10', '2-2-11'],
    estimatedTime: 3,
  },
  {
    id: 3,
    title: '電器和家具',
    subtitle: '家中物品',
    vocabIds: ['2-3-1', '2-3-2', '2-3-3', '2-3-4', '2-3-5', '2-3-6', '2-3-7', '2-3-8', '2-3-9', '2-3-10', '2-3-11', '2-3-12'],
    estimatedTime: 3,
  },
  {
    id: 4,
    title: '食物和語言',
    subtitle: '飲食與語言',
    vocabIds: ['2-4-1', '2-4-2', '2-4-3', '2-4-4', '2-4-5', '2-4-6', '2-4-7'],
    estimatedTime: 3,
  },
  {
    id: 5,
    title: '基本對話',
    subtitle: '常用會話',
    vocabIds: ['2-5-1', '2-5-2', '2-5-3', '2-5-4', '2-5-5', '2-5-6', '2-5-7', '2-5-8', '2-5-9', '2-5-10'],
    estimatedTime: 3,
  },
];

// ==================== 題型定義 ====================

export type QuestionType = 
  | 'speed-match'      // 閃電配對
  | 'audio-select'     // 聽音選擇
  | 'sentence-puzzle'  // 句子重組
  | 'visual-quiz'      // 圖片選擇
  | 'true-false'       // 真假快打
  | 'cloze';           // 填空選擇

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  unitId: number;
}

export interface SpeedMatchQuestion extends BaseQuestion {
  type: 'speed-match';
  pairs: { hiragana: string; meaning: string; cantonese: string }[];
  timeLimit: number;
}

export interface AudioSelectQuestion extends BaseQuestion {
  type: 'audio-select';
  audioText: string;
  correctAnswer: string;
  options: string[];
}

export interface SentencePuzzleQuestion extends BaseQuestion {
  type: 'sentence-puzzle';
  translation: string;
  blocks: { text: string; type: 'particle' | 'noun' | 'verb' | 'time' | 'place' }[];
  correctOrder: number[];
}

export interface VisualQuizQuestion extends BaseQuestion {
  type: 'visual-quiz';
  emoji: string;
  correctAnswer: string;
  options: string[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  statement: string;
  correctAnswer: boolean;
  explanation: string;
}

export interface ClozeQuestion extends BaseQuestion {
  type: 'cloze';
  sentence: string;
  blankIndex: number;
  correctAnswer: string;
  options: string[];
  translation: string;
}

export type GameQuestion = 
  | SpeedMatchQuestion 
  | AudioSelectQuestion 
  | SentencePuzzleQuestion 
  | VisualQuizQuestion 
  | TrueFalseQuestion 
  | ClozeQuestion;

// ==================== 輔助函數 ====================

export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function getVocabByUnit(unitId: number): GameVocab[] {
  const unit = lesson2Units.find(u => u.id === unitId);
  if (!unit) return [];
  return lesson2Vocab.filter(v => unit.vocabIds.includes(v.id));
}

export function getVocabById(id: string): GameVocab | undefined {
  return lesson2Vocab.find(v => v.id === id);
}
