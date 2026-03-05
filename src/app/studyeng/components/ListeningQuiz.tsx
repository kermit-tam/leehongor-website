'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CVCWord } from '../data/cvc-lessons';

interface ListeningQuizProps {
  words: CVCWord[];
  questionCount?: number;
  onComplete?: (score: number, total: number) => void;
}

export default function ListeningQuiz({ 
  words, 
  questionCount = 5,
  onComplete 
}: ListeningQuizProps) {
  const [questions, setQuestions] = useState<CVCWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  // 初始化題目 - 使用 setTimeout 避免在 effect 中直接 setState
  useEffect(() => {
    const timer = setTimeout(() => {
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, Math.min(questionCount, shuffled.length)));
    }, 0);
    return () => clearTimeout(timer);
  }, [words, questionCount]);

  // 生成選項
  useEffect(() => {
    if (questions.length === 0) return;
    
    const current = questions[currentIndex];
    const wrongOptions = words
      .filter(w => w.word !== current.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.word);
    
    const allOptions = [current.word, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    // 使用 setTimeout 避免在 render 期間調用 setState
    const timer = setTimeout(() => {
      setOptions(allOptions);
    }, 0);
    return () => clearTimeout(timer);
  }, [questions, currentIndex, words]);

  const speakWord = useCallback((word: string) => {
    if (typeof window === 'undefined') return;
    
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return;
    
    const correct = option === questions[currentIndex].word;
    setSelectedOption(option);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 1);
    }

    // 播放對錯音效
    if (typeof window !== 'undefined') {
      const audio = new Audio(correct 
        ? 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3' 
        : 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'
      );
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
      // 計算最終分數（包括最後一題）
      const finalScore = isCorrect ? score + 1 : score;
      onComplete?.(finalScore, questions.length);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl"
      >
        <div className="text-6xl mb-4">
          {percentage >= 80 ? '🌟' : percentage >= 60 ? '👍' : '💪'}
        </div>
        <h3 className="text-2xl font-bold text-purple-800 mb-2">測驗完成！</h3>
        <p className="text-lg text-gray-700 mb-4">
          你答對了 <span className="text-3xl font-bold text-purple-600">{score}</span> / {questions.length} 題
        </p>
        <div className="text-sm text-gray-500 mb-6">
          {percentage >= 80 ? '太棒了！繼續保持！' : 
           percentage >= 60 ? '做得不錯！再練習一下！' : 
           '繼續努力！多聽多練習！'}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          再測一次
        </button>
      </motion.div>
    );
  }

  const current = questions[currentIndex];

  return (
    <div className="max-w-md mx-auto">
      {/* 進度 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>題目 {currentIndex + 1} / {questions.length}</span>
          <span>得分: {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 題目區 */}
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-4">聽一聽，選出正確的單字</p>
        
        {/* 播放按鈕 */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => speakWord(current.word)}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all"
        >
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        </motion.button>
        <p className="text-sm text-gray-500 mt-3">點擊播放</p>
      </div>

      {/* 選項 */}
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = selectedOption === option;
          const isRightAnswer = option === current.word;
          
          let buttonClass = 'bg-white border-2 border-gray-200 hover:border-purple-300';
          if (selectedOption !== null) {
            if (isRightAnswer) {
              buttonClass = 'bg-green-100 border-2 border-green-500';
            } else if (isSelected) {
              buttonClass = 'bg-red-100 border-2 border-red-500';
            } else {
              buttonClass = 'bg-gray-100 border-2 border-gray-200 opacity-50';
            }
          }

          return (
            <motion.button
              key={option}
              whileTap={selectedOption === null ? { scale: 0.95 } : {}}
              onClick={() => handleOptionClick(option)}
              className={`p-4 rounded-2xl font-bold text-lg transition-all ${buttonClass}`}
              disabled={selectedOption !== null}
            >
              {option}
              {selectedOption !== null && isRightAnswer && (
                <span className="ml-2">✓</span>
              )}
              {selectedOption === option && !isRightAnswer && (
                <span className="ml-2">✗</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* 下一題按鈕 */}
      <AnimatePresence>
        {selectedOption !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <p className={`text-lg font-bold mb-3 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '✓ 答對了！' : `✗ 正確答案是 ${current.word}`}
            </p>
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              {currentIndex < questions.length - 1 ? '下一題 →' : '看結果'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
