/**
 * 閱讀理解類型定義
 * Reading Comprehension Types
 */

// 題目類型
export type ReadingQuestionType = 'main' | 'detail' | 'inference';

// 閱讀題目
export interface ReadingQuestion {
  id: string;
  question: string;
  questionCn?: string; // 中文題目（給初學者使用）
  options: string[];
  optionsCn?: string[]; // 中文選項（給初學者使用）
  correctIndex: number;
  type: ReadingQuestionType;
  explanation: string;
}

// 閱讀文章
export interface ReadingPassage {
  id: string;
  lessonId: number;
  unitId: number;
  title: string;
  japanese: string;
  cantonese: string;
  questions: ReadingQuestion[];
  // 標記使用了哪些課的詞彙（用於漸進式學習）
  vocabFromLessons: number[];
  // 難度等級
  difficulty: 'easy' | 'medium' | 'hard';
}

// 閱讀測驗結果
export interface ReadingResult {
  passageId: string;
  correctCount: number;
  totalQuestions: number;
  answers: {
    questionId: string;
    selectedIndex: number;
    correct: boolean;
  }[];
  timeSpent: number;
  completedAt: Date;
}

// 題型標籤
export const QUESTION_TYPE_LABELS: Record<ReadingQuestionType, { label: string; color: string }> = {
  main: { label: '主旨', color: 'bg-blue-100 text-blue-700' },
  detail: { label: '細節', color: 'bg-green-100 text-green-700' },
  inference: { label: '推理', color: 'bg-purple-100 text-purple-700' },
};
