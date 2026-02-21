/**
 * 第4課閱讀理解數據
 * Lesson 4 Reading Comprehension
 * 
 * 原則：用第1-4課的詞彙和文法
 * 加入時間、動詞、星期
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson4Reading: ReadingPassage[] = [
  {
    id: '4-1',
    lessonId: 4,
    unitId: 1,
    title: 'わたしの一日',
    japanese: 'あさ、ろくじにおきます。ひる、がっこうでべんきょうします。ごご、よるごじにおわります。',
    cantonese: '朝早，我六點鐘起身。日頭，我喺學校度學習。晏晝，我五點鐘收工。',
    vocabFromLessons: [1, 2, 3, 4],
    difficulty: 'easy',
    questions: [
      {
        id: '4-1-q1',
        question: '幾點起床？',
        questionCn: '幾點起床？',
        options: ['5點', '6點', '7點', '8點'],
        optionsCn: ['5點', '6點', '7點', '8點'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「ろくじにおきます」，所以是6點。',
      },
      {
        id: '4-1-q2',
        question: '在哪裡學習？',
        questionCn: '在哪裡學習？',
        options: ['家裡', '學校', '公司', '圖書館'],
        optionsCn: ['家裡', '學校', '公司', '圖書館'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「がっこうでべんきょうします」，所以在學校。',
      },
      {
        id: '4-1-q3',
        question: '幾點結束？',
        questionCn: '幾點結束？',
        options: ['3點', '4點', '5點', '6點'],
        optionsCn: ['3點', '4點', '5點', '6點'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「よるごじにおわります」，所以是5點。',
      },
    ],
  },
  {
    id: '4-2',
    lessonId: 4,
    unitId: 2,
    title: 'ぎんこうへ行きます',
    japanese: 'きょう、ぎんこうへ行きます。あした、ゆうびんきょくへ行きます。あさって、デパートへ行きます。',
    cantonese: '今日，我去銀行。聽日，我去郵局。後日，我去百貨商店。',
    vocabFromLessons: [1, 2, 3, 4],
    difficulty: 'medium',
    questions: [
      {
        id: '4-2-q1',
        question: '今天去哪裡？',
        questionCn: '今天去哪裡？',
        options: ['郵局', '銀行', '百貨商店', '圖書館'],
        optionsCn: ['郵局', '銀行', '百貨商店', '圖書館'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「きょう、ぎんこうへ行きます」，所以今天去銀行。',
      },
      {
        id: '4-2-q2',
        question: '明天去哪裡？',
        questionCn: '明天去哪裡？',
        options: ['郵局', '銀行', '百貨商店', '美術館'],
        optionsCn: ['郵局', '銀行', '百貨商店', '美術館'],
        correctIndex: 0,
        type: 'detail',
        explanation: '文章說「あした、ゆうびんきょくへ行きます」，所以明天去郵局。',
      },
      {
        id: '4-2-q3',
        question: '後天去哪裡？',
        questionCn: '後天去哪裡？',
        options: ['郵局', '銀行', '百貨商店', '學校'],
        optionsCn: ['郵局', '銀行', '百貨商店', '學校'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「あさって、デパートへ行きます」，所以後天去百貨商店。',
      },
    ],
  },
  {
    id: '4-3',
    lessonId: 4,
    unitId: 3,
    title: 'がっこうのじかん',
    japanese: 'がっこうは、ごぜんはちじからです。ひるやすみはじゅうにじです。ごごはじゅうにじはんでおわります。',
    cantonese: '學校係朝早八點開始。午休係十二點。晏晝十二點半收工。',
    vocabFromLessons: [1, 2, 3, 4],
    difficulty: 'medium',
    questions: [
      {
        id: '4-3-q1',
        question: '學校幾點開始？',
        questionCn: '學校幾點開始？',
        options: ['7點', '8點', '9點', '10點'],
        optionsCn: ['7點', '8點', '9點', '10點'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「ごぜんはちじからです」，所以是8點。',
      },
      {
        id: '4-3-q2',
        question: '午休是幾點？',
        questionCn: '午休是幾點？',
        options: ['11點', '12點', '1點', '2點'],
        optionsCn: ['11點', '12點', '1點', '2點'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「ひるやすみはじゅうにじです」，所以是12點。',
      },
      {
        id: '4-3-q3',
        question: '下午幾點結束？',
        questionCn: '下午幾點結束？',
        options: ['12點', '12點半', '1點', '1點半'],
        optionsCn: ['12點', '12點半', '1點', '1點半'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「じゅうにじはんでおわります」，所以是12點半。',
      },
    ],
  },
];

export function getLesson4Readings(): ReadingPassage[] {
  return lesson4Reading;
}

export function getReadingByUnit(unitId: number): ReadingPassage | undefined {
  return lesson4Reading.find(r => r.unitId === unitId);
}
