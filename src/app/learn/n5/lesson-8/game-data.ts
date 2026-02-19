/**
 * 第8課遊戲化數據結構
 * Lesson 8: 形容詞
 */

export interface GameVocab {
  id: string;
  hiragana: string;
  kanji: string;
  meaning: string;
  cantonese: string;
  note?: string;
  emoji?: string;
  category: 'adj' | 'place' | 'nature';
}

export const lesson8Vocab: GameVocab[] = [
  // Unit 1: い形容詞
  { id: '8-1-1', hiragana: 'たかい', kanji: '高い', meaning: '高的；貴的', cantonese: 'gou1; gwai3', category: 'adj', emoji: '💰' },
  { id: '8-1-2', hiragana: 'やすい', kanji: '安い', meaning: '便宜的', cantonese: 'peng4', category: 'adj', emoji: '🏷️' },
  { id: '8-1-3', hiragana: 'おもい', kanji: '重い', meaning: '重的', cantonese: 'cung5', category: 'adj', emoji: '🏋️' },
  { id: '8-1-4', hiragana: 'かるい', kanji: '軽い', meaning: '輕的', cantonese: 'hing1', category: 'adj', emoji: '🪶' },
  { id: '8-1-5', hiragana: 'ひろい', kanji: '広い', meaning: '寬敞的', cantonese: 'fun1', category: 'adj', emoji: '🏞️' },
  { id: '8-1-6', hiragana: 'せまい', kanji: '狭い', meaning: '狹窄的', cantonese: 'haap6', category: 'adj', emoji: '📦' },
  { id: '8-1-7', hiragana: 'あたたかい', kanji: '暖かい', meaning: '暖和的', cantonese: 'nyun5', category: 'adj', emoji: '🔥' },
  { id: '8-1-8', hiragana: 'すずしい', kanji: '涼しい', meaning: '涼爽的', cantonese: 'loeng5', category: 'adj', emoji: '🍃' },
  { id: '8-1-9', hiragana: 'あつい', kanji: '暑い', meaning: '炎熱的', cantonese: 'jit6', category: 'adj', emoji: '🌡️' },
  { id: '8-1-10', hiragana: 'さむい', kanji: '寒い', meaning: '寒冷的', cantonese: 'hon4', category: 'adj', emoji: '❄️' },
  
  // Unit 2: な形容詞
  { id: '8-2-1', hiragana: 'しんせつ', kanji: '親切', meaning: '親切', cantonese: 'can1 cit3', category: 'adj', emoji: '😊' },
  { id: '8-2-2', hiragana: 'べんり', kanji: '便利', meaning: '方便', cantonese: 'bin6 lei6', category: 'adj', emoji: '✅' },
  { id: '8-2-3', hiragana: 'げんき', kanji: '元気', meaning: '精神；健康', cantonese: 'gin6 hei3', category: 'adj', emoji: '💪' },
  { id: '8-2-4', hiragana: 'かんたん', kanji: '簡単', meaning: '簡單', cantonese: 'gaan2 daan1', category: 'adj', emoji: '🟢' },
  { id: '8-2-5', hiragana: 'むずかしい', kanji: '難しい', meaning: '困難的', cantonese: 'kwan4 naan4', category: 'adj', emoji: '🔴' },
  { id: '8-2-6', hiragana: 'にぎやか', kanji: '賑やか', meaning: '熱閙', cantonese: 'jit6 naau6', category: 'adj', emoji: '🎉' },
  { id: '8-2-7', hiragana: 'しずか', kanji: '静か', meaning: '安靜', cantonese: 'on1 zing6', category: 'adj', emoji: '🤫' },
  { id: '8-2-8', hiragana: 'ひま', kanji: '暇', meaning: '有空', cantonese: 'jau5 hung1', category: 'adj', emoji: '📅' },
  { id: '8-2-9', hiragana: 'すてき', kanji: '素敵', meaning: '出色；極好', cantonese: 'sou3 dik6', category: 'adj', emoji: '⭐' },
  { id: '8-2-10', hiragana: 'だいじょうぶ', kanji: '大丈夫', meaning: '不要緊；沒問題', cantonese: 'daai6 ze6 fu1', category: 'adj', emoji: '👌' },
  
  // Unit 3: 場所描述
  { id: '8-3-1', hiragana: 'ともだち', kanji: '友達', meaning: '朋友', cantonese: 'pang4 jau5', category: 'place', emoji: '👥' },
  { id: '8-3-2', hiragana: 'りょう', kanji: '寮', meaning: '宿舍', cantonese: 'se5', category: 'place', emoji: '🏠' },
  { id: '8-3-3', hiragana: 'きょうしつ', kanji: '教室', meaning: '教室', cantonese: 'gaau3 sat1', category: 'place', emoji: '🏫' },
  { id: '8-3-4', hiragana: 'としょしつ', kanji: '図書室', meaning: '圖書室', cantonese: 'tou4 syu1 sat1', category: 'place', emoji: '📚' },
  { id: '8-3-5', hiragana: 'しょくどう', kanji: '食堂', meaning: '食堂', cantonese: 'sik6 tong4', category: 'place', emoji: '🍽️' },
  { id: '8-3-6', hiragana: 'じむしょ', kanji: '事務所', meaning: '辦公室', cantonese: 'baan6 gung1 sat1', category: 'place', emoji: '🏢' },
  { id: '8-3-7', hiragana: 'うけつけ', kanji: '受付', meaning: '接待處', cantonese: 'zip3 doi6 cyu3', category: 'place', emoji: '💁' },
  { id: '8-3-8', hiragana: 'かいだん', kanji: '階段', meaning: '樓梯', cantonese: 'lau4 tai1', category: 'place', emoji: '🪜' },
  { id: '8-3-9', hiragana: 'エレベーター', kanji: '', meaning: '電梯', cantonese: 'din6 tai1', category: 'place', emoji: '🛗' },
  { id: '8-3-10', hiragana: 'エスカレーター', kanji: '', meaning: '扶手電梯', cantonese: 'fu2 sau2 din6 tai1', category: 'place', emoji: '🛗' },
  
  // Unit 4: 自然與天氣
  { id: '8-4-1', hiragana: 'てんき', kanji: '天気', meaning: '天氣', cantonese: 'tin1 hei3', category: 'nature', emoji: '🌤️' },
  { id: '8-4-2', hiragana: 'はれ', kanji: '晴れ', meaning: '晴天', cantonese: 'cing4 tin1', category: 'nature', emoji: '☀️' },
  { id: '8-4-3', hiragana: 'くもり', kanji: '曇り', meaning: '多雲', cantonese: 'do1 wan4', category: 'nature', emoji: '☁️' },
  { id: '8-4-4', hiragana: 'あめ', kanji: '雨', meaning: '雨', cantonese: 'jyu5', category: 'nature', emoji: '🌧️' },
  { id: '8-4-5', hiragana: 'ゆき', kanji: '雪', meaning: '雪', cantonese: 'syut3', category: 'nature', emoji: '❄️' },
  { id: '8-4-6', hiragana: 'かぜ', kanji: '風', meaning: '風', cantonese: 'fung1', category: 'nature', emoji: '💨' },
  { id: '8-4-7', hiragana: 'くうこう', kanji: '空港', meaning: '機場', cantonese: 'gei1 coeng4', category: 'place', emoji: '🛫' },
  { id: '8-4-8', hiragana: 'びょういん', kanji: '病院', meaning: '醫院', cantonese: 'ji1 jyun6', category: 'place', emoji: '🏥' },
];

export interface GameUnit {
  id: number;
  title: string;
  subtitle: string;
  vocabIds: string[];
  estimatedTime: number;
}

export const lesson8Units: GameUnit[] = [
  {
    id: 1,
    title: 'い形容詞',
    subtitle: '高い・安い・大きい',
    vocabIds: ['8-1-1', '8-1-2', '8-1-3', '8-1-4', '8-1-5', '8-1-6', '8-1-7', '8-1-8', '8-1-9', '8-1-10'],
    estimatedTime: 3,
  },
  {
    id: 2,
    title: 'な形容詞',
    subtitle: '便利・元気・簡単',
    vocabIds: ['8-2-1', '8-2-2', '8-2-3', '8-2-4', '8-2-5', '8-2-6', '8-2-7', '8-2-8', '8-2-9', '8-2-10'],
    estimatedTime: 3,
  },
  {
    id: 3,
    title: '場所',
    subtitle: '學校設施',
    vocabIds: ['8-3-1', '8-3-2', '8-3-3', '8-3-4', '8-3-5', '8-3-6', '8-3-7', '8-3-8', '8-3-9', '8-3-10'],
    estimatedTime: 3,
  },
  {
    id: 4,
    title: '天氣',
    subtitle: '晴れ・雨・雪',
    vocabIds: ['8-4-1', '8-4-2', '8-4-3', '8-4-4', '8-4-5', '8-4-6', '8-4-7', '8-4-8'],
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
  { id: 'sb8-1-1', text: 'この', type: 'topic', meaning: '這個', unitId: 1 },
  { id: 'sb8-1-2', text: 'たかい', type: 'adj', meaning: '貴', unitId: 1 },
  { id: 'sb8-1-3', text: 'やすい', type: 'adj', meaning: '便宜', unitId: 1 },
  { id: 'sb8-1-4', text: 'おおきい', type: 'adj', meaning: '大', unitId: 1 },
  { id: 'sb8-1-5', text: 'ちいさい', type: 'adj', meaning: '小', unitId: 1 },
  { id: 'sb8-1-6', text: 'あつい', type: 'adj', meaning: '熱', unitId: 1 },
  { id: 'sb8-1-7', text: 'さむい', type: 'adj', meaning: '冷', unitId: 1 },
  { id: 'sb8-1-8', text: 'です', type: 'particle', meaning: '是', unitId: 1 },
  
  { id: 'sb8-2-1', text: 'べんり', type: 'adj', meaning: '方便', unitId: 2 },
  { id: 'sb8-2-2', text: 'しんせつ', type: 'adj', meaning: '親切', unitId: 2 },
  { id: 'sb8-2-3', text: 'げんき', type: 'adj', meaning: '健康', unitId: 2 },
  { id: 'sb8-2-4', text: 'かんたん', type: 'adj', meaning: '簡單', unitId: 2 },
  { id: 'sb8-2-5', text: 'むずかしい', type: 'adj', meaning: '困難', unitId: 2 },
  { id: 'sb8-2-6', text: 'しずか', type: 'adj', meaning: '安靜', unitId: 2 },
  { id: 'sb8-2-7', text: 'にぎやか', type: 'adj', meaning: '熱閙', unitId: 2 },
  { id: 'sb8-2-8', text: 'な', type: 'particle', meaning: '的', unitId: 2 },
  
  { id: 'sb8-3-1', text: 'きょうしつ', type: 'place', meaning: '教室', unitId: 3 },
  { id: 'sb8-3-2', text: 'としょしつ', type: 'place', meaning: '圖書室', unitId: 3 },
  { id: 'sb8-3-3', text: 'しょくどう', type: 'place', meaning: '食堂', unitId: 3 },
  { id: 'sb8-3-4', text: 'は', type: 'particle', meaning: '', unitId: 3 },
  
  { id: 'sb8-4-1', text: 'きょう', type: 'nature', meaning: '今天', unitId: 4 },
  { id: 'sb8-4-2', text: 'てんき', type: 'nature', meaning: '天氣', unitId: 4 },
  { id: 'sb8-4-3', text: 'はれ', type: 'nature', meaning: '晴', unitId: 4 },
  { id: 'sb8-4-4', text: 'あめ', type: 'nature', meaning: '雨', unitId: 4 },
  { id: 'sb8-4-5', text: 'くもり', type: 'nature', meaning: '多雲', unitId: 4 },
  { id: 'sb8-4-6', text: 'です', type: 'particle', meaning: '是', unitId: 4 },
];

export function getVocabById(id: string): GameVocab | undefined {
  return lesson8Vocab.find(v => v.id === id);
}

export function getVocabByUnit(unitId: number): GameVocab[] {
  const unit = lesson8Units.find(u => u.id === unitId);
  if (!unit) return [];
  return unit.vocabIds.map(id => getVocabById(id)).filter((v): v is GameVocab => v !== undefined);
}

export function getBlocksByUnit(unitId: number): SentenceBlock[] {
  return sentenceBlocks.filter(b => b.unitId <= unitId);
}

export function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
