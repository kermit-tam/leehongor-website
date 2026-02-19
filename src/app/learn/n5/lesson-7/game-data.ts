/**
 * 第7課遊戲化數據結構
 * Lesson 7: 購物
 */

export interface GameVocab {
  id: string;
  hiragana: string;
  kanji: string;
  meaning: string;
  cantonese: string;
  note?: string;
  emoji?: string;
  category: 'clothing' | 'color' | 'price' | 'shop' | 'adj';
}

export const lesson7Vocab: GameVocab[] = [
  // Unit 1: 服裝
  { id: '7-1-1', hiragana: 'ふく', kanji: '服', meaning: '衣服', cantonese: 'san1', category: 'clothing', emoji: '👔' },
  { id: '7-1-2', hiragana: 'セーター', kanji: '', meaning: '毛衣', cantonese: 'laang5 san1', category: 'clothing', emoji: '🧥' },
  { id: '7-1-3', hiragana: 'シャツ', kanji: '', meaning: '襯衫', cantonese: 'seot1 saan1', category: 'clothing', emoji: '👕' },
  { id: '7-1-4', hiragana: 'ズボン', kanji: '', meaning: '褲子', cantonese: 'fu3', category: 'clothing', emoji: '👖' },
  { id: '7-1-5', hiragana: 'スカート', kanji: '', meaning: '裙子', cantonese: 'kwan4', category: 'clothing', emoji: '👗' },
  { id: '7-1-6', hiragana: 'くつ', kanji: '靴', meaning: '鞋子', cantonese: 'haai4', category: 'clothing', emoji: '👞' },
  { id: '7-1-7', hiragana: 'くつした', kanji: '靴下', meaning: '襪子', cantonese: 'mat6', category: 'clothing', emoji: '🧦' },
  { id: '7-1-8', hiragana: 'ぼうし', kanji: '帽子', meaning: '帽子', cantonese: 'mou6', category: 'clothing', emoji: '🎩' },
  { id: '7-1-9', hiragana: 'コート', kanji: '', meaning: '大衣', cantonese: 'daai6 lau1', category: 'clothing', emoji: '🧥' },
  { id: '7-1-10', hiragana: 'ネクタイ', kanji: '', meaning: '領帶', cantonese: 'leng5 taai1', category: 'clothing', emoji: '👔' },
  
  // Unit 2: 顏色與大小
  { id: '7-2-1', hiragana: 'いろ', kanji: '色', meaning: '顏色', cantonese: 'ngaan4 sik1', category: 'color', emoji: '🎨' },
  { id: '7-2-2', hiragana: 'あか', kanji: '赤', meaning: '紅色', cantonese: 'hung4', category: 'color', emoji: '🔴' },
  { id: '7-2-3', hiragana: 'あお', kanji: '青', meaning: '藍色', cantonese: 'laam4', category: 'color', emoji: '🔵' },
  { id: '7-2-4', hiragana: 'しろ', kanji: '白', meaning: '白色', cantonese: 'baak6', category: 'color', emoji: '⚪' },
  { id: '7-2-5', hiragana: 'くろ', kanji: '黒', meaning: '黑色', cantonese: 'hak1', category: 'color', emoji: '⚫' },
  { id: '7-2-6', hiragana: 'ちいさい', kanji: '小さい', meaning: '小', cantonese: 'sai3', category: 'adj', emoji: '🔽' },
  { id: '7-2-7', hiragana: 'おおきい', kanji: '大きい', meaning: '大', cantonese: 'daai6', category: 'adj', emoji: '🔼' },
  { id: '7-2-8', hiragana: 'あたらしい', kanji: '新しい', meaning: '新', cantonese: 'san1', category: 'adj', emoji: '✨' },
  { id: '7-2-9', hiragana: 'ふるい', kanji: '古い', meaning: '舊', cantonese: 'gau6', category: 'adj', emoji: '📦' },
  { id: '7-2-10', hiragana: 'きれい', kanji: '綺麗', meaning: '漂亮', cantonese: 'leng3', category: 'adj', emoji: '💎' },
  
  // Unit 3: 購物數字
  { id: '7-3-1', hiragana: 'いくら', kanji: '幾ら', meaning: '多少錢', cantonese: 'gei2 cin2', category: 'price', emoji: '💴' },
  { id: '7-3-2', hiragana: 'たかい', kanji: '高い', meaning: '貴', cantonese: 'gwai3', category: 'price', emoji: '💸' },
  { id: '7-3-3', hiragana: 'やすい', kanji: '安い', meaning: '便宜', cantonese: 'peng4', category: 'price', emoji: '🏷️' },
  { id: '7-3-4', hiragana: '～えん', kanji: '～円', meaning: '～日圓', cantonese: 'jat6 jyun4', category: 'price', emoji: '¥' },
  { id: '7-3-5', hiragana: 'ぜんぶで', kanji: '全部で', meaning: '全部一共', cantonese: 'zung2 gung6', category: 'price', emoji: '🧮' },
  { id: '7-3-6', hiragana: 'みせ', kanji: '店', meaning: '商店', cantonese: 'pou3 tau4', category: 'shop', emoji: '🏪' },
  { id: '7-3-7', hiragana: 'デパート', kanji: '', meaning: '百貨公司', cantonese: 'baak3 fo3 gung1 si1', category: 'shop', emoji: '🏬' },
  { id: '7-3-8', hiragana: 'スーパー', kanji: '', meaning: '超市', cantonese: 'ciu1 kap1 si5 coeng4', category: 'shop', emoji: '🛒' },
  { id: '7-3-9', hiragana: 'コンビニ', kanji: '', meaning: '便利店', cantonese: 'bin6 lei6 dim3', category: 'shop', emoji: '🏪' },
  { id: '7-3-10', hiragana: 'しょうてんがい', kanji: '商店街', meaning: '商店街', cantonese: 'gaai1 si5', category: 'shop', emoji: '🏘️' },
  
  // Unit 4: 試穿與詢問
  { id: '7-4-1', hiragana: 'しちゃく', kanji: '試着', meaning: '試穿', cantonese: 'si3 saam1', category: 'clothing', emoji: '👗' },
  { id: '7-4-2', hiragana: 'しろい', kanji: '白い', meaning: '白色的', cantonese: 'baak6 sik1', category: 'color', emoji: '⬜' },
  { id: '7-4-3', hiragana: 'くろい', kanji: '黒い', meaning: '黑色的', cantonese: 'hak1 sik1', category: 'color', emoji: '⬛' },
  { id: '7-4-4', hiragana: 'あかい', kanji: '赤い', meaning: '紅色的', cantonese: 'hung4 sik1', category: 'color', emoji: '🟥' },
  { id: '7-4-5', hiragana: 'あおい', kanji: '青い', meaning: '藍色的', cantonese: 'laam4 sik1', category: 'color', emoji: '🟦' },
  { id: '7-4-6', hiragana: 'もういちど', kanji: 'もう一度', meaning: '再一次', cantonese: 'zoi3 jat1 ci3', category: 'adj', emoji: '🔄' },
  { id: '7-4-7', hiragana: 'ほかの', kanji: '他の', meaning: '其他的', cantonese: 'kei4 taa1', category: 'adj', emoji: '🔀' },
  { id: '7-4-8', hiragana: 'おしゃれ', kanji: 'お洒落', meaning: '時尚', cantonese: 'si4 maau4', category: 'adj', emoji: '💅' },
  { id: '7-4-9', hiragana: 'ちょうどいい', kanji: '', meaning: '剛剛好', cantonese: 'ngaam1 ngaam1 hou2', category: 'adj', emoji: '👌' },
  { id: '7-4-10', hiragana: 'ぴったり', kanji: '', meaning: '剛好合適', cantonese: 'ngaam1 saai3', category: 'adj', emoji: '✅' },
];

export interface GameUnit {
  id: number;
  title: string;
  subtitle: string;
  vocabIds: string[];
  estimatedTime: number;
}

export const lesson7Units: GameUnit[] = [
  {
    id: 1,
    title: '服裝',
    subtitle: '衣服與鞋子',
    vocabIds: ['7-1-1', '7-1-2', '7-1-3', '7-1-4', '7-1-5', '7-1-6', '7-1-7', '7-1-8', '7-1-9', '7-1-10'],
    estimatedTime: 3,
  },
  {
    id: 2,
    title: '顏色與大小',
    subtitle: '購物形容詞',
    vocabIds: ['7-2-1', '7-2-2', '7-2-3', '7-2-4', '7-2-5', '7-2-6', '7-2-7', '7-2-8', '7-2-9', '7-2-10'],
    estimatedTime: 3,
  },
  {
    id: 3,
    title: '購物數字',
    subtitle: '價格與數量',
    vocabIds: ['7-3-1', '7-3-2', '7-3-3', '7-3-4', '7-3-5', '7-3-6', '7-3-7', '7-3-8', '7-3-9', '7-3-10'],
    estimatedTime: 3,
  },
  {
    id: 4,
    title: '試穿與詢問',
    subtitle: '購物對話',
    vocabIds: ['7-4-1', '7-4-2', '7-4-3', '7-4-4', '7-4-5', '7-4-6', '7-4-7', '7-4-8', '7-4-9', '7-4-10'],
    estimatedTime: 3,
  },
];

export interface SentenceBlock {
  id: string;
  text: string;
  type: 'clothing' | 'color' | 'price' | 'particle' | 'verb' | 'phrase' | 'topic';
  meaning: string;
  unitId: number;
}

export const sentenceBlocks: SentenceBlock[] = [
  { id: 'sb7-1-1', text: 'この', type: 'topic', meaning: '這個', unitId: 1 },
  { id: 'sb7-1-2', text: 'ふくは', type: 'clothing', meaning: '衣服', unitId: 1 },
  { id: 'sb7-1-3', text: 'セーターは', type: 'clothing', meaning: '毛衣', unitId: 1 },
  { id: 'sb7-1-4', text: 'くつは', type: 'clothing', meaning: '鞋子', unitId: 1 },
  
  { id: 'sb7-2-1', text: 'あかい', type: 'color', meaning: '紅色的', unitId: 2 },
  { id: 'sb7-2-2', text: 'しろい', type: 'color', meaning: '白色的', unitId: 2 },
  { id: 'sb7-2-3', text: 'くろい', type: 'color', meaning: '黑色的', unitId: 2 },
  { id: 'sb7-2-4', text: 'おおきい', type: 'color', meaning: '大的', unitId: 2 },
  { id: 'sb7-2-5', text: 'ちいさい', type: 'color', meaning: '小的', unitId: 2 },
  { id: 'sb7-2-6', text: 'です', type: 'particle', meaning: '是', unitId: 2 },
  
  { id: 'sb7-3-1', text: 'いくら', type: 'price', meaning: '多少錢', unitId: 3 },
  { id: 'sb7-3-2', text: 'ですか', type: 'particle', meaning: '嗎', unitId: 3 },
  { id: 'sb7-3-3', text: 'たかい', type: 'price', meaning: '貴', unitId: 3 },
  { id: 'sb7-3-4', text: 'やすい', type: 'price', meaning: '便宜', unitId: 3 },
  { id: 'sb7-3-5', text: 'ぜんぶで', type: 'price', meaning: '全部一共', unitId: 3 },
  { id: 'sb7-3-6', text: 'えん', type: 'price', meaning: '日圓', unitId: 3 },
  
  { id: 'sb7-4-1', text: 'これを', type: 'phrase', meaning: '這個', unitId: 4 },
  { id: 'sb7-4-2', text: 'ください', type: 'phrase', meaning: '請給我', unitId: 4 },
  { id: 'sb7-4-3', text: 'しちゃくして', type: 'phrase', meaning: '試穿', unitId: 4 },
  { id: 'sb7-4-4', text: 'もいいですか', type: 'phrase', meaning: '也可以嗎', unitId: 4 },
  { id: 'sb7-4-5', text: 'ぴったり', type: 'phrase', meaning: '剛好合適', unitId: 4 },
  { id: 'sb7-4-6', text: 'です', type: 'particle', meaning: '是', unitId: 4 },
];

export function getVocabById(id: string): GameVocab | undefined {
  return lesson7Vocab.find(v => v.id === id);
}

export function getVocabByUnit(unitId: number): GameVocab[] {
  const unit = lesson7Units.find(u => u.id === unitId);
  if (!unit) return [];
  return unit.vocabIds.map(id => getVocabById(id)).filter((v): v is GameVocab => v !== undefined);
}

export function getBlocksByUnit(unitId: number): SentenceBlock[] {
  return sentenceBlocks.filter(b => b.unitId <= unitId);
}

export function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
