/**
 * 真假快打遊戲組件
 * True/False Game Component
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrueFalseQuestion } from '../game-data';

interface TrueFalseGameProps {
  question: TrueFalseQuestion;
  onComplete: (correct: boolean, timeLeft: number) => void;
}

const TIME_LIMIT = 10; // 10秒限制

export function TrueFalseGame({ question, onComplete }: TrueFalseGameProps) {
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // 倒計時
  useEffect(() => {
    if (isAnswered) return;
    
    if (timeLeft <= 0) {
      // 使用 setTimeout 避免同步調用 setState
      const timeoutId = setTimeout(() => {
        setIsAnswered(true);
        onComplete(false, 0);
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, onComplete]);

  const handleAnswer = (answer: boolean) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    const isCorrect = answer === question.isTrue;
    onComplete(isCorrect, timeLeft);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 計時器 */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-medium text-[#4A4A4A]">
          真假快打 <span className="text-sm text-[#8C8C8C]">限時{TIME_LIMIT}秒！</span>
        </div>
        <div className={`text-2xl font-bold ${timeLeft <= 2 ? 'text-red-500 animate-pulse' : 'text-[#4A4A4A]'}`}>
          {timeLeft}s
        </div>
      </div>

      {/* 進度條 */}
      <div className="w-full h-3 bg-[#E5E5E5] rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#A8B5A0] to-[#C4B9AC]"
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* 句子 */}
      <div className="bg-white border-2 border-[#C4B9AC] rounded-xl p-6 mb-4 text-center">
        <div className="text-2xl font-medium text-[#4A4A4A] mb-3">{question.sentence}</div>
        <div className="text-[#8C8C8C]">{question.translation}</div>
      </div>

      {/* 答案按鈕 */}
      {!isAnswered ? (
        <div className="grid grid-cols-2 gap-4 mt-8">
          <motion.button
            onClick={() => handleAnswer(true)}
            className="p-6 rounded-xl bg-[#A8B5A0] text-white font-bold text-xl hover:bg-[#8FA088] transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            ✓ 對
          </motion.button>
          <motion.button
            onClick={() => handleAnswer(false)}
            className="p-6 rounded-xl bg-[#B8A8A0] text-white font-bold text-xl hover:bg-[#A09088] transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            ✗ 錯
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-5 rounded-xl text-center ${
            selectedAnswer === question.isTrue 
              ? 'bg-[#A8B5A0]/20 border-2 border-[#A8B5A0]' 
              : 'bg-[#B8A8A0]/20 border-2 border-[#B8A8A0]'
          }`}
        >
          <div className="text-3xl mb-2">
            {selectedAnswer === question.isTrue ? '🎉' : '💭'}
          </div>
          <div className="font-medium text-[#4A4A4A] mb-2">
            {selectedAnswer === question.isTrue ? '答對了！' : '答錯了'}
          </div>
          <div className="text-sm text-[#8C8C8C]">{question.explanation}</div>
        </motion.div>
      )}
    </div>
  );
}
