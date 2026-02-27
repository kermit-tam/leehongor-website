'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { aAnQuestions, aAnRules, vowels, shuffleAAnQuestions } from '../data/a-an-lesson';

interface AAnQuizProps {
  onComplete?: (score: number, total: number) => void;
  onExit?: () => void;
}

export default function AAnQuiz({ onComplete, onExit }: AAnQuizProps) {
  const [questions] = useState(() => shuffleAAnQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<'a' | 'an' | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showRules, setShowRules] = useState(true); // 預設顯示規則

  const currentQuestion = questions[currentIndex];
  const isVowel = vowels.includes(currentQuestion.word[0].toUpperCase());

  // 發音
  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.6; // 較慢，適合幼稚園
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }, []);

  // 選擇答案
  const selectArticle = (article: 'a' | 'an') => {
    if (selectedArticle !== null) return;
    
    setSelectedArticle(article);
    const correct = article === currentQuestion.article;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 1);
      // 播放正確音效
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } else {
      // 播放錯誤音效
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }

    // 發音完整句子
    setTimeout(() => {
      speak(`${currentQuestion.article} ${currentQuestion.word}`);
    }, 300);

    // 1.5秒後下一題
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
        setSelectedArticle(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
        onComplete?.(score + (correct ? 1 : 0), questions.length);
      }
    }, 2000);
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-md mx-auto p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-xl text-center"
        >
          <div className="text-6xl mb-4">{percentage >= 80 ? '🌟' : percentage >= 60 ? '🎈' : '🌈'}</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">A / An 完成！</h3>
          <p className="text-gray-600 mb-4">
            答對 <span className="text-3xl font-bold text-green-500">{score}</span> / {questions.length} 題
          </p>
          <div className="text-sm text-gray-500 mb-6">
            {percentage >= 80 ? '好棒！記住晒 A 同 An！' : 
             percentage >= 60 ? '做得好！再練習！' : 
             '加油！記住：A E I O U 用 An！'}
          </div>
          <button
            onClick={onExit}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-lg"
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
      <div className="flex items-center justify-between mb-4">
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700 text-lg">← 退出</button>
        <span className="text-lg font-bold text-gray-600">{currentIndex + 1} / {questions.length}</span>
      </div>

      {/* 進度條 */}
      <div className="h-3 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* 規則提示（可收起） */}
      {showRules && (
        <div className="bg-yellow-50 rounded-2xl p-4 mb-4 border-2 border-yellow-200">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-yellow-800">📖 記住呢個規則：</h4>
            <button onClick={() => setShowRules(false)} className="text-yellow-600 text-sm">隱藏</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-100 rounded-xl p-3 text-center">
              <p className="font-bold text-blue-700 text-xl mb-1">A</p>
              <p className="text-blue-600 text-sm">+ 輔音</p>
              <p className="text-blue-500 text-xs">b, c, d, f, g...</p>
            </div>
            <div className="bg-orange-100 rounded-xl p-3 text-center">
              <p className="font-bold text-orange-700 text-xl mb-1">An</p>
              <p className="text-orange-600 text-sm">+ 元音</p>
              <p className="text-orange-500 text-xs">a, e, i, o, u</p>
            </div>
          </div>
        </div>
      )}
      {!showRules && (
        <button 
          onClick={() => setShowRules(true)}
          className="w-full mb-4 py-2 text-yellow-600 text-sm bg-yellow-50 rounded-xl"
        >
          📖 顯示規則
        </button>
      )}

      {/* 題目區 */}
      <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
        {/* 提示這個字的開頭音 */}
        <div className={`rounded-xl p-2 mb-4 text-center ${
          isVowel ? 'bg-orange-100' : 'bg-blue-100'
        }`}>
          <p className={`text-sm ${isVowel ? 'text-orange-600' : 'text-blue-600'}`}>
            開頭字母: <span className="font-bold text-xl">{currentQuestion.word[0].toUpperCase()}</span>
            {isVowel && <span className="ml-2">← 元音！用 An！</span>}
            {!isVowel && <span className="ml-2">← 輔音！用 A！</span>}
          </p>
        </div>

        {/* 大圖標 */}
        <div className="text-center mb-6">
          <motion.div 
            className="text-9xl mb-4"
            animate={isCorrect !== null ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {currentQuestion.emoji}
          </motion.div>
          <h2 className="text-4xl font-black text-gray-800">{currentQuestion.word}</h2>
        </div>

        {/* 選擇 A / An */}
        <p className="text-center text-gray-500 mb-4 text-lg">揀 A 定 An？</p>
        
        <div className="grid grid-cols-2 gap-4">
          {/* A 按 */}
          <button
            onClick={() => selectArticle('a')}
            disabled={selectedArticle !== null}
            className={`py-6 rounded-2xl font-black text-4xl shadow-lg transition-all active:scale-95 ${
              selectedArticle === null
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : selectedArticle === 'a' && isCorrect
                  ? 'bg-green-500 text-white'
                  : selectedArticle === 'a' && !isCorrect
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-400'
            }`}
          >
            A
          </button>

          {/* An 按 */}
          <button
            onClick={() => selectArticle('an')}
            disabled={selectedArticle !== null}
            className={`py-6 rounded-2xl font-black text-4xl shadow-lg transition-all active:scale-95 ${
              selectedArticle === null
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : selectedArticle === 'an' && isCorrect
                  ? 'bg-green-500 text-white'
                  : selectedArticle === 'an' && !isCorrect
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-400'
            }`}
          >
            An
          </button>
        </div>

        {/* 結果提示 */}
        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-2xl text-center ${
              isCorrect ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            {isCorrect ? (
              <p className="font-bold text-green-700 text-xl">✅ 正確！Good job!</p>
            ) : (
              <>
                <p className="font-bold text-red-700 text-xl mb-2">❌ 錯了</p>
                <p className="text-red-600 text-lg">
                  正確係：<span className="font-bold">{currentQuestion.article} {currentQuestion.word}</span>
                </p>
              </>
            )}
          </motion.div>
        )}
      </div>

      {/* 發音按鈕 */}
      <button
        onClick={() => speak(`${currentQuestion.article} ${currentQuestion.word}`)}
        className="w-full py-4 rounded-2xl bg-pink-100 text-pink-600 font-bold text-lg flex items-center justify-center gap-2"
      >
        <span className="text-2xl">🔊</span>
        聽發音
      </button>

      {/* 記憶口訣 */}
      <div className="mt-6 bg-purple-50 rounded-2xl p-4 text-center">
        <p className="text-purple-700 font-bold text-lg">🎵 記憶口訣：</p>
        <p className="text-purple-600">A E I O U，前面加 An 就啱路！</p>
      </div>
    </div>
  );
}
