/**
 * 第2課閱讀理解數據
 * Lesson 2 Reading Comprehension
 * 
 * 原則：只用第1-2課的詞彙和文法
 * - 第1課：人稱、職業、國家、初次見面
 * - 第2課：指示詞、物品、會話
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson2Reading: ReadingPassage[] = [
  {
    id: '2-1',
    lessonId: 2,
    unitId: 1,
    title: 'これは何ですか',
    japanese: 'これはわたしのほんです。それはともだちのじしょです。あれはせんせいのしんぶんです。',
    cantonese: '呢個係我嘅書。嗰個係朋友嘅字典。嗰個係老師嘅報紙。',
    vocabFromLessons: [1, 2],
    difficulty: 'easy',
    questions: [
      {
        id: '2-1-q1',
        question: '「これ」是什麼？',
        options: ['朋友', '書', '字典', '報紙'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「これはわたしのほんです」，所以「これ」是書。',
      },
      {
        id: '2-1-q2',
        question: '「それ」是誰的？',
        options: ['我的', '朋友的', '老師的', '不明'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「それはともだちのじしょです」，所以是朋友的。',
      },
      {
        id: '2-1-q3',
        question: '「あれ」是什麼？',
        options: ['書', '字典', '報紙', '雜誌'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「あれはせんせいのしんぶんです」，所以是報紙。',
      },
    ],
  },
  {
    id: '2-2',
    lessonId: 2,
    unitId: 2,
    title: 'かばんの中身',
    japanese: 'かばんの中に、ほんとえんぴつがあります。それから、めいしもあります。ざっしはありません。',
    cantonese: '喺個袋入面，有書同鉛筆。跟住，仲有名片。雜誌就冇。',
    vocabFromLessons: [1, 2],
    difficulty: 'easy',
    questions: [
      {
        id: '2-2-q1',
        question: 'かばん裡面有什麼？',
        options: ['書和鉛筆', '雜誌和字典', '報紙和名片', '電視和電話'],
        correctIndex: 0,
        type: 'detail',
        explanation: '文章說「ほんとえんぴつがあります」，所以有書和鉛筆。',
      },
      {
        id: '2-2-q2',
        question: 'かばん裡面有雜誌嗎？',
        options: ['有', '沒有', '不知道', '有很多'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「ざっしはありません」，所以沒有雜誌。',
      },
      {
        id: '2-2-q3',
        question: '這篇文章主要講什麼？',
        options: ['書包裡的物品', '去圖書館', '買東西', '老師的東西'],
        correctIndex: 0,
        type: 'main',
        explanation: '整篇文章都在介紹書包裡有什麼東西。',
      },
    ],
  },
  {
    id: '2-3',
    lessonId: 2,
    unitId: 3,
    title: 'デパートで',
    japanese: 'これはテレビです。それはラジオです。あれはコンピューターです。テレビはちかのうりばです。',
    cantonese: '呢個係電視。嗰個係收音機。嗰個係電腦。電視喺地下嘅售貨處。',
    vocabFromLessons: [1, 2],
    difficulty: 'easy',
    questions: [
      {
        id: '2-3-q1',
        question: '「これ」在哪裡？',
        options: ['地上', '地下', '樓上', '外面'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「テレビはちかのうりばです」，テレビ是これ，所以在地下。',
      },
      {
        id: '2-3-q2',
        question: '「それ」是什麼？',
        options: ['電視', '收音機', '電腦', '電話'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「それはラジオです」，所以是收音機。',
      },
      {
        id: '2-3-q3',
        question: '「あれ」是什麼？',
        options: ['電視', '收音機', '電腦', '汽車'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「あれはコンピューターです」，所以是電腦。',
      },
    ],
  },
];

// 獲取第2課所有閱讀文章
export function getLesson2Readings(): ReadingPassage[] {
  return lesson2Reading;
}

// 根據單元獲取閱讀文章
export function getReadingByUnit(unitId: number): ReadingPassage | undefined {
  return lesson2Reading.find(r => r.unitId === unitId);
}
