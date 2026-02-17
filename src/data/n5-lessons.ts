/**
 * 大家的日本語 N5 完整課程數據
 * Minna no Nihongo N5 Lessons 1-15
 */

export interface N5Vocab {
  hiragana: string;
  kanji: string;
  meaning: string;
  note?: string;
}

export interface N5Unit {
  id: number;
  title: string;
  subtitle: string;
  vocab: N5Vocab[];
}

export interface N5Lesson {
  id: string;
  lessonNum: number;
  title: string;
  description: string;
  grammar: string[];
  units: N5Unit[];
  totalVocab: number;
  estimatedTime: number; // 分鐘
}

// ==================== N5 課程數據 ====================

export const n5Lessons: N5Lesson[] = [
  {
    id: 'n5-lesson-1',
    lessonNum: 1,
    title: '初次見面',
    description: '學習人稱、職業、國家名稱，掌握自我介紹的基本會話',
    grammar: [
      'わたしは～です（我是～）',
      '～さん（尊稱）',
      '～じん（國籍）',
    ],
    units: [
      {
        id: 1,
        title: '人稱與稱呼',
        subtitle: '自我介绍的第一步',
        vocab: [
          { hiragana: 'わたし', kanji: '私', meaning: '我', note: '女性常用' },
          { hiragana: 'あなた', kanji: '貴方', meaning: '你/您', note: '禮貌說法' },
          { hiragana: 'あのひと', kanji: 'あの人', meaning: '他/她/那個人', note: '口語' },
          { hiragana: 'あのかた', kanji: 'あの方', meaning: '那一位', note: '敬語' },
          { hiragana: '～さん', kanji: '～さん', meaning: '先生/女士', note: '尊稱' },
          { hiragana: '～ちゃん', kanji: '～ちゃん', meaning: '小～', note: '對小孩或親暱稱呼' },
          { hiragana: '～じん', kanji: '～人', meaning: '～人', note: '國籍' },
          { hiragana: 'せんせい', kanji: '先生', meaning: '老師', note: '稱呼他人' },
          { hiragana: 'きょうし', kanji: '教師', meaning: '教師', note: '職業名稱' },
          { hiragana: 'がくせい', kanji: '学生', meaning: '學生', note: '' },
        ]
      },
      {
        id: 2,
        title: '職業與場所',
        subtitle: '工作場合用語',
        vocab: [
          { hiragana: 'かいしゃいん', kanji: '会社員', meaning: '公司職員', note: '' },
          { hiragana: 'しゃいん', kanji: '社員', meaning: '～公司職員', note: '前面加公司名' },
          { hiragana: 'ぎんこういん', kanji: '銀行員', meaning: '銀行行員', note: '' },
          { hiragana: 'いしゃ', kanji: '医者', meaning: '醫生', note: '' },
          { hiragana: 'けんきゅうしゃ', kanji: '研究者', meaning: '研究人員', note: '' },
          { hiragana: 'だいがく', kanji: '大学', meaning: '大學', note: '' },
          { hiragana: 'びょういん', kanji: '病院', meaning: '醫院', note: '' },
          { hiragana: 'だれ', kanji: '誰', meaning: '誰', note: '口語' },
          { hiragana: 'どなた', kanji: '何方', meaning: '哪位', note: '敬語' },
          { hiragana: 'なんさい', kanji: '何歳', meaning: '幾歲', note: '問年齡' },
          { hiragana: 'おいくつ', kanji: 'お幾つ', meaning: '多大歲數', note: '禮貌問法' },
        ]
      },
      {
        id: 3,
        title: '初次見面',
        subtitle: '基本禮貌會話',
        vocab: [
          { hiragana: 'はじめまして', kanji: '初めまして', meaning: '初次見面', note: '見面必說' },
          { hiragana: '～からきました', kanji: '～から来ました', meaning: '從～來的', note: '來自...' },
          { hiragana: 'よろしくおねがいします', kanji: 'よろしくお願いします', meaning: '請多關照', note: '結束語' },
          { hiragana: 'しつれいですが', kanji: '失礼ですが', meaning: '對不起/請問', note: '打斷別人時' },
          { hiragana: 'おなまえは', kanji: 'お名前は', meaning: '您貴姓？', note: '問名字' },
          { hiragana: 'こちらは～さんです', kanji: 'こちらは～さんです', meaning: '這位是～', note: '介紹他人' },
          { hiragana: 'はい', kanji: 'はい', meaning: '是/對', note: '' },
          { hiragana: 'いいえ', kanji: 'いいえ', meaning: '不/不是', note: '' },
          { hiragana: 'あ', kanji: 'あ', meaning: '啊', note: '驚訝時' },
          { hiragana: '～さい', kanji: '～歳', meaning: '～歲', note: '數字+歳' },
        ]
      },
      {
        id: 4,
        title: '國家名稱',
        subtitle: '來自哪裡？',
        vocab: [
          { hiragana: 'アメリカ', kanji: 'America', meaning: '美國', note: '' },
          { hiragana: 'イギリス', kanji: 'UK', meaning: '英國', note: '' },
          { hiragana: 'にほん', kanji: '日本', meaning: '日本', note: '' },
          { hiragana: 'かんこく', kanji: '韓国', meaning: '韓國', note: '' },
          { hiragana: 'ちゅうごく', kanji: '中国', meaning: '中國', note: '' },
          { hiragana: 'フランス', kanji: 'France', meaning: '法國', note: '' },
          { hiragana: 'ドイツ', kanji: 'Germany', meaning: '德國', note: '' },
          { hiragana: 'タイ', kanji: 'Thailand', meaning: '泰國', note: '' },
          { hiragana: 'インド', kanji: 'India', meaning: '印度', note: '' },
          { hiragana: 'ブラジル', kanji: 'Brazil', meaning: '巴西', note: '' },
        ]
      },
    ],
    totalVocab: 41,
    estimatedTime: 15,
  },
  {
    id: 'n5-lesson-2',
    lessonNum: 2,
    title: '這是什麼',
    description: '學習物品名稱和「これ/それ/あれ」的用法',
    grammar: [
      'これ/それ/あれは～です（這/那是～）',
      'この/その/あの＋名詞（這個/那個～）',
      '～ですか（疑問句）',
    ],
    units: [
      {
        id: 1,
        title: '指示代名詞',
        subtitle: 'これ・それ・あれ',
        vocab: [
          { hiragana: 'これ', kanji: 'これ', meaning: '這個（近）', note: '距離說話者近' },
          { hiragana: 'それ', kanji: 'それ', meaning: '那個（中）', note: '距離聽者近' },
          { hiragana: 'あれ', kanji: 'あれ', meaning: '那個（遠）', note: '距離兩者都遠' },
          { hiragana: 'どれ', kanji: 'どれ', meaning: '哪個', note: '疑問詞' },
          { hiragana: 'この', kanji: 'この', meaning: '這個～', note: '後接名詞' },
          { hiragana: 'その', kanji: 'その', meaning: '那個～', note: '後接名詞' },
          { hiragana: 'あの', kanji: 'あの', meaning: '那個～', note: '後接名詞' },
          { hiragana: 'どの', kanji: 'どの', meaning: '哪個～', note: '後接名詞' },
          { hiragana: 'ここ', kanji: 'ここ', meaning: '這裡', note: '' },
          { hiragana: 'そこ', kanji: 'そこ', meaning: '那裡', note: '' },
        ]
      },
      {
        id: 2,
        title: '物品名稱',
        subtitle: '日常用品',
        vocab: [
          { hiragana: 'ほん', kanji: '本', meaning: '書', note: '' },
          { hiragana: 'じしょ', kanji: '辞書', meaning: '字典', note: '' },
          { hiragana: 'ざっし', kanji: '雑誌', meaning: '雑誌', note: '' },
          { hiragana: 'しんぶん', kanji: '新聞', meaning: '報紙', note: '' },
          { hiragana: 'ノート', kanji: 'Note', meaning: '筆記本', note: '' },
          { hiragana: 'てちょう', kanji: '手帳', meaning: '記事本', note: '' },
          { hiragana: 'めいし', kanji: '名刺', meaning: '名片', note: '' },
          { hiragana: 'カード', kanji: 'Card', meaning: '卡片', note: '' },
          { hiragana: 'えんぴつ', kanji: '鉛筆', meaning: '鉛筆', note: '' },
          { hiragana: 'ボールペン', kanji: 'Ball Pen', meaning: '原子筆', note: '' },
        ]
      },
      {
        id: 3,
        title: '更多物品',
        subtitle: '電器和雜物',
        vocab: [
          { hiragana: 'かぎ', kanji: '鍵', meaning: '鑰匙', note: '' },
          { hiragana: 'とけい', kanji: '時計', meaning: '時鐘/手錶', note: '' },
          { hiragana: 'かさ', kanji: '傘', meaning: '雨傘', note: '' },
          { hiragana: 'かばん', kanji: '鞄', meaning: '包包', note: '' },
          { hiragana: 'テレビ', kanji: 'TV', meaning: '電視', note: '' },
          { hiragana: 'パソコン', kanji: 'PC', meaning: '電腦', note: '' },
          { hiragana: 'でんわ', kanji: '電話', meaning: '電話', note: '' },
          { hiragana: 'つくえ', kanji: '机', meaning: '桌子', note: '' },
          { hiragana: 'いす', kanji: '椅子', meaning: '椅子', note: '' },
          { hiragana: 'ドア', kanji: 'Door', meaning: '門', note: '' },
        ]
      },
      {
        id: 4,
        title: '詢問與回答',
        subtitle: '基本對話',
        vocab: [
          { hiragana: 'そうです', kanji: 'そうです', meaning: '是的', note: '肯定' },
          { hiragana: 'そうじゃありません', kanji: 'そうじゃありません', meaning: '不是', note: '否定' },
          { hiragana: 'なんですか', kanji: '何ですか', meaning: '是什麼？', note: '' },
          { hiragana: 'あのう', kanji: 'あのう', meaning: '那個...', note: '猶豫時' },
          { hiragana: 'えっ', kanji: 'えっ', meaning: '咦？', note: '驚訝' },
          { hiragana: 'どうぞ', kanji: 'どうぞ', meaning: '請', note: '給東西時' },
          { hiragana: 'ありがとう', kanji: 'ありがとう', meaning: '謝謝', note: '' },
          { hiragana: 'どうも', kanji: 'どうも', meaning: '非常', note: '加強語氣' },
          { hiragana: 'これから', kanji: 'これから', meaning: '今後/接下來', note: '' },
          { hiragana: 'おねがいします', kanji: 'お願いします', meaning: '拜託了', note: '' },
        ]
      },
    ],
    totalVocab: 40,
    estimatedTime: 15,
  },
  {
    id: 'n5-lesson-3',
    lessonNum: 3,
    title: '這裡是哪裡',
    description: '學習地點、建築物和場所相關詞彙',
    grammar: [
      'ここ/そこ/あそこは～です（這/那裡是～）',
      '～はどこですか（～在哪裡？）',
      '～も～です（～也～）',
    ],
    units: [
      {
        id: 1,
        title: '場所指示',
        subtitle: '這裡・那裡・哪裡',
        vocab: [
          { hiragana: 'ここ', kanji: 'ここ', meaning: '這裡', note: '近處' },
          { hiragana: 'そこ', kanji: 'そこ', meaning: '那裡', note: '遠處' },
          { hiragana: 'あそこ', kanji: 'あそこ', meaning: '那邊', note: '更遠' },
          { hiragana: 'どこ', kanji: 'どこ', meaning: '哪裡', note: '疑問詞' },
          { hiragana: 'こちら', kanji: 'こちら', meaning: '這邊', note: '禮貌說法' },
          { hiragana: 'そちら', kanji: 'そちら', meaning: '那邊', note: '禮貌說法' },
          { hiragana: 'あちら', kanji: 'あちら', meaning: '那邊', note: '禮貌說法' },
          { hiragana: 'どちら', kanji: 'どちら', meaning: '哪邊', note: '禮貌說法' },
          { hiragana: 'きょうしつ', kanji: '教室', meaning: '教室', note: '' },
          { hiragana: 'しょくどう', kanji: '食堂', meaning: '餐廳', note: '' },
        ]
      },
      {
        id: 2,
        title: '建築物',
        subtitle: '公共場所',
        vocab: [
          { hiragana: 'じむしょ', kanji: '事務所', meaning: '辦公室', note: '' },
          { hiragana: 'かいぎしつ', kanji: '会議室', meaning: '會議室', note: '' },
          { hiragana: 'うけつけ', kanji: '受付', meaning: '櫃檯', note: '' },
          { hiragana: 'へや', kanji: '部屋', meaning: '房間', note: '' },
          { hiragana: 'トイレ', kanji: 'Toilet', meaning: '廁所', note: '' },
          { hiragana: 'おてあらい', kanji: 'お手洗い', meaning: '洗手間', note: '禮貌說法' },
          { hiragana: 'かいだん', kanji: '階段', meaning: '樓梯', note: '' },
          { hiragana: 'エレベーター', kanji: 'Elevator', meaning: '電梯', note: '' },
          { hiragana: 'エスカレーター', kanji: 'Escalator', meaning: '電扶梯', note: '' },
          { hiragana: 'じどうはんばいき', kanji: '自動販売機', meaning: '自動販賣機', note: '' },
        ]
      },
      {
        id: 3,
        title: '國家・語言',
        subtitle: '更多國家',
        vocab: [
          { hiragana: 'くに', kanji: '国', meaning: '國家', note: '' },
          { hiragana: 'かんこく', kanji: '韓国', meaning: '韓國', note: '' },
          { hiragana: 'ちゅうごく', kanji: '中国', meaning: '中國', note: '' },
          { hiragana: 'イタリア', kanji: 'Italy', meaning: '義大利', note: '' },
          { hiragana: 'スペイン', kanji: 'Spain', meaning: '西班牙', note: '' },
          { hiragana: 'ロシア', kanji: 'Russia', meaning: '俄羅斯', note: '' },
          { hiragana: 'オーストラリア', kanji: 'Australia', meaning: '澳洲', note: '' },
          { hiragana: 'カナダ', kanji: 'Canada', meaning: '加拿大', note: '' },
          { hiragana: 'スイス', kanji: 'Swiss', meaning: '瑞士', note: '' },
          { hiragana: 'インドネシア', kanji: 'Indonesia', meaning: '印尼', note: '' },
        ]
      },
      {
        id: 4,
        title: '常用語',
        subtitle: '禮貌用語',
        vocab: [
          { hiragana: 'いくら', kanji: '幾ら', meaning: '多少錢', note: '' },
          { hiragana: 'ひゃく', kanji: '百', meaning: '百', note: '' },
          { hiragana: 'せん', kanji: '千', meaning: '千', note: '' },
          { hiragana: 'まん', kanji: '万', meaning: '萬', note: '' },
          { hiragana: 'すみません', kanji: '済みません', meaning: '對不起/不好意思', note: '' },
          { hiragana: '～でございます', kanji: '～でございます', meaning: '是～（敬語）', note: '' },
          { hiragana: 'みせてください', kanji: '見せてください', meaning: '請讓我看', note: '' },
          { hiragana: 'じゃ', kanji: 'じゃ', meaning: '那麼', note: '口語' },
          { hiragana: 'それから', kanji: 'それから', meaning: '然後', note: '' },
          { hiragana: 'ください', kanji: '下さい', meaning: '請給我', note: '' },
        ]
      },
    ],
    totalVocab: 40,
    estimatedTime: 15,
  },
  {
    id: 'n5-lesson-8',
    lessonNum: 8,
    title: '形容詞',
    description: '學習常用形容詞：高い、安い、重い、軽い等，掌握い形容詞的基本用法',
    grammar: [
      'い形容詞（～い）',
      '～は～です（描述事物）',
      '～くないです（否定）',
    ],
    units: [
      {
        id: 1,
        title: '基本形容詞',
        subtitle: '描述物品特徵',
        vocab: [
          { hiragana: 'たかい', kanji: '高い', meaning: '高的；貴的', note: '' },
          { hiragana: 'やすい', kanji: '安い', meaning: '便宜的', note: '' },
          { hiragana: 'おもい', kanji: '重い', meaning: '重的', note: '' },
          { hiragana: 'かるい', kanji: '軽い', meaning: '輕的', note: '' },
          { hiragana: 'ひろい', kanji: '広い', meaning: '寬敞的', note: '' },
          { hiragana: 'せまい', kanji: '狭い', meaning: '狹窄的', note: '' },
          { hiragana: 'あたたかい', kanji: '暖かい', meaning: '暖和的', note: '' },
          { hiragana: 'すずしい', kanji: '涼しい', meaning: '涼爽的', note: '' },
          { hiragana: 'あつい', kanji: '暑い', meaning: '炎熱的', note: '' },
          { hiragana: 'さむい', kanji: '寒い', meaning: '寒冷的', note: '' },
        ]
      },
    ],
    totalVocab: 10,
    estimatedTime: 10,
  },
];

// ==================== 計分系統配置 ====================

export const scoringConfig = {
  // 每個單元的基礎經驗值
  unitBaseExp: 10,
  
  // 測驗得分獎勵
  quizRewards: {
    perfect: { min: 100, exp: 20, label: '完美！' },      // 100%
    excellent: { min: 80, exp: 15, label: '非常好！' },    // 80-99%
    good: { min: 60, exp: 10, label: '及格！' },           // 60-79%
    tryAgain: { min: 0, exp: 5, label: '再試一次' },       // 0-59%
  },
  
  // 連續學習獎勵
  streakRewards: {
    daily: 5,      // 每日登入
    weekly: 20,    // 連續7天
    monthly: 100,  // 連續30天
  },
  
  // 完成整課獎勵
  lessonComplete: {
    base: 50,           // 基礎獎勵
    allUnits: 30,       // 完成所有單元
    perfectAll: 50,     // 所有測驗100分
  },
  
  // 等級計算
  levelCalculation: {
    baseExp: 100,       // 第1級所需經驗
    multiplier: 1.2,    // 每級增長倍數
  },
};

// ==================== 輔助函數 ====================

export function getQuizReward(percentage: number): { exp: number; label: string } {
  const { quizRewards } = scoringConfig;
  if (percentage >= quizRewards.perfect.min) return { exp: quizRewards.perfect.exp, label: quizRewards.perfect.label };
  if (percentage >= quizRewards.excellent.min) return { exp: quizRewards.excellent.exp, label: quizRewards.excellent.label };
  if (percentage >= quizRewards.good.min) return { exp: quizRewards.good.exp, label: quizRewards.good.label };
  return { exp: quizRewards.tryAgain.exp, label: quizRewards.tryAgain.label };
}

export function calculateLevel(exp: number): { level: number; currentExp: number; nextLevelExp: number; progress: number } {
  const { baseExp, multiplier } = scoringConfig.levelCalculation;
  let level = 1;
  let currentLevelBase = 0;
  let nextLevelExp = baseExp;
  
  while (exp >= nextLevelExp) {
    level++;
    currentLevelBase = nextLevelExp;
    nextLevelExp = Math.floor(nextLevelExp * multiplier);
  }
  
  const currentExp = exp - currentLevelBase;
  const levelNeeded = nextLevelExp - currentLevelBase;
  const progress = Math.floor((currentExp / levelNeeded) * 100);
  
  return { level, currentExp, nextLevelExp, progress };
}

export function getTotalN5Vocab(): number {
  return n5Lessons.reduce((total, lesson) => total + lesson.totalVocab, 0);
}

export function getLessonById(id: string): N5Lesson | undefined {
  return n5Lessons.find(lesson => lesson.id === id);
}

export function getAllLessons(): N5Lesson[] {
  return n5Lessons;
}
