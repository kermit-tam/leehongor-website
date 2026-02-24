/**
 * 第14課閱讀理解數據
 * Lesson 14 Reading Comprehension
 * 
 * 只用第1-14課的詞彙和文法
 * 主題：過去經驗、經歷
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson14Reading: ReadingPassage[] = [
  {
    id: '14-1',
    lessonId: 14,
    unitId: 1,
    title: '日本の経験',
    japanese: 'わたしは去年日本へ行ったことがあります。東京と京都へ行きました。お寺を見ました。おいしい寿司も食べました。',
    cantonese: '我尋年去過日本。去過東京同京都。睇過寺。食過好食嘅壽司。',
    vocabFromLessons: [1, 3, 4, 6, 14],
    difficulty: 'easy',
    questions: [
      {
        id: '14-1-q1',
        question: 'いつ日本へ行きましたか。',
        questionCn: '幾時去過日本？',
        options: ['ことし', '去年', 'おととし', 'らいねん'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「去年日本へ行ったことがあります」，所以尋年去過。',
      },
      {
        id: '14-1-q2',
        question: 'どこへ行きましたか。',
        questionCn: '去過邊度？',
        options: ['東京だけ', '京都だけ', '東京と京都', '大阪と京都'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「東京と京都へ行きました」，所以去過東京同京都。',
      },
      {
        id: '14-1-q3',
        question: '何を食べましたか。',
        questionCn: '食過什麼？',
        options: ['てんぷら', 'すし', 'ラーメン', 'カレー'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「おいしい寿司も食べました」，所以食過壽司。',
      },
    ],
  },
  {
    id: '14-2',
    lessonId: 14,
    unitId: 2,
    title: 'スポーツの経験',
    japanese: 'わたしはスキーをしたことがあります。でも、スケートはしたことがありません。水泳はよくします。先週も海で泳ぎました。',
    cantonese: '我滑過雪。但係，未溜過冰。成日游水。上星期都喺海度游過。',
    vocabFromLessons: [4, 5, 14],
    difficulty: 'medium',
    questions: [
      {
        id: '14-2-q1',
        question: '何をしたことがありますか。',
        questionCn: '做過什麼？',
        options: ['スケート', 'スキー', 'サッカー', 'テニス'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「スキーをしたことがあります」，所以滑過雪。',
      },
      {
        id: '14-2-q2',
        question: '何をしたことがありませんか。',
        questionCn: '未做過什麼？',
        options: ['スキー', '水泳', 'スケート', '山登り'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「スケートはしたことがありません」，所以未溜過冰。',
      },
      {
        id: '14-2-q3',
        question: '先週はどこで泳ぎましたか。',
        questionCn: '上星期喺邊度游水？',
        options: ['プール', '海', '川', '湖'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「先週も海で泳ぎました」，所以上星期喺海度游。',
      },
    ],
  },
  {
    id: '14-3',
    lessonId: 14,
    unitId: 3,
    title: 'ことしの思い出',
    japanese: 'ことしはいろいろなことがありました。春にさくらを見ました。夏に海へ行きました。秋には山を登りました。冬は家でゆっくりしました。',
    cantonese: '今年有好多嘢發生過。春天睇過櫻花。夏天去過海。秋天爬過山。冬天喺屋企休息。',
    vocabFromLessons: [4, 13, 14],
    difficulty: 'medium',
    questions: [
      {
        id: '14-3-q1',
        question: '春に何をしましたか。',
        questionCn: '春天做咗什麼？',
        options: ['海へ行きました', 'さくらを見ました', '山を登りました', '家で休みました'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「春にさくらを見ました」，所以春天睇過櫻花。',
      },
      {
        id: '14-3-q2',
        question: '夏に何をしましたか。',
        questionCn: '夏天做咗什麼？',
        options: ['山を登りました', '海へ行きました', 'さくらを見ました', 'スキーをしました'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「夏に海へ行きました」，所以夏天去過海。',
      },
      {
        id: '14-3-q3',
        question: '冬はどうしましたか。',
        questionCn: '冬天點做？',
        options: ['海へ行きました', '山を登りました', '家でゆっくりしました', '外国へ行きました'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「冬は家でゆっくりしました」，所以冬天喺屋企休息。',
      },
    ],
  },
];
