/**
 * 大家的日本語 N5 第5-15課完整數據
 * Minna no Nihongo N5 Lessons 5-15
 * 
 * 來源：大家的日本語 初級 I (第2版)
 * 更新：根據課本資料校正第5課
 */

import { N5Lesson, N5Unit } from './n5-lessons';

// ==================== 第5課：交通與移動（校正版）====================
const lesson5Units: N5Unit[] = [
  {
    id: 1,
    title: '交通與移動',
    subtitle: '交通工具與動詞',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'いきます', kanji: '行きます', meaning: '去', cantonese: '去', note: '' },
      { hiragana: 'きます', kanji: '来ます', meaning: '來', cantonese: '嚟', note: '' },
      { hiragana: 'かえります', kanji: '帰ります', meaning: '回（家）', cantonese: '返', note: '' },
      { hiragana: 'ちかてつ', kanji: '地下鉄', meaning: '地鐵', cantonese: '地下鐵', note: '' },
      { hiragana: 'しんかんせん', kanji: '新幹線', meaning: '新幹線', cantonese: '新幹線', note: '' },
      { hiragana: 'バス', kanji: '', meaning: '巴士', cantonese: '巴士', note: '外來語' },
      { hiragana: 'タクシー', kanji: '', meaning: '的士', cantonese: '的士', note: '外來語' },
      { hiragana: 'じてんしゃ', kanji: '自転車', meaning: '單車', cantonese: '單車', note: '' },
      { hiragana: 'あるいて', kanji: '歩いて', meaning: '走路', cantonese: '行路', note: '' },
      { hiragana: 'ひこうき', kanji: '飛行機', meaning: '飛機', cantonese: '飛機', note: '' },
      { hiragana: 'ふね', kanji: '船', meaning: '船', cantonese: '船', note: '' },
      { hiragana: 'でんしゃ', kanji: '電車', meaning: '電車', cantonese: '電車', note: '' },
    ],
    grammar: [
      {
        pattern: '～へ行きます／来ます／帰ります',
        meaning: '去／來／回～',
        example: 'にほんへ行きます。',
        exampleMeaning: '去日本。',
      },
      {
        pattern: '～で行きます',
        meaning: '坐～去',
        example: 'でんしゃで行きます。',
        exampleMeaning: '坐電車去。',
      },
    ],
  },
  {
    id: 2,
    title: '人物與場所',
    subtitle: '人物稱呼與地點',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'ひと', kanji: '人', meaning: '人', cantonese: '人', note: '' },
      { hiragana: 'ともだち', kanji: '友達', meaning: '朋友', cantonese: '朋友', note: '' },
      { hiragana: 'かれ', kanji: '彼', meaning: '他/男朋友', cantonese: '佢', note: '' },
      { hiragana: 'かのじょ', kanji: '彼女', meaning: '她/女朋友', cantonese: '佢', note: '' },
      { hiragana: 'かぞく', kanji: '家族', meaning: '家族/家人', cantonese: '屋企人', note: '' },
      { hiragana: 'ひとりで', kanji: '一人で', meaning: '獨自', cantonese: '自己一個', note: '' },
      { hiragana: 'がっこう', kanji: '学校', meaning: '學校', cantonese: '學校', note: '' },
      { hiragana: 'スーパー', kanji: '', meaning: '超級市場', cantonese: '超級市場', note: '外來語' },
      { hiragana: 'えき', kanji: '駅', meaning: '車站', cantonese: '車站', note: '' },
      { hiragana: 'だれ', kanji: '誰', meaning: '誰', cantonese: '邊個', note: '' },
    ],
    dialogue: [
      { speaker: 'A', japanese: 'だれと行きますか。', cantonese: '同邊個去呀？', meaning: '和誰一起去？' },
      { speaker: 'B', japanese: 'ともだちと行きます。', cantonese: '同朋友去。', meaning: '和朋友一起去。' },
    ],
  },
  {
    id: 3,
    title: '時間表達',
    subtitle: '週、月、年',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'せんしゅう', kanji: '先週', meaning: '上週', cantonese: '上個禮拜', note: '' },
      { hiragana: 'こんしゅう', kanji: '今週', meaning: '本週', cantonese: '今個禮拜', note: '' },
      { hiragana: 'らいしゅう', kanji: '来週', meaning: '下週', cantonese: '下個禮拜', note: '' },
      { hiragana: 'せんげつ', kanji: '先月', meaning: '上個月', cantonese: '上個月', note: '' },
      { hiragana: 'こんげつ', kanji: '今月', meaning: '這個月', cantonese: '今個月', note: '' },
      { hiragana: 'らいげつ', kanji: '来月', meaning: '下個月', cantonese: '下個月', note: '' },
      { hiragana: 'きょねん', kanji: '去年', meaning: '去年', cantonese: '舊年', note: '' },
      { hiragana: 'ことし', kanji: '今年', meaning: '今年', cantonese: '今年', note: '' },
      { hiragana: 'らいねん', kanji: '来年', meaning: '明年', cantonese: '出年', note: '' },
    ],
    grammar: [
      {
        pattern: 'せんしゅう／こんしゅう／らいしゅう',
        meaning: '上週／這週／下週',
        example: 'らいしゅうにほんへ行きます。',
        exampleMeaning: '下週去日本。',
      },
    ],
  },
  {
    id: 4,
    title: '日期與生活',
    subtitle: '日期與日常會話',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'ついたち', kanji: '1日', meaning: '1號', cantonese: '一號', note: '' },
      { hiragana: 'ふつか', kanji: '2日', meaning: '2號', cantonese: '二號', note: '' },
      { hiragana: 'みっか', kanji: '3日', meaning: '3號', cantonese: '三號', note: '' },
      { hiragana: 'よっか', kanji: '4日', meaning: '4號', cantonese: '四號', note: '' },
      { hiragana: 'いつか', kanji: '5日', meaning: '5號', cantonese: '五號', note: '' },
      { hiragana: 'たんじょうび', kanji: '誕生日', meaning: '生日', cantonese: '生日', note: '' },
      { hiragana: 'いつ', kanji: '', meaning: '何時/什麼時候', cantonese: '幾時', note: '' },
      { hiragana: 'ありがとうございました', kanji: '', meaning: '多謝/非常感謝', cantonese: '多謝晒', note: '' },
    ],
    dialogue: [
      { speaker: 'A', japanese: 'たんじょうびはいつですか。', cantonese: '生日幾時呀？', meaning: '生日是什麼時候？' },
      { speaker: 'B', japanese: '5がつ15にちです。', cantonese: '五月十五號。', meaning: '是5月15日。' },
      { speaker: 'A', japanese: 'そうですか。', cantonese: '係咩。', meaning: '是嗎。' },
    ],
  },
];

// ==================== 第6課：食物與喜好（保留原有內容）====================
const lesson6Units: N5Unit[] = [
  {
    id: 1,
    title: '日本料理',
    subtitle: '壽司、拉麵、天婦羅',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'すし', kanji: '寿司', meaning: '壽司', cantonese: '壽司', note: '' },
      { hiragana: 'さしみ', kanji: '刺身', meaning: '刺身', cantonese: '刺身', note: '' },
      { hiragana: 'てんぷら', kanji: '天ぷら', meaning: '天婦羅', cantonese: '天婦羅', note: '' },
      { hiragana: 'ラーメン', kanji: '', meaning: '拉麵', cantonese: '拉麵', note: '' },
      { hiragana: 'うどん', kanji: '', meaning: '烏冬', cantonese: '烏冬', note: '' },
      { hiragana: 'そば', kanji: '', meaning: '蕎麥麵', cantonese: '蕎麥麵', note: '' },
      { hiragana: 'おこのみやき', kanji: 'お好み焼き', meaning: '大阪燒', cantonese: '大阪燒', note: '' },
      { hiragana: 'おちゃ', kanji: 'お茶', meaning: '茶', cantonese: '茶', note: '' },
      { hiragana: 'コーヒー', kanji: '', meaning: '咖啡', cantonese: '咖啡', note: '' },
      { hiragana: 'ビール', kanji: '', meaning: '啤酒', cantonese: '啤酒', note: '' },
    ],
  },
  {
    id: 2,
    title: '餐廳用語',
    subtitle: '點餐與結帳',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'メニュー', kanji: '', meaning: '菜單', cantonese: '餐牌', note: '' },
      { hiragana: 'しょくじ', kanji: '食事', meaning: '用餐', cantonese: '食飯', note: '' },
      { hiragana: 'ちゅうもん', kanji: '注文', meaning: '點餐', cantonese: '落單', note: '' },
      { hiragana: 'おかわり', kanji: 'お代わり', meaning: '添飯／再來', cantonese: '添', note: '' },
      { hiragana: 'けっさん', kanji: '決算', meaning: '結帳', cantonese: '埋單', note: '' },
      { hiragana: 'おかいけい', kanji: 'お会計', meaning: '結帳', cantonese: '埋單', note: '' },
      { hiragana: 'レストラン', kanji: '', meaning: '餐廳', cantonese: '餐廳', note: '' },
      { hiragana: 'すいか', kanji: '西瓜', meaning: '西瓜', cantonese: '西瓜', note: '' },
      { hiragana: 'りんご', kanji: '林檎', meaning: '蘋果', cantonese: '蘋果', note: '' },
      { hiragana: 'みかん', kanji: '蜜柑', meaning: '柑桔', cantonese: '柑', note: '' },
    ],
  },
  {
    id: 3,
    title: '喜好與味道',
    subtitle: '好き・きらい',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'すき', kanji: '好き', meaning: '喜歡', cantonese: '鍾意', note: 'な形容詞' },
      { hiragana: 'きらい', kanji: '嫌い', meaning: '討厭', cantonese: '憎', note: 'な形容詞' },
      { hiragana: 'だいすき', kanji: '大好き', meaning: '非常喜歡', cantonese: '好鍾意', note: '' },
      { hiragana: 'だいきらい', kanji: '大嫌い', meaning: '非常討厭', cantonese: '好憎', note: '' },
      { hiragana: 'おいしい', kanji: '美味しい', meaning: '好吃', cantonese: '好食', note: '' },
      { hiragana: 'まずい', kanji: '不味い', meaning: '不好吃', cantonese: '唔好食', note: '' },
      { hiragana: 'あまい', kanji: '甘い', meaning: '甜', cantonese: '甜', note: '' },
      { hiragana: 'からい', kanji: '辛い', meaning: '辣', cantonese: '辣', note: '' },
      { hiragana: 'しょっぱい', kanji: '塩っぱい', meaning: '鹹', cantonese: '鹹', note: '' },
      { hiragana: 'すっぱい', kanji: '酸っぱい', meaning: '酸', cantonese: '酸', note: '' },
    ],
    grammar: [
      {
        pattern: '～が好きです／嫌いです',
        meaning: '喜歡／討厭～',
        example: 'すしが好きです。',
        exampleMeaning: '喜歡壽司。',
      },
    ],
  },
  {
    id: 4,
    title: '餐廳對話',
    subtitle: '點餐情境',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'おなかがすきました', kanji: '', meaning: '肚子餓了', cantonese: '肚餓', note: '' },
      { hiragana: 'おなかがいっぱい', kanji: '', meaning: '吃飽了', cantonese: '飽', note: '' },
      { hiragana: 'のどがかわきました', kanji: '', meaning: '口渴了', cantonese: '口渴', note: '' },
      { hiragana: 'たべましょう', kanji: '食べましょう', meaning: '來吃吧', cantonese: '食啦', note: '' },
      { hiragana: 'いっしょに', kanji: '一緒に', meaning: '一起', cantonese: '一齊', note: '' },
      { hiragana: 'ごちそうさま', kanji: 'ご馳走様', meaning: '多謝款待', cantonese: '多謝款待', note: '餐後說' },
      { hiragana: 'いただきます', kanji: '頂きます', meaning: '我開動了', cantonese: '我開動喇', note: '餐前說' },
      { hiragana: '～と', kanji: '', meaning: '和～一起', cantonese: '同', note: '' },
      { hiragana: '～を', kanji: '', meaning: '～（受詞）', cantonese: '', note: '' },
      { hiragana: 'はい、わかりました', kanji: '', meaning: '好的，知道了', cantonese: '好，知道', note: '' },
    ],
    dialogue: [
      { speaker: '店員', japanese: 'いらっしゃいませ。なんめいさまですか。', cantonese: '歡迎，幾位呀？', meaning: '歡迎光臨，幾位呢？' },
      { speaker: '客', japanese: 'ふたりです。', cantonese: '兩位。', meaning: '兩位。' },
    ],
  },
];

// ==================== 第7課：購物（保留原有內容）====================
const lesson7Units: N5Unit[] = [
  {
    id: 1,
    title: '服裝',
    subtitle: '衣服與鞋子',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'ふく', kanji: '服', meaning: '衣服', cantonese: '衫', note: '' },
      { hiragana: 'セーター', kanji: '', meaning: '毛衣', cantonese: '冷衫', note: '' },
      { hiragana: 'シャツ', kanji: '', meaning: '襯衫', cantonese: '恤衫', note: '' },
      { hiragana: 'ズボン', kanji: '', meaning: '褲子', cantonese: '褲', note: '' },
      { hiragana: 'スカート', kanji: '', meaning: '裙子', cantonese: '裙', note: '' },
      { hiragana: 'くつ', kanji: '靴', meaning: '鞋子', cantonese: '鞋', note: '' },
      { hiragana: 'くつした', kanji: '靴下', meaning: '襪子', cantonese: '襪', note: '' },
      { hiragana: 'ぼうし', kanji: '帽子', meaning: '帽子', cantonese: '帽', note: '' },
      { hiragana: 'コート', kanji: '', meaning: '大衣', cantonese: '大褸', note: '' },
      { hiragana: 'ネクタイ', kanji: '', meaning: '領帶', cantonese: '領呔', note: '' },
    ],
  },
  {
    id: 2,
    title: '顏色與大小',
    subtitle: '購物形容詞',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'いろ', kanji: '色', meaning: '顏色', cantonese: '顏色', note: '' },
      { hiragana: 'あか', kanji: '赤', meaning: '紅色', cantonese: '紅', note: '' },
      { hiragana: 'あお', kanji: '青', meaning: '藍色', cantonese: '藍', note: '' },
      { hiragana: 'しろ', kanji: '白', meaning: '白色', cantonese: '白', note: '' },
      { hiragana: 'くろ', kanji: '黒', meaning: '黑色', cantonese: '黑', note: '' },
      { hiragana: 'ちいさい', kanji: '小さい', meaning: '小', cantonese: '細', note: '' },
      { hiragana: 'おおきい', kanji: '大きい', meaning: '大', cantonese: '大', note: '' },
      { hiragana: 'あたらしい', kanji: '新しい', meaning: '新', cantonese: '新', note: '' },
      { hiragana: 'ふるい', kanji: '古い', meaning: '舊', cantonese: '舊', note: '' },
      { hiragana: 'きれい', kanji: '綺麗', meaning: '漂亮', cantonese: '靚', note: 'な形容詞' },
    ],
  },
  {
    id: 3,
    title: '購物數字',
    subtitle: '價格與數量',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'いくら', kanji: '幾ら', meaning: '多少錢', cantonese: '幾錢', note: '' },
      { hiragana: 'たかい', kanji: '高い', meaning: '貴', cantonese: '貴', note: '' },
      { hiragana: 'やすい', kanji: '安い', meaning: '便宜', cantonese: '平', note: '' },
      { hiragana: '～えん', kanji: '～円', meaning: '～日圓', cantonese: '日圓', note: '' },
      { hiragana: 'ぜんぶで', kanji: '全部で', meaning: '全部一共', cantonese: '總共', note: '' },
      { hiragana: 'みせ', kanji: '店', meaning: '商店', cantonese: '舖頭', note: '' },
      { hiragana: 'デパート', kanji: '', meaning: '百貨公司', cantonese: '百貨公司', note: '' },
      { hiragana: 'スーパー', kanji: '', meaning: '超市', cantonese: '超級市場', note: '' },
      { hiragana: 'コンビニ', kanji: '', meaning: '便利店', cantonese: '便利店', note: '' },
      { hiragana: 'しょうてんがい', kanji: '商店街', meaning: '商店街', cantonese: '街市', note: '' },
    ],
    grammar: [
      {
        pattern: '～をください',
        meaning: '請給我～',
        example: 'これをください。',
        exampleMeaning: '請給我這個。',
      },
      {
        pattern: 'いくらですか',
        meaning: '多少錢？',
        example: 'これはいくらですか。',
        exampleMeaning: '這個多少錢？',
      },
    ],
  },
  {
    id: 4,
    title: '試穿與詢問',
    subtitle: '購物對話',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'しちゃく', kanji: '試着', meaning: '試穿', cantonese: '試衫', note: '' },
      { hiragana: 'しろい', kanji: '白い', meaning: '白色的', cantonese: '白色', note: '' },
      { hiragana: 'くろい', kanji: '黒い', meaning: '黑色的', cantonese: '黑色', note: '' },
      { hiragana: 'あかい', kanji: '赤い', meaning: '紅色的', cantonese: '紅色', note: '' },
      { hiragana: 'あおい', kanji: '青い', meaning: '藍色的', cantonese: '藍色', note: '' },
      { hiragana: 'もういちど', kanji: 'もう一度', meaning: '再一次', cantonese: '再一次', note: '' },
      { hiragana: 'ほかの', kanji: '他の', meaning: '其他的', cantonese: '其他', note: '' },
      { hiragana: 'おしゃれ', kanji: 'お洒落', meaning: '時尚', cantonese: '時髦', note: '' },
      { hiragana: 'ちょうどいい', kanji: '', meaning: '剛剛好', cantonese: '啱啱好', note: '' },
      { hiragana: 'ぴったり', kanji: '', meaning: '剛好合適', cantonese: '啱晒', note: '' },
    ],
    dialogue: [
      { speaker: '客', japanese: 'すみません。これはいくらですか。', cantonese: '唔該，呢個幾錢？', meaning: '請問，這個多少錢？' },
      { speaker: '店員', japanese: 'それはにせんえんです。', cantonese: '嗰個二千日圓。', meaning: '那個2000日圓。' },
    ],
  },
];

// 導出第5-7課
export const n5Lessons5to7V2: N5Lesson[] = [
  {
    id: 'n5-lesson-5',
    lessonNum: 5,
    title: '交通與移動',
    description: '學習交通工具、人物稱呼、週月年時間和日期表達。分4個微單元。',
    totalVocab: 60,
    totalTime: 20,
    units: lesson5Units,
  },
  {
    id: 'n5-lesson-6',
    lessonNum: 6,
    title: '食物與喜好',
    description: '學習日本料理、餐廳用語和表達喜好。分4個微單元。',
    totalVocab: 40,
    totalTime: 20,
    units: lesson6Units,
  },
  {
    id: 'n5-lesson-7',
    lessonNum: 7,
    title: '購物',
    description: '學習服裝、顏色和購物對話。分4個微單元。',
    totalVocab: 40,
    totalTime: 20,
    units: lesson7Units,
  },
];
