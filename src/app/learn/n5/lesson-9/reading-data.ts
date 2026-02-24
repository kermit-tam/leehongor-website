/**
 * 第9課閱讀理解數據
 * Lesson 9 Reading Comprehension
 * 
 * 只用第1-9課的詞彙和文法
 * 主題：て形、連接動作、請求
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson9Reading: ReadingPassage[] = [
  {
    id: '9-1',
    lessonId: 9,
    unitId: 1,
    title: '朝の習慣',
    japanese: 'あさおきて、顔を洗います。それから、あさごはんを食べます。それから、がっこうへ行きます。',
    cantonese: '朝早起身，洗面。跟住，食早餐。跟住，去學校。',
    vocabFromLessons: [1, 3, 4, 6, 9],
    difficulty: 'easy',
    questions: [
      {
        id: '9-1-q1',
        question: 'まず何をしますか。',
        questionCn: '首先做什麼？',
        options: ['ごはんを食べます', 'がっこうへ行きます', 'おきます', 'ねます'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「あさおきて」，所以首先起身。',
      },
      {
        id: '9-1-q2',
        question: 'あさごはんを食べたあと、どこへ行きますか。',
        questionCn: '食完早餐之後，去哪裡？',
        options: ['家', 'がっこう', '会社', 'スーパー'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「それから、がっこうへ行きます」，所以之後去學校。',
      },
    ],
  },
  {
    id: '9-2',
    lessonId: 9,
    unitId: 2,
    title: 'デパートで',
    japanese: 'A：すみません。このかばんを見せてください。B：はい、どうぞ。A：高いですね。もう少し安いのはありますか。',
    cantonese: 'A：唔該，請俾我睇呢個袋。B：好，請。A：貴喎。有冇平啲嘅？',
    vocabFromLessons: [2, 3, 6, 8, 9],
    difficulty: 'medium',
    questions: [
      {
        id: '9-2-q1',
        question: 'Aさんは何を見たいですか。',
        questionCn: 'A想睇什麼？',
        options: ['くつ', 'かばん', 'ぼうし', 'ネクタイ'],
        correctIndex: 1,
        type: 'detail',
        explanation: 'A說「このかばんを見せてください」，所以想睇袋。',
      },
      {
        id: '9-2-q2',
        question: 'かばんはどうですか。',
        questionCn: '袋點樣？',
        options: ['安い', '高い', 'やすくて、高い', 'ちいさい'],
        correctIndex: 1,
        type: 'detail',
        explanation: 'A說「高いですね」，所以袋貴。',
      },
    ],
  },
  {
    id: '9-3',
    lessonId: 9,
    unitId: 3,
    title: '週末の一日',
    japanese: 'どようびのあさ、わたしはともだちに会いました。いっしょに映画を見て、ごはんを食べました。とても楽しかったです。',
    cantonese: '星期六朝早，我見咗朋友。一齊睇戲食飯。好開心。',
    vocabFromLessons: [1, 4, 5, 6, 9],
    difficulty: 'medium',
    questions: [
      {
        id: '9-3-q1',
        question: 'いつともだちに会いましたか。',
        questionCn: '幾時見咗朋友？',
        options: ['日曜日', '土曜日', '月曜日', '金曜日'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「どようびのあさ、わたしはともだちに会いました」，所以星期六見。',
      },
      {
        id: '9-3-q2',
        question: '何をしましたか。',
        questionCn: '做咗什麼？',
        options: ['映画を見て、ごはんを食べました', '買い物をして、コーヒーを飲みました', '本を読んで、手紙をかきました', 'スポーツをして、ビールを飲みました'],
        correctIndex: 0,
        type: 'detail',
        explanation: '文章說「いっしょに映画を見て、ごはんを食べました」，所以睇戲食飯。',
      },
    ],
  },
];
