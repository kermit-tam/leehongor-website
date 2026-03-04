// 英文串字王詞彙 - 整合自 tryeng/SpellingGame

export interface SpellingWord {
  en: string;
  zh: string;
  emoji: string;
  type: 'singular' | 'plural' | 'adjective' | 'phrase' | 'transport';
  pair?: string; // 對應的單數/眾數形式
}

// Unit 4: 食物與形容詞
export const unit4Words: SpellingWord[] = [
  // 單數/眾數配對
  { en: 'banana', zh: '香蕉', emoji: '🍌', type: 'singular', pair: 'bananas' },
  { en: 'bananas', zh: '香蕉（複數）', emoji: '🍌', type: 'plural', pair: 'banana' },
  { en: 'pear', zh: '梨', emoji: '🍐', type: 'singular', pair: 'pears' },
  { en: 'pears', zh: '梨（複數）', emoji: '🍐', type: 'plural', pair: 'pear' },
  { en: 'mango', zh: '芒果', emoji: '🥭', type: 'singular', pair: 'mangoes' },
  { en: 'mangoes', zh: '芒果（複數）', emoji: '🥭', type: 'plural', pair: 'mango' },
  { en: 'potato', zh: '薯仔', emoji: '🥔', type: 'singular', pair: 'potatoes' },
  { en: 'potatoes', zh: '薯仔（複數）', emoji: '🥔', type: 'plural', pair: 'potato' },
  { en: 'peach', zh: '桃', emoji: '🍑', type: 'singular', pair: 'peaches' },
  { en: 'peaches', zh: '桃（複數）', emoji: '🍑', type: 'plural', pair: 'peach' },
  { en: 'sandwich', zh: '三文治', emoji: '🥪', type: 'singular', pair: 'sandwiches' },
  { en: 'sandwiches', zh: '三文治（複數）', emoji: '🥪', type: 'plural', pair: 'sandwich' },
  { en: 'cherry', zh: '車厘子', emoji: '🍒', type: 'singular', pair: 'cherries' },
  { en: 'cherries', zh: '車厘子（複數）', emoji: '🍒', type: 'plural', pair: 'cherry' },
  { en: 'strawberry', zh: '草莓', emoji: '🍓', type: 'singular', pair: 'strawberries' },
  { en: 'strawberries', zh: '草莓（複數）', emoji: '🍓', type: 'plural', pair: 'strawberry' },
  { en: 'sweet', zh: '甜的', emoji: '🍬', type: 'adjective', pair: 'sweets' },
  { en: 'sweets', zh: '糖果', emoji: '🍭', type: 'plural', pair: 'sweet' },
  { en: 'cake', zh: '蛋糕', emoji: '🎂', type: 'singular', pair: 'cakes' },
  { en: 'cakes', zh: '蛋糕（複數）', emoji: '🎂', type: 'plural', pair: 'cake' },
  // 單個形容詞/短語
  { en: 'thirsty', zh: '口渴', emoji: '🥤', type: 'adjective' },
  { en: 'hungry', zh: '肚餓', emoji: '😋', type: 'adjective' },
  { en: 'full', zh: '飽', emoji: '😌', type: 'adjective' },
  { en: 'thank you', zh: '多謝', emoji: '🙏', type: 'phrase' },
  { en: 'fine', zh: '好的', emoji: '👍', type: 'adjective' },
  { en: 'king', zh: '國王', emoji: '👑', type: 'singular' },
  { en: 'sorry', zh: '對不起', emoji: '😔', type: 'phrase' },
  { en: 'please', zh: '請', emoji: '🙏', type: 'phrase' },
];

// Unit 5: 交通工具
export const unit5Words: SpellingWord[] = [
  { en: 'on foot', zh: '步行', emoji: '🚶', type: 'phrase' },
  { en: 'bus', zh: '巴士', emoji: '🚌', type: 'transport' },
  { en: 'minibus', zh: '小巴', emoji: '🚐', type: 'transport' },
  { en: 'school bus', zh: '校巴', emoji: '🚌', type: 'transport' },
  { en: 'taxi', zh: '的士', emoji: '🚕', type: 'transport' },
  { en: 'MTR', zh: '港鐵', emoji: '🚇', type: 'transport' },
  { en: 'train', zh: '火車', emoji: '🚆', type: 'transport' },
  { en: 'light rail', zh: '輕鐵', emoji: '🚊', type: 'transport' },
  { en: 'tram', zh: '電車', emoji: '🚋', type: 'transport' },
  { en: 'ferry', zh: '渡輪', emoji: '⛴️', type: 'transport' },
  { en: 'come', zh: '來', emoji: '👋', type: 'phrase' },
  { en: 'school', zh: '學校', emoji: '🏫', type: 'singular' },
  { en: 'Shatin', zh: '沙田', emoji: '📍', type: 'singular' },
];

// 所有串字王詞彙
export const allSpellingWords: SpellingWord[] = [...unit4Words, ...unit5Words];

// 打亂字母函數
export function scrambleWord(word: string): string {
  const letters = word.toLowerCase().split('').filter(l => l !== ' ' && l !== '-');
  // Fisher-Yates 洗牌
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join('').toUpperCase();
}

// 根據類型獲取詞語
export function getWordsByType(type: 'all' | 'singular' | 'plural' | 'transport' | 'adjective'): SpellingWord[] {
  if (type === 'all') return allSpellingWords;
  return allSpellingWords.filter(w => w.type === type || (type === 'singular' && w.type === 'phrase'));
}
