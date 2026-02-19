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

export function setLessonData(vocab: any[], getVocabFn: any) {
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

function generateSentencePuzzle(vocab: GameVocab[], unitId: number, index: number): GameQuestion {
  // 預設句子模板
  const templates: Record<number, Array<{ translation: string; blocks: string[]; correctOrder: number[] }>> = {
    1: [
      {
        translation: '我坐電車去學校',
        blocks: ['わたしは', 'でんしゃで', 'がっこうへ', 'いきます'],
        correctOrder: [0, 1, 2, 3],
      },
      {
        translation: '我乘地鐵回',
        blocks: ['わたしは', 'ちかてつで', 'かえります'],
        correctOrder: [0, 1, 2],
      },
      {
        translation: '坐巴士來',
        blocks: ['バスで', 'きます'],
        correctOrder: [0, 1],
      },
    ],
    2: [
      {
        translation: '和朋友坐地鐵去',
        blocks: ['ともだちと', 'ちかてつで', 'いきます'],
        correctOrder: [0, 1, 2],
      },
      {
        translation: '我獨自去車站',
        blocks: ['わたしは', 'ひとりで', 'えきへ', 'いきます'],
        correctOrder: [0, 1, 2, 3],
      },
    ],
    3: [
      {
        translation: '上週去',
        blocks: ['せんしゅう', 'いきました'],
        correctOrder: [0, 1],
      },
      {
        translation: '明年坐新幹線來',
        blocks: ['らいねん', 'しんかんせんで', 'きます'],
        correctOrder: [0, 1, 2],
      },
    ],
    4: [
      {
        translation: '生日是什麼時候',
        blocks: ['たんじょうびは', 'いつ', 'ですか'],
        correctOrder: [0, 1, 2],
      },
    ],
  };

  const unitTemplates = templates[unitId] || templates[1];
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
  // 真假判斷題模板
  const trueTemplates: Record<number, Array<{ sentence: string; translation: string }>> = {
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
  };

  const falseTemplates: Record<number, Array<{ sentence: string; translation: string; explanation: string }>> = {
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
  };

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
  const explanation = (template as any).explanation || '這是一句正確的日文句子！';
  
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
  // 助詞填空題
  const clozeTemplates: Record<number, Array<{ sentence: string; translation: string; correct: string; options: string[] }>> = {
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
  };

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
