/**
 * 第3課遊戲化數據結構
 * Lesson 3 Gamified Data Structures
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
  category: 'location' | 'building' | 'organization' | 'shopping' | 'number' | 'phrase' | 'country';
}

export const lesson3Vocab: GameVocab[] = [
  // Unit 1: 場所指示
  { id: '3-1-1', hiragana: 'ここ', kanji: '', meaning: '這裏（離說話人近的場所）', cantonese: '哥哥', category: 'location', emoji: '📍' },
  { id: '3-1-2', hiragana: 'そこ', kanji: '', meaning: '那裏（離聽話人近的場所）', cantonese: '梳哥', category: 'location', emoji: '📌' },
  { id: '3-1-3', hiragana: 'あそこ', kanji: '', meaning: '那裏（離說話人、聽話人都遠的場所）', cantonese: '阿梳哥', category: 'location', emoji: '📎' },
  { id: '3-1-4', hiragana: 'どこ', kanji: '', meaning: '哪裏', cantonese: '多哥', category: 'location', emoji: '❓' },
  { id: '3-1-5', hiragana: 'こちら', kanji: '', meaning: '這邊（「ここ」的禮貌用語）', cantonese: '哥芝啦', category: 'location', emoji: '👈', note: '禮貌說法' },
  { id: '3-1-6', hiragana: 'そちら', kanji: '', meaning: '那邊（「そこ」的禮貌用語）', cantonese: '梳芝啦', category: 'location', emoji: '👉', note: '禮貌說法' },
  { id: '3-1-7', hiragana: 'あちら', kanji: '', meaning: '那邊（「あそこ」的禮貌用語）', cantonese: '阿芝啦', category: 'location', emoji: '👋', note: '禮貌說法' },
  { id: '3-1-8', hiragana: 'どちら', kanji: '', meaning: '哪邊（「どこ」的禮貌用語）', cantonese: '多芝啦', category: 'location', emoji: '🤷', note: '禮貌說法' },
  
  // Unit 2: 建築物和設施
  { id: '3-2-1', hiragana: 'きょうしつ', kanji: '教室', meaning: '教室', cantonese: '鏡西刺', category: 'building', emoji: '🏫' },
  { id: '3-2-2', hiragana: 'しょくどう', kanji: '食堂', meaning: '食堂', cantonese: '梳古多', category: 'building', emoji: '🍽️' },
  { id: '3-2-3', hiragana: 'じむしょ', kanji: '事務所', meaning: '辦事處、事務所', cantonese: '芝謨梳', category: 'building', emoji: '🏢' },
  { id: '3-2-4', hiragana: 'かいぎしつ', kanji: '会議室', meaning: '會議室', cantonese: '卡一gi 西刺', category: 'building', emoji: '💼' },
  { id: '3-2-5', hiragana: 'うけつけ', kanji: '受付', meaning: '接待處', cantonese: '烏kei', category: 'building', emoji: '🛎️' },
  { id: '3-2-6', hiragana: 'ロビー', kanji: '', meaning: '大廳、休息室', cantonese: '囉比', category: 'building', emoji: '🛋️' },
  { id: '3-2-7', hiragana: 'へや', kanji: '部屋', meaning: '房間', cantonese: '吓也', category: 'building', emoji: '🚪' },
  { id: '3-2-8', hiragana: 'トイレ（おてあらい）', kanji: '（お手洗い）', meaning: '廁所(洗手間)', cantonese: '多衣咧（哦鉄阿拉衣）', category: 'building', emoji: '🚻' },
  { id: '3-2-9', hiragana: 'かいだん', kanji: '階段', meaning: '樓梯', cantonese: '卡衣單', category: 'building', emoji: '🪜' },
  { id: '3-2-10', hiragana: 'エレベーター', kanji: '', meaning: '電梯', cantonese: '也咧啤多', category: 'building', emoji: '🛗' },
  { id: '3-2-11', hiragana: 'じどうはんばいき', kanji: '自動販売機', meaning: '自動販賣機', cantonese: '芝多 杭巴衣 gi', category: 'building', emoji: '🥤' },
  { id: '3-2-12', hiragana: 'でんわ', kanji: '電話', meaning: '電話', cantonese: '電話', category: 'building', emoji: '📞' },
  
  // Unit 3: 國家、公司和住所
  { id: '3-3-1', hiragana: '[お]くに', kanji: '[お]国', meaning: '國家、故鄉', cantonese: '[哦]古你', category: 'organization', emoji: '🏠' },
  { id: '3-3-2', hiragana: 'かいしゃ', kanji: '会社', meaning: '公司', cantonese: '卡一蝦', category: 'organization', emoji: '🏭' },
  { id: '3-3-3', hiragana: 'うち', kanji: '', meaning: '家', cantonese: '烏芝', category: 'organization', emoji: '🏡' },
  
  // Unit 4: 物品和購物
  { id: '3-4-1', hiragana: 'くつ', kanji: '靴', meaning: '鞋', cantonese: '古刺', category: 'shopping', emoji: '👟' },
  { id: '3-4-2', hiragana: 'ネクタイ', kanji: '', meaning: '領帶', cantonese: '呢古他衣', category: 'shopping', emoji: '👔' },
  { id: '3-4-3', hiragana: 'ワイン', kanji: '', meaning: '葡萄酒', cantonese: '哇因', category: 'shopping', emoji: '🍷' },
  { id: '3-4-4', hiragana: 'うりば', kanji: '売り場', meaning: '售貨處', cantonese: '烏利巴', category: 'shopping', emoji: '🛒' },
  { id: '3-4-5', hiragana: 'ちか', kanji: '地下', meaning: '地下', cantonese: '芝卡', category: 'shopping', emoji: '⬇️' },
  { id: '3-4-6', hiragana: 'かびん', kanji: '', meaning: '花瓶', cantonese: '卡冰', category: 'shopping', emoji: '🏺' },
  
  // Unit 5: 樓層和價格
  { id: '3-5-1', hiragana: '…かい（…がい）', kanji: '…階', meaning: '…層', cantonese: '…卡衣', category: 'number', emoji: '🔢' },
  { id: '3-5-2', hiragana: 'なんがい', kanji: '何階', meaning: '幾層', cantonese: '難嘎衣', category: 'number', emoji: '❓' },
  { id: '3-5-3', hiragana: '…えん', kanji: '…円', meaning: '…日元', cantonese: '…援', category: 'number', emoji: '💴' },
  { id: '3-5-4', hiragana: 'いくら', kanji: '', meaning: '多少錢', cantonese: '衣古啦', category: 'number', emoji: '💰' },
  { id: '3-5-5', hiragana: 'ひゃく', kanji: '百', meaning: '百', cantonese: '吓古', category: 'number', emoji: '💯' },
  { id: '3-5-6', hiragana: 'せん', kanji: '千', meaning: '千', cantonese: '仙', category: 'number', emoji: '🔢' },
  { id: '3-5-7', hiragana: 'まん', kanji: '万', meaning: '萬', cantonese: '萬', category: 'number', emoji: '🔟' },
  
  // Unit 6: 常用對話
  { id: '3-6-1', hiragana: 'すみません。', kanji: '', meaning: '對不起。', cantonese: '士咪嘛森', category: 'phrase', emoji: '🙇' },
  { id: '3-6-2', hiragana: 'どうも。', kanji: '', meaning: '謝謝。', cantonese: '多謨', category: 'phrase', emoji: '🙏' },
  { id: '3-6-3', hiragana: 'いらっしゃいませ。', kanji: '', meaning: '歡迎光臨（招呼來店的客人）', cantonese: '衣啦沙衣嘛些', category: 'phrase', emoji: '👋' },
  { id: '3-6-4', hiragana: '[～を] みせて ください', kanji: '[～を] 見せて ください', meaning: '請讓我看一下～', cantonese: '咪些鉄 古打撒衣', category: 'phrase', emoji: '👀' },
  { id: '3-6-5', hiragana: 'じゃ', kanji: '', meaning: '那麼', cantonese: '渣', category: 'phrase', emoji: '👉', note: '口語' },
  { id: '3-6-6', hiragana: '[～を] ください。', kanji: '', meaning: '請給我[～]。', cantonese: '古打撒衣', category: 'phrase', emoji: '🤲' },
  
  // Unit 7: 國家與城市
  { id: '3-7-1', hiragana: 'イタリア', kanji: '', meaning: '意大利', cantonese: '衣他利阿', category: 'country', emoji: '🇮🇹' },
  { id: '3-7-2', hiragana: 'スイス', kanji: '', meaning: '瑞士', cantonese: '士衣士', category: 'country', emoji: '🇨🇭' },
  { id: '3-7-3', hiragana: 'フランス', kanji: '', meaning: '法國', cantonese: '夫干士', category: 'country', emoji: '🇫🇷' },
  { id: '3-7-4', hiragana: 'ジャカルタ', kanji: '', meaning: '雅加達', cantonese: '渣卡路他', category: 'country', emoji: '🇮🇩' },
  { id: '3-7-5', hiragana: 'バンコク', kanji: '', meaning: '曼谷', cantonese: '崩谷', category: 'country', emoji: '🇹🇭' },
  { id: '3-7-6', hiragana: 'ベルリン', kanji: '', meaning: '柏林', cantonese: '杯路鄰', category: 'country', emoji: '🇩🇪' },
  { id: '3-7-7', hiragana: 'しんおおさか', kanji: '新大阪', meaning: '新大阪（大阪的車站名）', cantonese: '心哦哦撒卡', category: 'country', emoji: '🚉' },
];

// ==================== 單元定義 ====================

export interface GameUnit {
  id: number;
  title: string;
  subtitle: string;
  vocabIds: string[];
  estimatedTime: number;
}

export const lesson3Units: GameUnit[] = [
  {
    id: 1,
    title: '場所指示',
    subtitle: '這裡・那裡・哪裡',
    vocabIds: ['3-1-1', '3-1-2', '3-1-3', '3-1-4', '3-1-5', '3-1-6', '3-1-7', '3-1-8'],
    estimatedTime: 3,
  },
  {
    id: 2,
    title: '建築物和設施',
    subtitle: '公共場所',
    vocabIds: ['3-2-1', '3-2-2', '3-2-3', '3-2-4', '3-2-5', '3-2-6', '3-2-7', '3-2-8', '3-2-9', '3-2-10', '3-2-11', '3-2-12'],
    estimatedTime: 3,
  },
  {
    id: 3,
    title: '國家、公司和住所',
    subtitle: '組織與地點',
    vocabIds: ['3-3-1', '3-3-2', '3-3-3'],
    estimatedTime: 3,
  },
  {
    id: 4,
    title: '物品和購物',
    subtitle: '商品與場所',
    vocabIds: ['3-4-1', '3-4-2', '3-4-3', '3-4-4', '3-4-5', '3-4-6'],
    estimatedTime: 3,
  },
  {
    id: 5,
    title: '樓層和價格',
    subtitle: '數字與金額',
    vocabIds: ['3-5-1', '3-5-2', '3-5-3', '3-5-4', '3-5-5', '3-5-6', '3-5-7'],
    estimatedTime: 3,
  },
  {
    id: 6,
    title: '常用對話',
    subtitle: '購物與禮貌用語',
    vocabIds: ['3-6-1', '3-6-2', '3-6-3', '3-6-4', '3-6-5', '3-6-6'],
    estimatedTime: 3,
  },
  {
    id: 7,
    title: '國家與城市',
    subtitle: '世界各地',
    vocabIds: ['3-7-1', '3-7-2', '3-7-3', '3-7-4', '3-7-5', '3-7-6', '3-7-7'],
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
  const unit = lesson3Units.find(u => u.id === unitId);
  if (!unit) return [];
  return lesson3Vocab.filter(v => unit.vocabIds.includes(v.id));
}

export function getVocabById(id: string): GameVocab | undefined {
  return lesson3Vocab.find(v => v.id === id);
}
