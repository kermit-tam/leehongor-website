/**
 * 聆聽對話數據
 * Listening Dialogue Data
 * 
 * N5 格式：聽對話 → 答問題
 */

export interface ListeningDialogue {
  id: string;
  lessonRange: [number, number]; // 適用課程範圍
  difficulty: 1 | 2 | 3;
  dialogue: Array<{
    speaker: string;
    text: string;
  }>;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// N5 聆聽對話題庫
export const listeningDialogues: ListeningDialogue[] = [
  // ===== 第1課程度 =====
  {
    id: 'listen-1-1',
    lessonRange: [1, 2],
    difficulty: 1,
    dialogue: [
      { speaker: '男', text: 'すみません。おなまえは？' },
      { speaker: '女', text: 'たなかです。' },
      { speaker: '男', text: 'たなかさんですか。どうぞよろしく。' },
      { speaker: '女', text: 'こちらこそ。' },
    ],
    question: '「たなかです」と言った人はだれですか。',
    options: ['男の人', '女の人', 'せんせい', 'がくせい'],
    correctIndex: 1,
    explanation: '女の人が「たなかです」と言いました。',
  },
  {
    id: 'listen-1-2',
    lessonRange: [1, 2],
    difficulty: 1,
    dialogue: [
      { speaker: '男', text: 'はじめまして。わたしはがくせいです。' },
      { speaker: '女', text: 'こちらこそ。わたしもがくせいです。' },
    ],
    question: '最初に話している人のしごとは何ですか。',
    options: ['がくせい', 'せんせい', 'かいしゃいん', 'いしゃ'],
    correctIndex: 0,
    explanation: '最初の人が「わたしはがくせいです」と言いました。',
  },
  // ===== 第2課程度 =====
  {
    id: 'listen-2-1',
    lessonRange: [2, 3],
    difficulty: 1,
    dialogue: [
      { speaker: '店員', text: 'いらっしゃいませ。' },
      { speaker: '客', text: 'これはなんですか。' },
      { speaker: '店員', text: 'それはほんです。' },
      { speaker: '客', text: 'あれもほんですか。' },
      { speaker: '店員', text: 'いいえ、あれはじしょです。' },
    ],
    question: '遠くのものは何ですか。',
    options: ['ほん', 'じしょ', 'ざっし', 'しんぶん'],
    correctIndex: 1,
    explanation: '店員が「あれはじしょです」と言いました。',
  },
  {
    id: 'listen-2-2',
    lessonRange: [2, 3],
    difficulty: 1,
    dialogue: [
      { speaker: '女', text: 'これはわたしのかばんです。' },
      { speaker: '男', text: 'それはいくらですか。' },
      { speaker: '女', text: 'さんぜんえんです。' },
    ],
    question: 'かばんの値段はいくらですか。',
    options: ['さんぜんえん', 'さんびゃくえん', 'さんえん', 'さんまんえん'],
    correctIndex: 0,
    explanation: '女の人が「さんぜんえんです」と言いました。',
  },
  // ===== 第3課程度 =====
  {
    id: 'listen-3-1',
    lessonRange: [3, 4],
    difficulty: 1,
    dialogue: [
      { speaker: '客', text: 'すみません。トイレはどこですか。' },
      { speaker: '店員', text: 'あちらです。' },
      { speaker: '客', text: 'ありがとうございます。' },
    ],
    question: '客は何を探していますか。',
    options: ['かいだん', 'トイレ', 'うりば', 'でんわ'],
    correctIndex: 1,
    explanation: '客が「トイレはどこですか」と尋ねました。',
  },
  {
    id: 'listen-3-2',
    lessonRange: [3, 4],
    difficulty: 2,
    dialogue: [
      { speaker: '店員', text: 'いらっしゃいませ。' },
      { speaker: '女', text: 'あのう、くつはどこですか。' },
      { speaker: '店員', text: 'くつはちかです。' },
      { speaker: '女', text: 'わかりました。' },
    ],
    question: 'くつ売り場はどこですか。',
    options: ['いちかい', 'にかい', 'ちか', 'よんかい'],
    correctIndex: 2,
    explanation: '店員が「くつはちかです」と言いました。',
  },
  // ===== 第4課程度 =====
  {
    id: 'listen-4-1',
    lessonRange: [4, 5],
    difficulty: 1,
    dialogue: [
      { speaker: '男', text: 'いまなんじですか。' },
      { speaker: '女', text: 'さんじです。' },
      { speaker: '男', text: 'にほんごのクラスはなんじからですか。' },
      { speaker: '女', text: 'よじからです。' },
    ],
    question: '日本語のクラスは何時からですか。',
    options: ['3時', '4時', '5時', '6時'],
    correctIndex: 1,
    explanation: '女の人が「よじからです」と言いました。',
  },
  {
    id: 'listen-4-2',
    lessonRange: [4, 5],
    difficulty: 2,
    dialogue: [
      { speaker: '女', text: 'まいにちなんじにおきますか。' },
      { speaker: '男', text: 'ろくじにおきます。' },
      { speaker: '女', text: 'なんじにかいしゃへいきますか。' },
      { speaker: '男', text: 'はちじにいきます。' },
    ],
    question: '男の人は何時に起きますか。',
    options: ['6時', '7時', '8時', '9時'],
    correctIndex: 0,
    explanation: '男の人が「ろくじにおきます」と言いました。',
  },
  // ===== 第5課程度 =====
  {
    id: 'listen-5-1',
    lessonRange: [5, 7],
    difficulty: 2,
    dialogue: [
      { speaker: '男', text: 'きょうはなんようびですか。' },
      { speaker: '女', text: 'きんようびです。' },
      { speaker: '男', text: 'あしたは？' },
      { speaker: '女', text: 'どようびです。' },
    ],
    question: '今日は何曜日ですか。',
    options: ['月曜日', '金曜日', '土曜日', '日曜日'],
    correctIndex: 1,
    explanation: '女の人が「きんようびです」と言いました。',
  },
  {
    id: 'listen-5-2',
    lessonRange: [5, 7],
    difficulty: 2,
    dialogue: [
      { speaker: '女', text: 'せんしゅうどこへいきましたか。' },
      { speaker: '男', text: 'にほんへいきました。' },
      { speaker: '女', text: 'なんでいきましたか。' },
      { speaker: '男', text: 'ひこうきでいきました。' },
    ],
    question: '男の人はどうやって日本へ行きましたか。',
    options: ['飛行機', '電車', 'バス', '自転車'],
    correctIndex: 0,
    explanation: '男の人が「ひこうきでいきました」と言いました。',
  },
  // ===== 第6課程度 =====
  {
    id: 'listen-6-1',
    lessonRange: [6, 8],
    difficulty: 2,
    dialogue: [
      { speaker: '女', text: 'きのうのばんごはんは何を食べましたか。' },
      { speaker: '男', text: 'にくを食べました。' },
      { speaker: '女', text: 'おさけを飲みましたか。' },
      { speaker: '男', text: 'いいえ、おちゃを飲みました。' },
    ],
    question: '男の人は何を飲みましたか。',
    options: ['お酒', 'お茶', 'コーヒー', 'ジュース'],
    correctIndex: 1,
    explanation: '男の人が「おちゃを飲みました」と言いました。',
  },
  {
    id: 'listen-6-2',
    lessonRange: [6, 8],
    difficulty: 2,
    dialogue: [
      { speaker: '男', text: 'にほんごをべんきょうしますか。' },
      { speaker: '女', text: 'はい、まいにちべんきょうします。' },
      { speaker: '男', text: 'どこでべんきょうしますか。' },
      { speaker: '女', text: 'だいがくでべんきょうします。' },
    ],
    question: '女の人はどこで勉強しますか。',
    options: ['大学', '家', '図書館', '喫茶店'],
    correctIndex: 0,
    explanation: '女の人が「だいがくでべんきょうします」と言いました。',
  },
  // ===== 第8課程度（形容詞） =====
  {
    id: 'listen-8-1',
    lessonRange: [8, 10],
    difficulty: 2,
    dialogue: [
      { speaker: '女', text: 'あのレストランはどうですか。' },
      { speaker: '男', text: 'おいしいです。でも、たかいです。' },
      { speaker: '女', text: 'そうですか。' },
    ],
    question: 'レストランはどうですか。',
    options: ['美味しい、安い', '美味しい、高い', '不味い、安い', '不味い、高い'],
    correctIndex: 1,
    explanation: '男の人が「おいしいです。でも、たかいです」と言いました。',
  },
  {
    id: 'listen-8-2',
    lessonRange: [8, 10],
    difficulty: 3,
    dialogue: [
      { speaker: '男', text: 'このへやはどうですか。' },
      { speaker: '女', text: 'ひろくて、きれいです。' },
      { speaker: '男', text: 'よかったですね。' },
    ],
    question: '部屋はどんな部屋ですか。',
    options: ['狭くて、汚い', '狭くて、綺麗', '広くて、汚い', '広くて、綺麗'],
    correctIndex: 3,
    explanation: '女の人が「ひろくて、きれいです」と言いました。',
  },
  // ===== 第9課程度（て形） =====
  {
    id: 'listen-9-1',
    lessonRange: [9, 10],
    difficulty: 2,
    dialogue: [
      { speaker: '男', text: 'きのう何をしましたか。' },
      { speaker: '女', text: 'えいがを見て、ほんを読みました。' },
    ],
    question: '女の人は昨日何をしましたか。',
    options: ['映画を見ました', '本を読みました', '映画を見て、本を読みました', '寝ました'],
    correctIndex: 2,
    explanation: '女の人が「えいがを見て、ほんを読みました」と言いました。',
  },
  {
    id: 'listen-9-2',
    lessonRange: [9, 15],
    difficulty: 3,
    dialogue: [
      { speaker: '女', text: '一緒にランチを食べませんか。' },
      { speaker: '男', text: 'いいですね。どこへ行きますか。' },
      { speaker: '女', text: 'あのレストランはどうですか。安くて、美味しいですよ。' },
      { speaker: '男', text: 'そうですか。じゃあ、行きましょう。' },
    ],
    question: 'レストランはどうですか。',
    options: ['高くて、美味しい', '安くて、不味い', '安くて、美味しい', '高くて、不味い'],
    correctIndex: 2,
    explanation: '女の人が「やすくて、おいしいですよ」と言いました。',
  },
];

// 根據課程進度獲取合適的對話
export function getListeningDialogues(upToLesson: number): ListeningDialogue[] {
  return listeningDialogues.filter(
    d => d.lessonRange[0] <= upToLesson && d.lessonRange[1] >= upToLesson
  );
}
