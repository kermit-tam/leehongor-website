'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import type { P2Vocab } from '../data/p2-lesson';

interface VocabCardProps {
  vocab: P2Vocab;
  onNext?: () => void;
  onPrev?: () => void;
  currentIndex: number;
  totalCount: number;
}

export default function VocabCard({ vocab, onNext, onPrev, currentIndex, totalCount }: VocabCardProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [direction, setDirection] = useState(0);

  // 發音功能
  const speakWord = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(vocab.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    utterance.pitch = 1;
    
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [vocab.word]);

  // 自動播放
  useEffect(() => {
    const timer = setTimeout(() => speakWord(), 300);
    return () => clearTimeout(timer);
  }, [vocab.id, speakWord]);

  // 滑動處理
  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x > threshold && onPrev) {
      setDirection(-1);
      onPrev();
    } else if (info.offset.x < -threshold && onNext) {
      setDirection(1);
      onNext();
    }
  }, [onNext, onPrev]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      {/* 進度 */}
      <div className="flex items-center gap-2 text-gray-500">
        <span className="text-lg font-bold">{currentIndex + 1}</span>
        <span className="text-sm">/</span>
        <span className="text-sm">{totalCount}</span>
      </div>
      
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          animate={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
        />
      </div>

      {/* 閃卡 */}
      <motion.div 
        className="relative w-72 h-96 cursor-pointer"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        onClick={speakWord}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          key={vocab.id}
          initial={{ x: direction * 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -300, opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 select-none"
        >
          {isSpeaking && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 w-10 h-10 bg-white/30 rounded-full flex items-center justify-center"
            >
              <span className="text-xl">🔊</span>
            </motion.div>
          )}

          <div className="absolute top-1/2 -translate-y-1/2 left-2 text-white/30 text-2xl">‹</div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 text-white/30 text-2xl">›</div>

          <motion.span 
            className="text-8xl mb-4"
            animate={isSpeaking ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: isSpeaking ? Infinity : 0, duration: 0.5 }}
          >
            {vocab.emoji}
          </motion.span>

          <div className="bg-white/95 rounded-2xl px-6 py-3 shadow-lg mb-3">
            <span className="text-4xl font-black text-purple-600">{vocab.word}</span>
          </div>

          <div className="text-white/90 text-lg font-medium mb-2">
            {vocab.syllables}
          </div>

          <div className="bg-white/20 rounded-xl px-4 py-2 mb-3">
            <span className="text-white text-lg">{vocab.meaning}</span>
          </div>

          <div className="bg-yellow-100/80 rounded-xl px-4 py-2">
            <span className="text-yellow-800 text-sm">{vocab.example}</span>
          </div>

          <p className="absolute bottom-4 text-white/60 text-sm">點擊或滑動卡片</p>
        </motion.div>
      </motion.div>

      {/* 導航 */}
      <div className="flex items-center gap-6">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl disabled:opacity-30"
        >←</button>
        
        <button
          onClick={speakWord}
          className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl ${
            isSpeaking ? 'bg-green-400 text-white animate-pulse' : 'bg-yellow-400 text-white'
          }`}
        >🔊</button>

        <button
          onClick={onNext}
          disabled={currentIndex === totalCount - 1}
          className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl disabled:opacity-30"
        >→</button>
      </div>
    </div>
  );
}
