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
  type: 'multiple-choice' | 'fill-in-blank' | 'matching' | 'ordering';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  // 題目來源
  sourceLesson: number;
  sourceUnit?: number;
  // 難度
  difficulty: 1 | 2 | 3; // 1=簡單, 2=中等, 3=困難
}

export interface ExamSectionData {
  id: ExamSection;
  title: string;
  titleJp: string;
  description: string;
  timeLimit: number; // 分鐘
  questionCount: number;
  questions: ExamQuestion[];
}

export interface Exam {
  id: string;
  lessonNum: number;
  title: string;
  subtitle: string;
  totalTime: number; // 分鐘
  totalQuestions: number;
  passScore: number; // 及格分數
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
  answers: Record<string, string | number>;
  timeSpent: number; // 秒
}

// ==================== 題目生成器配置 ====================

interface QuestionTemplate {
  section: ExamSection;
  type: ExamQuestion['type'];
  generator: (lessons: N5Lesson[], lessonNum: number) => ExamQuestion[];
}

// ==================== 閱讀理解題目生成器 ====================

function generateReadingQuestions(lessons: N5Lesson[], upToLesson: number): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  const targetLessons = lessons.filter(l => l.lessonNum <= upToLesson);
  
  // 從課程內容生成閱讀理解題
  targetLessons.forEach(lesson => {
    lesson.units.forEach((unit, unitIndex) => {
      // 簡單理解題：根據單元標題和內容
      if (unit.vocab.length > 0) {
        const vocab = unit.vocab.slice(0, 4);
        const correctIndex = Math.floor(Math.random() * vocab.length);
        const correctVocab = vocab[correctIndex];
        
        questions.push({
          id: `read-${lesson.lessonNum}-${unit.id}-1`,
          section: 'reading',
          type: 'multiple-choice',
          question: `「${unit.title}」這個單元主要學習什麼內容？`,
          options: vocab.map(v => v.meaning),
          correctAnswer: correctIndex,
          explanation: `正確答案是「${correctVocab.meaning}」。這個單元學習了「${unit.subtitle}」。`,
          sourceLesson: lesson.lessonNum,
          sourceUnit: unit.id,
          difficulty: 1,
        });
      }
      
      // 詞彙理解題
      if (unit.vocab.length >= 4) {
        const shuffled = [...unit.vocab].sort(() => Math.random() - 0.5);
        const targetVocab = shuffled[0];
        const options = shuffled.slice(0, 4).map(v => v.meaning);
        
        questions.push({
          id: `read-${lesson.lessonNum}-${unit.id}-2`,
          section: 'reading',
          type: 'multiple-choice',
          question: `「${targetVocab.hiragana}」${targetVocab.kanji ? `（${targetVocab.kanji}）` : ''}的意思是什麼？`,
          options,
          correctAnswer: options.indexOf(targetVocab.meaning),
          explanation: `「${targetVocab.hiragana}」的意思是「${targetVocab.meaning}」。`,
          sourceLesson: lesson.lessonNum,
          sourceUnit: unit.id,
          difficulty: targetVocab.note ? 2 : 1,
        });
      }
    });
  });
  
  return questions.slice(0, 10); // 閱讀理解最多10題
}

// ==================== 語文運用題目生成器 ====================

function generateLanguageQuestions(lessons: N5Lesson[], upToLesson: number): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  const targetLessons = lessons.filter(l => l.lessonNum <= upToLesson);
  
  targetLessons.forEach(lesson => {
    // 根據課程內容生成文法題
    lesson.units.forEach((unit, unitIndex) => {
      // 助詞填空題
      if (upToLesson >= 1) {
        const particleQuestions: Array<{sentence: string, answer: string, meaning: string, difficulty: 1 | 2 | 3}> = [
          { 
            sentence: 'わたし＿＿がくせいです。', 
            answer: 'は', 
            meaning: '我是學生。',
            difficulty: 1
          },
          { 
            sentence: 'これ＿＿ほんです。', 
            answer: 'は', 
            meaning: '這是書。',
            difficulty: 1
          },
          { 
            sentence: 'ここ＿＿きょうしつです。', 
            answer: 'は', 
            meaning: '這裡是教室。',
            difficulty: 1
          },
        ];
        
        if (upToLesson >= 4) {
          particleQuestions.push(
            { 
              sentence: 'わたしはろくじ＿＿おきます。', 
              answer: 'に', 
              meaning: '我六點起床。',
              difficulty: 2
            },
            { 
              sentence: 'くじ＿＿はたらきます。', 
              answer: 'から', 
              meaning: '從九點開始工作。',
              difficulty: 2
            }
          );
        }
        
        const pq = particleQuestions[Math.floor(Math.random() * particleQuestions.length)];
        questions.push({
          id: `lang-${lesson.lessonNum}-${unit.id}-particle`,
          section: 'language',
          type: 'fill-in-blank',
          question: `請填入正確的助詞：\n${pq.sentence}\n（${pq.meaning}）`,
          options: ['は', 'が', 'を', 'に', 'で', 'から', 'まで'],
          correctAnswer: pq.answer,
          explanation: `正確答案是「${pq.answer}」。`,
          sourceLesson: lesson.lessonNum,
          sourceUnit: unit.id,
          difficulty: pq.difficulty,
        });
      }
      
      // 詞彙配對題
      if (unit.vocab.length >= 4) {
        const shuffled = [...unit.vocab].sort(() => Math.random() - 0.5).slice(0, 4);
        
        questions.push({
          id: `lang-${lesson.lessonNum}-${unit.id}-match`,
          section: 'language',
          type: 'matching',
          question: '請將下列日文詞彙與正確的中文意思配對：',
          options: shuffled.map(v => `${v.hiragana} = ${v.meaning}`),
          correctAnswer: 0, // 這裡簡化處理，實際應該有配對邏輯
          explanation: shuffled.map(v => `「${v.hiragana}」=「${v.meaning}」`).join('，'),
          sourceLesson: lesson.lessonNum,
          sourceUnit: unit.id,
          difficulty: 2,
        });
      }
    });
  });
  
  return questions.slice(0, 12); // 語文運用最多12題
}

// ==================== 聆聽題目生成器 ====================

function generateListeningQuestions(lessons: N5Lesson[], upToLesson: number): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  const targetLessons = lessons.filter(l => l.lessonNum <= upToLesson);
  
  targetLessons.forEach(lesson => {
    lesson.units.forEach((unit, unitIndex) => {
      // 詞彙聽力題（顯示日文，選中文意思）
      if (unit.vocab.length >= 4) {
        const targetVocab = unit.vocab[Math.floor(Math.random() * unit.vocab.length)];
        const options = unit.vocab
          .filter(v => v.hiragana !== targetVocab.hiragana)
          .slice(0, 3)
          .map(v => v.meaning);
        options.push(targetVocab.meaning);
        
        // 打亂選項
        const shuffledOptions = options.sort(() => Math.random() - 0.5);
        
        questions.push({
          id: `listen-${lesson.lessonNum}-${unit.id}-1`,
          section: 'listening',
          type: 'multiple-choice',
          question: `請聽以下詞彙，選擇正確的意思：\n🔊 ${targetVocab.hiragana}${targetVocab.kanji ? `（${targetVocab.kanji}）` : ''}`,
          options: shuffledOptions,
          correctAnswer: shuffledOptions.indexOf(targetVocab.meaning),
          explanation: `「${targetVocab.hiragana}」的意思是「${targetVocab.meaning}」。廣東話諧音：${targetVocab.cantonese || '無'}`,
          sourceLesson: lesson.lessonNum,
          sourceUnit: unit.id,
          difficulty: 1,
        });
      }
      
      // 簡單對話理解題
      if (unitIndex % 2 === 0) {
        const commonPhrases = [
          { phrase: 'はじめまして', meaning: '初次見面', lesson: 1 },
          { phrase: 'ありがとうございます', meaning: '謝謝', lesson: 1 },
          { phrase: 'すみません', meaning: '對不起', lesson: 3 },
          { phrase: 'いくらですか', meaning: '多少錢', lesson: 3 },
          { phrase: 'これはなんですか', meaning: '這是什麼', lesson: 2 },
        ];
        
        const phrase = commonPhrases.find(p => p.lesson <= upToLesson) || commonPhrases[0];
        
        questions.push({
          id: `listen-${lesson.lessonNum}-${unit.id}-2`,
          section: 'listening',
          type: 'multiple-choice',
          question: `聽到「${phrase.phrase}」時，應該如何回應？`,
          options: [
            phrase.meaning,
            '再見',
            '你好',
            '不好意思'
          ],
          correctAnswer: 0,
          explanation: `「${phrase.phrase}」的意思是「${phrase.meaning}」。`,
          sourceLesson: lesson.lessonNum,
          sourceUnit: unit.id,
          difficulty: 2,
        });
      }
    });
  });
  
  return questions.slice(0, 8); // 聆聽最多8題
}

// ==================== 考試生成器 ====================

export function generateExam(lessons: N5Lesson[], lessonNum: number): Exam {
  const readingQuestions = generateReadingQuestions(lessons, lessonNum);
  const languageQuestions = generateLanguageQuestions(lessons, lessonNum);
  const listeningQuestions = generateListeningQuestions(lessons, lessonNum);
  
  const totalQuestions = readingQuestions.length + languageQuestions.length + listeningQuestions.length;
  const maxScore = totalQuestions * 10; // 每題10分
  const passScore = Math.floor(maxScore * 0.6); // 60%及格
  
  return {
    id: `exam-n5-lesson-${lessonNum}`,
    lessonNum,
    title: `第${lessonNum}課 綜合考試`,
    subtitle: `包含第1至${lessonNum}課所有內容`,
    totalTime: 30 + (lessonNum * 5), // 基礎30分鐘，每課增加5分鐘
    totalQuestions,
    passScore,
    sections: [
      {
        id: 'reading',
        title: '閱讀理解',
        titleJp: '読解',
        description: '閱讀短文並回答問題，測試你對詞彙和語法的理解。',
        timeLimit: 10 + (lessonNum * 2),
        questionCount: readingQuestions.length,
        questions: readingQuestions,
      },
      {
        id: 'language',
        title: '語文運用',
        titleJp: '文法・語彙',
        description: '測試助詞使用、詞彙配對和句子結構。',
        timeLimit: 12 + (lessonNum * 2),
        questionCount: languageQuestions.length,
        questions: languageQuestions,
      },
      {
        id: 'listening',
        title: '聆聽理解',
        titleJp: '聴解',
        description: '聽取詞彙和簡單對話，選擇正確答案。',
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
  answers: Record<string, string | number>
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
        sectionScores[section.id].score += 10; // 每題10分
      }
    });
  });
  
  const totalScore = Object.values(sectionScores).reduce((sum, s) => sum + s.score, 0);
  const maxScore = exam.totalQuestions * 10;
  const percentage = Math.round((totalScore / maxScore) * 100);
  
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
