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
];

// ==================== 第3課：這裡是哪裡 ====================
const lesson3Units: N5Unit[] = [
  {
    id: 1,
    title: '場所指示',
    subtitle: '這裡・那裡・哪裡',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'ここ', kanji: '', meaning: '這裏（離說話人近的場所）', cantonese: '哥哥', note: '' },
      { hiragana: 'そこ', kanji: '', meaning: '那裏（離聽話人近的場所）', cantonese: '梳哥', note: '' },
      { hiragana: 'あそこ', kanji: '', meaning: '那裏（離說話人、聽話人都遠的場所）', cantonese: '阿梳哥', note: '' },
      { hiragana: 'どこ', kanji: '', meaning: '哪裏', cantonese: '多哥', note: '' },
      { hiragana: 'こちら', kanji: '', meaning: '這邊（「ここ」的禮貌用語）', cantonese: '哥芝啦', note: '禮貌說法' },
      { hiragana: 'そちら', kanji: '', meaning: '那邊（「そこ」的禮貌用語）', cantonese: '梳芝啦', note: '禮貌說法' },
      { hiragana: 'あちら', kanji: '', meaning: '那邊（「あそこ」的禮貌用語）', cantonese: '阿芝啦', note: '禮貌說法' },
      { hiragana: 'どちら', kanji: '', meaning: '哪邊（「どこ」的禮貌用語）', cantonese: '多芝啦', note: '禮貌說法' },
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
      { hiragana: 'きょうしつ', kanji: '教室', meaning: '教室', cantonese: '鏡西刺', note: '' },
      { hiragana: 'しょくどう', kanji: '食堂', meaning: '食堂', cantonese: '梳古多', note: '' },
      { hiragana: 'じむしょ', kanji: '事務所', meaning: '辦事處、事務所', cantonese: '芝謨梳', note: '' },
      { hiragana: 'かいぎしつ', kanji: '会議室', meaning: '會議室', cantonese: '卡一gi 西刺', note: '' },
      { hiragana: 'うけつけ', kanji: '受付', meaning: '接待處', cantonese: '烏kei', note: '' },
      { hiragana: 'ロビー', kanji: '', meaning: '大廳、休息室', cantonese: '囉比', note: '' },
      { hiragana: 'へや', kanji: '部屋', meaning: '房間', cantonese: '吓也', note: '' },
      { hiragana: 'トイレ（おてあらい）', kanji: '（お手洗い）', meaning: '廁所(洗手間)', cantonese: '多衣咧（哦鉄阿拉衣）', note: '' },
      { hiragana: 'かいだん', kanji: '階段', meaning: '樓梯', cantonese: '卡衣單', note: '' },
      { hiragana: 'エレベーター', kanji: '', meaning: '電梯', cantonese: '也咧啤多', note: '' },
      { hiragana: 'じどうはんばいき', kanji: '自動販売機', meaning: '自動販賣機', cantonese: '芝多 杭巴衣 gi', note: '' },
      { hiragana: 'でんわ', kanji: '電話', meaning: '電話', cantonese: '電話', note: '' },
    ],
  },
  {
    id: 3,
    title: '國家、公司和住所',
    subtitle: '組織與地點',
    estimatedTime: 5,
    vocab: [
      { hiragana: '[お]くに', kanji: '[お]国', meaning: '國家、故鄉', cantonese: '[哦]古你', note: '' },
      { hiragana: 'かいしゃ', kanji: '会社', meaning: '公司', cantonese: '卡一蝦', note: '' },
      { hiragana: 'うち', kanji: '', meaning: '家', cantonese: '烏芝', note: '' },
    ],
  },
  {
    id: 4,
    title: '物品和購物',
    subtitle: '商品與場所',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'くつ', kanji: '靴', meaning: '鞋', cantonese: '古刺', note: '' },
      { hiragana: 'ネクタイ', kanji: '', meaning: '領帶', cantonese: '呢古他衣', note: '' },
      { hiragana: 'ワイン', kanji: '', meaning: '葡萄酒', cantonese: '哇因', note: '' },
      { hiragana: 'うりば', kanji: '売り場', meaning: '售貨處', cantonese: '烏利巴', note: '' },
      { hiragana: 'ちか', kanji: '地下', meaning: '地下', cantonese: '芝卡', note: '' },
      { hiragana: 'かびん', kanji: '', meaning: '花瓶', cantonese: '卡冰', note: '' },
    ],
  },
  {
    id: 5,
    title: '樓層和價格',
    subtitle: '數字與金額',
    estimatedTime: 5,
    vocab: [
      { hiragana: '…かい（…がい）', kanji: '…階', meaning: '…層', cantonese: '…卡衣', note: '' },
      { hiragana: 'なんがい', kanji: '何階', meaning: '幾層', cantonese: '難嘎衣', note: '' },
      { hiragana: '…えん', kanji: '…円', meaning: '…日元', cantonese: '…援', note: '' },
      { hiragana: 'いくら', kanji: '', meaning: '多少錢', cantonese: '衣古啦', note: '' },
      { hiragana: 'ひゃく', kanji: '百', meaning: '百', cantonese: '吓古', note: '' },
      { hiragana: 'せん', kanji: '千', meaning: '千', cantonese: '仙', note: '' },
      { hiragana: 'まん', kanji: '万', meaning: '萬', cantonese: '萬', note: '' },
    ],
  },
  {
    id: 6,
    title: '常用對話',
    subtitle: '購物與禮貌用語',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'すみません。', kanji: '', meaning: '對不起。', cantonese: '士咪嘛森', note: '' },
      { hiragana: 'どうも。', kanji: '', meaning: '謝謝。', cantonese: '多謨', note: '' },
      { hiragana: 'いらっしゃいませ。', kanji: '', meaning: '歡迎光臨（招呼來店的客人）', cantonese: '衣啦沙衣嘛些', note: '' },
      { hiragana: '[～を] みせて ください', kanji: '[～を] 見せて ください', meaning: '請讓我看一下～', cantonese: '咪些鉄 古打撒衣', note: '' },
      { hiragana: 'じゃ', kanji: '', meaning: '那麼', cantonese: '渣', note: '口語' },
      { hiragana: '[～を] ください。', kanji: '', meaning: '請給我[～]。', cantonese: '古打撒衣', note: '' },
    ],
  },
  {
    id: 7,
    title: '國家與城市',
    subtitle: '世界各地',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'イタリア', kanji: '', meaning: '意大利', cantonese: '衣他利阿', note: '' },
      { hiragana: 'スイス', kanji: '', meaning: '瑞士', cantonese: '士衣士', note: '' },
      { hiragana: 'フランス', kanji: '', meaning: '法國', cantonese: '夫干士', note: '' },
      { hiragana: 'ジャカルタ', kanji: '', meaning: '雅加達', cantonese: '渣卡路他', note: '' },
      { hiragana: 'バンコク', kanji: '', meaning: '曼谷', cantonese: '崩谷', note: '' },
      { hiragana: 'ベルリン', kanji: '', meaning: '柏林', cantonese: '杯路鄰', note: '' },
      { hiragana: 'しんおおさか', kanji: '新大阪', meaning: '新大阪（大阪的車站名）', cantonese: '心哦哦撒卡', note: '' },
    ],
  },
];

// ==================== 第4課：現在幾點 ====================
const lesson4Units: N5Unit[] = [
  {
    id: 1,
    title: '日常動詞',
    subtitle: '起床・睡覺・工作',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'おきます', kanji: '起きます', meaning: '起床', cantonese: '哦ki嘛司', note: '' },
      { hiragana: 'ねます', kanji: '寝ます', meaning: '睡覺', cantonese: '捏嘛司', note: '' },
      { hiragana: 'はたらきます', kanji: '働きます', meaning: '工作、勞動', cantonese: '哈他啦ki嘛司', note: '' },
      { hiragana: 'やすみます', kanji: '休みます', meaning: '休息', cantonese: '也斯咪嘛司', note: '' },
      { hiragana: 'べんきょうします', kanji: '勉強します', meaning: '學習', cantonese: '奔鏡 西嘛司', note: '' },
      { hiragana: 'おわります', kanji: '終わります', meaning: '結束', cantonese: '哦哇利嘛司', note: '' },
    ],
    grammar: [
      {
        pattern: '～ます',
        meaning: '動詞禮貌形',
        example: 'おきます。',
        exampleMeaning: '起床。',
      },
    ],
  },
  {
    id: 2,
    title: '公共場所',
    subtitle: '百貨商店・銀行・郵局',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'デパート', kanji: '', meaning: '百貨商店', cantonese: '爹趴多', note: '' },
      { hiragana: 'ぎんこう', kanji: '銀行', meaning: '銀行', cantonese: '銀行', note: '' },
      { hiragana: 'ゆうびんきょく', kanji: '郵便局', meaning: '郵局', cantonese: '優冰曲', note: '' },
      { hiragana: 'としょかん', kanji: '図書館', meaning: '圖書館', cantonese: '多梳干', note: '' },
      { hiragana: 'びじゅつかん', kanji: '美術館', meaning: '美術館', cantonese: '比租次干', note: '' },
    ],
  },
  {
    id: 3,
    title: '時間表達',
    subtitle: '現在・時・分・半',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'いま', kanji: '今', meaning: '現在', cantonese: '衣嘛', note: '' },
      { hiragana: '…じ', kanji: '…時', meaning: '…點', cantonese: '…芝', note: '' },
      { hiragana: '…ふん（…ぷん）', kanji: '…分', meaning: '…分', cantonese: '…婚/…噸', note: '' },
      { hiragana: 'はん', kanji: '半', meaning: '半', cantonese: '喚', note: '' },
      { hiragana: 'なんじ', kanji: '何時', meaning: '幾點', cantonese: '難芝', note: '' },
      { hiragana: 'なんぷん', kanji: '何分', meaning: '幾分', cantonese: '難噸', note: '' },
      { hiragana: 'ごぜん', kanji: '午前', meaning: '上午', cantonese: '哥前', note: 'AM' },
      { hiragana: 'ごご', kanji: '午後', meaning: '下午', cantonese: '哥哥', note: 'PM' },
    ],
  },
  {
    id: 4,
    title: '時段',
    subtitle: '朝・晝・夜',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'あさ', kanji: '朝', meaning: '早晨', cantonese: '阿撒', note: '' },
      { hiragana: 'ひる', kanji: '昼', meaning: '白天', cantonese: '希路', note: '' },
      { hiragana: 'ばん（よる）', kanji: '晩（夜）', meaning: '晚上', cantonese: '崩（喲路）', note: '' },
      { hiragana: 'こんばん', kanji: '', meaning: '今晚、今天晚上', cantonese: '拱崩', note: '' },
    ],
  },
  {
    id: 5,
    title: '日期',
    subtitle: '昨天・今天・明天',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'おととい', kanji: '', meaning: '前天', cantonese: '哦多喲', note: '' },
      { hiragana: 'きのう', kanji: '', meaning: '昨天', cantonese: 'ki喲', note: '' },
      { hiragana: 'きょう', kanji: '', meaning: '今天', cantonese: '鏡', note: '' },
      { hiragana: 'あした', kanji: '', meaning: '明天', cantonese: '阿西他', note: '' },
      { hiragana: 'あさって', kanji: '', meaning: '後天', cantonese: '阿撒爹', note: '' },
      { hiragana: 'けさ', kanji: '', meaning: '今天早上', cantonese: 'kei撒', note: '' },
    ],
  },
  {
    id: 6,
    title: '休息與活動',
    subtitle: '考試・會議・電影',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'やすみ', kanji: '休み', meaning: '休息、休假', cantonese: '也斯咪', note: '' },
      { hiragana: 'ひるやすみ', kanji: '昼休み', meaning: '午休', cantonese: '希路也斯咪', note: '' },
      { hiragana: 'しけん', kanji: '試験', meaning: '考試', cantonese: '西肯', note: '' },
      { hiragana: 'かいぎ', kanji: '会議', meaning: '會議', cantonese: '卡一gi', note: '' },
      { hiragana: 'えいが', kanji: '映画', meaning: '電影', cantonese: '英嘎', note: '' },
    ],
  },
  {
    id: 7,
    title: '頻率',
    subtitle: '毎朝・毎晩・毎日',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'まいあさ', kanji: '毎朝', meaning: '每天早晨', cantonese: '嘛衣阿撒', note: '' },
      { hiragana: 'まいばん', kanji: '毎晩', meaning: '每天晚上', cantonese: '嘛衣崩', note: '' },
      { hiragana: 'まいにち', kanji: '毎日', meaning: '每天', cantonese: '嘛衣你芝', note: '' },
    ],
  },
  {
    id: 8,
    title: '星期',
    subtitle: '月曜日～日曜日',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'げつようび', kanji: '月曜日', meaning: '星期一', cantonese: 'gay喲比', note: '' },
      { hiragana: 'かようび', kanji: '火曜日', meaning: '星期二', cantonese: '卡喲比', note: '' },
      { hiragana: 'すいようび', kanji: '水曜日', meaning: '星期三', cantonese: '斯衣喲比', note: '' },
      { hiragana: 'もくようび', kanji: '木曜日', meaning: '星期四', cantonese: '謨古喲比', note: '' },
      { hiragana: 'きんようび', kanji: '金曜日', meaning: '星期五', cantonese: '勤喲比', note: '' },
      { hiragana: 'どようび', kanji: '土曜日', meaning: '星期六', cantonese: '多喲比', note: '' },
      { hiragana: 'にちようび', kanji: '日曜日', meaning: '星期天', cantonese: '你芝喲比', note: '' },
      { hiragana: 'なんようび', kanji: '何曜日', meaning: '星期幾', cantonese: '難喲比', note: '' },
    ],
  },
  {
    id: 9,
    title: '助詞',
    subtitle: '從～・到～・和～',
    estimatedTime: 5,
    vocab: [
      { hiragana: '～から', kanji: '', meaning: '從～', cantonese: '…卡拉', note: '' },
      { hiragana: '～まで', kanji: '', meaning: '到～', cantonese: '…媽爹', note: '' },
      { hiragana: '～と ～', kanji: '', meaning: '～和～', cantonese: '…多', note: '' },
    ],
  },
  {
    id: 10,
    title: '常用對話',
    subtitle: '購物與禮貌用語',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'たいへんですね。', kanji: '大変ですね。', meaning: '夠辛苦的啊。夠累人的啊。', cantonese: '他衣痕 爹司 咧', note: '' },
      { hiragana: 'ばんごう', kanji: '番号', meaning: '號碼', cantonese: '崩勾', note: '' },
      { hiragana: 'なんばん', kanji: '何番', meaning: '幾號', cantonese: '難崩', note: '' },
      { hiragana: 'そちら', kanji: '', meaning: '那邊、你那邊', cantonese: '梳芝啦', note: '' },
    ],
  },
  {
    id: 11,
    title: '城市與地名',
    subtitle: '世界各地',
    estimatedTime: 5,
    vocab: [
      { hiragana: 'ニューヨーク', kanji: '', meaning: '紐約', cantonese: '紐約', note: '' },
      { hiragana: 'ペキン', kanji: '', meaning: '北京', cantonese: '北京', note: '' },
      { hiragana: 'ロサンゼルス', kanji: '', meaning: '洛杉磯', cantonese: '囉三租路士', note: '' },
      { hiragana: 'ロンドン', kanji: '', meaning: '倫敦', cantonese: '囉冬', note: '' },
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
    description: '學習物品名稱和「これ/それ/あれ」的用法。分5個微單元。',
    totalVocab: 45,
    totalTime: 25,
    units: lesson2Units,
  },
  {
    id: 'n5-lesson-3',
    lessonNum: 3,
    title: '這裡是哪裡',
    description: '學習地點、建築物和場所相關詞彙。分7個微單元。',
    totalVocab: 49,
    totalTime: 35,
    units: lesson3Units,
  },
  {
    id: 'n5-lesson-4',
    lessonNum: 4,
    title: '現在幾點',
    description: '學習時間表達和基本動詞。分11個微單元。',
    totalVocab: 60,
    totalTime: 55,
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
