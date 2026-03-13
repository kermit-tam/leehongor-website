/**
 * 第5課遊戲化數據結構
 * Lesson 5 Gamified Data Structures
 */

// ==================== 詞彙數據（校正版）====================

export interface GameVocab {
  id: string;
  hiragana: string;
  kanji: string;
  meaning: string;
  cantonese: string;
  note?: string;
  emoji?: string;
  category: 'transport' | 'person' | 'place' | 'time' | 'date' | 'phrase';
}

export const lesson5Vocab: GameVocab[] = [
  // Unit 1: 交通與移動
  { id: '5-1-1', hiragana: 'いきます', kanji: '行きます', meaning: '去', cantonese: 'heoi3', category: 'transport', emoji: '🚶' },
  { id: '5-1-2', hiragana: 'きます', kanji: '来ます', meaning: '來', cantonese: 'loi4', category: 'transport', emoji: '🏃' },
  { id: '5-1-3', hiragana: 'かえります', kanji: '帰ります', meaning: '回（家）', cantonese: 'wui4', category: 'transport', emoji: '🏠' },
  { id: '5-1-4', hiragana: 'ちかてつ', kanji: '地下鉄', meaning: '地鐵', cantonese: 'dei6 tit3', category: 'transport', emoji: '🚇' },
  { id: '5-1-5', hiragana: 'しんかんせん', kanji: '新幹線', meaning: '新幹線', cantonese: 'san1 gon3 sin3', category: 'transport', emoji: '🚄' },
  { id: '5-1-6', hiragana: 'バス', kanji: '', meaning: '巴士', cantonese: 'baa1 si2', category: 'transport', emoji: '🚌', note: '外來語' },
  { id: '5-1-7', hiragana: 'タクシー', kanji: '', meaning: '的士', cantonese: 'dik1 si6', category: 'transport', emoji: '🚕', note: '外來語' },
  { id: '5-1-8', hiragana: 'じてんしゃ', kanji: '自転車', meaning: '單車', cantonese: 'daan1 ce1', category: 'transport', emoji: '🚲' },
  { id: '5-1-9', hiragana: 'あるいて', kanji: '歩いて', meaning: '走路', cantonese: 'zaau2 lou6', category: 'transport', emoji: '🚶‍♂️' },
  { id: '5-1-10', hiragana: 'ひこうき', kanji: '飛行機', meaning: '飛機', cantonese: 'fei1 gei1', category: 'transport', emoji: '✈️' },
  { id: '5-1-11', hiragana: 'ふね', kanji: '船', meaning: '船', cantonese: 'syun4', category: 'transport', emoji: '🚢' },
  { id: '5-1-12', hiragana: 'でんしゃ', kanji: '電車', meaning: '電車', cantonese: 'din6 ce1', category: 'transport', emoji: '🚃' },
  
  // Unit 2: 人物與場所
  { id: '5-2-1', hiragana: 'ひと', kanji: '人', meaning: '人', cantonese: 'jan4', category: 'person', emoji: '👤' },
  { id: '5-2-2', hiragana: 'ともだち', kanji: '友達', meaning: '朋友', cantonese: 'pang4 jau5', category: 'person', emoji: '👥' },
  { id: '5-2-3', hiragana: 'かれ', kanji: '彼', meaning: '他/男朋友', cantonese: 'taa1', category: 'person', emoji: '👨' },
  { id: '5-2-4', hiragana: 'かのじょ', kanji: '彼女', meaning: '她/女朋友', cantonese: 'keoi5', category: 'person', emoji: '👩' },
  { id: '5-2-5', hiragana: 'かぞく', kanji: '家族', meaning: '家族/家人', cantonese: 'gaa1 zuk6', category: 'person', emoji: '👨‍👩‍👧‍👦' },
  { id: '5-2-6', hiragana: 'ひとりで', kanji: '一人で', meaning: '獨自', cantonese: 'jat1 jan4', category: 'person', emoji: '🧍' },
  { id: '5-2-7', hiragana: 'がっこう', kanji: '学校', meaning: '學校', cantonese: 'hok6 haau6', category: 'place', emoji: '🏫' },
  { id: '5-2-8', hiragana: 'スーパー', kanji: '', meaning: '超級市場', cantonese: 'ciu1 kap1 si5 coeng4', category: 'place', emoji: '🏪', note: '外來語' },
  { id: '5-2-9', hiragana: 'えき', kanji: '駅', meaning: '車站', cantonese: 'ce1 zaam6', category: 'place', emoji: '🚉' },
  { id: '5-2-10', hiragana: 'だれ', kanji: '誰', meaning: '誰', cantonese: 'seoi4', category: 'person', emoji: '❓' },
  
  // Unit 3: 時間表達
  { id: '5-3-1', hiragana: 'せんしゅう', kanji: '先週', meaning: '上週', cantonese: 'soeng6 zau1', category: 'time', emoji: '📅' },
  { id: '5-3-2', hiragana: 'こんしゅう', kanji: '今週', meaning: '本週', cantonese: 'bun2 zau1', category: 'time', emoji: '📅' },
  { id: '5-3-3', hiragana: 'らいしゅう', kanji: '来週', meaning: '下週', cantonese: 'haa6 zau1', category: 'time', emoji: '📅' },
  { id: '5-3-4', hiragana: 'せんげつ', kanji: '先月', meaning: '上個月', cantonese: 'soeng6 go3 jyut6', category: 'time', emoji: '📆' },
  { id: '5-3-5', hiragana: 'こんげつ', kanji: '今月', meaning: '這個月', cantonese: 'ze5 go3 jyut6', category: 'time', emoji: '📆' },
  { id: '5-3-6', hiragana: 'らいげつ', kanji: '来月', meaning: '下個月', cantonese: 'haa6 go3 jyut6', category: 'time', emoji: '📆' },
  { id: '5-3-7', hiragana: 'きょねん', kanji: '去年', meaning: '去年', cantonese: 'heoi3 nin4', category: 'time', emoji: '📅' },
  { id: '5-3-8', hiragana: 'ことし', kanji: '今年', meaning: '今年', cantonese: 'gam1 nin4', category: 'time', emoji: '📅' },
  { id: '5-3-9', hiragana: 'らいねん', kanji: '来年', meaning: '明年', cantonese: 'ming4 nin4', category: 'time', emoji: '📅' },
  
  // Unit 4: 日期與生活
  { id: '5-4-1', hiragana: 'ついたち', kanji: '1日', meaning: '1號', cantonese: 'jat1 hou6', category: 'date', emoji: '1️⃣' },
  { id: '5-4-2', hiragana: 'ふつか', kanji: '2日', meaning: '2號', cantonese: 'ji6 hou6', category: 'date', emoji: '2️⃣' },
  { id: '5-4-3', hiragana: 'みっか', kanji: '3日', meaning: '3號', cantonese: 'saam1 hou6', category: 'date', emoji: '3️⃣' },
  { id: '5-4-4', hiragana: 'よっか', kanji: '4日', meaning: '4號', cantonese: 'sei3 hou6', category: 'date', emoji: '4️⃣' },
  { id: '5-4-5', hiragana: 'いつか', kanji: '5日', meaning: '5號', cantonese: 'ng5 hou6', category: 'date', emoji: '5️⃣' },
  { id: '5-4-6', hiragana: 'たんじょうび', kanji: '誕生日', meaning: '生日', cantonese: 'saang1 jat6', category: 'date', emoji: '🎂' },
  { id: '5-4-7', hiragana: 'いつ', kanji: '', meaning: '何時/什麼時候', cantonese: 'si4 si4', category: 'time', emoji: '⏰' },
  { id: '5-4-8', hiragana: 'ありがとうございました', kanji: '', meaning: '多謝/非常感謝', cantonese: 'do1 ze6', category: 'phrase', emoji: '🙏' },
];

// ==================== 單元定義 ====================

export interface GameUnit {
  id: number;
  title: string;
  subtitle: string;
  vocabIds: string[];
  estimatedTime: number;
}

export const lesson5Units: GameUnit[] = [
  {
    id: 1,
    title: '交通與移動',
    subtitle: '交通工具與動詞',
    vocabIds: ['5-1-1', '5-1-2', '5-1-3', '5-1-4', '5-1-5', '5-1-6', '5-1-7', '5-1-8', '5-1-9', '5-1-10', '5-1-11', '5-1-12'],
    estimatedTime: 3,
  },
  {
    id: 2,
    title: '人物與場所',
    subtitle: '人物稱呼與地點',
    vocabIds: ['5-2-1', '5-2-2', '5-2-3', '5-2-4', '5-2-5', '5-2-6', '5-2-7', '5-2-8', '5-2-9', '5-2-10'],
    estimatedTime: 3,
  },
  {
    id: 3,
    title: '時間表達',
    subtitle: '週、月、年',
    vocabIds: ['5-3-1', '5-3-2', '5-3-3', '5-3-4', '5-3-5', '5-3-6', '5-3-7', '5-3-8', '5-3-9'],
    estimatedTime: 3,
  },
  {
    id: 4,
    title: '日期與生活',
    subtitle: '日期與日常會話',
    vocabIds: ['5-4-1', '5-4-2', '5-4-3', '5-4-4', '5-4-5', '5-4-6', '5-4-7', '5-4-8'],
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
  correctVocabId?: string; // 用於去重
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
  correctVocabId?: string; // 用於去重
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  sentence: string;
  translation: string;
  isTrue: boolean;
  explanation: string;
}

export interface ClozeQuestion extends BaseQuestion {
  type: 'cloze';
  sentence: string;
  translation: string;
  options: { particle: string; meaning: string }[];
  correctParticle: string;
}

export type GameQuestion = 
  | SpeedMatchQuestion 
  | AudioSelectQuestion 
  | SentencePuzzleQuestion 
  | VisualQuizQuestion 
  | TrueFalseQuestion 
  | ClozeQuestion;

// ==================== 造句語塊 ====================

export interface SentenceBlock {
  id: string;
  text: string;
  type: 'time' | 'person' | 'transport' | 'place' | 'particle' | 'verb' | 'topic';
  meaning: string;
  unitId: number;
}

export const sentenceBlocks: SentenceBlock[] = [
  // Unit 1
  { id: 'sb-1-1', text: 'わたしは', type: 'topic', meaning: '我', unitId: 1 },
  { id: 'sb-1-2', text: 'でんしゃで', type: 'transport', meaning: '坐電車', unitId: 1 },
  { id: 'sb-1-3', text: 'ちかてつで', type: 'transport', meaning: '乘地鐵', unitId: 1 },
  { id: 'sb-1-4', text: 'バスで', type: 'transport', meaning: '坐巴士', unitId: 1 },
  { id: 'sb-1-5', text: 'タクシーで', type: 'transport', meaning: '乘的士', unitId: 1 },
  { id: 'sb-1-6', text: 'あるいて', type: 'transport', meaning: '走路', unitId: 1 },
  { id: 'sb-1-7', text: 'じてんしゃで', type: 'transport', meaning: '踩單車', unitId: 1 },
  { id: 'sb-1-8', text: 'しんかんせんで', type: 'transport', meaning: '坐新幹線', unitId: 1 },
  { id: 'sb-1-9', text: 'ひこうきで', type: 'transport', meaning: '坐飛機', unitId: 1 },
  { id: 'sb-1-10', text: 'ふねで', type: 'transport', meaning: '坐船', unitId: 1 },
  { id: 'sb-1-11', text: 'がっこうへ', type: 'place', meaning: '去學校', unitId: 1 },
  { id: 'sb-1-12', text: 'えきへ', type: 'place', meaning: '去車站', unitId: 1 },
  { id: 'sb-1-13', text: 'いきます', type: 'verb', meaning: '去', unitId: 1 },
  { id: 'sb-1-14', text: 'きます', type: 'verb', meaning: '來', unitId: 1 },
  { id: 'sb-1-15', text: 'かえります', type: 'verb', meaning: '回', unitId: 1 },
  
  // Unit 2
  { id: 'sb-2-1', text: 'ともだちと', type: 'person', meaning: '和朋友', unitId: 2 },
  { id: 'sb-2-2', text: 'かぞくと', type: 'person', meaning: '和家人', unitId: 2 },
  { id: 'sb-2-3', text: 'ひとりで', type: 'person', meaning: '獨自', unitId: 2 },
  { id: 'sb-2-4', text: 'かれと', type: 'person', meaning: '和他', unitId: 2 },
  { id: 'sb-2-5', text: 'かのじょと', type: 'person', meaning: '和她', unitId: 2 },
  
  // Unit 3
  { id: 'sb-3-1', text: 'せんしゅう', type: 'time', meaning: '上週', unitId: 3 },
  { id: 'sb-3-2', text: 'こんしゅう', type: 'time', meaning: '本週', unitId: 3 },
  { id: 'sb-3-3', text: 'らいしゅう', type: 'time', meaning: '下週', unitId: 3 },
  { id: 'sb-3-4', text: 'きょねん', type: 'time', meaning: '去年', unitId: 3 },
  { id: 'sb-3-5', text: 'ことし', type: 'time', meaning: '今年', unitId: 3 },
  { id: 'sb-3-6', text: 'らいねん', type: 'time', meaning: '明年', unitId: 3 },
  { id: 'sb-3-7', text: 'に', type: 'particle', meaning: '在', unitId: 3 },
  
  // Unit 4
  { id: 'sb-4-1', text: 'たんじょうびは', type: 'time', meaning: '生日是', unitId: 4 },
  { id: 'sb-4-2', text: 'いつ', type: 'time', meaning: '什麼時候', unitId: 4 },
  { id: 'sb-4-3', text: 'ですか', type: 'particle', meaning: '嗎', unitId: 4 },
];

// ==================== 預設句子模板 ====================

export interface SentenceTemplate {
  id: string;
  blocks: string[];
  fullText: string;
  meaning: string;
  unitId: number;
}

export const sentenceTemplates: SentenceTemplate[] = [
  {
    id: 'st-1-1',
    blocks: ['sb-1-1', 'sb-1-2', 'sb-1-11', 'sb-1-13'],
    fullText: 'わたしはでんしゃでがっこうへいきます',
    meaning: '我坐電車去學校',
    unitId: 1,
  },
  {
    id: 'st-1-2',
    blocks: ['sb-1-1', 'sb-1-3', 'sb-1-12', 'sb-1-13'],
    fullText: 'わたしはちかてつでえきへいきます',
    meaning: '我乘地鐵去車站',
    unitId: 1,
  },
  {
    id: 'st-2-1',
    blocks: ['sb-1-1', 'sb-2-1', 'sb-1-4', 'sb-1-13'],
    fullText: 'わたしはともだちとバスでいきます',
    meaning: '我和朋友坐巴士去',
    unitId: 2,
  },
  {
    id: 'st-2-2',
    blocks: ['sb-1-1', 'sb-2-3', 'sb-1-6', 'sb-1-13'],
    fullText: 'わたしはひとりであるいていきます',
    meaning: '我獨自走路去',
    unitId: 2,
  },
  {
    id: 'st-3-1',
    blocks: ['sb-3-6', 'sb-1-8', 'sb-1-11', 'sb-1-13'],
    fullText: 'らいねんしんかんせんでがっこうへいきます',
    meaning: '明年坐新幹線去學校',
    unitId: 3,
  },
];

// ==================== 輔助函數 ====================

export function getVocabById(id: string): GameVocab | undefined {
  return lesson5Vocab.find(v => v.id === id);
}

export function getVocabByUnit(unitId: number): GameVocab[] {
  const unit = lesson5Units.find(u => u.id === unitId);
  if (!unit) return [];
  return unit.vocabIds.map(id => getVocabById(id)).filter((v): v is GameVocab => v !== undefined);
}

export function getBlocksByUnit(unitId: number): SentenceBlock[] {
  return sentenceBlocks.filter(b => b.unitId <= unitId);
}

export function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
