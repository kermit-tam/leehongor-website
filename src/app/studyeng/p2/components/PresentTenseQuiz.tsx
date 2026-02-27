'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { presentTenseQuestions, presentTenseRules, shuffleQuestions } from '../data/present-tense';

interface PresentTenseQuizProps {
  onComplete?: (score: number, total: number) => void;
  onExit?: () => void;
}

export default function PresentTenseQuiz({ onComplete, onExit }: PresentTenseQuizProps) {
  const [questions] = useState(() => shuffleQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const currentQuestion = questions[currentIndex];

  // 發音
  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    window.speechSynthesis.speak(utterance);
  }, []);

  // 選擇答案
  const selectOption = (option: string) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(option);
    const correct = option === currentQuestion.correct;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 1);
    }

    // 1.5秒後下一題
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
        onComplete?.(score + (correct ? 1 : 0), questions.length);
      }
    }, 1500);
  };

  // 獲取選項顏色
  const getOptionStyle = (option: string) => {
    if (selectedOption === null) {
      return 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50';
    }
    
    if (option === currentQuestion.correct) {
      return 'bg-green-100 border-2 border-green-500 text-green-700';
    }
    
    if (selectedOption === option && !isCorrect) {
      return 'bg-red-100 border-2 border-red-500 text-red-700';
    }
    
    return 'bg-gray-100 border-2 border-gray-200 opacity-50';
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
          <div className="text-6xl mb-4">{percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '💪'}</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Present Tense 完成！</h3>
          <p className="text-gray-600 mb-4">
            答對 <span className="text-3xl font-bold text-green-500">{score}</span> / {questions.length} 題
          </p>
          <div className="text-sm text-gray-500 mb-6">
            {percentage >= 80 ? '好棒！單複數分得好好！' : 
             percentage >= 60 ? '做得不錯！再練習！' : 
             '記住：He/She/It 動詞要變化！'}
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
        <span className="text-sm text-gray-500">{currentIndex + 1} / {questions.length}</span>
      </div>

      {/* 進度 */}
      <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* 題目區 */}
      <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
        {/* 主語標籤 */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-4 py-2 rounded-full font-bold text-lg ${
            ['He', 'She', 'It'].includes(currentQuestion.subject)
              ? 'bg-pink-100 text-pink-700'
              : 'bg-blue-100 text-blue-700'
          }`}>
            {currentQuestion.subject}
          </span>
          <button
            onClick={() => setShowRules(!showRules)}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            📖 規則
          </button>
        </div>

        {/* 規則提示 */}
        {showRules && (
          <div className="bg-yellow-50 rounded-xl p-3 mb-4 text-sm">
            <p className="font-bold text-yellow-800 mb-2">動詞變化規則：</p>
            {presentTenseRules.map((rule, idx) => (
              <div key={idx} className="mb-2">
                <p className="text-yellow-700 font-medium">{rule.title}</p>
                {rule.rules.map((r, i) => (
                  <p key={i} className="text-yellow-600 text-xs ml-2">
                    • {r.pattern}: {r.example}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* 圖標同題目 */}
        <div className="text-center mb-6">
          <div className="text-7xl mb-4">{currentQuestion.emoji}</div>
          <p className="text-gray-500 mb-2">選擇正確嘅動詞形式：</p>
          <div className="bg-gray-100 rounded-xl p-4 inline-block">
            <span className="text-2xl font-bold text-gray-800">{currentQuestion.subject} </span>
            <span className="text-2xl font-bold text-blue-600">_______</span>
            <span className="text-2xl font-bold text-gray-800"> ...</span>
          </div>
        </div>

        {/* 選項 */}
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => selectOption(option)}
              disabled={selectedOption !== null}
              className={`py-4 rounded-xl font-bold text-xl transition-all ${getOptionStyle(option)}`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* 結果提示 */}
        {isCorrect !== null && (
          <div className={`mt-4 p-4 rounded-xl text-center ${
            isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isCorrect ? (
              <p className="font-bold">✅ 正確！</p>
            ) : (
              <>
                <p className="font-bold mb-1">❌ 錯了</p>
                <p className="text-sm">{currentQuestion.sentence}</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* 發音按鈕 */}
      <button
        onClick={() => speak(currentQuestion.sentence)}
        className="w-full py-3 rounded-xl bg-yellow-100 text-yellow-700 font-bold flex items-center justify-center gap-2"
      >
        <span>🔊</span> 聽完整句子
      </button>

      {/* 說明 */}
      <p className="text-center text-gray-400 text-sm mt-4">
        💡 He/She/It（單數）動詞要 +s/+es/+ies<br/>
        I/We/You/They（複數）動詞保持原形
      </p>
    </div>
  );
}
