/**
 * 仔仔溫書數據
 * Kids Study Data
 * 
 * 結構：
 * - 中文：分課（每課約10-15字），另有基礎漢字
 * - 英文：獨立課程
 * - 每個生字有3個情景例句（口語+書面語對比）
 */

// ==================== 類型定義 ====================

export interface ExamplePair {
  id: string;           // 情景ID
  scenario: string;     // 情景名稱（例如：衣服、風景）
  spoken: string;       // 口語（粵語）
  written: string;      // 書面語（正式中文）
}

export interface StudyCard {
  id: string;
  subject: 'chinese' | 'english';
  lessonId?: string;    // 所屬課程（如 "ch-01"）
  isBasic?: boolean;    // 是否基礎漢字
  
  // 中文用
  character?: string;
  pinyin?: string;      // 普通話拼音
  jyutping?: string;    // 粵拼
  strokes?: number;
  
  // 英文用
  word?: string;
  phonetic?: string;
  
  // 共用
  meaning: string;
  examples: ExamplePair[];  // 3個情景例句
  category: string;
}

export interface Lesson {
  id: string;
  subject: 'chinese' | 'english';
  title: string;
  description: string;
  order: number;
  cardCount: number;
}

// ==================== 中文課程 ====================

export const chineseLessons: Lesson[] = [
  { id: 'ch-basic', subject: 'chinese', title: '基礎漢字', description: '最常用的基礎漢字，識咗就易學啲', order: 0, cardCount: 15 },
  { id: 'ch-01', subject: 'chinese', title: '第一課：自然', description: '花草樹木、天氣相關', order: 1, cardCount: 8 },
  { id: 'ch-02', subject: 'chinese', title: '第二課：家庭', description: '家人稱謂', order: 2, cardCount: 5 },
  { id: 'ch-03', subject: 'chinese', title: '第三課：學校', description: '學習用品、學校生活', order: 3, cardCount: 5 },
  { id: 'ch-04', subject: 'chinese', title: '第四課：顏色', description: '顏色詞彙', order: 4, cardCount: 6 },
  { id: 'ch-05', subject: 'chinese', title: '第五課：形容詞', description: '常用形容詞', order: 5, cardCount: 2 },
];

// ==================== 中文生字 ====================

export const chineseCards: StudyCard[] = [
  // ===== 基礎漢字 =====
  {
    id: 'ch-basic-001',
    subject: 'chinese',
    isBasic: true,
    character: '的',
    pinyin: 'de',
    jyutping: 'dik1',
    strokes: 8,
    meaning: '的（助詞）',
    category: '助詞',
    examples: [
      { id: '1', scenario: '擁有', spoken: '呢個係我嘅書。', written: '這是我的書。' },
      { id: '2', scenario: '形容', spoken: '紅色嘅花好靚。', written: '紅色的花很漂亮。' },
      { id: '3', scenario: '關係', spoken: '佢係我嘅朋友。', written: '他是我的朋友。' },
    ],
  },
  {
    id: 'ch-basic-002',
    subject: 'chinese',
    isBasic: true,
    character: '是',
    pinyin: 'shì',
    jyutping: 'si6',
    strokes: 9,
    meaning: '是、係',
    category: '動詞',
    examples: [
      { id: '1', scenario: '身份', spoken: '我係學生。', written: '我是學生。' },
      { id: '2', scenario: '時間', spoken: '今日係星期一。', written: '今天是星期一。' },
      { id: '3', scenario: '確認', spoken: '呢個係我嘅。', written: '這是我的。' },
    ],
  },
  {
    id: 'ch-basic-003',
    subject: 'chinese',
    isBasic: true,
    character: '了',
    pinyin: 'le',
    jyutping: 'liu5',
    strokes: 2,
    meaning: '了（完成）',
    category: '助詞',
    examples: [
      { id: '1', scenario: '完成', spoken: '我食咗飯。', written: '我吃飯了。' },
      { id: '2', scenario: '變化', spoken: '佢大個咗。', written: '他長大了。' },
      { id: '3', scenario: '動作', spoken: '我做完功課咗。', written: '我做完功課了。' },
    ],
  },
  {
    id: 'ch-basic-004',
    subject: 'chinese',
    isBasic: true,
    character: '在',
    pinyin: 'zài',
    jyutping: 'zoi6',
    strokes: 6,
    meaning: '在、喺',
    category: '動詞/介詞',
    examples: [
      { id: '1', scenario: '位置', spoken: '我喺學校。', written: '我在學校。' },
      { id: '2', scenario: '進行', spoken: '佢喺度食緊飯。', written: '他正在吃飯。' },
      { id: '3', scenario: '存在', spoken: '本書喺枱上面。', written: '書在桌子上。' },
    ],
  },
  {
    id: 'ch-basic-005',
    subject: 'chinese',
    isBasic: true,
    character: '有',
    pinyin: 'yǒu',
    jyutping: 'jau5',
    strokes: 6,
    meaning: '有',
    category: '動詞',
    examples: [
      { id: '1', scenario: '擁有', spoken: '我有一本書。', written: '我有一本書。' },
      { id: '2', scenario: '存在', spoken: '度有人。', written: '這裏有人。' },
      { id: '3', scenario: '發生', spoken: '我今日有事。', written: '我今天有事。' },
    ],
  },

  // ===== 第一課：自然 =====
  {
    id: 'ch-001',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '花',
    pinyin: 'huā',
    jyutping: 'faa1',
    strokes: 7,
    meaning: '花朵',
    category: '自然',
    examples: [
      { id: '1', scenario: '欣賞', spoken: '呢朵花好靚！', written: '這朵花十分漂亮。' },
      { id: '2', scenario: '種植', spoken: '我種咗盆花。', written: '我種了一盆花。' },
      { id: '3', scenario: '送禮', spoken: '我買咗束花俾媽媽。', written: '我買了一束花給媽媽。' },
    ],
  },
  {
    id: 'ch-002',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '草',
    pinyin: 'cǎo',
    jyutping: 'cou2',
    strokes: 9,
    meaning: '草',
    category: '自然',
    examples: [
      { id: '1', scenario: '草地', spoken: '草地好綠呀！', written: '草地十分翠綠。' },
      { id: '2', scenario: '動物', spoken: '羊仔食緊草。', written: '小羊正在吃草。' },
      { id: '3', scenario: '公園', spoken: '公園嘅草好軟。', written: '公園的草很柔軟。' },
    ],
  },
  {
    id: 'ch-003',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '樹',
    pinyin: 'shù',
    jyutping: 'syu6',
    strokes: 16,
    meaning: '樹木',
    category: '自然',
    examples: [
      { id: '1', scenario: '乘涼', spoken: '大樹下好涼快。', written: '大樹下很涼快。' },
      { id: '2', scenario: '高度', spoken: '呢棵樹好高呀！', written: '這棵樹十分高大。' },
      { id: '3', scenario: '季節', spoken: '秋天樹葉會黃。', written: '秋天樹葉會變黃。' },
    ],
  },
  {
    id: 'ch-004',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '鳥',
    pinyin: 'niǎo',
    jyutping: 'niu5',
    strokes: 11,
    meaning: '鳥類',
    category: '自然',
    examples: [
      { id: '1', scenario: '飛行', spoken: '小鳥喺天度飛。', written: '小鳥在天上飛。' },
      { id: '2', scenario: '聲音', spoken: '聽到雀仔叫聲。', written: '聽到小鳥的叫聲。' },
      { id: '3', scenario: '觀察', spoken: '樹上面有隻鳥。', written: '樹上有一隻鳥。' },
    ],
  },
  {
    id: 'ch-005',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '雲',
    pinyin: 'yún',
    jyutping: 'wan4',
    strokes: 12,
    meaning: '雲朵',
    category: '自然',
    examples: [
      { id: '1', scenario: '形狀', spoken: '朵雲好似棉花糖。', written: '那朵雲好像棉花糖。' },
      { id: '2', scenario: '顏色', spoken: '白雲喺藍天度。', written: '白雲在藍天上。' },
      { id: '3', scenario: '天氣', spoken: '多雲會落雨。', written: '多雲會下雨。' },
    ],
  },
  {
    id: 'ch-006',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '雨',
    pinyin: 'yǔ',
    jyutping: 'jyu5',
    strokes: 8,
    meaning: '雨水',
    category: '自然',
    examples: [
      { id: '1', scenario: '天氣', spoken: '落緊大雨呀！', written: '正在下大雨！' },
      { id: '2', scenario: '用具', spoken: '記得帶遮呀！', written: '記得帶雨傘！' },
      { id: '3', scenario: '感覺', spoken: '雨聲好舒服。', written: '雨聲令人舒服。' },
    ],
  },
  {
    id: 'ch-007',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '雪',
    pinyin: 'xuě',
    jyutping: 'syut3',
    strokes: 11,
    meaning: '雪花',
    category: '自然',
    examples: [
      { id: '1', scenario: '玩耍', spoken: '下雪可以堆雪人！', written: '下雪可以堆雪人！' },
      { id: '2', scenario: '顏色', spoken: '地上白雪雪。', written: '地上白茫茫一片。' },
      { id: '3', scenario: '寒冷', spoken: '落雪好凍呀！', written: '下雪時十分寒冷。' },
    ],
  },

  // ===== 第二課：家庭 =====
  {
    id: 'ch-009',
    subject: 'chinese',
    lessonId: 'ch-02',
    character: '爸',
    pinyin: 'bà',
    jyutping: 'baa4',
    strokes: 8,
    meaning: '爸爸',
    category: '家庭',
    examples: [
      { id: '1', scenario: '工作', spoken: '爸爸去上班。', written: '爸爸去上班。' },
      { id: '2', scenario: '稱呼', spoken: '我嗌佢做老豆。', written: '我稱呼他做爸爸。' },
      { id: '3', scenario: '陪伴', spoken: '爸爸同我玩。', written: '爸爸和我一起玩耍。' },
    ],
  },
  {
    id: 'ch-010',
    subject: 'chinese',
    lessonId: 'ch-02',
    character: '媽',
    pinyin: 'mā',
    jyutping: 'maa1',
    strokes: 13,
    meaning: '媽媽',
    category: '家庭',
    examples: [
      { id: '1', scenario: '煮食', spoken: '媽咪煮緊飯。', written: '媽媽正在煮飯。' },
      { id: '2', scenario: '稱呼', spoken: '我錫媽咪。', written: '我親愛媽媽。' },
      { id: '3', scenario: '照顧', spoken: '媽媽照顧我。', written: '媽媽照顧着我。' },
    ],
  },

  // ===== 第五課：形容詞（新增） =====
  {
    id: 'ch-020',
    subject: 'chinese',
    lessonId: 'ch-05',
    character: '漂亮',
    pinyin: 'piào liang',
    jyutping: 'piu1 liang3',
    strokes: 23,
    meaning: '美麗、好看',
    category: '形容詞',
    examples: [
      { id: '1', scenario: '衣服', spoken: '呢條裙好靚！', written: '這條裙子十分漂亮。' },
      { id: '2', scenario: '風景', spoken: '呢度好靚呀！', written: '這裏的風景十分漂亮。' },
      { id: '3', scenario: '人物', spoken: '個女仔好靚！', written: '這位女孩十分漂亮。' },
    ],
  },
  {
    id: 'ch-021',
    subject: 'chinese',
    lessonId: 'ch-05',
    character: '獎券',
    pinyin: 'jiǎng quàn',
    jyutping: 'zoeng2 hyun3',
    strokes: 23,
    meaning: '獎品券、抽獎券',
    category: '生活',
    examples: [
      { id: '1', scenario: '中獎', spoken: '我中咗張獎券！', written: '我抽中了一張獎券。' },
      { id: '2', scenario: '換領', spoken: '用呢張券換禮物！', written: '這張獎券可以換領禮物。' },
      { id: '3', scenario: '學校', spoken: '老師派咗張獎券俾我！', written: '老師派發了一張獎券給我。' },
    ],
  },
];

// ==================== 英文課程 ====================

export const englishLessons: Lesson[] = [
  { id: 'en-01', subject: 'english', title: 'Lesson 1: Animals', description: 'Common animals', order: 1, cardCount: 6 },
  { id: 'en-02', subject: 'english', title: 'Lesson 2: Colors', description: 'Basic colors', order: 2, cardCount: 6 },
  { id: 'en-03', subject: 'english', title: 'Lesson 3: Numbers', description: 'Numbers 1-10', order: 3, cardCount: 6 },
  { id: 'en-04', subject: 'english', title: 'Lesson 4: Family', description: 'Family members', order: 4, cardCount: 4 },
  { id: 'en-05', subject: 'english', title: 'Lesson 5: Fruits', description: 'Common fruits', order: 5, cardCount: 3 },
];

// ==================== 英文詞彙 ====================

export const englishCards: StudyCard[] = [
  // Lesson 1: Animals
  {
    id: 'en-001',
    subject: 'english',
    lessonId: 'en-01',
    word: 'cat',
    phonetic: '/kæt/',
    meaning: '貓',
    category: 'Animals',
    examples: [
      { id: '1', scenario: 'Pet', spoken: 'I have a cat.', written: 'I have a pet cat.' },
      { id: '2', scenario: 'Action', spoken: 'The cat is sleeping.', written: 'The cat is sleeping quietly.' },
      { id: '3', scenario: 'Description', spoken: 'It\'s a cute cat.', written: 'It is a cute black cat.' },
    ],
  },
  {
    id: 'en-002',
    subject: 'english',
    lessonId: 'en-01',
    word: 'dog',
    phonetic: '/dɒɡ/',
    meaning: '狗',
    category: 'Animals',
    examples: [
      { id: '1', scenario: 'Pet', spoken: 'I like dogs.', written: 'I like pet dogs.' },
      { id: '2', scenario: 'Action', spoken: 'The dog is running.', written: 'The dog is running fast.' },
      { id: '3', scenario: 'Size', spoken: 'It\'s a big dog.', written: 'It is a big brown dog.' },
    ],
  },
  {
    id: 'en-003',
    subject: 'english',
    lessonId: 'en-01',
    word: 'bird',
    phonetic: '/bɜːd/',
    meaning: '鳥',
    category: 'Animals',
    examples: [
      { id: '1', scenario: 'Ability', spoken: 'Birds can fly.', written: 'Birds can fly in the sky.' },
      { id: '2', scenario: 'Sound', spoken: 'The bird is singing.', written: 'The bird is singing beautifully.' },
      { id: '3', scenario: 'Location', spoken: 'Birds are in the tree.', written: 'The birds are in the tall tree.' },
    ],
  },

  // Lesson 2: Colors
  {
    id: 'en-007',
    subject: 'english',
    lessonId: 'en-02',
    word: 'red',
    phonetic: '/red/',
    meaning: '紅色',
    category: 'Colors',
    examples: [
      { id: '1', scenario: 'Object', spoken: 'The apple is red.', written: 'The apple is bright red.' },
      { id: '2', scenario: 'Preference', spoken: 'I like red.', written: 'My favorite color is red.' },
      { id: '3', scenario: 'Clothes', spoken: 'I have a red shirt.', written: 'I am wearing a red shirt.' },
    ],
  },
  {
    id: 'en-008',
    subject: 'english',
    lessonId: 'en-02',
    word: 'blue',
    phonetic: '/bluː/',
    meaning: '藍色',
    category: 'Colors',
    examples: [
      { id: '1', scenario: 'Nature', spoken: 'The sky is blue.', written: 'The sky is clear and blue.' },
      { id: '2', scenario: 'Ocean', spoken: 'The sea is blue.', written: 'The sea is deep blue.' },
      { id: '3', scenario: 'Clothes', spoken: 'I like blue jeans.', written: 'I am wearing blue jeans.' },
    ],
  },

  // Lesson 3: Numbers
  {
    id: 'en-013',
    subject: 'english',
    lessonId: 'en-03',
    word: 'one',
    phonetic: '/wʌn/',
    meaning: '一',
    category: 'Numbers',
    examples: [
      { id: '1', scenario: 'Counting', spoken: 'I have one pen.', written: 'I have one blue pen.' },
      { id: '2', scenario: 'Age', spoken: 'I am number one.', written: 'I am the first one.' },
      { id: '3', scenario: 'Time', spoken: 'It\'s one o\'clock.', written: 'It is one o\'clock now.' },
    ],
  },
  {
    id: 'en-014',
    subject: 'english',
    lessonId: 'en-03',
    word: 'two',
    phonetic: '/tuː/',
    meaning: '二',
    category: 'Numbers',
    examples: [
      { id: '1', scenario: 'Body', spoken: 'I have two eyes.', written: 'I have two big eyes.' },
      { id: '2', scenario: 'Counting', spoken: 'I have two books.', written: 'I have two story books.' },
      { id: '3', scenario: 'Family', spoken: 'I have two sisters.', written: 'I have two younger sisters.' },
    ],
  },
];

// ==================== 工具函數 ====================

export const getCardsByLesson = (lessonId: string): StudyCard[] => {
  return [...chineseCards, ...englishCards].filter(c => c.lessonId === lessonId);
};

export const getBasicChineseCards = (): StudyCard[] => {
  return chineseCards.filter(c => c.isBasic);
};

export const getAllLessons = (subject: 'chinese' | 'english'): Lesson[] => {
  return subject === 'chinese' ? chineseLessons : englishLessons;
};

export const getAllCards = (): StudyCard[] => [...chineseCards, ...englishCards];
