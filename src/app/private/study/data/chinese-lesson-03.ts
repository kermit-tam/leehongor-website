import { StudyCard } from './types';

/**
 * 第三課：家人與描述
 * 
 * 10 個新字，配合前兩課組成家庭相關句子
 */

export const chineseLesson03Cards: StudyCard[] = [
  {
    id: 'ch-03-001',
    subject: 'chinese',
    lessonId: 'ch-03',
    character: '哥',
    pinyin: 'gē',
    jyutping: 'go1',
    strokes: 10,
    meaning: '哥哥、兄長',
    category: '家人',
    image: '/images/study/brother-old.png',
    isPicturable: true,
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '哥哥在家。', 
        written: '哥哥在家。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '我和哥哥。', 
        written: '我和哥哥。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '哥哥去了山上。', 
        written: '哥哥去了山上。' 
      },
    ],
  },
  {
    id: 'ch-03-002',
    subject: 'chinese',
    lessonId: 'ch-03',
    character: '姐',
    pinyin: 'jiě',
    jyutping: 'ze2',
    strokes: 8,
    meaning: '姐姐、姊姊',
    category: '家人',
    isPicturable: true,
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '姐姐在家。', 
        written: '姐姐在家。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '姐姐和我。', 
        written: '姐姐和我。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '姐姐沒有走。', 
        written: '姐姐沒有走。' 
      },
    ],
  },
  {
    id: 'ch-03-003',
    subject: 'chinese',
    lessonId: 'ch-03',
    character: '弟',
    pinyin: 'dì',
    jyutping: 'dai6',
    strokes: 7,
    meaning: '弟弟',
    category: '家人',
    isPicturable: true,
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '弟弟在家。', 
        written: '弟弟在家。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '我和弟弟在山中。', 
        written: '我和弟弟在山中。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '弟弟沒有去。', 
        written: '弟弟沒有去。' 
      },
    ],
  },
  {
    id: 'ch-03-004',
    subject: 'chinese',
    lessonId: 'ch-03',
    character: '妹',
    pinyin: 'mèi',
    jyutping: 'mui6',
    strokes: 8,
    meaning: '妹妹',
    category: '家人',
    isPicturable: true,
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '妹妹在家。', 
        written: '妹妹在家。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '妹妹和我。', 
        written: '妹妹和我。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '妹妹沒有走。', 
        written: '妹妹沒有走。' 
      },
    ],
  },
  {
    id: 'ch-03-005',
    subject: 'chinese',
    lessonId: 'ch-03',
    character: '叔',
    pinyin: 'shū',
    jyutping: 'suk1',
    strokes: 8,
    meaning: '叔叔、叔父',
    category: '家人',
    isPicturable: true,
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '叔叔在家。', 
        written: '叔叔在家。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '叔叔去了山上。', 
        written: '叔叔去了山上。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '叔叔和我。', 
        written: '叔叔和我。' 
      },
    ],
  },
  {
    id: 'ch-03-006',
    subject: 'chinese',
    lessonId: 'ch-03',
    character: '愛',
    pinyin: 'ài',
    jyutping: 'oi3',
    strokes: 13,
    meaning: '愛、喜愛',
    category: '動詞',
    image: '/images/study/love.png',
    isPicturable: true,  // 愛心圖片常用
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '我愛爸爸媽媽。', 
        written: '我愛爸爸媽媽。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '我愛家。', 
        written: '我愛家。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '爸爸愛我。', 
        written: '爸爸愛我。' 
      },
    ],
  },
  {
    id: 'ch-03-007',
    subject: 'chinese',
    lessonId: 'ch-03',
    character: '打',
    pinyin: 'dǎ',
    jyutping: 'daa2',
    strokes: 5,
    meaning: '打、敲打',
    category: '動詞',
    isPicturable: true,  // 動作可用圖片
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '我沒有打人。', 
        written: '我沒有打人。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '哥哥打我。', 
        written: '哥哥打我。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '你在打弟弟。', 
        written: '你在打弟弟。' 
      },
    ],
  },
  {
    id: 'ch-03-008',
    subject: 'chinese',
    lessonId: 'ch-03',
    character: '很',
    pinyin: 'hěn',
    jyutping: 'han2',
    strokes: 9,
    meaning: '很、非常',
    category: '副詞',
    isPicturable: false,  // 程度副詞抽象
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '山很高。', 
        written: '山很高。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '我很快樂。', 
        written: '我很高興。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '叔叔很高。', 
        written: '叔叔很高。' 
      },
    ],
  },
  {
    id: 'ch-03-009',
    subject: 'chinese',
    lessonId: 'ch-03',
    character: '高',
    pinyin: 'gāo',
    jyutping: 'gou1',
    strokes: 10,
    meaning: '高、 tall',
    category: '形容詞',
    isPicturable: true,  // 高可用圖片（高山、高個子）
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '山很高。', 
        written: '山很高。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '哥哥很高。', 
        written: '哥哥很高。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '山上沒有很高的草。', 
        written: '山上沒有很高的草。' 
      },
    ],
  },
  {
    id: 'ch-03-010',
    subject: 'chinese',
    lessonId: 'ch-03',
    character: '的',
    pinyin: 'de',
    jyutping: 'dik1',
    strokes: 8,
    meaning: '的、助詞',
    category: '助詞',
    isPicturable: false,  // 助詞抽象
    examples: [
      { 
        id: '1', 
        scenario: '短句', 
        spoken: '我的家。', 
        written: '我的家。' 
      },
      { 
        id: '2', 
        scenario: '短句', 
        spoken: '山上的草。', 
        written: '山上的草。' 
      },
      { 
        id: '3', 
        scenario: '短句', 
        spoken: '我的哥哥。', 
        written: '我的哥哥。' 
      },
    ],
  },
];

/**
 * 三課組合句子
 */
export const lesson03Combinations = [
  // 家人組合
  { chars: ['哥', '哥', '在', '家'], phrase: '哥哥在家', meaning: '哥哥在家' },
  { chars: ['姐', '姐', '在', '家'], phrase: '姐姐在家', meaning: '姐姐在家' },
  { chars: ['弟', '弟', '在', '家'], phrase: '弟弟在家', meaning: '弟弟在家' },
  { chars: ['妹', '妹', '在', '家'], phrase: '妹妹在家', meaning: '妹妹在家' },
  { chars: ['叔', '叔', '在', '家'], phrase: '叔叔在家', meaning: '叔叔在家' },
  
  // 描述句子
  { chars: ['山', '很', '高'], phrase: '山很高', meaning: '山很高' },
  { chars: ['哥', '哥', '很', '高'], phrase: '哥哥很高', meaning: '哥哥很高' },
  { chars: ['叔', '叔', '很', '高'], phrase: '叔叔很高', meaning: '叔叔很高' },
  
  // 愛的句子
  { chars: ['我', '愛', '爸', '爸'], phrase: '我愛爸爸', meaning: '我愛爸爸' },
  { chars: ['我', '愛', '媽', '媽'], phrase: '我愛媽媽', meaning: '我愛媽媽' },
  { chars: ['我', '愛', '家'], phrase: '我愛家', meaning: '我愛家' },
  { chars: ['我', '愛', '哥', '哥'], phrase: '我愛哥哥', meaning: '我愛哥哥' },
  
  // 的家人
  { chars: ['我', '的', '家'], phrase: '我的家', meaning: '我的家' },
  { chars: ['我', '的', '哥', '哥'], phrase: '我的哥哥', meaning: '我的哥哥' },
  { chars: ['山', '上', '的', '草'], phrase: '山上的草', meaning: '山上的草' },
  { chars: ['家', '裏', '的', '人'], phrase: '家裏的人', meaning: '家裏的人' },
  
  // 行動句子
  { chars: ['我', '沒', '有', '打', '人'], phrase: '我沒有打人', meaning: '我沒有打人' },
  { chars: ['哥', '哥', '沒', '有', '打', '我'], phrase: '哥哥沒有打我', meaning: '哥哥沒有打我' },
  { chars: ['弟', '弟', '去', '山', '上'], phrase: '弟弟去山上', meaning: '弟弟去山上' },
  { chars: ['妹', '妹', '在', '山', '中'], phrase: '妹妹在山中', meaning: '妹妹在山中' },
  
  // 家庭組合
  { chars: ['我', '和', '哥', '哥', '在', '家'], phrase: '我和哥哥在家', meaning: '我和哥哥在家' },
  { chars: ['姐', '姐', '和', '妹', '妹'], phrase: '姐姐和妹妹', meaning: '姐姐和妹妹' },
  { chars: ['爸', '爸', '媽', '媽', '和', '我'], phrase: '爸爸媽媽和我', meaning: '爸爸媽媽和我' },
  { chars: ['叔', '叔', '沒', '有', '來'], phrase: '叔叔沒有來', meaning: '叔叔沒有來' },
  
  // 複雜句子
  { chars: ['我', '的', '哥', '哥', '很', '高'], phrase: '我的哥哥很高', meaning: '我的哥哥很高' },
  { chars: ['山', '上', '的', '草', '很', '高'], phrase: '山上的草很高', meaning: '山上的草很高' },
  { chars: ['我', '愛', '我', '的', '家'], phrase: '我愛我的家', meaning: '我愛我的家' },
  { chars: ['家', '裏', '沒', '有', '人'], phrase: '家裏沒有人', meaning: '家裏沒有人' },
];
