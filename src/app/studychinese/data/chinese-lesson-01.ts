import { StudyCard } from './types';

/**
 * 基礎十字
 * 
 * 10 個基礎單字，可以組合成詞語和短句
 * 類似 LEGO 積木概念，讓小朋友學會組合運用
 */

export const chineseLesson01Cards: StudyCard[] = [
  {
    id: 'ch-01-001',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '山',
    pinyin: 'shān',
    jyutping: 'saan1',
    strokes: 3,
    meaning: '山、山嶽',
    category: '自然',
    image: '/images/study/mountain.png',
    isPicturable: true,
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '山上有牛。', 
        written: '山上有牛。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '我在山上。', 
        written: '我在山上。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '山下有人。', 
        written: '山下有人。' 
      },
    ],
  },
  {
    id: 'ch-01-002',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '水',
    pinyin: 'shuǐ',
    jyutping: 'seoi2',
    strokes: 4,
    meaning: '水、液體',
    category: '自然',
    image: '/images/study/water.png',
    isPicturable: true,
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '水上有山。', 
        written: '水上有山。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '山下有水。', 
        written: '山下有水。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '水中有草。', 
        written: '水中有水草。' 
      },
    ],
  },
  {
    id: 'ch-01-003',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '上',
    pinyin: 'shàng',
    jyutping: 'soeng6',
    strokes: 3,
    meaning: '上面、向上',
    category: '方位',
    isPicturable: false,  // 方位較難用圖片表示
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '山上有牛。', 
        written: '山上有牛。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '牛上有人。', 
        written: '牛上有人。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '我上有水。', 
        written: '我上面有水。' 
      },
    ],
  },
  {
    id: 'ch-01-004',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '下',
    pinyin: 'xià',
    jyutping: 'haa6',
    strokes: 3,
    meaning: '下面、向下',
    category: '方位',
    isPicturable: false,
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '山下有水。', 
        written: '山下有水。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '你在我下面。', 
        written: '你在我下面。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '水下有人。', 
        written: '水下有人。' 
      },
    ],
  },
  {
    id: 'ch-01-005',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '我',
    pinyin: 'wǒ',
    jyutping: 'ngo5',
    strokes: 7,
    meaning: '我、自己',
    category: '代詞',
    isPicturable: false,  // 代詞較難用圖片
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '我在山上。', 
        written: '我在山上。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '我在牛上。', 
        written: '我在牛上。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '我有水。', 
        written: '我有水。' 
      },
    ],
  },
  {
    id: 'ch-01-006',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '你',
    pinyin: 'nǐ',
    jyutping: 'nei5',
    strokes: 7,
    meaning: '你、對方',
    category: '代詞',
    isPicturable: false,
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '你在水上。', 
        written: '你在水上。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '你在山下。', 
        written: '你在山下。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '你有人。', 
        written: '你有人。（你有伴）' 
      },
    ],
  },
  {
    id: 'ch-01-007',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '在',
    pinyin: 'zài',
    jyutping: 'zoi6',
    strokes: 6,
    meaning: '在、喺',
    category: '動詞',
    isPicturable: false,  // 抽象動詞
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '我在山上。', 
        written: '我在山上。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '牛在水上。', 
        written: '牛在水上。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '人在牛上。', 
        written: '人在牛上。' 
      },
    ],
  },
  {
    id: 'ch-01-008',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '有',
    pinyin: 'yǒu',
    jyutping: 'jau5',
    strokes: 6,
    meaning: '有、存在',
    category: '動詞',
    isPicturable: false,
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '山上有牛。', 
        written: '山上有牛。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '山上有人。', 
        written: '山上有人。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '我有水。', 
        written: '我有水。' 
      },
    ],
  },
  {
    id: 'ch-01-009',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '人',
    pinyin: 'rén',
    jyutping: 'jan4',
    strokes: 2,
    meaning: '人、人類',
    category: '人物',
    isPicturable: true,
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '山上有人。', 
        written: '山上有人。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '人在牛上。', 
        written: '人在牛上。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '你有人。', 
        written: '你有人。（你有伴）' 
      },
    ],
  },
  {
    id: 'ch-01-010',
    subject: 'chinese',
    lessonId: 'ch-01',
    character: '牛',
    pinyin: 'niú',
    jyutping: 'ngau4',
    strokes: 4,
    meaning: '牛、黃牛',
    category: '動物',
    image: '/images/study/cow.png',
    isPicturable: true,
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '山上有牛。', 
        written: '山上有牛。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '我在牛上。', 
        written: '我在牛上。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '牛上有人。', 
        written: '牛上有人。' 
      },
    ],
  },
];

/**
 * 基礎十字可以組合的短句示例
 */
export const lesson01Combinations = [
  // 兩字詞語
  { chars: ['山', '上'], phrase: '山上', meaning: '山上面' },
  { chars: ['山', '下'], phrase: '山下', meaning: '山下面' },
  { chars: ['水', '上'], phrase: '水上', meaning: '水上面' },
  { chars: ['水', '下'], phrase: '水下', meaning: '水下面' },
  
  // 短句
  { chars: ['山', '上', '有', '牛'], phrase: '山上有牛', meaning: '山上面有牛' },
  { chars: ['我', '在', '山', '上'], phrase: '我在山上', meaning: '我在山上面' },
  { chars: ['我', '在', '牛', '上'], phrase: '我在牛上', meaning: '我在牛上面（騎牛）' },
  { chars: ['你', '在', '水', '上'], phrase: '你在水上', meaning: '你在水上面（划船）' },
  { chars: ['山', '上', '有', '人'], phrase: '山上有人', meaning: '山上面有人' },
  { chars: ['水', '下', '有', '人'], phrase: '水下有人', meaning: '水下面有人（潛水）' },
  { chars: ['牛', '上', '有', '人'], phrase: '牛上有人', meaning: '牛上面有人（騎牛）' },
  { chars: ['你', '在', '山', '下'], phrase: '你在山下', meaning: '你在山下面' },
  { chars: ['山', '下', '有', '水'], phrase: '山下有水', meaning: '山下面有水' },
  { chars: ['人', '在', '牛', '上'], phrase: '人在牛上', meaning: '人在牛上面' },
  { chars: ['牛', '在', '水', '上'], phrase: '牛在水上', meaning: '牛在水上面' },
  { chars: ['我', '有', '水'], phrase: '我有水', meaning: '我擁有水' },
];
