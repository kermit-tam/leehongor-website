/**
 * 第15課閱讀理解數據
 * Lesson 15 Reading Comprehension
 * 
 * 只用第1-15課的詞彙和文法
 * 主題：連續動作、動詞變化
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson15Reading: ReadingPassage[] = [
  {
    id: '15-1',
    lessonId: 15,
    unitId: 1,
    title: '朝の生活',
    japanese: 'わたしは毎朝六時に起きて、顔を洗います。それから朝ごはんを食べて、七時に家を出ます。電車で会社へ行きます。',
    cantonese: '我每日朝早六點起身，洗面。跟住食早餐，七點出門。坐電車返公司。',
    vocabFromLessons: [4, 7, 15],
    difficulty: 'easy',
    questions: [
      {
        id: '15-1-q1',
        question: '何時に起きますか。',
        questionCn: '幾點起身？',
        options: ['五時', '六時', '七時', '八時'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「六時に起きて」，所以六點起身。',
      },
      {
        id: '15-1-q2',
        question: '起きてから何をしますか。',
        questionCn: '起身之後做什麼？',
        options: ['顔を洗います', '家を出ます', '電車に乗ります', '会社へ行きます'],
        correctIndex: 0,
        type: 'detail',
        explanation: '文章說「起きて、顔を洗います」，所以起身之後洗面。',
      },
      {
        id: '15-1-q3',
        question: '何時に家を出ますか。',
        questionCn: '幾點出門？',
        options: ['六時', '六時半', '七時', '八時'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「七時に家を出ます」，所以七點出門。',
      },
    ],
  },
  {
    id: '15-2',
    lessonId: 15,
    unitId: 2,
    title: '友達と会う日',
    japanese: 'きのう友達に会って、一緒にご飯を食べました。それから映画を見て、喫茶店でお茶を飲みました。十時に家へ帰りました。',
    cantonese: '尋日見過朋友，一齊食飯。跟住睇戲，喺茶餐廳飲茶。十點返屋企。',
    vocabFromLessons: [3, 4, 6, 7, 15],
    difficulty: 'medium',
    questions: [
      {
        id: '15-2-q1',
        question: 'いつ友達に会いましたか。',
        questionCn: '幾時見朋友？',
        options: ['今日', '明日', '昨日', '先週'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「きのう友達に会って」，所以尋日見朋友。',
      },
      {
        id: '15-2-q2',
        question: '一緒に何をしましたか。',
        questionCn: '一齊做咗什麼？',
        options: ['仕事', '買い物', 'ご飯を食べる', '勉強'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「一緒にご飯を食べました」，所以一齊食飯。',
      },
      {
        id: '15-2-q3',
        question: '家へ帰った時間は何時ですか。',
        questionCn: '幾點返屋企？',
        options: ['九時', '十時', '十一時', '十二時'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「十時に家へ帰りました」，所以十點返屋企。',
      },
    ],
  },
  {
    id: '15-3',
    lessonId: 15,
    unitId: 3,
    title: '休みの日',
    japanese: '休みの日はいつも本を読んで、音楽を聞きます。それから掃除をして、洗濯もします。午後は買い物に行きます。',
    cantonese: '放假嗰日成日睇書，聽歌。跟住打掃，洗衣。下午去買嘢。',
    vocabFromLessons: [5, 7, 15],
    difficulty: 'medium',
    questions: [
      {
        id: '15-3-q1',
        question: '休みの日は何をしますか。',
        questionCn: '放假嗰日做什麼？',
        options: ['仕事をする', '本を読む', '学校へ行く', '友達に会う'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「本を読んで」，所以放假嗰日睇書。',
      },
      {
        id: '15-3-q2',
        question: '午後は何をしますか。',
        questionCn: '下午做什麼？',
        options: ['掃除をする', '洗濯をする', '買い物に行く', '音楽を聞く'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「午後は買い物に行きます」，所以下午去買嘢。',
      },
      {
        id: '15-3-q3',
        question: '音楽を聞いてから何をしますか。',
        questionCn: '聽完歌之後做什麼？',
        options: ['本を読みます', '掃除をします', '買い物に行きます', '家へ帰ります'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章順序係「本を読んで、音楽を聞きます。それから掃除をして」，所以聽完歌之後打掃。',
      },
    ],
  },
];
