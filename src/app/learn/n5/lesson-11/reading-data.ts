/**
 * 第11課閱讀理解數據
 * Lesson 11 Reading Comprehension
 * 
 * 只用第1-11課的詞彙和文法
 * 主題：數量、家人、郵件
 */

import { ReadingPassage } from '../components/reading/types';

export const lesson11Reading: ReadingPassage[] = [
  {
    id: '11-1',
    lessonId: 11,
    unitId: 1,
    title: 'わたしのかぞく',
    japanese: 'わたしの家には四人がいます。ちちとははと、おとうとがいます。いもうとはいません。りょうしんはしごとをしています。',
    cantonese: '我屋企有四個人。有爸爸媽媽同細佬。冇細妹。父母做緊工。',
    vocabFromLessons: [1, 6, 11],
    difficulty: 'easy',
    questions: [
      {
        id: '11-1-q1',
        question: '家に何人がいますか。',
        questionCn: '屋企有幾個人？',
        options: ['3人', '4人', '5人', '6人'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「家には四人がいます」，所以有四個人。',
      },
      {
        id: '11-1-q2',
        question: 'だれがいますか。',
        questionCn: '有咩人？',
        options: ['ちちとははと、あね', 'ちちとははと、おとうと', 'ちちとははと、いもうと', 'りょうしんと、きょうだい'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「ちちとははと、おとうとがいます」，所以有爸爸媽媽同細佬。',
      },
      {
        id: '11-1-q3',
        question: 'いもうとはいますか。',
        questionCn: '有冇細妹？',
        options: ['はい、います', 'いいえ、いません', 'わかりません', 'たぶんいます'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「いもうとはいません」，所以冇細妹。',
      },
    ],
  },
  {
    id: '11-2',
    lessonId: 11,
    unitId: 2,
    title: '買い物',
    japanese: 'わたしはりんごを五つ買いました。みかんも三つ買いました。ぜんぶで800円でした。やすかったです。',
    cantonese: '我買咗五個蘋果。仲買咗三個柑。一共800日圓。好平。',
    vocabFromLessons: [6, 8, 11],
    difficulty: 'easy',
    questions: [
      {
        id: '11-2-q1',
        question: 'りんごをいくつ買いましたか。',
        questionCn: '買咗幾多個蘋果？',
        options: ['3つ', '5つ', '8つ', '10つ'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「りんごを五つ買いました」，所以買咗五個。',
      },
      {
        id: '11-2-q2',
        question: 'みかんをいくつ買いましたか。',
        questionCn: '買咗幾多個柑？',
        options: ['2つ', '3つ', '5つ', '8つ'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「みかんも三つ買いました」，所以買咗三個。',
      },
      {
        id: '11-2-q3',
        question: 'おかねはいくらでしたか。',
        questionCn: '錢係幾多？',
        options: ['500円', '800円', '1000円', '1300円'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「ぜんぶで800円でした」，所以一共800日圓。',
      },
    ],
  },
  {
    id: '11-3',
    lessonId: 11,
    unitId: 3,
    title: '日本へ',
    japanese: 'わたしはにほんへりゅうがくせいとして行きます。飛行機で3時間かかります。1年間べんきょうします。',
    cantonese: '我以留學生身份去日本。坐飛機要3個鐘。學一年書。',
    vocabFromLessons: [1, 4, 5, 11],
    difficulty: 'medium',
    questions: [
      {
        id: '11-3-q1',
        question: 'なんとしてにほんへ行きますか。',
        questionCn: '以乜嘢身份去日本？',
        options: ['かいしゃいん', 'りゅうがくせい', 'いしゃ', 'かんごし'],
        correctIndex: 1,
        type: 'detail',
        explanation: '文章說「りゅうがくせいとして行きます」，所以係留學生身份。',
      },
      {
        id: '11-3-q2',
        question: 'どのくらいかかりますか。',
        questionCn: '使幾耐時間？',
        options: ['1時間', '2時間', '3時間', '4時間'],
        correctIndex: 2,
        type: 'detail',
        explanation: '文章說「飛行機で3時間かかります」，所以要3個鐘。',
      },
      {
        id: '11-3-q3',
        question: 'どのくらいべんきょうしますか。',
        questionCn: '學幾耐書？',
        options: ['1週間', '1か月', '半年', '1年間'],
        correctIndex: 3,
        type: 'detail',
        explanation: '文章說「1年間べんきょうします」，所以學一年。',
      },
    ],
  },
];
