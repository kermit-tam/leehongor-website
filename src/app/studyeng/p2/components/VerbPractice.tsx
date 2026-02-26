'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { P2Verb } from '../data/p2-lesson';

interface VerbPracticeProps {
  verbs: P2Verb[];
  onComplete?: (score: number, total: number) => void;
  onExit?: () => void;
}

export default function VerbPractice({ verbs, onComplete, onExit }: VerbPracticeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentVerb = verbs[currentIndex];

  // 發音
  const speakVerb = (word: string) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    window.speechSynthesis.speak(utterance);
  };

  // 規則說明
  const getRuleText = (rule: P2Verb['rule']) => {
    switch (rule) {
      case 'add-s':
        return '一般動詞：+ s';
      case 'add-es':
        return '以 s, x, ch, sh, o 結尾：+ es';
      case 'y-to-ies':
        return '輔音 + y 結尾：y → ies';
      case 'irregular':
        return '不規則變化';
    }
  };

  const handleNext = () => {
    if (showAnswer) {
      setScore(s => s + 1);
    }
    
    if (currentIndex < verbs.length - 1) {
      setCurrentIndex(i => i + 1);
      setShowAnswer(false);
    } else {
      setShowResult(true);
      onComplete?.(score + (showAnswer ? 1 : 0), verbs.length);
    }
  };

  if (showResult) {
    const percentage = Math.round((score / verbs.length) * 100);
    return (
      <div className="max-w-md mx-auto p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-xl text-center"
        >
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">動詞練習完成！</h3>
          <p className="text-gray-600 mb-4">
            學識 <span className="text-3xl font-bold text-blue-500">{score}</span> / {verbs.length} 個
          </p>
          <div className="text-sm text-gray-500 mb-6">
            {percentage >= 80 ? '記得好好！繼續保持！' : '再多練習幾次就記得！'}
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
        <span className="text-sm text-gray-500">{currentIndex + 1} / {verbs.length}</span>
      </div>

      {/* 進度 */}
      <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          animate={{ width: `${((currentIndex + 1) / verbs.length) * 100}%` }}
        />
      </div>

      {/* 題目區 */}
      <motion.div
        key={currentVerb.base}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 shadow-xl mb-6"
      >
        {/* 規則提示 */}
        <div className="bg-blue-50 rounded-xl p-3 mb-6 text-center">
          <p className="text-sm text-blue-600 font-medium">{getRuleText(currentVerb.rule)}</p>
        </div>

        {/* 圖標 */}
        <div className="text-7xl text-center mb-6">{currentVerb.emoji}</div>

        {/* 動詞卡片 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* 原形 */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => speakVerb(currentVerb.base)}
            className="bg-gray-100 rounded-2xl p-4 text-center"
          >
            <p className="text-xs text-gray-500 mb-1">原形</p>
            <p className="text-2xl font-bold text-gray-700">{currentVerb.base}</p>
            <p className="text-xs text-gray-400 mt-1">🔊 點擊發音</p>
          </motion.button>

          {/* 第三人稱 */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => speakVerb(currentVerb.thirdPerson)}
            className={`rounded-2xl p-4 text-center transition-all ${
              showAnswer 
                ? 'bg-green-100 border-2 border-green-400' 
                : 'bg-yellow-100 border-2 border-dashed border-yellow-400'
            }`}
          >
            <p className="text-xs text-gray-500 mb-1">He/She +</p>
            {showAnswer ? (
              <p className="text-2xl font-bold text-green-600">{currentVerb.thirdPerson}</p>
            ) : (
              <p className="text-2xl text-yellow-400">?</p>
            )}
            <p className="text-xs text-gray-400 mt-1">🔊 點擊發音</p>
          </motion.button>
        </div>

        {/* 意思 */}
        <p className="text-center text-gray-500 mb-4">{currentVerb.meaning}</p>

        {/* 顯示/隱藏答案 */}
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="w-full py-3 rounded-xl bg-blue-500 text-white font-bold"
        >
          {showAnswer ? '✅ 記得了！' : '👀 顯示答案'}
        </button>
      </motion.div>

      {/* 下一題 */}
      <button
        onClick={handleNext}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg"
      >
        {currentIndex < verbs.length - 1 ? '下一個 →' : '完成'}
      </button>

      {/* 說明 */}
      <p className="text-center text-gray-400 text-sm mt-4">
        💡 He/She/It 後面動詞要 +s / +es / ies
      </p>
    </div>
  );
}
