/**
 * 第10課遊戲化數據結構
 * Lesson 10: 場所與存在
 */

export interface GameVocab {
  id: string;
  hiragana: string;
  kanji: string;
  meaning: string;
  cantonese: string;
  note?: string;
  emoji?: string;
  category: 'place' | 'thing' | 'direction' | 'action';
}

export const lesson10Vocab: GameVocab[] = [
  // Unit 1: 存在動詞
  { id: '10-1-1', hiragana: 'あります', kanji: '', meaning: '有（非生物）', cantonese: 'jau5', category: 'action', emoji: '📦' },
  { id: '10-1-2', hiragana: 'います', kanji: '', meaning: '有（生物）', cantonese: 'jau5', category: 'action', emoji: '👤' },
  { id: '10-1-3', hiragana: 'ありました', kanji: '', meaning: '有過（非生物）', cantonese: 'jat6 gin2 gwo3', category: 'action', emoji: '📦' },
  { id: '10-1-4', hiragana: 'いました', kanji: '', meaning: '有過（生物）', cantonese: 'jat6 gin2 gwo3', category: 'action', emoji: '👤' },
  { id: '10-1-5', hiragana: 'いろいろ', kanji: '色々', meaning: '各種各樣', cantonese: 'gok3 zung2 gok3 joeng6', category: 'thing', emoji: '🔀' },
  { id: '10-1-6', hiragana: 'たくさん', kanji: '', meaning: '很多', cantonese: 'han2 do1', category: 'thing', emoji: '💯' },
  { id: '10-1-7', hiragana: 'すこし', kanji: '少し', meaning: '一點點', cantonese: 'jat1 dim2 dim2', category: 'thing', emoji: '🔹' },
  { id: '10-1-8', hiragana: 'とても', kanji: '', meaning: '非常', cantonese: 'fei1 soeng4', category: 'thing', emoji: '✨' },
  { id: '10-1-9', hiragana: 'あまり', kanji: '', meaning: '不太', cantonese: 'bat1 taai3', category: 'thing', emoji: '🔸' },
  { id: '10-1-10', hiragana: 'ぜんぜん', kanji: '全然', meaning: '完全（不）', cantonese: 'jyun4 cyun4', category: 'thing', emoji: '❌' },
  
  // Unit 2: 方位
  { id: '10-2-1', hiragana: 'うえ', kanji: '上', meaning: '上面', cantonese: 'soeng6 min6', category: 'direction', emoji: '⬆️' },
  { id: '10-2-2', hiragana: 'した', kanji: '下', meaning: '下面', cantonese: 'haa6 min6', category: 'direction', emoji: '⬇️' },
  { id: '10-2-3', hiragana: 'まえ', kanji: '前', meaning: '前面', cantonese: 'cin4 min6', category: 'direction', emoji: '⬅️' },
  { id: '10-2-4', hiragana: 'うしろ', kanji: '後ろ', meaning: '後面', cantonese: 'hau6 min6', category: 'direction', emoji: '➡️' },
  { id: '10-2-5', hiragana: 'みぎ', kanji: '右', meaning: '右面', cantonese: 'jau6 min6', category: 'direction', emoji: '➡️' },
  { id: '10-2-6', hiragana: 'ひだり', kanji: '左', meaning: '左面', cantonese: 'zo2 min6', category: 'direction', emoji: '⬅️' },
  { id: '10-2-7', hiragana: 'なか', kanji: '中', meaning: '裡面', cantonese: 'leoi5 min6', category: 'direction', emoji: '📦' },
  { id: '10-2-8', hiragana: 'そと', kanji: '外', meaning: '外面', cantonese: 'ngoi6 min6', category: 'direction', emoji: '🚪' },
  { id: '10-2-9', hiragana: 'ちかく', kanji: '近く', meaning: '附近', cantonese: 'fu6 gan6', category: 'direction', emoji: '📍' },
  { id: '10-2-10', hiragana: 'となり', kanji: '隣', meaning: '旁邊', cantonese: 'pong4 bin1', category: 'direction', emoji: '👉' },
  
  // Unit 3: 公共場所
  { id: '10-3-1', hiragana: 'ぎんこう', kanji: '銀行', meaning: '銀行', cantonese: 'ngan4 hong4', category: 'place', emoji: '🏦' },
  { id: '10-3-2', hiragana: 'ゆうびんきょく', kanji: '郵便局', meaning: '郵局', cantonese: 'jau4 guk6', category: 'place', emoji: '🏣' },
  { id: '10-3-3', hiragana: 'としょかん', kanji: '図書館', meaning: '圖書館', cantonese: 'tou4 syu1 gun2', category: 'place', emoji: '📚' },
  { id: '10-3-4', hiragana: 'びじゅつかん', kanji: '美術館', meaning: '美術館', cantonese: 'mei5 seot6 gun2', category: 'place', emoji: '🎨' },
  { id: '10-3-5', hiragana: 'えいがかん', kanji: '映画館', meaning: '電影院', cantonese: 'din6 jing2 jyun2', category: 'place', emoji: '🎭' },
  { id: '10-3-6', hiragana: 'はくぶつかん', kanji: '博物館', meaning: '博物館', cantonese: 'bok3 mat6 gun2', category: 'place', emoji: '🏛️' },
  { id: '10-3-7', hiragana: 'こうえん', kanji: '公園', meaning: '公園', cantonese: 'gung1 jyun4', category: 'place', emoji: '🌳' },
  { id: '10-3-8', hiragana: 'びょういん', kanji: '病院', meaning: '醫院', cantonese: 'ji1 jyun6', category: 'place', emoji: '🏥' },
  { id: '10-3-9', hiragana: 'くうこう', kanji: '空港', meaning: '機場', cantonese: 'gei1 coeng4', category: 'place', emoji: '🛫' },
  { id: '10-3-10', hiragana: 'えき', kanji: '駅', meaning: '車站', cantonese: 'ce1 zaam6', category: 'place', emoji: '🚉' },
  
  // Unit 4: 物品
  { id: '10-4-1', hiragana: 'つくえ', kanji: '机', meaning: '桌子', cantonese: 'coek3 zi2', category: 'thing', emoji: '🪑' },
  { id: '10-4-2', hiragana: 'いす', kanji: '椅子', meaning: '椅子', cantonese: 'ji5 zi2', category: 'thing', emoji: '🪑' },
  { id: '10-4-3', hiragana: 'ドア', kanji: '', meaning: '門', cantonese: 'mun4', category: 'thing', emoji: '🚪' },
  { id: '10-4-4', hiragana: 'まど', kanji: '窓', meaning: '窗', cantonese: 'coeng1', category: 'thing', emoji: '🪟' },
  { id: '10-4-5', hiragana: 'でんき', kanji: '電気', meaning: '電燈', cantonese: 'din6 dang1', category: 'thing', emoji: '💡' },
  { id: '10-4-6', hiragana: 'えアコン', kanji: '', meaning: '空調', cantonese: 'hung1 tiu4', category: 'thing', emoji: '❄️' },
  { id: '10-4-7', hiragana: 'パソコン', kanji: '', meaning: '電腦', cantonese: 'din6 nou5', category: 'thing', emoji: '💻' },
  { id: '10-4-8', hiragana: 'ケータイ', kanji: '', meaning: '手機', cantonese: 'sau2 gei1', category: 'thing', emoji: '📱' },
];

export interface GameUnit {
  id: number;
  title: string;
  subtitle: string;
  vocabIds: string[];
  estimatedTime: number;
}

export const lesson10Units: GameUnit[] = [
  {
    id: 1,
    title: '存在動詞',
    subtitle: 'あります・います',
    vocabIds: ['10-1-1', '10-1-2', '10-1-3', '10-1-4', '10-1-5', '10-1-6', '10-1-7', '10-1-8', '10-1-9', '10-1-10'],
    estimatedTime: 3,
  },
  {
    id: 2,
    title: '方位',
    subtitle: '上・下・前・後',
    vocabIds: ['10-2-1', '10-2-2', '10-2-3', '10-2-4', '10-2-5', '10-2-6', '10-2-7', '10-2-8', '10-2-9', '10-2-10'],
    estimatedTime: 3,
  },
  {
    id: 3,
    title: '公共場所',
    subtitle: '銀行・郵局・圖書館',
    vocabIds: ['10-3-1', '10-3-2', '10-3-3', '10-3-4', '10-3-5', '10-3-6', '10-3-7', '10-3-8', '10-3-9', '10-3-10'],
    estimatedTime: 3,
  },
  {
    id: 4,
    title: '物品',
    subtitle: '家具與電器',
    vocabIds: ['10-4-1', '10-4-2', '10-4-3', '10-4-4', '10-4-5', '10-4-6', '10-4-7', '10-4-8'],
    estimatedTime: 3,
  },
];

export interface SentenceBlock {
  id: string;
  text: string;
  type: string;
  meaning: string;
  unitId: number;
}

export const sentenceBlocks: SentenceBlock[] = [
  { id: 'sb10-1-1', text: 'つくえの', type: 'thing', meaning: '桌子的', unitId: 1 },
  { id: 'sb10-1-2', text: 'うえに', type: 'direction', meaning: '上面', unitId: 1 },
  { id: 'sb10-1-3', text: 'あります', type: 'verb', meaning: '有', unitId: 1 },
  { id: 'sb10-1-4', text: 'います', type: 'verb', meaning: '有（人）', unitId: 1 },
  { id: 'sb10-1-5', text: 'たくさん', type: 'thing', meaning: '很多', unitId: 1 },
  
  { id: 'sb10-2-1', text: 'みぎ', type: 'direction', meaning: '右面', unitId: 2 },
  { id: 'sb10-2-2', text: 'ひだり', type: 'direction', meaning: '左面', unitId: 2 },
  { id: 'sb10-2-3', text: 'となりに', type: 'direction', meaning: '旁邊', unitId: 2 },
  { id: 'sb10-2-4', text: 'まえに', type: 'direction', meaning: '前面', unitId: 2 },
  { id: 'sb10-2-5', text: 'うしろに', type: 'direction', meaning: '後面', unitId: 2 },
  
  { id: 'sb10-3-1', text: 'ぎんこう', type: 'place', meaning: '銀行', unitId: 3 },
  { id: 'sb10-3-2', text: 'ゆうびんきょく', type: 'place', meaning: '郵局', unitId: 3 },
  { id: 'sb10-3-3', text: 'としょかん', type: 'place', meaning: '圖書館', unitId: 3 },
  { id: 'sb10-3-4', text: 'は', type: 'particle', meaning: '', unitId: 3 },
  { id: 'sb10-3-5', text: 'どこに', type: 'direction', meaning: '哪裡', unitId: 3 },
  { id: 'sb10-3-6', text: 'ありますか', type: 'verb', meaning: '有嗎', unitId: 3 },
  
  { id: 'sb10-4-1', text: 'へやに', type: 'place', meaning: '房間裡', unitId: 4 },
  { id: 'sb10-4-2', text: 'パソコンが', type: 'thing', meaning: '電腦', unitId: 4 },
  { id: 'sb10-4-3', text: 'ケータイが', type: 'thing', meaning: '手機', unitId: 4 },
  { id: 'sb10-4-4', text: 'ありません', type: 'verb', meaning: '沒有', unitId: 4 },
];

export function getVocabById(id: string): GameVocab | undefined {
  return lesson10Vocab.find(v => v.id === id);
}

export function getVocabByUnit(unitId: number): GameVocab[] {
  const unit = lesson10Units.find(u => u.id === unitId);
  if (!unit) return [];
  return unit.vocabIds.map(id => getVocabById(id)).filter((v): v is GameVocab => v !== undefined);
}

export function getBlocksByUnit(unitId: number): SentenceBlock[] {
  return sentenceBlocks.filter(b => b.unitId <= unitId);
}

export function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
