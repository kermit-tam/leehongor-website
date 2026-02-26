'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CVCWord } from '../data/cvc-lessons';

interface ParentQuizProps {
  words: CVCWord[];
  onComplete?: (score: number, total: number) => void;
  onExit?: () => void;
}

export default function ParentQuiz({ words, onComplete, onExit }: ParentQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentWord = words[currentIndex];

  // 發音
  const speakWord = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentWord.word.toLowerCase());
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }, [currentWord]);

  // 家長標記正確
  const markCorrect = () => {
    setCorrectCount(c => c + 1);
    setAnsweredCount(c => c + 1);
    nextQuestion();
  };

  // 家長標記錯誤
  const markWrong = () => {
    setAnsweredCount(c => c + 1);
    nextQuestion();
  };

  // 下一題
  const nextQuestion = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(i => i + 1);
      setShowAnswer(false);
    } else {
      setShowResult(true);
      onComplete?.(correctCount + 1, words.length);
    }
  };

  // 顯示答案
  const revealAnswer = () => {
    setShowAnswer(true);
    speakWord();
  };

  if (showResult) {
    return (
      <div className="max-w-md mx-auto p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-xl text-center"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">測驗完成！</h3>
          <p className="text-gray-600 mb-4">
            答對 <span className="text-3xl font-bold text-green-500">{correctCount}</span> / {words.length} 題
          </p>
          <div className="text-sm text-gray-500 mb-6">
            {correctCount === words.length ? '太棒了！全部答對！' :
             correctCount >= words.length * 0.7 ? '做得好！繼續保持！' :
             '繼續練習，會越來越好的！'}
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
      {/* 頂部資訊 */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">
          ← 退出
        </button>
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {words.length}
        </span>
      </div>

      {/* 進度條 */}
      <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* 題目區 */}
      <motion.div
        key={currentWord.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="bg-white rounded-3xl p-8 shadow-xl text-center mb-6"
      >
        <p className="text-gray-500 mb-4">請小朋友讀出這個單字</p>

        {/* 大圖標 */}
        <div className="text-8xl mb-4">{currentWord.emoji}</div>

        {/* 單字（可選擇顯示） */}
        {showAnswer ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-purple-100 rounded-2xl p-4 mb-4"
          >
            <p className="text-4xl font-bold text-purple-600">{currentWord.word}</p>
            <p className="text-purple-400 mt-1">{currentWord.phonics}</p>
          </motion.div>
        ) : (
          <button
            onClick={revealAnswer}
            className="w-full py-4 rounded-2xl bg-gray-100 text-gray-500 font-bold mb-4"
          >
            點擊顯示答案 🔍
          </button>
        )}

        {/* 重複播放 */}
        {showAnswer && (
          <button
            onClick={speakWord}
            className="text-purple-500 text-sm flex items-center justify-center gap-1 mx-auto"
          >
            <span>🔊</span> 再聽一次
          </button>
        )}
      </motion.div>

      {/* 家長評分區 */}
      <div className="bg-yellow-50 rounded-2xl p-6">
        <p className="text-center text-yellow-700 font-medium mb-4">
          👨‍👩‍👧‍👦 家長請判斷
        </p>
        <div className="flex gap-4">
          <button
            onClick={markWrong}
            className="flex-1 py-4 rounded-xl bg-red-100 text-red-600 font-bold text-lg active:scale-95 transition-all"
          >
            ❌ 不正確
          </button>
          <button
            onClick={markCorrect}
            className="flex-1 py-4 rounded-xl bg-green-100 text-green-600 font-bold text-lg active:scale-95 transition-all"
          >
            ✅ 正確
          </button>
        </div>
      </div>

      {/* 說明 */}
      <p className="text-center text-gray-400 text-xs mt-4">
        不需要錄音，由家長判斷小朋友的讀音是否正確
      </p>
    </div>
  );
}
