/**
 * 二年級溫書數據
 * Primary 2 Study Data
 * 
 * 中文生字 + 英文詞彙
 */

export interface StudyCard {
  id: string;
  subject: 'chinese' | 'english';
  category: string;
  // 中文用
  character?: string;
  pinyin?: string;
  strokes?: number;
  // 英文用
  word?: string;
  phonetic?: string;
  // 共用
  meaning: string;
  example: string;
  imageHint?: string;
}

// 中文生字 - 二年級程度
export const chineseCards: StudyCard[] = [
  // 自然類
  { id: 'ch-001', subject: 'chinese', category: '自然', character: '花', pinyin: 'huā', strokes: 7, meaning: 'flower', example: '這是一朵美麗的花。' },
  { id: 'ch-002', subject: 'chinese', category: '自然', character: '草', pinyin: 'cǎo', strokes: 9, meaning: 'grass', example: '草地上有很多小動物。' },
  { id: 'ch-003', subject: 'chinese', category: '自然', character: '樹', pinyin: 'shù', strokes: 16, meaning: 'tree', example: '大樹下很涼快。' },
  { id: 'ch-004', subject: 'chinese', category: '自然', character: '鳥', pinyin: 'niǎo', strokes: 11, meaning: 'bird', example: '小鳥在天上飛。' },
  { id: 'ch-005', subject: 'chinese', category: '自然', character: '魚', pinyin: 'yú', strokes: 11, meaning: 'fish', example: '魚兒在水裡游。' },
  { id: 'ch-006', subject: 'chinese', category: '自然', character: '雲', pinyin: 'yún', strokes: 12, meaning: 'cloud', example: '天上有白雲。' },
  { id: 'ch-007', subject: 'chinese', category: '自然', character: '雨', pinyin: 'yǔ', strokes: 8, meaning: 'rain', example: '下雨了，要帶雨傘。' },
  { id: 'ch-008', subject: 'chinese', category: '自然', character: '雪', pinyin: 'xuě', strokes: 11, meaning: 'snow', example: '下雪了，可以堆雪人。' },
  
  // 家庭類
  { id: 'ch-009', subject: 'chinese', category: '家庭', character: '家', pinyin: 'jiā', strokes: 10, meaning: 'home', example: '我愛我的家。' },
  { id: 'ch-010', subject: 'chinese', category: '家庭', character: '爸', pinyin: 'bà', strokes: 8, meaning: 'dad', example: '爸爸去上班。' },
  { id: 'ch-011', subject: 'chinese', category: '家庭', character: '媽', pinyin: 'mā', strokes: 13, meaning: 'mom', example: '媽媽在做飯。' },
  { id: 'ch-012', subject: 'chinese', category: '家庭', character: '哥', pinyin: 'gē', strokes: 10, meaning: 'older brother', example: '哥哥在讀書。' },
  { id: 'ch-013', subject: 'chinese', category: '家庭', character: '姐', pinyin: 'jiě', strokes: 8, meaning: 'older sister', example: '姐姐很溫柔。' },
  
  // 學校類
  { id: 'ch-014', subject: 'chinese', category: '學校', character: '學', pinyin: 'xué', strokes: 16, meaning: 'learn', example: '我在學校學習。' },
  { id: 'ch-015', subject: 'chinese', category: '學校', character: '書', pinyin: 'shū', strokes: 10, meaning: 'book', example: '這是我的書包。' },
  { id: 'ch-016', subject: 'chinese', category: '學校', character: '筆', pinyin: 'bǐ', strokes: 12, meaning: 'pen', example: '用鉛筆寫字。' },
  { id: 'ch-017', subject: 'chinese', category: '學校', character: '紙', pinyin: 'zhǐ', strokes: 10, meaning: 'paper', example: '這是一張紙。' },
  { id: 'ch-018', subject: 'chinese', category: '學校', character: '老', pinyin: 'lǎo', strokes: 6, meaning: 'teacher', example: '老師教我們讀書。' },
  
  // 顏色類
  { id: 'ch-019', subject: 'chinese', category: '顏色', character: '紅', pinyin: 'hóng', strokes: 9, meaning: 'red', example: '蘋果是紅色的。' },
  { id: 'ch-020', subject: 'chinese', category: '顏色', character: '藍', pinyin: 'lán', strokes: 17, meaning: 'blue', example: '天空是藍色的。' },
  { id: 'ch-021', subject: 'chinese', category: '顏色', character: '黃', pinyin: 'huáng', strokes: 11, meaning: 'yellow', example: '香蕉是黃色的。' },
  { id: 'ch-022', subject: 'chinese', category: '顏色', character: '綠', pinyin: 'lǜ', strokes: 14, meaning: 'green', example: '草地是綠色的。' },
  { id: 'ch-023', subject: 'chinese', category: '顏色', character: '白', pinyin: 'bái', strokes: 5, meaning: 'white', example: '雲是白色的。' },
  { id: 'ch-024', subject: 'chinese', category: '顏色', character: '黑', pinyin: 'hēi', strokes: 12, meaning: 'black', example: '頭髮是黑色的。' },
];

// 英文詞彙 - 二年級程度
export const englishCards: StudyCard[] = [
  // 動物類
  { id: 'en-001', subject: 'english', category: 'Animals', word: 'cat', phonetic: '/kæt/', meaning: '貓', example: 'The cat is sleeping.' },
  { id: 'en-002', subject: 'english', category: 'Animals', word: 'dog', phonetic: '/dɒɡ/', meaning: '狗', example: 'I have a pet dog.' },
  { id: 'en-003', subject: 'english', category: 'Animals', word: 'bird', phonetic: '/bɜːd/', meaning: '鳥', example: 'The bird can fly.' },
  { id: 'en-004', subject: 'english', category: 'Animals', word: 'fish', phonetic: '/fɪʃ/', meaning: '魚', example: 'Fish live in water.' },
  { id: 'en-005', subject: 'english', category: 'Animals', word: 'rabbit', phonetic: '/ˈræbɪt/', meaning: '兔子', example: 'The rabbit is white.' },
  { id: 'en-006', subject: 'english', category: 'Animals', word: 'elephant', phonetic: '/ˈelɪfənt/', meaning: '大象', example: 'The elephant is big.' },
  
  // 顏色類
  { id: 'en-007', subject: 'english', category: 'Colors', word: 'red', phonetic: '/red/', meaning: '紅色', example: 'The apple is red.' },
  { id: 'en-008', subject: 'english', category: 'Colors', word: 'blue', phonetic: '/bluː/', meaning: '藍色', example: 'The sky is blue.' },
  { id: 'en-009', subject: 'english', category: 'Colors', word: 'yellow', phonetic: '/ˈjeləʊ/', meaning: '黃色', example: 'The banana is yellow.' },
  { id: 'en-010', subject: 'english', category: 'Colors', word: 'green', phonetic: '/ɡriːn/', meaning: '綠色', example: 'The grass is green.' },
  { id: 'en-011', subject: 'english', category: 'Colors', word: 'black', phonetic: '/blæk/', meaning: '黑色', example: 'My hair is black.' },
  { id: 'en-012', subject: 'english', category: 'Colors', word: 'white', phonetic: '/waɪt/', meaning: '白色', example: 'The cloud is white.' },
  
  // 數字類
  { id: 'en-013', subject: 'english', category: 'Numbers', word: 'one', phonetic: '/wʌn/', meaning: '一', example: 'I have one pen.' },
  { id: 'en-014', subject: 'english', category: 'Numbers', word: 'two', phonetic: '/tuː/', meaning: '二', example: 'I have two eyes.' },
  { id: 'en-015', subject: 'english', category: 'Numbers', word: 'three', phonetic: '/θriː/', meaning: '三', example: 'I have three books.' },
  { id: 'en-016', subject: 'english', category: 'Numbers', word: 'four', phonetic: '/fɔː(r)/', meaning: '四', example: 'The cat has four legs.' },
  { id: 'en-017', subject: 'english', category: 'Numbers', word: 'five', phonetic: '/faɪv/', meaning: '五', example: 'I have five fingers.' },
  { id: 'en-018', subject: 'english', category: 'Numbers', word: 'ten', phonetic: '/ten/', meaning: '十', example: 'I have ten toes.' },
  
  // 家庭類
  { id: 'en-019', subject: 'english', category: 'Family', word: 'father', phonetic: '/ˈfɑːðə(r)/', meaning: '爸爸', example: 'My father is tall.' },
  { id: 'en-020', subject: 'english', category: 'Family', word: 'mother', phonetic: '/ˈmʌðə(r)/', meaning: '媽媽', example: 'My mother is kind.' },
  { id: 'en-021', subject: 'english', category: 'Family', word: 'brother', phonetic: '/ˈbrʌðə(r)/', meaning: '兄弟', example: 'My brother is playing.' },
  { id: 'en-022', subject: 'english', category: 'Family', word: 'sister', phonetic: '/ˈsɪstə(r)/', meaning: '姐妹', example: 'My sister is reading.' },
  
  // 水果類
  { id: 'en-023', subject: 'english', category: 'Fruits', word: 'apple', phonetic: '/ˈæpl/', meaning: '蘋果', example: 'I eat an apple.' },
  { id: 'en-024', subject: 'english', category: 'Fruits', word: 'banana', phonetic: '/bəˈnɑːnə/', meaning: '香蕉', example: 'The banana is yellow.' },
  { id: 'en-025', subject: 'english', category: 'Fruits', word: 'orange', phonetic: '/ˈɒrɪndʒ/', meaning: '橙', example: 'The orange is juicy.' },
];

// 獲取所有卡片
export const getAllCards = (): StudyCard[] => [...chineseCards, ...englishCards];

// 根據科目獲取卡片
export const getCardsBySubject = (subject: 'chinese' | 'english'): StudyCard[] => {
  return subject === 'chinese' ? chineseCards : englishCards;
};

// 獲取分類列表
export const getCategories = (subject: 'chinese' | 'english'): string[] => {
  const cards = getCardsBySubject(subject);
  return [...new Set(cards.map(c => c.category))];
};
