/**
 * 第5課閱讀理解數據
 * Lesson 5 Reading Comprehension
 * 
 * 原則：用第1-5課的詞彙和文法
 * 加入交通工具、時間表達
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson5Reading: ReadingPassage[] = [
  {
    id: '5-1',
    lessonId: 5,
    unitId: 1,
    title: 'どこへ行きますか',
    japanese: 'きょう、わたしはでんしゃでがっこうへ行きます。ともだちはバスで行きます。せんせいはくるまで行きます。',
    cantonese: '今日，我搭電車去學校。朋友搭巴士去。老師揸車去。',
    vocabFromLessons: [1, 2, 3, 4, 5],
    difficulty: 'easy',
    questions: [
      {
        id: '5-1-q1',
        question: '「わたし」怎樣去學校？',
        options: ['搭巴士', '搭電車', '揸車', '行路'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「でんしゃでがっこうへ行きます」，所以搭電車。',
      },
      {
        id: '5-1-q2',
        question: '朋友怎樣去？',
        options: ['搭巴士', '搭電車', '揸車', '行路'],
        correctIndex: 0,
        type: 'detail',
        explanation: '文章說「ともだちはバスで行きます」，所以搭巴士。',
      },
      {
        id: '5-1-q3',
        question: '老師怎樣去？',
        options: ['搭巴士', '搭電車', '揸車', '行路'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「せんせいはくるまで行きます」，所以揸車。',
      },
    ],
  },
  {
    id: '5-2',
    lessonId: 5,
    unitId: 2,
    title: 'だれといきますか',
    japanese: 'わたしはひとりでがっこうへ行きます。かのじょはともだちと行きます。かれはかぞくと行きます。',
    cantonese: '我自己一個去學校。佢女朋友同朋友一齊去。佢同屋企人一齊去。',
    vocabFromLessons: [1, 2, 3, 4, 5],
    difficulty: 'medium',
    questions: [
      {
        id: '5-2-q1',
        question: '「わたし」和誰一起去？',
        options: ['朋友', '女朋友', '自己一個', '屋企人'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「ひとりで」，所以是自己一個。',
      },
      {
        id: '5-2-q2',
        question: '「かのじょ」和誰一起去？',
        options: ['朋友', '女朋友', '自己一個', '屋企人'],
        correctIndex: 0,
        type: 'detail',
        explanation: '文章說「ともだちと行きます」，所以同朋友。',
      },
      {
        id: '5-2-q3',
        question: '「かれ」和誰一起去？',
        options: ['朋友', '女朋友', '自己一個', '屋企人'],
        correctIndex: 3,
        type: 'detail',
        explanation: '文章說「かぞくと行きます」，所以同屋企人。',
      },
    ],
  },
  {
    id: '5-3',
    lessonId: 5,
    unitId: 3,
    title: 'いつ行きますか',
    japanese: 'わたしはらいしゅう、にほんへ行きます。きのうはがっこうでべんきょうしました。あしたはやすみです。',
    cantonese: '我下個禮拜去日本。聽日我喺學校度學習。聽日我休息。',
    vocabFromLessons: [1, 2, 3, 4, 5],
    difficulty: 'medium',
    questions: [
      {
        id: '5-3-q1',
        question: '幾時去日本？',
        options: ['上個禮拜', '今個禮拜', '下個禮拜', '下個月'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「らいしゅう、にほんへ行きます」，所以是下個禮拜。',
      },
      {
        id: '5-3-q2',
        question: '昨天做什麼？',
        options: ['去日本', '喺學校學習', '休息', '工作'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「きのうはがっこうでべんきょうしました」，所以喺學校學習。',
      },
      {
        id: '5-3-q3',
        question: '明天會怎樣？',
        options: ['去日本', '喺學校學習', '休息', '工作'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「あしたはやすみです」，所以明天休息。',
      },
    ],
  },
];

export function getLesson5Readings(): ReadingPassage[] {
  return lesson5Reading;
}

export function getReadingByUnit(unitId: number): ReadingPassage | undefined {
  return lesson5Reading.find(r => r.unitId === unitId);
}
