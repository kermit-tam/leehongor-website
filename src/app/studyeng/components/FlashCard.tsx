'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import type { CVCWord } from '../data/cvc-lessons';

interface FlashCardProps {
  word: CVCWord;
  onNext?: () => void;
  onPrev?: () => void;
  currentIndex: number;
  totalCount: number;
}

export default function FlashCard({ word, onNext, onPrev, currentIndex, totalCount }: FlashCardProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [direction, setDirection] = useState(0);

  // 滑動處理
  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 80; // 滑動距離閾值
    
    if (info.offset.x > threshold && onPrev) {
      // 向右滑 -> 上一個
      setDirection(-1);
      onPrev();
    } else if (info.offset.x < -threshold && onNext) {
      // 向左滑 -> 下一個
      setDirection(1);
      onNext();
    }
  }, [onNext, onPrev]);

  // 發音功能 - 用音節方式讀 CVC 單字
  const speakWord = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // 取消之前的語音
    window.speechSynthesis.cancel();
    
    setIsSpeaking(true);
    
    // 將單字拆分成音節讀出，例如 CAT -> /kæt/ 而不是 C-A-T
    const utterance = new SpeechSynthesisUtterance(word.word.toLowerCase());
    utterance.lang = 'en-US';
    utterance.rate = 0.7; // 較慢速度
    utterance.pitch = 1.0;
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  }, [word.word]);

  // 自動播放（切換到新單字時）
  useEffect(() => {
    const timer = setTimeout(() => {
      speakWord();
    }, 300); // 延遲一點讓動畫完成
    
    return () => clearTimeout(timer);
  }, [word.id, speakWord]);

  // 點擊卡片發音
  const handleCardClick = () => {
    speakWord();
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      {/* 進度指示 */}
      <div className="flex items-center gap-2 text-gray-500">
        <span className="text-lg font-bold">{currentIndex + 1}</span>
        <span className="text-sm">/</span>
        <span className="text-sm">{totalCount}</span>
      </div>

      {/* 進度條 */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
        />
      </div>

      {/* 卡片容器 - 可拖動 */}
      <motion.div 
        className="relative w-72 h-96 cursor-pointer"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        onClick={handleCardClick}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={word.id}
            initial={{ x: direction * 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 select-none"
          >
            {/* 發音中指示 */}
            {isSpeaking && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-10 h-10 bg-white/30 rounded-full flex items-center justify-center"
              >
                <span className="text-xl">🔊</span>
              </motion.div>
            )}

            {/* 左右滑動提示 */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 text-white/30 text-2xl">
              ‹
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2 text-white/30 text-2xl">
              ›
            </div>

            {/* 大圖標 */}
            <motion.span 
              className="text-9xl mb-6"
              animate={isSpeaking ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: isSpeaking ? Infinity : 0, duration: 0.5 }}
            >
              {word.emoji}
            </motion.span>

            {/* 單字 */}
            <div className="bg-white/95 rounded-2xl px-6 py-3 shadow-lg">
              <span className="text-4xl font-black text-purple-600 tracking-wider">
                {word.word}
              </span>
            </div>

            {/* 拼音提示 */}
            <div className="mt-4 text-white/80 text-xl font-medium">
              {word.phonics}
            </div>

            {/* 提示文字 */}
            <p className="absolute bottom-4 text-white/60 text-sm">
              點擊或滑動卡片
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* 導航按鈕 */}
      <div className="flex items-center gap-6">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl disabled:opacity-30 transition-all active:scale-95"
        >
          ←
        </button>
        
        {/* 重複發音按鈕 */}
        <button
          onClick={speakWord}
          className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl transition-all active:scale-95 ${
            isSpeaking ? 'bg-green-400 text-white animate-pulse' : 'bg-yellow-400 text-white'
          }`}
        >
          🔊
        </button>

        <button
          onClick={onNext}
          disabled={currentIndex === totalCount - 1}
          className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl disabled:opacity-30 transition-all active:scale-95"
        >
          →
        </button>
      </div>

      {/* 滑動提示 */}
      <p className="text-gray-400 text-sm text-center">
        👆 點擊卡片聽發音<br/>
        👈 左右滑動切換單字
      </p>
    </div>
  );
}
