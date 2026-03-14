/**
 * JLPT N5 歷屆試題 - 樣本題目
 * 這些是從PDF試卷轉錄的示例題目
 */

import { ExamQuestion } from './types';

// 文字語彙 - 題型1: 漢字讀音（選擇正確的平假名）
export const sampleVocabularyQuestions: ExamQuestion[] = [
  {
    id: '2023-07-vocab-1',
    year: 2023,
    month: 7,
    section: 'vocabulary',
    questionNumber: 1,
    questionType: '漢字讀音',
    question: 'あしたは 雨ですか。',
    questionReading: 'あしたは あめですか。',
    questionMeaning: '明天會下雨嗎？',
    options: [
      { id: '1', text: 'ゆき', reading: 'ゆき', meaning: '雪' },
      { id: '2', text: 'はれ', reading: 'はれ', meaning: '晴天' },
      { id: '3', text: 'くもり', reading: 'くもり', meaning: '陰天' },
      { id: '4', text: 'あめ', reading: 'あめ', meaning: '雨' },
    ],
    correctAnswer: '4',
    explanation: '「雨」的正確讀音是「あめ」，意思是「雨」。',
    explanationReading: '「あめ」のせいかいなよみかたは「あめ」です。',
    explanationMeaning: '「雨」的正確讀音是「あめ」，意思是「雨」。',
  },
  {
    id: '2023-07-vocab-2',
    year: 2023,
    month: 7,
    section: 'vocabulary',
    questionNumber: 2,
    questionType: '漢字讀音',
    question: 'きょうしつで 書いて ください。',
    questionReading: 'きょうしつで かいて ください。',
    questionMeaning: '請在教室裡寫。',
    options: [
      { id: '1', text: 'かいて', reading: 'かいて', meaning: '寫（て形）' },
      { id: '2', text: 'きいて', reading: 'きいて', meaning: '聽（て形）' },
      { id: '3', text: 'はいて', reading: 'はいて', meaning: '穿（て形）' },
      { id: '4', text: 'ひいて', reading: 'ひいて', meaning: '拉（て形）' },
    ],
    correctAnswer: '1',
    explanation: '「書いて」是「書く」的て形，讀音為「かいて」。',
    explanationReading: '「かいて」は「かく」のてけいです。',
    explanationMeaning: '「書いて」是「寫」的連接形，讀音為「かいて」。',
  },
  {
    id: '2023-07-vocab-3',
    year: 2023,
    month: 7,
    section: 'vocabulary',
    questionNumber: 3,
    questionType: '漢字讀音',
    question: 'しゃしんは はこの 中に あります。',
    questionReading: 'しゃしんは はこの なかに あります。',
    questionMeaning: '照片在盒子裡面。',
    options: [
      { id: '1', text: 'そば', reading: 'そば', meaning: '旁邊' },
      { id: '2', text: 'そと', reading: 'そと', meaning: '外面' },
      { id: '3', text: 'なか', reading: 'なか', meaning: '裡面' },
      { id: '4', text: 'よこ', reading: 'よこ', meaning: '旁邊' },
    ],
    correctAnswer: '3',
    explanation: '「中」的正確讀音是「なか」，意思是「裡面」。',
    explanationReading: '「なか」のせいかいなよみかたは「なか」です。',
    explanationMeaning: '「中」的正確讀音是「なか」，意思是「裡面」。',
  },
  {
    id: '2023-07-vocab-4',
    year: 2023,
    month: 7,
    section: 'vocabulary',
    questionNumber: 4,
    questionType: '漢字讀音',
    question: 'この いすは 小さいです。',
    questionReading: 'この いすは ちいさいです。',
    questionMeaning: '這張椅子很小。',
    options: [
      { id: '1', text: 'ちいさい', reading: 'ちいさい', meaning: '小的' },
      { id: '2', text: 'ちさい', reading: 'ちさい', meaning: '（錯誤讀音）' },
      { id: '3', text: 'しいさい', reading: 'しいさい', meaning: '（錯誤讀音）' },
      { id: '4', text: 'しさい', reading: 'しさい', meaning: '（錯誤讀音）' },
    ],
    correctAnswer: '1',
    explanation: '「小さい」的正確讀音是「ちいさい」，意思是「小的」。',
    explanationReading: '「ちいさい」のせいかいなよみかたは「ちいさい」です。',
    explanationMeaning: '「小さい」的正確讀音是「ちいさい」，意思是「小的」。',
  },
  {
    id: '2023-07-vocab-5',
    year: 2023,
    month: 7,
    section: 'vocabulary',
    questionNumber: 5,
    questionType: '漢字讀音',
    question: 'あしたは 火よう日です。',
    questionReading: 'あしたは かようびです。',
    questionMeaning: '明天是星期二。',
    options: [
      { id: '1', text: 'どようび', reading: 'どようび', meaning: '星期六' },
      { id: '2', text: 'すいようび', reading: 'すいようび', meaning: '星期三' },
      { id: '3', text: 'かようび', reading: 'かようび', meaning: '星期二' },
      { id: '4', text: 'にちようび', reading: 'にちようび', meaning: '星期日' },
    ],
    correctAnswer: '3',
    explanation: '「火曜日」的正確讀音是「かようび」，意思是「星期二」。',
    explanationReading: '「かようび」のせいかいなよみかたは「かようび」です。',
    explanationMeaning: '「火曜日」的正確讀音是「かようび」，意思是「星期二」。',
  },
  {
    id: '2023-07-vocab-6',
    year: 2023,
    month: 7,
    section: 'vocabulary',
    questionNumber: 6,
    questionType: '漢字讀音',
    question: 'きれいな 空ですね。',
    questionReading: 'きれいな そらですね。',
    questionMeaning: '天空真美啊。',
    options: [
      { id: '1', text: 'いえ', reading: 'いえ', meaning: '家' },
      { id: '2', text: 'うみ', reading: 'うみ', meaning: '海' },
      { id: '3', text: 'にわ', reading: 'にわ', meaning: '庭院' },
      { id: '4', text: 'そら', reading: 'そら', meaning: '天空' },
    ],
    correctAnswer: '4',
    explanation: '「空」的正確讀音是「そら」，意思是「天空」。',
    explanationReading: '「そら」のせいかいなよみかたは「そら」です。',
    explanationMeaning: '「空」的正確讀音是「そら」，意思是「天空」。',
  },
];

// 文法 - 題型: 助詞填空
export const sampleGrammarQuestions: ExamQuestion[] = [
  {
    id: '2023-07-grammar-1',
    year: 2023,
    month: 7,
    section: 'grammar',
    questionNumber: 1,
    questionType: '助詞填空',
    question: '私は あしたの ひこうき （  ） 国へ 帰ります。',
    questionReading: 'わたしは あしたの ひこうき （  ） くにへ かえります。',
    questionMeaning: '我明天要坐飛機回國。',
    options: [
      { id: '1', text: 'に', reading: 'に', meaning: '在／於（時間點）' },
      { id: '2', text: 'で', reading: 'で', meaning: '用／乘（交通工具）' },
      { id: '3', text: 'か', reading: 'か', meaning: '或／嗎（疑問）' },
      { id: '4', text: 'を', reading: 'を', meaning: '（賓語標記）' },
    ],
    correctAnswer: '2',
    explanation: '「で」用於表示交通工具，「ひこうきで」意思是「乘飛機」。',
    explanationReading: '「で」はこうつうぐんをあらわします。「ひこうきで」は「ひこうきにのって」といういみです。',
    explanationMeaning: '「で」用於表示交通工具，「ひこうきで」意思是「乘飛機」。',
  },
  {
    id: '2023-07-grammar-2',
    year: 2023,
    month: 7,
    section: 'grammar',
    questionNumber: 2,
    questionType: '助詞填空',
    question: '先週 デパートで かばん （  ） くつなどを 買いました。',
    questionReading: 'せんしゅう デパートで かばん （  ） くつなどを かいました。',
    questionMeaning: '上週在百貨公司買了包包和鞋子等。',
    options: [
      { id: '1', text: 'は', reading: 'は', meaning: '（主題標記）' },
      { id: '2', text: 'も', reading: 'も', meaning: '也／都' },
      { id: '3', text: 'へ', reading: 'へ', meaning: '向／往' },
      { id: '4', text: 'や', reading: 'や', meaning: '和（等等）' },
    ],
    correctAnswer: '4',
    explanation: '「や」用於列舉，暗示還有其他類似的事物，「など」表示「等等」。',
    explanationReading: '「や」はれっきょにつかい、ほかにもあることをしめします。「など」は「など」といういみです。',
    explanationMeaning: '「や」用於列舉，暗示還有其他類似的事物，「など」表示「等等」。',
  },
  {
    id: '2023-07-grammar-3',
    year: 2023,
    month: 7,
    section: 'grammar',
    questionNumber: 3,
    questionType: '助詞填空',
    question: '私は 毎朝 9時ごろ 家 （  ） 出ます。',
    questionReading: 'わたしは まいあさ 9じごろ いえ （  ） でます。',
    questionMeaning: '我每天早上9點左右出門。',
    options: [
      { id: '1', text: 'を', reading: 'を', meaning: '（賓語標記）' },
      { id: '2', text: 'と', reading: 'と', meaning: '和／與' },
      { id: '3', text: 'が', reading: 'が', meaning: '（主語標記）' },
      { id: '4', text: 'で', reading: 'で', meaning: '在／用' },
    ],
    correctAnswer: '1',
    explanation: '「を」用於表示離開的場所，「家を出ます」意思是「離開家／出門」。',
    explanationReading: '「を」ははなれるばしょをあらわします。「いえをでます」は「いえをはなれていく」といういみです。',
    explanationMeaning: '「を」用於表示離開的場所，「家を出ます」意思是「離開家／出門」。',
  },
  {
    id: '2023-07-grammar-4',
    year: 2023,
    month: 7,
    section: 'grammar',
    questionNumber: 4,
    questionType: '助詞填空',
    question: 'きのう スーパーで 田中さん （  ） 会いました。',
    questionReading: 'きのう スーパーで たなかさん （  ） あいました。',
    questionMeaning: '昨天在超市遇到了田中先生。',
    options: [
      { id: '1', text: 'を', reading: 'を', meaning: '（賓語標記）' },
      { id: '2', text: 'の', reading: 'の', meaning: '的' },
      { id: '3', text: 'で', reading: 'で', meaning: '在／用' },
      { id: '4', text: 'に', reading: 'に', meaning: '在／於（對象）' },
    ],
    correctAnswer: '4',
    explanation: '「に」用於表示相遇的對象，「田中さんに会いました」意思是「遇到了田中先生」。',
    explanationReading: '「に」はであったひとをあらわします。「たなかさんにあいました」は「たなかさんとであった」といういみです。',
    explanationMeaning: '「に」用於表示相遇的對象，「田中さんに会いました」意思是「遇到了田中先生」。',
  },
  {
    id: '2023-07-grammar-5',
    year: 2023,
    month: 7,
    section: 'grammar',
    questionNumber: 5,
    questionType: '助詞填空',
    question: '私の うちの ほんだなは、きょねん 父 （  ） 作りました。',
    questionReading: 'わたしの うちの ほんだなは、きょねん ちち （  ） つくりました。',
    questionMeaning: '我家的書架是去年爸爸做的。',
    options: [
      { id: '1', text: 'や', reading: 'や', meaning: '和（等等）' },
      { id: '2', text: 'が', reading: 'が', meaning: '（主語標記）' },
      { id: '3', text: 'を', reading: 'を', meaning: '（賓語標記）' },
      { id: '4', text: 'で', reading: 'で', meaning: '在／用' },
    ],
    correctAnswer: '2',
    explanation: '「が」標記動作的執行者，「父が作りました」意思是「爸爸做的」。',
    explanationReading: '「が」はどうさをしたひとをあらわします。「ちちがつくりました」は「ちちがつくった」といういみです。',
    explanationMeaning: '「が」標記動作的執行者，「父が作りました」意思是「爸爸做的」。',
  },
];

// 讀解 - 題型: 閱讀理解
export const sampleReadingQuestions: ExamQuestion[] = [
  {
    id: '2023-07-reading-1',
    year: 2023,
    month: 7,
    section: 'reading',
    questionNumber: 1,
    questionType: '內容理解',
    context: 'わたしは 毎朝 ご飯と なっとうか、パンと たまごを 食べて、学校へ 行きます。でも、けさは なにも 食べませんでした。バナナを 学校へ 持っていきました。起きた 時間が おそかったからです。',
    contextReading: 'わたしは まいあさ ごはんと なっとうか、パンと たまごを たべて、がっこうへ いきます。でも、けさは なにも たべませんでした。バナナを がっこうへ もっていきました。おきた じかんが おそかったからです。',
    contextMeaning: '我每天早上吃米飯和納豆，或者麵包和雞蛋，然後去學校。但是今天早上什麼都沒吃。我帶了香蕉去學校。因為起床的時間太晚了。',
    question: 'けさ 「わたし」は 学校へ 行く 前に、何を 食べましたか。',
    questionReading: 'けさ 「わたし」は がっこうへ いく まえに、なにを たべましたか。',
    questionMeaning: '今天早上「我」在去學校之前吃了什麼？',
    options: [
      { id: '1', text: 'ご飯と なっとうを 食べました。', reading: 'ごはんと なっとうを たべました。', meaning: '吃了米飯和納豆。' },
      { id: '2', text: 'パンと たまごを 食べました。', reading: 'パンと たまごを たべました。', meaning: '吃了麵包和雞蛋。' },
      { id: '3', text: 'なにも 食べませんでした。', reading: 'なにも たべませんでした。', meaning: '什麼都沒吃。' },
      { id: '4', text: 'バナナを 食べました。', reading: 'バナナを たべました。', meaning: '吃了香蕉。' },
    ],
    correctAnswer: '3',
    explanation: '文章說「けさは なにも 食べませんでした」，所以答案是「什麼都沒吃」。',
    explanationReading: 'ぶんしょうに「けさは なにも たべませんでした」とあります。',
    explanationMeaning: '文章中寫著「今天早上什麼都沒吃」，所以答案是「什麼都沒吃」。',
  },
  {
    id: '2023-07-reading-2',
    year: 2023,
    month: 7,
    section: 'reading',
    questionNumber: 2,
    questionType: '內容理解',
    context: '「日本語 1」と 「日本語 2」の クラスの みなさんへ\n\n今日 出川先生は お昼まで お休みです。午前の 「日本語 1」の クラスは ありません。午後の 「日本語 2」の クラスは あります。\n・「日本語 1」の しゅくだいは 来週 出して ください。\n\n年 月 日 高見大学',
    contextReading: '「にほんご 1」と 「にほんご 2」の クラスの みなさんへ\n\nきょう でがわせんせいは おひるまで おやすみです。ごぜんの 「にほんご 1」の クラスは ありません。ごごの 「にほんご 2」の クラスは あります。\n・「にほんご 1」の しゅくだいは らいしゅう だして ください。\n\nねん がつ にち たかみだいがく',
    contextMeaning: '致「日語1」和「日語2」班的全體同學\n\n今天出川老師休息到中午。上午的「日語1」課沒有。下午的「日語2」課有。\n・「日語1」的作業請下週交。\n\n年月日 高見大學',
    question: '大学は 「日本語 1」の クラスの 学生に 何が 言いたいですか。',
    questionReading: 'だいがくは 「にほんご 1」の クラスの がくせいに なにが いいたいですか。',
    questionMeaning: '大學想對「日語1」班的學生說什麼？',
    options: [
      { id: '1', text: '今日 クラスは ありません。しゅくだいは 午後 出して ください。', reading: 'きょう クラスは ありません。しゅくだいは ごご だして ください。', meaning: '今天沒有課。作業請下午交。' },
      { id: '2', text: '今日 クラスは ありません。しゅくだいは 来週 出して ください。', reading: 'きょう クラスは ありません。しゅくだいは らいしゅう だして ください。', meaning: '今天沒有課。作業請下週交。' },
      { id: '3', text: '今日 クラスが ありますが、しゅくだいは 来週 出して ください。', reading: 'きょう クラスが ありますが、しゅくだいは らいしゅう だして ください。', meaning: '今天有課，但作業請下週交。' },
      { id: '4', text: '今日 クラスが ありますから、しゅくだいを 出して ください。', reading: 'きょう クラスが ありますから、しゅくだいを だして ください。', meaning: '因為今天有課，請交作業。' },
    ],
    correctAnswer: '2',
    explanation: '文章說「午前の 『日本語 1』の クラスは ありません」和「しゅくだいは 来週 出して ください」。',
    explanationReading: 'ぶんしょうに「ごぜんの 『にほんご 1』の クラスは ありません」と「しゅくだいは らいしゅう だして ください」とあります。',
    explanationMeaning: '文章中寫著「上午的『日語1』課沒有」和「作業請下週交」。',
  },
];

// 匯總所有樣本題目
export const allSampleQuestions: ExamQuestion[] = [
  ...sampleVocabularyQuestions,
  ...sampleGrammarQuestions,
  ...sampleReadingQuestions,
];

// 根據條件篩選題目
export function filterQuestions(
  questions: ExamQuestion[],
  years: number[],
  sections: string[],
  shuffle: boolean = false
): ExamQuestion[] {
  let filtered = questions.filter(q => {
    const yearMatch = years.length === 0 || years.includes(q.year);
    const sectionMatch = sections.length === 0 || sections.includes(q.section);
    return yearMatch && sectionMatch;
  });

  if (shuffle) {
    filtered = [...filtered].sort(() => Math.random() - 0.5);
  }

  return filtered;
}
