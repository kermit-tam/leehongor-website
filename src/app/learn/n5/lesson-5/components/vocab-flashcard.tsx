/**
 * 詞彙閃卡組件 - 支援Swipe手勢
 * Vocabulary Flashcard Component with Swipe Gestures
 */

'use client';

import { useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { GameVocab } from '../game-data';

interface VocabFlashcardProps {
  vocab: GameVocab[];
  showCantonese: boolean;
  onComplete: () => void;
}

export function VocabFlashcard({ vocab, showCantonese, onComplete }: VocabFlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  const [showHint, setShowHint] = useState(true);

  const currentVocab = vocab[currentIndex];
  const nextVocab = vocab[currentIndex + 1];
  const progress = ((currentIndex + 1) / vocab.length) * 100;

  // 手勢控制
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const handleFlip = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  const handleNext = useCallback(() => {
    if (currentIndex < vocab.length - 1) {
      setExitDirection('right');
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
        setExitDirection(null);
        setShowHint(true);
      }, 200);
    } else {
      onComplete();
    }
  }, [currentIndex, vocab.length, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setExitDirection('left');
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setIsFlipped(false);
        setExitDirection(null);
      }, 200);
    }
  }, [currentIndex]);

  // Swipe 結束處理
  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    const threshold = 80;
    
    if (info.offset.x > threshold) {
      // 向右滑動 -> 下一個
      handleNext();
    } else if (info.offset.x < -threshold) {
      // 向左滑動 -> 上一個
      handlePrev();
    }
  }, [handleNext, handlePrev]);

  const playAudio = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(currentVocab.hiragana);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }, [currentVocab]);

  // 下一張卡片的動畫
  const nextCardVariants = {
    initial: { scale: 0.9, y: 20, opacity: 0 },
    animate: { 
      scale: 1, 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 }
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* 進度條 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-[#8C8C8C] mb-2">
          <span>詞彙 {currentIndex + 1}/{vocab.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#A8B5A0]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* 卡片堆疊區域 */}
      <div className="relative h-[360px] mb-6" style={{ perspective: '1000px' }}>
        
        {/* 背景卡片（下一張） */}
        {nextVocab && (
          <motion.div
            className="absolute inset-0 bg-[#F5F5F0] rounded-2xl border-2 border-[#E5E5E5] flex flex-col items-center justify-center p-6"
            style={{ zIndex: 0 }}
            variants={nextCardVariants}
            initial="initial"
            animate="animate"
          >
            {nextVocab.emoji && (
              <div className="text-5xl mb-3 opacity-50">{nextVocab.emoji}</div>
            )}
            <div className="text-3xl font-bold text-[#8C8C8C]/50">
              {nextVocab.hiragana}
            </div>
          </motion.div>
        )}

        {/* 主卡片 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            style={{ x, rotate, opacity, zIndex: 10 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            onClick={handleFlip}
            initial={{ x: exitDirection === 'left' ? -300 : 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ 
              x: exitDirection === 'right' ? 300 : -300, 
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            {/* Swipe 提示覆蓋層 */}
            <motion.div 
              className="absolute inset-0 z-20 flex items-center justify-between px-4 pointer-events-none"
              style={{ opacity: useTransform(x, [-150, 0, 150], [1, 0, 0]) }}
            >
              <div className="w-16 h-16 rounded-full bg-[#B8A8A0]/80 flex items-center justify-center text-white text-2xl">
                ←
              </div>
            </motion.div>
            <motion.div 
              className="absolute inset-0 z-20 flex items-center justify-between px-4 pointer-events-none"
              style={{ opacity: useTransform(x, [-150, 0, 150], [0, 0, 1]) }}
            >
              <div />
              <div className="w-16 h-16 rounded-full bg-[#A8B5A0]/80 flex items-center justify-center text-white text-2xl">
                →
              </div>
            </motion.div>

            {/* 卡片內容容器（翻轉用） */}
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              
              {/* 正面 */}
              <motion.div
                className="absolute inset-0 bg-white rounded-2xl shadow-xl border-2 border-[#C4B9AC] flex flex-col items-center justify-center p-6"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Emoji */}
                {currentVocab.emoji && (
                  <motion.div 
                    className="text-7xl mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {currentVocab.emoji}
                  </motion.div>
                )}
                
                {/* 平假名 */}
                <div className="text-5xl font-bold text-[#4A4A4A] mb-2">
                  {currentVocab.hiragana}
                </div>
                
                {/* 漢字 */}
                {currentVocab.kanji && (
                  <div className="text-2xl text-[#8C8C8C] mb-4">
                    {currentVocab.kanji}
                  </div>
                )}
                
                {/* 提示 */}
                <motion.div 
                  className="absolute bottom-6 text-sm text-[#C4B9AC] text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showHint ? 1 : 0 }}
                  transition={{ delay: 1 }}
                >
                  <div>點擊翻轉 • 左右滑動切換</div>
                </motion.div>
                
                {/* 播放按 */}
                <button
                  onClick={(e) => playAudio(e)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-[#F5F5F0] text-[#8C8C8C] hover:text-[#4A4A4A] hover:bg-[#E0D5C7] transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </motion.div>

              {/* 背面 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#F5F5F0] to-[#E8E5E0] rounded-2xl shadow-xl border-2 border-[#A8B5A0] flex flex-col items-center justify-center p-6"
                initial={{ rotateY: 180 }}
                animate={{ rotateY: isFlipped ? 0 : 180 }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* 中文意思 */}
                <div className="text-4xl font-bold text-[#4A4A4A] mb-4">
                  {currentVocab.meaning}
                </div>
                
                {/* 廣東話諧音 */}
                {showCantonese && (
                  <div className="text-xl text-[#8C8C8C] mb-4">
                    廣東話讀音：「{currentVocab.cantonese}」
                  </div>
                )}
                
                {/* 備註 */}
                {currentVocab.note && (
                  <div className="text-sm text-[#8C8C8C] mt-4 bg-white/80 px-4 py-2 rounded-full">
                    {currentVocab.note}
                  </div>
                )}
                
                {/* 提示 */}
                <div className="absolute bottom-6 text-sm text-[#C4B9AC]">
                  點擊返回正面
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 底部操作區 */}
      <div className="flex flex-col items-center gap-4">
        
        {/* 快捷按列 */}
        <div className="flex items-center gap-4">
          {/* 上一個按 */}
          <motion.button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full bg-white border-2 border-[#E5E5E5] flex items-center justify-center text-[#8C8C8C] disabled:opacity-30 hover:border-[#C4B9AC] hover:text-[#4A4A4A] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* 翻轉按鈕 */}
          <motion.button
            onClick={() => handleFlip()}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-full bg-[#C4B9AC] text-white flex items-center justify-center text-xl hover:bg-[#A09088] transition-colors shadow-lg"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </motion.button>

          {/* 下一個/完成按 */}
          <motion.button
            onClick={handleNext}
            whileTap={{ scale: 0.9 }}
            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-xl transition-colors ${
              currentIndex === vocab.length - 1
                ? 'bg-[#A8B5A0] border-[#A8B5A0] text-white'
                : 'bg-white border-[#E5E5E5] text-[#4A4A4A] hover:border-[#A8B5A0]'
            }`}
          >
            {currentIndex === vocab.length - 1 ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </motion.button>
        </div>

        {/* 頁碼指示器 */}
        <div className="flex items-center gap-2">
          {vocab.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i > currentIndex) {
                  setExitDirection('right');
                } else if (i < currentIndex) {
                  setExitDirection('left');
                }
                setTimeout(() => {
                  setCurrentIndex(i);
                  setIsFlipped(false);
                  setExitDirection(null);
                }, 100);
              }}
              className={`transition-all rounded-full ${
                i === currentIndex 
                  ? 'w-6 h-2 bg-[#4A4A4A]' 
                  : 'w-2 h-2 bg-[#E5E5E5] hover:bg-[#C4B9AC]'
              }`}
            />
          ))}
        </div>

        {/* 提示文字 */}
        <div className="text-xs text-[#8C8C8C] text-center">
          💡 提示：向左滑上一個，向右滑下一個
        </div>
      </div>
    </div>
  );
}
