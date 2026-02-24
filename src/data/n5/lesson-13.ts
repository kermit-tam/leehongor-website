import { N5Lesson } from './types';

const lesson13Units = [
  {
    id: 1,
    title: '週末活動',
    subtitle: '遊玩與運動',
    estimatedTime: 6,
    vocab: [
      { hiragana: 'あそびます', kanji: '遊びます', meaning: '玩兒', cantonese: '玩', note: '' },
      { hiragana: 'およぎます', kanji: '泳ぎます', meaning: '遊泳', cantonese: '游水', note: '' },
      { hiragana: 'むかえます', kanji: '迎えます', meaning: '迎接', cantonese: '接', note: '' },
      { hiragana: 'つかれます', kanji: '疲れます', meaning: '累', cantonese: '攰', note: '' },
      { hiragana: 'しゅうまつ', kanji: '週末', meaning: '周末', cantonese: '週末', note: '' },
      { hiragana: 'プール', kanji: '', meaning: '遊泳池', cantonese: '泳池', note: '' },
      { hiragana: 'かわ', kanji: '川', meaning: '河流', cantonese: '河', note: '' },
      { hiragana: 'スキー', kanji: '', meaning: '滑雪', cantonese: '滑雪', note: '' },
      { hiragana: 'つり', kanji: '釣り', meaning: '釣魚', cantonese: '釣魚', note: '' },
      { hiragana: 'びじゅつ', kanji: '美術', meaning: '美術', cantonese: '美術', note: '' },
    ],
  },
  {
    id: 2,
    title: '日常活動',
    subtitle: '生活動詞',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'けっこんします', kanji: '結婚します', meaning: '結婚', cantonese: '結婚', note: '' },
      { hiragana: 'かいものします', kanji: '買い物します', meaning: '買東西', cantonese: '買嘢', note: '' },
      { hiragana: 'しょくじします', kanji: '食事します', meaning: '吃飯、用餐', cantonese: '食飯', note: '' },
      { hiragana: 'さんぽします', kanji: '散歩します', meaning: '散步', cantonese: '散步', note: '' },
      { hiragana: '[お]しょうがつ', kanji: '[お]正月', meaning: '新年', cantonese: '新年', note: '' },
      { hiragana: '～ごろ～', kanji: '', meaning: '～左右', cantonese: '左右', note: '' },
      { hiragana: 'なにか', kanji: '何か', meaning: '什麼、某事物', cantonese: '啲嘢', note: '' },
      { hiragana: 'どこか', kanji: '', meaning: '哪裏、某處', cantonese: '邊度', note: '' },
    ],
  },
  {
    id: 3,
    title: '形容詞',
    subtitle: '描述感受',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'たいへん[な]', kanji: '大変[な]', meaning: '很(累人)、相當(辛苦)', cantonese: '好辛苦', note: 'な形容詞' },
      { hiragana: 'ほしい', kanji: '欲しい', meaning: '想要', cantonese: '想要', note: '' },
      { hiragana: 'ひろい', kanji: '広い', meaning: '寬', cantonese: '闊', note: '' },
      { hiragana: 'せまい', kanji: '狭い', meaning: '窄', cantonese: '窄', note: '' },
      { hiragana: 'のどが かわきます', kanji: '', meaning: '口渴', cantonese: '口渴', note: '' },
      { hiragana: 'おなかが すきます', kanji: '', meaning: '肚子餓', cantonese: '肚餓', note: '' },
    ],
  },
  {
    id: 4,
    title: '餐廳對話',
    subtitle: '點餐與服務',
    estimatedTime: 6,
    vocab: [
      { hiragana: 'ご注文(ちゅうもん)は？', kanji: '', meaning: '您點什麼？', cantonese: '請問點咩？', note: '' },
      { hiragana: 'ていしょく', kanji: '定食', meaning: '套餐', cantonese: '定食', note: '' },
      { hiragana: 'ぎゅうどん', kanji: '牛どん', meaning: '牛肉蓋飯', cantonese: '牛丼', note: '' },
      { hiragana: '[しょうしょう] お待(ま)ちください', kanji: '', meaning: '請稍等。', cantonese: '請稍等', note: '' },
      { hiragana: '～で ございます', kanji: '', meaning: '(「です」的禮貌用語)', cantonese: '係（禮貌語）', note: '' },
      { hiragana: 'べつべつに', kanji: '別々に', meaning: '分別', cantonese: '分開', note: '' },
      { hiragana: 'そう しましょう。', kanji: '', meaning: '就這樣幹吧。', cantonese: '就咁做啦。', note: '' },
    ],
    dialogue: [
      { speaker: '店員', japanese: 'いらっしゃいませ。ご注文は？', cantonese: '歡迎光臨。請問點咩？', meaning: '歡迎光臨。您要點什麼？' },
      { speaker: '客', japanese: 'ぎゅうどんをお願いします。', cantonese: '牛丼唔該。', meaning: '請給我牛肉蓋飯。' },
      { speaker: '店員', japanese: 'かしこまりました。少々お待ちください。', cantonese: '明白。請稍等。', meaning: '好的。請稍等。' },
    ],
  },
];

export const lesson13Data: N5Lesson = {
  id: 'n5-lesson-13',
  lessonNum: 13,
  title: '週末與日常活動',
  description: '學習週末活動、日常動詞、餐廳點餐對話。分4個微單元。',
  totalVocab: 33,
  totalTime: 22,
  units: lesson13Units,
};
