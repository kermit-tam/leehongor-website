/**
 * 第9課遊戲化數據結構
 * Lesson 9: 動詞（過去形）
 */

export interface GameVocab {
  id: string;
  hiragana: string;
  kanji: string;
  meaning: string;
  cantonese: string;
  note?: string;
  emoji?: string;
  category: 'verb' | 'time' | 'activity';
}

export const lesson9Vocab: GameVocab[] = [
  // Unit 1: 動詞過去形
  { id: '9-1-1', hiragana: 'たべました', kanji: '食べました', meaning: '吃了', cantonese: 'sik6 zo2', category: 'verb', emoji: '🍽️' },
  { id: '9-1-2', hiragana: 'のみました', kanji: '飲みました', meaning: '喝了', cantonese: 'jam2 zo2', category: 'verb', emoji: '🥤' },
  { id: '9-1-3', hiragana: 'みました', kanji: '見ました', meaning: '看了', cantonese: 'tai2 zo2', category: 'verb', emoji: '👀' },
  { id: '9-1-4', hiragana: 'ききました', kanji: '聞きました', meaning: '聽了', cantonese: 'teng1 zo2', category: 'verb', emoji: '👂' },
  { id: '9-1-5', hiragana: 'よみました', kanji: '読みました', meaning: '讀了', cantonese: 'duk6 zo2', category: 'verb', emoji: '📖' },
  { id: '9-1-6', hiragana: 'かきました', kanji: '書きました', meaning: '寫了', cantonese: 'se2 zo2', category: 'verb', emoji: '✍️' },
  { id: '9-1-7', hiragana: 'しました', kanji: '', meaning: '做了', cantonese: 'zou6 zo2', category: 'verb', emoji: '✓' },
  { id: '9-1-8', hiragana: 'いきました', kanji: '行きました', meaning: '去了', cantonese: 'heoi3 zo2', category: 'verb', emoji: '🚶' },
  { id: '9-1-9', hiragana: 'きました', kanji: '來ました', meaning: '來了', cantonese: 'lai4 zo2', category: 'verb', emoji: '🏃' },
  { id: '9-1-10', hiragana: 'かえりました', kanji: '帰りました', meaning: '回去了', cantonese: 'faan1 zo2', category: 'verb', emoji: '🏠' },
  
  // Unit 2: 時間表達2
  { id: '9-2-1', hiragana: 'けさ', kanji: '今朝', meaning: '今天早上', cantonese: 'gam1 zou1', category: 'time', emoji: '🌅' },
  { id: '9-2-2', hiragana: 'きょう', kanji: '今日', meaning: '今天', cantonese: 'gam1 jat6', category: 'time', emoji: '📅' },
  { id: '9-2-3', hiragana: 'あした', kanji: '明日', meaning: '明天', cantonese: 'ting1 jat6', category: 'time', emoji: '🌄' },
  { id: '9-2-4', hiragana: 'きのう', kanji: '昨日', meaning: '昨天', cantonese: 'zok3 jat6', category: 'time', emoji: '📆' },
  { id: '9-2-5', hiragana: 'こんばん', kanji: '今晩', meaning: '今晚', cantonese: 'gam1 maan5', category: 'time', emoji: '🌙' },
  { id: '9-2-6', hiragana: 'ゆうべ', kanji: '夕べ', meaning: '昨晚', cantonese: 'zok3 maan5', category: 'time', emoji: '🌃' },
  { id: '9-2-7', hiragana: 'まいにち', kanji: '每日', meaning: '每天', cantonese: 'mui5 jat6', category: 'time', emoji: '🔁' },
  { id: '9-2-8', hiragana: 'まいあさ', kanji: '每朝', meaning: '每天早上', cantonese: 'mui5 zou1', category: 'time', emoji: '🌅' },
  { id: '9-2-9', hiragana: 'まいばん', kanji: '每晩', meaning: '每天晚上', cantonese: 'mui5 maan5', category: 'time', emoji: '🌙' },
  { id: '9-2-10', hiragana: 'しゅうまつ', kanji: '週末', meaning: '週末', cantonese: 'zau1 mut6', category: 'time', emoji: '🎉' },
  
  // Unit 3: 活動
  { id: '9-3-1', hiragana: 'がっこう', kanji: '學校', meaning: '學校', cantonese: 'hok6 haau6', category: 'activity', emoji: '🏫' },
  { id: '9-3-2', hiragana: 'べんきょう', kanji: '勉強', meaning: '學習', cantonese: 'hok6 zaap6', category: 'activity', emoji: '📚' },
  { id: '9-3-3', hiragana: 'しごと', kanji: '仕事', meaning: '工作', cantonese: 'gung1 zok3', category: 'activity', emoji: '💼' },
  { id: '9-3-4', hiragana: 'かいもの', kanji: '買い物', meaning: '購物', cantonese: 'maai5 mat6', category: 'activity', emoji: '🛍️' },
  { id: '9-3-5', hiragana: 'うんどう', kanji: '運動', meaning: '運動', cantonese: 'wan6 dung6', category: 'activity', emoji: '🏃' },
  { id: '9-3-6', hiragana: 'りょこう', kanji: '旅行', meaning: '旅行', cantonese: 'leoi5 hang4', category: 'activity', emoji: '✈️' },
  { id: '9-3-7', hiragana: 'おんがく', kanji: '音楽', meaning: '音樂', cantonese: 'jam1 ngok6', category: 'activity', emoji: '🎵' },
  { id: '9-3-8', hiragana: 'えいが', kanji: '映画', meaning: '電影', cantonese: 'din6 jing2', category: 'activity', emoji: '🎬' },
  { id: '9-3-9', hiragana: 'しゅっちょう', kanji: '出張', meaning: '出差', cantonese: 'ceot1 zoeng1', category: 'activity', emoji: '✈️' },
  { id: '9-3-10', hiragana: 'やすみ', kanji: '休み', meaning: '休息', cantonese: 'jau1 sik1', category: 'activity', emoji: '☕' },
  
  // Unit 4: 更多動詞
  { id: '9-4-1', hiragana: 'おきました', kanji: '起きました', meaning: '起床了', cantonese: 'hei2 san4 zo2', category: 'verb', emoji: '🛏️' },
  { id: '9-4-2', hiragana: 'ねました', kanji: '寝ました', meaning: '睡了', cantonese: 'fan3 zo2', category: 'verb', emoji: '😴' },
  { id: '9-4-3', hiragana: 'はたらきました', kanji: '傓きました', meaning: '工作了', cantonese: 'gung1 zok3 zo2', category: 'verb', emoji: '💻' },
  { id: '9-4-4', hiragana: 'かいものしました', kanji: '', meaning: '購物了', cantonese: 'maai5 mat6 zo2', category: 'verb', emoji: '🛒' },
  { id: '9-4-5', hiragana: 'そうじしました', kanji: '掃除しました', meaning: '打掃了', cantonese: 'daa2 sou3 zo2', category: 'verb', emoji: '🧹' },
  { id: '9-4-6', hiragana: 'せんたくしました', kanji: '洗濯しました', meaning: '洗衣服了', cantonese: 'sai2 jung6 fu6 zo2', category: 'verb', emoji: '👕' },
  { id: '9-4-7', hiragana: 'りょうりしました', kanji: '料理しました', meaning: '煮飯了', cantonese: 'zyu3 faan6 zo2', category: 'verb', emoji: '👨‍🍳' },
  { id: '9-4-8', hiragana: 'しょくじしました', kanji: '食事しました', meaning: '用餐了', cantonese: 'sik6 si6 zo2', category: 'verb', emoji: '🍽️' },
];

export interface GameUnit {
  id: number;
  title: string;
  subtitle: string;
  vocabIds: string[];
  estimatedTime: number;
}

export const lesson9Units: GameUnit[] = [
  {
    id: 1,
    title: '動詞過去形',
    subtitle: '～ました',
    vocabIds: ['9-1-1', '9-1-2', '9-1-3', '9-1-4', '9-1-5', '9-1-6', '9-1-7', '9-1-8', '9-1-9', '9-1-10'],
    estimatedTime: 3,
  },
  {
    id: 2,
    title: '時間表達2',
    subtitle: '今天・昨天・明天',
    vocabIds: ['9-2-1', '9-2-2', '9-2-3', '9-2-4', '9-2-5', '9-2-6', '9-2-7', '9-2-8', '9-2-9', '9-2-10'],
    estimatedTime: 3,
  },
  {
    id: 3,
    title: '活動',
    subtitle: '學習・工作・娛樂',
    vocabIds: ['9-3-1', '9-3-2', '9-3-3', '9-3-4', '9-3-5', '9-3-6', '9-3-7', '9-3-8', '9-3-9', '9-3-10'],
    estimatedTime: 3,
  },
  {
    id: 4,
    title: '日常生活',
    subtitle: '起床・工作・睡覺',
    vocabIds: ['9-4-1', '9-4-2', '9-4-3', '9-4-4', '9-4-5', '9-4-6', '9-4-7', '9-4-8'],
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
  { id: 'sb9-1-1', text: 'わたしは', type: 'topic', meaning: '我', unitId: 1 },
  { id: 'sb9-1-2', text: 'ごはんを', type: 'food', meaning: '飯', unitId: 1 },
  { id: 'sb9-1-3', text: 'たべました', type: 'verb', meaning: '吃了', unitId: 1 },
  { id: 'sb9-1-4', text: 'のみました', type: 'verb', meaning: '喝了', unitId: 1 },
  { id: 'sb9-1-5', text: 'みました', type: 'verb', meaning: '看了', unitId: 1 },
  { id: 'sb9-1-6', text: 'ききました', type: 'verb', meaning: '聽了', unitId: 1 },
  
  { id: 'sb9-2-1', text: 'きのう', type: 'time', meaning: '昨天', unitId: 2 },
  { id: 'sb9-2-2', text: 'けさ', type: 'time', meaning: '今天早上', unitId: 2 },
  { id: 'sb9-2-3', text: 'こんばん', type: 'time', meaning: '今晚', unitId: 2 },
  { id: 'sb9-2-4', text: 'しゅうまつ', type: 'time', meaning: '週末', unitId: 2 },
  
  { id: 'sb9-3-1', text: 'がっこうで', type: 'place', meaning: '在學校', unitId: 3 },
  { id: 'sb9-3-2', text: 'べんきょうしました', type: 'verb', meaning: '學習了', unitId: 3 },
  { id: 'sb9-3-3', text: 'しごとを', type: 'activity', meaning: '工作', unitId: 3 },
  { id: 'sb9-3-4', text: 'しました', type: 'verb', meaning: '做了', unitId: 3 },
  { id: 'sb9-3-5', text: 'りょこうしました', type: 'verb', meaning: '旅行了', unitId: 3 },
  { id: 'sb9-3-6', text: 'えいがを', type: 'activity', meaning: '電影', unitId: 3 },
  
  { id: 'sb9-4-1', text: 'なんじに', type: 'time', meaning: '幾點', unitId: 4 },
  { id: 'sb9-4-2', text: 'おきましたか', type: 'verb', meaning: '起床了嗎', unitId: 4 },
  { id: 'sb9-4-3', text: 'ねました', type: 'verb', meaning: '睡了', unitId: 4 },
  { id: 'sb9-4-4', text: 'ろくじに', type: 'time', meaning: '六點', unitId: 4 },
];

export function getVocabById(id: string): GameVocab | undefined {
  return lesson9Vocab.find(v => v.id === id);
}

export function getVocabByUnit(unitId: number): GameVocab[] {
  const unit = lesson9Units.find(u => u.id === unitId);
  if (!unit) return [];
  return unit.vocabIds.map(id => getVocabById(id)).filter((v): v is GameVocab => v !== undefined);
}

export function getBlocksByUnit(unitId: number): SentenceBlock[] {
  return sentenceBlocks.filter(b => b.unitId <= unitId);
}

export function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
