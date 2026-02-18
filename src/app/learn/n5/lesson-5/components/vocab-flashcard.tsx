/**
 * 詞彙閃卡組件
 * Vocabulary Flashcard Component
 */

'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameVocab } from '../game-data';

interface VocabFlashcardProps {
  vocab: GameVocab[];
  showCantonese: boolean;
  onComplete: () => void;
}

export function VocabFlashcard({ vocab, showCantonese, onComplete }: VocabFlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentVocab = vocab[currentIndex];
  const progress = ((currentIndex + 1) / vocab.length) * 100;

  const handleFlip = useCallback(() => {
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  const handleNext = useCallback(() => {
    if (currentIndex < vocab.length - 1) {
      setDirection(1);
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setDirection(0);
      }, 150);
    } else {
      onComplete();
    }
  }, [currentIndex, vocab.length, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1);
        setDirection(0);
      }, 150);
    }
  }, [currentIndex]);

  const playAudio = useCallback(() => {
    if (!('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(currentVocab.hiragana);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }, [currentVocab]);

  const swipeVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      rotateY: 0,
    }),
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

      {/* 閃卡 */}
      <div className="relative h-80 mb-6" style={{ perspective: '1000px' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={swipeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="absolute inset-0 cursor-pointer"
            onClick={handleFlip}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 正面 */}
            <motion.div
              className="absolute inset-0 bg-white rounded-2xl shadow-lg border-2 border-[#C4B9AC] flex flex-col items-center justify-center p-6"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ backfaceVisibility: 'hidden' }}
            >
              {/* Emoji */}
              {currentVocab.emoji && (
                <div className="text-6xl mb-4">{currentVocab.emoji}</div>
              )}
              
              {/* 平假名 */}
              <div className="text-4xl font-bold text-[#4A4A4A] mb-2">
                {currentVocab.hiragana}
              </div>
              
              {/* 漢字 */}
              {currentVocab.kanji && (
                <div className="text-xl text-[#8C8C8C] mb-4">
                  {currentVocab.kanji}
                </div>
              )}
              
              {/* 提示 */}
              <div className="text-sm text-[#C4B9AC] mt-4">
                點擊查看意思
              </div>
              
              {/* 播放按鈕 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playAudio();
                }}
                className="absolute top-4 right-4 p-2 text-[#8C8C8C] hover:text-[#4A4A4A] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>

            {/* 背面 */}
            <motion.div
              className="absolute inset-0 bg-[#F5F5F0] rounded-2xl shadow-lg border-2 border-[#A8B5A0] flex flex-col items-center justify-center p-6"
              initial={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 0 : 180 }}
              transition={{ duration: 0.6 }}
              style={{ backfaceVisibility: 'hidden' }}
            >
              {/* 中文意思 */}
              <div className="text-3xl font-bold text-[#4A4A4A] mb-4">
                {currentVocab.meaning}
              </div>
              
              {/* 廣東話諧音 */}
              {showCantonese && (
                <div className="text-xl text-[#8C8C8C] mb-2">
                  「{currentVocab.cantonese}」
                </div>
              )}
              
              {/* 備註 */}
              {currentVocab.note && (
                <div className="text-sm text-[#C4B9AC] mt-4 bg-white px-3 py-1 rounded-full">
                  {currentVocab.note}
                </div>
              )}
              
              {/* 提示 */}
              <div className="text-sm text-[#C4B9AC] mt-6">
                點擊返回
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 導航按鈕 */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 text-[#8C8C8C] disabled:opacity-30 hover:text-[#4A4A4A] transition-colors"
        >
          ← 上一個
        </button>
        
        <div className="flex gap-2">
          {vocab.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setIsFlipped(false);
                setTimeout(() => {
                  setCurrentIndex(i);
                  setDirection(0);
                }, 150);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-[#4A4A4A] w-4' : 'bg-[#E5E5E5]'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={handleNext}
          className="px-4 py-2 text-[#4A4A4A] hover:text-[#8C8C8C] transition-colors"
        >
          {currentIndex === vocab.length - 1 ? '完成 →' : '下一個 →'}
        </button>
      </div>
    </div>
  );
}
