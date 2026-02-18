/**
 * 大家的日本語 N5 完整課程數據（含廣東話諧音）
 * Minna no Nihongo N5 with Cantonese Phonetics
 */

// ==================== 類型定義 ====================

export interface N5Vocab {
  hiragana: string;
  kanji: string;
  meaning: string;
  cantonese?: string; // 廣東話諧音
  note?: string;
}

export interface GrammarPoint {
  pattern: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
}

export interface ListeningItem {
  title: string;
  audioScript: string;
  translation: string;
  keyPhrases: string[];
}

export interface DialogueItem {
  speaker: string;
  japanese: string;
  cantonese?: string; // 廣東話諧音
  meaning: string;
}

export interface N5Unit {
  id: number;
  title: string;
  subtitle: string;
  vocab: N5Vocab[];
  grammar?: GrammarPoint[];
  listening?: ListeningItem;
  dialogue?: DialogueItem[];
  estimatedTime: number; // 分鐘
}

export interface N5Lesson {
  id: string;
  lessonNum: number;
  title: string;
  description: string;
  units: N5Unit[];
  totalVocab: number;
  totalTime: number;
}

// ==================== 第1課：初次見面（完整版）====================

export const lesson1Data: N5Lesson = {
  id: 'n5-lesson-1',
  lessonNum: 1,
  title: '初次見面',
  description: '學習人稱、職業、國家名稱，掌握自我介紹的基本會話。本課分4個微單元，每單元約3-5分鐘完成。',
  totalVocab: 41,
  totalTime: 20,
  units: [
    {
      id: 1,
      title: '人稱與稱呼',
      subtitle: '自我介紹的第一步',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'わたし', kanji: '私', meaning: '我', cantonese: '哇他西', note: '女性常用' },
        { hiragana: 'あなた', kanji: '貴方', meaning: '你/您', cantonese: '阿那他', note: '禮貌說法' },
        { hiragana: 'あのひと', kanji: 'あの人', meaning: '他/她/那個人', cantonese: '阿諾黑托', note: '口語' },
        { hiragana: 'あのかた', kanji: 'あの方', meaning: '那一位', cantonese: '阿諾卡他', note: '敬語' },
        { hiragana: '～さん', kanji: '～さん', meaning: '先生/女士', cantonese: '散', note: '尊稱' },
        { hiragana: '～ちゃん', kanji: '～ちゃん', meaning: '小～', cantonese: '橙', note: '對小孩或親暱稱呼' },
        { hiragana: '～じん', kanji: '～人', meaning: '～人', cantonese: '人', note: '國籍' },
        { hiragana: 'せんせい', kanji: '先生', meaning: '老師', cantonese: '森些', note: '稱呼他人' },
        { hiragana: 'きょうし', kanji: '教師', meaning: '教師', cantonese: '鏡西', note: '職業名稱' },
        { hiragana: 'がくせい', kanji: '学生', meaning: '學生', cantonese: '學些', note: '' },
      ],
      grammar: [
        {
          pattern: 'わたしは～です',
          meaning: '我是～',
          example: 'わたしはがくせいです。',
          exampleMeaning: '我是學生。',
        },
        {
          pattern: '～さん',
          meaning: '對他人的尊稱',
          example: 'たなかさん',
          exampleMeaning: '田中先生/女士',
        },
      ],
      dialogue: [
        { speaker: 'A', japanese: 'わたしはがくせいです。', cantonese: '哇他西哇 學些 爹司', meaning: '我是學生。' },
        { speaker: 'B', japanese: 'たなかさんですか。', cantonese: '他那他 散 爹司 卡', meaning: '是田中先生嗎？' },
        { speaker: 'A', japanese: 'はい、たなかです。', cantonese: '係，他那他 爹司', meaning: '是的，我是田中。' },
      ],
    },
    {
      id: 2,
      title: '職業與場所',
      subtitle: '工作場合用語',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'かいしゃいん', kanji: '会社員', meaning: '公司職員', cantonese: '卡一蝦銀', note: '' },
        { hiragana: 'しゃいん', kanji: '社員', meaning: '～公司職員', cantonese: '蝦銀', note: '前面加公司名' },
        { hiragana: 'ぎんこういん', kanji: '銀行員', meaning: '銀行行員', cantonese: '銀行銀', note: '' },
        { hiragana: 'いしゃ', kanji: '医者', meaning: '醫生', cantonese: '一蝦', note: '' },
        { hiragana: 'けんきゅうしゃ', kanji: '研究者', meaning: '研究人員', cantonese: '健究蝦', note: '' },
        { hiragana: 'だいがく', kanji: '大学', meaning: '大學', cantonese: '代學', note: '' },
        { hiragana: 'びょういん', kanji: '病院', meaning: '醫院', cantonese: '病院', note: '' },
        { hiragana: 'だれ', kanji: '誰', meaning: '誰', cantonese: '打咧', note: '口語' },
        { hiragana: 'どなた', kanji: '何方', meaning: '哪位', cantonese: '多那他', note: '敬語' },
        { hiragana: 'なんさい', kanji: '何歳', meaning: '幾歲', cantonese: '難赛', note: '問年齡' },
        { hiragana: 'おいくつ', kanji: 'お幾つ', meaning: '多大歲數', cantonese: '哦一古刺', note: '禮貌問法' },
      ],
      grammar: [
        {
          pattern: '～は～ですか',
          meaning: '～是～嗎？（疑問句）',
          example: 'あなたはがくせいですか。',
          exampleMeaning: '你是學生嗎？',
        },
        {
          pattern: 'はい、～です / いいえ、～です',
          meaning: '是的/不是',
          example: 'はい、がくせいです。',
          exampleMeaning: '是的，我是學生。',
        },
      ],
      dialogue: [
        { speaker: 'A', japanese: 'お仕事は何ですか。', cantonese: '哦西托多 難 爹司 卡', meaning: '請問您的工作是什麼？' },
        { speaker: 'B', japanese: '会社員です。どなたですか。', cantonese: '卡一蝦銀 爹司。多那他 爹司 卡', meaning: '我是公司職員。請問您是哪位？' },
        { speaker: 'A', japanese: 'わたしはいしゃです。', cantonese: '哇他西哇 一蝦 爹司', meaning: '我是醫生。' },
      ],
    },
    {
      id: 3,
      title: '初次見面會話',
      subtitle: '基本禮貌對話',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'はじめまして', kanji: '初めまして', meaning: '初次見面', cantonese: '哈芝咩 嘛西爹', note: '見面必說' },
        { hiragana: '～からきました', kanji: '～から来ました', meaning: '從～來的', cantonese: '卡拉 ki 嘛西他', note: '來自...' },
        { hiragana: 'よろしくおねがいします', kanji: 'よろしくお願いします', meaning: '請多關照', cantonese: '喲洛西哭 哦捏嘎一 西嘛司', note: '結束語' },
        { hiragana: 'しつれいですが', kanji: '失礼ですが', meaning: '對不起/請問', cantonese: '西刺咧 爹司 嘎', note: '打斷別人時' },
        { hiragana: 'おなまえは', kanji: 'お名前は', meaning: '您貴姓？', cantonese: '哦哪嘛也 哇', note: '問名字' },
        { hiragana: 'こちらは～さんです', kanji: 'こちらは～さんです', meaning: '這位是～', cantonese: '哦洛西 哇 散 爹司', note: '介紹他人' },
        { hiragana: 'はい', kanji: 'はい', meaning: '是/對', cantonese: '係', note: '' },
        { hiragana: 'いいえ', kanji: 'いいえ', meaning: '不/不是', cantonese: '一一也', note: '' },
        { hiragana: 'あ', kanji: 'あ', meaning: '啊', cantonese: '阿', note: '驚訝時' },
        { hiragana: '～さい', kanji: '～歳', meaning: '～歲', cantonese: '赛', note: '數字+歳' },
      ],
      grammar: [
        {
          pattern: 'はじめまして',
          meaning: '初次見面（打招呼）',
          example: 'はじめまして。わたしはたなかです。',
          exampleMeaning: '初次見面。我是田中。',
        },
        {
          pattern: 'よろしくおねがいします',
          meaning: '請多關照（結束語）',
          example: 'いしゃです。よろしくおねがいします。',
          exampleMeaning: '我是醫生。請多關照。',
        },
      ],
      listening: {
        title: '自我介紹聽力練習',
        audioScript: 'はじめまして。わたしはスミスです。アメリカから来ました。いしゃです。よろしくおねがいします。',
        translation: '初次見面。我是史密斯。從美國來。我是醫生。請多關照。',
        keyPhrases: ['はじめまして', '～から来ました', 'よろしくおねがいします'],
      },
      dialogue: [
        { speaker: 'スミス', japanese: 'はじめまして。わたしはスミスです。', cantonese: '哈芝咩 嘛西爹。哇他西哇 士咪士 爹司', meaning: '初次見面。我是史密斯。' },
        { speaker: '田中', japanese: 'はじめまして。たなかです。どうぞよろしく。', cantonese: '哈芝咩 嘛西爹。他那他 爹司。多囉 喲洛西哭', meaning: '初次見面。我是田中。請多關照。' },
        { speaker: 'スミス', japanese: 'アメリカから来ました。いしゃです。', cantonese: '阿咩利卡 卡拉 ki 嘛西他。一蝦 爹司', meaning: '從美國來。我是醫生。' },
        { speaker: '田中', japanese: 'そうですか。わたしはかいしゃいんです。', cantonese: '囉 爹司 卡。哇他西哇 卡一蝦銀 爹司', meaning: '是嗎。我是公司職員。' },
      ],
    },
    {
      id: 4,
      title: '國家名稱',
      subtitle: '來自哪裡？',
      estimatedTime: 5,
      vocab: [
        { hiragana: 'アメリカ', kanji: 'America', meaning: '美國', cantonese: '阿咩利卡', note: '' },
        { hiragana: 'イギリス', kanji: 'UK', meaning: '英國', cantonese: '一gi利士', note: '' },
        { hiragana: 'にほん', kanji: '日本', meaning: '日本', cantonese: '你虹', note: '' },
        { hiragana: 'かんこく', kanji: '韓国', meaning: '韓國', cantonese: '干谷', note: '' },
        { hiragana: 'ちゅうごく', kanji: '中国', meaning: '中國', cantonese: '丘谷', note: '' },
        { hiragana: 'フランス', kanji: 'France', meaning: '法國', cantonese: '夫干士', note: '' },
        { hiragana: 'ドイツ', kanji: 'Germany', meaning: '德國', cantonese: '多伊刺', note: '' },
        { hiragana: 'タイ', kanji: 'Thailand', meaning: '泰國', cantonese: '他衣', note: '' },
        { hiragana: 'インド', kanji: 'India', meaning: '印度', cantonese: '印多', note: '' },
        { hiragana: 'ブラジル', kanji: 'Brazil', meaning: '巴西', cantonese: '夫啦支路', note: '' },
      ],
      grammar: [
        {
          pattern: '～じんです',
          meaning: '是～人',
          example: 'アメリカじんです。',
          exampleMeaning: '我是美國人。',
        },
        {
          pattern: '～から来ました',
          meaning: '從～來',
          example: 'ちゅうごくから来ました。',
          exampleMeaning: '從中國來。',
        },
      ],
      listening: {
        title: '國家與國籍聽力練習',
        audioScript: 'A: スミスさんはどこから来ましたか。B: イギリスから来ました。イギリスじんです。',
        translation: 'A: 史密斯先生從哪裡來？B: 從英國來。我是英國人。',
        keyPhrases: ['どこから来ましたか', '～じんです'],
      },
      dialogue: [
        { speaker: 'A', japanese: 'どこから来ましたか。', cantonese: '多囉 卡拉 ki 嘛西他 卡', meaning: '您從哪裡來？' },
        { speaker: 'B', japanese: 'ちゅうごくから来ました。', cantonese: '丘谷 卡拉 ki 嘛西他', meaning: '從中國來。' },
        { speaker: 'A', japanese: 'ちゅうごくじんですか。', cantonese: '丘谷人 爹司 卡', meaning: '是中國人嗎？' },
        { speaker: 'B', japanese: 'はい、ちゅうごくじんです。', cantonese: '係，丘谷人 爹司', meaning: '是的，我是中國人。' },
      ],
    },
  ],
};

// ==================== 導入第2-15課 ====================
import { n5Lessons2to4 } from './n5-lessons-full';
import { n5Lessons5to7V2 } from './n5-lessons-5to15';
import { n5Lessons8to15 } from './n5-lessons-8to15';

// ==================== 所有N5課程列表 ====================

export const n5LessonsList = [
  lesson1Data,
  ...n5Lessons2to4,
  ...n5Lessons5to7V2,
  ...n5Lessons8to15,
];

// 匯出第2-4課供課程頁面使用
export { n5Lessons2to4 };

// ==================== 雙軌計分系統 ====================
// 參與分：鼓勵學習行為（唔考核能力）
// 考核分：測驗得分（反映實際能力）

export const scoringConfig = {
  // ===== 參與分 (Participation Points) =====
  // 完成單元學習（睇完卡片即算）
  participation: {
    unitComplete: {           // 完成單元學習
      base: 5,                // 基礎參與分
      vocabBonus: 2,          // 有詞彙部分
      grammarBonus: 3,        // 有文法部分
      dialogueBonus: 2,       // 有對話部分
    },
    dailyLogin: 3,            // 每日登入
    streakBonus: {            // 連續學習獎勵
      weekly: 10,             // 連續7天
      monthly: 50,            // 連續30天
    },
  },
  
  // ===== 考核分 (Assessment Points) =====
  // 測驗得分（反映實際掌握程度）
  assessment: {
    quiz: {
      perfect: { min: 100, exp: 25, label: '完美！', stars: 3 },      // 100%
      excellent: { min: 90, exp: 20, label: '優秀！', stars: 3 },     // 90-99%
      veryGood: { min: 80, exp: 15, label: '非常好！', stars: 2 },    // 80-89%
      good: { min: 70, exp: 10, label: '良好！', stars: 2 },          // 70-79%
      pass: { min: 60, exp: 5, label: '及格！', stars: 1 },           // 60-69%
      fail: { min: 0, exp: 0, label: '再試一次', stars: 0 },          // <60%
    },
    // 完成所有單元測驗獎勵
    completeAllUnits: 30,     // 完成一課所有單元測驗
    perfectAllUnits: 50,      // 所有單元都100分
  },
  
  // ===== 等級計算 =====
  levelCalculation: {
    baseExp: 100,             // 第1級所需經驗
    multiplier: 1.15,         // 每級增長15%
  },
};

// ==================== 輔助函數 ====================

// 計算測驗考核分
export function getQuizReward(percentage: number) {
  const { quiz } = scoringConfig.assessment;
  if (percentage >= quiz.perfect.min) return quiz.perfect;
  if (percentage >= quiz.excellent.min) return quiz.excellent;
  if (percentage >= quiz.veryGood.min) return quiz.veryGood;
  if (percentage >= quiz.good.min) return quiz.good;
  if (percentage >= quiz.pass.min) return quiz.pass;
  return quiz.fail;
}

// 計算參與分
export function calculateParticipationExp(unit: N5Unit): number {
  const { unitComplete } = scoringConfig.participation;
  let exp = unitComplete.base;
  
  if (unit.vocab.length > 0) exp += unitComplete.vocabBonus;
  if (unit.grammar && unit.grammar.length > 0) exp += unitComplete.grammarBonus;
  if (unit.dialogue && unit.dialogue.length > 0) exp += unitComplete.dialogueBonus;
  
  return exp;
}

// EXP 來源類型
export interface ExpSource {
  type: 'participation' | 'assessment';
  action: string;
  exp: number;
  timestamp: Date;
  lessonId?: string;
  unitId?: number;
}

// 保存 EXP 記錄到 localStorage
export function saveExpHistory(source: ExpSource) {
  const history = JSON.parse(localStorage.getItem('n5-exp-history') || '[]');
  history.push(source);
  localStorage.setItem('n5-exp-history', JSON.stringify(history));
}

export function calculateLevel(exp: number) {
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

export function getLessonById(id: string): N5Lesson | undefined {
  return n5LessonsList.find(lesson => lesson.id === id);
}

export function getUnitProgressKey(lessonId: string, unitId: number): string {
  return `${lessonId}-unit-${unitId}`;
}

// 計算課程總進度
export function calculateLessonProgress(lesson: N5Lesson, completedUnits: Set<string>): number {
  const completed = lesson.units.filter(unit => 
    completedUnits.has(getUnitProgressKey(lesson.id, unit.id))
  ).length;
  return Math.round((completed / lesson.units.length) * 100);
}
