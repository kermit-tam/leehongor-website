/**
 * A / An 練習 - 幼稚園程度
 * 學習冠詞用法：a + 輔音，an + 元音
 */

export interface AAnQuestion {
  id: string;
  word: string;
  article: 'a' | 'an';
  emoji: string;
  phonics: string; // 開頭音
}

// 20題 A/An 練習（簡單單字，適合幼稚園）
export const aAnQuestions: AAnQuestion[] = [
  // A - 輔音開頭
  { id: 'aa-01', word: 'cat', article: 'a', emoji: '🐱', phonics: '/k/' },
  { id: 'aa-02', word: 'dog', article: 'a', emoji: '🐕', phonics: '/d/' },
  { id: 'aa-03', word: 'pig', article: 'a', emoji: '🐷', phonics: '/p/' },
  { id: 'aa-04', word: 'ball', article: 'a', emoji: '⚽', phonics: '/b/' },
  { id: 'aa-05', word: 'book', article: 'a', emoji: '📚', phonics: '/b/' },
  { id: 'aa-06', word: 'car', article: 'a', emoji: '🚗', phonics: '/k/' },
  { id: 'aa-07', word: 'table', article: 'a', emoji: '🪑', phonics: '/t/' },
  { id: 'aa-08', word: 'pen', article: 'a', emoji: '🖊️', phonics: '/p/' },
  { id: 'aa-09', word: 'banana', article: 'a', emoji: '🍌', phonics: '/b/' },
  { id: 'aa-10', word: 'flower', article: 'a', emoji: '🌸', phonics: '/f/' },
  
  // An - 元音開頭（A, E, I, O, U）
  { id: 'aa-11', word: 'apple', article: 'an', emoji: '🍎', phonics: '/æ/' },
  { id: 'aa-12', word: 'egg', article: 'an', emoji: '🥚', phonics: '/e/' },
  { id: 'aa-13', word: 'elephant', article: 'an', emoji: '🐘', phonics: '/e/' },
  { id: 'aa-14', word: 'ice cream', article: 'an', emoji: '🍦', phonics: '/aɪ/' },
  { id: 'aa-15', word: 'igloo', article: 'an', emoji: '🧊', phonics: '/ɪ/' },
  { id: 'aa-16', word: 'orange', article: 'an', emoji: '🍊', phonics: '/ɒ/' },
  { id: 'aa-17', word: 'octopus', article: 'an', emoji: '🐙', phonics: '/ɒ/' },
  { id: 'aa-18', word: 'umbrella', article: 'an', emoji: '☂️', phonics: '/ʌ/' },
  { id: 'aa-19', word: 'ant', article: 'an', emoji: '🐜', phonics: '/æ/' },
  { id: 'aa-20', word: 'owl', article: 'an', emoji: '🦉', phonics: '/aʊ/' }
];

// 規則說明（幼稚園版本）
export const aAnRules = {
  title: 'A / An 用法',
  a: {
    title: '用 A',
    description: '後面個字開頭係 輔音（b, c, d, f, g...）',
    examples: ['a cat 🐱', 'a dog 🐕', 'a ball ⚽'],
    color: 'blue'
  },
  an: {
    title: '用 An',
    description: '後面個字開頭係 元音（a, e, i, o, u）',
    examples: ['an apple 🍎', 'an egg 🥚', 'an orange 🍊'],
    color: 'orange'
  }
};

// 元音字母
export const vowels = ['A', 'E', 'I', 'O', 'U'];

// 打亂題目
export function shuffleAAnQuestions(): AAnQuestion[] {
  return [...aAnQuestions].sort(() => Math.random() - 0.5);
}
