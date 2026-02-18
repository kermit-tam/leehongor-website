/**
 * 填空選擇遊戲組件
 * Cloze Game Component
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClozeQuestion } from '../game-data';

interface ClozeGameProps {
  question: ClozeQuestion;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export function ClozeGame({ question, onAnswer, answered }: ClozeGameProps) {
  const [selectedParticle, setSelectedParticle] = useState<string | null>(null);

  const handleSelect = (particle: string) => {
    if (answered) return;
    setSelectedParticle(particle);
    onAnswer(particle === question.correctParticle);
  };

  // 高亮填空位置
  const renderSentence = () => {
    const parts = question.sentence.split('＿＿');
    return (
      <div className="text-2xl font-medium text-[#4A4A4A] leading-relaxed">
        {parts[0]}
        <span className={`inline-block min-w-[3rem] text-center mx-1 pb-1 border-b-2 ${
          answered 
            ? selectedParticle === question.correctParticle
              ? 'border-[#A8B5A0] text-[#A8B5A0]'
              : 'border-[#B8A8A0] text-[#B8A8A0]'
            : selectedParticle
            ? 'border-[#C4B9AC] text-[#4A4A4A]'
            : 'border-[#C4B9AC] border-dashed'
        }`}>
          {selectedParticle || '？'}
        </span>
        {parts[1]}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 標題 */}
      <div className="text-lg font-medium text-[#4A4A4A] mb-6">
        助詞填空 <span className="text-sm text-[#8C8C8C]">選擇正確嘅助詞</span>
      </div>

      {/* 句子 */}
      <div className="bg-white border-2 border-[#C4B9AC] rounded-xl p-6 mb-4 text-center">
        {renderSentence()}
      </div>

      {/* 中文翻譯 */}
      <div className="text-center text-[#8C8C8C] mb-6">
        {question.translation}
      </div>

      {/* 選項 */}
      <div className="grid grid-cols-4 gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedParticle === option.particle;
          const isCorrect = option.particle === question.correctParticle;
          
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
              onClick={() => handleSelect(option.particle)}
              disabled={answered}
              className={`p-4 rounded-lg border-2 transition-all text-center ${buttonClass}`}
              whileTap={{ scale: answered ? 1 : 0.95 }}
            >
              <div className="text-2xl font-bold mb-1">{option.particle}</div>
              <div className="text-xs text-[#8C8C8C]">{option.meaning}</div>
              {answered && isCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2 text-[#A8B5A0] text-sm"
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* 解釋 */}
      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-[#F5F5F0] rounded-lg text-center"
        >
          <div className="text-[#4A4A4A]">
            正確答案：<span className="font-bold text-[#A8B5A0]">{question.correctParticle}</span>
          </div>
          <div className="text-sm text-[#8C8C8C] mt-1">
            {question.options.find(o => o.particle === question.correctParticle)?.meaning}
          </div>
        </motion.div>
      )}
    </div>
  );
}
