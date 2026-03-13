/**
 * 閃電配對遊戲組件
 * Speed Match Game Component
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeedMatchQuestion } from '../game-data';

interface SpeedMatchGameProps {
  question: SpeedMatchQuestion;
  onComplete: (score: number, timeLeft: number) => void;
  onTimeUp: () => void;
}

export function SpeedMatchGame({ question, onComplete, onTimeUp }: SpeedMatchGameProps) {
  const [timeLeft, setTimeLeft] = useState(question.timeLimit);
  const [leftItems, setLeftItems] = useState(question.pairs.map((p, i) => ({ ...p, index: i })));
  const [rightItems, setRightItems] = useState(shuffle(question.pairs.map((p, i) => ({ ...p, index: i }))));
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  // 倒計時
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onComplete(score, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, onComplete, onTimeUp]);

  // 檢查是否全部配對完成
  useEffect(() => {
    if (matched.size === question.pairs.length) {
      onComplete(score + Math.ceil(timeLeft * 10), timeLeft);
    }
  }, [matched, question.pairs.length, score, timeLeft, onComplete]);

  const handleLeftClick = useCallback((index: number) => {
    if (matched.has(index)) return;
    setSelectedLeft(index);
  }, [matched]);

  // 朗讀日文
  const speakJapanese = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleRightClick = useCallback((rightIndex: number) => {
    if (selectedLeft === null) return;

    const leftMatch = leftItems[selectedLeft];
    const rightMatch = rightItems[rightIndex];

    if (leftMatch.index === rightMatch.index) {
      // 配對成功
      setMatched(prev => new Set([...prev, selectedLeft]));
      setScore(prev => prev + 100);
      setSelectedLeft(null);
      
      // 朗讀配對成功的日文單詞
      speakJapanese(leftMatch.hiragana);
    } else {
      // 配對失敗 - 震動效果
      setShakeIndex(rightIndex);
      setTimeout(() => setShakeIndex(null), 300);
      setSelectedLeft(null);
    }
  }, [selectedLeft, leftItems, rightItems, speakJapanese]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 計時器 */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-medium text-[#4A4A4A]">
          閃電配對 <span className="text-sm text-[#8C8C8C]">配對平假名同意思</span>
        </div>
        <div className={`text-2xl font-bold ${timeLeft <= 3 ? 'text-red-500' : 'text-[#4A4A4A]'}`}>
          {timeLeft}s
        </div>
      </div>

      {/* 進度條 */}
      <div className="w-full h-2 bg-[#E5E5E5] rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-[#A8B5A0]"
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / question.timeLimit) * 100}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </div>

      {/* 配對區域 */}
      <div className="grid grid-cols-2 gap-8">
        {/* 左側 - 平假名 */}
        <div className="space-y-3">
          <div className="text-sm text-[#8C8C8C] mb-2">平假名</div>
          {leftItems.map((item, index) => (
            <motion.button
              key={`left-${index}`}
              onClick={() => handleLeftClick(index)}
              disabled={matched.has(index)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-lg font-medium
                ${matched.has(index) 
                  ? 'bg-[#A8B5A0]/20 border-[#A8B5A0] text-[#8C8C8C]' 
                  : selectedLeft === index
                  ? 'bg-[#E0D5C7] border-[#C4B9AC] text-[#4A4A4A]'
                  : 'bg-white border-[#E5E5E5] text-[#4A4A4A] hover:border-[#C4B9AC]'
                }`}
              whileTap={{ scale: matched.has(index) ? 1 : 0.95 }}
              animate={matched.has(index) ? { opacity: 0.5 } : { opacity: 1 }}
            >
              {item.hiragana}
            </motion.button>
          ))}
        </div>

        {/* 右側 - 中文意思 */}
        <div className="space-y-3">
          <div className="text-sm text-[#8C8C8C] mb-2">中文意思</div>
          {rightItems.map((item, index) => {
            const isMatched = matched.has(item.index);
            return (
              <motion.button
                key={`right-${index}`}
                onClick={() => handleRightClick(index)}
                disabled={isMatched}
                className={`w-full p-4 rounded-lg border-2 transition-all text-base
                  ${isMatched 
                    ? 'bg-[#A8B5A0]/20 border-[#A8B5A0] text-[#8C8C8C]' 
                    : 'bg-white border-[#E5E5E5] text-[#4A4A4A] hover:border-[#C4B9AC]'
                  } ${shakeIndex === index ? 'animate-shake' : ''}`}
                whileTap={{ scale: isMatched ? 1 : 0.95 }}
                animate={isMatched ? { opacity: 0.5 } : { opacity: 1 }}
              >
                <div className="font-medium">{item.meaning}</div>
                <div className="text-xs text-[#8C8C8C] mt-1">「{item.cantonese}」</div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 得分顯示 */}
      <div className="mt-6 text-center">
        <span className="text-[#8C8C8C]">得分: </span>
        <span className="text-xl font-bold text-[#4A4A4A]">{score}</span>
      </div>

      {/* 提示 */}
      <div className="mt-4 text-center text-sm text-[#8C8C8C]">
        點擊左邊平假名，再點擊右邊對應嘅中文意思
      </div>
    </div>
  );
}

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
