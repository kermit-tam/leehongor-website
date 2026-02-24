/**
 * 第12課閱讀理解數據
 * Lesson 12 Reading Comprehension
 * 
 * 只用第1-12課的詞彙和文法
 * 主題：形容詞比較、季節、日本料理、旅遊
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson12Reading: ReadingPassage[] = [
  {
    id: '12-1',
    lessonId: 12,
    unitId: 1,
    title: 'レストランで',
    japanese: 'A：このレストランのてんぷらはおいしいですか。B：いいえ、あまりおいしくありません。すしのほうがおいしいです。A：すしはたかいですか。B：いいえ、てんぷらよりやすいです。',
    cantonese: 'A：呢間餐廳嘅天婦羅好唔好食？B：唔係，唔係幾好食。壽司嗰邊好食啲。A：壽司貴唔貴？B：唔係，比天婦羅平。',
    vocabFromLessons: [1, 3, 4, 6, 12],
    difficulty: 'easy',
    questions: [
      {
        id: '12-1-q1',
        question: 'どの料理がいちばんおいしいですか。',
        questionCn: '邊道菜最好食？',
        options: ['てんぷら', 'すし', 'ラーメン', 'カレー'],
        correctIndex: 1,
        type: 'detail',
        explanation: 'B說「すしのほうがおいしいです」，所以壽司比較好食。',
      },
      {
        id: '12-1-q2',
        question: 'すしはたかいですか。',
        questionCn: '壽司貴唔貴？',
        options: ['はい、たかいです', 'いいえ、やすいです', 'いいえ、てんぷらよりたかいです', 'わかりません'],
        correctIndex: 1,
        type: 'detail',
        explanation: 'B說「いいえ、てんぷらよりやすいです」，所以壽司平過天婦羅。',
      },
    ],
  },
  {
    id: '12-2',
    lessonId: 12,
    unitId: 2,
    title: '季節について',
    japanese: 'わたしはふゆがいちばん好きです。ふゆはさむいですが、ゆきが見られます。なつはあつくて、すずしくありません。はるとあきはどちらもすてきです。',
    cantonese: '我最鍾意冬天。冬天雖然凍，但可以睇到雪。夏天好熱，唔涼快。春天同秋天兩個都好靚。',
    vocabFromLessons: [4, 5, 8, 12],
    difficulty: 'medium',
    questions: [
      {
        id: '12-2-q1',
        question: 'いちばん好きな季節は何ですか。',
        questionCn: '最鍾意邊個季節？',
        options: ['はる', 'なつ', 'あき', 'ふゆ'],
        correctIndex: 3,
        type: 'detail',
        explanation: '文章說「ふゆがいちばん好きです」，所以最鍾意冬天。',
      },
      {
        id: '12-2-q2',
        question: 'なつはどうですか。',
        questionCn: '夏天點樣？',
        options: ['さむいです', 'すずしいです', 'あつくて、すずしくありません', 'ゆきが見られます'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「なつはあつくて、すずしくありません」，所以夏天好熱，唔涼快。',
      },
      {
        id: '12-2-q3',
        question: 'ふゆに何が見られますか。',
        questionCn: '冬天可以睇到什麼？',
        options: ['さくら', 'ゆき', 'もみじ', 'うみ'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「ゆきが見られます」，所以冬天可以睇到雪。',
      },
    ],
  },
  {
    id: '12-3',
    lessonId: 12,
    unitId: 3,
    title: '日本へ旅行',
    japanese: 'わたしははじめて日本へ行きます。くうこうからホテルまでどのくらいかかりますか。ホテルはうみからちかいです。きょうととおおさかとどちらがおもしろいですか。',
    cantonese: '我第一次去日本。由機場到酒店要幾耐？酒店離海好近。京都同大阪邊個有趣啲？',
    vocabFromLessons: [3, 4, 5, 6, 10, 12],
    difficulty: 'medium',
    questions: [
      {
        id: '12-3-q1',
        question: '日本へ行くのは何回目ですか。',
        questionCn: '去日本係第幾次？',
        options: ['はじめて', '２かいめ', '３かいめ', 'たくさん'],
        correctIndex: 0,
        type: 'detail',
        explanation: '文章說「はじめて日本へ行きます」，所以係第一次去。',
      },
      {
        id: '12-3-q2',
        question: 'ホテルはどこからちかいですか。',
        questionCn: '酒店離邊度近？',
        options: ['くうこう', 'うみ', 'きょうと', 'おおさか'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「ホテルはうみからちかいです」，所以酒店離海近。',
      },
      {
        id: '12-3-q3',
        question: 'どんな質問がありますか。',
        questionCn: '有咩問題？',
        options: ['ホテルのねだん', 'きょうととおおさか', 'くうこうのばしょ', 'にほんのてんき'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章問「きょうととおおさかとどちらがおもしろいですか」，所以問緊京都同大阪邊個有趣啲。',
      },
    ],
  },
  {
    id: '12-4',
    lessonId: 12,
    unitId: 4,
    title: '肉の比較',
    japanese: 'ぶたにくとぎゅうにくとどちらがすきですか。ぎゅうにくのほうがやすいですが、ぶたにくのほうがかるいです。とりにくはぎゅうにくよりやすいです。わたしはとりにくがいちばん好きです。',
    cantonese: '豬肉同牛肉邊樣鍾意？牛肉嗰邊平啲，但係豬肉嗰邊輕啲。雞肉比牛肉平。我最鍾意雞肉。',
    vocabFromLessons: [6, 12],
    difficulty: 'easy',
    questions: [
      {
        id: '12-4-q1',
        question: 'ぎゅうにくはどうですか。',
        questionCn: '牛肉點樣？',
        options: ['たかくておもい', 'やすくてかるい', 'やすいが、おもい', 'たかくてかるい'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「ぎゅうにくのほうがやすいですが、ぶたにくのほうがかるいです」，即係牛肉平啲但係豬肉輕啲（暗示牛肉重啲）。',
      },
      {
        id: '12-4-q2',
        question: 'いちばんやすいのは何ですか。',
        questionCn: '邊樣最平？',
        options: ['ぶたにく', 'ぎゅうにく', 'とりにく', 'さかな'],
        correctIndex: 2,
        type: 'inference',
        explanation: '文章說「とりにくはぎゅうにくよりやすいです」，而且牛肉平過豬肉，所以雞肉最平。',
      },
      {
        id: '12-4-q3',
        question: 'だれがいちばん好きですか。',
        questionCn: '邊樣最鍾意？',
        options: ['ぶたにく', 'ぎゅうにく', 'とりにく', 'わかりません'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「わたしはとりにくがいちばん好きです」，所以最鍾意雞肉。',
      },
    ],
  },
];
