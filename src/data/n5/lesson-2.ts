/**
 * 大家的日本語 N5 第2課：這是什麼
 * 
 * 來源：大家的日本語 初級 I (第2版)
 */

import { N5Lesson } from './types';

export const lesson2Data: N5Lesson = {
  id: 'n5-lesson-2',
  lessonNum: 2,
  title: '這是什麼',
  description: '學習物品名稱和「これ/それ/あれ」的用法。分5個微單元。',
  totalVocab: 45,
  totalTime: 25,
  units: [
    {
      id: 1,
      title: '指示代名詞',
      subtitle: 'これ・それ・あれ',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'これ', kanji: '', meaning: '這（離說話人近的東西）', cantonese: '哥咧', note: '' },
        { hiragana: 'それ', kanji: '', meaning: '那（離聽話人近的東西）', cantonese: '梳咧', note: '' },
        { hiragana: 'あれ', kanji: '', meaning: '那（離說話人、聽話人都遠的東西）', cantonese: '阿咧', note: '' },
        { hiragana: 'この ～', kanji: '', meaning: '這個', cantonese: '哥囉', note: '後接名詞' },
        { hiragana: 'その ～', kanji: '', meaning: '那個', cantonese: '梳囉', note: '後接名詞' },
        { hiragana: 'あの ～', kanji: '', meaning: '那個', cantonese: '阿囉', note: '後接名詞' },
      ],
      grammar: [
        {
          pattern: 'これ/それ/あれは～です',
          meaning: '這/那是～',
          example: 'これはほんです。',
          exampleMeaning: '這是書。',
        },
        {
          pattern: 'この/その/あの＋名詞は～です',
          meaning: '這個/那個～是～',
          example: 'このほんはわたしのです。',
          exampleMeaning: '這本書是我的。',
        },
      ],
    },
    {
      id: 2,
      title: '日常用品',
      subtitle: '書本和文具',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'ほん', kanji: '本', meaning: '書', cantonese: '虹', note: '' },
        { hiragana: 'じしょ', kanji: '辞書', meaning: '字典', cantonese: '芝梳', note: '' },
        { hiragana: 'ざっし', kanji: '雑誌', meaning: '雜誌', cantonese: '咋士', note: '' },
        { hiragana: 'しんぶん', kanji: '新聞', meaning: '報紙', cantonese: '心崩', note: '' },
        { hiragana: 'ノート', kanji: '', meaning: '筆記本', cantonese: '囉多', note: '外來語' },
        { hiragana: 'てちょう', kanji: '手帳', meaning: '記事本', cantonese: '鉄昭', note: '' },
        { hiragana: 'めいし', kanji: '名刺', meaning: '名片', cantonese: '咩西', note: '' },
        { hiragana: 'カード', kanji: '', meaning: '卡片', cantonese: '卡多', note: '外來語' },
        { hiragana: 'えんぴつ', kanji: '鉛筆', meaning: '鉛筆', cantonese: '胭筆', note: '' },
        { hiragana: 'ボールペン', kanji: '', meaning: '圓珠筆', cantonese: '波囉筆', note: '外來語' },
        { hiragana: 'シャープペンシル', kanji: '', meaning: '自動鉛筆', cantonese: '些阿啤 芯梳', note: '外來語' },
      ],
    },
    {
      id: 3,
      title: '電器和家具',
      subtitle: '家中物品',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'かぎ', kanji: '鍵', meaning: '鑰匙', cantonese: '卡gi', note: '' },
        { hiragana: 'とけい', kanji: '時計', meaning: '鐘表', cantonese: '多kei', note: '' },
        { hiragana: 'かさ', kanji: '傘', meaning: '傘', cantonese: '卡撒', note: '' },
        { hiragana: 'かばん', kanji: '', meaning: '皮包、提包', cantonese: '卡崩', note: '' },
        { hiragana: 'CD', kanji: '', meaning: 'CD、光盤', cantonese: '西迪', note: '外來語' },
        { hiragana: 'テレビ', kanji: '', meaning: '電視', cantonese: '堤碑', note: '外來語' },
        { hiragana: 'ラジオ', kanji: '', meaning: '收音機', cantonese: '啦芝哦', note: '外來語' },
        { hiragana: 'カメラ', kanji: '', meaning: '照相機', cantonese: '卡咩啦', note: '外來語' },
        { hiragana: 'コンピューター', kanji: '', meaning: '電腦', cantonese: '拱啤有多', note: '外來語' },
        { hiragana: 'くるま', kanji: '車', meaning: '汽車', cantonese: '古路嘛', note: '' },
        { hiragana: 'つくえ', kanji: '机', meaning: '桌子', cantonese: '刺古也', note: '' },
        { hiragana: 'いす', kanji: '椅子', meaning: '椅子', cantonese: '衣士', note: '' },
      ],
    },
    {
      id: 4,
      title: '食物和語言',
      subtitle: '飲食與語言',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'チョコレート', kanji: '', meaning: '巧克力', cantonese: '租古咧多', note: '外來語' },
        { hiragana: 'コーヒー', kanji: '', meaning: '咖啡', cantonese: '拱啡', note: '外來語' },
        { hiragana: '[お]みやげ', kanji: '[お]土産', meaning: '禮物', cantonese: '[哦]咪也gi', note: '' },
        { hiragana: 'えいご', kanji: '英語', meaning: '英語', cantonese: '英語', note: '' },
        { hiragana: 'にほんご', kanji: '日本語', meaning: '日語', cantonese: '你虹語', note: '' },
        { hiragana: '～ご', kanji: '～語', meaning: '～語', cantonese: '語', note: '' },
        { hiragana: 'なん', kanji: '何', meaning: '什麼', cantonese: '難', note: '' },
      ],
    },
    {
      id: 5,
      title: '基本對話',
      subtitle: '常用會話',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'そう', kanji: '', meaning: '是（肯定回答）', cantonese: '搜', note: '' },
        { hiragana: 'あのう', kanji: '', meaning: '欸...', cantonese: '阿囉', note: '用於客氣、躊躇打招呼' },
        { hiragana: 'えっ', kanji: '', meaning: '嗨...', cantonese: '也', note: '聽到意外消息驚嘆' },
        { hiragana: 'どうぞ', kanji: '', meaning: '請', cantonese: '多囉', note: '用於勸別人做某事' },
        { hiragana: '[どうも] ありがとう [ございます]', kanji: '', meaning: '謝謝', cantonese: '[多謨] 阿利卡多 [哥咋衣嘛司]', note: '' },
        { hiragana: 'そうですか', kanji: '', meaning: '是嗎', cantonese: '搜 爹司 卡', note: '' },
        { hiragana: 'ちがいます', kanji: '違います', meaning: '不是', cantonese: '芝嘎衣嘛司', note: '' },
        { hiragana: 'あ', kanji: '', meaning: '啊', cantonese: '阿', note: '用於意識到什麼時' },
        { hiragana: 'これから おせわに なります', kanji: 'これから お世話に なります', meaning: '今後會給您添麻煩（請多關照）', cantonese: '哥咧卡拉 哦些哇你 哪利嘛司', note: '' },
        { hiragana: 'こちらこそ [どうぞ] よろしく [おねがいします]', kanji: 'こちらこそ [どうぞ] よろしく [お願いします]', meaning: '也要請你們多多關照', cantonese: '哥芝啦哥梳 [多囉] 喲洛西哭 [哦捏嘎衣西嘛司]', note: '' },
      ],
      dialogue: [
        { speaker: 'A', japanese: 'これはなんですか。', cantonese: '哥咧 哇 難 爹司 卡', meaning: '這是什麼？' },
        { speaker: 'B', japanese: 'それはじしょです。', cantonese: '梳咧 哇 芝梳 爹司', meaning: '那是字典。' },
        { speaker: 'A', japanese: 'あれもじしょですか。', cantonese: '阿咧 謨 芝梳 爹司 卡', meaning: '那也是字典嗎？' },
        { speaker: 'B', japanese: 'いいえ、ざっしです。', cantonese: '一一也，咋士 爹司', meaning: '不，是雜誌。' },
      ],
    },
  ],
};
