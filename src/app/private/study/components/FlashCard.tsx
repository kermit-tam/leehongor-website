/**
 * Flash Card 組件
 * 
 * 閃卡學習模式，支援中文生字同英文詞彙
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { StudyCard } from '../data';

interface FlashCardProps {
  cards: StudyCard[];
  subject: 'chinese' | 'english';
  onComplete: (learnedCount: number) => void;
  onBack: () => void;
}

export function FlashCard({ cards, subject, onComplete, onBack }: FlashCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCards, setLearnedCards] = useState<Set<string>>(new Set());
  const [showComplete, setShowComplete] = useState(false);

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setShowComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const markAsLearned = () => {
    setLearnedCards(prev => new Set([...prev, currentCard.id]));
    handleNext();
  };

  // 鍵盤控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFlipped]);

  if (showComplete) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">完成！</h2>
        <p className="text-gray-600 mb-6">
          你學咗 {cards.length} 張卡，標記識咗 {learnedCards.size} 個！
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => onComplete(learnedCards.size)}
            className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-colors"
          >
            返回主頁
          </button>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setIsFlipped(false);
              setShowComplete(false);
              setLearnedCards(new Set());
            }}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            再溫一次
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* 頂部欄 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          退出
        </button>
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {cards.length}
        </span>
      </div>

      {/* 進度條 */}
      <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 閃卡 */}
      <div 
        className="relative h-80 mb-6 cursor-pointer"
        onClick={handleFlip}
      >
        <div 
          className={`absolute inset-0 w-full h-full transition-all duration-500 transform preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* 正面 */}
          <div 
            className={`absolute inset-0 w-full h-full rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 backface-hidden ${
              subject === 'chinese' 
                ? 'bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-100' 
                : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100'
            }`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <span className="text-xs text-gray-400 mb-4">{currentCard.category}</span>
            
            {subject === 'chinese' ? (
              <>
                <div className="text-8xl font-bold text-gray-800 mb-4">
                  {currentCard.character}
                </div>
                <p className="text-gray-500">點擊查看詳情</p>
              </>
            ) : (
              <>
                <div className="text-5xl font-bold text-gray-800 mb-4">
                  {currentCard.word}
                </div>
                <p className="text-gray-500">點擊查看詳情</p>
              </>
            )}
          </div>

          {/* 背面 */}
          <div 
            className={`absolute inset-0 w-full h-full rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 ${
              subject === 'chinese' 
                ? 'bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-100' 
                : 'bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-100'
            }`}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {subject === 'chinese' ? (
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {currentCard.character}
                </div>
                <p className="text-lg text-indigo-600 font-medium mb-1">
                  {currentCard.pinyin}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  筆畫：{currentCard.strokes} 畫
                </p>
                <div className="bg-white rounded-xl p-4 mb-3">
                  <p className="text-gray-700">{currentCard.meaning}</p>
                </div>
                <p className="text-sm text-gray-600 italic">
                  「{currentCard.example}」
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {currentCard.word}
                </div>
                <p className="text-lg text-indigo-600 font-medium mb-4">
                  {currentCard.phonetic}
                </p>
                <div className="bg-white rounded-xl p-4 mb-3">
                  <p className="text-gray-700">{currentCard.meaning}</p>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "{currentCard.example}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 控制按 */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium disabled:opacity-50 hover:bg-gray-200 transition-colors"
        >
          ← 上一個
        </button>
        <button
          onClick={handleFlip}
          className="flex-1 py-3 rounded-xl bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition-colors"
        >
          {isFlipped ? '🔙 返回' : '👆 翻卡'}
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
        >
          下一個 →
        </button>
      </div>

      {/* 識得按鈕 */}
      <button
        onClick={markAsLearned}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
      >
        ✅ 我識呢個！
      </button>

      {/* 鍵盤提示 */}
      <p className="text-center text-xs text-gray-400 mt-4">
        快捷鍵：空白鍵翻卡 | ← → 切換
      </p>
    </div>
  );
}
