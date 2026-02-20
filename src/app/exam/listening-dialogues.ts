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
      { speaker: 'A', text: 'すみません。おなまえは？' },
      { speaker: 'B', text: 'たなかです。' },
      { speaker: 'A', text: 'たなかさんですか。どうぞよろしく。' },
      { speaker: 'B', text: 'こちらこそ。' },
    ],
    question: 'Bさんの名前は何ですか。',
    options: ['スミス', 'たなか', 'ともだち', 'せんせい'],
    correctIndex: 1,
    explanation: 'Bが「たなかです」と言いました。',
  },
  {
    id: 'listen-1-2',
    lessonRange: [1, 2],
    difficulty: 1,
    dialogue: [
      { speaker: 'A', text: 'はじめまして。わたしはがくせいです。' },
      { speaker: 'B', text: 'こちらこそ。わたしもがくせいです。' },
    ],
    question: 'Aさんは何ですか。',
    options: ['がくせい', 'せんせい', 'かいしゃいん', 'いしゃ'],
    correctIndex: 0,
    explanation: 'Aが「わたしはがくせいです」と言いました。',
  },
  // ===== 第2課程度 =====
  {
    id: 'listen-2-1',
    lessonRange: [2, 3],
    difficulty: 1,
    dialogue: [
      { speaker: 'A', text: 'これはなんですか。' },
      { speaker: 'B', text: 'それはほんです。' },
      { speaker: 'A', text: 'あれもほんですか。' },
      { speaker: 'B', text: 'いいえ、あれはじしょです。' },
    ],
    question: 'あれは何ですか。',
    options: ['ほん', 'じしょ', 'ざっし', 'しんぶん'],
    correctIndex: 1,
    explanation: 'Bが「あれはじしょです」と言いました。',
  },
  {
    id: 'listen-2-2',
    lessonRange: [2, 3],
    difficulty: 1,
    dialogue: [
      { speaker: 'A', text: 'これはわたしのかばんです。' },
      { speaker: 'B', text: 'それはいくらですか。' },
      { speaker: 'A', text: 'さんぜんえんです。' },
    ],
    question: 'かばんはいくらですか。',
    options: ['さんぜんえん', 'さんびゃくえん', 'さんえん', 'さんまんえん'],
    correctIndex: 0,
    explanation: 'Aが「さんぜんえんです」と言いました。',
  },
  // ===== 第3課程度 =====
  {
    id: 'listen-3-1',
    lessonRange: [3, 4],
    difficulty: 1,
    dialogue: [
      { speaker: 'A', text: 'すみません。トイレはどこですか。' },
      { speaker: 'B', text: 'あちらです。' },
      { speaker: 'A', text: 'ありがとうございます。' },
    ],
    question: 'Aさんは何を探していますか。',
    options: ['かいだん', 'トイレ', 'うりば', 'でんわ'],
    correctIndex: 1,
    explanation: 'Aが「トイレはどこですか」と尋ねました。',
  },
  {
    id: 'listen-3-2',
    lessonRange: [3, 4],
    difficulty: 2,
    dialogue: [
      { speaker: '店員', text: 'いらっしゃいませ。' },
      { speaker: 'A', text: 'あのう、くつはどこですか。' },
      { speaker: '店員', text: 'くつはちかです。' },
      { speaker: 'A', text: 'わかりました。' },
    ],
    question: 'くつはどこですか。',
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
      { speaker: 'A', text: 'いまなんじですか。' },
      { speaker: 'B', text: 'さんじです。' },
      { speaker: 'A', text: 'にほんごのクラスはなんじからですか。' },
      { speaker: 'B', text: 'よじからです。' },
    ],
    question: 'にほんごのクラスはなんじからですか。',
    options: ['さんじ', 'よじ', 'ごじ', 'ろくじ'],
    correctIndex: 1,
    explanation: 'Bが「よじからです」と言いました。',
  },
  {
    id: 'listen-4-2',
    lessonRange: [4, 5],
    difficulty: 2,
    dialogue: [
      { speaker: 'A', text: 'まいにちなんじにおきますか。' },
      { speaker: 'B', text: 'ろくじにおきます。' },
      { speaker: 'A', text: 'なんじにかいしゃへいきますか。' },
      { speaker: 'B', text: 'はちじにいきます。' },
    ],
    question: 'Bさんはなんじにおきますか。',
    options: ['ろくじ', 'はちじ', 'くじ', 'しちじ'],
    correctIndex: 0,
    explanation: 'Bが「ろくじにおきます」と言いました。',
  },
  // ===== 第5課程度 =====
  {
    id: 'listen-5-1',
    lessonRange: [5, 7],
    difficulty: 2,
    dialogue: [
      { speaker: 'A', text: 'きょうはなんようびですか。' },
      { speaker: 'B', text: 'きんようびです。' },
      { speaker: 'A', text: 'あしたは？' },
      { speaker: 'B', text: 'どようびです。' },
    ],
    question: 'きょうはなんようびですか。',
    options: ['きんようび', 'どようび', 'にちようび', 'げつようび'],
    correctIndex: 0,
    explanation: 'Bが「きんようびです」と言いました。',
  },
  {
    id: 'listen-5-2',
    lessonRange: [5, 7],
    difficulty: 2,
    dialogue: [
      { speaker: 'A', text: 'せんしゅうどこへいきましたか。' },
      { speaker: 'B', text: 'にほんへいきました。' },
      { speaker: 'A', text: 'なんでいきましたか。' },
      { speaker: 'B', text: 'ひこうきでいきました。' },
    ],
    question: 'Bさんはなんでにほんへいきましたか。',
    options: ['ひこうき', 'でんしゃ', 'バス', 'じてんしゃ'],
    correctIndex: 0,
    explanation: 'Bが「ひこうきでいきました」と言いました。',
  },
  // ===== 第6課程度 =====
  {
    id: 'listen-6-1',
    lessonRange: [6, 8],
    difficulty: 2,
    dialogue: [
      { speaker: 'A', text: 'きのうのばんごはんは何を食べましたか。' },
      { speaker: 'B', text: 'にくを食べました。' },
      { speaker: 'A', text: 'おさけを飲みましたか。' },
      { speaker: 'B', text: 'いいえ、おちゃを飲みました。' },
    ],
    question: 'Bさんは何を飲みましたか。',
    options: ['おさけ', 'おちゃ', 'コーヒー', 'ジュース'],
    correctIndex: 1,
    explanation: 'Bが「おちゃを飲みました」と言いました。',
  },
  {
    id: 'listen-6-2',
    lessonRange: [6, 8],
    difficulty: 2,
    dialogue: [
      { speaker: 'A', text: 'にほんごをべんきょうしますか。' },
      { speaker: 'B', text: 'はい、まいにちべんきょうします。' },
      { speaker: 'A', text: 'どこでべんきょうしますか。' },
      { speaker: 'B', text: 'だいがくでべんきょうします。' },
    ],
    question: 'Bさんはどこでべんきょうしますか。',
    options: ['だいがく', 'うち', 'としょかん', 'きっさてん'],
    correctIndex: 0,
    explanation: 'Bが「だいがくでべんきょうします」と言いました。',
  },
  // ===== 第8課程度（形容詞） =====
  {
    id: 'listen-8-1',
    lessonRange: [8, 10],
    difficulty: 2,
    dialogue: [
      { speaker: 'A', text: 'あのレストランはどうですか。' },
      { speaker: 'B', text: 'おいしいです。でも、たかいです。' },
      { speaker: 'A', text: 'そうですか。' },
    ],
    question: 'レストランはどうですか。',
    options: ['おいしい、やすい', 'おいしい、たかい', 'まずい、やすい', 'まずい、たかい'],
    correctIndex: 1,
    explanation: 'Bが「おいしいです。でも、たかいです」と言いました。',
  },
  {
    id: 'listen-8-2',
    lessonRange: [8, 10],
    difficulty: 3,
    dialogue: [
      { speaker: 'A', text: 'このへやはどうですか。' },
      { speaker: 'B', text: 'ひろくて、きれいです。' },
      { speaker: 'A', text: 'よかったですね。' },
    ],
    question: 'へやはどうですか。',
    options: ['せまくて、きたない', 'せまくて、きれい', 'ひろくて、きたない', 'ひろくて、きれい'],
    correctIndex: 3,
    explanation: 'Bが「ひろくて、きれいです」と言いました。',
  },
  // ===== 第9課程度（て形） =====
  {
    id: 'listen-9-1',
    lessonRange: [9, 10],
    difficulty: 2,
    dialogue: [
      { speaker: 'A', text: 'きのう何をしましたか。' },
      { speaker: 'B', text: 'えいがを見て、ほんを読みました。' },
    ],
    question: 'Bさんは何をしましたか。',
    options: ['えいがを見ました', 'ほんを読みました', 'えいがを見て、ほんを読みました', 'ねました'],
    correctIndex: 2,
    explanation: 'Bが「えいがを見て、ほんを読みました」と言いました。',
  },
  {
    id: 'listen-9-2',
    lessonRange: [9, 15],
    difficulty: 3,
    dialogue: [
      { speaker: 'A', text: 'いっしょにランチを食べませんか。' },
      { speaker: 'B', text: 'いいですね。どこへ行きますか。' },
      { speaker: 'A', text: 'あのレストランはどうですか。やすくて、おいしいですよ。' },
      { speaker: 'B', text: 'そうですか。じゃあ、行きましょう。' },
    ],
    question: 'レストランはどうですか。',
    options: ['たかくて、おいしい', 'やすくて、まずい', 'やすくて、おいしい', 'たかくて、まずい'],
    correctIndex: 2,
    explanation: 'Aが「やすくて、おいしいですよ」と言いました。',
  },
];

// 根據課程進度獲取合適的對話
export function getListeningDialogues(upToLesson: number): ListeningDialogue[] {
  return listeningDialogues.filter(
    d => d.lessonRange[0] <= upToLesson && d.lessonRange[1] >= upToLesson
  );
}
