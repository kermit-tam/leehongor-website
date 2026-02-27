/**
 * 二年班英文課程數據
 * 根據課本 Revision Notes 建立
 */

export interface P2Vocab {
  id: string;
  word: string;
  syllables: string; // 音節，如 ti-dy
  meaning: string;
  emoji: string;
  example: string; // 例句
}

export interface P2Sentence {
  id: string;
  pattern: string;
  meaning: string;
  words: string[]; // 可替換詞
}

export interface P2Verb {
  base: string;
  thirdPerson: string;
  emoji: string;
  meaning: string;
  rule: 'add-s' | 'add-es' | 'y-to-ies' | 'irregular';
}

// ===== 生字（形容詞 + 動詞）=====
export const p2Vocabulary: P2Vocab[] = [
  {
    id: 'p2-v1',
    word: 'tidy',
    syllables: 'ti-dy',
    meaning: '整齊、乾淨',
    emoji: '🧹',
    example: 'My room is tidy.'
  },
  {
    id: 'p2-v2',
    word: 'untidy',
    syllables: 'un-ti-dy',
    meaning: '不整齊、亂',
    emoji: '🗑️',
    example: 'His desk is untidy.'
  },
  {
    id: 'p2-v3',
    word: 'hard-working',
    syllables: 'hard-wor-king',
    meaning: '勤力',
    emoji: '💪',
    example: 'She is hard-working.'
  },
  {
    id: 'p2-v4',
    word: 'lazy',
    syllables: 'la-zy',
    meaning: '懶惰',
    emoji: '😴',
    example: 'The cat is lazy.'
  },
  {
    id: 'p2-v5',
    word: 'polite',
    syllables: 'po-lite',
    meaning: '有禮貌',
    emoji: '🙇',
    example: 'He is polite.'
  },
  {
    id: 'p2-v6',
    word: 'rude',
    syllables: 'rude',
    meaning: '無禮貌、粗魯',
    emoji: '😤',
    example: 'Don\'t be rude!'
  },
  {
    id: 'p2-v7',
    word: 'honest',
    syllables: 'hon-est',
    meaning: '誠實',
    emoji: '✅',
    example: 'An honest boy.'
  },
  {
    id: 'p2-v8',
    word: 'helpful',
    syllables: 'help-ful',
    meaning: '樂於助人',
    emoji: '🤝',
    example: 'She is helpful.'
  },
  {
    id: 'p2-v9',
    word: 'play',
    syllables: 'play',
    meaning: '玩',
    emoji: '🎮',
    example: 'I play games.'
  },
  {
    id: 'p2-v10',
    word: 'watch',
    syllables: 'watch',
    meaning: '看、觀看',
    emoji: '📺',
    example: 'He watches TV.'
  }
];

// ===== Target Sentences（句型）=====
export const p2Sentences: P2Sentence[] = [
  {
    id: 'p2-s1',
    pattern: 'Do you help at home?',
    meaning: '你在家幫忙嗎？',
    words: ['help', 'clean', 'cook', 'wash']
  },
  {
    id: 'p2-s2',
    pattern: 'I make the bed.',
    meaning: '我整理床舖。',
    words: ['make the bed', 'sweep the floor', 'wash the dishes', 'water the plants']
  },
  {
    id: 'p2-s3',
    pattern: 'I don\'t sweep the floor.',
    meaning: '我不掃地。',
    words: ['sweep the floor', 'make the bed', 'cook dinner', 'clean the room']
  },
  {
    id: 'p2-s4',
    pattern: 'He washes the dishes every day.',
    meaning: '他每天洗碗。',
    words: ['washes the dishes', 'cleans the room', 'studies hard', 'walks to school']
  },
  {
    id: 'p2-s5',
    pattern: 'She does not water the plants.',
    meaning: '她不澆水。',
    words: ['water the plants', 'make the bed', 'set the table', 'hang the clothes']
  },
  // 新增句子
  {
    id: 'p2-s6',
    pattern: 'Does he study hard?',
    meaning: '他學習勤力嗎？',
    words: ['study hard', 'work hard', 'play games', 'watch TV']
  },
  {
    id: 'p2-s7',
    pattern: 'My room is tidy.',
    meaning: '我的房間很整齊。',
    words: ['tidy', 'untidy', 'clean', 'dirty']
  },
  {
    id: 'p2-s8',
    pattern: 'She is helpful and polite.',
    meaning: '她樂於助人又有禮貌。',
    words: ['helpful', 'polite', 'honest', 'hard-working']
  },
  {
    id: 'p2-s9',
    pattern: 'He walks to school every day.',
    meaning: '他每天步行上學。',
    words: ['walks to school', 'reads books', 'cooks dinner', 'carries a bag']
  },
  {
    id: 'p2-s10',
    pattern: 'Don\'t be rude!',
    meaning: '不要無禮貌！',
    words: ['rude', 'lazy', 'silly', 'careless']
  }
];

// ===== 動詞第三人稱變化 =====
export const p2Verbs: P2Verb[] = [
  { base: 'walk', thirdPerson: 'walks', emoji: '🚶', meaning: '行路', rule: 'add-s' },
  { base: 'set', thirdPerson: 'sets', emoji: '🍽️', meaning: '擺放', rule: 'add-s' },
  { base: 'hang', thirdPerson: 'hangs', emoji: '👕', meaning: '掛', rule: 'add-s' },
  { base: 'carry', thirdPerson: 'carries', emoji: '📦', meaning: '攜帶', rule: 'y-to-ies' },
  { base: 'read', thirdPerson: 'reads', emoji: '📖', meaning: '閱讀', rule: 'add-s' },
  { base: 'study', thirdPerson: 'studies', emoji: '📚', meaning: '學習', rule: 'y-to-ies' },
  { base: 'wash', thirdPerson: 'washes', emoji: '🧼', meaning: '洗', rule: 'add-es' },
  { base: 'watch', thirdPerson: 'watches', emoji: '📺', meaning: '看', rule: 'add-es' },
  { base: 'play', thirdPerson: 'plays', emoji: '🎮', meaning: '玩', rule: 'add-s' },
  { base: 'cook', thirdPerson: 'cooks', emoji: '👨‍🍳', meaning: '煮', rule: 'add-s' }
];

// 課程資料
export const p2Lesson = {
  id: 'p2-l1',
  title: 'Unit 1: Helping at Home',
  titleZh: '第一課：在家幫忙',
  description: '學習形容詞、家務動詞同第三人稱變化',
  vocabCount: p2Vocabulary.length,
  sentenceCount: 10, // 5個原有 + 5個新增
  verbCount: p2Verbs.length
};

// 打亂字母生成拼字遊戲題目
export function scrambleWord(word: string): string {
  const letters = word.toLowerCase().split('').filter(c => c !== ' ' && c !== '-');
  // Fisher-Yates shuffle
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  // 確保打亂後不同於原字（如果可能）
  const scrambled = letters.join('');
  if (scrambled === word.toLowerCase().replace(/[ -]/g, '') && letters.length > 1) {
    return scrambleWord(word); // 重新打亂
  }
  return scrambled;
}
