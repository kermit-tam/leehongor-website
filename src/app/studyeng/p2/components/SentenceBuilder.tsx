'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { P2Sentence } from '../data/p2-lesson';

interface SentenceBuilderProps {
  sentences: P2Sentence[];
  onComplete?: (score: number, total: number) => void;
  onExit?: () => void;
}

export default function SentenceBuilder({ sentences, onComplete, onExit }: SentenceBuilderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [userSentence, setUserSentence] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const currentSentence = sentences[currentIndex];

  // 初始化題目 - 組件掛載時或 currentIndex 改變時運行
  const initQuestion = useCallback(() => {
    if (!currentSentence) return;
    
    const words = currentSentence.pattern.split(' ');
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    
    setAvailableWords(shuffled);
    setUserSentence([]);
    setIsCorrect(null);
    setShowHint(false);
  }, [currentSentence]);

  // 只在掛載或 currentIndex 改變時初始化
  useState(() => {
    initQuestion();
  });

  // 手動觸發初始化
  useState(() => {
    initQuestion();
  });

  // 發音
  const speakSentence = useCallback((text: string) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    window.speechSynthesis.speak(utterance);
  }, []);

  // 選擇字詞
  const selectWord = (word: string, index: number) => {
    if (isCorrect !== null) return;
    
    const newAvailable = [...availableWords];
    newAvailable.splice(index, 1);
    setAvailableWords(newAvailable);
    
    const newUserSentence = [...userSentence, word];
    setUserSentence(newUserSentence);
    
    // 如果用晒所有字詞，自動檢查
    if (newAvailable.length === 0) {
      checkAnswer(newUserSentence);
    }
  };

  // 移除已選字詞
  const removeWord = (index: number) => {
    if (isCorrect !== null) return;
    
    const word = userSentence[index];
    const newUserSentence = [...userSentence];
    newUserSentence.splice(index, 1);
    setUserSentence(newUserSentence);
    
    setAvailableWords(prev => [...prev, word]);
  };

  // 檢查答案
  const checkAnswer = (sentence: string[]) => {
    if (!currentSentence) return;
    
    const userAnswer = sentence.join(' ');
    const correct = userAnswer.toLowerCase() === currentSentence.pattern.toLowerCase();
    
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 1);
    }

    // 2秒後下一題
    setTimeout(() => {
      if (currentIndex < sentences.length - 1) {
        // 去下一題
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        
        // 初始化下一題
        const nextSentence = sentences[nextIndex];
        if (nextSentence) {
          const words = nextSentence.pattern.split(' ');
          const shuffled = [...words].sort(() => Math.random() - 0.5);
          setAvailableWords(shuffled);
          setUserSentence([]);
          setIsCorrect(null);
          setShowHint(false);
        }
      } else {
        // 最後一題
        setShowResult(true);
        onComplete?.(score + (correct ? 1 : 0), sentences.length);
      }
    }, 2000);
  };

  // 重置
  const reset = () => {
    if (!currentSentence) return;
    const words = currentSentence.pattern.split(' ');
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setUserSentence([]);
    setIsCorrect(null);
  };

  if (showResult) {
    const percentage = Math.round((score / sentences.length) * 100);
    return (
      <div className="max-w-md mx-auto p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-xl text-center"
        >
          <div className="text-6xl mb-4">{percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '💪'}</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">重組句子完成！</h3>
          <p className="text-gray-600 mb-4">
            答對 <span className="text-3xl font-bold text-green-500">{score}</span> / {sentences.length} 題
          </p>
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

  if (!currentSentence) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <p className="text-gray-500">載入緊...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {/* 頂部 */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onExit} className="text-gray-500 hover:text-gray-700">← 退出</button>
        <span className="text-sm text-gray-500">{currentIndex + 1} / {sentences.length}</span>
      </div>

      {/* 進度 */}
      <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          animate={{ width: `${((currentIndex + 1) / sentences.length) * 100}%` }}
        />
      </div>

      {/* 題目區 */}
      <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
        <p className="text-gray-500 mb-4 text-center">將字詞排列成正確句子</p>

        {/* 意思提示 */}
        <div className="bg-blue-50 rounded-xl p-3 mb-6 text-center">
          <p className="text-blue-600">💡 {currentSentence.meaning}</p>
        </div>

        {/* 用戶組合的句子 */}
        <div className="min-h-[80px] bg-gray-100 rounded-2xl p-4 mb-6 flex flex-wrap gap-2 items-center justify-center">
          {userSentence.length === 0 ? (
            <span className="text-gray-400">點擊下面字詞組成句子...</span>
          ) : (
            userSentence.map((word, index) => (
              <button
                key={`selected-${index}`}
                onClick={() => removeWord(index)}
                disabled={isCorrect !== null}
                className={`px-3 py-2 rounded-xl font-bold text-lg shadow active:scale-95 transition-all ${
                  isCorrect === null 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : isCorrect 
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                }`}
              >
                {word}
              </button>
            ))
          )}
        </div>

        {/* 可用字詞 */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {availableWords.map((word, index) => (
            <button
              key={`word-${index}`}
              onClick={() => selectWord(word, index)}
              disabled={isCorrect !== null}
              className="px-3 py-2 rounded-xl bg-white border-2 border-blue-200 text-blue-700 font-bold text-lg shadow hover:border-blue-400 hover:bg-blue-50 active:scale-95 transition-all disabled:opacity-50"
            >
              {word}
            </button>
          ))}
        </div>

        {/* 結果顯示 */}
        {isCorrect !== null && (
          <div className={`rounded-xl p-4 text-center mt-4 ${
            isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isCorrect ? (
              <p className="font-bold text-lg">✅ 正確！Good job!</p>
            ) : (
              <>
                <p className="font-bold text-lg mb-2">❌ 不正確</p>
                <p>正確答案: <span className="font-bold">{currentSentence.pattern}</span></p>
              </>
            )}
          </div>
        )}
      </div>

      {/* 功能按鈕 */}
      <div className="flex gap-3">
        <button
          onClick={reset}
          disabled={isCorrect !== null}
          className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold disabled:opacity-50"
        >
          🔄 重新開始
        </button>
        <button
          onClick={() => speakSentence(currentSentence.pattern)}
          className="flex-1 py-3 rounded-xl bg-yellow-100 text-yellow-600 font-bold flex items-center justify-center gap-1"
        >
          <span>🔊</span> 聽正確句子
        </button>
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex-1 py-3 rounded-xl bg-blue-100 text-blue-600 font-bold"
        >
          💡 提示
        </button>
      </div>

      {/* 提示 */}
      {showHint && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-xl text-center">
          <p className="text-yellow-700">
            第一個字係: <span className="font-bold text-xl">{currentSentence.pattern.split(' ')[0]}</span>
          </p>
        </div>
      )}

      {/* 說明 */}
      <p className="text-center text-gray-400 text-sm mt-6">
        💡 點擊字詞加入句子，再次點擊可移除<br/>
        用晒所有字詞會自動檢查答案
      </p>
    </div>
  );
}
