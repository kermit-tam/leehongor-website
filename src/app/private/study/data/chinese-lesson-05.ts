import { StudyCard } from './types';

// 第五課：形容詞（你新增的漂亮、獎券）
export const chineseLesson05Cards: StudyCard[] = [
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
