/**
 * 考試模式數據結構
 * Exam Mode Data Structures
 * 
 * 模擬N5考試格式：閱讀理解、語文運用、聆聽
 * 每課考試包含該課及之前所有課的內容
 */

import { N5Lesson, N5Unit, N5Vocab } from '@/data/n5-lessons';

// ==================== 考試類型 ====================

export type ExamSection = 'reading' | 'language' | 'listening';

export interface ExamQuestion {
  id: string;
  section: ExamSection;
  type: 'multiple-choice' | 'fill-in-blank';
  question: string;
  options: string[];
  correctAnswer: number; // 選項索引
  explanation: string;
  sourceLesson: number;
  sourceUnit?: number;
  difficulty: 1 | 2 | 3;
}

export interface ExamSectionData {
  id: ExamSection;
  title: string;
  titleJp: string;
  description: string;
  timeLimit: number;
  questionCount: number;
  questions: ExamQuestion[];
}

export interface Exam {
  id: string;
  lessonNum: number;
  title: string;
  subtitle: string;
  totalTime: number;
  totalQuestions: number;
  passScore: number;
  sections: ExamSectionData[];
}

export interface ExamResult {
  examId: string;
  lessonNum: number;
  startedAt: Date;
  completedAt: Date;
  totalScore: number;
  maxScore: number;
  percentage: number;
  isPassed: boolean;
  sectionScores: Record<ExamSection, { correct: number; total: number; score: number }>;
  answers: Record<string, number>;
  timeSpent: number;
}

// ==================== 閱讀理解題目生成器 ====================

function generateReadingQuestions(lessons: N5Lesson[], upToLesson: number): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  const targetLessons = lessons.filter(l => l.lessonNum <= upToLesson);
  
  // 收集所有詞彙
  const allVocab: Array<{ vocab: N5Vocab; lessonNum: number; unitId: number }> = [];
  targetLessons.forEach(lesson => {
    lesson.units.forEach(unit => {
      unit.vocab.forEach(v => {
        allVocab.push({ vocab: v, lessonNum: lesson.lessonNum, unitId: unit.id });
      });
    });
  });
  
  if (allVocab.length < 4) return questions;
  
  // 生成詞彙理解題（日文詞彙 → 選中文意思）
  const usedIndices = new Set<number>();
  let questionCount = 0;
  
  while (questionCount < 10 && usedIndices.size < allVocab.length) {
    const randomIndex = Math.floor(Math.random() * allVocab.length);
    if (usedIndices.has(randomIndex)) continue;
    usedIndices.add(randomIndex);
    
    const target = allVocab[randomIndex];
    const targetVocab = target.vocab;
    
    // 選3個干擾項
    const otherVocabs = allVocab
      .filter((_, i) => i !== randomIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(v => v.vocab.meaning);
    
    const options = [...otherVocabs, targetVocab.meaning].sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(targetVocab.meaning);
    
    questions.push({
      id: `read-${target.lessonNum}-${target.unitId}-${questionCount}`,
      section: 'reading',
      type: 'multiple-choice',
      question: `「${targetVocab.hiragana}」${targetVocab.kanji ? `（${targetVocab.kanji}）` : ''} 的意思是什麼？`,
      options,
      correctAnswer: correctIndex,
      explanation: `「${targetVocab.hiragana}${targetVocab.kanji ? `（${targetVocab.kanji}）` : ''}」的意思是「${targetVocab.meaning}」。`,
      sourceLesson: target.lessonNum,
      sourceUnit: target.unitId,
      difficulty: targetVocab.note ? 2 : 1,
    });
    
    questionCount++;
  }
  
  return questions;
}

// ==================== 語文運用題目生成器 ====================

function generateLanguageQuestions(lessons: N5Lesson[], upToLesson: number): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  
  // N5 文法題庫
  const grammarQuestions: Array<{
    sentence: string;
    meaning: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    minLesson: number;
    difficulty: 1 | 2 | 3;
  }> = [
    {
      sentence: 'わたし＿＿がくせいです。',
      meaning: '我是學生。',
      options: ['は', 'が', 'を', 'の'],
      correctIndex: 0,
      explanation: '「は」用於提示主題，表示「我是學生」。',
      minLesson: 1,
      difficulty: 1,
    },
    {
      sentence: 'これ＿＿ほんです。',
      meaning: '這是書。',
      options: ['は', 'が', 'を', 'に'],
      correctIndex: 0,
      explanation: '「は」用於提示主題，表示「這（東西）是書」。',
      minLesson: 2,
      difficulty: 1,
    },
    {
      sentence: 'がっこう＿＿いきます。',
      meaning: '去學校。',
      options: ['は', 'が', 'を', 'へ'],
      correctIndex: 3,
      explanation: '「へ」表示方向，「がっこうへいきます」意思是「去學校」。',
      minLesson: 3,
      difficulty: 2,
    },
    {
      sentence: 'ろくじ＿＿おきます。',
      meaning: '六點起床。',
      options: ['は', 'が', 'を', 'に'],
      correctIndex: 3,
      explanation: '「に」用於表示具體時間點，「ろくじに」意思是「在六點」。',
      minLesson: 4,
      difficulty: 2,
    },
    {
      sentence: 'きょうと＿＿しんかんせん＿＿いきます。',
      meaning: '坐新幹線去京都。',
      options: ['へ、で', 'に、を', 'で、へ', 'を、に'],
      correctIndex: 0,
      explanation: '「へ」表示方向，「で」表示交通方式。',
      minLesson: 5,
      difficulty: 3,
    },
    {
      sentence: 'がいこく＿＿りょうり＿＿たべました。',
      meaning: '吃了外國菜。',
      options: ['の、を', 'を、が', 'が、に', 'に、で'],
      correctIndex: 0,
      explanation: '「の」連接名詞，「を」提示賓語。',
      minLesson: 2,
      difficulty: 2,
    },
    {
      sentence: 'いま＿＿なんじですか。',
      meaning: '現在幾點？',
      options: ['は', 'が', 'を', 'に'],
      correctIndex: 0,
      explanation: '「は」用於提示主題，「いまはなんじですか」詢問現在時間。',
      minLesson: 4,
      difficulty: 1,
    },
    {
      sentence: 'だいがく＿＿なにがくですか。',
      meaning: '大學是什麼學系？',
      options: ['は', 'が', 'を', 'に'],
      correctIndex: 0,
      explanation: '「は」用於提示主題。',
      minLesson: 1,
      difficulty: 1,
    },
  ];
  
  // 根據課程進度選擇合適的文法題
  const availableQuestions = grammarQuestions.filter(q => q.minLesson <= upToLesson);
  
  // 隨機選擇最多12題
  const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5).slice(0, 12);
  
  shuffled.forEach((q, index) => {
    questions.push({
      id: `lang-grammar-${index}`,
      section: 'language',
      type: 'fill-in-blank',
      question: `請選擇正確的助詞填入空白處：\n${q.sentence}\n（${q.meaning}）`,
      options: q.options,
      correctAnswer: q.correctIndex,
      explanation: q.explanation,
      sourceLesson: q.minLesson,
      difficulty: q.difficulty,
    });
  });
  
  return questions;
}

// ==================== 聆聽題目生成器 ====================

function generateListeningQuestions(lessons: N5Lesson[], upToLesson: number): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  const targetLessons = lessons.filter(l => l.lessonNum <= upToLesson);
  
  // 收集所有詞彙
  const allVocab: Array<{ vocab: N5Vocab; lessonNum: number; unitId: number }> = [];
  targetLessons.forEach(lesson => {
    lesson.units.forEach(unit => {
      unit.vocab.forEach(v => {
        allVocab.push({ vocab: v, lessonNum: lesson.lessonNum, unitId: unit.id });
      });
    });
  });
  
  if (allVocab.length < 4) return questions;
  
  // 生成聆聽理解題（顯示日文詞彙，選中文意思）
  const usedIndices = new Set<number>();
  let questionCount = 0;
  
  while (questionCount < 8 && usedIndices.size < allVocab.length) {
    const randomIndex = Math.floor(Math.random() * allVocab.length);
    if (usedIndices.has(randomIndex)) continue;
    usedIndices.add(randomIndex);
    
    const target = allVocab[randomIndex];
    const targetVocab = target.vocab;
    
    // 選3個干擾項
    const otherVocabs = allVocab
      .filter((_, i) => i !== randomIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(v => v.vocab.meaning);
    
    const options = [...otherVocabs, targetVocab.meaning].sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(targetVocab.meaning);
    
    questions.push({
      id: `listen-${target.lessonNum}-${target.unitId}-${questionCount}`,
      section: 'listening',
      type: 'multiple-choice',
      question: `請聽以下詞彙，選擇正確的意思：\n🔊 「${targetVocab.hiragana}」${targetVocab.kanji ? `（${targetVocab.kanji}）` : ''}`,
      options,
      correctAnswer: correctIndex,
      explanation: `「${targetVocab.hiragana}${targetVocab.kanji ? `（${targetVocab.kanji}）` : ''}」的意思是「${targetVocab.meaning}」。`,
      sourceLesson: target.lessonNum,
      sourceUnit: target.unitId,
      difficulty: 1,
    });
    
    questionCount++;
  }
  
  return questions;
}

// ==================== 考試生成器 ====================

export function generateExam(lessons: N5Lesson[], lessonNum: number): Exam {
  const readingQuestions = generateReadingQuestions(lessons, lessonNum);
  const languageQuestions = generateLanguageQuestions(lessons, lessonNum);
  const listeningQuestions = generateListeningQuestions(lessons, lessonNum);
  
  const totalQuestions = readingQuestions.length + languageQuestions.length + listeningQuestions.length;
  const maxScore = totalQuestions * 10;
  const passScore = Math.floor(maxScore * 0.6);
  
  return {
    id: `exam-n5-lesson-${lessonNum}`,
    lessonNum,
    title: `第${lessonNum}課 綜合考試`,
    subtitle: `包含第1至${lessonNum}課所有內容`,
    totalTime: 30 + (lessonNum * 5),
    totalQuestions,
    passScore,
    sections: [
      {
        id: 'reading',
        title: '閱讀理解',
        titleJp: '読解',
        description: '閱讀詞彙並回答問題，測試你對日文詞彙的理解。',
        timeLimit: 10 + (lessonNum * 2),
        questionCount: readingQuestions.length,
        questions: readingQuestions,
      },
      {
        id: 'language',
        title: '語文運用',
        titleJp: '文法・語彙',
        description: '測試助詞使用和句子結構。',
        timeLimit: 12 + (lessonNum * 2),
        questionCount: languageQuestions.length,
        questions: languageQuestions,
      },
      {
        id: 'listening',
        title: '聆聽理解',
        titleJp: '聴解',
        description: '聆聽詞彙，選擇正確意思。',
        timeLimit: 8 + lessonNum,
        questionCount: listeningQuestions.length,
        questions: listeningQuestions,
      },
    ],
  };
}

// ==================== 評分系統 ====================

export function calculateExamScore(
  exam: Exam,
  answers: Record<string, number>
): ExamResult {
  const sectionScores: ExamResult['sectionScores'] = {
    reading: { correct: 0, total: 0, score: 0 },
    language: { correct: 0, total: 0, score: 0 },
    listening: { correct: 0, total: 0, score: 0 },
  };
  
  exam.sections.forEach(section => {
    section.questions.forEach(question => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      
      sectionScores[section.id].total++;
      if (isCorrect) {
        sectionScores[section.id].correct++;
        sectionScores[section.id].score += 10;
      }
    });
  });
  
  const totalScore = Object.values(sectionScores).reduce((sum, s) => sum + s.score, 0);
  const maxScore = exam.totalQuestions * 10;
  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  
  return {
    examId: exam.id,
    lessonNum: exam.lessonNum,
    startedAt: new Date(),
    completedAt: new Date(),
    totalScore,
    maxScore,
    percentage,
    isPassed: totalScore >= exam.passScore,
    sectionScores,
    answers,
    timeSpent: 0,
  };
}

// ==================== 獲取考試列表 ====================

export function getAvailableExams(lessons: N5Lesson[]): Exam[] {
  return lessons.map(lesson => generateExam(lessons, lesson.lessonNum));
}
