/**
 * 聽音選擇遊戲組件
 * Audio Select Game Component
 */

'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AudioSelectQuestion } from '../game-data';

interface AudioSelectGameProps {
  question: AudioSelectQuestion;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export function AudioSelectGame({ question, onAnswer, answered }: AudioSelectGameProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      alert('你的瀏覽器唔支援語音播放');
      return;
    }

    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(question.audioText);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    utterance.pitch = 1;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => {
      setIsPlaying(false);
      console.error('語音播放失敗');
    };

    window.speechSynthesis.speak(utterance);
  }, [question.audioText]);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelectedOption(option);
    onAnswer(option === question.correctAnswer);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 標題 */}
      <div className="text-lg font-medium text-[#4A4A4A] mb-6">
        聽音選擇 <span className="text-sm text-[#8C8C8C]">聽一聽，揀啱嘅意思</span>
      </div>

      {/* 播放按鈕 */}
      <div className="flex justify-center mb-8">
        <motion.button
          onClick={playAudio}
          disabled={isPlaying}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all
            ${isPlaying 
              ? 'bg-[#A8B5A0] text-white' 
              : 'bg-white border-2 border-[#C4B9AC] text-[#4A4A4A] hover:bg-[#E0D5C7]'
            }`}
          whileTap={{ scale: 0.95 }}
          animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
        >
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
            {isPlaying ? (
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            )}
          </svg>
        </motion.button>
      </div>

      {/* 提示文字 */}
      <div className="text-center text-[#8C8C8C] mb-6">
        {isPlaying ? '播放中...' : '點擊喇叭播放'}
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
              className={`p-4 rounded-lg border-2 transition-all text-center ${buttonClass}`}
              whileTap={{ scale: answered ? 1 : 0.95 }}
            >
              <span className="text-lg font-medium">{option}</span>
              {answered && isCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2 text-[#A8B5A0]"
                >
                  ✓ 正確
                </motion.div>
              )}
              {answered && isSelected && !isCorrect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2 text-[#B8A8A0]"
                >
                  ✗ 錯誤
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* 再播放一次 */}
      {!isPlaying && (
        <div className="mt-6 text-center">
          <button
            onClick={playAudio}
            className="text-[#8C8C8C] hover:text-[#4A4A4A] text-sm underline"
          >
            再播放一次
          </button>
        </div>
      )}
    </div>
  );
}
