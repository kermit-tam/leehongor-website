'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { P2Vocab } from '../data/p2-lesson';

interface ListeningSpellingProps {
  words: P2Vocab[];
  onComplete?: (score: number, total: number) => void;
  onExit?: () => void;
}

export default function ListeningSpelling({ words, onComplete, onExit }: ListeningSpellingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  const currentWord = words[currentIndex];

  // 發音
  const playWord = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.6;
    utterance.pitch = 1;
    
    utterance.onend = () => setHasPlayed(true);
    window.speechSynthesis.speak(utterance);
  }, [currentWord.word]);

  // 重置狀態 - 使用 setTimeout 避免在 effect 中直接 setState
  useEffect(() => {
    const timer = setTimeout(() => {
      setUserAnswer('');
      setIsCorrect(null);
      setHasPlayed(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [currentWord]);

  // 自動播放
  useEffect(() => {
    const timer = setTimeout(() => {
      playWord();
    }, 500);
    return () => clearTimeout(timer);
  }, [currentWord, playWord]);

  // 檢查答案
  const checkAnswer = () => {
    const correct = userAnswer.toLowerCase().replace(/[ -]/g, '') === 
                   currentWord.word.toLowerCase().replace(/[ -]/g, '');
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 1);
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } else {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }

    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(i => i + 1);
      } else {
        setShowResult(true);
        onComplete?.(score + (correct ? 1 : 0), words.length);
      }
    }, 2000);
  };

  if (showResult) {
    const percentage = Math.round((score / words.length) * 100);
    return (
      <div className="max-w-md mx-auto p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-xl text-center"
        >
          <div className="text-6xl mb-4">🎧</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">聽寫完成！</h3>
          <p className="text-gray-600 mb-4">
            答對 <span className="text-3xl font-bold text-green-500">{score}</span> / {words.length} 題
          </p>
          <div className="text-sm text-gray-500 mb-6">
            {percentage >= 80 ? '耳仔好靚！繼續保持！' : 
             percentage >= 60 ? '做得不錯！多聽多寫！' : 
             '加油！多練習聽力！'}
          </div>
          <button
            onClick={onExit}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg"
          >
            返回
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 頂部 */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">← 退出</button>
        <span className="text-sm text-gray-500">{currentIndex + 1} / {words.length}</span>
      </div>

      {/* 進度 */}
      <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          animate={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* 題目區 */}
      <motion.div
        key={currentWord.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-xl text-center mb-6"
      >
        <p className="text-gray-500 mb-6">聽清楚，寫出正確嘅生字</p>

        {/* 大播放按鈕 */}
        <motion.button
          onClick={playWord}
          whileTap={{ scale: 0.95 }}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-xl"
        >
          <span className="text-6xl">🔊</span>
        </motion.button>

        <p className="text-sm text-gray-400 mb-6">
          {hasPlayed ? '可以再撳多次聽' : '自動播放緊...'}
        </p>

        {/* 輸入框 */}
        <div className="relative mb-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value.toLowerCase())}
            placeholder="輸入聽到嘅生字..."
            className={`w-full p-4 text-center text-2xl font-bold rounded-2xl border-4 outline-none transition-all ${
              isCorrect === null 
                ? 'border-gray-200 focus:border-purple-400' 
                : isCorrect 
                  ? 'border-green-400 bg-green-50' 
                  : 'border-red-400 bg-red-50'
            }`}
            onKeyDown={(e) => e.key === 'Enter' && userAnswer && checkAnswer()}
          />
          {isCorrect !== null && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
              {isCorrect ? '✅' : '❌'}
            </span>
          )}
        </div>

        {/* 顯示正確答案（如果錯） */}
        <AnimatePresence>
          {isCorrect === false && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-red-50 rounded-xl text-red-600"
            >
              正確答案: <span className="font-bold text-xl">{currentWord.word}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={checkAnswer}
          disabled={userAnswer.length === 0 || isCorrect !== null}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg disabled:opacity-50"
        >
          {isCorrect === null ? '提交答案' : isCorrect ? '答對了！' : '繼續加油'}
        </button>
      </motion.div>

      {/* 提示 */}
      <p className="text-center text-gray-400 text-sm">
        💡 聽清楚個音節，再試下寫出嚟
      </p>
    </div>
  );
}
