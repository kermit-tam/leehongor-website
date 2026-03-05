/**
 * 第5課題目生成器
 * Question Generator for Lesson 5
 */

import {
  GameQuestion,
  QuestionType,
  GameVocab,
  GameUnit,
  lesson5Vocab,
  lesson5Units,
  shuffle,
  getVocabByUnit,
} from './game-data';

// ==================== 題型權重配置 ====================

const QUESTION_WEIGHTS: { type: QuestionType; weight: number; minPerQuiz: number }[] = [
  { type: 'audio-select', weight: 25, minPerQuiz: 2 },
  { type: 'speed-match', weight: 20, minPerQuiz: 1 },
  { type: 'visual-quiz', weight: 20, minPerQuiz: 1 },
  { type: 'cloze', weight: 15, minPerQuiz: 1 },
  { type: 'sentence-puzzle', weight: 10, minPerQuiz: 0 },
  { type: 'true-false', weight: 10, minPerQuiz: 1 },
];

// ==================== 題目生成器 ====================

// 全局變量存儲當前課程數據（用於第6-10課）
let currentLessonVocab = lesson5Vocab;
let currentGetVocabByUnit = getVocabByUnit;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setLessonData(vocab: any[], getVocabFn: (unitId: number) => any[]) {
  currentLessonVocab = vocab;
  currentGetVocabByUnit = getVocabFn;
}

export function generateQuestionsForUnit(unitId: number, count: number = 10): GameQuestion[] {
  const vocab = currentGetVocabByUnit(unitId);
  const allVocab = currentLessonVocab;
  const questions: GameQuestion[] = [];
  const usedTypes: QuestionType[] = [];

  // 確保每種題型最少數量
  QUESTION_WEIGHTS.forEach(({ type, minPerQuiz }) => {
    for (let i = 0; i < minPerQuiz; i++) {
      const question = generateQuestionByType(type, vocab, allVocab, unitId, questions.length);
      if (question) {
        questions.push(question);
        usedTypes.push(type);
      }
    }
  });

  // 填充剩餘題目，確保不連續同類型
  while (questions.length < count) {
    const availableTypes = QUESTION_WEIGHTS.filter(({ type }) => {
      // 檢查上一題是否同類型
      const lastType = usedTypes[usedTypes.length - 1];
      return type !== lastType;
    });

    if (availableTypes.length === 0) break;

    // 按權重隨機選擇
    const totalWeight = availableTypes.reduce((sum, { weight }) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    let selectedType = availableTypes[0].type;
    for (const { type, weight } of availableTypes) {
      random -= weight;
      if (random <= 0) {
        selectedType = type;
        break;
      }
    }

    const question = generateQuestionByType(selectedType, vocab, allVocab, unitId, questions.length);
    if (question) {
      questions.push(question);
      usedTypes.push(selectedType);
    }
  }

  return questions;
}

function generateQuestionByType(
  type: QuestionType,
  unitVocab: GameVocab[],
  allVocab: GameVocab[],
  unitId: number,
  index: number
): GameQuestion | null {
  switch (type) {
    case 'speed-match':
      return generateSpeedMatch(unitVocab, unitId, index);
    case 'audio-select':
      return generateAudioSelect(unitVocab, allVocab, unitId, index);
    case 'sentence-puzzle':
      return generateSentencePuzzle(unitVocab, unitId, index);
    case 'visual-quiz':
      return generateVisualQuiz(unitVocab, allVocab, unitId, index);
    case 'true-false':
      return generateTrueFalse(unitVocab, unitId, index);
    case 'cloze':
      return generateCloze(unitVocab, unitId, index);
    default:
      return null;
  }
}

// ==================== 各題型生成器 ====================

function generateSpeedMatch(vocab: GameVocab[], unitId: number, index: number): GameQuestion {
  // 隨機選4-6對詞彙
  const pairCount = Math.min(6, Math.max(4, Math.floor(vocab.length / 2)));
  const selectedVocab = shuffle(vocab).slice(0, pairCount);
  
  return {
    id: `q-${unitId}-sm-${index}`,
    type: 'speed-match',
    unitId,
    pairs: selectedVocab.map(v => ({
      hiragana: v.hiragana,
      meaning: v.meaning,
      cantonese: v.cantonese,
    })),
    timeLimit: 15, // 增加到15秒
  };
}

function generateAudioSelect(
  unitVocab: GameVocab[],
  allVocab: GameVocab[],
  unitId: number,
  index: number
): GameQuestion {
  // 選一個正確答案
  const correct = unitVocab[Math.floor(Math.random() * unitVocab.length)];
  
  // 選3個錯誤選項（從其他詞彙）
  const wrongOptions = shuffle(allVocab.filter(v => v.id !== correct.id))
    .slice(0, 3)
    .map(v => v.meaning);
  
  const options = shuffle([correct.meaning, ...wrongOptions]);
  
  return {
    id: `q-${unitId}-as-${index}`,
    type: 'audio-select',
    unitId,
    audioText: correct.hiragana,
    correctAnswer: correct.meaning,
    options,
  };
}

// ==================== 課程識別 ====================
// 從詞彙ID識別當前課程
function detectLessonFromVocab(vocab: GameVocab[]): number {
  if (vocab.length === 0) return 5;
  const firstId = vocab[0]?.id || '';
  if (firstId.startsWith('1-')) return 1;
  if (firstId.startsWith('2-')) return 2;
  if (firstId.startsWith('3-')) return 3;
  if (firstId.startsWith('4-')) return 4;
  return 5;
}

function generateSentencePuzzle(vocab: GameVocab[], unitId: number, index: number): GameQuestion {
  const lessonNum = detectLessonFromVocab(vocab);
  
  // 第1-4課的句子模板（不含未教的助詞）
  const lessonTemplates: Record<number, Record<number, Array<{ translation: string; blocks: string[]; correctOrder: number[] }>>> = {
    // 第1課：初次見面 - 簡單的自我介紹
    1: {
      1: [
        { translation: '我是學生', blocks: ['わたしは', 'がくせい', 'です'], correctOrder: [0, 1, 2] },
        { translation: '你是老師嗎？', blocks: ['あなたは', 'せんせい', 'ですか'], correctOrder: [0, 1, 2] },
      ],
      2: [
        { translation: '我是公司職員', blocks: ['わたしは', 'かいしゃいん', 'です'], correctOrder: [0, 1, 2] },
        { translation: '您是醫生嗎？', blocks: ['どなたは', 'いしゃ', 'ですか'], correctOrder: [0, 1, 2] },
      ],
      3: [
        { translation: '初次見面', blocks: ['はじめまして'], correctOrder: [0] },
        { translation: '請多關照', blocks: ['よろしく', 'おねがいします'], correctOrder: [0, 1] },
      ],
      4: [
        { translation: '我是日本人', blocks: ['わたしは', 'にほんじん', 'です'], correctOrder: [0, 1, 2] },
        { translation: '從中國來', blocks: ['ちゅうごく', 'から', 'きました'], correctOrder: [0, 1, 2] },
      ],
    },
    // 第2課：這是什麼 - 指示代名詞
    2: {
      1: [
        { translation: '這是書', blocks: ['これは', 'ほん', 'です'], correctOrder: [0, 1, 2] },
        { translation: '那是什麼？', blocks: ['それは', 'なん', 'ですか'], correctOrder: [0, 1, 2] },
      ],
      2: [
        { translation: '這是字典', blocks: ['これは', 'じしょ', 'です'], correctOrder: [0, 1, 2] },
        { translation: '那是雜誌嗎？', blocks: ['それは', 'ざっし', 'ですか'], correctOrder: [0, 1, 2] },
      ],
      3: [
        { translation: '這是傘', blocks: ['これは', 'かさ', 'です'], correctOrder: [0, 1, 2] },
        { translation: '那是電視', blocks: ['それは', 'テレビ', 'です'], correctOrder: [0, 1, 2] },
      ],
      4: [
        { translation: '這是巧克力', blocks: ['これは', 'チョコレート', 'です'], correctOrder: [0, 1, 2] },
        { translation: '那是咖啡嗎？', blocks: ['それは', 'コーヒー', 'ですか'], correctOrder: [0, 1, 2] },
      ],
      5: [
        { translation: '這是日語', blocks: ['これは', 'にほんご', 'です'], correctOrder: [0, 1, 2] },
        { translation: '謝謝', blocks: ['ありがとう', 'ございます'], correctOrder: [0, 1] },
      ],
    },
    // 第3課：這裡是哪裡 - 場所指示
    3: {
      1: [
        { translation: '這裡是教室', blocks: ['ここは', 'きょうしつ', 'です'], correctOrder: [0, 1, 2] },
        { translation: '那裡是哪裡？', blocks: ['そこは', 'どこ', 'ですか'], correctOrder: [0, 1, 2] },
      ],
      2: [
        { translation: '這裡是食堂', blocks: ['ここは', 'しょくどう', 'です'], correctOrder: [0, 1, 2] },
        { translation: '那裡是廁所嗎？', blocks: ['そこは', 'トイレ', 'ですか'], correctOrder: [0, 1, 2] },
      ],
      3: [
        { translation: '這裡是公司', blocks: ['ここは', 'かいしゃ', 'です'], correctOrder: [0, 1, 2] },
        { translation: '那裡是家', blocks: ['そこは', 'うち', 'です'], correctOrder: [0, 1, 2] },
      ],
      4: [
        { translation: '這是鞋', blocks: ['これは', 'くつ', 'です'], correctOrder: [0, 1, 2] },
        { translation: '請給我看', blocks: ['みせて', 'ください'], correctOrder: [0, 1] },
      ],
      5: [
        { translation: '這是3樓', blocks: ['ここは', 'さんがい', 'です'], correctOrder: [0, 1, 2] },
        { translation: '多少錢？', blocks: ['いくら', 'ですか'], correctOrder: [0, 1] },
      ],
      6: [
        { translation: '對不起', blocks: ['すみません'], correctOrder: [0] },
        { translation: '請給我這個', blocks: ['これを', 'ください'], correctOrder: [0, 1] },
      ],
      7: [
        { translation: '這裡是東京', blocks: ['ここは', 'とうきょう', 'です'], correctOrder: [0, 1, 2] },
        { translation: '那裡是巴黎', blocks: ['そこは', 'パリ', 'です'], correctOrder: [0, 1, 2] },
      ],
    },
    // 第4課：現在幾點 - 時間表達
    4: {
      1: [
        { translation: '我六點起床', blocks: ['わたしは', 'ろくじに', 'おきます'], correctOrder: [0, 1, 2] },
        { translation: '十點睡覺', blocks: ['じゅうじに', 'ねます'], correctOrder: [0, 1] },
      ],
      2: [
        { translation: '這裡是銀行', blocks: ['ここは', 'ぎんこう', 'です'], correctOrder: [0, 1, 2] },
        { translation: '那裡是郵局嗎？', blocks: ['そこは', 'ゆうびんきょく', 'ですか'], correctOrder: [0, 1, 2] },
      ],
      3: [
        { translation: '現在幾點？', blocks: ['いま', 'なんじ', 'ですか'], correctOrder: [0, 1, 2] },
        { translation: '現在是三點', blocks: ['いまは', 'さんじ', 'です'], correctOrder: [0, 1, 2] },
      ],
      4: [
        { translation: '早上工作', blocks: ['あさ', 'はたらきます'], correctOrder: [0, 1] },
        { translation: '晚上休息', blocks: ['ばん', 'やすみます'], correctOrder: [0, 1] },
      ],
      5: [
        { translation: '昨天學習', blocks: ['きのう', 'べんきょうしました'], correctOrder: [0, 1] },
        { translation: '明天工作', blocks: ['あした', 'はたらきます'], correctOrder: [0, 1] },
      ],
      6: [
        { translation: '這裡是圖書館', blocks: ['ここは', 'としょかん', 'です'], correctOrder: [0, 1, 2] },
        { translation: '今天有考試', blocks: ['きょうは', 'しけん', 'です'], correctOrder: [0, 1, 2] },
      ],
      7: [
        { translation: '每天早上起床', blocks: ['まいあさ', 'おきます'], correctOrder: [0, 1] },
        { translation: '每天晚上學習', blocks: ['まいばん', 'べんきょうします'], correctOrder: [0, 1] },
      ],
      8: [
        { translation: '星期一是幾號？', blocks: ['げつようびは', 'なんにち', 'ですか'], correctOrder: [0, 1, 2] },
        { translation: '星期天休息', blocks: ['にちようびは', 'やすみ', 'です'], correctOrder: [0, 1, 2] },
      ],
      9: [
        { translation: '從九點到五點', blocks: ['くじから', 'ごじまで', 'です'], correctOrder: [0, 1, 2] },
        { translation: '和朋友一起', blocks: ['ともだちと', 'いっしょ'], correctOrder: [0, 1] },
      ],
      10: [
        { translation: '這裡是幾號？', blocks: ['ここは', 'なんばん', 'ですか'], correctOrder: [0, 1, 2] },
        { translation: '很辛苦呢', blocks: ['たいへん', 'ですね'], correctOrder: [0, 1] },
      ],
      11: [
        { translation: '這裡是紐約', blocks: ['ここは', 'ニューヨーク', 'です'], correctOrder: [0, 1, 2] },
        { translation: '那裡是北京', blocks: ['そこは', 'ペキン', 'です'], correctOrder: [0, 1, 2] },
      ],
    },
    // 第5課：交通與移動 - 使用交通助詞
    5: {
      1: [
        { translation: '我坐電車去學校', blocks: ['わたしは', 'でんしゃで', 'がっこうへ', 'いきます'], correctOrder: [0, 1, 2, 3] },
        { translation: '我乘地鐵回', blocks: ['わたしは', 'ちかてつで', 'かえります'], correctOrder: [0, 1, 2] },
        { translation: '坐巴士來', blocks: ['バスで', 'きます'], correctOrder: [0, 1] },
      ],
      2: [
        { translation: '和朋友坐地鐵去', blocks: ['ともだちと', 'ちかてつで', 'いきます'], correctOrder: [0, 1, 2] },
        { translation: '我獨自去車站', blocks: ['わたしは', 'ひとりで', 'えきへ', 'いきます'], correctOrder: [0, 1, 2, 3] },
      ],
      3: [
        { translation: '上週去', blocks: ['せんしゅう', 'いきました'], correctOrder: [0, 1] },
        { translation: '明年坐新幹線來', blocks: ['らいねん', 'しんかんせんで', 'きます'], correctOrder: [0, 1, 2] },
      ],
      4: [
        { translation: '生日是什麼時候', blocks: ['たんじょうびは', 'いつ', 'ですか'], correctOrder: [0, 1, 2] },
      ],
    },
  };
  
  // 選擇對應課程的模板
  const templates = lessonTemplates[lessonNum] || lessonTemplates[5];
  const unitTemplates = templates[unitId] || templates[1] || [{ 
    translation: '我是學生', 
    blocks: ['わたしは', 'がくせい', 'です'], 
    correctOrder: [0, 1, 2] 
  }];
  const template = unitTemplates[Math.floor(Math.random() * unitTemplates.length)];
  
  // 打亂語塊順序
  const shuffledIndices = shuffle(template.correctOrder.map((_, i) => i));
  const shuffledBlocks = shuffledIndices.map(i => ({
    text: template.blocks[i],
    type: getBlockType(template.blocks[i]) as 'particle' | 'noun' | 'verb' | 'time' | 'place',
  }));
  
  // 計算正確順序對應到打亂後的索引
  const correctOrder = template.correctOrder.map(correctIdx => 
    shuffledIndices.findIndex(shuffledIdx => shuffledIdx === correctIdx)
  );
  
  return {
    id: `q-${unitId}-sp-${index}`,
    type: 'sentence-puzzle',
    unitId,
    translation: template.translation,
    blocks: shuffledBlocks,
    correctOrder,
  };
}

function getBlockType(text: string): string {
  if (text.includes('は') || text.includes('で') || text.includes('へ') || text.includes('と') || text.includes('です')) {
    return 'particle';
  }
  if (text.includes('ます') || text.includes('きます') || text.includes('いきます') || text.includes('かえります')) {
    return 'verb';
  }
  if (text.includes('しゅう') || text.includes('ねん') || text.includes('たんじょうび') || text.includes('いつ')) {
    return 'time';
  }
  if (text.includes('がっこう') || text.includes('えき')) {
    return 'place';
  }
  return 'noun';
}

function generateVisualQuiz(
  unitVocab: GameVocab[],
  allVocab: GameVocab[],
  unitId: number,
  index: number
): GameQuestion {
  // 選擇有emoji的詞彙
  const emojiVocab = unitVocab.filter(v => v.emoji);
  const correct = emojiVocab[Math.floor(Math.random() * emojiVocab.length)];
  
  if (!correct) {
    // 如果沒有emoji詞彙，使用audio-select代替
    return generateAudioSelect(unitVocab, allVocab, unitId, index);
  }
  
  // 選3個錯誤選項
  const wrongOptions = shuffle(allVocab.filter(v => v.id !== correct.id))
    .slice(0, 3)
    .map(v => v.hiragana);
  
  const options = shuffle([correct.hiragana, ...wrongOptions]);
  
  return {
    id: `q-${unitId}-vq-${index}`,
    type: 'visual-quiz',
    unitId,
    emoji: correct.emoji!,
    correctAnswer: correct.hiragana,
    options,
  };
}

function generateTrueFalse(vocab: GameVocab[], unitId: number, index: number): GameQuestion {
  const lessonNum = detectLessonFromVocab(vocab);
  
  // 第1-4課的真假判斷題模板（不含未教的助詞）
  const lessonTrueTemplates: Record<number, Record<number, Array<{ sentence: string; translation: string }>>> = {
    // 第1課
    1: {
      1: [
        { sentence: 'わたしはがくせいです。', translation: '我是學生。' },
        { sentence: 'あなたはせんせいですか。', translation: '您是老師嗎？' },
      ],
      2: [
        { sentence: 'かれはかいしゃいんです。', translation: '他是公司職員。' },
        { sentence: 'あのかたはいしゃです。', translation: '那位是醫生。' },
      ],
      3: [
        { sentence: 'はじめまして。', translation: '初次見面。' },
        { sentence: 'よろしくおねがいします。', translation: '請多關照。' },
      ],
      4: [
        { sentence: 'わたしはにほんじんです。', translation: '我是日本人。' },
        { sentence: 'スミスさんはアメリカじんです。', translation: '史密斯先生是美國人。' },
      ],
    },
    // 第2課
    2: {
      1: [
        { sentence: 'これはほんです。', translation: '這是書。' },
        { sentence: 'それはじしょですか。', translation: '那是字典嗎？' },
      ],
      2: [
        { sentence: 'これはざっしです。', translation: '這是雜誌。' },
        { sentence: 'それはしんぶんです。', translation: '那是報紙。' },
      ],
      3: [
        { sentence: 'これはかぎです。', translation: '這是鑰匙。' },
        { sentence: 'それはテレビです。', translation: '那是電視。' },
      ],
      4: [
        { sentence: 'これはコーヒーです。', translation: '這是咖啡。' },
        { sentence: 'それはチョコレートです。', translation: '那是巧克力。' },
      ],
      5: [
        { sentence: 'これはにほんごです。', translation: '這是日語。' },
        { sentence: 'ありがとうございます。', translation: '謝謝。' },
      ],
    },
    // 第3課
    3: {
      1: [
        { sentence: 'ここはきょうしつです。', translation: '這裡是教室。' },
        { sentence: 'そこはどこですか。', translation: '那裡是哪裡？' },
      ],
      2: [
        { sentence: 'ここはしょくどうです。', translation: '這裡是食堂。' },
        { sentence: 'そこはトイレです。', translation: '那裡是廁所。' },
      ],
      3: [
        { sentence: 'ここはかいしゃです。', translation: '這裡是公司。' },
        { sentence: 'うちはどこですか。', translation: '家在哪裡？' },
      ],
      4: [
        { sentence: 'これはくつです。', translation: '這是鞋。' },
        { sentence: 'すみません。', translation: '對不起。' },
      ],
      5: [
        { sentence: 'ここはいっかいです。', translation: '這裡是1樓。' },
        { sentence: 'それはいくらですか。', translation: '那個多少錢？' },
      ],
      6: [
        { sentence: 'いらっしゃいませ。', translation: '歡迎光臨。' },
        { sentence: 'これをください。', translation: '請給我這個。' },
      ],
      7: [
        { sentence: 'ここはとうきょうです。', translation: '這裡是東京。' },
        { sentence: 'そこはロンドンです。', translation: '那裡是倫敦。' },
      ],
    },
    // 第4課
    4: {
      1: [
        { sentence: 'わたしはろくじにおきます。', translation: '我六點起床。' },
        { sentence: 'じゅうじにねます。', translation: '十點睡覺。' },
      ],
      2: [
        { sentence: 'ここはぎんこうです。', translation: '這裡是銀行。' },
        { sentence: 'そこはゆうびんきょくです。', translation: '那裡是郵局。' },
      ],
      3: [
        { sentence: 'いまはさんじです。', translation: '現在是三點。' },
        { sentence: 'ごぜんはちじです。', translation: '上午是八點。' },
      ],
      4: [
        { sentence: 'あさはたらきます。', translation: '早上工作。' },
        { sentence: 'よるはやすみます。', translation: '晚上休息。' },
      ],
      5: [
        { sentence: 'きのうはべんきょうしました。', translation: '昨天學習了。' },
        { sentence: 'あしたははたらきます。', translation: '明天工作。' },
      ],
      6: [
        { sentence: 'ここはとしょかんです。', translation: '這裡是圖書館。' },
        { sentence: 'きょうはしけんです。', translation: '今天是考試。' },
      ],
      7: [
        { sentence: 'まいあさおきます。', translation: '每天早上起床。' },
        { sentence: 'まいにちべんきょうします。', translation: '每天學習。' },
      ],
      8: [
        { sentence: 'げつようびははたらきます。', translation: '星期一工作。' },
        { sentence: 'にちようびはやすみです。', translation: '星期天休息。' },
      ],
      9: [
        { sentence: 'くじからはたらきます。', translation: '從九點開始工作。' },
        { sentence: 'ごじまでです。', translation: '到五點為止。' },
      ],
      10: [
        { sentence: 'そちらはなんばんですか。', translation: '那邊是幾號？' },
        { sentence: 'たいへんですね。', translation: '很辛苦呢。' },
      ],
      11: [
        { sentence: 'ここはニューヨークです。', translation: '這裡是紐約。' },
        { sentence: 'ペキンはちゅうごくです。', translation: '北京是中國。' },
      ],
    },
    // 第5課
    5: {
      1: [
        { sentence: 'ちかてつでがっこうへいきます。', translation: '乘地鐵去學校。' },
        { sentence: 'タクシーでかえります。', translation: '乘的士回去。' },
      ],
      2: [
        { sentence: 'ともだちとスーパーへいきます。', translation: '和朋友去超市。' },
        { sentence: 'ひとりでがっこうへいきます。', translation: '獨自去學校。' },
      ],
      3: [
        { sentence: 'らいしゅうにほんへいきます。', translation: '下週去日本。' },
        { sentence: 'きょねんとうきょうへいきました。', translation: '去年去了東京。' },
      ],
      4: [
        { sentence: 'たんじょうびは5がつです。', translation: '生日在五月。' },
      ],
    },
  };
  
  const lessonFalseTemplates: Record<number, Record<number, Array<{ sentence: string; translation: string; explanation: string }>>> = {
    // 第1課
    1: {
      1: [
        { sentence: 'わたしがくせいです。', translation: '我學生。', explanation: '缺少助詞「は」，應該是「わたしはがくせいです」' },
        { sentence: 'あなたがくせい。', translation: '你學生。', explanation: '缺少助詞「は」和「です」，應該是「あなたはがくせいです」' },
      ],
      2: [
        { sentence: 'かれかいしゃいん。', translation: '他公司職員。', explanation: '缺少助詞「は」和「です」，應該是「かれはかいしゃいんです」' },
        { sentence: 'いしゃですかれ。', translation: '醫生是他。', explanation: '詞序錯誤，應該是「かれはいしゃです」' },
      ],
      3: [
        { sentence: 'はじめましてです。', translation: '初次見面是。', explanation: '「はじめまして」後面不需要「です」' },
        { sentence: 'よろしくです。', translation: '請多關照是。', explanation: '「よろしくおねがいします」是完整說法，不能說「よろしくです」' },
      ],
      4: [
        { sentence: 'わたしにほんじん。', translation: '我日本人。', explanation: '缺少助詞「は」和「です」，應該是「わたしはにほんじんです」' },
        { sentence: 'アメリカじんからきましたです。', translation: '從美國來了是。', explanation: '「です」多餘，應該是「アメリカじんからきました」' },
      ],
    },
    // 第2課
    2: {
      1: [
        { sentence: 'これほんです。', translation: '這書是。', explanation: '缺少助詞「は」，應該是「これはほんです」' },
        { sentence: 'それなんです。', translation: '那什麼是。', explanation: '缺少助詞「は」，應該是「それはなんですか」' },
      ],
      2: [
        { sentence: 'ざっしですこれ。', translation: '雜誌是這。', explanation: '詞序錯誤，應該是「これはざっしです」' },
        { sentence: 'しんぶんか。', translation: '報紙嗎？', explanation: '缺少主語和助詞，應該是「それはしんぶんですか」' },
      ],
      3: [
        { sentence: 'かぎこれです。', translation: '鑰匙這是。', explanation: '詞序錯誤，應該是「これはかぎです」' },
        { sentence: 'テレビですそれ。', translation: '電視是那。', explanation: '詞序錯誤，應該是「それはテレビです」' },
      ],
      4: [
        { sentence: 'コーヒーですかこれ。', translation: '咖啡嗎這。', explanation: '詞序錯誤，應該是「これはコーヒーですか」' },
        { sentence: 'チョコレートこれ。', translation: '巧克力這。', explanation: '缺少助詞和「です」，應該是「これはチョコレートです」' },
      ],
      5: [
        { sentence: 'にほんごですそれは。', translation: '日語是那是。', explanation: '雖然文法正確但詞序不自然，通常說「それはにほんごです」' },
        { sentence: 'ありがとうです。', translation: '謝謝是。', explanation: '「ありがとう」後面不需要「です」，要說「ありがとうございます」' },
      ],
    },
    // 第3課
    3: {
      1: [
        { sentence: 'ここきょうしつです。', translation: '這裡教室是。', explanation: '缺少助詞「は」，應該是「ここはきょうしつです」' },
        { sentence: 'そこどこです。', translation: '那裡哪裡是。', explanation: '缺少助詞「は」和「か」，應該是「そこはどこですか」' },
      ],
      2: [
        { sentence: 'しょくどうですここ。', translation: '食堂是這裡。', explanation: '詞序錯誤，應該是「ここはしょくどうです」' },
        { sentence: 'トイレそこですか。', translation: '廁所那裡是嗎？', explanation: '缺少助詞「は」，應該是「そこはトイレですか」' },
      ],
      3: [
        { sentence: 'かいしゃここ。', translation: '公司這裡。', explanation: '缺少助詞「は」和「です」，應該是「ここはかいしゃです」' },
        { sentence: 'うちどこです。', translation: '家哪裡是。', explanation: '缺少助詞「は」和「か」，應該是「うちはどこですか」' },
      ],
      4: [
        { sentence: 'くつですこれ。', translation: '鞋是這。', explanation: '詞序錯誤，應該是「これはくつです」' },
        { sentence: 'くださいこれを。', translation: '請給我這個。', explanation: '詞序不自然，通常說「これをください」' },
      ],
      5: [
        { sentence: 'いっかいですここは。', translation: '1樓是這裡是。', explanation: '雖然文法正確但詞序不自然，通常說「ここはいっかいです」' },
        { sentence: 'いくらですこれ。', translation: '多少錢是這。', explanation: '詞序錯誤，應該是「これはいくらですか」' },
      ],
      6: [
        { sentence: 'いらっしゃいませです。', translation: '歡迎光臨是。', explanation: '「いらっしゃいませ」後面不需要「です」' },
        { sentence: 'くださいこれ。', translation: '請給我這。', explanation: '缺少助詞「を」，應該是「これをください」' },
      ],
      7: [
        { sentence: 'とうきょうですここ。', translation: '東京是這裡。', explanation: '詞序錯誤，應該是「ここはとうきょうです」' },
        { sentence: 'ロンドンそこ。', translation: '倫敦那裡。', explanation: '缺少助詞「は」和「です」，應該是「そこはロンドンです」' },
      ],
    },
    // 第4課
    4: {
      1: [
        { sentence: 'わたしろくじおきます。', translation: '我六點起床。', explanation: '缺少助詞「は」和「に」，應該是「わたしはろくじにおきます」' },
        { sentence: 'じゅうじねます。', translation: '十點睡覺。', explanation: '缺少助詞「に」，應該是「じゅうじにねます」' },
      ],
      2: [
        { sentence: 'ぎんこうですここ。', translation: '銀行是這裡。', explanation: '詞序錯誤，應該是「ここはぎんこうです」' },
        { sentence: 'ゆうびんきょくそこですか。', translation: '郵局那裡是嗎？', explanation: '缺少助詞「は」，應該是「そこはゆうびんきょくですか」' },
      ],
      3: [
        { sentence: 'いまさんじです。', translation: '現在三點是。', explanation: '缺少助詞「は」，應該是「いまはさんじです」' },
        { sentence: 'なんじですいま。', translation: '幾點是現在。', explanation: '詞序錯誤，應該是「いまはなんじですか」' },
      ],
      4: [
        { sentence: 'あさはたらきます', translation: '早上工作', explanation: '缺少句號「。」，日文句子需要句號' },
        { sentence: 'よるやすみます。', translation: '晚上休息。', explanation: '缺少助詞「は」，應該是「よるはやすみます」' },
      ],
      5: [
        { sentence: 'きのうべんきょうします。', translation: '昨天學習。', explanation: '「きのう」是過去，應該用「べんきょうしました」' },
        { sentence: 'あしたはたらきました。', translation: '明天工作了。', explanation: '「あした」是未來，應該用「はたらきます」' },
      ],
      6: [
        { sentence: 'としょかんですここは。', translation: '圖書館是這裡是。', explanation: '雖然文法正確但詞序不自然，通常說「ここはとしょかんです」' },
        { sentence: 'きょうしけんです。', translation: '今天考試是。', explanation: '缺少助詞「は」，應該是「きょうはしけんです」' },
      ],
      7: [
        { sentence: 'まいあさはおきます。', translation: '每天早上是起床。', explanation: '「まいあさ」後面不需要「は」，應該是「まいあさおきます」' },
        { sentence: 'まいにちはべんきょうします。', translation: '每天是學習。', explanation: '「まいにち」後面不需要「は」，應該是「まいにちべんきょうします」' },
      ],
      8: [
        { sentence: 'げつようびはたらきます。', translation: '星期一工作。', explanation: '雖然文法正確，但說「はたらきます」時通常需要主語「わたしは」' },
        { sentence: 'にちようびやすみです。', translation: '星期天休息是。', explanation: '缺少助詞「は」，應該是「にちようびはやすみです」' },
      ],
      9: [
        { sentence: 'くじからです。', translation: '從九點是。', explanation: '缺少主要動作，應該是「くじからはたらきます」' },
        { sentence: 'ごじまではたらきます。', translation: '到五點為止工作。', explanation: '雖然文法正確，但通常需要說「くじからごじまではたらきます」' },
      ],
      10: [
        { sentence: 'なんばんですそちら。', translation: '幾號是那邊。', explanation: '詞序錯誤，應該是「そちらはなんばんですか」' },
        { sentence: 'たいへんです。', translation: '很辛苦是。', explanation: '雖然文法正確，但通常說「たいへんですね」' },
      ],
      11: [
        { sentence: 'ニューヨークですここ。', translation: '紐約是這裡。', explanation: '詞序錯誤，應該是「ここはニューヨークです」' },
        { sentence: 'ペキンちゅうごくです。', translation: '北京中國是。', explanation: '缺少助詞「は」，應該是「ペキンはちゅうごくです」' },
      ],
    },
    // 第5課
    5: {
      1: [
        { sentence: 'ちかてつへいきます。', translation: '去地鐵。', explanation: '「へ」用於目的地，但「で」表示交通方式，應該是「ちかてつでいきます」' },
        { sentence: 'あるいてバスでいきます。', translation: '走路坐巴士去。', explanation: '「あるいて」和「バスで」矛盾，走路就不需要坐巴士' },
      ],
      2: [
        { sentence: 'だれとがっこうですか。', translation: '和誰是學校。', explanation: '句子不完整，應該是「だれとがっこうへいきますか」' },
        { sentence: 'かれはともだちです。', translation: '他是朋友。', explanation: '這句文法正確，但我們要找錯誤的，所以這個其實是true的' },
      ],
      3: [
        { sentence: 'きょねんらいねんです。', translation: '去年是明年。', explanation: '「きょねん」和「らいねん」是相反的意思' },
        { sentence: 'こんしゅうはせんしゅうです。', translation: '本週是上週。', explanation: '「こんしゅう」和「せんしゅう」是相反的時間' },
      ],
      4: [
        { sentence: 'たんじょうびはいつです。', translation: '生日什麼時候。', explanation: '缺少助詞「か」，應該是「たんじょうびはいつですか」' },
      ],
    },
  };
  
  const trueTemplates = lessonTrueTemplates[lessonNum] || lessonTrueTemplates[5];
  const falseTemplates = lessonFalseTemplates[lessonNum] || lessonFalseTemplates[5];

  const isTrue = Math.random() > 0.5;
  const templates = isTrue ? trueTemplates[unitId] : falseTemplates[unitId];
  
  if (!templates || templates.length === 0) {
    // 使用默認模板
    return {
      id: `q-${unitId}-tf-${index}`,
      type: 'true-false',
      unitId,
      sentence: 'わたしはにほんじんです。',
      translation: '我是日本人。',
      isTrue: true,
      explanation: '這是一句文法正確的句子。',
    };
  }

  const template = templates[Math.floor(Math.random() * templates.length)];
  interface TemplateWithExplanation {
    sentence: string;
    translation: string;
    explanation?: string;
  }
  const explanation = (template as TemplateWithExplanation).explanation || '這是一句正確的日文句子！';
  
  return {
    id: `q-${unitId}-tf-${index}`,
    type: 'true-false',
    unitId,
    sentence: template.sentence,
    translation: template.translation,
    isTrue,
    explanation,
  };
}

function generateCloze(vocab: GameVocab[], unitId: number, index: number): GameQuestion {
  const lessonNum = detectLessonFromVocab(vocab);
  
  // 第1-4課的助詞填空題（只包含已教的助詞）
  const lessonClozeTemplates: Record<number, Record<number, Array<{ sentence: string; translation: string; correct: string; options: string[] }>>> = {
    // 第1課：只有「は」助詞
    1: {
      1: [
        { sentence: 'わたし＿＿がくせいです。', translation: '我是學生。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'あなた＿＿せんせいですか。', translation: '您是老師嗎？', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
      2: [
        { sentence: 'かれ＿＿かいしゃいんです。', translation: '他是公司職員。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'あのかた＿＿いしゃです。', translation: '那位是醫生。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
      3: [
        { sentence: 'わたし＿＿スミスです。', translation: '我是史密斯。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'これ＿＿めいしです。', translation: '這是名片。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
      4: [
        { sentence: 'わたし＿＿にほんじんです。', translation: '我是日本人。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'スミスさん＿＿アメリカじんです。', translation: '史密斯先生是美國人。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
    },
    // 第2課：只有「は」助詞
    2: {
      1: [
        { sentence: 'これ＿＿ほんです。', translation: '這是書。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'それ＿＿なんですか。', translation: '那是什麼？', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
      2: [
        { sentence: 'これ＿＿じしょです。', translation: '這是字典。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'それ＿＿ざっしですか。', translation: '那是雜誌嗎？', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
      3: [
        { sentence: 'これ＿＿かぎです。', translation: '這是鑰匙。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'それ＿＿テレビです。', translation: '那是電視。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
      4: [
        { sentence: 'これ＿＿チョコレートです。', translation: '這是巧克力。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'それ＿＿コーヒーですか。', translation: '那是咖啡嗎？', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
      5: [
        { sentence: 'これ＿＿にほんごです。', translation: '這是日語。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'それ＿＿えいごですか。', translation: '那是英語嗎？', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
    },
    // 第3課：只有「は」助詞
    3: {
      1: [
        { sentence: 'ここ＿＿きょうしつです。', translation: '這裡是教室。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'そこ＿＿どこですか。', translation: '那裡是哪裡？', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
      2: [
        { sentence: 'ここ＿＿しょくどうです。', translation: '這裡是食堂。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'そこ＿＿トイレですか。', translation: '那裡是廁所嗎？', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
      3: [
        { sentence: 'ここ＿＿かいしゃです。', translation: '這裡是公司。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'うち＿＿どこですか。', translation: '家在哪裡？', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
      4: [
        { sentence: 'これ＿＿くつです。', translation: '這是鞋。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'それ＿＿ワインですか。', translation: '那是葡萄酒嗎？', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
      5: [
        { sentence: 'ここ＿＿いっかいです。', translation: '這裡是1樓。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'それ＿＿いくらですか。', translation: '那個多少錢？', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
      6: [
        { sentence: 'これ＿＿かびんです。', translation: '這是花瓶。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'それ＿＿ネクタイですか。', translation: '那是領帶嗎？', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
      7: [
        { sentence: 'ここ＿＿とうきょうです。', translation: '這裡是東京。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
        { sentence: 'そこ＿＿ロンドンです。', translation: '那裡是倫敦。', correct: 'は', options: ['は', 'の', 'が', 'に'] },
      ],
    },
    // 第4課：有「は」「に」「から」「まで」助詞
    4: {
      1: [
        { sentence: 'わたし＿＿ろくじにおきます。', translation: '我六點起床。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
        { sentence: 'じゅうじ＿＿ねます。', translation: '十點睡覺。', correct: 'に', options: ['に', 'は', 'が', 'の'] },
      ],
      2: [
        { sentence: 'ここ＿＿ぎんこうです。', translation: '這裡是銀行。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
        { sentence: 'そこ＿＿ゆうびんきょくですか。', translation: '那裡是郵局嗎？', correct: 'は', options: ['は', 'に', 'が', 'の'] },
      ],
      3: [
        { sentence: 'いま＿＿なんじですか。', translation: '現在幾點？', correct: 'は', options: ['は', 'に', 'が', 'の'] },
        { sentence: 'ごぜん＿＿はちじです。', translation: '上午是八點。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
      ],
      4: [
        { sentence: 'あさ＿＿はたらきます。', translation: '早上工作。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
        { sentence: 'よる＿＿やすみます。', translation: '晚上休息。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
      ],
      5: [
        { sentence: 'きょう＿＿げつようびです。', translation: '今天是星期一。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
        { sentence: 'あした＿＿にちようびです。', translation: '明天是星期天。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
      ],
      6: [
        { sentence: 'ここ＿＿としょかんです。', translation: '這裡是圖書館。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
        { sentence: 'きょう＿＿しけんです。', translation: '今天是考試。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
      ],
      7: [
        { sentence: 'わたし＿＿まいあさおきます。', translation: '我每天早上起床。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
        { sentence: 'かれ＿＿まいばんべんきょうします。', translation: '他每天晚上學習。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
      ],
      8: [
        { sentence: 'にちようび＿＿やすみです。', translation: '星期天休息。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
        { sentence: 'どようび＿＿なんじまでですか。', translation: '星期六到幾點？', correct: 'は', options: ['は', 'に', 'が', 'の'] },
      ],
      9: [
        { sentence: 'くじ＿＿はたらきます。', translation: '從九點開始工作。', correct: 'から', options: ['から', 'まで', 'は', 'に'] },
        { sentence: 'ごじ＿＿です。', translation: '到五點為止。', correct: 'まで', options: ['まで', 'から', 'は', 'に'] },
      ],
      10: [
        { sentence: 'そちら＿＿なんばんですか。', translation: '那邊是幾號？', correct: 'は', options: ['は', 'に', 'が', 'の'] },
        { sentence: 'これ＿＿たいへんですね。', translation: '這很辛苦呢。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
      ],
      11: [
        { sentence: 'ここ＿＿ニューヨークです。', translation: '這裡是紐約。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
        { sentence: 'ペキン＿＿ちゅうごくです。', translation: '北京是中國。', correct: 'は', options: ['は', 'に', 'が', 'の'] },
      ],
    },
    // 第5課：使用所有交通助詞
    5: {
      1: [
        { sentence: 'わたしはでんしゃ＿＿がっこうへいきます。', translation: '我坐電車去學校。', correct: 'で', options: ['で', 'を', 'へ', 'に'] },
        { sentence: 'がっこう＿＿いきます。', translation: '去學校。', correct: 'へ', options: ['で', 'を', 'へ', 'に'] },
        { sentence: 'バス＿＿えきへいきます。', translation: '坐巴士去車站。', correct: 'で', options: ['で', 'を', 'へ', 'に'] },
      ],
      2: [
        { sentence: 'ともだち＿＿いきます。', translation: '和朋友一起去。', correct: 'と', options: ['と', 'で', 'へ', 'に'] },
        { sentence: 'わたし＿＿がっこうへいきます。', translation: '我去學校。', correct: 'は', options: ['は', 'で', 'を', 'が'] },
      ],
      3: [
        { sentence: 'らいしゅう＿＿にほんへいきます。', translation: '下週去日本。', correct: 'に', options: ['で', 'を', 'へ', 'に'] },
        { sentence: 'ことし＿＿とうきょうへいきました。', translation: '今年去了東京。', correct: 'は', options: ['は', 'で', 'を', 'に'] },
      ],
      4: [
        { sentence: 'たんじょうびはいつ＿＿ですか。', translation: '生日是什麼時候？', correct: 'に', options: ['で', 'を', 'へ', 'に'] },
      ],
    },
  };
  
  const clozeTemplates = lessonClozeTemplates[lessonNum] || lessonClozeTemplates[5];

  const templates = clozeTemplates[unitId] || clozeTemplates[1];
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  return {
    id: `q-${unitId}-cl-${index}`,
    type: 'cloze',
    unitId,
    sentence: template.sentence,
    translation: template.translation,
    options: template.options.map(p => ({ particle: p, meaning: getParticleMeaning(p) })),
    correctParticle: template.correct,
  };
}

function getParticleMeaning(particle: string): string {
  const meanings: Record<string, string> = {
    'は': '主題標記',
    'で': '工具／方式',
    'へ': '方向',
    'に': '時間／地點',
    'を': '賓語',
    'と': '和／一起',
    'が': '主語',
  };
  return meanings[particle] || '助詞';
}

// ==================== 測驗配置 ====================

export interface QuizConfig {
  questionCount: number;
  timePerQuestion: number;
  passingScore: number;
  lives: number;
}

export const defaultQuizConfig: QuizConfig = {
  questionCount: 7,
  timePerQuestion: 15,
  passingScore: 60,
  lives: 5,
};
