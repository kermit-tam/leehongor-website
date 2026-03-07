/**
 * 閱讀理解組件
 * Reading Comprehension Component
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReadingPassage, ReadingQuestion, ReadingResult, QUESTION_TYPE_LABELS } from './types';
import { triggerConfetti } from '../../lesson-5/components/game-feedback';

interface ReadingComprehensionProps {
  passage: ReadingPassage;
  onComplete: (result: ReadingResult) => void;
  onExit: () => void;
  showCantonese?: boolean;
}

export function ReadingComprehension({ 
  passage, 
  onComplete, 
  onExit,
  showCantonese = true 
}: ReadingComprehensionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<ReadingResult['answers']>([]);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  
  // 使用 useEffect 設置開始時間，避免在 render 中調用 Date.now()
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTime(Date.now());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const currentQuestion = passage.questions[currentIndex];
  const isLastQuestion = currentIndex === passage.questions.length - 1;

  const handleSelect = useCallback((index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
  }, [answered]);

  const handleConfirm = useCallback(() => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctIndex;
    
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedIndex: selectedAnswer,
      correct: isCorrect,
    }]);

    setAnswered(true);

    if (isCorrect) {
      triggerConfetti();
    }
  }, [selectedAnswer, currentQuestion]);

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      // 完成測驗
      const result: ReadingResult = {
        passageId: passage.id,
        correctCount: answers.filter(a => a.correct).length + (selectedAnswer === currentQuestion.correctIndex ? 1 : 0),
        totalQuestions: passage.questions.length,
        answers: [...answers, {
          questionId: currentQuestion.id,
          selectedIndex: selectedAnswer!,
          correct: selectedAnswer === currentQuestion.correctIndex,
        }],
        timeSpent: Math.floor((Date.now() - startTime) / 1000),
        completedAt: new Date(),
      };
      setShowResult(true);
      onComplete(result);
    } else {
      // 下一題
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  }, [isLastQuestion, passage, answers, selectedAnswer, currentQuestion, startTime, onComplete]);

  // 顯示結果頁面
  if (showResult) {
    const correctCount = answers.filter(a => a.correct).length;
    const percentage = Math.round((correctCount / passage.questions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-6xl mb-4"
        >
          {percentage >= 60 ? '🎉' : '💪'}
        </motion.div>
        <h2 className="text-2xl font-bold text-[#4A4A4A] mb-2">
          {percentage >= 60 ? '閱讀測驗完成！' : '再試一次！'}
        </h2>
        <div className="bg-white rounded-xl p-6 border border-[#E5E5E5] mb-6">
          <div className="text-5xl font-bold text-[#A8B5A0] mb-2">{percentage}%</div>
          <div className="text-[#8C8C8C]">正確率</div>
        </div>
        <div className="bg-[#F5F5F0] rounded-lg p-4 mb-6">
          <div className="text-xl font-bold text-[#4A4A4A]">{correctCount}/{passage.questions.length}</div>
          <div className="text-sm text-[#8C8C8C]">答對題數</div>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onExit}
            className="px-6 py-2 bg-[#8C8C8C] text-white rounded-lg hover:bg-[#6B6B6B] transition-colors"
          >
            返回
          </button>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSelectedAnswer(null);
              setAnswered(false);
              setAnswers([]);
              setShowResult(false);
            }}
            className="px-6 py-2 bg-[#C4B9AC] text-white rounded-lg hover:bg-[#A09088] transition-colors"
          >
            再試一次
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* 頂部導航 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onExit}
          className="flex items-center gap-2 text-[#8C8C8C] hover:text-[#4A4A4A] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          退出
        </button>
        <div className="text-sm text-[#8C8C8C]">
          {currentIndex + 1} / {passage.questions.length}
        </div>
      </div>

      {/* 進度條 */}
      <div className="w-full h-2 bg-[#E5E5E5] rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-[#A8B5A0]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / passage.questions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* 文章區域 */}
      <div className="bg-white rounded-xl p-6 border border-[#E5E5E5] mb-6">
        <h3 className="text-lg font-bold text-[#4A4A4A] mb-4">{passage.title}</h3>
        <div className="space-y-4">
          <p className="text-xl text-[#4A4A4A] leading-relaxed">{passage.japanese}</p>
          {showCantonese && (
            <p className="text-[#8C8C8C] border-t border-[#E5E5E5] pt-3">{passage.cantonese}</p>
          )}
        </div>
      </div>

      {/* 題目區域 */}
      <div className="bg-white rounded-xl p-6 border border-[#E5E5E5]">
        {/* 題型標籤 */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-1 rounded text-xs font-medium ${QUESTION_TYPE_LABELS[currentQuestion.type].color}`}>
            {QUESTION_TYPE_LABELS[currentQuestion.type].label}
          </span>
          <span className="text-xs text-[#8C8C8C]">
            第 {currentIndex + 1} 題
          </span>
        </div>

        {/* 問題 */}
        <h4 className="text-lg font-medium text-[#4A4A4A] mb-4">{currentQuestion.question}</h4>

        {/* 選項 */}
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={answered}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                answered
                  ? index === currentQuestion.correctIndex
                    ? 'bg-[#A8B5A0]/20 border-[#A8B5A0]'
                    : index === selectedAnswer
                    ? 'bg-red-50 border-red-300'
                    : 'bg-white border-[#E5E5E5] opacity-50'
                  : index === selectedAnswer
                  ? 'bg-[#C4B9AC]/20 border-[#C4B9AC]'
                  : 'bg-white border-[#E5E5E5] hover:border-[#C4B9AC]'
              }`}
              whileTap={!answered ? { scale: 0.98 } : {}}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
              {answered && index === currentQuestion.correctIndex && (
                <span className="ml-2 text-[#A8B5A0]">✓</span>
              )}
              {answered && index === selectedAnswer && index !== currentQuestion.correctIndex && (
                <span className="ml-2 text-red-500">✗</span>
              )}
            </motion.button>
          ))}
        </div>

        {/* 解答說明 */}
        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-[#F5F5F0] rounded-lg"
            >
              <p className="text-sm text-[#4A4A4A]">
                <span className="font-medium">解答：</span>
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 按 */}
        <div className="mt-6 flex justify-end">
          {!answered ? (
            <button
              onClick={handleConfirm}
              disabled={selectedAnswer === null}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedAnswer !== null
                  ? 'bg-[#C4B9AC] text-white hover:bg-[#A09088]'
                  : 'bg-[#E5E5E5] text-[#8C8C8C] cursor-not-allowed'
              }`}
            >
              確認答案
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-[#A8B5A0] text-white rounded-lg hover:bg-[#8B9A7E] transition-colors"
            >
              {isLastQuestion ? '完成測驗' : '下一題'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
