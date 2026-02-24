/**
 * 第7課閱讀理解數據
 * Lesson 7 Reading Comprehension
 * 
 * 只用第1-7課的詞彙和文法
 * 主題：給予與接受、借貸、學習
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson7Reading: ReadingPassage[] = [
  {
    id: '7-1',
    lessonId: 7,
    unitId: 1,
    title: 'プレゼント',
    japanese: 'わたしはともだちにおみやげをあげました。ともだちはわたしにおれいをあげました。おれいはチョコレートでした。',
    cantonese: '我俾咗手信朋友。朋友俾咗謝禮我。謝禮係朱古力。',
    vocabFromLessons: [1, 2, 6, 7],
    difficulty: 'easy',
    questions: [
      {
        id: '7-1-q1',
        question: 'だれにおみやげをあげましたか。',
        questionCn: '給了誰手信？',
        options: ['せんせい', 'ともだち', 'かぞく', 'りゅうがくせい'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「ともだちにおみやげをあげました」，所以給了朋友。',
      },
      {
        id: '7-1-q2',
        question: 'ともだちは何をあげましたか。',
        questionCn: '朋友給了什麼？',
        options: ['おみやげ', 'おれい', 'チョコレート', 'プレゼント'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「ともだちはわたしにおれいをあげました」，所以給了謝禮。',
      },
      {
        id: '7-1-q3',
        question: 'おれいは何でしたか。',
        questionCn: '謝禮是什麼？',
        options: ['おみやげ', 'チョコレート', 'パン', 'おちゃ'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「おれいはチョコレートでした」，所以是朱古力。',
      },
    ],
  },
  {
    id: '7-2',
    lessonId: 7,
    unitId: 2,
    title: '本を貸します',
    japanese: 'A：すみません。この本を貸してください。B：はい、いいですよ。いつまでですか。A：らいしゅうまでです。',
    cantonese: 'A：唔該，請借呢本書俾我。B：好，可以呀。幾時還呀？A：下星期還。',
    vocabFromLessons: [1, 2, 4, 7],
    difficulty: 'medium',
    questions: [
      {
        id: '7-2-q1',
        question: 'Aさんは何を貸してもらいましたか。',
        questionCn: 'A借了什麼？',
        options: ['ペン', '本', 'じしょ', 'かばん'],
        correctIndex: 1,
        type: 'detail',
        explanation: 'A說「この本を貸してください」，所以借了一本書。',
      },
      {
        id: '7-2-q2',
        question: 'Bさんはいつまで貸しますか。',
        questionCn: 'B借到什麼時候？',
        options: ['あしたまで', 'らいしゅうまで', 'きょうまで', 'らいねんまで'],
        correctIndex: 1,
        type: 'detail',
        explanation: 'A說「らいしゅうまでです」，所以借到下星期。',
      },
    ],
  },
  {
    id: '7-3',
    lessonId: 7,
    unitId: 3,
    title: 'にほんごをならいます',
    japanese: 'わたしはにほんごをならいます。まいにちがっこうでべんきょうします。せんせいはにほんごをおしえます。',
    cantonese: '我學日文。每日喺學校溫書。老師教日文。',
    vocabFromLessons: [1, 4, 6, 7],
    difficulty: 'easy',
    questions: [
      {
        id: '7-3-q1',
        question: 'わたしは何をならいますか。',
        questionCn: '我學習什麼？',
        options: ['えいご', 'にほんご', 'ちゅうごくご', 'かんごくご'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「にほんごをならいます」，所以學習日文。',
      },
      {
        id: '7-3-q2',
        question: 'どこでべんきょうしますか。',
        questionCn: '在哪裡學習？',
        options: ['家', 'がっこう', 'かいしゃ', 'びょういん'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「がっこうでべんきょうします」，所以喺學校學習。',
      },
      {
        id: '7-3-q3',
        question: 'せんせいは何をおしえますか。',
        questionCn: '老師教什麼？',
        options: ['えいご', 'にほんご', 'すうがく', 'れきし'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「せんせいはにほんごをおしえます」，所以老師教日文。',
      },
    ],
  },
];
