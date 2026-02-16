/**
 * 測驗組件
 * Quiz Components
 */

'use client';

import { useState, useCallback } from 'react';
import { Button } from './button';
import type { QuizQuestion, QuizDimension } from '@/types';
import { DIMENSION_LABELS, DIMENSION_COLORS } from '../charts/radar-chart';

// ==================== 測驗問題組件 ====================

interface QuizQuestionProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  showResult?: boolean;
}

export function QuizQuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  showResult = false,
}: QuizQuestionProps) {
  const dimensionLabel = DIMENSION_LABELS[question.dimension];
  const dimensionColor = DIMENSION_COLORS[question.dimension];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* 進度條 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>問題 {questionNumber} / {totalQuestions}</span>
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${dimensionColor}20`,
              color: dimensionColor,
            }}
          >
            {dimensionLabel}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${(questionNumber / totalQuestions) * 100}%`,
              backgroundColor: dimensionColor,
            }}
          />
        </div>
      </div>

      {/* 問題圖片（如果有） */}
      {question.imageUrl && (
        <div className="mb-6 relative aspect-video rounded-xl overflow-hidden bg-gray-100">
          <img
            src={question.imageUrl}
            alt="問題圖片"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* 問題 */}
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {question.question}
      </h3>

      {/* 選項 */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correct;
          
          // 樣式決定
          let buttonStyles = 'border-2 bg-white hover:bg-gray-50';
          
          if (showResult) {
            if (isCorrect) {
              buttonStyles = 'border-emerald-500 bg-emerald-50 text-emerald-700';
            } else if (isSelected && !isCorrect) {
              buttonStyles = 'border-red-500 bg-red-50 text-red-700';
            } else {
              buttonStyles = 'border-gray-200 bg-white opacity-50';
            }
          } else if (isSelected) {
            buttonStyles = 'border-indigo-500 bg-indigo-50 text-indigo-700';
          } else {
            buttonStyles = 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50';
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && onSelectAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl text-left font-medium transition-all ${buttonStyles}`}
            >
              <div className="flex items-center">
                {/* 選項標記 */}
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mr-4 ${
                    showResult
                      ? isCorrect
                        ? 'bg-emerald-500 text-white'
                        : isSelected
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                      : isSelected
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {showResult ? (
                    isCorrect ? '✓' : isSelected ? '✗' : String.fromCharCode(65 + index)
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                <span>{option}</span>
                
                {/* 結果標記 */}
                {showResult && isCorrect && (
                  <span className="ml-auto text-emerald-500 text-xl">✓</span>
                )}
                {showResult && isSelected && !isCorrect && (
                  <span className="ml-auto text-red-500 text-xl">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 解釋（顯示結果時） */}
      {showResult && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-start">
            <span className="text-xl mr-2">💡</span>
            <div>
              <div className="font-medium text-blue-900 mb-1">解釋</div>
              <div className="text-blue-800">{question.explanation}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== 測驗結果組件 ====================

interface QuizResultProps {
  score: number;
  totalScore: number;
  expEarned: number;
  newBests: Record<string, boolean>;
  isPassed: boolean;
  unlockedNextLesson: boolean;
  onRetry: () => void;
  onContinue: () => void;
}

export function QuizResultCard({
  score,
  totalScore,
  expEarned,
  newBests,
  isPassed,
  unlockedNextLesson,
  onRetry,
  onContinue,
}: QuizResultProps) {
  const percentage = Math.round((score / totalScore) * 100);
  
  // 評語
  let message = '';
  let emoji = '';
  if (percentage >= 90) {
    message = '太棒了！完美的表現！';
    emoji = '🌟';
  } else if (percentage >= 80) {
    message = '非常好！繼續保持！';
    emoji = '👏';
  } else if (percentage >= 60) {
    message = '及格了！再加油！';
    emoji = '👍';
  } else {
    message = '繼續努力，下次會更好！';
    emoji = '💪';
  }

  const newBestsCount = Object.values(newBests).filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
      {/* 表情符號 */}
      <div className="text-6xl mb-4">{emoji}</div>
      
      {/* 分數 */}
      <div className="mb-4">
        <div className="text-5xl font-bold text-gray-900 mb-2">
          {score}/{totalScore}
        </div>
        <div className={`text-2xl font-bold ${isPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
          {percentage}%
        </div>
      </div>

      {/* 評語 */}
      <div className="text-lg text-gray-600 mb-6">{message}</div>

      {/* 通過/未通過標記 */}
      <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold mb-6 ${
        isPassed
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-amber-100 text-amber-700'
      }`}>
        {isPassed ? '✓ 測驗通過' : '✗ 未通過（需60%）'}
      </div>

      {/* 獎勵 */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-center space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">+{expEarned}</div>
            <div className="text-sm text-gray-600">經驗值</div>
          </div>
          {newBestsCount > 0 && (
            <>
              <div className="w-px h-12 bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{newBestsCount}</div>
                <div className="text-sm text-gray-600">新紀錄</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 解鎖下一課提示 */}
      {unlockedNextLesson && (
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
          <div className="flex items-center justify-center">
            <span className="text-2xl mr-2">🎉</span>
            <span className="font-medium text-yellow-800">
              恭喜！已解鎖下一課！
            </span>
          </div>
        </div>
      )}

      {/* 操作按鈕 */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {!isPassed && (
          <Button onClick={onRetry} variant="outline" size="lg">
            重新測驗
          </Button>
        )}
        <Button onClick={onContinue} variant="primary" size="lg">
          {isPassed ? '繼續學習' : '返回課程'}
        </Button>
      </div>
    </div>
  );
}

// ==================== 測驗容器組件 ====================

interface QuizContainerProps {
  questions: QuizQuestion[];
  expReward: number;
  passScore: number;
  onSubmit: (answers: { questionId: string; selected: number; correct: boolean }[]) => void;
}

export function QuizContainer({
  questions,
  expReward,
  passScore,
  onSubmit,
}: QuizContainerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id] ?? null;

  const handleSelectAnswer = useCallback((index: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: index,
    }));
  }, [currentQuestion.id]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowResult(false);
    } else {
      // 完成測驗
      const finalAnswers = questions.map(q => ({
        questionId: q.id,
        selected: answers[q.id] ?? -1,
        correct: answers[q.id] === q.correct,
      }));
      onSubmit(finalAnswers);
      setIsCompleted(true);
    }
  }, [currentQuestionIndex, questions, answers, onSubmit]);

  const handleShowResult = useCallback(() => {
    setShowResult(true);
  }, []);

  if (isCompleted) {
    return null; // 由父組件顯示結果
  }

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnswered = selectedAnswer !== null;

  return (
    <div className="max-w-2xl mx-auto">
      <QuizQuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        showResult={showResult}
      />

      {/* 導航按鈕 */}
      <div className="mt-6 flex justify-between">
        {currentQuestionIndex > 0 && (
          <Button
            variant="ghost"
            onClick={() => {
              setCurrentQuestionIndex(prev => prev - 1);
              setShowResult(false);
            }}
          >
            ← 上一題
          </Button>
        )}
        
        <div className="ml-auto">
          {!showResult ? (
            <Button
              onClick={handleShowResult}
              disabled={!hasAnswered}
              size="lg"
            >
              確認答案
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg">
              {isLastQuestion ? '完成測驗' : '下一題 →'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
