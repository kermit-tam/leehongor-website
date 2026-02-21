/**
 * 第1課閱讀理解數據
 * Lesson 1 Reading Comprehension
 * 
 * 只用第1課詞彙：人稱、職業、國家、初次見面
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson1Reading: ReadingPassage[] = [
  {
    id: '1-1',
    lessonId: 1,
    unitId: 1,
    title: '自己紹介',
    japanese: 'わたしはスミスです。アメリカじんです。いしゃです。よろしくおねがいします。',
    cantonese: '我係史密斯。美國人。醫生。請多關照。',
    vocabFromLessons: [1],
    difficulty: 'easy',
    questions: [
      {
        id: '1-1-q1',
        question: 'スミスさんはどこから来ましたか。',
        questionCn: '史密斯從哪裡來？',
        options: ['日本', '美國', '韓國', '中國'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「アメリカじんです」，所以是美國人。',
      },
      {
        id: '1-1-q2',
        question: 'スミスさんのしごとは何ですか。',
        questionCn: '史密斯的職業是什麼？',
        options: ['學生', '醫生', '公司職員', '老師'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「いしゃです」，所以是醫生。',
      },
      {
        id: '1-1-q3',
        question: 'スミスさんはなんと言いましたか。',
        questionCn: '史密斯說了什麼？',
        options: ['再見', '謝謝', '請多關照', '對不起'],
        correctIndex: 2,
        type: 'detail',
        explanation: '最後說「よろしくおねがいします」，這是初次見面的問候語。',
      },
    ],
  },
  {
    id: '1-2',
    lessonId: 1,
    unitId: 2,
    title: 'がっこうで',
    japanese: 'A：はじめまして。わたしはたなかです。かいしゃいんです。B：こちらこそ。わたしはわーわんです。ちゅうごくじんです。がくせいです。',
    cantonese: 'A：初次見面。我係田中。公司職員。B：我都係。我係王王。中國人。學生。',
    vocabFromLessons: [1],
    difficulty: 'easy',
    questions: [
      {
        id: '1-2-q1',
        question: 'たなかさんは何ですか。',
        options: ['がくせい', 'かいしゃいん', 'いしゃ', 'せんせい'],
        correctIndex: 1,
        type: 'detail',
        explanation: 'A說「かいしゃいんです」，所以是公司職員。',
      },
      {
        id: '1-2-q2',
        question: 'わーわんさんはどこから来ましたか。',
        options: ['にほん', 'アメリカ', 'ちゅうごく', 'かんこく'],
        correctIndex: 2,
        type: 'detail',
        explanation: 'B說「ちゅうごくじんです」，所以是中國人。',
      },
      {
        id: '1-2-q3',
        question: 'わーわんさんはがくせいですか。',
        options: ['はい、そうです', 'いいえ、かいしゃいんです', 'いいえ、せんせいです', 'いいえ、いしゃです'],
        correctIndex: 0,
        type: 'detail',
        explanation: 'B說「がくせいです」，所以「はい、そうです」。',
      },
    ],
  },
  {
    id: '1-3',
    lessonId: 1,
    unitId: 3,
    title: 'ともだち',
    japanese: 'これはわたしのともだちです。なまえはブラウンさんです。イギリスじんです。だいがくのきょうしです。',
    cantonese: '呢個係我嘅朋友。名叫布朗先生。英國人。大學教師。',
    vocabFromLessons: [1],
    difficulty: 'medium',
    questions: [
      {
        id: '1-3-q1',
        question: 'ブラウンさんはだれですか。',
        options: ['わたしのせんせい', 'わたしのともだち', 'わたしのかいしゃいん', 'わたしのいしゃ'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「わたしのともだちです」，所以是朋友。',
      },
      {
        id: '1-3-q2',
        question: 'ブラウンさんのしごとは何ですか。',
        options: ['がくせい', 'いしゃ', 'きょうし', 'かいしゃいん'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「だいがくのきょうしです」，所以是大學教師。',
      },
    ],
  },
];
