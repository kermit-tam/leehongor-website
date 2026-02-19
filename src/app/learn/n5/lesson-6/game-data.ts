/**
 * 第6課遊戲化數據結構
 * Lesson 6: 食物與喜好
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
  category: 'food' | 'drink' | 'taste' | 'phrase' | 'restaurant';
}

export const lesson6Vocab: GameVocab[] = [
  // Unit 1: 日本料理
  { id: '6-1-1', hiragana: 'すし', kanji: '寿司', meaning: '壽司', cantonese: 'seoi6 si1', category: 'food', emoji: '🍣' },
  { id: '6-1-2', hiragana: 'さしみ', kanji: '刺身', meaning: '刺身', cantonese: 'ci3 san1', category: 'food', emoji: '🐟' },
  { id: '6-1-3', hiragana: 'てんぷら', kanji: '天ぷら', meaning: '天婦羅', cantonese: 'tin1 fu5 lo4', category: 'food', emoji: '🍤' },
  { id: '6-1-4', hiragana: 'ラーメン', kanji: '', meaning: '拉麵', cantonese: 'laai1 min6', category: 'food', emoji: '🍜' },
  { id: '6-1-5', hiragana: 'うどん', kanji: '', meaning: '烏冬', cantonese: 'wu1 dung1', category: 'food', emoji: '🍜' },
  { id: '6-1-6', hiragana: 'そば', kanji: '', meaning: '蕎麥麵', cantonese: 'kiu4 mak6 min6', category: 'food', emoji: '🍜' },
  { id: '6-1-7', hiragana: 'おこのみやき', kanji: 'お好み焼き', meaning: '大阪燒', cantonese: 'daai6 baan1 siu1', category: 'food', emoji: '🥘' },
  { id: '6-1-8', hiragana: 'おちゃ', kanji: 'お茶', meaning: '茶', cantonese: 'caa4', category: 'drink', emoji: '🍵' },
  { id: '6-1-9', hiragana: 'コーヒー', kanji: '', meaning: '咖啡', cantonese: 'gaa3 fe1', category: 'drink', emoji: '☕' },
  { id: '6-1-10', hiragana: 'ビール', kanji: '', meaning: '啤酒', cantonese: 'be1 zau2', category: 'drink', emoji: '🍺' },
  
  // Unit 2: 餐廳用語
  { id: '6-2-1', hiragana: 'メニュー', kanji: '', meaning: '菜單', cantonese: 'coi3 daan1', category: 'restaurant', emoji: '📋' },
  { id: '6-2-2', hiragana: 'しょくじ', kanji: '食事', meaning: '用餐', cantonese: 'sik6 si6', category: 'restaurant', emoji: '🍽️' },
  { id: '6-2-3', hiragana: 'ちゅうもん', kanji: '注文', meaning: '點餐', cantonese: 'dim2 caan1', category: 'restaurant', emoji: '📝' },
  { id: '6-2-4', hiragana: 'おかわり', kanji: 'お代わり', meaning: '添飯', cantonese: 'tim1 faan6', category: 'restaurant', emoji: '🍚' },
  { id: '6-2-5', hiragana: 'けっさん', kanji: '決算', meaning: '結帳', cantonese: 'git3 zoeng3', category: 'restaurant', emoji: '💴' },
  { id: '6-2-6', hiragana: 'おかいけい', kanji: 'お会計', meaning: '結帳', cantonese: 'maai4 daan1', category: 'restaurant', emoji: '💰' },
  { id: '6-2-7', hiragana: 'レストラン', kanji: '', meaning: '餐廳', cantonese: 'caan1 teng1', category: 'restaurant', emoji: '🏪' },
  { id: '6-2-8', hiragana: 'すいか', kanji: '西瓜', meaning: '西瓜', cantonese: 'sai1 gwaa1', category: 'food', emoji: '🍉' },
  { id: '6-2-9', hiragana: 'りんご', kanji: '林檎', meaning: '蘋果', cantonese: 'ping4 gwo2', category: 'food', emoji: '🍎' },
  { id: '6-2-10', hiragana: 'みかん', kanji: '蜜柑', meaning: '柑桔', cantonese: 'gam1 gap1', category: 'food', emoji: '🍊' },
  
  // Unit 3: 喜好與味道
  { id: '6-3-1', hiragana: 'すき', kanji: '好き', meaning: '喜歡', cantonese: 'zung1 ji3', category: 'taste', emoji: '❤️' },
  { id: '6-3-2', hiragana: 'きらい', kanji: '嫌い', meaning: '討厭', cantonese: 'zang1', category: 'taste', emoji: '💔' },
  { id: '6-3-3', hiragana: 'だいすき', kanji: '大好き', meaning: '非常喜歡', cantonese: 'hou2 zung1 ji3', category: 'taste', emoji: '😍' },
  { id: '6-3-4', hiragana: 'だいきらい', kanji: '大嫌い', meaning: '非常討厭', cantonese: 'hou2 zang1', category: 'taste', emoji: '😫' },
  { id: '6-3-5', hiragana: 'おいしい', kanji: '美味しい', meaning: '好吃', cantonese: 'hou2 sik6', category: 'taste', emoji: '😋' },
  { id: '6-3-6', hiragana: 'まずい', kanji: '不味い', meaning: '不好吃', cantonese: 'm4 hou2 sik6', category: 'taste', emoji: '🤢' },
  { id: '6-3-7', hiragana: 'あまい', kanji: '甘い', meaning: '甜', cantonese: 'tim4', category: 'taste', emoji: '🍯' },
  { id: '6-3-8', hiragana: 'からい', kanji: '辛い', meaning: '辣', cantonese: 'laat6', category: 'taste', emoji: '🌶️' },
  { id: '6-3-9', hiragana: 'しょっぱい', kanji: '塩っぱい', meaning: '鹹', cantonese: 'haam4', category: 'taste', emoji: '🧂' },
  { id: '6-3-10', hiragana: 'すっぱい', kanji: '酸っぱい', meaning: '酸', cantonese: 'syun1', category: 'taste', emoji: '🍋' },
  
  // Unit 4: 餐廳對話
  { id: '6-4-1', hiragana: 'おなかがすきました', kanji: '', meaning: '肚子餓了', cantonese: 'tou5 ngo6', category: 'phrase', emoji: '😋' },
  { id: '6-4-2', hiragana: 'おなかがいっぱい', kanji: '', meaning: '吃飽了', cantonese: 'baau2', category: 'phrase', emoji: '😌' },
  { id: '6-4-3', hiragana: 'のどがかわきました', kanji: '', meaning: '口渴了', cantonese: 'hau2 hot3', category: 'phrase', emoji: '😰' },
  { id: '6-4-4', hiragana: 'たべましょう', kanji: '食べましょう', meaning: '來吃吧', cantonese: 'sik6 laa1', category: 'phrase', emoji: '🍽️' },
  { id: '6-4-5', hiragana: 'いっしょに', kanji: '一緒に', meaning: '一起', cantonese: 'jat1 cai4', category: 'phrase', emoji: '👥' },
  { id: '6-4-6', hiragana: 'ごちそうさま', kanji: 'ご馳走様', meaning: '多謝款待', cantonese: 'do1 ze6 kwan1 toi2', category: 'phrase', emoji: '🙏' },
  { id: '6-4-7', hiragana: 'いただきます', kanji: '頂きます', meaning: '我開動了', cantonese: 'ngo5 hoi1 dung6 laa3', category: 'phrase', emoji: '🙏' },
  { id: '6-4-8', hiragana: 'はい、わかりました', kanji: '', meaning: '好的，知道了', cantonese: 'hou2, zi1 dou3', category: 'phrase', emoji: '👌' },
];

// ==================== 單元定義 ====================

export interface GameUnit {
  id: number;
  title: string;
  subtitle: string;
  vocabIds: string[];
  estimatedTime: number;
}

export const lesson6Units: GameUnit[] = [
  {
    id: 1,
    title: '日本料理',
    subtitle: '壽司、拉麵、天婦羅',
    vocabIds: ['6-1-1', '6-1-2', '6-1-3', '6-1-4', '6-1-5', '6-1-6', '6-1-7', '6-1-8', '6-1-9', '6-1-10'],
    estimatedTime: 3,
  },
  {
    id: 2,
    title: '餐廳用語',
    subtitle: '點餐與結帳',
    vocabIds: ['6-2-1', '6-2-2', '6-2-3', '6-2-4', '6-2-5', '6-2-6', '6-2-7', '6-2-8', '6-2-9', '6-2-10'],
    estimatedTime: 3,
  },
  {
    id: 3,
    title: '喜好與味道',
    subtitle: '好き・きらい',
    vocabIds: ['6-3-1', '6-3-2', '6-3-3', '6-3-4', '6-3-5', '6-3-6', '6-3-7', '6-3-8', '6-3-9', '6-3-10'],
    estimatedTime: 3,
  },
  {
    id: 4,
    title: '餐廳對話',
    subtitle: '點餐情境',
    vocabIds: ['6-4-1', '6-4-2', '6-4-3', '6-4-4', '6-4-5', '6-4-6', '6-4-7', '6-4-8'],
    estimatedTime: 3,
  },
];

// ==================== 造句語塊 ====================

export interface SentenceBlock {
  id: string;
  text: string;
  type: 'food' | 'drink' | 'taste' | 'particle' | 'verb' | 'phrase' | 'topic';
  meaning: string;
  unitId: number;
}

export const sentenceBlocks: SentenceBlock[] = [
  // Unit 1
  { id: 'sb6-1-1', text: 'すしが', type: 'food', meaning: '壽司', unitId: 1 },
  { id: 'sb6-1-2', text: 'ラーメンが', type: 'food', meaning: '拉麵', unitId: 1 },
  { id: 'sb6-1-3', text: 'てんぷらが', type: 'food', meaning: '天婦羅', unitId: 1 },
  { id: 'sb6-1-4', text: 'おちゃが', type: 'drink', meaning: '茶', unitId: 1 },
  { id: 'sb6-1-5', text: 'コーヒーが', type: 'drink', meaning: '咖啡', unitId: 1 },
  { id: 'sb6-1-6', text: 'りんごが', type: 'food', meaning: '蘋果', unitId: 1 },
  
  // Unit 2
  { id: 'sb6-2-1', text: 'メニューを', type: 'food', meaning: '菜單', unitId: 2 },
  { id: 'sb6-2-2', text: 'おかいけいを', type: 'phrase', meaning: '結帳', unitId: 2 },
  { id: 'sb6-2-3', text: 'おねがいします', type: 'phrase', meaning: '請', unitId: 2 },
  
  // Unit 3
  { id: 'sb6-3-1', text: 'すきです', type: 'taste', meaning: '喜歡', unitId: 3 },
  { id: 'sb6-3-2', text: 'だいすきです', type: 'taste', meaning: '非常喜歡', unitId: 3 },
  { id: 'sb6-3-3', text: 'きらいです', type: 'taste', meaning: '討厭', unitId: 3 },
  { id: 'sb6-3-4', text: 'おいしいです', type: 'taste', meaning: '好吃', unitId: 3 },
  { id: 'sb6-3-5', text: 'まずいです', type: 'taste', meaning: '不好吃', unitId: 3 },
  { id: 'sb6-3-6', text: 'あまいです', type: 'taste', meaning: '甜', unitId: 3 },
  { id: 'sb6-3-7', text: 'からいです', type: 'taste', meaning: '辣', unitId: 3 },
  
  // Unit 4
  { id: 'sb6-4-1', text: 'わたしは', type: 'topic', meaning: '我', unitId: 4 },
  { id: 'sb6-4-2', text: 'いっしょに', type: 'phrase', meaning: '一起', unitId: 4 },
  { id: 'sb6-4-3', text: 'たべましょう', type: 'verb', meaning: '來吃吧', unitId: 4 },
  { id: 'sb6-4-4', text: 'おなかがすきました', type: 'phrase', meaning: '肚子餓了', unitId: 4 },
  { id: 'sb6-4-5', text: 'のどがかわきました', type: 'phrase', meaning: '口渴了', unitId: 4 },
  { id: 'sb6-4-6', text: 'いただきます', type: 'phrase', meaning: '我開動了', unitId: 4 },
  { id: 'sb6-4-7', text: 'ごちそうさまでした', type: 'phrase', meaning: '多謝款待', unitId: 4 },
];

// ==================== 輔助函數 ====================

export function getVocabById(id: string): GameVocab | undefined {
  return lesson6Vocab.find(v => v.id === id);
}

export function getVocabByUnit(unitId: number): GameVocab[] {
  const unit = lesson6Units.find(u => u.id === unitId);
  if (!unit) return [];
  return unit.vocabIds.map(id => getVocabById(id)).filter((v): v is GameVocab => v !== undefined);
}

export function getBlocksByUnit(unitId: number): SentenceBlock[] {
  return sentenceBlocks.filter(b => b.unitId <= unitId);
}

export function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
