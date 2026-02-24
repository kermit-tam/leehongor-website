/**
 * 第6課閱讀理解數據
 * Lesson 6 Reading Comprehension
 * 
 * 只用第1-6課的詞彙和文法
 * - 第1課：人稱、職業、國家
 * - 第2課：指示詞、物品
 * - 第3課：場所、地點
 * - 第4課：時間、動詞ます形
 * - 第5課：交通工具、人物
 * - 第6課：食物、日常動詞
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson6Reading: ReadingPassage[] = [
  {
    id: '6-1',
    lessonId: 6,
    unitId: 1,
    title: 'わたしの食事',
    japanese: 'わたしはあさごはんにパンを食べます。ひるごはんは会社でごはんを食べます。ばんごはんはいつもやさいを食べます。',
    cantonese: '我早餐食麵包。午餐喺公司食飯。晚餐成日食菜。',
    vocabFromLessons: [1, 2, 3, 4, 6],
    difficulty: 'easy',
    questions: [
      {
        id: '6-1-q1',
        question: 'あさごはんに何を食べますか。',
        questionCn: '早餐吃什麼？',
        options: ['ごはん', 'パン', 'やさい', 'さかな'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「あさごはんにパンを食べます」，所以早餐吃麵包。',
      },
      {
        id: '6-1-q2',
        question: 'ひるごはんはどこで食べますか。',
        questionCn: '午餐在哪裡吃？',
        options: ['家', '会社', '学校', '喫茶店'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「ひるごはんは会社でごはんを食べます」，所以在公司吃。',
      },
      {
        id: '6-1-q3',
        question: 'ばんごはんに何を食べますか。',
        questionCn: '晚餐吃什麼？',
        options: ['にく', 'パン', 'やさい', 'たまご'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「ばんごはんはいつもやさいを食べます」，所以晚餐吃蔬菜。',
      },
    ],
  },
  {
    id: '6-2',
    lessonId: 6,
    unitId: 2,
    title: 'スーパーで買い物',
    japanese: 'きのうスーパーへ行きました。たまごとやさいを買いました。おちゃも買いました。ぜんぶで千円でした。',
    cantonese: '尋日去超市。買咗蛋同菜。茶都買咗。一共一千日圓。',
    vocabFromLessons: [1, 2, 3, 4, 5, 6],
    difficulty: 'easy',
    questions: [
      {
        id: '6-2-q1',
        question: 'どこへ行きましたか。',
        questionCn: '去了哪裡？',
        options: ['スーパー', 'デパート', 'がっこう', 'びょういん'],
        correctIndex: 0,
        type: 'detail',
        explanation: '文章說「スーパーへ行きました」，所以去了超市。',
      },
      {
        id: '6-2-q2',
        question: '何を買いましたか。',
        questionCn: '買了什麼？',
        options: ['パンとにく', 'たまごとやさい', 'さかなとごはん', 'ビールとみず'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「たまごとやさいを買いました」，所以買了蛋和蔬菜。',
      },
      {
        id: '6-2-q3',
        question: 'いくらでしたか。',
        questionCn: '多少錢？',
        options: ['百円', '五百円', '千円', '一万円'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「ぜんぶで千円でした」，所以一共一千日圓。',
      },
    ],
  },
  {
    id: '6-3',
    lessonId: 6,
    unitId: 3,
    title: '日曜日の一日',
    japanese: 'にちようびのあさ、わたしは本を読みます。ひるに映画を見ます。よるにともだちとビールを飲みます。',
    cantonese: '星期日早上，我睇書。中午睇戲。夜晚同朋友飲啤酒。',
    vocabFromLessons: [1, 2, 3, 4, 5, 6],
    difficulty: 'medium',
    questions: [
      {
        id: '6-3-q1',
        question: 'あさに何をしますか。',
        questionCn: '早上做什麼？',
        options: ['映画を見ます', '本を読みます', 'ビールを飲みます', 'ともだちと会います'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「あさ、わたしは本を読みます」，所以早上看書。',
      },
      {
        id: '6-3-q2',
        question: 'ひるに何をしますか。',
        questionCn: '中午做什麼？',
        options: ['本を読みます', '映画を見ます', 'ビールを飲みます', '買い物をします'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「ひるに映画を見ます」，所以中午看電影。',
      },
      {
        id: '6-3-q3',
        question: 'よるにだれとビールを飲みますか。',
        questionCn: '晚上同誰飲啤酒？',
        options: ['かぞく', 'ともだち', 'せんせい', 'ひとり'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「よるにともだちとビールを飲みます」，所以晚上同朋友飲啤酒。',
      },
    ],
  },
];
