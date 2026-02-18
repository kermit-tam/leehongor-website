/**
 * 圖片選擇遊戲組件
 * Visual Quiz Game Component
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { VisualQuizQuestion } from '../game-data';

interface VisualQuizGameProps {
  question: VisualQuizQuestion;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export function VisualQuizGame({ question, onAnswer, answered }: VisualQuizGameProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelectedOption(option);
    onAnswer(option === question.correctAnswer);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 標題 */}
      <div className="text-lg font-medium text-[#4A4A4A] mb-6">
        圖片選擇 <span className="text-sm text-[#8C8C8C]">揀啱嘅平假名</span>
      </div>

      {/* 圖片顯示 */}
      <div className="flex justify-center mb-8">
        <motion.div
          className="w-32 h-32 bg-white rounded-2xl border-2 border-[#C4B9AC] flex items-center justify-center text-6xl shadow-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {question.emoji}
        </motion.div>
      </div>

      {/* 選項 */}
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === question.correctAnswer;
          
          let buttonClass = 'bg-white border-[#E5E5E5] text-[#4A4A4A] hover:border-[#C4B9AC]';
          if (answered) {
            if (isCorrect) {
              buttonClass = 'bg-[#A8B5A0]/20 border-[#A8B5A0] text-[#4A4A4A]';
            } else if (isSelected && !isCorrect) {
              buttonClass = 'bg-[#B8A8A0]/20 border-[#B8A8A0] text-[#4A4A4A]';
            } else {
              buttonClass = 'bg-white border-[#E5E5E5] text-[#8C8C8C]';
            }
          } else if (isSelected) {
            buttonClass = 'bg-[#E0D5C7] border-[#C4B9AC] text-[#4A4A4A]';
          }

          return (
            <motion.button
              key={index}
              onClick={() => handleSelect(option)}
              disabled={answered}
              className={`p-5 rounded-lg border-2 transition-all text-center ${buttonClass}`}
              whileTap={{ scale: answered ? 1 : 0.95 }}
            >
              <span className="text-xl font-medium">{option}</span>
              {answered && isCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2 text-[#A8B5A0] font-medium"
                >
                  ✓ 正確
                </motion.div>
              )}
              {answered && isSelected && !isCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2 text-[#B8A8A0] font-medium"
                >
                  ✗ 錯誤
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
