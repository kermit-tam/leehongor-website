/**
 * 第13課閱讀理解數據
 * Lesson 13 Reading Comprehension
 * 
 * 只用第1-13課的詞彙和文法
 * 主題：週末活動、日常活動、餐廳點餐
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson13Reading: ReadingPassage[] = [
  {
    id: '13-1',
    lessonId: 13,
    unitId: 1,
    title: '週末の予定',
    japanese: 'しゅうまつは何をしますか。わたしはプールでおよぎます。それから、川でつりもします。すこしつかれますが、とてもたのしいです。',
    cantonese: '週末做啲咩？我喺泳池游水。跟住喺河度釣魚。雖然有啲攰，但係好開心。',
    vocabFromLessons: [4, 5, 6, 13],
    difficulty: 'easy',
    questions: [
      {
        id: '13-1-q1',
        question: '週末は何をしますか。',
        questionCn: '週末做咩？',
        options: ['山登り', 'プールでおよぐ', '映画を見る', '買い物'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「プールでおよぎます」，所以週末喺泳池游水。',
      },
      {
        id: '13-1-q2',
        question: '川で何をしますか。',
        questionCn: '喺河度做咩？',
        options: ['およぎます', 'つりをします', 'さんぽします', 'あそびます'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「川でつりもします」，所以喺河度釣魚。',
      },
      {
        id: '13-1-q3',
        question: 'どうでしたか。',
        questionCn: '點樣？',
        options: ['つかれて、たのしくありません', 'つかれますが、たのしいです', 'つかれません', 'たのしくありません'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「すこしつかれますが、とてもたのしいです」，所以雖然有啲攰但係好開心。',
      },
    ],
  },
  {
    id: '13-2',
    lessonId: 13,
    unitId: 2,
    title: '新年の日',
    japanese: 'おしょうがつにけっこんします。家族がむかえにきます。いえがひろくて、せまくありません。たくさんの人がきますから、たいへんです。',
    cantonese: '新年結婚。家人會嚟接。屋企好闊唔窄。好多人會嚟，好辛苦。',
    vocabFromLessons: [1, 3, 11, 13],
    difficulty: 'medium',
    questions: [
      {
        id: '13-2-q1',
        question: 'いつけっこんしますか。',
        questionCn: '幾時結婚？',
        options: ['しゅうまつ', 'おしょうがつ', 'なつ', 'あき'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「おしょうがつにけっこんします」，所以新年結婚。',
      },
      {
        id: '13-2-q2',
        question: 'だれがきますか。',
        questionCn: '邊個會嚟？',
        options: ['ともだち', 'かぞく', 'どうりょう', 'がくせい'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「家族がむかえにきます」，所以家人會嚟。',
      },
      {
        id: '13-2-q3',
        question: 'いえはどうですか。',
        questionCn: '屋企點樣？',
        options: ['せまいです', 'ひろくて、せまくありません', 'ちいさいです', 'ふるいです'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「いえがひろくて、せまくありません」，所以屋企好闊唔窄。',
      },
    ],
  },
  {
    id: '13-3',
    lessonId: 13,
    unitId: 4,
    title: 'レストランで',
    japanese: 'A：すみません。ご注文は？B：ぎゅうどんをお願いします。A：かしこまりました。B：あと、なにかおすすめはありますか。A：ていしょくがおすすめです。',
    cantonese: 'A：唔該，請問點咩？B：牛丼唔該。A：明白。B：仲有，有咩推介？A：定食係推介。',
    vocabFromLessons: [6, 13],
    difficulty: 'medium',
    questions: [
      {
        id: '13-3-q1',
        question: 'Bは何を注文しましたか。',
        questionCn: 'B點咗咩？',
        options: ['ていしょく', 'ぎゅうどん', 'さしみ', 'てんぷら'],
        correctIndex: 1,
        type: 'detail',
        explanation: 'B說「ぎゅうどんをお願いします」，所以點咗牛丼。',
      },
      {
        id: '13-3-q2',
        question: '店員は何をおすすめしましたか。',
        questionCn: '店員推介咩？',
        options: ['ぎゅうどん', 'ていしょく', 'すし', 'ラーメン'],
        correctIndex: 1,
        type: 'detail',
        explanation: '店員說「ていしょくがおすすめです」，所以推介定食。',
      },
    ],
  },
  {
    id: '13-4',
    lessonId: 13,
    unitId: 3,
    title: 'おなかがすきました',
    japanese: 'A：のどがかわきました。なにかのみたいです。B：わたしもおなかがすきました。しょくじしましょう。A：そうしましょう。どこかいいレストランはありますか。',
    cantonese: 'A：我口渴。想飲啲嘢。B：我都肚餓。食飯啦。A：好呀。有邊度好嘅餐廳？',
    vocabFromLessons: [3, 6, 13],
    difficulty: 'easy',
    questions: [
      {
        id: '13-4-q1',
        question: 'Aはどうしましたか。',
        questionCn: 'A點咗？',
        options: ['おなかがすきました', 'のどがかわきました', 'つかれました', 'ねむいです'],
        correctIndex: 1,
        type: 'detail',
        explanation: 'A說「のどがかわきました」，所以口渴。',
      },
      {
        id: '13-4-q2',
        question: 'Bはどうしましたか。',
        questionCn: 'B點咗？',
        options: ['のどがかわきました', 'おなかがすきました', 'つかれました', 'さむいです'],
        correctIndex: 1,
        type: 'detail',
        explanation: 'B說「わたしもおなかがすきました」，所以肚餓。',
      },
      {
        id: '13-4-q3',
        question: '何をしますか。',
        questionCn: '做咩？',
        options: ['かいもの', 'しょくじ', 'さんぽ', 'スキー'],
        correctIndex: 1,
        type: 'detail',
        explanation: 'B說「しょくじしましょう」，所以提議食飯。',
      },
    ],
  },
];
