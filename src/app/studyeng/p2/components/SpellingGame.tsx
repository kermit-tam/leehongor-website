'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { P2Vocab } from '../data/p2-lesson';
import { scrambleWord } from '../data/p2-lesson';

interface SpellingGameProps {
  words: P2Vocab[];
  onComplete?: (score: number, total: number) => void;
  onExit?: () => void;
}

export default function SpellingGame({ words, onComplete, onExit }: SpellingGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const currentWord = words[currentIndex];

  // 發音
  const speakWord = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    window.speechSynthesis.speak(utterance);
  }, [currentWord.word]);

  // 生成打亂的字母 - 使用 setTimeout 避免在 effect 中直接 setState
  useEffect(() => {
    const timer = setTimeout(() => {
      const scrambledLetters = scrambleWord(currentWord.word);
      setScrambled(scrambledLetters);
      setUserAnswer('');
      setIsCorrect(null);
      setShowHint(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [currentWord]);

  // 檢查答案
  const checkAnswer = () => {
    const correct = userAnswer.toLowerCase().replace(/[ -]/g, '') === 
                   currentWord.word.toLowerCase().replace(/[ -]/g, '');
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 1);
      // 播放成功音效
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } else {
      // 播放錯誤音效
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }

    // 自動下一題
    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(i => i + 1);
      } else {
        setShowResult(true);
        onComplete?.(score + (correct ? 1 : 0), words.length);
      }
    }, 1500);
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
          <div className="text-6xl mb-4">{percentage >= 80 ? '🌟' : percentage >= 60 ? '👍' : '💪'}</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">拼字完成！</h3>
          <p className="text-gray-600 mb-4">
            答對 <span className="text-3xl font-bold text-green-500">{score}</span> / {words.length} 題
          </p>
          <div className="text-sm text-gray-500 mb-6">
            {percentage >= 80 ? '太棒了！繼續保持！' : 
             percentage >= 60 ? '做得不錯！再練習！' : 
             '繼續努力！多拼多記！'}
          </div>
          <button
            onClick={onExit}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg"
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
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          animate={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* 題目區 */}
      <motion.div
        key={currentWord.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 shadow-xl text-center mb-6"
      >
        <p className="text-gray-500 mb-4">用下面嘅字母砌出正確嘅生字</p>

        <div className="text-7xl mb-4">{currentWord.emoji}</div>

        {/* 打亂的字母 */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {scrambled.split('').map((letter, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.9 }}
              onClick={() => setUserAnswer(prev => prev + letter)}
              className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 font-bold text-xl shadow"
            >
              {letter}
            </motion.button>
          ))}
        </div>

        {/* 輸入框 */}
        <div className="relative mb-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value.toLowerCase())}
            placeholder="輸入答案..."
            className={`w-full p-4 text-center text-2xl font-bold rounded-2xl border-4 outline-none transition-all ${
              isCorrect === null 
                ? 'border-gray-200 focus:border-blue-400' 
                : isCorrect 
                  ? 'border-green-400 bg-green-50' 
                  : 'border-red-400 bg-red-50'
            }`}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          />
          {isCorrect !== null && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">
              {isCorrect ? '✅' : '❌'}
            </span>
          )}
        </div>

        {/* 按鈕 */}
        <div className="flex gap-2">
          <button
            onClick={() => setUserAnswer('')}
            className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold"
          >
            清除
          </button>
          <button
            onClick={speakWord}
            className="flex-1 py-3 rounded-xl bg-yellow-100 text-yellow-600 font-bold flex items-center justify-center gap-1"
          >
            <span>🔊</span> 聽音
          </button>
          <button
            onClick={checkAnswer}
            disabled={userAnswer.length === 0 || isCorrect !== null}
            className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-bold disabled:opacity-50"
          >
            檢查
          </button>
        </div>

        {/* 提示 */}
        <button
          onClick={() => setShowHint(!showHint)}
          className="mt-4 text-sm text-blue-500 hover:text-blue-600"
        >
          {showHint ? '隱藏提示' : '💡 需要提示？'}
        </button>

        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 p-3 bg-yellow-50 rounded-xl text-sm text-yellow-700"
            >
              {currentWord.meaning} | 音節: {currentWord.syllables}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
