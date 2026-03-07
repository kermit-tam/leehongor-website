/**
 * 數學BRO - 題庫系統
 * Math Bro - Question Bank
 * 
 * 支持年級：幼稚園、小一至小六
 * 題型：加減乘除、三位數、四位數、角度、排次序、方向、數水果
 */

export type Grade = 'kindergarten' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6';
export type MathTopic = 
  | 'addition' 
  | 'subtraction' 
  | 'multiplication' 
  | 'division' 
  | 'mixed'
  | '3digit'
  | '4digit'
  | 'angle'
  | 'ordering'
  | 'direction'
  | 'counting';

export interface Question {
  id: string;
  type: 'choice' | 'input';
  questionText: string;
  visual?: {
    type: 'blocks' | 'number-line' | 'abacus' | 'fruits' | 'fingers' | 'circles' | 'angle' | 'direction';
    values: number[];
    labels?: string[];
  };
  options: number[];
  correctAnswer: number;
  explanation: string;
  hint: string;
}

export interface TopicConfig {
  id: MathTopic;
  name: string;
  emoji: string;
  description: string;
  grades: Grade[];
}

// 年級配置
export const GRADES: { id: Grade; name: string; emoji: string }[] = [
  { id: 'kindergarten', name: '幼稚園', emoji: '🧸' },
  { id: 'p1', name: '小一', emoji: '🎒' },
  { id: 'p2', name: '小二', emoji: '📚' },
  { id: 'p3', name: '小三', emoji: '✏️' },
  { id: 'p4', name: '小四', emoji: '📝' },
  { id: 'p5', name: '小五', emoji: '📐' },
  { id: 'p6', name: '小六', emoji: '🎓' },
];

// 課程主題（按年級過濾）
export const TOPICS: TopicConfig[] = [
  { id: 'counting', name: '數水果', emoji: '🍎', description: '數一數有幾多個', grades: ['kindergarten', 'p1'] },
  { id: 'addition', name: '加法', emoji: '➕', description: '加法練習', grades: ['kindergarten', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6'] },
  { id: 'subtraction', name: '減法', emoji: '➖', description: '減法練習', grades: ['kindergarten', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6'] },
  { id: 'multiplication', name: '乘法', emoji: '✖️', description: '乘數表', grades: ['p2', 'p3', 'p4', 'p5', 'p6'] },
  { id: 'division', name: '除法', emoji: '➗', description: '除法練習', grades: ['p3', 'p4', 'p5', 'p6'] },
  { id: '3digit', name: '三位數', emoji: '🔢', description: '百位數練習', grades: ['p2', 'p3', 'p4'] },
  { id: '4digit', name: '四位數', emoji: '#️⃣', description: '千位數練習', grades: ['p3', 'p4', 'p5', 'p6'] },
  { id: 'ordering', name: '排次序', emoji: '📊', description: '由小至大排', grades: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'] },
  { id: 'direction', name: '方向', emoji: '🧭', description: '上下左右', grades: ['p1', 'p2', 'p3'] },
  { id: 'angle', name: '角度', emoji: '📐', description: '銳角直角鈍角', grades: ['p4', 'p5', 'p6'] },
  { id: 'mixed', name: '混合', emoji: '🎯', description: '各種題型混合', grades: ['p3', 'p4', 'p5', 'p6'] },
];

// 獲取適合該年級的主題
export function getTopicsForGrade(grade: Grade): TopicConfig[] {
  return TOPICS.filter(t => t.grades.includes(grade));
}

// 生成選擇題
export function generateQuestion(
  topic: MathTopic,
  grade: Grade,
  questionNumber: number
): Question {
  switch (topic) {
    case 'counting':
      return generateCountingQuestion(questionNumber);
    case 'addition':
      return generateAdditionQuestion(grade, questionNumber);
    case 'subtraction':
      return generateSubtractionQuestion(grade, questionNumber);
    case 'multiplication':
      return generateMultiplicationQuestion(grade, questionNumber);
    case 'division':
      return generateDivisionQuestion(grade, questionNumber);
    case '3digit':
      return generate3DigitQuestion(questionNumber);
    case '4digit':
      return generate4DigitQuestion(questionNumber);
    case 'ordering':
      return generateOrderingQuestion(grade, questionNumber);
    case 'direction':
      return generateDirectionQuestion(questionNumber);
    case 'angle':
      return generateAngleQuestion(questionNumber);
    default:
      return generateMixedQuestion(grade, questionNumber);
  }
}

// 數水果題目（幼稚園/P1）
function generateCountingQuestion(qn: number): Question {
  const fruitCount = Math.floor(Math.random() * 8) + 3; // 3-10個水果
  const fruits = [
    { emoji: '🍎', name: '蘋果' },
    { emoji: '🍊', name: '橙' },
    { emoji: '🍇', name: '提子' },
    { emoji: '🍓', name: '士多啤梨' },
    { emoji: '🍌', name: '香蕉' },
    { emoji: '🍐', name: '啤梨' },
    { emoji: '🍑', name: '水蜜桃' },
    { emoji: '🥭', name: '芒果' },
  ];
  const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
  
  return {
    id: `q-${qn}`,
    type: 'choice',
    questionText: `數一數有幾多個${randomFruit.name}？`,
    visual: {
      type: 'fruits',
      values: [fruitCount],
      labels: [randomFruit.emoji],
    },
    options: generateOptions(fruitCount, 'easy'),
    correctAnswer: fruitCount,
    explanation: `數一數：1、2、3...總共有${fruitCount}個${randomFruit.name}`,
    hint: `用手指數一數，一個一個數清楚`,
  };
}

// 加法題目（根據年級調整）
function generateAdditionQuestion(grade: Grade, qn: number): Question {
  let a: number, b: number;
  let useVisual = false;
  
  switch (grade) {
    case 'kindergarten':
      a = Math.floor(Math.random() * 5) + 1; // 1-5
      b = Math.floor(Math.random() * 5) + 1; // 1-5，總和<=10
      if (a + b > 10) b = 10 - a;
      useVisual = true;
      break;
    case 'p1':
      a = Math.floor(Math.random() * 10) + 1; // 1-10
      b = Math.floor(Math.random() * 10) + 1; // 1-10
      useVisual = Math.random() < 0.5;
      break;
    case 'p2':
      a = Math.floor(Math.random() * 50) + 10; // 10-59
      b = Math.floor(Math.random() * 50) + 10; // 10-59
      break;
    case 'p3':
    case 'p4':
      a = Math.floor(Math.random() * 100) + 50; // 50-149
      b = Math.floor(Math.random() * 100) + 50; // 50-149
      break;
    default:
      a = Math.floor(Math.random() * 500) + 100; // 100-599
      b = Math.floor(Math.random() * 500) + 100; // 100-599
  }
  
  const answer = a + b;
  
  return {
    id: `q-${qn}`,
    type: 'choice',
    questionText: `${a} + ${b} = ?`,
    visual: useVisual ? {
      type: grade === 'kindergarten' ? 'fingers' : 'circles',
      values: [a, b],
    } : undefined,
    options: generateOptions(answer, grade === 'kindergarten' ? 'easy' : 'medium'),
    correctAnswer: answer,
    explanation: `${a}加${b}等於${answer}`,
    hint: useVisual ? `用手指或者圓圈幫手數` : `個位數加個位數，十位數加十位數`,
  };
}

// 減法題目
function generateSubtractionQuestion(grade: Grade, qn: number): Question {
  let a: number, b: number;
  let useVisual = false;
  
  switch (grade) {
    case 'kindergarten':
      a = Math.floor(Math.random() * 5) + 5; // 5-9
      b = Math.floor(Math.random() * (a - 1)) + 1; // 1-(a-1)
      useVisual = true;
      break;
    case 'p1':
      a = Math.floor(Math.random() * 10) + 10; // 10-19
      b = Math.floor(Math.random() * 10) + 1; // 1-10
      useVisual = Math.random() < 0.5;
      break;
    case 'p2':
      a = Math.floor(Math.random() * 50) + 20; // 20-69
      b = Math.floor(Math.random() * 20) + 1; // 1-20
      break;
    default:
      a = Math.floor(Math.random() * 200) + 50; // 50-249
      b = Math.floor(Math.random() * 50) + 10; // 10-59
  }
  
  const answer = a - b;
  
  return {
    id: `q-${qn}`,
    type: 'choice',
    questionText: `${a} - ${b} = ?`,
    visual: useVisual ? {
      type: 'circles',
      values: [a, b],
    } : undefined,
    options: generateOptions(answer, grade === 'kindergarten' ? 'easy' : 'medium'),
    correctAnswer: answer,
    explanation: `${a}減${b}等於${answer}`,
    hint: useVisual ? `畫${a}個圓圈，再劃走${b}個，數吓剩低幾多個` : `由${a}數返後${b}個數`,
  };
}

// 乘法題目
function generateMultiplicationQuestion(grade: Grade, qn: number): Question {
  let a: number, b: number;
  
  switch (grade) {
    case 'p2':
      a = Math.floor(Math.random() * 5) + 2; // 2-6
      b = Math.floor(Math.random() * 5) + 1; // 1-5
      break;
    default:
      a = Math.floor(Math.random() * 9) + 2; // 2-10
      b = Math.floor(Math.random() * 9) + 2; // 2-10
  }
  
  const answer = a * b;
  
  return {
    id: `q-${qn}`,
    type: 'choice',
    questionText: `${a} × ${b} = ?`,
    visual: {
      type: 'blocks',
      values: [a, b],
    },
    options: generateOptions(answer, 'medium'),
    correctAnswer: answer,
    explanation: `${a}乘${b}等於${answer}，即係${b}個${a}加埋`,
    hint: `諗吓${b}個${a}係幾多：${a}+${a}+...（${b}次）`,
  };
}

// 除法題目
function generateDivisionQuestion(grade: Grade, qn: number): Question {
  // 生成可整除的題目
  const b = Math.floor(Math.random() * 8) + 2; // 2-9
  const answer = Math.floor(Math.random() * 8) + 2; // 2-9
  const a = b * answer;
  
  return {
    id: `q-${qn}`,
    type: 'choice',
    questionText: `${a} ÷ ${b} = ?`,
    visual: {
      type: 'blocks',
      values: [a, b],
    },
    options: generateOptions(answer, 'medium'),
    correctAnswer: answer,
    explanation: `${a}除${b}等於${answer}，因為${b}乘${answer}等於${a}`,
    hint: `諗吓${b}乘幾多會等於${a}？`,
  };
}

// 三位數題目
function generate3DigitQuestion(qn: number): Question {
  const type = Math.random() < 0.5 ? 'add' : 'subtract';
  
  if (type === 'add') {
    const a = Math.floor(Math.random() * 400) + 100; // 100-499
    const b = Math.floor(Math.random() * 400) + 100; // 100-499
    const answer = a + b;
    return {
      id: `q-${qn}`,
      type: 'choice',
      questionText: `${a} + ${b} = ?`,
      options: generateOptions(answer, 'hard'),
      correctAnswer: answer,
      explanation: `${a}加${b}等於${answer}。百位數加百位數，十位數加十位數，個位數加個位數`,
      hint: `個位：${a % 10} + ${b % 10}，十位：${Math.floor(a / 10) % 10} + ${Math.floor(b / 10) % 10}...`,
    };
  } else {
    const a = Math.floor(Math.random() * 400) + 300; // 300-699
    const b = Math.floor(Math.random() * 200) + 100; // 100-299
    const answer = a - b;
    return {
      id: `q-${qn}`,
      type: 'choice',
      questionText: `${a} - ${b} = ?`,
      options: generateOptions(answer, 'hard'),
      correctAnswer: answer,
      explanation: `${a}減${b}等於${answer}`,
      hint: `百位數減百位數，十位數減十位數，個位數減個位數`,
    };
  }
}

// 四位數題目
function generate4DigitQuestion(qn: number): Question {
  const type = Math.random() < 0.5 ? 'add' : 'subtract';
  
  if (type === 'add') {
    const a = Math.floor(Math.random() * 2000) + 1000; // 1000-2999
    const b = Math.floor(Math.random() * 2000) + 1000; // 1000-2999
    const answer = a + b;
    return {
      id: `q-${qn}`,
      type: 'choice',
      questionText: `${a} + ${b} = ?`,
      options: generateOptions(answer, 'hard'),
      correctAnswer: answer,
      explanation: `${a}加${b}等於${answer}`,
      hint: `千位數加千位數，百位數加百位數...記住進位呀！`,
    };
  } else {
    const a = Math.floor(Math.random() * 2000) + 2000; // 2000-3999
    const b = Math.floor(Math.random() * 1000) + 500; // 500-1499
    const answer = a - b;
    return {
      id: `q-${qn}`,
      type: 'choice',
      questionText: `${a} - ${b} = ?`,
      options: generateOptions(answer, 'hard'),
      correctAnswer: answer,
      explanation: `${a}減${b}等於${answer}`,
      hint: `記住退位呀！唔夠減就要向左邊借一`,
    };
  }
}

// 排次序題目
function generateOrderingQuestion(grade: Grade, qn: number): Question {
  const count = grade === 'p1' || grade === 'p2' ? 3 : 4;
  const maxNum = grade === 'p1' ? 20 : grade === 'p2' ? 50 : 100;
  
  const numbers: number[] = [];
  while (numbers.length < count) {
    const num = Math.floor(Math.random() * maxNum) + 1;
    if (!numbers.includes(num)) numbers.push(num);
  }
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const answer = parseInt(sorted.join(''));
  
  // 生成選項（其他排列組合）
  const options = [answer];
  while (options.length < 4) {
    const shuffled = [...numbers].sort(() => Math.random() - 0.5);
    const opt = parseInt(shuffled.join(''));
    if (!options.includes(opt)) options.push(opt);
  }
  
  return {
    id: `q-${qn}`,
    type: 'choice',
    questionText: `將 ${numbers.join('、')} 由小至大排好`,
    options: options.sort(() => Math.random() - 0.5),
    correctAnswer: answer,
    explanation: `由小至大排：${sorted.join(' < ')}`,
    hint: `搵最細嗰個先，再搵第二細...`,
  };
}

// 方向題目
function generateDirectionQuestion(qn: number): Question {
  const directions = [
    { name: '上', arrow: '⬆️', opposite: '下' },
    { name: '下', arrow: '⬇️', opposite: '上' },
    { name: '左', arrow: '⬅️', opposite: '右' },
    { name: '右', arrow: '➡️', opposite: '左' },
  ];
  
  const qType = Math.random() < 0.5 ? 'which' : 'opposite';
  
  if (qType === 'which') {
    const dir = directions[Math.floor(Math.random() * directions.length)];
    const options = directions.map(d => d.name);
    return {
      id: `q-${qn}`,
      type: 'choice',
      questionText: `呢個箭頭指邊度？ ${dir.arrow}`,
      visual: {
        type: 'direction',
        values: [1],
        labels: [dir.arrow],
      },
      options: options,
      correctAnswer: dir.name,
      explanation: `箭頭${dir.arrow}指向${dir.name}面`,
      hint: `睇清楚箭頭指邊邊`,
    } as unknown as Question;
  } else {
    const dir = directions[Math.floor(Math.random() * directions.length)];
    const options = directions.map(d => d.name);
    return {
      id: `q-${qn}`,
      type: 'choice',
      questionText: `${dir.name}面嘅相反係邊面？`,
      options: options,
      correctAnswer: dir.opposite,
      explanation: `${dir.name}面嘅相反係${dir.opposite}面`,
      hint: `諗吓你面向${dir.name}，背脊向邊？`,
    } as unknown as Question;
  }
}

// 角度題目
function generateAngleQuestion(qn: number): Question {
  const angles = [
    { name: '銳角', range: '小於90度', example: '🔽' },
    { name: '直角', range: '等於90度', example: '└' },
    { name: '鈍角', range: '大於90度', example: '◣' },
  ];
  
  const target = angles[Math.floor(Math.random() * angles.length)];
  const options = angles.map(a => a.name);
  
  return {
    id: `q-${qn}`,
    type: 'choice',
    questionText: `呢個係咩角？${target.example}`,
    visual: {
      type: 'angle',
      values: [1],
      labels: [target.example],
    },
    options: options,
    correctAnswer: target.name,
    explanation: `呢個係${target.name}，${target.range}`,
    hint: `直角好似個正方形嘅角，細過直角係銳角，大過係鈍角`,
  } as unknown as Question;
}

// 混合題目
function generateMixedQuestion(grade: Grade, qn: number): Question {
  const topics: MathTopic[] = ['addition', 'subtraction'];
  if (grade !== 'kindergarten' && grade !== 'p1') topics.push('multiplication');
  if (grade === 'p3' || grade === 'p4' || grade === 'p5' || grade === 'p6') topics.push('division');
  
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  return generateQuestion(randomTopic, grade, qn);
}

// 生成選項（包括正確答案和干擾項）
function generateOptions(answer: number, difficulty: 'easy' | 'medium' | 'hard'): number[] {
  const options = [answer];
  const range = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 20;
  
  while (options.length < 4) {
    const offset = Math.floor(Math.random() * range) + 1;
    const sign = Math.random() < 0.5 ? 1 : -1;
    const wrongAnswer = answer + offset * sign;
    
    if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
      options.push(wrongAnswer);
    }
  }
  
  return options.sort(() => Math.random() - 0.5);
}
