'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CVCWord } from '../data/cvc-lessons';

interface FlashCardProps {
  word: CVCWord;
  onComplete?: () => void;
}

export default function FlashCard({ word, onComplete }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakWord = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  }, [word.word]);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      speakWord();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 卡片容器 */}
      <div 
        className="relative w-64 h-80 cursor-pointer perspective-1000"
        onClick={handleCardClick}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: 90 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: -90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <span className="text-7xl mb-4">{word.emoji}</span>
              <div className="bg-white/90 rounded-xl px-4 py-2">
                <span className="text-3xl font-bold text-purple-600">
                  {word.word}
                </span>
              </div>
              <span className="text-white/80 text-sm mt-4">點擊查看答案</span>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: -90 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-br from-green-400 via-teal-400 to-blue-400 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <span className="text-5xl mb-3">{word.meaning}</span>
              <div className="bg-white/90 rounded-xl px-4 py-2 mb-2">
                <span className="text-xl font-bold text-green-600">
                  {word.phonics}
                </span>
              </div>
              <span className="text-white text-lg">{word.word}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 發音按鈕 */}
        {isFlipped && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
              isSpeaking 
                ? 'bg-green-500 animate-pulse' 
                : 'bg-yellow-500 hover:bg-yellow-400'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              speakWord();
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </motion.button>
        )}
      </div>

      {/* 完成按鈕 */}
      {onComplete && isFlipped && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          下一個單字 →
        </motion.button>
      )}
    </div>
  );
}
