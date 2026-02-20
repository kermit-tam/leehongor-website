/**
 * 大家的日本語 N5 第8課：位置與存在句
 * Minna no Nihongo N5 Lesson 8: Location and Existence
 * 
 * 來源：大家的日本語 初級 I (第2版)
 */

import { N5Lesson } from './types';

export const lesson8Data: N5Lesson = {
  id: 'n5-lesson-8',
  lessonNum: 8,
  title: '位置與存在句',
  description: '學習「あります／います」表達存在。分4個微單元。',
  totalVocab: 40,
  totalTime: 20,
  units: [
    {
      id: 1,
      title: '存在句',
      subtitle: 'あります／います',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'あります', kanji: '', meaning: '有（物）', cantonese: '有', note: '無生命' },
        { hiragana: 'います', kanji: '', meaning: '有（人/動物）', cantonese: '有', note: '有生命' },
        { hiragana: 'いろいろ', kanji: '色々', meaning: '各種各樣', cantonese: '各式各樣', note: '' },
        { hiragana: 'おとこのひと', kanji: '男の人', meaning: '男人', cantonese: '男人', note: '' },
        { hiragana: 'おんなのひと', kanji: '女の人', meaning: '女人', cantonese: '女人', note: '' },
        { hiragana: 'おとこのこ', kanji: '男の子', meaning: '男孩', cantonese: '男仔', note: '' },
        { hiragana: 'おんなのこ', kanji: '女の子', meaning: '女孩', cantonese: '女仔', note: '' },
        { hiragana: 'いぬ', kanji: '犬', meaning: '狗', cantonese: '狗', note: '' },
        { hiragana: 'ねこ', kanji: '猫', meaning: '貓', cantonese: '貓', note: '' },
        { hiragana: 'うし', kanji: '牛', meaning: '牛', cantonese: '牛', note: '' },
      ],
      grammar: [
        {
          pattern: '～に～があります／います',
          meaning: '在～有～',
          example: 'つくえのうえにほんがあります。',
          exampleMeaning: '桌上有書。',
        },
        {
          pattern: '～は～にあります／います',
          meaning: '～在～',
          example: 'いぬはいえのまえにいます。',
          exampleMeaning: '狗在家門前。',
        },
      ],
    },
    {
      id: 2,
      title: '位置詞',
      subtitle: '上、下、裡面',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'うえ', kanji: '上', meaning: '上面', cantonese: '上面', note: '' },
        { hiragana: 'した', kanji: '下', meaning: '下面', cantonese: '下面', note: '' },
        { hiragana: 'なか', kanji: '中', meaning: '裡面', cantonese: '入面', note: '' },
        { hiragana: 'そと', kanji: '外', meaning: '外面', cantonese: '出面', note: '' },
        { hiragana: 'まえ', kanji: '前', meaning: '前面', cantonese: '前面', note: '' },
        { hiragana: 'うしろ', kanji: '後ろ', meaning: '後面', cantonese: '後面', note: '' },
        { hiragana: 'みぎ', kanji: '右', meaning: '右邊', cantonese: '右邊', note: '' },
        { hiragana: 'ひだり', kanji: '左', meaning: '左邊', cantonese: '左邊', note: '' },
        { hiragana: 'ちかく', kanji: '近く', meaning: '附近', cantonese: '附近', note: '' },
        { hiragana: 'となり', kanji: '隣', meaning: '旁邊', cantonese: '隔離', note: '' },
      ],
    },
    {
      id: 3,
      title: '建築物設施',
      subtitle: '公園、圖書館',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'こうえん', kanji: '公園', meaning: '公園', cantonese: '公園', note: '' },
        { hiragana: 'としょかん', kanji: '図書館', meaning: '圖書館', cantonese: '圖書館', note: '' },
        { hiragana: 'びょういん', kanji: '病院', meaning: '醫院', cantonese: '醫院', note: '' },
        { hiragana: 'くすりや', kanji: '薬屋', meaning: '藥房', cantonese: '藥房', note: '' },
        { hiragana: 'ぎんこう', kanji: '銀行', meaning: '銀行', cantonese: '銀行', note: '' },
        { hiragana: 'ゆうびんきょく', kanji: '郵便局', meaning: '郵局', cantonese: '郵局', note: '' },
        { hiragana: 'けいさつ', kanji: '警察', meaning: '警察', cantonese: '警察', note: '' },
        { hiragana: 'だいがく', kanji: '大学', meaning: '大學', cantonese: '大學', note: '' },
        { hiragana: 'ホテル', kanji: 'Hotel', meaning: '酒店', cantonese: '酒店', note: '' },
        { hiragana: 'パンや', kanji: 'パン屋', meaning: '麵包店', cantonese: '麵包舖', note: '' },
      ],
    },
    {
      id: 4,
      title: '問路情境',
      subtitle: '尋找位置',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'ほんとうですか', kanji: '本当ですか', meaning: '真的嗎？', cantonese: '真係呀？', note: '' },
        { hiragana: 'とても', kanji: '', meaning: '非常', cantonese: '非常', note: '' },
        { hiragana: 'あまり', kanji: '', meaning: '不太', cantonese: '唔係好', note: '+ 否定' },
        { hiragana: 'すこし', kanji: '少し', meaning: '一點', cantonese: '少少', note: '' },
        { hiragana: 'ぜんぜん', kanji: '全然', meaning: '完全（不）', cantonese: '完全唔', note: '+ 否定' },
        { hiragana: 'おおく', kanji: '多く', meaning: '很多', cantonese: '好多', note: '' },
        { hiragana: '～くらい', kanji: '～位', meaning: '～左右', cantonese: '左右', note: '' },
        { hiragana: 'たいへん', kanji: '大変', meaning: '非常/辛苦', cantonese: '非常', note: '' },
        { hiragana: 'しっています', kanji: '知っています', meaning: '知道', cantonese: '知道', note: '' },
        { hiragana: 'わかりません', kanji: '分かりません', meaning: '不知道', cantonese: '唔知道', note: '' },
      ],
      dialogue: [
        { speaker: 'A', japanese: 'すみません。ぎんこうはどこですか。', cantonese: '唔該，銀行喺邊？', meaning: '請問，銀行在哪裡？' },
        { speaker: 'B', japanese: 'ぎんこうはえきのちかくにあります。', cantonese: '銀行喺車站附近。', meaning: '銀行在車站附近。' },
        { speaker: 'A', japanese: 'ありがとうございます。', cantonese: '多謝。', meaning: '謝謝。' },
      ],
    },
  ],
};
