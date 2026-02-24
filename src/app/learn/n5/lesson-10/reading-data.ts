/**
 * 第10課閱讀理解數據
 * Lesson 10 Reading Comprehension
 * 
 * 只用第1-10課的詞彙和文法
 * 主題：存在、位置、動物
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson10Reading: ReadingPassage[] = [
  {
    id: '10-1',
    lessonId: 10,
    unitId: 1,
    title: 'わたしの部屋',
    japanese: 'わたしの部屋に机といすがあります。机の上に本とコンピューターがあります。いすの下にねこがいます。',
    cantonese: '我房入面有枱同埋櫈。枱上面有書同電腦。櫈下面有貓。',
    vocabFromLessons: [1, 2, 3, 6, 10],
    difficulty: 'easy',
    questions: [
      {
        id: '10-1-q1',
        question: '部屋に何がありますか。',
        questionCn: '房入面有什麼？',
        options: ['ベッドとテレビ', 'つくえといす', 'たなとドア', 'まどとポスト'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「部屋に机といすがあります」，所以有枱同櫈。',
      },
      {
        id: '10-1-q2',
        question: '机の上に何がありますか。',
        questionCn: '枱上面有什麼？',
        options: ['ねこ', 'ほんとコンピューター', 'いす', 'たな'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「机の上に本とコンピューターがあります」，所以有書同電腦。',
      },
      {
        id: '10-1-q3',
        question: 'ねこはどこにいますか。',
        questionCn: '貓喺邊度？',
        options: ['机の上', 'いすの下', '部屋の外', 'たなの中'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「いすの下にねこがいます」，所以貓喺櫈下面。',
      },
    ],
  },
  {
    id: '10-2',
    lessonId: 10,
    unitId: 2,
    title: '公園に',
    japanese: 'こうえんに子供がたくさんいます。男の子がいます。女の子もいます。みんないぬとあそんでいます。',
    cantonese: '公園度有好多細路。有男仔。有女仔。大家都喺度同狗玩。',
    vocabFromLessons: [1, 6, 10],
    difficulty: 'easy',
    questions: [
      {
        id: '10-2-q1',
        question: 'こうえんにだれがいますか。',
        questionCn: '公園度有咩人？',
        options: ['かぞく', 'こども', 'りゅうがくせい', 'かいしゃいん'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「こうえんに子供がたくさんいます」，所以有細路。',
      },
      {
        id: '10-2-q2',
        question: '何とあそんでいますか。',
        questionCn: '同什麼玩？',
        options: ['ねこ', 'いぬ', 'とり', 'さかな'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「みんないぬとあそんでいます」，所以同狗玩。',
      },
    ],
  },
  {
    id: '10-3',
    lessonId: 10,
    unitId: 3,
    title: 'コンビニ',
    japanese: 'このコンビニのとなりに銀行があります。銀行の前にATMがあります。コンビニのうしろに公園があります。',
    cantonese: '呢間便利店隔離有銀行。銀行前面有櫃員機。便利店後面有公園。',
    vocabFromLessons: [2, 3, 10],
    difficulty: 'medium',
    questions: [
      {
        id: '10-3-q1',
        question: 'コンビニのとなりに何がありますか。',
        questionCn: '便利店隔離有什麼？',
        options: ['こうえん', 'ぎんこう', 'びょういん', 'がっこう'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「コンビニのとなりに銀行があります」，所以隔離有銀行。',
      },
      {
        id: '10-3-q2',
        question: 'ATMはどこにありますか。',
        questionCn: '櫃員機喺邊度？',
        options: ['コンビニの中', 'ぎんこうのまえ', 'こうえんの中', 'みちの上'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「銀行の前にATMがあります」，所以喺銀行前面。',
      },
    ],
  },
];
