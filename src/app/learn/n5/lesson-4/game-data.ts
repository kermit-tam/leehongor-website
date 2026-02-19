/**
 * 第4課遊戲化數據結構
 * Lesson 4 Gamified Data Structures
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
  category: 'verb' | 'place' | 'time' | 'time-period' | 'date' | 'activity' | 'frequency' | 'weekday' | 'particle' | 'phrase' | 'city';
}

export const lesson4Vocab: GameVocab[] = [
  // Unit 1: 日常動詞
  { id: '4-1-1', hiragana: 'おきます', kanji: '起きます', meaning: '起床', cantonese: '哦ki嘛士', category: 'verb', emoji: '🌅' },
  { id: '4-1-2', hiragana: 'ねます', kanji: '寝ます', meaning: '睡覺', cantonese: 'nei嘛士', category: 'verb', emoji: '😴' },
  { id: '4-1-3', hiragana: 'はたらきます', kanji: '働きます', meaning: '工作、勞動', cantonese: '哈他啦ki嘛士', category: 'verb', emoji: '💼' },
  { id: '4-1-4', hiragana: 'やすみます', kanji: '休みます', meaning: '休息', cantonese: '呀士咪嘛士', category: 'verb', emoji: '☕' },
  { id: '4-1-5', hiragana: 'べんきょうします', kanji: '勉強します', meaning: '學習', cantonese: '冰鏡show嘛士', category: 'verb', emoji: '📚' },
  { id: '4-1-6', hiragana: 'おわります', kanji: '終わります', meaning: '結束', cantonese: '哦哇里嘛士', category: 'verb', emoji: '🏁' },
  
  // Unit 2: 公共場所
  { id: '4-2-1', hiragana: 'デパート', kanji: '', meaning: '百貨商店', cantonese: '爹巴多', category: 'place', emoji: '🏬' },
  { id: '4-2-2', hiragana: 'ぎんこう', kanji: '銀行', meaning: '銀行', cantonese: '銀抗', category: 'place', emoji: '🏦' },
  { id: '4-2-3', hiragana: 'ゆうびんきょく', kanji: '郵便局', meaning: '郵局', cantonese: '優冰鏡', category: 'place', emoji: '📮' },
  { id: '4-2-4', hiragana: 'としょかん', kanji: '図書館', meaning: '圖書館', cantonese: '多梳康', category: 'place', emoji: '📖' },
  { id: '4-2-5', hiragana: 'びじゅつかん', kanji: '美術館', meaning: '美術館', cantonese: '比術康', category: 'place', emoji: '🎨' },
  
  // Unit 3: 時間表達
  { id: '4-3-1', hiragana: 'いま', kanji: '今', meaning: '現在', cantonese: '衣嘛', category: 'time', emoji: '⏰' },
  { id: '4-3-2', hiragana: '…じ', kanji: '…時', meaning: '…點', cantonese: '…芝', category: 'time', emoji: '🕐' },
  { id: '4-3-3', hiragana: '…ふん（…ぷん）', kanji: '…分', meaning: '…分', cantonese: '…芬', category: 'time', emoji: '⏱️' },
  { id: '4-3-4', hiragana: 'はん', kanji: '半', meaning: '半', cantonese: '杭', category: 'time', emoji: '🕜' },
  { id: '4-3-5', hiragana: 'なんじ', kanji: '何時', meaning: '幾點', cantonese: '難芝', category: 'time', emoji: '❓' },
  { id: '4-3-6', hiragana: 'なんぷん', kanji: '何分', meaning: '幾分', cantonese: '難奔', category: 'time', emoji: '❓' },
  { id: '4-3-7', hiragana: 'ごぜん', kanji: '午前', meaning: '上午', cantonese: '故仙', category: 'time', emoji: '🌄' },
  { id: '4-3-8', hiragana: 'ごご', kanji: '午後', meaning: '下午', cantonese: '故故', category: 'time', emoji: '🌇' },
  
  // Unit 4: 時段
  { id: '4-4-1', hiragana: 'あさ', kanji: '朝', meaning: '早晨', cantonese: '阿殺', category: 'time-period', emoji: '🌅' },
  { id: '4-4-2', hiragana: 'ひる', kanji: '昼', meaning: '白天', cantonese: '希路', category: 'time-period', emoji: '☀️' },
  { id: '4-4-3', hiragana: 'ばん（よる）', kanji: '晩（夜）', meaning: '晚上', cantonese: '杭（喲路）', category: 'time-period', emoji: '🌙' },
  { id: '4-4-4', hiragana: 'こんばん', kanji: '', meaning: '今晚、今天晚上', cantonese: '空杭', category: 'time-period', emoji: '🌃' },
  
  // Unit 5: 日期
  { id: '4-5-1', hiragana: 'おととい', kanji: '', meaning: '前天', cantonese: '哦多多衣', category: 'date', emoji: '📅' },
  { id: '4-5-2', hiragana: 'きのう', kanji: '', meaning: '昨天', cantonese: 'ki耨', category: 'date', emoji: '📆' },
  { id: '4-5-3', hiragana: 'きょう', kanji: '', meaning: '今天', cantonese: '鏡', category: 'date', emoji: '📍' },
  { id: '4-5-4', hiragana: 'あした', kanji: '', meaning: '明天', cantonese: '阿希他', category: 'date', emoji: '📅' },
  { id: '4-5-5', hiragana: 'あさって', kanji: '', meaning: '後天', cantonese: '阿殺爹', category: 'date', emoji: '📆' },
  { id: '4-5-6', hiragana: 'けさ', kanji: '', meaning: '今天早上', cantonese: 'kei殺', category: 'date', emoji: '🌄' },
  
  // Unit 6: 休息與活動
  { id: '4-6-1', hiragana: 'やすみ', kanji: '休み', meaning: '休息、休假', cantonese: '呀士咪', category: 'activity', emoji: '🏖️' },
  { id: '4-6-2', hiragana: 'ひるやすみ', kanji: '昼休み', meaning: '午休', cantonese: '希路呀士咪', category: 'activity', emoji: '🍱' },
  { id: '4-6-3', hiragana: 'しけん', kanji: '試験', meaning: '考試', cantonese: '希ken', category: 'activity', emoji: '📝' },
  { id: '4-6-4', hiragana: 'かいぎ', kanji: '会議', meaning: '會議', cantonese: '卡一gi', category: 'activity', emoji: '💼' },
  { id: '4-6-5', hiragana: 'えいが', kanji: '映画', meaning: '電影', cantonese: '欸一嘎', category: 'activity', emoji: '🎬' },
  
  // Unit 7: 頻率
  { id: '4-7-1', hiragana: 'まいあさ', kanji: '毎朝', meaning: '每天早晨', cantonese: '媽一阿殺', category: 'frequency', emoji: '🌅' },
  { id: '4-7-2', hiragana: 'まいばん', kanji: '毎晩', meaning: '每天晚上', cantonese: '媽一杭', category: 'frequency', emoji: '🌙' },
  { id: '4-7-3', hiragana: 'まいにち', kanji: '毎日', meaning: '每天', cantonese: '媽一你芝', category: 'frequency', emoji: '📅' },
  
  // Unit 8: 星期
  { id: '4-8-1', hiragana: 'げつようび', kanji: '月曜日', meaning: '星期一', cantonese: '該次喲比', category: 'weekday', emoji: '🌙' },
  { id: '4-8-2', hiragana: 'かようび', kanji: '火曜日', meaning: '星期二', cantonese: '卡喲比', category: 'weekday', emoji: '🔥' },
  { id: '4-8-3', hiragana: 'すいようび', kanji: '水曜日', meaning: '星期三', cantonese: '士衣喲比', category: 'weekday', emoji: '💧' },
  { id: '4-8-4', hiragana: 'もくようび', kanji: '木曜日', meaning: '星期四', cantonese: '謨古喲比', category: 'weekday', emoji: '🌳' },
  { id: '4-8-5', hiragana: 'きんようび', kanji: '金曜日', meaning: '星期五', cantonese: 'kin喲比', category: 'weekday', emoji: '💰' },
  { id: '4-8-6', hiragana: 'どようび', kanji: '土曜日', meaning: '星期六', cantonese: '多喲比', category: 'weekday', emoji: '🏖️' },
  { id: '4-8-7', hiragana: 'にちようび', kanji: '日曜日', meaning: '星期天', cantonese: '你芝喲比', category: 'weekday', emoji: '☀️' },
  { id: '4-8-8', hiragana: 'なんようび', kanji: '何曜日', meaning: '星期幾', cantonese: '難喲比', category: 'weekday', emoji: '❓' },
  
  // Unit 9: 助詞
  { id: '4-9-1', hiragana: '～から', kanji: '', meaning: '從～', cantonese: '卡啦', category: 'particle', emoji: '➡️' },
  { id: '4-9-2', hiragana: '～まで', kanji: '', meaning: '到～', cantonese: '媽爹', category: 'particle', emoji: '🏁' },
  { id: '4-9-3', hiragana: '～と～', kanji: '', meaning: '～和～', cantonese: '多', category: 'particle', emoji: '➕' },
  
  // Unit 10: 常用對話
  { id: '4-10-1', hiragana: 'たいへんですね。', kanji: '大変ですね。', meaning: '夠辛苦的啊', cantonese: '他衣恨爹士nei', category: 'phrase', emoji: '😅' },
  { id: '4-10-2', hiragana: 'ばんごう', kanji: '番号', meaning: '號碼', cantonese: '杭抗', category: 'phrase', emoji: '🔢' },
  { id: '4-10-3', hiragana: 'なんばん', kanji: '何番', meaning: '幾號', cantonese: '難杭', category: 'phrase', emoji: '❓' },
  { id: '4-10-4', hiragana: 'そちら', kanji: '', meaning: '那邊、你那邊', cantonese: '梳芝啦', category: 'phrase', emoji: '👉' },
  
  // Unit 11: 城市與地名
  { id: '4-11-1', hiragana: 'ニューヨーク', kanji: '', meaning: '紐約', cantonese: '牛喲古', category: 'city', emoji: '🗽' },
  { id: '4-11-2', hiragana: 'ペキン', kanji: '', meaning: '北京', cantonese: '披kin', category: 'city', emoji: '🇨🇳' },
  { id: '4-11-3', hiragana: 'ロサンゼルス', kanji: '', meaning: '洛杉磯', cantonese: '囉殺仙路士', category: 'city', emoji: '🎬' },
  { id: '4-11-4', hiragana: 'ロンドン', kanji: '', meaning: '倫敦', cantonese: '囉鄰冬', category: 'city', emoji: '🇬🇧' },
];

// ==================== 單元定義 ====================

export interface GameUnit {
  id: number;
  title: string;
  subtitle: string;
  vocabIds: string[];
  estimatedTime: number;
}

export const lesson4Units: GameUnit[] = [
  {
    id: 1,
    title: '日常動詞',
    subtitle: '起床・睡覺・工作・學習',
    vocabIds: ['4-1-1', '4-1-2', '4-1-3', '4-1-4', '4-1-5', '4-1-6'],
    estimatedTime: 3,
  },
  {
    id: 2,
    title: '公共場所',
    subtitle: '百貨・銀行・郵局',
    vocabIds: ['4-2-1', '4-2-2', '4-2-3', '4-2-4', '4-2-5'],
    estimatedTime: 3,
  },
  {
    id: 3,
    title: '時間表達',
    subtitle: '時・分・午前・午後',
    vocabIds: ['4-3-1', '4-3-2', '4-3-3', '4-3-4', '4-3-5', '4-3-6', '4-3-7', '4-3-8'],
    estimatedTime: 3,
  },
  {
    id: 4,
    title: '時段',
    subtitle: '朝・昼・晩・夜',
    vocabIds: ['4-4-1', '4-4-2', '4-4-3', '4-4-4'],
    estimatedTime: 3,
  },
  {
    id: 5,
    title: '日期',
    subtitle: '昨天・今天・明天',
    vocabIds: ['4-5-1', '4-5-2', '4-5-3', '4-5-4', '4-5-5', '4-5-6'],
    estimatedTime: 3,
  },
  {
    id: 6,
    title: '休息與活動',
    subtitle: '休假・考試・電影',
    vocabIds: ['4-6-1', '4-6-2', '4-6-3', '4-6-4', '4-6-5'],
    estimatedTime: 3,
  },
  {
    id: 7,
    title: '頻率',
    subtitle: '每天・每朝・每晩',
    vocabIds: ['4-7-1', '4-7-2', '4-7-3'],
    estimatedTime: 3,
  },
  {
    id: 8,
    title: '星期',
    subtitle: '月火水木金土日',
    vocabIds: ['4-8-1', '4-8-2', '4-8-3', '4-8-4', '4-8-5', '4-8-6', '4-8-7', '4-8-8'],
    estimatedTime: 3,
  },
  {
    id: 9,
    title: '助詞',
    subtitle: '從～・到～・和～',
    vocabIds: ['4-9-1', '4-9-2', '4-9-3'],
    estimatedTime: 3,
  },
  {
    id: 10,
    title: '常用對話',
    subtitle: '日常會話用語',
    vocabIds: ['4-10-1', '4-10-2', '4-10-3', '4-10-4'],
    estimatedTime: 3,
  },
  {
    id: 11,
    title: '城市與地名',
    subtitle: '世界各地',
    vocabIds: ['4-11-1', '4-11-2', '4-11-3', '4-11-4'],
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
  const unit = lesson4Units.find(u => u.id === unitId);
  if (!unit) return [];
  return lesson4Vocab.filter(v => unit.vocabIds.includes(v.id));
}

export function getVocabById(id: string): GameVocab | undefined {
  return lesson4Vocab.find(v => v.id === id);
}
