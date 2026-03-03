'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface WordItem {
  word: string;
  pinyin?: string;
  meaning: string;
  examples: string[];
}

interface StudyModeProps {
  title: string;
  emoji: string;
  words: WordItem[];
  onExit: () => void;
}

type Speed = 0.5 | 0.8 | 1;

export default function StudyMode({ title, emoji, words, onExit }: StudyModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [learnedWords, setLearnedWords] = useState<Set<number>>(new Set());
  const [showExamples, setShowExamples] = useState(false);
  const [speed, setSpeed] = useState<Speed>(0.8);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentWord = words[currentIndex];

  // 語音合成
  const speak = useCallback((text: string, rate: number = speed) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-HK';
      utterance.rate = rate;
      utterance.onend = () => setIsPlaying(false);
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  }, [speed]);

  // 自動播放當前詞語
  useEffect(() => {
    if (currentWord) {
      const timer = setTimeout(() => {
        speak(currentWord.word);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, speak, currentWord]);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(c => c + 1);
      setShowExamples(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(c => c - 1);
      setShowExamples(false);
    }
  };

  const handleLearned = () => {
    setLearnedWords(prev => {
      const newSet = new Set(prev);
      newSet.add(currentIndex);
      return newSet;
    });
    // 自動跳到下一条（延遲一點讓用戶看到反饋）
    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex(c => c + 1);
        setShowExamples(false);
      }
    }, 500);
  };

  const progress = ((currentIndex + 1) / words.length) * 100;
  const learnedProgress = (learnedWords.size / words.length) * 100;

  if (!currentWord) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* 標題欄 */}
        <div className="flex justify-between items-center mb-2">
          <button onClick={onExit} className="text-gray-500 hover:text-gray-700 text-xl">
            ←
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800">{emoji} {title}</h1>
            <p className="text-xs text-gray-500">溫習模式</p>
          </div>
          <div className="w-6"></div>
        </div>

        {/* 進度條 */}
        <div className="mb-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{currentIndex + 1}/{words.length}</span>
            <span>已記:{learnedWords.size}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-400 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 主要詞語顯示 */}
        <div className="text-center py-4">
          <motion.div
            key={currentIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 mb-3"
          >
            <h2 className="text-4xl font-black text-gray-800 mb-1">
              {currentWord.word}
            </h2>
            <p className="text-base text-gray-600">{currentWord.meaning}</p>
          </motion.div>

          {/* 播放控制 */}
          <div className="flex justify-center gap-2 mb-3">
            <button
              onClick={() => speak(currentWord.word)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-full font-bold text-sm flex items-center gap-1"
            >
              🔊 讀詞語
            </button>
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-full font-bold text-sm"
            >
              {showExamples ? '隱藏例句' : '顯示例句'}
            </button>
          </div>

          {/* 速度選擇 */}
          <div className="flex justify-center gap-2 mb-3">
            <span className="text-xs text-gray-500 self-center">語速:</span>
            {[
              { label: '慢', value: 0.5 },
              { label: '中', value: 0.8 },
              { label: '快', value: 1 }
            ].map((s) => (
              <button
                key={s.value}
                onClick={() => setSpeed(s.value as Speed)}
                className={`px-2 py-1 rounded-full text-xs font-bold ${
                  speed === s.value 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 例句區 */}
        <AnimatePresence>
          {showExamples && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-gray-50 rounded-xl p-3 mb-3">
                <h3 className="font-bold text-gray-700 text-sm mb-2">例句：</h3>
                {currentWord.examples.map((example, idx) => (
                  <div key={idx} className="mb-2 last:mb-0">
                    <div className="flex items-start gap-1">
                      <span className="text-gray-400 text-xs">{idx + 1}.</span>
                      <p className="text-gray-800 flex-1 text-sm">{example}</p>
                    </div>
                    <button
                      onClick={() => speak(example)}
                      className="text-blue-500 text-xs mt-0.5 ml-4 hover:underline"
                    >
                      🔊 讀
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 記得了按鈕 */}
        <div className="mb-4">
          <button
            onClick={handleLearned}
            className={`w-full py-3 rounded-xl text-lg font-bold transition-all ${
              learnedWords.has(currentIndex)
                ? 'bg-green-500 text-white'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            ✓ 記得了（自動下一個）
          </button>
        </div>

        {/* 導航按鈕 */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-xl font-bold text-sm disabled:opacity-50"
          >
            ← 上一個
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === words.length - 1}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl font-bold text-sm disabled:opacity-50"
          >
            下一個 →
          </button>
        </div>
      </div>
    </div>
  );
}
