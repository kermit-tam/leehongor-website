/**
 * 考試模式數據結構
 * Exam Mode Data Structures
 * 
 * 模擬N5考試格式：閱讀理解、語文運用、聆聽
 * 每課考試包含該課及之前所有課的內容
 */

import { N5Lesson, N5Unit, N5Vocab } from '@/data/n5-lessons';
import { lesson1Reading } from '@/app/learn/n5/lesson-1/reading-data';
import { lesson2Reading } from '@/app/learn/n5/lesson-2/reading-data';
import { lesson3Reading } from '@/app/learn/n5/lesson-3/reading-data';
import { lesson4Reading } from '@/app/learn/n5/lesson-4/reading-data';
import { lesson5Reading } from '@/app/learn/n5/lesson-5/reading-data';
import { getListeningDialogues, ListeningDialogue } from './listening-dialogues';

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

// 所有閱讀理解短文數據
const allReadingPassages = [
  ...lesson1Reading,
  ...lesson2Reading,
  ...lesson3Reading,
  ...lesson4Reading,
  ...lesson5Reading,
];

function generateReadingQuestions(lessons: N5Lesson[], upToLesson: number): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  
  // 篩選符合課程進度的閱讀理解短文
  const availablePassages = allReadingPassages.filter(
    passage => passage.vocabFromLessons.every(l => l <= upToLesson)
  );
  
  // 如果沒有合適的短文，回退到詞彙題
  if (availablePassages.length === 0) {
    return generateVocabReadingQuestions(lessons, upToLesson);
  }
  
  // 隨機選擇最多3篇短文
  const shuffledPassages = [...availablePassages]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  let questionCount = 0;
  
  shuffledPassages.forEach((passage, passageIndex) => {
    passage.questions.forEach((q, qIndex) => {
      if (questionCount >= 10) return;
      
      questions.push({
        id: `read-${passage.id}-q${qIndex}`,
        section: 'reading',
        type: 'multiple-choice',
        question: `【${passage.title}】\n\n${passage.japanese}\n\n問題：${q.question}`,
        options: q.options,
        correctAnswer: q.correctIndex,
        explanation: `${q.explanation}\n\n文章粵語翻譯：${passage.cantonese}`,
        sourceLesson: passage.lessonId,
        sourceUnit: passage.unitId,
        difficulty: passage.difficulty === 'easy' ? 1 : passage.difficulty === 'medium' ? 2 : 3,
      });
      
      questionCount++;
    });
  });
  
  // 如果閱讀理解題目不夠10題，補充詞彙題
  if (questions.length < 10) {
    const vocabQuestions = generateVocabReadingQuestions(lessons, upToLesson);
    const remaining = 10 - questions.length;
    questions.push(...vocabQuestions.slice(0, remaining));
  }
  
  return questions;
}

// 詞彙理解題（備用）
function generateVocabReadingQuestions(lessons: N5Lesson[], upToLesson: number): ExamQuestion[] {
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
  
  // 過濾掉英文干擾項（國家名的英文 kanji）
  const isEnglish = (str: string): boolean => {
    return /^[a-zA-Z\s]+$/.test(str);
  };
  
  const usedIndices = new Set<number>();
  let questionCount = 0;
  
  while (questionCount < 10 && usedIndices.size < allVocab.length) {
    const randomIndex = Math.floor(Math.random() * allVocab.length);
    if (usedIndices.has(randomIndex)) continue;
    usedIndices.add(randomIndex);
    
    const target = allVocab[randomIndex];
    const targetVocab = target.vocab;
    
    // 選3個干擾項（過濾英文）
    const otherVocabs = allVocab
      .filter((v, i) => i !== randomIndex && !isEnglish(v.vocab.meaning))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(v => v.vocab.meaning);
    
    // 如果找不到足夠的非英文選項，跳過
    if (otherVocabs.length < 3) continue;
    
    const options = [...otherVocabs, targetVocab.meaning].sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(targetVocab.meaning);
    
    questions.push({
      id: `read-vocab-${target.lessonNum}-${target.unitId}-${questionCount}`,
      section: 'reading',
      type: 'multiple-choice',
      question: `「${targetVocab.hiragana}」${targetVocab.kanji && !isEnglish(targetVocab.kanji) ? `（${targetVocab.kanji}）` : ''} 的意思是什麼？`,
      options,
      correctAnswer: correctIndex,
      explanation: `「${targetVocab.hiragana}${targetVocab.kanji && !isEnglish(targetVocab.kanji) ? `（${targetVocab.kanji}）` : ''}」的意思是「${targetVocab.meaning}」。`,
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
    // 題目不顯示中文解釋（只在解說中顯示）
    questions.push({
      id: `lang-grammar-${index}`,
      section: 'language',
      type: 'fill-in-blank',
      question: `請選擇正確的助詞填入空白處：\n${q.sentence}`,
      options: q.options,
      correctAnswer: q.correctIndex,
      // 在解說中提供原文翻譯和文法解釋
      explanation: `【原文】${q.meaning}\n\n${q.explanation}`,
      sourceLesson: q.minLesson,
      difficulty: q.difficulty,
    });
  });
  
  return questions;
}

// ==================== 聆聽題目生成器 ====================

// 聆聽題目額外數據（用於組件顯示對話）
export interface ListeningQuestionData {
  dialogue: Array<{ speaker: string; text: string }>;
}

// 存儲聆聽題目的額外數據
export const listeningQuestionData: Map<string, ListeningQuestionData> = new Map();

function generateListeningQuestions(lessons: N5Lesson[], upToLesson: number): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  
  // 獲取合適的聆聽對話
  const availableDialogues = getListeningDialogues(upToLesson);
  
  if (availableDialogues.length === 0) {
    // 如果沒有對話，回退到舊的詞彙題（但隱藏日文）
    return generateFallbackListeningQuestions(lessons, upToLesson);
  }
  
  // 隨機選擇最多8題
  const shuffled = [...availableDialogues]
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);
  
  shuffled.forEach((d, index) => {
    const questionId = `listen-dialogue-${d.id}`;
    
    // 存儲對話數據供組件使用
    listeningQuestionData.set(questionId, {
      dialogue: d.dialogue,
    });
    
    questions.push({
      id: questionId,
      section: 'listening',
      type: 'multiple-choice',
      question: d.question,
      options: d.options,
      correctAnswer: d.correctIndex,
      explanation: d.explanation,
      sourceLesson: d.lessonRange[0],
      difficulty: d.difficulty,
    });
  });
  
  return questions;
}

// 備用：舊的詞彙題（但唔顯示日文）
function generateFallbackListeningQuestions(lessons: N5Lesson[], upToLesson: number): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  const targetLessons = lessons.filter(l => l.lessonNum <= upToLesson);
  
  const allVocab: Array<{ vocab: N5Vocab; lessonNum: number; unitId: number }> = [];
  targetLessons.forEach(lesson => {
    lesson.units.forEach(unit => {
      unit.vocab.forEach(v => {
        allVocab.push({ vocab: v, lessonNum: lesson.lessonNum, unitId: unit.id });
      });
    });
  });
  
  if (allVocab.length < 4) return questions;
  
  const usedIndices = new Set<number>();
  let questionCount = 0;
  
  while (questionCount < 8 && usedIndices.size < allVocab.length) {
    const randomIndex = Math.floor(Math.random() * allVocab.length);
    if (usedIndices.has(randomIndex)) continue;
    usedIndices.add(randomIndex);
    
    const target = allVocab[randomIndex];
    const targetVocab = target.vocab;
    
    const otherVocabs = allVocab
      .filter((_, i) => i !== randomIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(v => v.vocab.meaning);
    
    const options = [...otherVocabs, targetVocab.meaning].sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(targetVocab.meaning);
    
    const questionId = `listen-fallback-${target.lessonNum}-${target.unitId}-${questionCount}`;
    
    // 存儲詞彙供組件播放
    listeningQuestionData.set(questionId, {
      dialogue: [{ speaker: '音声', text: targetVocab.hiragana }],
    });
    
    questions.push({
      id: questionId,
      section: 'listening',
      type: 'multiple-choice',
      question: '請聽以下詞彙，選擇正確的意思：',
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
  
  // 只包含有題目的 section
  const sections: ExamSectionData[] = [];
  
  if (readingQuestions.length > 0) {
    sections.push({
      id: 'reading',
      title: '閱讀理解',
      titleJp: '読解',
      description: '閱讀詞彙並回答問題，測試你對日文詞彙的理解。',
      timeLimit: 10 + (lessonNum * 2),
      questionCount: readingQuestions.length,
      questions: readingQuestions,
    });
  }
  
  if (languageQuestions.length > 0) {
    sections.push({
      id: 'language',
      title: '語文運用',
      titleJp: '文法・語彙',
      description: '測試助詞使用和句子結構。',
      timeLimit: 12 + (lessonNum * 2),
      questionCount: languageQuestions.length,
      questions: languageQuestions,
    });
  }
  
  if (listeningQuestions.length > 0) {
    sections.push({
      id: 'listening',
      title: '聆聽理解',
      titleJp: '聴解',
      description: '聆聽詞彙，選擇正確意思。',
      timeLimit: 8 + lessonNum,
      questionCount: listeningQuestions.length,
      questions: listeningQuestions,
    });
  }
  
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
    sections,
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
