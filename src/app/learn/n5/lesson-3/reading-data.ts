/**
 * 第3課閱讀理解數據
 * Lesson 3 Reading Comprehension
 * 
 * 原則：用第1-3課的詞彙和文法
 * - 第1課：人稱、職業、國家
 * - 第2課：指示詞、物品
 * - 第3課：場所、建築物、購物
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson3Reading: ReadingPassage[] = [
  {
    id: '3-1',
    lessonId: 3,
    unitId: 1,
    title: 'ここはどこですか',
    japanese: 'ここはがっこうです。そこはしょくどうです。あそこはとしょかんです。じむしょはあちらです。',
    cantonese: '呢度係學校。嗰度係食堂。嗰度係圖書館。事務所喺嗰邊。',
    vocabFromLessons: [1, 2, 3],
    difficulty: 'easy',
    questions: [
      {
        id: '3-1-q1',
        question: '「ここ」是什麼地方？',
        questionCn: '「ここ」是什麼地方？',
        options: ['食堂', '學校', '圖書館', '事務所'],
        optionsCn: ['食堂', '學校', '圖書館', '事務所'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「ここはがっこうです」，所以這裡是學校。',
      },
      {
        id: '3-1-q2',
        question: '「そこ」是什麼地方？',
        questionCn: '「そこ」是什麼地方？',
        options: ['食堂', '學校', '圖書館', '事務所'],
        optionsCn: ['食堂', '學校', '圖書館', '事務所'],
        correctIndex: 0,
        type: 'detail',
        explanation: '文章說「そこはしょくどうです」，所以嗰度是食堂。',
      },
      {
        id: '3-1-q3',
        question: 'じむしょ在哪裡？',
        questionCn: 'じむしょ在哪裡？',
        options: ['ここ', 'そこ', 'あそこ', 'あちら'],
        optionsCn: ['這裡', '那裡', '那邊', '那邊（禮貌說法）'],
        correctIndex: 3,
        type: 'detail',
        explanation: '文章說「じむしょはあちらです」，所以事務所在嗰邊（禮貌說法）。',
      },
    ],
  },
  {
    id: '3-2',
    lessonId: 3,
    unitId: 2,
    title: 'うちのへや',
    japanese: 'わたしのへやに、つくえといすがあります。テレビもあります。パソコンはありません。かいだんのとなりです。',
    cantonese: '喺我間房入面，有張枱同埋張櫈。仲有電視。電腦就冇。喺樓梯隔籬。',
    vocabFromLessons: [1, 2, 3],
    difficulty: 'medium',
    questions: [
      {
        id: '3-2-q1',
        question: '房間裡面有什麼？',
        questionCn: '房間裡面有什麼？',
        options: ['桌子和椅子', '電腦', '樓梯', '電話'],
        optionsCn: ['桌子和椅子', '電腦', '樓梯', '電話'],
        correctIndex: 0,
        type: 'detail',
        explanation: '文章說「つくえといすがあります」，所以有桌子和椅子。',
      },
      {
        id: '3-2-q2',
        question: '房間裡面有電腦嗎？',
        questionCn: '房間裡面有電腦嗎？',
        options: ['有', '沒有', '有很多', '不知道'],
        optionsCn: ['有', '沒有', '有很多', '不知道'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「パソコンはありません」，所以沒有電腦。',
      },
      {
        id: '3-2-q3',
        question: '房間在哪裡？',
        questionCn: '房間在哪裡？',
        options: ['食堂旁邊', '樓梯隔籬', '圖書館裡面', '學校對面'],
        optionsCn: ['食堂旁邊', '樓梯隔籬', '圖書館裡面', '學校對面'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「かいだんのとなりです」，所以在樓梯隔籬。',
      },
    ],
  },
  {
    id: '3-3',
    lessonId: 3,
    unitId: 3,
    title: 'かいしゃいんの一日',
    japanese: 'わたしはかいしゃいんです。うちはとうきょうです。あさ、がっこうのそばのカフェでコーヒーをのみます。',
    cantonese: '我係公司職員。我屋企喺東京。朝早，我會喺學校隔籬嘅咖啡店飲咖啡。',
    vocabFromLessons: [1, 2, 3],
    difficulty: 'medium',
    questions: [
      {
        id: '3-3-q1',
        question: '「わたし」是什麼職業？',
        questionCn: '「わたし」是什麼職業？',
        options: ['老師', '學生', '公司職員', '醫生'],
        optionsCn: ['老師', '學生', '公司職員', '醫生'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「わたしはかいしゃいんです」，所以是公司職員。',
      },
      {
        id: '3-3-q2',
        question: '「わたし」住在哪里？',
        questionCn: '「わたし」住在哪裡？',
        options: ['北京', '東京', '大阪', '倫敦'],
        optionsCn: ['北京', '東京', '大阪', '倫敦'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「うちはとうきょうです」，所以住在東京。',
      },
      {
        id: '3-3-q3',
        question: '早上，「わたし」在哪裡喝咖啡？',
        questionCn: '早上，「わたし」在哪裡喝咖啡？',
        options: ['學校隔籬的咖啡店', '公司', '家裡', '圖書館'],
        optionsCn: ['學校隔籬的咖啡店', '公司', '家裡', '圖書館'],
        correctIndex: 0,
        type: 'detail',
        explanation: '文章說「がっこうのそばのカフェでコーヒーをのみます」，所以在學校隔籬的咖啡店。',
      },
    ],
  },
];

// 獲取第3課所有閱讀文章
export function getLesson3Readings(): ReadingPassage[] {
  return lesson3Reading;
}

// 根據單元獲取閱讀文章
export function getReadingByUnit(unitId: number): ReadingPassage | undefined {
  return lesson3Reading.find(r => r.unitId === unitId);
}
