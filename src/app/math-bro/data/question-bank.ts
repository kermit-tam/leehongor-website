/**
 * 數學BRO - 題庫系統
 * Math Bro - Question Bank
 */

export type MathTopic = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  type: 'choice' | 'matching' | 'ordering';
  questionText: string;
  visual?: {
    type: 'blocks' | 'number-line' | 'abacus';
    value1: number;
    value2: number;
  };
  options: number[];
  correctAnswer: number;
  explanation: string;
  hint: string;
  difficulty: Difficulty;
}

export interface TopicConfig {
  id: MathTopic;
  name: string;
  emoji: string;
  description: string;
}

// 課程主題
export const TOPICS: TopicConfig[] = [
  { id: 'addition', name: '加法', emoji: '➕', description: '加法練習，由簡單到複雜' },
  { id: 'subtraction', name: '減法', emoji: '➖', description: '減法練習，借位技巧' },
  { id: 'multiplication', name: '乘法', emoji: '✖️', description: '乘數表同乘法技巧' },
  { id: 'division', name: '除法', emoji: '➗', description: '除法同餘數' },
  { id: 'mixed', name: '混合', emoji: '🎯', description: '加減乘除混合題' },
];

// 生成選擇題
export function generateQuestion(
  topic: MathTopic,
  difficulty: Difficulty,
  questionNumber: number
): Question {
  let a: number, b: number, answer: number;
  let questionText: string;

  switch (topic) {
    case 'addition':
      [a, b, answer] = generateAddition(difficulty);
      questionText = `${a} + ${b} = ?`;
      break;
    case 'subtraction':
      [a, b, answer] = generateSubtraction(difficulty);
      questionText = `${a} - ${b} = ?`;
      break;
    case 'multiplication':
      [a, b, answer] = generateMultiplication(difficulty);
      questionText = `${a} × ${b} = ?`;
      break;
    case 'division':
      [a, b, answer] = generateDivision(difficulty);
      questionText = `${a} ÷ ${b} = ?`;
      break;
    default:
      [a, b, answer, questionText] = generateMixed(difficulty);
  }

  const options = generateOptions(answer, difficulty);

  return {
    id: `q-${questionNumber}`,
    type: 'choice',
    questionText,
    visual: {
      type: 'blocks',
      value1: a,
      value2: b,
    },
    options,
    correctAnswer: answer,
    explanation: generateExplanation(a, b, answer, topic),
    hint: generateHint(a, b, topic),
    difficulty,
  };
}

// 生成加法題目
function generateAddition(difficulty: Difficulty): [number, number, number] {
  let a: number, b: number;
  
  switch (difficulty) {
    case 'easy':
      a = Math.floor(Math.random() * 5) + 1; // 1-5
      b = Math.floor(Math.random() * 5) + 1; // 1-5
      break;
    case 'medium':
      a = Math.floor(Math.random() * 10) + 1; // 1-10
      b = Math.floor(Math.random() * 10) + 1; // 1-10
      break;
    case 'hard':
      a = Math.floor(Math.random() * 50) + 10; // 10-59
      b = Math.floor(Math.random() * 50) + 10; // 10-59
      break;
  }
  
  return [a, b, a + b];
}

// 生成減法題目
function generateSubtraction(difficulty: Difficulty): [number, number, number] {
  let a: number, b: number;
  
  switch (difficulty) {
    case 'easy':
      a = Math.floor(Math.random() * 5) + 3; // 3-7
      b = Math.floor(Math.random() * (a - 1)) + 1; // 1-(a-1)，確保正數
      break;
    case 'medium':
      a = Math.floor(Math.random() * 10) + 5; // 5-14
      b = Math.floor(Math.random() * (a - 1)) + 1;
      break;
    case 'hard':
      a = Math.floor(Math.random() * 50) + 30; // 30-79
      b = Math.floor(Math.random() * (a - 10)) + 10;
      break;
  }
  
  return [a, b, a - b];
}

// 生成乘法題目
function generateMultiplication(difficulty: Difficulty): [number, number, number] {
  let a: number, b: number;
  
  switch (difficulty) {
    case 'easy':
      a = Math.floor(Math.random() * 3) + 2; // 2-4
      b = Math.floor(Math.random() * 5) + 1; // 1-5
      break;
    case 'medium':
      a = Math.floor(Math.random() * 5) + 2; // 2-6
      b = Math.floor(Math.random() * 9) + 2; // 2-10
      break;
    case 'hard':
      a = Math.floor(Math.random() * 9) + 2; // 2-10
      b = Math.floor(Math.random() * 9) + 2; // 2-10
      break;
  }
  
  return [a, b, a * b];
}

// 生成除法題目
function generateDivision(difficulty: Difficulty): [number, number, number] {
  let a: number, b: number, answer: number;
  
  switch (difficulty) {
    case 'easy':
      answer = Math.floor(Math.random() * 5) + 2; // 2-6
      b = Math.floor(Math.random() * 3) + 2; // 2-4
      a = answer * b;
      break;
    case 'medium':
      answer = Math.floor(Math.random() * 5) + 2; // 2-6
      b = Math.floor(Math.random() * 5) + 2; // 2-6
      a = answer * b;
      break;
    case 'hard':
      answer = Math.floor(Math.random() * 9) + 2; // 2-10
      b = Math.floor(Math.random() * 9) + 2; // 2-10
      a = answer * b;
      break;
  }
  
  return [a, b, answer];
}

// 生成混合題目
function generateMixed(difficulty: Difficulty): [number, number, number, string] {
  const topics: MathTopic[] = ['addition', 'subtraction', 'multiplication', 'division'];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  
  let a: number, b: number, answer: number;
  let questionText: string;
  
  switch (randomTopic) {
    case 'addition':
      [a, b, answer] = generateAddition(difficulty);
      questionText = `${a} + ${b} = ?`;
      break;
    case 'subtraction':
      [a, b, answer] = generateSubtraction(difficulty);
      questionText = `${a} - ${b} = ?`;
      break;
    case 'multiplication':
      [a, b, answer] = generateMultiplication(difficulty);
      questionText = `${a} × ${b} = ?`;
      break;
    case 'division':
      [a, b, answer] = generateDivision(difficulty);
      questionText = `${a} ÷ ${b} = ?`;
      break;
    default:
      [a, b, answer] = generateAddition(difficulty);
      questionText = `${a} + ${b} = ?`;
  }
  
  return [a, b, answer, questionText];
}

// 生成選項（正確答案 + 3個干擾項）
function generateOptions(correct: number, difficulty: Difficulty): number[] {
  const options = new Set<number>();
  options.add(correct);
  
  while (options.size < 4) {
    let offset: number;
    
    switch (difficulty) {
      case 'easy':
        offset = Math.floor(Math.random() * 4) - 2; // -2 到 +2
        break;
      case 'medium':
        offset = Math.floor(Math.random() * 6) - 3; // -3 到 +3
        break;
      case 'hard':
        offset = Math.floor(Math.random() * 10) - 5; // -5 到 +5
        break;
    }
    
    let wrong = correct + offset;
    if (wrong !== correct && wrong >= 0) {
      options.add(wrong);
    }
  }
  
  return Array.from(options).sort(() => Math.random() - 0.5);
}

// 生成解釋
function generateExplanation(a: number, b: number, answer: number, topic: MathTopic): string {
  switch (topic) {
    case 'addition':
      return `${a} 加 ${b} 等於 ${answer}。你可以數 ${a} 個，再加 ${b} 個，總共 ${answer} 個。`;
    case 'subtraction':
      return `${a} 減 ${b} 等於 ${answer}。由 ${a} 個度拿走 ${b} 個，剩低 ${answer} 個。`;
    case 'multiplication':
      return `${a} 乘 ${b} 等於 ${answer}。即係 ${b} 個 ${a} 加埋，總共 ${answer}。`;
    case 'division':
      return `${a} 除 ${b} 等於 ${answer}。即係將 ${a} 分成 ${b} 份，每份有 ${answer} 個。`;
    default:
      return `答案係 ${answer}。`;
  }
}

// 生成提示
function generateHint(a: number, b: number, topic: MathTopic): string {
  switch (topic) {
    case 'addition':
      return `由 ${a} 開始數，數多 ${b} 個。`;
    case 'subtraction':
      return `由 ${a} 開始倒數 ${b} 個。`;
    case 'multiplication':
      return `諗吓 ${a} 的乘數表。`;
    case 'division':
      return `諗吓 ${b} 乘咩數等於 ${a}。`;
    default:
      return '慢慢諗，唔好急。';
  }
}
