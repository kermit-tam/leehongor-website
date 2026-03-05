/**
 * 測驗頁面
 * Quiz Page
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { LessonService, QuizService, UserService } from '@/lib/firestore';
import { QuizContainer, QuizResultCard } from '@/components/ui/quiz';
import { Button } from '@/components/ui/button';
import { AbilityScoresGrid } from '@/components/charts/radar-chart';
import type { Lesson, QuizScores, NewBestRecord } from '@/types';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;
  
  const { user } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 測驗狀態
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    scores: QuizScores;
    newBests: NewBestRecord;
    expEarned: number;
    isPassed: boolean;
    unlockedNextLesson: boolean;
  } | null>(null);

  // 加載課程數據
  useEffect(() => {
    const loadLesson = async () => {
      try {
        setIsLoading(true);
        
        const fetchedLesson = await LessonService.getLesson(lessonId);
        if (!fetchedLesson) {
          setError('課程不存在');
          return;
        }
        
        setLesson(fetchedLesson);
        
        // 檢查是否已解鎖
        if (user) {
          const userData = await UserService.getUser(user.uid);
          if (userData) {
            const unlocked = LessonService.isLessonUnlocked(
              fetchedLesson,
              userData.completedLessons
            );
            if (!unlocked && !userData.unlockedLessons.includes(lessonId)) {
              setError('此課程尚未解鎖');
            }
          }
        } else {
          // 未登入用戶只能做 lesson-0
          if (fetchedLesson.unlockRequirement !== null) {
            setError('請先登入');
          }
        }
      } catch (err) {
        setError('無法加載測驗');
      } finally {
        setIsLoading(false);
      }
    };

    if (lessonId) {
      loadLesson();
    }
  }, [lessonId, user]);

  // 處理測驗提交
  const handleQuizSubmit = useCallback(async (
    answers: { questionId: string; selected: number; correct: boolean }[]
  ) => {
    if (!lesson || !user) return;

    try {
      setIsSubmitting(true);

      // 計算分數
      const questionData = lesson.quiz.questions.map(q => ({
        dimension: q.dimension,
        correct: q.correct,
      }));
      
      const { scores } = QuizService.calculateScores(questionData, answers);

      // 提交結果
      const result = await QuizService.submitQuiz(
        user.uid,
        lesson.id,
        scores,
        answers
      );

      setQuizResult({
        scores,
        newBests: result.isNewBest,
        expEarned: result.achievementExpEarned,
        isPassed: scores.overall >= lesson.quiz.passScore,
        unlockedNextLesson: result.unlockedNextLesson,
      });
      
      setQuizCompleted(true);
    } catch (err) {
      alert('提交測驗時出錯，請重試');
    } finally {
      setIsSubmitting(false);
    }
  }, [lesson, user]);

  // 重新測驗
  const handleRetry = useCallback(() => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setQuizResult(null);
  }, []);

  // 繼續學習
  const handleContinue = useCallback(() => {
    if (quizResult?.unlockedNextLesson) {
      router.push('/learn');
    } else {
      router.push(`/learn/${lessonId}`);
    }
  }, [quizResult, router, lessonId]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-64 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {error || '課程不存在'}
        </h1>
        <Link href="/learn">
          <Button>返回學習區</Button>
        </Link>
      </div>
    );
  }

  // 顯示結果
  if (quizCompleted && quizResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* 返回按鈕 */}
        <Link
          href={`/learn/${lessonId}`}
          className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回課程
        </Link>

        <QuizResultCard
          score={quizResult.scores.overall}
          totalScore={100}
          expEarned={quizResult.expEarned}
          newBests={quizResult.newBests}
          isPassed={quizResult.isPassed}
          unlockedNextLesson={quizResult.unlockedNextLesson}
          onRetry={handleRetry}
          onContinue={handleContinue}
        />

        {/* 能力分數更新 */}
        {Object.keys(quizResult.newBests).length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">🎉 新紀錄！</h2>
            <AbilityScoresGrid
              abilityScores={{
                pronunciation: { best: quizResult.scores.pronunciation || 0, attempts: 1 },
                kanji: { best: quizResult.scores.kanji || 0, attempts: 1 },
                vocabulary: { best: quizResult.scores.vocabulary || 0, attempts: 1 },
                grammar: { best: quizResult.scores.grammar || 0, attempts: 1 },
                listening: { best: quizResult.scores.listening || 0, attempts: 1 },
                application: { best: quizResult.scores.application || 0, attempts: 1 },
              }}
              newBests={quizResult.newBests}
            />
          </div>
        )}
      </div>
    );
  }

  // 顯示測驗
  if (quizStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* 返回按鈕 */}
        <button
          onClick={() => setQuizStarted(false)}
          className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          退出測驗
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{lesson.title} - 測驗</h1>
          <p className="text-gray-500">共 {lesson.quiz.questions.length} 題 · 及格分數：{lesson.quiz.passScore}分</p>
        </div>

        <QuizContainer
          questions={lesson.quiz.questions}
          expReward={lesson.quiz.expReward}
          passScore={lesson.quiz.passScore}
          onSubmit={handleQuizSubmit}
        />
      </div>
    );
  }

  // 顯示開始頁面
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* 返回按鈕 */}
      <Link
        href={`/learn/${lessonId}`}
        className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回課程
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="text-6xl mb-6">📝</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
        <p className="text-gray-600 mb-8">課程測驗</p>

        <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-indigo-600">{lesson.quiz.questions.length}</div>
            <div className="text-sm text-gray-500">題目</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-600">{lesson.quiz.passScore}</div>
            <div className="text-sm text-gray-500">及格分</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-amber-600">+{lesson.quiz.expReward}</div>
            <div className="text-sm text-gray-500">經驗值</div>
          </div>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <Button onClick={() => setQuizStarted(true)} size="xl" fullWidth>
            開始測驗
          </Button>
          <Link href={`/learn/${lessonId}`}>
            <Button variant="outline" fullWidth>
              返回複習
            </Button>
          </Link>
        </div>

        {/* 提示 */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl text-sm text-blue-700">
          <div className="flex items-start">
            <span className="mr-2">💡</span>
            <div>
              <strong>提示：</strong>
              每題都會計入你的六角雷達分數，答對越多，實力評估越準確。
              及格後會解鎖下一課！
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
