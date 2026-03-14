/**
 * JLPT N5 歷屆試題 類型定義
 */

// 考試部分
export type ExamSection = 
  | 'vocabulary'      // 文字語彙
  | 'grammar'         // 文法
  | 'reading'         // 読解
  | 'listening';      // 聴解

// 考試年份
export interface ExamYear {
  year: number;
  month: number;      // 7月或12月
  title: string;      // 例如: "2023年7月"
}

// 選項
export interface QuestionOption {
  id: string;         // 1, 2, 3, 4
  text: string;       // 日文選項
  reading?: string;   // 讀音（平假名）
  meaning?: string;   // 中文意思
}

// 問題
export interface ExamQuestion {
  id: string;
  year: number;
  month: number;
  section: ExamSection;
  questionNumber: number;      // 題號
  questionType?: string;       // 問題類型（如「漢字讀音」、「助詞填空」等）
  
  // 題目
  question: string;            // 日文題目
  questionReading?: string;    // 題目讀音
  questionMeaning?: string;    // 題目中文解釋
  
  // 選項
  options: QuestionOption[];
  
  // 正確答案
  correctAnswer: string;       // 1, 2, 3, 或 4
  
  // 答案解釋
  explanation?: string;        // 解釋為什麼這是答案
  explanationReading?: string; // 解釋的讀音
  explanationMeaning?: string; // 解釋的中文
  
  // 原文上下文（讀解用）
  context?: string;            // 文章內容
  contextReading?: string;     // 文章讀音
  contextMeaning?: string;     // 文章中文
}

// 篩選選項
export interface ExamFilter {
  years: number[];             // 選中的年份
  sections: ExamSection[];     // 選中的部分
  shuffle: boolean;            // 是否打亂順序
  questionCount?: number;      // 出題數量（全部或指定數量）
}

// 用戶作答記錄
export interface UserAnswer {
  questionId: string;
  selectedAnswer: string | null;
  isCorrect: boolean;
  answeredAt: Date;
}

// 考試結果
export interface ExamResult {
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  score: number;
  answers: UserAnswer[];
  completedAt: Date;
}

// 部分標題對照
export const SECTION_TITLES: Record<ExamSection, { title: string; titleJp: string; icon: string }> = {
  vocabulary: { title: '文字語彙', titleJp: 'もじ・ごい', icon: '📝' },
  grammar: { title: '文法', titleJp: 'ぶんぽう', icon: '📐' },
  reading: { title: '讀解', titleJp: 'どっかい', icon: '📖' },
  listening: { title: '聴解', titleJp: 'ちょうかい', icon: '🎧' },
};

// 可用年份列表
export const AVAILABLE_YEARS: ExamYear[] = [
  { year: 2023, month: 7, title: '2023年7月' },
  { year: 2023, month: 12, title: '2023年12月' },
  { year: 2022, month: 7, title: '2022年7月' },
  { year: 2022, month: 12, title: '2022年12月' },
  { year: 2021, month: 7, title: '2021年7月' },
  { year: 2021, month: 12, title: '2021年12月' },
  { year: 2020, month: 12, title: '2020年12月' },
  { year: 2019, month: 7, title: '2019年7月' },
  { year: 2019, month: 12, title: '2019年12月' },
  { year: 2018, month: 7, title: '2018年7月' },
  { year: 2018, month: 12, title: '2018年12月' },
  { year: 2017, month: 7, title: '2017年7月' },
  { year: 2017, month: 12, title: '2017年12月' },
  { year: 2016, month: 7, title: '2016年7月' },
  { year: 2016, month: 12, title: '2016年12月' },
  { year: 2015, month: 7, title: '2015年7月' },
  { year: 2015, month: 12, title: '2015年12月' },
  { year: 2014, month: 7, title: '2014年7月' },
  { year: 2014, month: 12, title: '2014年12月' },
  { year: 2013, month: 7, title: '2013年7月' },
  { year: 2013, month: 12, title: '2013年12月' },
];
