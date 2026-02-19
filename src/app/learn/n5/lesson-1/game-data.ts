/**
 * 第1課遊戲化數據結構
 * Lesson 1 Gamified Data Structures
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
  category: 'pronoun' | 'title' | 'occupation' | 'place' | 'phrase' | 'country';
}

export const lesson1Vocab: GameVocab[] = [
  // Unit 1: 人稱與稱呼
  { id: '1-1-1', hiragana: 'わたし', kanji: '私', meaning: '我', cantonese: '哇他西', category: 'pronoun', emoji: '🙋', note: '女性常用' },
  { id: '1-1-2', hiragana: 'あなた', kanji: '貴方', meaning: '你/您', cantonese: '阿那他', category: 'pronoun', emoji: '🫵', note: '禮貌說法' },
  { id: '1-1-3', hiragana: 'あのひと', kanji: 'あの人', meaning: '他/她/那個人', cantonese: '阿諾黑托', category: 'pronoun', emoji: '👤', note: '口語' },
  { id: '1-1-4', hiragana: 'あのかた', kanji: 'あの方', meaning: '那一位', cantonese: '阿諾卡他', category: 'pronoun', emoji: '👔', note: '敬語' },
  { id: '1-1-5', hiragana: '～さん', kanji: '～さん', meaning: '先生/女士', cantonese: '散', category: 'title', emoji: '👑', note: '尊稱' },
  { id: '1-1-6', hiragana: '～ちゃん', kanji: '～ちゃん', meaning: '小～', cantonese: '橙', category: 'title', emoji: '👶', note: '對小孩或親暱稱呼' },
  { id: '1-1-7', hiragana: '～じん', kanji: '～人', meaning: '～人', cantonese: '人', category: 'title', emoji: '🌏', note: '國籍' },
  { id: '1-1-8', hiragana: 'せんせい', kanji: '先生', meaning: '老師', cantonese: '森些', category: 'occupation', emoji: '👨‍🏫', note: '稱呼他人' },
  { id: '1-1-9', hiragana: 'きょうし', kanji: '教師', meaning: '教師', cantonese: '鏡西', category: 'occupation', emoji: '👩‍🏫', note: '職業名稱' },
  { id: '1-1-10', hiragana: 'がくせい', kanji: '学生', meaning: '學生', cantonese: '學些', category: 'occupation', emoji: '👨‍🎓' },
  
  // Unit 2: 職業與場所
  { id: '1-2-1', hiragana: 'かいしゃいん', kanji: '会社員', meaning: '公司職員', cantonese: '卡一蝦銀', category: 'occupation', emoji: '👨‍💼' },
  { id: '1-2-2', hiragana: 'しゃいん', kanji: '社員', meaning: '～公司職員', cantonese: '蝦銀', category: 'occupation', emoji: '🏢', note: '前面加公司名' },
  { id: '1-2-3', hiragana: 'ぎんこういん', kanji: '銀行員', meaning: '銀行行員', cantonese: '銀行銀', category: 'occupation', emoji: '🏦' },
  { id: '1-2-4', hiragana: 'いしゃ', kanji: '医者', meaning: '醫生', cantonese: '一蝦', category: 'occupation', emoji: '👨‍⚕️' },
  { id: '1-2-5', hiragana: 'けんきゅうしゃ', kanji: '研究者', meaning: '研究人員', cantonese: '健究蝦', category: 'occupation', emoji: '👨‍🔬' },
  { id: '1-2-6', hiragana: 'だいがく', kanji: '大学', meaning: '大學', cantonese: '代學', category: 'place', emoji: '🎓' },
  { id: '1-2-7', hiragana: 'びょういん', kanji: '病院', meaning: '醫院', cantonese: '病院', category: 'place', emoji: '🏥' },
  { id: '1-2-8', hiragana: 'だれ', kanji: '誰', meaning: '誰', cantonese: '打咧', category: 'pronoun', emoji: '❓', note: '口語' },
  { id: '1-2-9', hiragana: 'どなた', kanji: '何方', meaning: '哪位', cantonese: '多那他', category: 'pronoun', emoji: '❔', note: '敬語' },
  { id: '1-2-10', hiragana: 'なんさい', kanji: '何歳', meaning: '幾歲', cantonese: '難赛', category: 'phrase', emoji: '🔢', note: '問年齡' },
  { id: '1-2-11', hiragana: 'おいくつ', kanji: 'お幾つ', meaning: '多大歲數', cantonese: '哦一古刺', category: 'phrase', emoji: '🎂', note: '禮貌問法' },
  
  // Unit 3: 初次見面會話
  { id: '1-3-1', hiragana: 'はじめまして', kanji: '初めまして', meaning: '初次見面', cantonese: '哈芝咩 嘛西爹', category: 'phrase', emoji: '🤝', note: '見面必說' },
  { id: '1-3-2', hiragana: '～からきました', kanji: '～から来ました', meaning: '從～來的', cantonese: '卡拉 ki 嘛西他', category: 'phrase', emoji: '✈️', note: '來自...' },
  { id: '1-3-3', hiragana: 'よろしくおねがいします', kanji: 'よろしくお願いします', meaning: '請多關照', cantonese: '喲洛西哭 哦捏嘎一 西嘛司', category: 'phrase', emoji: '🙏', note: '結束語' },
  { id: '1-3-4', hiragana: 'しつれいですが', kanji: '失礼ですが', meaning: '對不起/請問', cantonese: '西刺咧 爹司 嘎', category: 'phrase', emoji: '🙇', note: '打斷別人時' },
  { id: '1-3-5', hiragana: 'おなまえは', kanji: 'お名前は', meaning: '您貴姓？', cantonese: '哦哪嘛也 哇', category: 'phrase', emoji: '📝', note: '問名字' },
  { id: '1-3-6', hiragana: 'こちらは～さんです', kanji: 'こちらは～さんです', meaning: '這位是～', cantonese: '哦洛西 哇 散 爹司', category: 'phrase', emoji: '👋', note: '介紹他人' },
  { id: '1-3-7', hiragana: 'はい', kanji: 'はい', meaning: '是/對', cantonese: '係', category: 'phrase', emoji: '⭕' },
  { id: '1-3-8', hiragana: 'いいえ', kanji: 'いいえ', meaning: '不/不是', cantonese: '一一也', category: 'phrase', emoji: '❌' },
  { id: '1-3-9', hiragana: 'あ', kanji: 'あ', meaning: '啊', cantonese: '阿', category: 'phrase', emoji: '😲', note: '驚訝時' },
  { id: '1-3-10', hiragana: '～さい', kanji: '～歳', meaning: '～歲', cantonese: '赛', category: 'phrase', emoji: '🎉', note: '數字+歳' },
  
  // Unit 4: 國家名稱
  { id: '1-4-1', hiragana: 'アメリカ', kanji: 'America', meaning: '美國', cantonese: '阿咩利卡', category: 'country', emoji: '🇺🇸' },
  { id: '1-4-2', hiragana: 'イギリス', kanji: 'UK', meaning: '英國', cantonese: '一gi利士', category: 'country', emoji: '🇬🇧' },
  { id: '1-4-3', hiragana: 'にほん', kanji: '日本', meaning: '日本', cantonese: '你虹', category: 'country', emoji: '🇯🇵' },
  { id: '1-4-4', hiragana: 'かんこく', kanji: '韓国', meaning: '韓國', cantonese: '干谷', category: 'country', emoji: '🇰🇷' },
  { id: '1-4-5', hiragana: 'ちゅうごく', kanji: '中国', meaning: '中國', cantonese: '丘谷', category: 'country', emoji: '🇨🇳' },
  { id: '1-4-6', hiragana: 'フランス', kanji: 'France', meaning: '法國', cantonese: '夫干士', category: 'country', emoji: '🇫🇷' },
  { id: '1-4-7', hiragana: 'ドイツ', kanji: 'Germany', meaning: '德國', cantonese: '多伊刺', category: 'country', emoji: '🇩🇪' },
  { id: '1-4-8', hiragana: 'タイ', kanji: 'Thailand', meaning: '泰國', cantonese: '他衣', category: 'country', emoji: '🇹🇭' },
  { id: '1-4-9', hiragana: 'インド', kanji: 'India', meaning: '印度', cantonese: '印多', category: 'country', emoji: '🇮🇳' },
  { id: '1-4-10', hiragana: 'ブラジル', kanji: 'Brazil', meaning: '巴西', cantonese: '夫啦支路', category: 'country', emoji: '🇧🇷' },
];

// ==================== 單元定義 ====================

export interface GameUnit {
  id: number;
  title: string;
  subtitle: string;
  vocabIds: string[];
  estimatedTime: number;
}

export const lesson1Units: GameUnit[] = [
  {
    id: 1,
    title: '人稱與稱呼',
    subtitle: '自我介紹的第一步',
    vocabIds: ['1-1-1', '1-1-2', '1-1-3', '1-1-4', '1-1-5', '1-1-6', '1-1-7', '1-1-8', '1-1-9', '1-1-10'],
    estimatedTime: 3,
  },
  {
    id: 2,
    title: '職業與場所',
    subtitle: '工作場合用語',
    vocabIds: ['1-2-1', '1-2-2', '1-2-3', '1-2-4', '1-2-5', '1-2-6', '1-2-7', '1-2-8', '1-2-9', '1-2-10', '1-2-11'],
    estimatedTime: 3,
  },
  {
    id: 3,
    title: '初次見面',
    subtitle: '基本禮貌會話',
    vocabIds: ['1-3-1', '1-3-2', '1-3-3', '1-3-4', '1-3-5', '1-3-6', '1-3-7', '1-3-8', '1-3-9', '1-3-10'],
    estimatedTime: 3,
  },
  {
    id: 4,
    title: '國家名稱',
    subtitle: '來自哪裡？',
    vocabIds: ['1-4-1', '1-4-2', '1-4-3', '1-4-4', '1-4-5', '1-4-6', '1-4-7', '1-4-8', '1-4-9', '1-4-10'],
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
  const unit = lesson1Units.find(u => u.id === unitId);
  if (!unit) return [];
  return lesson1Vocab.filter(v => unit.vocabIds.includes(v.id));
}

export function getVocabById(id: string): GameVocab | undefined {
  return lesson1Vocab.find(v => v.id === id);
}
