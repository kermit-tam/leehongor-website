/**
 * 第8課閱讀理解數據
 * Lesson 8 Reading Comprehension
 * 
 * 只用第1-8課的詞彙和文法
 * 主題：い形容詞、な形容詞、描述
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson8Reading: ReadingPassage[] = [
  {
    id: '8-1',
    lessonId: 8,
    unitId: 1,
    title: 'このレストラン',
    japanese: 'このレストランはちいさいです。でも、おいしいです。そして、やすいです。わたしはよく行きます。',
    cantonese: '呢間餐廳細細。但係，好食。同埋，平。我成日去。',
    vocabFromLessons: [1, 2, 3, 5, 8],
    difficulty: 'easy',
    questions: [
      {
        id: '8-1-q1',
        question: 'レストランはどんなレストランですか。',
        questionCn: '餐廳係點樣嘅餐廳？',
        options: ['大きくて、高い', '小さくて、安い', '大きくて、安い', '小さくて、高い'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「ちいさいです。でも、おいしいです。そして、やすいです」，所以係細、平。',
      },
      {
        id: '8-1-q2',
        question: '食べ物はどうですか。',
        questionCn: '食物點樣？',
        options: ['まずい', 'おいしい', 'たかい', 'ちいさい'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「おいしいです」，所以好食。',
      },
      {
        id: '8-1-q3',
        question: 'わたしはどうしますか。',
        questionCn: '我點做？',
        options: ['あまり行きません', 'よく行きます', '行きたくありません', 'ともだちと行きます'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「わたしはよく行きます」，所以成日去。',
      },
    ],
  },
  {
    id: '8-2',
    lessonId: 8,
    unitId: 2,
    title: '新しい家',
    japanese: 'わたしの家はあたらしくて、きれいです。へやは広くて、明るいです。でも、ちょっと遠いです。',
    cantonese: '我屋企又新又靚。間房又大又光猛。但係，有啲遠。',
    vocabFromLessons: [1, 3, 4, 8],
    difficulty: 'medium',
    questions: [
      {
        id: '8-2-q1',
        question: '家はどんな家ですか。',
        questionCn: '屋企係點樣嘅屋企？',
        options: ['古くて、きたない', '新しくて、きれい', '古くて、きれい', '新しくて、きたない'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「あたらしくて、きれいです」，所以係新同靚。',
      },
      {
        id: '8-2-q2',
        question: 'へやはどうですか。',
        questionCn: '間房點樣？',
        options: ['狭くて、暗い', '広くて、明るい', '狭くて、明るい', '広くて、暗い'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「へやは広くて、明るいです」，所以係大同光猛。',
      },
    ],
  },
  {
    id: '8-3',
    lessonId: 8,
    unitId: 3,
    title: '休みの日',
    japanese: 'きょうは休みです。天気はいいです。気持ちがいいです。どこかへ行きたいです。',
    cantonese: '今日放假。天氣好。心情好。想去邊度度。',
    vocabFromLessons: [1, 4, 8],
    difficulty: 'easy',
    questions: [
      {
        id: '8-3-q1',
        question: 'きょうは何ですか。',
        questionCn: '今日係乜嘢日子？',
        options: ['仕事', '学校', '休み', '旅行'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「きょうは休みです」，所以今日放假。',
      },
      {
        id: '8-3-q2',
        question: '天気はどうですか。',
        questionCn: '天氣點樣？',
        options: ['悪い', 'いい', '寒い', '暑い'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「天気はいいです」，所以天氣好。',
      },
      {
        id: '8-3-q3',
        question: 'わたしは何がしたいですか。',
        questionCn: '我想做什麼？',
        options: ['家で休みたい', 'どこかへ行きたい', '仕事をしたい', 'べんきょうしたい'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「どこかへ行きたいです」，所以想去邊度。',
      },
    ],
  },
];
