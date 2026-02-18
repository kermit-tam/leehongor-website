/**
 * 大家的日本語 N5 第2-15課完整數據
 * Lessons 2-15 with Cantonese Phonetics
 * 
 * 來源：大家的日本語 初級 I (第2版)
 * 注意：部分詞彙和諧音根據標準教材建立，可能需要人工校對
 */

import { N5Lesson, N5Vocab, N5Unit, GrammarPoint, DialogueItem } from './n5-lessons';

// ==================== 第2課：這是什麼 ====================
const lesson2Units: N5Unit[] = [
  {
    id: 1,
    title: '指示代名詞',
    subtitle: 'これ・それ・あれ',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'これ', kanji: 'これ', meaning: '這個（近）', cantonese: '哥咧', note: '距離說話者近' },
      { hiragana: 'それ', kanji: 'それ', meaning: '那個（中）', cantonese: '梳咧', note: '距離聽者近' },
      { hiragana: 'あれ', kanji: 'あれ', meaning: '那個（遠）', cantonese: '阿咧', note: '距離兩者都遠' },
      { hiragana: 'どれ', kanji: 'どれ', meaning: '哪個', cantonese: '多咧', note: '疑問詞' },
      { hiragana: 'この', kanji: 'この', meaning: '這個～', cantonese: '哥囉', note: '後接名詞' },
      { hiragana: 'その', kanji: 'その', meaning: '那個～', cantonese: '梳囉', note: '後接名詞' },
      { hiragana: 'あの', kanji: 'あの', meaning: '那個～', cantonese: '阿囉', note: '後接名詞' },
      { hiragana: 'どの', kanji: 'どの', meaning: '哪個～', cantonese: '多囉', note: '後接名詞' },
      { hiragana: 'ここ', kanji: 'ここ', meaning: '這裡', cantonese: '哥哥', note: '' },
      { hiragana: 'そこ', kanji: 'そこ', meaning: '那裡', cantonese: '梳哥', note: '' },
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
      { hiragana: 'ざっし', kanji: '雑誌', meaning: '雑誌', cantonese: '咋士', note: '' },
      { hiragana: 'しんぶん', kanji: '新聞', meaning: '報紙', cantonese: '心崩', note: '' },
      { hiragana: 'ノート', kanji: 'Note', meaning: '筆記本', cantonese: '囉多', note: '' },
      { hiragana: 'てちょう', kanji: '手帳', meaning: '記事本', cantonese: '鉄昭', note: '' },
      { hiragana: 'めいし', kanji: '名刺', meaning: '名片', cantonese: '咩西', note: '' },
      { hiragana: 'カード', kanji: 'Card', meaning: '卡片', cantonese: '卡多', note: '' },
      { hiragana: 'えんぴつ', kanji: '鉛筆', meaning: '鉛筆', cantonese: '胭筆', note: '' },
      { hiragana: 'ボールペン', kanji: 'Ball Pen', meaning: '原子筆', cantonese: '波囉筆', note: '' },
    ],
  },
  {
    id: 3,
    title: '電器和家具',
    subtitle: '家中物品',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'かぎ', kanji: '鍵', meaning: '鑰匙', cantonese: '卡gi', note: '' },
      { hiragana: 'とけい', kanji: '時計', meaning: '時鐘/手錶', cantonese: '多kei', note: '' },
      { hiragana: 'かさ', kanji: '傘', meaning: '雨傘', cantonese: '卡撒', note: '' },
      { hiragana: 'かばん', kanji: '鞄', meaning: '包包', cantonese: '卡崩', note: '' },
      { hiragana: 'テレビ', kanji: 'TV', meaning: '電視', cantonese: '堤碑', note: '' },
      { hiragana: 'パソコン', kanji: 'PC', meaning: '電腦', cantonese: '趴梳魂', note: '' },
      { hiragana: 'でんわ', kanji: '電話', meaning: '電話', cantonese: '電話', note: '' },
      { hiragana: 'つくえ', kanji: '机', meaning: '桌子', cantonese: '刺古也', note: '' },
      { hiragana: 'いす', kanji: '椅子', meaning: '椅子', cantonese: '衣士', note: '' },
      { hiragana: 'ドア', kanji: 'Door', meaning: '門', cantonese: '多阿', note: '' },
    ],
  },
  {
    id: 4,
    title: '基本對話',
    subtitle: '詢問和回答',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'そうです', kanji: 'そうです', meaning: '是的', cantonese: '搜 爹司', note: '肯定' },
      { hiragana: 'そうじゃありません', kanji: 'そうじゃありません', meaning: '不是', cantonese: '搜架 阿利嘛森', note: '否定' },
      { hiragana: 'なんですか', kanji: '何ですか', meaning: '是什麼？', cantonese: '難 爹司 卡', note: '' },
      { hiragana: 'あのう', kanji: 'あのう', meaning: '那個...', cantonese: '阿囉', note: '猶豫時' },
      { hiragana: 'えっ', kanji: 'えっ', meaning: '咦？', cantonese: '也', note: '驚訝' },
      { hiragana: 'どうぞ', kanji: 'どうぞ', meaning: '請', cantonese: '多囉', note: '給東西時' },
      { hiragana: 'ありがとう', kanji: 'ありがとう', meaning: '謝謝', cantonese: '阿利卡多', note: '' },
      { hiragana: 'どうも', kanji: 'どうも', meaning: '非常', cantonese: '多謨', note: '加強語氣' },
      { hiragana: 'これから', kanji: 'これから', meaning: '今後/接下來', cantonese: '哥咧 卡拉', note: '' },
      { hiragana: 'おねがいします', kanji: 'お願いします', meaning: '拜託了', cantonese: '哦捏嘎一 西嘛司', note: '' },
    ],
    dialogue: [
      { speaker: 'A', japanese: 'これはなんですか。', cantonese: '哥咧 哇 難 爹司 卡', meaning: '這是什麼？' },
      { speaker: 'B', japanese: 'それはじしょです。', cantonese: '梳咧 哇 芝梳 爹司', meaning: '那是字典。' },
      { speaker: 'A', japanese: 'あれもじしょですか。', cantonese: '阿咧 謨 芝梳 爹司 卡', meaning: '那也是字典嗎？' },
      { speaker: 'B', japanese: 'いいえ、ざっしです。', cantonese: '一一也，咋士 爹司', meaning: '不，是雑誌。' },
    ],
  },
];

// ==================== 第3課：這裡是哪裡 ====================
const lesson3Units: N5Unit[] = [
  {
    id: 1,
    title: '場所指示',
    subtitle: '這裡・那裡・哪裡',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'ここ', kanji: 'ここ', meaning: '這裡', cantonese: '哥哥', note: '近處' },
      { hiragana: 'そこ', kanji: 'そこ', meaning: '那裡', cantonese: '梳哥', note: '遠處' },
      { hiragana: 'あそこ', kanji: 'あそこ', meaning: '那邊', cantonese: '阿梳哥', note: '更遠' },
      { hiragana: 'どこ', kanji: 'どこ', meaning: '哪裡', cantonese: '多哥', note: '疑問詞' },
      { hiragana: 'こちら', kanji: 'こちら', meaning: '這邊', cantonese: '哥芝啦', note: '禮貌說法' },
      { hiragana: 'そちら', kanji: 'そちら', meaning: '那邊', cantonese: '梳芝啦', note: '禮貌說法' },
      { hiragana: 'あちら', kanji: 'あちら', meaning: '那邊', cantonese: '阿芝啦', note: '禮貌說法' },
      { hiragana: 'どちら', kanji: 'どちら', meaning: '哪邊', cantonese: '多芝啦', note: '禮貌說法' },
      { hiragana: 'きょうしつ', kanji: '教室', meaning: '教室', cantonese: '鏡西刺', note: '' },
      { hiragana: 'しょくどう', kanji: '食堂', meaning: '餐廳', cantonese: '梳古多', note: '' },
    ],
    grammar: [
      {
        pattern: '～はどこですか',
        meaning: '～在哪裡？',
        example: 'トイレはどこですか。',
        exampleMeaning: '廁所在哪裡？',
      },
      {
        pattern: '～も～です',
        meaning: '～也～',
        example: 'わたしもがくせいです。',
        exampleMeaning: '我也是學生。',
      },
    ],
  },
  {
    id: 2,
    title: '建築物和設施',
    subtitle: '公共場所',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'じむしょ', kanji: '事務所', meaning: '辦公室', cantonese: '芝謨梳', note: '' },
      { hiragana: 'かいぎしつ', kanji: '会議室', meaning: '會議室', cantonese: '卡一gi 西刺', note: '' },
      { hiragana: 'うけつけ', kanji: '受付', meaning: '櫃檯', cantonese: '烏kei', note: '' },
      { hiragana: 'へや', kanji: '部屋', meaning: '房間', cantonese: '吓也', note: '' },
      { hiragana: 'トイレ', kanji: 'Toilet', meaning: '廁所', cantonese: '多衣咧', note: '' },
      { hiragana: 'おてあらい', kanji: 'お手洗い', meaning: '洗手間', cantonese: '哦鉄 阿拉衣', note: '禮貌說法' },
      { hiragana: 'かいだん', kanji: '階段', meaning: '樓梯', cantonese: '卡衣單', note: '' },
      { hiragana: 'エレベーター', kanji: 'Elevator', meaning: '電梯', cantonese: '也咧啤多', note: '' },
      { hiragana: 'エスカレーター', kanji: 'Escalator', meaning: '電扶梯', cantonese: '也士卡咧多', note: '' },
      { hiragana: 'じどうはんばいき', kanji: '自動販売機', meaning: '自動販賣機', cantonese: '芝多 杭巴衣 gi', note: '' },
    ],
  },
  {
    id: 3,
    title: '國家和語言',
    subtitle: '更多國家',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'くに', kanji: '国', meaning: '國家', cantonese: '古你', note: '' },
      { hiragana: 'イタリア', kanji: 'Italy', meaning: '義大利', cantonese: '衣他利阿', note: '' },
      { hiragana: 'スペイン', kanji: 'Spain', meaning: '西班牙', cantonese: '士啤因', note: '' },
      { hiragana: 'ロシア', kanji: 'Russia', meaning: '俄羅斯', cantonese: '羅西阿', note: '' },
      { hiragana: 'オーストラリア', kanji: 'Australia', meaning: '澳洲', cantonese: '哦士多啦利阿', note: '' },
      { hiragana: 'カナダ', kanji: 'Canada', meaning: '加拿大', cantonese: '卡哪打', note: '' },
      { hiragana: 'スイス', kanji: 'Swiss', meaning: '瑞士', cantonese: '士衣士', note: '' },
      { hiragana: 'インドネシア', kanji: 'Indonesia', meaning: '印尼', cantonese: '衣多涅西阿', note: '' },
      { hiragana: 'マレーシア', kanji: 'Malaysia', meaning: '馬來西亞', cantonese: '嘛咧一阿', note: '' },
      { hiragana: 'シンガポール', kanji: 'Singapore', meaning: '新加坡', cantonese: '心嘎波囉', note: '' },
    ],
  },
  {
    id: 4,
    title: '數字和金額',
    subtitle: '購物用語',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'いくら', kanji: '幾ら', meaning: '多少錢', cantonese: '衣古啦', note: '' },
      { hiragana: 'ひゃく', kanji: '百', meaning: '百', cantonese: '吓古', note: '' },
      { hiragana: 'せん', kanji: '千', meaning: '千', cantonese: '仙', note: '' },
      { hiragana: 'まん', kanji: '万', meaning: '萬', cantonese: '萬', note: '' },
      { hiragana: 'すみません', kanji: '済みません', meaning: '對不起/不好意思', cantonese: '士咪嘛森', note: '' },
      { hiragana: '～でございます', kanji: '～でございます', meaning: '是～（敬語）', cantonese: '爹 哥咋衣嘛司', note: '' },
      { hiragana: 'みせてください', kanji: '見せてください', meaning: '請讓我看', cantonese: '咪些鉄 古打撒衣', note: '' },
      { hiragana: 'じゃ', kanji: 'じゃ', meaning: '那麼', cantonese: '渣', note: '口語' },
      { hiragana: 'それから', kanji: 'それから', meaning: '然後', cantonese: '梳咧 卡拉', note: '' },
      { hiragana: 'ください', kanji: '下さい', meaning: '請給我', cantonese: '古打撒衣', note: '' },
    ],
    dialogue: [
      { speaker: '客', japanese: 'すみません。トイレはどこですか。', cantonese: '士咪嘛森。多衣咧 哇 多哥 爹司 卡', meaning: '不好意思。廁所在哪裡？' },
      { speaker: '店員', japanese: 'あちらです。', cantonese: '阿芝啦 爹司', meaning: '在那邊。' },
      { speaker: '客', japanese: 'ありがとうございます。', cantonese: '阿利卡多 哥咋衣嘛司', meaning: '謝謝。' },
    ],
  },
];

// ==================== 第4課：現在幾點 ====================
const lesson4Units: N5Unit[] = [
  {
    id: 1,
    title: '時間（1-12時）',
    subtitle: '現在幾點？',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'いちじ', kanji: '一時', meaning: '一點', cantonese: '衣芝', note: '' },
      { hiragana: 'にじ', kanji: '二時', meaning: '二點', cantonese: '你芝', note: '' },
      { hiragana: 'さんじ', kanji: '三時', meaning: '三點', cantonese: '散芝', note: '' },
      { hiragana: 'よじ', kanji: '四時', meaning: '四點', cantonese: '喲芝', note: '' },
      { hiragana: 'ごじ', kanji: '五時', meaning: '五點', cantonese: '哥芝', note: '' },
      { hiragana: 'ろくじ', kanji: '六時', meaning: '六點', cantonese: '囉古芝', note: '' },
      { hiragana: 'しちじ', kanji: '七時', meaning: '七點', cantonese: '西芝芝', note: '' },
      { hiragana: 'はちじ', kanji: '八時', meaning: '八點', cantonese: '哈芝', note: '' },
      { hiragana: 'くじ', kanji: '九時', meaning: '九點', cantonese: '古芝', note: '' },
      { hiragana: 'じゅうじ', kanji: '十時', meaning: '十點', cantonese: '租芝', note: '' },
    ],
    grammar: [
      {
        pattern: 'いま～じです',
        meaning: '現在是～點',
        example: 'いまくじです。',
        exampleMeaning: '現在是九點。',
      },
    ],
  },
  {
    id: 2,
    title: '時間（分鐘）',
    subtitle: '幾點幾分？',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'いっぷん', kanji: '一分', meaning: '一分', cantonese: '衣噸', note: '' },
      { hiragana: 'にふん', kanji: '二分', meaning: '二分', cantonese: '你婚', note: '' },
      { hiragana: 'さんぷん', kanji: '三分', meaning: '三分', cantonese: '散噸', note: '' },
      { hiragana: 'よんぷん', kanji: '四分', meaning: '四分', cantonese: '喲噸', note: '' },
      { hiragana: 'ごふん', kanji: '五分', meaning: '五分', cantonese: '哥婚', note: '' },
      { hiragana: 'ろっぷん', kanji: '六分', meaning: '六分', cantonese: '囉噸', note: '' },
      { hiragana: 'ななふん', kanji: '七分', meaning: '七分', cantonese: '哪哪婚', note: '' },
      { hiragana: 'はっぷん', kanji: '八分', meaning: '八分', cantonese: '哈噸', note: '' },
      { hiragana: 'きゅうふん', kanji: '九分', meaning: '九分', cantonese: '鳩婚', note: '' },
      { hiragana: 'じゅっぷん', kanji: '十分', meaning: '十分', cantonese: '租噸', note: '' },
    ],
  },
  {
    id: 3,
    title: '時間表達',
    subtitle: '時間助詞',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'にじはん', kanji: '二時半', meaning: '兩點半', cantonese: '你芝 喚', note: '' },
      { hiragana: 'ごぜん', kanji: '午前', meaning: '上午', cantonese: '哥前', note: 'AM' },
      { hiragana: 'ごご', kanji: '午後', meaning: '下午', cantonese: '哥哥', note: 'PM' },
      { hiragana: 'あさ', kanji: '朝', meaning: '早上', cantonese: '阿撒', note: '' },
      { hiragana: 'ひる', kanji: '昼', meaning: '中午', cantonese: '希路', note: '' },
      { hiragana: 'ばん', kanji: '晩', meaning: '晚上', cantonese: '崩', note: '' },
      { hiragana: 'よる', kanji: '夜', meaning: '夜晚', cantonese: '喲路', note: '' },
      { hiragana: 'おととい', kanji: '一昨日', meaning: '前天', cantonese: '哦多喲', note: '' },
      { hiragana: 'きのう', kanji: '昨日', meaning: '昨天', cantonese: 'ki喲', note: '' },
      { hiragana: 'きょう', kanji: '今日', meaning: '今天', cantonese: '鏡', note: '' },
    ],
  },
  {
    id: 4,
    title: '日常活動',
    subtitle: '一日生活',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'シャワーをあびます', kanji: 'Showerを浴びます', meaning: '淋浴', cantonese: '些哇囉 哦 阿比嘛司', note: '' },
      { hiragana: 'たべます', kanji: '食べます', meaning: '吃', cantonese: '他比嘛司', note: '' },
      { hiragana: 'のみます', kanji: '飲みます', meaning: '喝', cantonese: '喲咪嘛司', note: '' },
      { hiragana: 'かえります', kanji: '帰ります', meaning: '回家', cantonese: '卡也利嘛司', note: '' },
      { hiragana: 'いきます', kanji: '行きます', meaning: '去', cantonese: '衣ki嘛司', note: '' },
      { hiragana: 'きます', kanji: '来ます', meaning: '來', cantonese: 'ki嘛司', note: '' },
      { hiragana: 'およぎます', kanji: '泳ぎます', meaning: '游泳', cantonese: '喲喲gi嘛司', note: '' },
      { hiragana: 'あさごはん', kanji: '朝御飯', meaning: '早餐', cantonese: '阿撒 哥杭', note: '' },
      { hiragana: 'ひるごはん', kanji: '昼御飯', meaning: '午餐', cantonese: '希路 哥杭', note: '' },
      { hiragana: 'ばんごはん', kanji: '晩御飯', meaning: '晚餐', cantonese: '崩 哥杭', note: '' },
    ],
    dialogue: [
      { speaker: 'A', japanese: 'なんじにおきますか。', cantonese: '難芝 你 哦ki嘛司 卡', meaning: '幾點起床？' },
      { speaker: 'B', japanese: 'ろくじにおきます。', cantonese: '囉古芝 你 哦ki嘛司', meaning: '6點起床。' },
      { speaker: 'A', japanese: 'なんじにかえりますか。', cantonese: '難芝 你 卡也利嘛司 卡', meaning: '幾點回家？' },
      { speaker: 'B', japanese: 'ごごろくじにかえります。', cantonese: '哥哥 囉古芝 你 卡也利嘛司', meaning: '下午6點回家。' },
    ],
  },
];

// 導入第5-7課和第8-15課
import { n5Lessons5to7V2 } from './n5-lessons-5to15';
import { n5Lessons8to15 } from './n5-lessons-8to15';

// 導出第2-4課
export const n5Lessons2to4: N5Lesson[] = [
  {
    id: 'n5-lesson-2',
    lessonNum: 2,
    title: '這是什麼',
    description: '學習物品名稱和「これ/それ/あれ」的用法。分4個微單元。',
    totalVocab: 40,
    totalTime: 20,
    units: lesson2Units,
  },
  {
    id: 'n5-lesson-3',
    lessonNum: 3,
    title: '這裡是哪裡',
    description: '學習地點、建築物和場所相關詞彙。分4個微單元。',
    totalVocab: 40,
    totalTime: 20,
    units: lesson3Units,
  },
  {
    id: 'n5-lesson-4',
    lessonNum: 4,
    title: '現在幾點',
    description: '學習時間表達和基本動詞。分4個微單元。',
    totalVocab: 40,
    totalTime: 20,
    units: lesson4Units,
  },
];

// 重新導出第5-7課（新版）
export { n5Lessons5to7V2 as n5Lessons5to7 };

// 導出第8-15課
export { n5Lessons8to15 };

// 所有課程
export const allN5Lessons = [
  ...n5Lessons2to4, 
  ...n5Lessons5to7V2, 
  ...n5Lessons8to15
];
